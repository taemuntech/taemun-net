// 헤더 드롭다운·모바일 드로어의 항목별 강조색 — 아라 화이트 갤러리 헤더(b15708a)가 항목마다 손으로 준 색
// (앰버·에메랄드·퍼플·블루)을 레지스트리 featured 순서대로 돌려 쓴다. 항목이 늘어나도 색이 순환할 뿐 모양은 그대로다.
// Tailwind 가 클래스 이름을 소스에서 찾으므로 문자열을 조립하지 않고 통째로 적는다. 서버·클라이언트 어디서나 import 가능.

export type AccentTone = {
  /** 드롭다운 행 호버 바탕·테두리 */
  rowHover: string;
  /** 드롭다운 아이콘 상자 */
  iconBox: string;
  /** 종류 배지 */
  badge: string;
  /** 새 탭 아이콘 */
  externalIcon: string;
  /** 모바일 드로어 호버 테두리 */
  drawerHover: string;
  /** 모바일 드로어 아이콘 */
  drawerIcon: string;
};

export const ACCENT_TONES: readonly AccentTone[] = [
  {
    rowHover: "hover:bg-amber-50/60 hover:border-amber-200",
    iconBox: "bg-amber-100 text-amber-800 border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    externalIcon: "text-amber-600",
    drawerHover: "hover:border-amber-400",
    drawerIcon: "text-amber-700",
  },
  {
    rowHover: "hover:bg-emerald-50/60 hover:border-emerald-200",
    iconBox: "bg-emerald-100 text-emerald-800 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800",
    externalIcon: "text-emerald-600",
    drawerHover: "hover:border-emerald-400",
    drawerIcon: "text-emerald-700",
  },
  {
    rowHover: "hover:bg-purple-50/60 hover:border-purple-200",
    iconBox: "bg-purple-100 text-purple-800 border-purple-200",
    badge: "bg-purple-100 text-purple-800",
    externalIcon: "text-purple-600",
    drawerHover: "hover:border-purple-400",
    drawerIcon: "text-purple-700",
  },
  {
    rowHover: "hover:bg-blue-50/60 hover:border-blue-200",
    iconBox: "bg-blue-100 text-blue-800 border-blue-200",
    badge: "bg-blue-100 text-blue-800",
    externalIcon: "text-blue-600",
    drawerHover: "hover:border-blue-400",
    drawerIcon: "text-blue-700",
  },
];

export function accentTone(index: number): AccentTone {
  return ACCENT_TONES[((index % ACCENT_TONES.length) + ACCENT_TONES.length) % ACCENT_TONES.length];
}

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}
