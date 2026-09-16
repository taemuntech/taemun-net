import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Eye, Info } from "lucide-react";
import { PROPOSAL_DISCLAIMER, type IndustryKey, type PortfolioKind } from "@/lib/portfolio/schema";
import { sampleInquiryHref } from "@/components/demo-kit/sample-lead";
import KindBadge from "./KindBadge";

// 갤러리 카드 1장. 훅이 없어 서버·클라이언트 어디서든 렌더된다
// (page 의 Suspense fallback 에서도 같은 카드를 써서 첫 HTML 에 목록이 실린다).

/** 서버 page → 갤러리로 넘기는 직렬화 가능한 카드 모양 */
export type GalleryItem = {
  slug: string;
  kind: PortfolioKind;
  industry: IndustryKey;
  industryLabel: string;
  title: string;
  subtitle: string;
  features: string[];
  liveUrl: string;
  /** public 에 파일이 실제로 있을 때만 경로, 없으면 null(자리표시를 그린다) */
  thumbnailSrc: string | null;
};

const PLACEHOLDER_TONE: Record<IndustryKey, string> = {
  interior: "from-stone-700/70 via-amber-900/40 to-gray-950",
  construction: "from-slate-700/70 via-orange-900/40 to-gray-950",
  civil: "from-zinc-700/70 via-yellow-900/40 to-gray-950",
  facility: "from-sky-800/60 via-cyan-900/40 to-gray-950",
  manufacturing: "from-neutral-700/70 via-rose-900/40 to-gray-950",
  commerce: "from-fuchsia-800/60 via-pink-900/40 to-gray-950",
  corporate: "from-indigo-800/60 via-blue-900/40 to-gray-950",
  platform: "from-violet-800/60 via-purple-900/40 to-gray-950",
};

/** 문의 주소 규칙은 샘플 바·샘플 안내와 같은 한 곳(sample-lead.ts)을 쓴다 */
export function inquiryHref(item: Pick<GalleryItem, "slug" | "industry">): string {
  return sampleInquiryHref({ from: item.slug, industry: item.industry });
}

const btnBase =
  "min-h-11 flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";

export default function PortfolioCardView({ item }: { item: GalleryItem }) {
  const isInternal = item.liveUrl.startsWith("/");

  return (
    <article className="group flex flex-col min-w-0 rounded-3xl bg-gray-900/60 border border-white/10 hover:border-indigo-500/40 backdrop-blur-md overflow-hidden transition-colors">
      {/* 썸네일 16:10 */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-950 border-b border-white/5">
        {item.thumbnailSrc ? (
          <Image
            src={item.thumbnailSrc}
            alt={item.kind === "proposal" ? `${item.title} 제안 시안 화면` : `${item.title} 사이트 화면`}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`absolute inset-0 flex flex-col justify-end gap-1 p-5 bg-gradient-to-br ${PLACEHOLDER_TONE[item.industry]}`}
          >
            <span className="text-xs font-medium tracking-wide text-white/60">{item.industryLabel}</span>
            <span className="text-xl font-bold text-white/90 leading-snug line-clamp-2 break-keep">{item.title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <KindBadge kind={item.kind} />
          <span className="text-xs text-gray-400">{item.industryLabel}</span>
        </div>

        <h2 className="text-lg font-bold text-white leading-snug break-keep">{item.title}</h2>
        <p className="mt-1.5 text-sm text-gray-400 leading-relaxed break-keep">{item.subtitle}</p>

        {/* 실존 업체 이름이 걸린 시안 — 카드에서도 「그 회사가 의뢰한 사이트가 아니다」를 밝힌다 */}
        {item.kind === "proposal" && (
          <p className="mt-3 flex items-start gap-1.5 rounded-xl border border-sky-400/20 bg-sky-500/[0.07] px-3 py-2 text-xs leading-relaxed text-sky-200 break-keep">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{PROPOSAL_DISCLAIMER}</span>
          </p>
        )}

        <ul className="mt-4 space-y-1.5">
          {item.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
              <span className="leading-relaxed break-keep">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5 flex flex-col sm:flex-row gap-2">
          {isInternal ? (
            <Link href={item.liveUrl} className={`${btnBase} bg-indigo-600 hover:bg-indigo-500 text-white`}>
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>{item.kind === "proposal" ? "시안 보기" : "사이트 보기"}</span>
            </Link>
          ) : (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noreferrer"
              className={`${btnBase} bg-indigo-600 hover:bg-indigo-500 text-white`}
            >
              <span>사이트 보기</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">(새 탭)</span>
            </a>
          )}
          <Link
            href={inquiryHref(item)}
            className={`${btnBase} bg-white/[0.05] hover:bg-white/10 text-gray-200 border border-white/10`}
          >
            <span>이런 사이트 문의</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
