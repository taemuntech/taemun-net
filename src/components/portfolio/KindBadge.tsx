import { KIND_LABEL, type PortfolioKind } from "@/lib/portfolio/schema";

// 종류 배지 — 방문자에게 「이건 샘플」「이건 운영 중」을 그대로 알린다. 색은 종류마다 고정.
const KIND_TONE: Record<PortfolioKind, string> = {
  service: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  sample: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
  proposal: "bg-sky-500/15 text-sky-300 border-sky-400/30",
  case: "bg-amber-500/15 text-amber-300 border-amber-400/30",
};

export default function KindBadge({ kind, className = "" }: { kind: PortfolioKind; className?: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${KIND_TONE[kind]} ${className}`}
    >
      {KIND_LABEL[kind]}
    </span>
  );
}
