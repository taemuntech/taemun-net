// 관리자 로그인 — 비밀번호 하나로 서명 쿠키를 받는다.
// POST { passcode } → 200 { success:true, serviceRoleKey, sessionTracked } + 쿠키 / 401 / 429 / 503
//
// 이 라우트만 로그인 없이 부를 수 있다. 설정이 없으면 「아무나 통과」가 아니라 503 으로 끝낸다.
//
// 2026-09-19(P1b): 로그인할 때마다 기기 한 줄(admin_sessions)을 만들고 그 id(sid)를 쿠키에 싣는다 —
// 설정 화면에서 「이 기기 로그아웃시키기」가 실제로 먹히게. 기기 표 저장이 실패해도 **로그인은 된다**
// (sid 없는 쿠키 = 작업물 화면·「전부 내리기」만 열린다). 급할 때 로그인이 DB 때문에 막히면 안 된다.
// 성공·실패는 접속기록에 남긴다(비밀번호 글자는 남기지 않는다). 실패는 IP 당 제한 창에서 첫 번째와
// 잠기는 번째만 남긴다(guard-core.loginFailLogDetail) — 누구나 부를 수 있는 주소라 틀린 시도로 기록을 채우지 못하게.

import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createAdminSession } from "@/lib/admin/crm-store";
import { isNonProductionDeployment } from "@/lib/admin/env";
import { logAccess, type AdminContext } from "@/lib/admin/guard";
import { loginFailLogDetail } from "@/lib/admin/guard-core";
import { guardAdminWrite } from "@/lib/admin/request-guard";
import {
  ADMIN_ACTOR,
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  checkLoginRate,
  clearLoginFailures,
  clientIp,
  createSessionToken,
  hasAdminAuthConfig,
  RATE_MAX_FAILURES,
  recordLoginFailure,
  sessionCookieOptions,
  verifyPasscode,
} from "@/lib/admin/session";
import { hasServiceRoleKey } from "@/lib/portfolio/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function contextOf(req: NextRequest, ip: string, sessionId: string | null): AdminContext {
  return {
    actor: ADMIN_ACTOR,
    sessionId,
    sessionChecked: false,
    ip: ip.slice(0, 64),
    ua: (req.headers.get("user-agent") ?? "").slice(0, 300),
    route: req.nextUrl.pathname,
    method: req.method,
  };
}

export async function POST(req: NextRequest) {
  // 다른 사이트에서 만든 폼이 비밀번호 시도를 대신 보내지 못하게 출처부터 본다.
  const blocked = guardAdminWrite(req);
  if (blocked) return blocked;

  // 프리뷰 배포에서는 로그인 자체를 받지 않는다(관리자 화면도 404 다 — lib/admin/env.ts)
  if (isNonProductionDeployment() || !hasAdminAuthConfig()) {
    return NextResponse.json({ error: "서버 설정 오류입니다." }, { status: 503 });
  }

  const ip = clientIp(req);
  const rate = checkLoginRate(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: `시도가 너무 많습니다. ${rate.retryAfterSec}초 뒤에 다시 시도해 주세요.` },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } },
    );
  }

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  const passcode = typeof body === "object" && body !== null ? (body as Record<string, unknown>).passcode : undefined;

  if (!verifyPasscode(passcode)) {
    const failCount = recordLoginFailure(ip);
    // 한 IP 의 제한 창(5분) 안에서 첫 번째와 잠기는 번째만 남긴다 — 틀린 시도로 접속기록을 채우지 못하게(guard-core 주석).
    // 전역 한도로 막힌 429 는 위에서 이미 돌려보냈다(남기지 않는다).
    const failDetail = loginFailLogDetail(failCount, RATE_MAX_FAILURES);
    if (failDetail) {
      logAccess(contextOf(req, ip, null), {
        action: "login_fail",
        resource: "admin_session",
        outcome: "denied",
        detail: failDetail,
      });
    }
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  clearLoginFailures(ip);

  const now = Date.now();
  const sid = randomUUID();
  const created = await createAdminSession({
    id: sid,
    actor: ADMIN_ACTOR,
    expiresAt: new Date(now + ADMIN_SESSION_MAX_AGE * 1000),
    ip: ip.slice(0, 64),
    ua: (req.headers.get("user-agent") ?? "").slice(0, 300),
  });
  if (!created.ok) {
    console.error("admin login: 기기 기록을 만들지 못했습니다 — sid 없는 쿠키로 로그인합니다:", created.reason, created.message);
  }
  const sessionTracked = created.ok;

  logAccess(contextOf(req, ip, sessionTracked ? sid : null), {
    action: "login",
    resource: "admin_session",
    resourceId: sessionTracked ? sid : null,
    detail: sessionTracked ? null : "기기 기록 실패 — 개인정보 화면은 다시 로그인 필요",
  });

  const res = NextResponse.json({
    success: true,
    // 로그인하자마자 「저장이 안 되는 상태」를 알 수 있게 알려 준다(조용한 실패 금지)
    serviceRoleKey: hasServiceRoleKey(),
    // false 면 기기 추적이 안 된 로그인 — 문의·설정 화면은 열리지 않는다
    sessionTracked,
  });
  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: sessionTracked ? createSessionToken(now, sid) : createSessionToken(now),
    maxAge: ADMIN_SESSION_MAX_AGE,
    ...sessionCookieOptions(),
  });
  return res;
}
