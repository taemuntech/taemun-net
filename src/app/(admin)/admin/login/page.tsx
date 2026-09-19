// 관리자 로그인 화면. 이미 로그인돼 있으면 곧장 /admin/today 로 보낸다.
// 검색엔진에 절대 올라가지 않아야 한다 — robots noindex (robots.ts 의 Disallow 와 이중으로).
//
// P1b(2026-09-19 가온): 기기별 로그인·원격 로그아웃이 붙었다. 다른 화면의 확인(requireAdminPage)이 막으면
// /admin/login?reason=<이유> 로 보내고, 여기서 그 이유를 사람 말로 위에 띄운다(정해 둔 4가지만 — 주소에 임의 글자를 넣어도
// 화면에 그대로 찍히지 않는다).
//
// ⚠️ 「이미 로그인」 판정은 쿠키 서명만 본다(데이터베이스를 보지 않는다). 그래서 reason 이 붙어 온 경우에는
//    쿠키가 서명상 멀쩡해도 되돌려 보내지 않는다 — 해제된 기기의 쿠키로 /admin/today ↔ 로그인을 오가는 고리를 끊는다.

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readAdminSession } from "@/lib/admin/session";
import { LOGIN_REASON_LABEL, isLoginReason } from "@/lib/admin/guard-core";
import LoginView from "./LoginView";

export const metadata: Metadata = {
  title: "관리자 로그인",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawReason = typeof params.reason === "string" ? params.reason : null;
  const reason = isLoginReason(rawReason) ? rawReason : null;

  if (reason === null) {
    const session = readAdminSession(await cookies());
    if (session) redirect("/admin/today");
  }
  return <LoginView reasonMessage={reason ? LOGIN_REASON_LABEL[reason] : null} />;
}
