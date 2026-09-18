import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Layers } from "lucide-react";
import Header from "@/components/Header";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import ParticleCanvas from "@/components/ParticleCanvas";
import PortfolioGallery, { PortfolioGalleryFallback } from "@/components/portfolio/PortfolioGallery";
import type { GalleryItem } from "@/components/portfolio/PortfolioCardView";
import { getPortfolio, getPortfolioStats } from "@/lib/portfolio/registry";
import { listedDemoLinks } from "@/lib/portfolio/header-links";
import { toGalleryItem } from "@/lib/portfolio/gallery-items";
import { getState, isListed, resolveStatus } from "@/lib/portfolio/state";
import { SITE_OG_IMAGES } from "@/lib/site-og";

// 공개 상태를 접속 때마다 다시 본다 — 관리자가 「내리기」를 누르면 바로 목록에서 빠져야 한다.
// force-dynamic 이 없으면 빌드 시점에 읽은 스냅숏(표가 아직 없으면 「읽기 실패」)이 정적 HTML 로 굳어
// 재배포 전까지 그대로 남는다. 목록 한 장이라 동적 렌더 비용은 무시할 만하다.
export const dynamic = "force-dynamic";

const DESCRIPTION =
  "태문넷이 만든 업종별 샘플 사이트와 직접 운영 중인 서비스를 한곳에서 보세요. 인테리어·건축·제조·쇼핑몰 등 업종별로 골라 보고, 마음에 드는 사이트를 기준으로 제작을 문의할 수 있습니다.";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "태문넷",
    title: "포트폴리오 | 태문넷",
    description: DESCRIPTION,
    url: "/portfolio",
    images: SITE_OG_IMAGES,
  },
};

function StatTile({ value, label, tone }: { value: number; label: string; tone: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
      <div className={`text-2xl lg:text-3xl font-bold ${tone}`}>{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}

export default async function PortfolioPage() {
  // 목록에 실을 것만 남긴다 — 링크 전용(unlisted)·비공개(private)는 여기서 빠진다.
  // 수치(StatTile)·업종 탭·종류 탭 개수도 남은 것만 세도록 걸러낸 목록으로 stats 를 만든다.
  // 상태 읽기가 실패하면 resolveStatus 가 fallbackStatus 로 판정해 제안 시안이 통째로 빠진다(의도).
  const snapshot = await getState();
  const portfolio = getPortfolio().filter((p) => isListed(resolveStatus(snapshot, p.slug, p.kind)));
  const stats = getPortfolioStats(portfolio);

  const items: GalleryItem[] = portfolio.map(toGalleryItem);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030712] text-gray-100 selection:bg-indigo-500/30">
      <ParticleCanvas />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-2/3 right-10 w-[500px] max-w-full h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* 헤더 드롭다운도 같은 스냅숏으로 거른다 — 회사 이름이 클라이언트 청크에 박히지 않게
          서버에서 걸러 낸 배열만 내려 준다(src/lib/portfolio/header-links.ts 주석 참고) */}
      <Header demoLinks={listedDemoLinks(snapshot)} />

      <div className="relative z-10 pt-28 lg:pt-32 pb-24 px-4 lg:px-12 max-w-7xl mx-auto">
        {/* 제목 · 계산된 수치 */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium tracking-wide mb-6">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>TAEMUN.NET PORTFOLIO</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight break-keep">
            업종에 맞춘{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
              사이트를 직접 둘러보세요
            </span>
          </h1>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed break-keep">
            업종별 샘플 사이트는 가상 브랜드로 만든 시안, 제안용 시안은 실존 업체에 제안하려고 만든 시안(그 회사가 의뢰한 것이 아닙니다),
            운영 중 서비스는 태문이 직접 운영하는 실제 서비스입니다.
            마음에 드는 사이트를 골라 「이런 사이트 문의」를 누르면 그 사이트를 기준으로 상담을 시작합니다.
          </p>

          {stats.total > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 mt-10 pt-8 border-t border-white/5">
              <StatTile value={stats.total} label="전체" tone="text-white" />
              <StatTile value={stats.byKind.sample} label="업종별 샘플" tone="text-indigo-400" />
              <StatTile value={stats.byKind.proposal} label="제안용 시안" tone="text-sky-400" />
              <StatTile value={stats.byKind.service} label="운영 중 서비스" tone="text-emerald-400" />
              <StatTile value={stats.industries.length} label="업종" tone="text-purple-400" />
            </div>
          )}
        </div>

        {/* 갤러리 — useSearchParams 를 쓰므로 Suspense. 첫 HTML 에는 필터 없는 목록 + 같은 높이의 비활성 필터 바를 싣는다 */}
        <Suspense
          fallback={<PortfolioGalleryFallback items={items} industries={stats.industries} kindCounts={stats.byKind} />}
        >
          <PortfolioGallery items={items} industries={stats.industries} kindCounts={stats.byKind} />
        </Suspense>

        {/* 하단 CTA */}
        <div className="mt-20 p-6 sm:p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-gray-900 to-purple-950/30 border border-indigo-500/20 text-center max-w-4xl mx-auto shadow-2xl">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-4 break-keep">원하는 업종 샘플이 없나요?</h2>
          <p className="text-sm lg:text-base text-gray-400 mb-8 max-w-xl mx-auto break-keep">
            업종에 맞춰 시안부터 만들어 드립니다. 업종과 원하는 기능을 알려 주세요.
          </p>
          <Link
            href="/inquiry"
            className="w-full sm:w-auto min-h-12 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>시안 제작 문의</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <FloatingChatWidget />
    </main>
  );
}
