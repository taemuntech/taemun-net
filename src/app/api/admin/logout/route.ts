// 관리자 로그아웃 — 쿠키를 지운다. POST 만 받는다(주소만 눌러도 로그아웃되는 사고 방지).

import { NextResponse, type NextRequest } from "next/server";
import { guardAdminWrite } from "@/lib/admin/request-guard";
import { ADMIN_COOKIE_NAME, sessionCookieOptions } from "@/lib/admin/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // 다른 사이트가 형을 임의로 로그아웃시키지 못하게 출처를 본다(급할 때 로그인 화면으로 튕기면 곤란하다).
  const blocked = guardAdminWrite(req);
  if (blocked) return blocked;

  const res = NextResponse.json({ success: true });
  // 설정한 것과 같은 옵션(path·sameSite)으로 덮어써야 실제로 지워진다
  res.cookies.set({ name: ADMIN_COOKIE_NAME, value: "", maxAge: 0, ...sessionCookieOptions() });
  return res;
}
