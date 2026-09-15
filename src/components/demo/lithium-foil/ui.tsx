// 데모 공용 UI 조각 — taemun.net 톤(다크 글래스 카드·indigo/purple 강조)에 맞춘다.
// 서버/클라이언트 어디서 import 해도 되도록 훅을 쓰지 않는다.

import type { ReactNode } from "react";

export type Tone = "indigo" | "purple" | "emerald" | "amber" | "rose" | "cyan" | "gray";

/** 톤별 Tailwind 클래스 — 문자열 전체를 적어야 Tailwind 가 스캔한다 */
export const TONE: Record<Tone, { text: string; bg: string; border: string; solid: string; stroke: string; fill: string }> = {
  indigo: { text: "text-indigo-300", bg: "bg-indigo-500/10", border: "border-indigo-500/30", solid: "bg-indigo-500", stroke: "stroke-indigo-400", fill: "fill-indigo-400" },
  purple: { text: "text-purple-300", bg: "bg-purple-500/10", border: "border-purple-500/30", solid: "bg-purple-500", stroke: "stroke-purple-400", fill: "fill-purple-400" },
  emerald: { text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30", solid: "bg-emerald-500", stroke: "stroke-emerald-400", fill: "fill-emerald-400" },
  amber: { text: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/30", solid: "bg-amber-500", stroke: "stroke-amber-400", fill: "fill-amber-400" },
  rose: { text: "text-rose-300", bg: "bg-rose-500/10", border: "border-rose-500/30", solid: "bg-rose-500", stroke: "stroke-rose-400", fill: "fill-rose-400" },
  cyan: { text: "text-cyan-300", bg: "bg-cyan-500/10", border: "border-cyan-500/30", solid: "bg-cyan-500", stroke: "stroke-cyan-400", fill: "fill-cyan-400" },
  gray: { text: "text-gray-300", bg: "bg-white/5", border: "border-white/10", solid: "bg-gray-500", stroke: "stroke-gray-400", fill: "fill-gray-400" },
};

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/10 p-4 lg:p-6 ${className}`}>
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
        {eyebrow && <div className="text-indigo-400 text-[11px] font-bold uppercase tracking-widest mb-1">{eyebrow}</div>}
        <h3 className="text-base lg:text-lg font-bold text-white leading-snug">{title}</h3>
        {description && <p className="text-xs lg:text-sm text-gray-400 mt-1 leading-relaxed">{description}</p>}
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
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: Tone;
}) {
  return (
    <div className="bg-gray-900/60 backdrop-blur-md p-4 lg:p-5 rounded-2xl border border-white/5">
      <div className="text-[11px] lg:text-xs text-gray-400 font-medium mb-1">{label}</div>
      <div className={`text-2xl lg:text-3xl font-extrabold ${TONE[tone].text}`}>{value}</div>
      {sub && <div className="text-[11px] text-gray-500 mt-1 leading-snug">{sub}</div>}
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
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="inline-flex flex-wrap rounded-xl bg-gray-950 border border-white/10 p-1 gap-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`inline-flex items-center justify-center min-h-10 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
              active ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
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
    <div className={`flex gap-2.5 rounded-xl border px-3.5 py-3 text-xs lg:text-sm leading-relaxed ${t.bg} ${t.border} text-gray-200`}>
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
