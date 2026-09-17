import React from 'react';
import { Check } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedMaterials: string[];
  onToggleMaterial: (mat: string) => void;
  onResetMaterials: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedMaterials,
  onToggleMaterial,
  onResetMaterials,
  sortBy,
  onSortChange
}) => {
  // 칩은 **실제로 상품이 있는 것만** 둔다. 예전엔 라운지 체어·시스템 선반·천연가죽이 있었는데
  // 해당 상품이 하나도 없어 누를 때마다 「선택한 조건에 해당하는 가구가 없습니다」가 떴다.
  const categories = [
    { id: 'all', label: '전체 컬렉션' },
    { id: 'sofa', label: '모듈 소파 & 테이블' },
    { id: 'dining', label: '다이닝 테이블' },
    { id: 'lighting', label: '조명 컬렉션' }
  ];

  const materials = [
    { id: 'boucle', label: '부클레 원단 (이지클린)', color: '#EADCC9' },
    { id: 'oak', label: '솔리드 화이트 오크', color: '#D4C3A3' },
    { id: 'travertine', label: '트래버틴 천연석', color: '#E2DACB' },
    { id: 'brass', label: '핸드 피니시 솔리드 브라스', color: '#C5A059' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8 border-b border-[#d0c4c0]/40">
      <div className="flex flex-col gap-5">
        {/* Category & Sort Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* 칩 줄은 **자기 가로 스크롤 상자 안에서만** 넘친다 — 지면이 밀리지 않게 min-w-0 */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 min-w-0">
            <span className="text-[11px] font-semibold text-[#7f7571] mr-2 whitespace-nowrap shrink-0">
              품목 카테고리:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  aria-pressed={isSelected}
                  className={`flex items-center shrink-0 px-3.5 min-h-11 lg:min-h-0 lg:py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-[#100e0d] text-[#fff8f4] shadow-xs'
                      : 'bg-[#f6ece5] hover:bg-[#f0e7df] text-[#4d4542]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#7f7571] shrink-0">
            <label htmlFor="ma-sort" className="font-medium">
              정렬:
            </label>
            <select
              id="ma-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent border-0 text-xs text-[#100e0d] font-semibold focus:ring-0 focus:outline-none cursor-pointer pr-6 min-h-11 lg:min-h-0 lg:py-0"
            >
              <option value="recommended">아키텍트 추천순</option>
              <option value="newest">신상품순</option>
              <option value="price-desc">높은 가격순</option>
              <option value="price-asc">낮은 가격순</option>
            </select>
          </div>
        </div>

        {/* Material Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-[#d0c4c0]/30 text-xs min-w-0">
          <span className="text-[11px] font-semibold text-[#7f7571] mr-2 whitespace-nowrap shrink-0">
            소재 셀렉션:
          </span>
          {materials.map((mat) => {
            const isSelected = selectedMaterials.includes(mat.id);
            return (
              <button
                key={mat.id}
                onClick={() => onToggleMaterial(mat.id)}
                aria-pressed={isSelected}
                className={`inline-flex items-center shrink-0 gap-1.5 px-3 min-h-11 lg:min-h-0 lg:py-1 rounded-full border text-xs whitespace-nowrap transition-all ${
                  isSelected
                    ? 'border-[#100e0d] bg-[#100e0d] text-[#fff8f4] shadow-2xs'
                    : 'border-[#d0c4c0]/70 text-[#4d4542] hover:border-[#100e0d] bg-[#fff8f4]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full ring-1 ring-black/10 shrink-0"
                  style={{ backgroundColor: mat.color }}
                />
                <span>{mat.label}</span>
                {isSelected && <Check className="w-3 h-3 text-[#e9c176] shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* 소재를 여러 개 켜면 카테고리와 물려 목록이 빌 수 있다 — 한 번에 푸는 길을 둔다 */}
        {selectedMaterials.length > 0 && (
          <div className="flex">
            <button
              type="button"
              onClick={onResetMaterials}
              className="flex items-center min-h-11 lg:min-h-0 lg:py-1 text-[11px] font-semibold text-[#944931] hover:text-[#77331d] underline underline-offset-4 transition-colors"
            >
              소재 필터 {selectedMaterials.length}개 해제
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
