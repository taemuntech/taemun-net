import React from 'react';
import { SlidersHorizontal, RotateCcw, CheckCircle2, Leaf, Sparkles, ShieldCheck } from 'lucide-react';
import { RANKING_PRODUCTS } from '../data/mockData';

interface FilterHUDProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedSkinType: string;
  setSelectedSkinType: (val: string) => void;
  selectedSkinConcern: string;
  setSelectedSkinConcern: (val: string) => void;
  selectedCert: string;
  setSelectedCert: (val: string) => void;
  onReset: () => void;
}

export const FilterHUD: React.FC<FilterHUDProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedSkinType,
  setSelectedSkinType,
  selectedSkinConcern,
  setSelectedSkinConcern,
  selectedCert,
  setSelectedCert,
  onReset,
}) => {
  /**
   * 칩 개수 — **판정은 LuminousLabApp.filterProducts 와 같은 규칙**(부분 문자열 포함)을 쓴다.
   *
   * 왜 필요한가(실측 2026-09-17): 예시 상품이 4종뿐인데 칩은 그보다 넓게 깔려 있어서
   * 「스킨/토너패드」·「약산성 클렌징」·「미백/기미 잡티」는 눌러도 랭킹 목록이 매번 비었다.
   * 0종 칩은 「준비 중」과 같은 말이라 내보내지 않고, 남은 칩에는 결과 수를 같이 적는다 —
   * 상품을 늘리다 같은 일이 생겨도 지면에서 바로 보인다.
   */
  const countByCategory = (value: string) =>
    RANKING_PRODUCTS.filter((p) => p.category.includes(value)).length;
  const countBySkinType = (value: string) =>
    RANKING_PRODUCTS.filter((p) => p.skinType.some((st) => st.includes(value))).length;
  const countByConcern = (value: string) =>
    RANKING_PRODUCTS.filter((p) => p.skinConcern.some((sc) => sc.includes(value))).length;
  const countByCert = (value: string) =>
    RANKING_PRODUCTS.filter((p) => p.certifications.some((c) => c.includes(value))).length;

  const categories = ['스킨/토너패드', '앰플/에센스', '장벽 수분크림', '마일드 선케어', '약산성 클렌징'].filter(
    (c) => countByCategory(c) > 0,
  );
  const skinTypes = ['수부지 (수분부족지성)', '민감성 & 붉은기', '극건성 & 당김', '지성 & 과다피지', '복합성'].filter(
    (t) => countBySkinType(t) > 0,
  );
  const skinConcerns = [
    { label: '트러블/진정', dotColor: 'bg-emerald-500' },
    { label: '장벽강화/보습', dotColor: 'bg-emerald-600' },
    { label: '모공/블랙헤드', dotColor: 'bg-indigo-500' },
    { label: '주름/탄력 리프팅', dotColor: 'bg-purple-500' },
    { label: '미백/기미 잡티', dotColor: 'bg-amber-500' },
  ].filter((c) => countByConcern(c.label) > 0);
  const certifications = [
    { label: '클린 그린 등급 1~2 (자체 기준)', icon: CheckCircle2 },
    { label: '비건 처방 (예시 인증)', icon: Leaf },
    { label: '인공향료·색소 무첨가', icon: Sparkles },
    { label: '논코메도제닉 테스트 완료', icon: ShieldCheck },
  ].filter((c) => countByCert(c.label) > 0);

  const hasActiveFilters =
    selectedCategory !== '전체' ||
    selectedSkinType !== '' ||
    selectedSkinConcern !== '' ||
    selectedCert !== '';

  return (
    <section id="filter-section" className="py-8 bg-[#f1f3ff]/50 border-y border-[#bccac0]/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <SlidersHorizontal className="w-5 h-5 text-[#006948]" />
            <h2 className="text-base lg:text-xl font-bold text-[#141b2b]">
              더마 필터 스마트 탐색 (Smart HUD)
            </h2>
            {hasActiveFilters && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#006948] text-white font-bold">
                필터 적용 중
              </span>
            )}
          </div>
          <button
            onClick={onReset}
            className="text-xs font-semibold text-[#006948] hover:underline flex items-center gap-1 cursor-pointer transition-colors min-h-11 lg:min-h-0 px-2 -mr-2 lg:px-0 lg:mr-0"
          >
            <RotateCcw className="w-3.5 h-3.5" /> 필터 초기화
          </button>
        </div>

        {/* 4 Rows of Targeted Skincare Attributes */}
        <div className="dew-glass-tier1 rounded-2xl p-4 lg:p-6 space-y-4 shadow-sm border border-gray-100">
          {/* 1. Category */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <span className="w-24 shrink-0 text-xs font-bold text-[#3d4a42]">카테고리</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('전체')}
                className={`min-h-11 lg:min-h-0 lg:h-[34px] px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${ selectedCategory === '전체' ? 'bg-[#006948] text-white border border-[#006948] shadow-xs' : 'bg-white text-[#3d4a42] border border-[#bccac0]/50 hover:border-[#006948]' }`}
              >
                전체 <span className="opacity-70">({RANKING_PRODUCTS.length})</span>
              </button>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`min-h-11 lg:min-h-0 lg:h-[34px] px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${ isSelected ? 'bg-[#006948] text-white border border-[#006948] shadow-xs' : 'bg-white text-[#3d4a42] border border-[#bccac0]/50 hover:border-[#006948]' }`}
                  >
                    {cat} <span className="opacity-70">({countByCategory(cat)})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Skin Type */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <span className="w-24 shrink-0 text-xs font-bold text-[#3d4a42]">피부 타입</span>
            <div className="flex flex-wrap items-center gap-2">
              {skinTypes.map((type) => {
                const isSelected = selectedSkinType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedSkinType(isSelected ? '' : type)}
                    className={`min-h-11 lg:min-h-0 lg:h-[34px] px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${ isSelected ? 'bg-[#006948] text-white border border-[#006948] shadow-xs' : 'bg-white text-[#3d4a42] border border-[#bccac0]/50 hover:border-[#006948]' }`}
                  >
                    {type} <span className="opacity-70">({countBySkinType(type)})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Skin Concern */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <span className="w-24 shrink-0 text-xs font-bold text-[#3d4a42]">피부 고민</span>
            <div className="flex flex-wrap items-center gap-2">
              {skinConcerns.map((concern) => {
                const isSelected = selectedSkinConcern === concern.label;
                return (
                  <button
                    key={concern.label}
                    onClick={() => setSelectedSkinConcern(isSelected ? '' : concern.label)}
                    className={`min-h-11 lg:min-h-0 lg:h-[34px] px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${ isSelected ? 'bg-[#006948] text-white border border-[#006948] shadow-xs' : 'bg-white text-[#3d4a42] border border-[#bccac0]/50 hover:border-[#006948]' }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${ isSelected ? 'bg-white' : concern.dotColor }`}
                    />
                    {concern.label} <span className="opacity-70">({countByConcern(concern.label)})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Safety Certification Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 pt-2 border-t border-gray-100">
            <span className="w-24 shrink-0 text-xs font-bold text-[#3d4a42]">클린 표기 (예시)</span>
            <div className="flex flex-wrap items-center gap-2">
              {certifications.map((cert) => {
                const isSelected = selectedCert === cert.label;
                const IconComponent = cert.icon;
                return (
                  <button
                    key={cert.label}
                    onClick={() => setSelectedCert(isSelected ? '' : cert.label)}
                    className={`min-h-11 lg:min-h-0 lg:h-[28px] px-3 rounded text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${ isSelected ? 'bg-[#006948] text-white border border-[#006948]' : 'bg-[#006948]/10 text-[#006948] border border-[#006948]/30 hover:bg-[#006948]/20' }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    {cert.label} <span className="opacity-70">({countByCert(cert.label)})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
