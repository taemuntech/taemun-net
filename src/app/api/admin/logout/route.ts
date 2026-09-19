// 관리자 로그아웃 — 쿠키를 지운다. POST 만 받는다(주소만 눌러도 로그아웃되는 사고 방지).
//
// 2026-09-19(P1b): 쿠키에 기기 id(sid)가 있으면 그 기기 줄도 해제한다 — 쿠키를 복사해 둔 다른 곳이 있어도 같이 끊긴다.
// requireAdminApi 를 쓰지 않는 이유: **이미 해제된 기기도 로그아웃은 돼야 한다**(쿠키를 지워 로그인 화면으로 보내야 한다).
// 그래서 출처 검사만 하고, 토큰은 서명만 확인해 sid 를 꺼낸다.

import { NextResponse, type NextRequest } from "next/server";
import { revokeAdminSession } from "@/lib/admin/crm-store";
import { logAccess } from "@/lib/admin/guard";
import { guardAdminWrite } from "@/lib/admin/request-guard";
import { ADMIN_ACTOR, ADMIN_COOKIE_NAME, clientIp, sessionCookieOptions, verifySessionToken } from "@/lib/admin/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // 다른 사이트가 형을 임의로 로그아웃시키지 못하게 출처를 본다(급할 때 로그인 화면으로 튕기면 곤란하다).
  const blocked = guardAdminWrite(req);
  if (blocked) return blocked;

  const token = verifySessionToken(req.cookies.get(ADMIN_COOKIE_NAME)?.value);
  if (token) {
    let revoked = true;
    if (token.sid) {
      const result = await revokeAdminSession(token.sid, "logout");
      revoked = result.ok || result.reason === "not-found";
      if (!result.ok && result.reason !== "not-found") {
        console.error("admin logout: 기기 해제 실패(쿠키는 지운다):", result.reason, result.message);
      }
    }
    logAccess(
      {
        actor: ADMIN_ACTOR,
        sessionId: token.sid,
        sessionChecked: false,
        ip: clientIp(req).slice(0, 64),
        ua: (req.headers.get("user-agent") ?? "").slice(0, 300),
        route: req.nextUrl.pathname,
        method: req.method,
      },
      {
        action: "logout",
        resource: "admin_session",
        resourceId: token.sid,
        outcome: revoked ? "ok" : "error",
      },
    );
  }

  const res = NextResponse.json({ success: true });
  // 설정한 것과 같은 옵션(path·sameSite)으로 덮어써야 실제로 지워진다
  res.cookies.set({ name: ADMIN_COOKIE_NAME, value: "", maxAge: 0, ...sessionCookieOptions() });
  return res;
}
