// 데모 공용 UI 조각 — 라이트 앱 캔버스용.
// 사이트 틀(헤더·히어로·CTA·푸터)은 taemun.net 다크 톤 그대로, 데모 앱 영역(탭 바·패널)만 흰 바탕이다.
// 서버/클라이언트 어디서 import 해도 되도록 훅을 쓰지 않는다.
//
// 라이트 캔버스 글자 규칙 (배경 white / slate-50 기준 WCAG AA):
//   제목·값 text-slate-900 · 본문 text-slate-600 · 캡션·보조 text-slate-500 (최소 — slate-400 은 글자에 쓰지 않는다)
//   강조 글자 text-{hue}-700 (bg-{hue}-50 위에서도 4.5:1 이상) — amber 만 800 (700 은 옅은 색 면 위 4.497:1, 실측) · 링크/eyebrow text-indigo-600
//   카드 bg-white border-slate-200 shadow-sm · 구분선 border-slate-200 · 입력 bg-white border-slate-300

import type { KeyboardEvent, ReactNode } from "react";

/** 용어 풀이 — 화면마다 다르게 풀지 않도록 한 곳에서 쓴다 */
export const GLOSSARY = {
  releaseFilm: "이형 필름 — 압연할 때 리튬이 롤러에, 감을 때 호일끼리 달라붙지 않게 사이에 끼우는 필름",
  dewPoint: "노점(이슬점) — 공기 중 수분이 이슬로 맺히는 온도. 낮을수록 건조하고, 리튬은 수분이 많으면 표면이 변색됩니다",
  arealDensity: "면밀도 — 정해진 넓이의 무게. 얇은 리튬은 두께를 직접 재기 어려워 이 값이 두께의 정본입니다",
  tearFreeRate: "무파단율 — 압연 중 한 번도 끊기지 않은 모 롤 비율",
} as const;

/**
 * 헤더(80px) + sticky 탭 바 높이는 DemoApp 루트의 CSS 변수 --demo-sticky-offset 하나로 정한다.
 * sticky top·scroll-margin 은 Tailwind 가 스캔할 수 있게 클래스 문자열 전체로 쓴다.
 */
export const STICKY_TOP_LG = "lg:top-[var(--demo-sticky-offset)]";
export const SCROLL_MARGIN = "scroll-mt-[var(--demo-sticky-offset)]";

/** 라디오 그룹 방향키 이동 — 선택과 포커스를 함께 옮긴다 (ARIA radio 패턴) */
export function radioKeyNav<T extends string>(
  event: KeyboardEvent<HTMLElement>,
  values: T[],
  current: T,
  onChange: (value: T) => void,
): void {
  const idx = Math.max(0, values.indexOf(current));
  let next = idx;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (idx + 1) % values.length;
  else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (idx - 1 + values.length) % values.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = values.length - 1;
  else return;
  event.preventDefault();
  onChange(values[next]);
  const group = event.currentTarget.closest('[role="radiogroup"]');
  const buttons = group ? Array.from(group.querySelectorAll<HTMLElement>('[role="radio"]')) : [];
  buttons[next]?.focus();
}

export type Tone = "indigo" | "purple" | "emerald" | "amber" | "rose" | "cyan" | "gray";

/**
 * 톤별 Tailwind 클래스 — 문자열 전체를 적어야 Tailwind 가 스캔한다.
 * text 는 bg 위에서 4.5:1 이상. solid/stroke/fill 은 차트 팔레트(charts/palette.ts)와 같은 600 단계.
 */
export const TONE: Record<Tone, { text: string; bg: string; border: string; solid: string; stroke: string; fill: string }> = {
  indigo: { text: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200", solid: "bg-indigo-600", stroke: "stroke-indigo-600", fill: "fill-indigo-600" },
  purple: { text: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200", solid: "bg-purple-600", stroke: "stroke-purple-600", fill: "fill-purple-600" },
  emerald: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", solid: "bg-emerald-600", stroke: "stroke-emerald-600", fill: "fill-emerald-600" },
  amber: { text: "text-amber-800", bg: "bg-amber-50", border: "border-amber-200", solid: "bg-amber-600", stroke: "stroke-amber-600", fill: "fill-amber-600" },
  rose: { text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200", solid: "bg-rose-600", stroke: "stroke-rose-600", fill: "fill-rose-600" },
  cyan: { text: "text-cyan-700", bg: "bg-cyan-50", border: "border-cyan-200", solid: "bg-cyan-600", stroke: "stroke-cyan-600", fill: "fill-cyan-600" },
  gray: { text: "text-slate-700", bg: "bg-slate-100", border: "border-slate-200", solid: "bg-slate-500", stroke: "stroke-slate-500", fill: "fill-slate-500" },
};

/**
 * 라이트 캔버스 공용 클래스 — 화면들이 같은 모양을 쓰도록 문자열로 공유한다.
 *
 * ⚠️ 뒤에 클래스를 덧붙일 때: Tailwind 는 같은 속성의 유틸리티를 CSS 파일 안 순서로 가른다(뒤가 이김).
 *   색은 대체로 이름순이라 `${LIGHT.input} border-rose-500` 은 border-slate-300 에 지고,
 *   `${LIGHT.td} text-rose-700` 도 text-slate-700 에 진다. 크기는 숫자순이라 min-h-11·px-6·text-right 는 이긴다(px-3 은 px-4 에 진다).
 *   상태 색을 얹어야 하면 색이 없는 문자열(thCompact·tdCompact)을 쓰거나 important(`border-rose-500!`)로 누른다.
 */
export const LIGHT = {
  /** 입력칸·select */
  input:
    "w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-500 aria-[invalid=true]:border-rose-500",
  /** 모노스페이스 ID 칩 */
  idChip: "font-mono text-[11px] lg:text-xs px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 break-all",
  /** 누를 수 있는 모노스페이스 ID 칩 — idChip 과 같은 크기, 흰 바탕 테두리 */
  idChipButton:
    "font-mono text-[11px] lg:text-xs px-1.5 py-0.5 rounded-md bg-white border border-slate-300 text-slate-800 break-all hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
  /** 보조 버튼 (흰 바탕 테두리) */
  buttonSecondary:
    "inline-flex items-center justify-center gap-1.5 min-h-10 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
  /** 주 버튼 */
  buttonPrimary:
    "inline-flex items-center justify-center gap-1.5 min-h-10 px-4 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-sm hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:bg-slate-300 disabled:text-slate-600",
  /** 표 머리·줄 */
  // 표 머리는 slate-600 — 옅은 색 면(bg-rose-50 등) 안 표에서도 4.5:1 (slate-500 은 rose-50 위 4.34:1, 실측)
  th: "text-left text-[11px] lg:text-xs font-semibold text-slate-600 border-b border-slate-200 px-3 py-2 whitespace-nowrap",
  td: "px-3 py-2 border-b border-slate-100 text-slate-700",
  /** 촘촘한 표(카드 안 표) 머리 — 좌우 안쪽 여백 없이 열 사이만 띄운다. 숫자 열은 뒤에 text-right */
  thCompact: "text-left text-[11px] lg:text-xs font-semibold text-slate-600 border-b border-slate-200 py-2 pr-3 last:pr-0 whitespace-nowrap",
  /** 촘촘한 표 칸 — 글자색 없음(칸마다 상태 색을 얹으므로 쓰는 쪽에서 정한다). 구분선은 옅은 색 면 위에서도 보이게 slate-200 */
  tdCompact: "py-1.5 pr-3 last:pr-0 border-b border-slate-200",
} as const;

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-4 lg:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({
  eyebrow,
  title,
  description,
  right,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 mb-4">
      <div className="min-w-0">
        {eyebrow && <div className="text-indigo-600 text-[11px] font-bold uppercase tracking-widest mb-1">{eyebrow}</div>}
        <h3 className="text-base lg:text-lg font-bold text-slate-900 leading-snug">{title}</h3>
        {description && <p className="text-xs lg:text-sm text-slate-600 mt-1 leading-relaxed">{description}</p>}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

export function Badge({ tone = "gray", children, className = "" }: { tone?: Tone; children: ReactNode; className?: string }) {
  const t = TONE[tone];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold whitespace-nowrap ${t.bg} ${t.border} ${t.text} ${className}`}>
      {children}
    </span>
  );
}

export function StatTile({
  label,
  value,
  sub,
  tone = "indigo",
  inset = false,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: Tone;
  /** 흰 Card 안에 놓일 때 — 그림자 없는 옅은 면(카드 속 카드 방지) */
  inset?: boolean;
}) {
  return (
    <div
      className={
        inset
          ? "bg-slate-50 p-3 lg:p-4 rounded-xl border border-slate-200"
          : "bg-white p-4 lg:p-5 rounded-2xl border border-slate-200 shadow-sm"
      }
    >
      <div className="text-[11px] lg:text-xs text-slate-600 font-medium mb-1">{label}</div>
      <div className={`text-2xl lg:text-3xl font-extrabold ${TONE[tone].text}`}>{value}</div>
      {sub && <div className="text-[11px] text-slate-500 mt-1 leading-snug">{sub}</div>}
    </div>
  );
}

/** 세그먼트 버튼 (탭 안의 작은 전환) */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
  ariaLabel: string;
}) {
  const values = options.map((o) => o.value);
  const hasActive = values.includes(value);
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="inline-flex flex-wrap rounded-xl bg-slate-100 border border-slate-200 p-1 gap-1">
      {options.map((o, i) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active || (!hasActive && i === 0) ? 0 : -1}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => radioKeyNav(e, values, value, onChange)}
            className={`inline-flex items-center justify-center min-h-10 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              active ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-white"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** 표는 좁은 화면에서 가로 스크롤 */
export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto -mx-4 lg:mx-0 px-4 lg:px-0">{children}</div>;
}

export function Callout({ tone = "indigo", icon, children }: { tone?: Tone; icon?: ReactNode; children: ReactNode }) {
  const t = TONE[tone];
  return (
    <div className={`flex gap-2.5 rounded-xl border px-3.5 py-3 text-xs lg:text-sm leading-relaxed ${t.bg} ${t.border} text-slate-700`}>
      {icon && <span className={`shrink-0 mt-0.5 ${t.text}`}>{icon}</span>}
      <div className="min-w-0">{children}</div>
    </div>
  );
}

// ---- 숫자 표기 — 서버/클라이언트 동일 출력(하이드레이션 안전)을 위해 로케일을 고정한다 ----

const NUMBER_FORMATS = new Map<number, Intl.NumberFormat>();

export function fmtNum(value: number, digits = 1): string {
  let f = NUMBER_FORMATS.get(digits);
  if (!f) {
    f = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
    NUMBER_FORMATS.set(digits, f);
  }
  return f.format(value);
}

export function fmtPct(ratio: number, digits = 0): string {
  return `${fmtNum(ratio * 100, digits)}%`;
}

/** "2026-08-11" → "08/11" */
export function fmtShortDate(date: string): string {
  return date.slice(5, 10).replace("-", "/");
}

/** ISO datetime(+09:00) → "08/11 09:00" — 문자열 그대로 잘라 시간대 변환을 피한다 */
export function fmtShortDateTime(iso: string): string {
  return `${iso.slice(5, 10).replace("-", "/")} ${iso.slice(11, 16)}`;
}
