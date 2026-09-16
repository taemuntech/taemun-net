// 관리자 로그인 화면. 이미 로그인돼 있으면 곧장 /admin 으로 보낸다.
// 검색엔진에 절대 올라가지 않아야 한다 — robots noindex (robots.ts 의 Disallow 와 이중으로).

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readAdminSession } from "@/lib/admin/session";
import LoginView from "./LoginView";

export const metadata: Metadata = {
  title: "관리자 로그인",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = readAdminSession(await cookies());
  if (session) redirect("/admin");
  return <LoginView />;
}
