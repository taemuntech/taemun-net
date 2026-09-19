// 관리자 콘솔(로그인 뒤 화면들) 공통 틀 — 2026-09-19 가온, 관리자 개편 P1b.
//
// 로그인 화면(/admin/login)은 이 (console) 묶음 밖에 있어 길잡이 막대가 붙지 않는다.
// 아래 여백은 휴대폰 아래 탭 막대(56px + 아이폰 홈 막대 몫)만큼 비워 마지막 카드가 막대에 가리지 않게 한다.
//
// ⚠️ 로그인 확인은 여기서 하지 않는다 — 레이아웃은 화면을 옮겨 다녀도 다시 돌지 않는다.
//    각 page.tsx 첫 줄의 requireAdminPage 가 매 요청마다 확인한다.

import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0 lg:pl-56">{children}</div>
      <AdminNav />
    </>
  );
}
