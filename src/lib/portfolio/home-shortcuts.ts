// 홈 분류 머리의 「바로가기」 버튼 — 손으로 적은 표. **서버에서만 읽는다.**
//
// 왜 여기로 옮겼나(실측 근거):
// 이 버튼들은 원래 HomeView.tsx('use client') 안에 JSX 로 박혀 있었고, 내려간 시안은
// `listedSlugs.has(...)` 로 **렌더만** 막았다. 그런데 렌더를 막아도 **소스 문자열은 청크에 남는다** —
// 홈이 받는 /_next/static/chunks/*.js 한 개에 `"/demo/sodamjae"`·`"/demo/wonik-qnc"`·「소담재」가
// 그대로 200 으로 나갔다(Cache-Control: immutable 1년). galleryData 를 props 로 바꿔 막았던 누수와
// 똑같은 구멍이 손으로 적은 버튼 쪽에 하나 더 있었던 것이다.
//
// 그래서 **문자열을 클라이언트 번들 밖에 둔다.** 서버(page.tsx)가 공개 상태로 걸러 배열만 내려 주고,
// HomeView 는 그 배열을 그리기만 한다. 내려간 시안은 배열에 아예 없으니 HTML 에도 청크에도 남지 않는다.
//
// ⚠️ 이 파일을 'use client' 파일에서 **값으로 import 하면 안 된다**(타입만 가져올 것).
//    header-links.ts·galleryData.ts 와 같은 규칙이다.
//
// className 은 **완전한 리터럴**로 적는다 — Tailwind v4 는 소스를 문자열로 훑으므로 조립하면 클래스가 사라진다.

import type { GalleryCategoryId } from "./galleryData";

/** 버튼 왼쪽 아이콘 — 함수(컴포넌트)를 클라이언트로 넘기면 직렬화에서 터지므로 이름만 넘긴다 */
export type HomeShortcutIcon = "play" | "external";

export type HomeShortcut = {
  /** 이 버튼이 붙는 분류 */
  categoryId: GalleryCategoryId;
  /** 내부 데모(next/link) · 외부 서비스(새 창) · 그 분류의 첫 카드 모달 */
  action: "demo" | "external" | "firstProject";
  /** action 이 demo·external 일 때의 주소. firstProject 면 없다 */
  href?: string;
  label: string;
  icon: HomeShortcutIcon;
  className: string;
};

/**
 * 손으로 적은 표. `slug` 가 있는 항목은 그 작업물이 **지금 목록에 실리는 경우에만** 나간다.
 * 외부 정식 서비스(tdocs.kr)와 카드 모달은 우리 공개 상태의 대상이 아니다.
 */
const SHORTCUTS: readonly (HomeShortcut & { slug?: string })[] = [
  {
    categoryId: "corporate",
    slug: "nexus-robotics",
    action: "demo",
    href: "/demo/nexus-robotics",
    label: "넥서스 로보틱스 샘플 사이트",
    icon: "play",
    className:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold transition-all shrink-0 self-start lg:self-end",
  },
  {
    categoryId: "commerce",
    slug: "maison",
    action: "demo",
    href: "/demo/maison",
    label: "메종 당티크 샘플 사이트",
    icon: "play",
    className:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold transition-all shrink-0 self-start lg:self-end",
  },
  {
    // 메디컬은 따로 뜨는 화면이 없어 그 분류에 **남아 있는 첫 카드**를 모달로 연다.
    categoryId: "medical",
    action: "firstProject",
    label: "메디컬 클리닉 포트폴리오",
    icon: "play",
    className:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-bold transition-all shrink-0 self-start lg:self-end cursor-pointer",
  },
  {
    categoryId: "interior",
    slug: "atelier-vaucluse",
    action: "demo",
    href: "/demo/atelier-vaucluse",
    label: "보클루즈 샘플 사이트",
    icon: "play",
    className:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all shrink-0 self-start lg:self-end",
  },
  {
    categoryId: "architecture",
    slug: "sodamjae",
    action: "demo",
    href: "/demo/sodamjae",
    label: "소담재 한옥 제안 시안",
    icon: "play",
    className:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 text-xs font-bold transition-all shrink-0 self-start lg:self-end",
  },
  {
    categoryId: "saas",
    action: "external",
    href: "https://tdocs.kr",
    label: "티독스 정식 서비스 방문",
    icon: "external",
    className:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all shrink-0 self-start lg:self-end",
  },
  {
    categoryId: "manufacturing",
    slug: "wonik-qnc",
    action: "demo",
    href: "/demo/wonik-qnc",
    label: "반도체 SSQ 제안 시안",
    icon: "play",
    className:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition-all shrink-0 self-start lg:self-end",
  },
  {
    // 학원/교육은 따로 뜨는 화면이 없어 그 분류에 **남아 있는 첫 카드**를 모달로 연다.
    categoryId: "education",
    action: "firstProject",
    label: "학원 · 교육 아카이브",
    icon: "play",
    className:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-bold transition-all shrink-0 self-start lg:self-end cursor-pointer",
  },
];

/** 지금 목록에 실리는 작업물에 붙은 바로가기만 남긴다(내려간 것은 주소·이름째로 빠진다) */
export function listedHomeShortcuts(listedSlugs: ReadonlySet<string>): HomeShortcut[] {
  return SHORTCUTS.filter((s) => s.slug === undefined || listedSlugs.has(s.slug)).map(
    ({ slug: _slug, ...shortcut }) => shortcut,
  );
}
