import React, { useState } from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedSubCategory: string;
  onSelectSubCategory: (sub: string) => void;
  selectedColor: string;
  onSelectColor: (color: string) => void;
  selectedFit: string;
  onSelectFit: (fit: string) => void;
  selectedFabric: string;
  onSelectFabric: (fabric: string) => void;
  onResetFilters: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSubCategory,
  onSelectSubCategory,
  selectedColor,
  onSelectColor,
  selectedFit,
  onSelectFit,
  selectedFabric,
  onSelectFabric,
  onResetFilters,
}) => {
  const [shelfOpen, setShelfOpen] = useState(true);

  const categories = [
    '전체보기',
    '남성의류',
    '여성의류',
    '아우터 (OUTER)',
    '상의 (TOPS)',
    '하의 (BOTTOMS)',
    '잡화/가방',
    '슈즈 (FOOTWEAR)',
    '하이엔드 럭셔리',
  ];

  const subCategories = [
    '오버사이즈 더블 블레이저',
    '미니멀 테일러드 자켓',
    '울 캐시미어 블렌드 코트',
    '비건 카프스킨 라이더스',
    '구스다운 헤비 파카',
  ];

  const colors = [
    { name: 'Noir Black', hex: '#0C0D0E' },
    { name: 'Dark Charcoal', hex: '#27272A' },
    { name: 'Chalk White', hex: '#F4F4F5' },
    { name: 'Raw Olive', hex: '#3B4228' },
  ];

  const fits = ['오버핏 (OVERSIZED)', '루즈핏', '와이드 테이퍼드'];
  const fabrics = ['100% VIRGIN WOOL', 'CALFSKIN LEATHER', 'CASHMERE BLEND'];

  const hasActiveFilters =
    selectedCategory !== '아우터 (OUTER)' ||
    selectedSubCategory !== '오버사이즈 더블 블레이저' ||
    selectedColor !== 'Noir Black' ||
    selectedFit !== '오버핏 (OVERSIZED)' ||
    selectedFabric !== '100% VIRGIN WOOL';

  return (
    <section className="bg-[#1b1c1d] hairline-b">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-6 py-2.5">
        {/* Tier 1: Primary Category Horizontal Bar */}
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-1 gap-4 lg:gap-6">
          <div className="flex items-center gap-1.5 font-label-md text-xs uppercase tracking-wider shrink-0">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1.5 hairline-all transition-all cursor-pointer ${ isSelected ? 'border-[#caf300] text-[#caf300] bg-[#1f2021] font-bold shadow-[0_0_10px_rgba(202,243,0,0.15)]' : cat === '전체보기' ? 'bg-[#1f2021] text-[#e3e2e3] hover:bg-[#292a2b]' : cat === '하이엔드 럭셔리' ? 'text-[#b4c5ff] bg-[#1f2021] hover:bg-[#292a2b]' : 'bg-[#1f2021] text-[#c5c9ac] hover:bg-[#292a2b] hover:text-[#ffffff]' }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="text-[11px] font-label-sm text-[#caf300] hover:underline"
              >
                필터 초기화
              </button>
            )}
            <button
              onClick={() => setShelfOpen(!shelfOpen)}
              className="flex items-center gap-1.5 text-[#8f9378] hover:text-[#ffffff] transition-colors text-xs font-label-sm uppercase"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>필터 세부설정 (FILTER HUD)</span>
              <span className="material-symbols-outlined text-[14px]">
                {shelfOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        </div>

        {/* Tier 2 & 3: Secondary & Sub-Category Breadcrumb Scaffolding */}
        {shelfOpen && (
          <div className="pt-3 pb-2 flex flex-col gap-3 hairline-t mt-2" id="filter-shelf">
            {/* Sub category Pills */}
            <div className="flex items-center gap-3 text-xs flex-wrap">
              <span className="font-label-sm text-[11px] text-[#8f9378] uppercase tracking-wider shrink-0">
                [아우터 세부분류]
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {subCategories.map((sub, idx) => {
                  const isSelected = selectedSubCategory === sub;
                  return (
                    <React.Fragment key={sub}>
                      <button
                        onClick={() => onSelectSubCategory(sub)}
                        className={`transition-colors font-medium cursor-pointer ${ isSelected ? 'text-[#ffffff] underline underline-offset-4 font-bold text-[#caf300]' : 'text-[#c5c9ac] hover:text-[#ffffff]' }`}
                      >
                        {sub}
                      </button>
                      {idx < subCategories.length - 1 && (
                        <span className="text-[#444932]">/</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Tier 4: Interactive Attribute Filter Chips */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {/* Color Attributes */}
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-[10px] text-[#8f9378]">COLOR:</span>
                <div className="flex items-center gap-1.5">
                  {colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => onSelectColor(c.name)}
                        className={`group relative w-5 h-5 transition-transform ${ isSelected ? 'border-2 border-[#caf300] scale-110 shadow-sm' : 'border border-[#8f9378] hover:scale-105' }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                        aria-label={c.name}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="hidden lg:block h-4 w-[1px] bg-[#444932]"></div>

              {/* Fit Filter */}
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-[10px] text-[#8f9378]">SILHOUETTE FIT:</span>
                <div className="flex items-center gap-1">
                  {fits.map((fit) => {
                    const isSelected = selectedFit === fit;
                    return (
                      <button
                        key={fit}
                        onClick={() => onSelectFit(fit)}
                        className={`px-2 py-0.5 font-label-sm text-[10px] hairline-all cursor-pointer transition-all ${ isSelected ? 'bg-[#ffffff] text-[#0d0e0f] font-semibold' : 'bg-[#1f2021] text-[#c5c9ac] hover:text-[#ffffff]' }`}
                      >
                        {fit}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="hidden lg:block h-4 w-[1px] bg-[#444932]"></div>

              {/* Fabric spec */}
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-[10px] text-[#8f9378]">FABRIC:</span>
                <div className="flex items-center gap-1">
                  {fabrics.map((fabric) => {
                    const isSelected = selectedFabric === fabric;
                    return (
                      <button
                        key={fabric}
                        onClick={() => onSelectFabric(fabric)}
                        className={`font-label-sm text-[10px] px-2 py-0.5 hairline-all cursor-pointer transition-all ${ isSelected ? 'text-[#caf300] bg-[#1f2021] border-[#caf300] font-bold' : 'text-[#c5c9ac] bg-[#1f2021] hover:text-[#ffffff]' }`}
                      >
                        {fabric}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
