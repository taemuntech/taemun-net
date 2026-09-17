import React from 'react';
import type { Currency, Villa, VillaFilter } from '../types';
import { VILLAS } from '../data/resorts';
import { EXCHANGE_NOTE } from '../lib/format';
import { Money } from './Money';

interface VillaExplorerProps {
  onSelectVillaForStay: (villa: Villa) => void;
  /** 필터 상태는 상위가 들고 있다 — 헤더의 「Private Estates」 메뉴도 같은 필터를 움직인다 */
  activeFilter: VillaFilter;
  onFilterChange: (filter: VillaFilter) => void;
  currency: Currency;
}

const FILTER_TABS: { id: VillaFilter; label: string }[] = [
  { id: 'all', label: '전체 컬렉션' },
  ...VILLAS.map((villa) => ({ id: villa.type as VillaFilter, label: villa.shortLabel })),
];

export const VillaExplorer: React.FC<VillaExplorerProps> = ({
  onSelectVillaForStay,
  activeFilter,
  onFilterChange,
  currency,
}) => {
  const filteredVillas = VILLAS.filter((v) => activeFilter === 'all' || v.type === activeFilter);

  return (
    <section
      className="py-16 lg:py-24 bg-[#f6f3ed] scroll-mt-[calc(var(--sample-bar-h,0px)_+_64px)]"
      id="collection"
    >
      <div className="w-full px-6 lg:px-14 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 lg:mb-12 pb-6 border-b border-[#c6c7c0]/20">
          <div>
            <span className="text-[11px] text-[#725b38] uppercase tracking-[0.22em] font-medium block mb-2">
              Sanctuary Portfolio
            </span>
            <h2 className="font-editorial text-3xl lg:text-5xl text-[#030402]">The Villa Suite Explorer</h2>
          </div>
          <p className="text-xs lg:text-sm text-[#454742] max-w-md mt-4 lg:mt-0 font-light leading-relaxed">
            엄격히 격리된 독립 영지 구조. 자연 지형을 훼손하지 않는 친환경 건축 양식과 프라이빗 웰니스 시설을 갖춘
            안식처입니다.
          </p>
        </div>

        {/* Filter Tabs — 긴 정식 명칭은 모바일에서 석 줄로 깨져 짧은 이름으로 바꿨다 */}
        <div className="flex flex-wrap gap-2 lg:gap-3 mb-8 lg:mb-10" id="villa-tabs" role="group" aria-label="빌라 타입 필터">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                aria-pressed={isActive}
                className={`min-h-11 px-5 py-2.5 rounded text-[10px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#030402] text-[#fcf9f3]'
                    : 'bg-[#e5e2dc] text-[#1c1c18] hover:bg-[#030402] hover:text-[#fcf9f3]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Villa Detail Showcase Cards */}
        <div className="space-y-8" id="villa-cards-container">
          {filteredVillas.map((villa) => (
            <article
              key={villa.id}
              id={`villa-card-${villa.id}`}
              className="bg-[#f0eee8] border border-[#c6c7c0]/30 rounded p-5 sm:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center transition-all duration-500 shadow-sm"
            >
              {/* Left Image Viewport — 크롭과 hover 확대를 다른 요소에 나눠 걸어 서로 덮어쓰지 않게 한다 */}
              <div className="lg:col-span-7 overflow-hidden rounded">
                <div className="h-[240px] sm:h-[320px] lg:h-[460px] overflow-hidden transition-transform duration-700 hover:scale-[1.02]">
                  <img
                    src={villa.imageUrl}
                    alt={villa.alt}
                    style={villa.imageCropStyle}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="bg-[#e5e2dc] px-3 py-1 text-[#030402] text-[10px] tracking-[0.2em] uppercase font-medium">
                      {villa.region}
                    </span>
                    <span className="text-[#725b38] text-[10px] tracking-[0.2em] uppercase font-semibold">
                      {villa.badge}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl lg:text-3xl text-[#030402] mb-1 leading-tight [word-break:keep-all]">
                    {villa.nameKo}
                  </h3>

                  {/* 면적 표기는 원래 필터 탭 라벨에만 있어 탭을 줄이면 사라질 정보였다 — 카드로 옮겼다 */}
                  <p className="text-[11px] text-[#767872] tracking-wide mb-3">{villa.areaText}</p>

                  <p className="text-xs lg:text-sm text-[#454742] font-light mb-6 leading-relaxed">
                    {villa.description}
                  </p>

                  {/* Architectural Floor Plan Specs — 좁은 화면에서 석 칸이면 글자가 서로 물려 한 칸으로 편다 */}
                  <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 border-y border-[#c6c7c0]/20 py-4 mb-6">
                    <div>
                      <span className="text-[9px] lg:text-[10px] text-[#767872] block uppercase tracking-[0.2em]">
                        마스터 스위트
                      </span>
                      <span className="text-xs lg:text-sm text-[#030402] font-medium block mt-0.5">
                        {villa.specs.suite}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] lg:text-[10px] text-[#767872] block uppercase tracking-[0.2em]">
                        개인 수영장
                      </span>
                      <span className="text-xs lg:text-sm text-[#030402] font-medium block mt-0.5">
                        {villa.specs.pool}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] lg:text-[10px] text-[#767872] block uppercase tracking-[0.2em]">
                        동선 설계
                      </span>
                      <span className="text-xs lg:text-sm text-[#030402] font-medium block mt-0.5">
                        {villa.specs.circulation}
                      </span>
                    </div>
                  </div>

                  {/* Exclusive In-Villa Amenities */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-[#767872] uppercase block tracking-[0.22em] font-medium">
                      In-Villa Refinements
                    </span>
                    <ul className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-4 gap-y-2 text-[#454742] text-xs">
                      {villa.refinements.map((refinement) => (
                        <li key={refinement} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-1.5 bg-[#725b38] rounded-full shrink-0" />
                          <span className="[word-break:keep-all]">{refinement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Pricing & Action — 좁은 화면에서 금액과 버튼이 겹쳐 두 줄로 나눈다 */}
                <div className="pt-4 border-t border-[#c6c7c0]/20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-[#767872] block tracking-wide mb-1">
                      1박 기준 (세금·봉사료 포함 · 예시 요금)
                    </span>
                    {/* ₩ 는 Money 가 산세리프로 그린다 — 세리프에 글리프가 없어 윗줄을 파고들던 자리 */}
                    <span className="font-editorial text-2xl lg:text-3xl text-[#030402] font-normal block leading-none">
                      <Money amount={villa.pricePerNight} currency={currency} /> ~
                    </span>
                    {currency === 'USD' && (
                      <span className="mt-1 block text-[10px] text-[#767872] tracking-wide">{EXCHANGE_NOTE}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectVillaForStay(villa)}
                    id={`btn-select-suite-${villa.id}`}
                    className="w-full sm:w-auto shrink-0 min-h-11 bg-[#030402] text-[#fcf9f3] px-6 py-3 rounded text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#31312d] transition-colors duration-300 whitespace-nowrap"
                  >
                    스위트 셀렉트
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
