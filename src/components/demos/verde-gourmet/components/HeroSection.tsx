import React from 'react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenColdchain: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onOpenColdchain
}) => {
  return (
    <section className="relative rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Hero Visual Image Box */}
        <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[480px]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEf3ZosH7VA_CZj6-z9mBH8g0NyQkR4t7Mz-bAZECtfHGU3gn6Ed5Iy6WgjuFI3qNvJDnlgDfSdq_eBnxyY17jb7H7Y5kbEGL_v7HUErOOySMVTxe6rxfOBkt5DwnqsKNQbAiOlRTwnmmW588xYD83qE8jEVC37joEuw_ikOPuue4cAwMoXqQKv0WzLjlZdhfP_SyH03B7Yop-4T8xYlrF8k8YPgwH6h1_JR5VJd0LX3_5wcE6Gz9C"
            alt="횡성 1++ No.9 채끝등심과 제주 햇당근, 신선한 식재료가 우드 도마 위에 놓인 고메 테이블 연출"
            className="w-full h-full object-cover"
          referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-primary-container/80 via-primary-container/30 to-transparent flex flex-col justify-end p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-secondary text-on-secondary px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wide">
                DAWN HARVEST
              </span>
              <span className="bg-primary-container/90 text-primary-fixed border border-primary-fixed/30 px-2 py-0.5 rounded text-xs font-mono">
                ❄️ 냉장 0.8℃ 실시간 유지
              </span>
            </div>
            <p className="text-on-primary text-2xl lg:text-3xl font-bold drop-shadow-sm leading-tight">
              횡성 1++ No.9 한우 &amp;<br />제주 송당리 햇당근 컬렉션
            </p>
          </div>
        </div>

        {/* Hero Content & Provenance Narrative */}
        <div className="lg:col-span-5 p-6 lg:p-8 bg-surface-container-lowest flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-outline-variant">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-secondary font-bold text-xs font-mono flex items-center gap-1">
                <span className="material-symbols-outlined text-base">eco</span>
                산지직송 24시간 (예시)
              </span>
              <span className="text-outline-variant">·</span>
              <span className="text-on-surface-variant text-xs font-mono">오늘 아침 4시 최종 선별</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-primary leading-tight mb-4">
              새벽 이슬 머금은 대지의 선물,<br />
              가장 완벽한 온도로 식탁까지.
            </h1>
            <p className="text-[14px] text-on-surface-variant leading-relaxed mb-6">
              밤 사이 수확하여 아침 7시 식탁 위로 전해지는 타협 없는 신선함. 
              도축 즉시 산소차단 스킨팩 포장과 0~2℃ 무중단 골든 콜드체인으로 
              풍부한 육즙과 농축된 흙내음을 있는 그대로 배송해 드립니다.
            </p>
            <div className="space-y-2.5 mb-6">
              <div className="flex items-center gap-3 p-2.5 bg-surface-container-low rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-secondary text-2xl">local_shipping</span>
                <div>
                  <div className="text-xs font-bold text-primary">새벽배송 도착 안내 (예시)</div>
                  <div className="text-[12px] text-on-surface-variant">오늘 밤 23시 마감 ➔ 내일 오전 07시 전 안전 배송</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-surface-container-low rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-secondary text-2xl">recycling</span>
                <div>
                  <div className="text-xs font-bold text-primary">생분해 워터아이스팩 &amp; 종이박스 (예시)</div>
                  <div className="text-[12px] text-on-surface-variant">물을 채운 아이스팩과 재활용 골판지를 쓰는 포장 구성 예시입니다.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onExploreProducts}
              className="flex-1 bg-primary text-on-primary hover:bg-secondary py-3 px-5 rounded-lg text-center text-sm font-semibold transition-all active:scale-95 shadow-sm"
            >
              오늘 아침 수확 상품 보기
            </button>
            <button
              type="button"
              onClick={onOpenColdchain}
              className="bg-surface-container hover:bg-surface-container-high text-primary py-3 px-4 rounded-lg text-xs font-mono border border-outline-variant transition-colors flex items-center justify-center gap-1"
            >
              콜드체인 로그
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
