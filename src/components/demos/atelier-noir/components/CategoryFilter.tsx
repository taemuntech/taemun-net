import React, { useState } from 'react';
import { colorNameOf } from '../data/mockData';

// 필터 HUD 는 칩을 고르면 아래 상품 그리드가 실제로 바뀐다.
// 세부분류·컬러·핏·패브릭 목록은 지금 카테고리에 실제로 있는 상품에서 뽑는다 —
// 고정 목록을 쓰면 「CASHMERE BLEND」처럼 눌러도 아무 것도 안 걸리는 죽은 칩이 생긴다.
// 같은 칩을 다시 누르면 해제된다(= 전체).

export const LUXURY_CATEGORY = '하이엔드 럭셔리 (70만원+)';

export interface FilterOptions {
  subCategories: string[];
  colors: string[];
  fits: string[];
  fabrics: string[];
}

interface CategoryFilterProps {
  categories: string[];
  options: FilterOptions;
  resultCount: number;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedSubCategory: string | null;
  onSelectSubCategory: (sub: string | null) => void;
  selectedColor: string | null;
  onSelectColor: (color: string | null) => void;
  selectedFit: string | null;
  onSelectFit: (fit: string | null) => void;
  selectedFabric: string | null;
  onSelectFabric: (fabric: string | null) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  options,
  resultCount,
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
  hasActiveFilters,
  onResetFilters,
}) => {
  const [shelfOpen, setShelfOpen] = useState(true);

  const subCategoryLabel =
    selectedCategory === '전체보기'
      ? '[세부분류]'
      : `[${selectedCategory.replace(/\s*\(.*\)$/, '')} 세부분류]`;

  return (
    <section className="bg-[#1b1c1d] hairline-b">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-2.5">
        {/* Tier 1: Primary Category Horizontal Bar */}
        {/* 모바일·태블릿에서는 카테고리 줄만 가로로 굴리고 초기화·HUD 토글은 아래 줄에 둔다 —
            한 줄에 다 넣으면 1024px 미만에서 토글이 화면 밖으로 밀려 보이지 않았다. */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-6 py-1">
          <div className="flex items-center gap-1.5 font-label-md text-xs uppercase tracking-wider overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  aria-pressed={isSelected}
                  className={`px-3 py-1.5 min-h-11 shrink-0 hairline-all transition-all cursor-pointer ${ isSelected ? 'border-[#caf300] text-[#caf300] bg-[#1f2021] font-bold shadow-[0_0_10px_rgba(202,243,0,0.15)]' : cat === '전체보기' ? 'bg-[#1f2021] text-[#e3e2e3] hover:bg-[#292a2b]' : cat === LUXURY_CATEGORY ? 'text-[#b4c5ff] bg-[#1f2021] hover:bg-[#292a2b]' : 'bg-[#1f2021] text-[#c5c9ac] hover:bg-[#292a2b] hover:text-[#ffffff]' }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 shrink-0 justify-between lg:justify-end">
            <span className="font-label-sm text-[11px] text-[#8f9378] shrink-0">
              {resultCount}개 표시 중
            </span>
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="text-[11px] font-label-sm text-[#caf300] hover:underline min-h-11 px-1"
              >
                필터 초기화
              </button>
            )}
            <button
              onClick={() => setShelfOpen(!shelfOpen)}
              aria-expanded={shelfOpen}
              aria-controls="filter-shelf"
              className="flex items-center gap-1.5 text-[#8f9378] hover:text-[#ffffff] transition-colors text-xs font-label-sm uppercase min-h-11 shrink-0"
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
            {options.subCategories.length > 0 && (
              <div className="flex items-center gap-3 text-xs flex-wrap">
                <span className="font-label-sm text-[11px] text-[#8f9378] uppercase tracking-wider shrink-0">
                  {subCategoryLabel}
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {options.subCategories.map((sub, idx) => {
                    const isSelected = selectedSubCategory === sub;
                    return (
                      <React.Fragment key={sub}>
                        <button
                          onClick={() => onSelectSubCategory(isSelected ? null : sub)}
                          aria-pressed={isSelected}
                          className={`transition-colors font-medium cursor-pointer min-h-11 max-lg:px-2 max-lg:border max-lg:border-[#27272a] ${ isSelected ? 'underline underline-offset-4 font-bold text-[#caf300]' : 'text-[#c5c9ac] hover:text-[#ffffff]' }`}
                        >
                          {sub}
                        </button>
                        {idx < options.subCategories.length - 1 && (
                          <span className="text-[#444932] hidden lg:inline">/</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tier 4: Interactive Attribute Filter Chips */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
              {/* Color Attributes */}
              {options.colors.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-[10px] text-[#8f9378]">COLOR:</span>
                  <div className="flex items-center gap-1.5">
                    {options.colors.map((hex) => {
                      const name = colorNameOf(hex);
                      const isSelected = selectedColor === hex;
                      return (
                        <button
                          key={hex}
                          onClick={() => onSelectColor(isSelected ? null : hex)}
                          aria-pressed={isSelected}
                          className="group relative flex items-center justify-center w-11 h-11 -m-1.5 cursor-pointer"
                          title={name}
                          aria-label={`컬러 ${name}`}
                        >
                          <span
                            className={`block w-5 h-5 transition-transform ${ isSelected ? 'border-2 border-[#caf300] scale-110 shadow-sm' : 'border border-[#8f9378] group-hover:scale-105' }`}
                            style={{ backgroundColor: hex }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {options.fits.length > 0 && <div className="hidden lg:block h-4 w-[1px] bg-[#444932]"></div>}

              {/* Fit Filter */}
              {options.fits.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-label-sm text-[10px] text-[#8f9378]">SILHOUETTE FIT:</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    {options.fits.map((fit) => {
                      const isSelected = selectedFit === fit;
                      return (
                        <button
                          key={fit}
                          onClick={() => onSelectFit(isSelected ? null : fit)}
                          aria-pressed={isSelected}
                          className={`px-2 min-h-11 font-label-sm text-[10px] hairline-all cursor-pointer transition-all ${ isSelected ? 'bg-[#ffffff] text-[#0d0e0f] font-semibold' : 'bg-[#1f2021] text-[#c5c9ac] hover:text-[#ffffff]' }`}
                        >
                          {fit}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {options.fabrics.length > 0 && <div className="hidden lg:block h-4 w-[1px] bg-[#444932]"></div>}

              {/* Fabric spec */}
              {options.fabrics.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-label-sm text-[10px] text-[#8f9378]">FABRIC:</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    {options.fabrics.map((fabric) => {
                      const isSelected = selectedFabric === fabric;
                      return (
                        <button
                          key={fabric}
                          onClick={() => onSelectFabric(isSelected ? null : fabric)}
                          aria-pressed={isSelected}
                          className={`font-label-sm text-[10px] px-2 min-h-11 hairline-all cursor-pointer transition-all ${ isSelected ? 'text-[#caf300] bg-[#1f2021] border-[#caf300] font-bold' : 'text-[#c5c9ac] bg-[#1f2021] hover:text-[#ffffff]' }`}
                        >
                          {fabric}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
