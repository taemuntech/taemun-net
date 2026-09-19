"use client";

// 관리자 화면 공통 길잡이 — 2026-09-19 가온, 관리자 개편 P1b.
//
// 왜 아래 탭 막대인가:
// - 형은 관리자를 거의 휴대폰(세로 375px)으로 본다. 엄지가 닿는 곳은 화면 아래다. 예전처럼 머리글 오른쪽 위에
//   「견적 문의」 링크를 두면 화면마다 링크가 제각각이고, 새 화면(오늘·설정)이 늘수록 머리글이 넘친다.
// - 넓은 화면(lg 이상)에서는 아래 막대 대신 왼쪽 세로 막대를 쓴다(책상에서 볼 때 가로를 넓게 쓴다).
//
// ⚠️ 이 막대는 데이터를 하나도 읽지 않는다 — 로그인 확인은 각 page 의 requireAdminPage 가 한다.
//    (레이아웃은 화면을 옮겨도 다시 돌지 않으므로 여기에 확인을 두면 두 번째 화면부터 검사가 빠진다.)
// ⚠️ 각 화면 머리글이 sticky top-0 이다. 감싸는 요소에 overflow-x-hidden 을 걸면 sticky 가 죽는다 — clip 을 쓴다.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Inbox, LayoutGrid, Settings2, type LucideIcon } from "lucide-react";

type NavItem = { href: string; label: string; icon: LucideIcon; exact: boolean };

const NAV_ITEMS: readonly NavItem[] = [
  { href: "/admin/today", label: "오늘", icon: CalendarCheck, exact: false },
  { href: "/admin/inquiries", label: "문의", icon: Inbox, exact: false },
  // /admin 은 다른 모든 주소의 앞부분이라 정확히 같을 때만 켠다
  { href: "/admin", label: "작업물", icon: LayoutGrid, exact: true },
  { href: "/admin/settings", label: "설정", icon: Settings2, exact: false },
];

function isActive(pathname: string, item: NavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function AdminNav() {
  const pathname = usePathname() ?? "";

  return (
    <>
      {/* ── 휴대폰·태블릿 세로: 아래 탭 막대 ─────────────── */}
      <nav
        aria-label="관리자 메뉴"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#030712]/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="mx-auto grid max-w-3xl grid-cols-4">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition ${
                    active ? "text-white" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span
                    className={`inline-flex h-7 w-12 items-center justify-center rounded-full ${
                      active ? "bg-indigo-500/25 text-indigo-200" : ""
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── 넓은 화면: 왼쪽 세로 막대 ─────────────────────── */}
      <nav
        aria-label="관리자 메뉴"
        className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-white/10 bg-[#030712] px-3 py-5 lg:flex"
      >
        <p className="px-3 pb-5 text-[12px] font-bold tracking-wide text-gray-400">TAEMUN.NET · 관리자</p>
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition ${
                    active ? "bg-indigo-500/20 text-white" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-indigo-300" : ""}`} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
