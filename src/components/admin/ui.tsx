"use client";

// 관리자 화면의 작은 조각들 — 배지·알림 띠·버튼.
// 배지는 색만으로 뜻을 전하지 않는다(글자 라벨을 항상 같이 둔다), 누르는 것은 44px 이상.

import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { PortfolioKind } from "@/lib/portfolio/schema";

const KIND_TONE: Record<PortfolioKind, string> = {
  // 실존 업체 이름이 걸린 시안 — 한눈에 띄어야 한다
  proposal: "border-red-500/40 bg-red-500/15 text-red-200",
  sample: "border-white/15 bg-white/10 text-gray-300",
  service: "border-emerald-500/40 bg-emerald-500/15 text-emerald-200",
  case: "border-sky-500/40 bg-sky-500/15 text-sky-200",
};

export function KindBadge({ kind, label }: { kind: PortfolioKind; label: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${KIND_TONE[kind]}`}
    >
      {label}
    </span>
  );
}

type BannerTone = "danger" | "warn" | "info";

const BANNER_TONE: Record<BannerTone, string> = {
  danger: "border-red-500/40 bg-red-500/10 text-red-100",
  warn: "border-amber-500/40 bg-amber-500/10 text-amber-100",
  info: "border-white/10 bg-white/[0.04] text-gray-300",
};

export function Banner({
  tone,
  icon,
  children,
}: {
  tone: BannerTone;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      role={tone === "info" ? undefined : "alert"}
      className={`flex items-start gap-2 rounded-xl border px-3 py-2.5 text-[13px] leading-relaxed ${BANNER_TONE[tone]}`}
    >
      {icon ? <span className="mt-0.5 shrink-0">{icon}</span> : null}
      <span className="min-w-0">{children}</span>
    </div>
  );
}

type ChipTone = "neutral" | "active" | "danger" | "ghost";

const CHIP_TONE: Record<ChipTone, string> = {
  neutral: "border-white/10 bg-white/[0.04] text-gray-200 hover:bg-white/[0.08]",
  active: "border-indigo-400/60 bg-indigo-500/25 text-white",
  danger: "border-red-500/50 bg-red-500/15 text-red-100 hover:bg-red-500/25",
  ghost: "border-transparent bg-transparent text-gray-400 hover:text-gray-200",
};

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & { tone?: ChipTone };

/** 작은 동작 버튼 — 세로 44px 이상 */
export function Chip({ tone = "neutral", className = "", children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border px-3 text-[13px] font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${CHIP_TONE[tone]} ${className}`}
    >
      {children}
    </button>
  );
}

type SectionTone = "default" | "danger" | "warn";

const SECTION_TITLE_TONE: Record<SectionTone, string> = {
  default: "text-gray-200",
  danger: "text-red-300",
  warn: "text-amber-300",
};

/**
 * 제목 한 줄 + 카드 한 장 — 오늘·설정 화면의 칸. (P1b, 2026-09-19 가온)
 * 건수는 글자로 같이 적는다(색만으로 「급하다」를 전하지 않는다).
 */
export function Section({
  title,
  count,
  tone = "default",
  hint,
  children,
}: {
  title: string;
  count?: number;
  tone?: SectionTone;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className={`flex items-baseline gap-2 px-1 text-sm font-bold ${SECTION_TITLE_TONE[tone]}`}>
        <span>{title}</span>
        {typeof count === "number" ? <span className="text-xs font-semibold text-gray-500">{count}건</span> : null}
      </h2>
      {hint ? <p className="px-1 text-[12px] leading-relaxed text-gray-500">{hint}</p> : null}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-gray-900/60">{children}</div>
    </section>
  );
}
