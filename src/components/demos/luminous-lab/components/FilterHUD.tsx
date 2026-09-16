import React from 'react';
import { SlidersHorizontal, RotateCcw, CheckCircle2, Leaf, Sparkles, ShieldCheck } from 'lucide-react';

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
  const categories = ['전체', '스킨/토너패드', '앰플/에센스', '장벽 수분크림', '마일드 선케어', '약산성 클렌징'];
  const skinTypes = ['수부지 (수분부족지성)', '민감성 & 붉은기', '극건성 & 당김', '지성 & 과다피지', '복합성'];
  const skinConcerns = [
    { label: '트러블/진정', dotColor: 'bg-emerald-500' },
    { label: '장벽강화/보습', dotColor: 'bg-emerald-600' },
    { label: '모공/블랙헤드', dotColor: 'bg-indigo-500' },
    { label: '주름/탄력 리프팅', dotColor: 'bg-purple-500' },
    { label: '미백/기미 잡티', dotColor: 'bg-amber-500' },
  ];
  const certifications = [
    { label: 'EWG ALL GREEN 1~2등급', icon: CheckCircle2 },
    { label: '100% 이브 비건(EVE VEGAN)', icon: Leaf },
    { label: '인공향료·색소 무첨가', icon: Sparkles },
    { label: '논코메도제닉 테스트 완료', icon: ShieldCheck },
  ];

  const hasActiveFilters =
    selectedCategory !== '전체' ||
    selectedSkinType !== '' ||
    selectedSkinConcern !== '' ||
    selectedCert !== '';

  return (
    <section id="filter-section" className="py-8 bg-[#f1f3ff]/50 border-y border-[#bccac0]/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#006948]" />
            <h2 className="text-lg lg:text-xl font-bold text-[#141b2b]">
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
            className="text-xs font-semibold text-[#006948] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
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
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`h-[34px] px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${ isSelected ? 'bg-[#006948] text-white border border-[#006948] shadow-xs' : 'bg-white text-[#3d4a42] border border-[#bccac0]/50 hover:border-[#006948]' }`}
                  >
                    {cat}
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
                    className={`h-[34px] px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${ isSelected ? 'bg-[#006948] text-white border border-[#006948] shadow-xs' : 'bg-white text-[#3d4a42] border border-[#bccac0]/50 hover:border-[#006948]' }`}
                  >
                    {type}
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
                    className={`h-[34px] px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${ isSelected ? 'bg-[#006948] text-white border border-[#006948] shadow-xs' : 'bg-white text-[#3d4a42] border border-[#bccac0]/50 hover:border-[#006948]' }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${ isSelected ? 'bg-white' : concern.dotColor }`}
                    />
                    {concern.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Safety Certification Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 pt-2 border-t border-gray-100">
            <span className="w-24 shrink-0 text-xs font-bold text-[#3d4a42]">안심 클린 인증</span>
            <div className="flex flex-wrap items-center gap-2">
              {certifications.map((cert) => {
                const isSelected = selectedCert === cert.label;
                const IconComponent = cert.icon;
                return (
                  <button
                    key={cert.label}
                    onClick={() => setSelectedCert(isSelected ? '' : cert.label)}
                    className={`h-[28px] px-3 rounded text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${ isSelected ? 'bg-[#006948] text-white border border-[#006948]' : 'bg-[#006948]/10 text-[#006948] border border-[#006948]/30 hover:bg-[#006948]/20' }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    {cert.label}
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
