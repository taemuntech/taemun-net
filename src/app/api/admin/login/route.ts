// 관리자 로그인 — 비밀번호 하나로 서명 쿠키를 받는다.
// POST { passcode } → 200 { success:true } + 쿠키 / 401 / 429 / 503
//
// 이 라우트만 로그인 없이 부를 수 있다. 설정이 없으면 「아무나 통과」가 아니라 503 으로 끝낸다.

import { NextResponse, type NextRequest } from "next/server";
import { guardAdminWrite } from "@/lib/admin/request-guard";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  checkLoginRate,
  clearLoginFailures,
  clientIp,
  createSessionToken,
  hasAdminAuthConfig,
  recordLoginFailure,
  sessionCookieOptions,
  verifyPasscode,
} from "@/lib/admin/session";
import { hasServiceRoleKey } from "@/lib/portfolio/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // 다른 사이트에서 만든 폼이 비밀번호 시도를 대신 보내지 못하게 출처부터 본다.
  const blocked = guardAdminWrite(req);
  if (blocked) return blocked;

  if (!hasAdminAuthConfig()) {
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
    recordLoginFailure(ip);
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  clearLoginFailures(ip);
  const res = NextResponse.json({
    success: true,
    // 로그인하자마자 「저장이 안 되는 상태」를 알 수 있게 알려 준다(조용한 실패 금지)
    serviceRoleKey: hasServiceRoleKey(),
  });
  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: createSessionToken(),
    maxAge: ADMIN_SESSION_MAX_AGE,
    ...sessionCookieOptions(),
  });
  return res;
}
