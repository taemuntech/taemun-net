import React, { useState } from 'react';
import { Villa } from '../types';
import { VILLAS } from '../data/resorts';

interface VillaExplorerProps {
  onSelectVillaForStay: (villa: Villa) => void;
}

export const VillaExplorer: React.FC<VillaExplorerProps> = ({ onSelectVillaForStay }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cliff' | 'presidential' | 'forest'>('all');

  const filteredVillas = VILLAS.filter((v) => {
    if (activeFilter === 'all') return true;
    return v.type === activeFilter;
  });

  return (
    <section className="py-20 lg:py-24 bg-[#f6f3ed]" id="collection">
      <div className="w-full px-6 lg:px-14 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-[#c6c7c0]/20">
          <div>
            <span className="text-[11px] text-[#725b38] uppercase tracking-[0.22em] font-medium block mb-2">
              Sanctuary Portfolio
            </span>
            <h2 className="font-editorial text-3xl lg:text-5xl text-[#030402]">
              The Villa Suite Explorer
            </h2>
          </div>
          <p className="text-xs lg:text-sm text-[#454742] max-w-md mt-4 lg:mt-0 font-light leading-relaxed">
            엄격히 격리된 독립 영지 구조. 자연 지형을 훼손하지 않는 친환경 건축 양식과 프라이빗 웰니스 시설을 완비한 안식처입니다.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 lg:gap-3 mb-10" id="villa-tabs">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-5 py-2.5 rounded text-[10px] tracking-[0.22em] uppercase font-semibold transition-all duration-300 ${ activeFilter === 'all' ? 'bg-[#030402] text-[#fcf9f3]' : 'bg-[#e5e2dc] text-[#1c1c18] hover:bg-[#030402] hover:text-[#fcf9f3]' }`}
          >
            전체 컬렉션 (All Sanctuaries)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('cliff')}
            className={`px-5 py-2.5 rounded text-[10px] tracking-[0.22em] uppercase font-semibold transition-all duration-300 ${ activeFilter === 'cliff' ? 'bg-[#030402] text-[#fcf9f3]' : 'bg-[#e5e2dc] text-[#1c1c18] hover:bg-[#030402] hover:text-[#fcf9f3]' }`}
          >
            Cliff Pool Villa (남해 절벽 풀빌라 - 420㎡ / 127평)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('presidential')}
            className={`px-5 py-2.5 rounded text-[10px] tracking-[0.22em] uppercase font-semibold transition-all duration-300 ${ activeFilter === 'presidential' ? 'bg-[#030402] text-[#fcf9f3]' : 'bg-[#e5e2dc] text-[#1c1c18] hover:bg-[#030402] hover:text-[#fcf9f3]' }`}
          >
            Presidential Estate (제주 곶자왈 프레지덴셜 - 850㎡ / 257평)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('forest')}
            className={`px-5 py-2.5 rounded text-[10px] tracking-[0.22em] uppercase font-semibold transition-all duration-300 ${ activeFilter === 'forest' ? 'bg-[#030402] text-[#fcf9f3]' : 'bg-[#e5e2dc] text-[#1c1c18] hover:bg-[#030402] hover:text-[#fcf9f3]' }`}
          >
            Forest Sanctuary (우붓 프라이빗 밸리 - 380㎡ / 115평)
          </button>
        </div>

        {/* Villa Detail Showcase Cards */}
        <div className="space-y-8" id="villa-cards-container">
          {filteredVillas.map((villa) => (
            <article
              key={villa.id}
              id={`villa-card-${villa.id}`}
              className="bg-[#f0eee8] border border-[#c6c7c0]/30 rounded p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500 shadow-sm"
            >
              {/* Left Image Viewport */}
              <div className="lg:col-span-7 overflow-hidden rounded">
                <img
                  src={villa.imageUrl}
                  alt={villa.alt}
                  className="w-full h-[320px] lg:h-[460px] object-cover transition-transform duration-700 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right Content */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="bg-[#e5e2dc] px-3 py-1 text-[#030402] text-[10px] tracking-[0.22em] uppercase font-medium">
                      {villa.region}
                    </span>
                    <span className="text-[#725b38] text-[10px] tracking-[0.22em] uppercase font-semibold">
                      {villa.badge}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl lg:text-3xl text-[#030402] mb-2 leading-tight">
                    {villa.nameKo}
                  </h3>

                  <p className="text-xs lg:text-sm text-[#454742] font-light mb-6 leading-relaxed">
                    {villa.description}
                  </p>

                  {/* Architectural Floor Plan Specs */}
                  <div className="grid grid-cols-3 gap-2 lg:gap-3 border-y border-[#c6c7c0]/20 py-4 mb-6">
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
                    <ul className="grid grid-cols-2 gap-2 text-[#454742] text-xs">
                      {villa.refinements.map((refinement, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#725b38] rounded-full shrink-0" />
                          <span>{refinement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Pricing & Action */}
                <div className="pt-4 border-t border-[#c6c7c0]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#767872] block tracking-wide">
                      1박 기준 (세금·봉사료 포함 · 예시 요금)
                    </span>
                    <span className="font-editorial text-2xl lg:text-3xl text-[#030402] font-normal">
                      ₩{villa.pricePerNight.toLocaleString()} ~
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectVillaForStay(villa)}
                    id={`btn-select-suite-${villa.id}`}
                    className="bg-[#030402] text-[#fcf9f3] px-6 py-3 rounded text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-[#31312d] transition-colors duration-300"
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
