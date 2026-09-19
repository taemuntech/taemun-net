import { KIND_LABEL, type PortfolioKind } from "@/lib/portfolio/schema";

// 종류 배지 — 방문자에게 「이건 샘플」「이건 운영 중」을 그대로 알린다. 색은 종류마다 고정.
const KIND_TONE: Record<PortfolioKind, string> = {
  service: "bg-emerald-50 text-emerald-700 border-emerald-200",
  sample: "bg-zinc-100 text-zinc-800 border-zinc-200",
  proposal: "bg-sky-50 text-sky-700 border-sky-200",
  case: "bg-amber-50 text-amber-800 border-amber-200",
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
