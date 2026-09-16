import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/investmentData';
import { PortfolioCategory, PortfolioItem } from '../types';

interface PortfolioSectionProps {
  onSelectItem: (item: PortfolioItem) => void;
}

const FILTER_OPTIONS: { key: PortfolioCategory; label: string }[] = [
  { key: 'all', label: '전체 (All)' },
  { key: 'unicorn', label: '액티브 유니콘 (Unicorns)' },
  { key: 'exit', label: '성공적 회수 (Exits & IPO)' },
  { key: 'deeptech', label: '딥테크 (Deep-Tech)' },
  { key: 'healthcare', label: '헬스케어/바이오 (Healthcare)' },
];

export default function PortfolioSection({ onSelectItem }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('all');

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.categories.includes(activeFilter);
  });

  return (
    <section className="py-20 bg-[#0e141c] border-t border-[#4d4635]/20" id="portfolio">
      <div className="max-w-[1680px] mx-auto px-6 lg:px-14">
        {/* Section Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10">
          <div>
            <span className="font-mono-metric text-[11px] text-[#f2ca50] tracking-widest uppercase">
              PROVEN VALUE GENERATION
            </span>
            <h2 className="text-2xl lg:text-4xl font-serif-display text-[#dee2ef] mt-2">
              포트폴리오 매트릭스 &amp; 엑싯 홀
            </h2>
            {/* 고지 — 포트폴리오 기업·실적은 모두 지어낸 예시다 */}
            <p className="font-mono-metric text-[11px] text-[#d0c5af]/70 mt-2">
              * 아래 포트폴리오 기업·투자 규모·회수 실적은 모두 가상 설정의 예시입니다.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 lg:mt-0">
            {FILTER_OPTIONS.map((opt) => {
              const isActive = activeFilter === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setActiveFilter(opt.key)}
                  className={`px-4 py-2 text-[11px] font-mono-metric rounded transition-all ${ isActive ? 'border border-[#f2ca50] bg-[#f2ca50] text-[#3c2f00] font-semibold shadow-sm' : 'border border-[#4d4635]/40 bg-[#161c24] text-[#d0c5af] hover:text-[#f2ca50] hover:border-[#f2ca50]/40' }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Rich Portfolio Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isExitBadge = item.badgeVariant === 'emerald';
            const isGoldBadge = item.badgeVariant === 'gold';

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group bg-[#161c24] border border-[#4d4635]/30 hover:border-[#f2ca50]/60 rounded-xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-[#f2ca50]/5"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`px-2.5 py-1 font-mono-metric text-[11px] rounded ${ isExitBadge ? 'bg-[#00a572]/20 border border-[#4edea3]/30 text-[#4edea3]' : isGoldBadge ? 'bg-[#f2ca50]/15 border border-[#f2ca50]/30 text-[#f2ca50]' : 'bg-[#252a33] border border-[#4d4635]/40 text-[#dee2ef]' }`}
                    >
                      {item.badge}
                    </span>
                    <span
                      className={`font-mono-metric text-[11px] ${ item.growthType === 'exit' ? 'text-[#f2ca50] font-semibold' : 'text-[#4edea3]' }`}
                    >
                      {item.growthMetric}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-xl lg:text-2xl text-[#dee2ef] group-hover:text-[#f2ca50] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-mono-metric text-xs text-[#d0c5af] mt-1.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                  <p className="text-xs lg:text-sm text-[#d0c5af]/80 mt-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#4d4635]/20 flex justify-between items-center font-mono-metric text-[11px]">
                  <span
                    className={
                      item.dealStage.includes('Complete') || item.dealStage.includes('Exit')
                        ? 'text-[#4edea3]'
                        : 'text-[#dee2ef]'
                    }
                  >
                    {item.dealStage}
                  </span>
                  <span className="text-[#f2ca50] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>상세 제원 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
