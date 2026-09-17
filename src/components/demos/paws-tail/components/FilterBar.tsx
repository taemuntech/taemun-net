import React from 'react';

interface FilterBarProps {
  lifeStage: string;
  onSelectLifeStage: (stage: string) => void;
  clinicalTarget: string;
  onSelectClinicalTarget: (target: string) => void;
  freeFromFilters: string[];
  onToggleFreeFrom: (filter: string) => void;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  lifeStage,
  onSelectLifeStage,
  clinicalTarget,
  onSelectClinicalTarget,
  freeFromFilters,
  onToggleFreeFrom,
  onResetFilters,
}) => {
  const isAnyActive =
    lifeStage !== 'all' || clinicalTarget !== 'all' || freeFromFilters.length > 0;

  return (
    <section className="bg-[#eff4ff] border-b border-[#bfc9c1]/60 py-3 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto custom-scrollbar whitespace-nowrap">
        {/* Badge */}
        <div className="flex items-center gap-1.5 text-xs text-[#0f5238] font-bold bg-[#b1f0ce] px-3 py-1 rounded-full shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-sm">filter_alt</span>
          <span>맞춤 필터링:</span>
        </div>

        {/* Life Stage Chips */}
        <span className="text-xs text-[#404943] font-medium shrink-0 ml-2">생애주기</span>

        <button
          onClick={() => onSelectLifeStage(lifeStage === 'adult' ? 'all' : 'adult')}
          className={`text-xs px-3 py-1 rounded-full shrink-0 transition-colors font-medium ${
            lifeStage === 'adult'
              ? 'bg-[#0f5238] text-white font-bold shadow-sm'
              : 'bg-white border border-[#bfc9c1] hover:border-[#0f5238] text-[#404943]'
          }`}
        >
          어덜트 (1~7세)
        </button>

        <button
          onClick={() => onSelectLifeStage(lifeStage === 'puppy' ? 'all' : 'puppy')}
          className={`text-xs px-3 py-1 rounded-full shrink-0 transition-colors font-medium ${
            lifeStage === 'puppy'
              ? 'bg-[#0f5238] text-white font-bold shadow-sm'
              : 'bg-white border border-[#bfc9c1] hover:border-[#0f5238] text-[#404943]'
          }`}
        >
          퍼피/키튼 (~12개월)
        </button>

        <button
          onClick={() => onSelectLifeStage(lifeStage === 'senior' ? 'all' : 'senior')}
          className={`text-xs px-3 py-1 rounded-full shrink-0 transition-colors font-medium ${
            lifeStage === 'senior'
              ? 'bg-[#0f5238] text-white font-bold shadow-sm'
              : 'bg-white border border-[#bfc9c1] hover:border-[#0f5238] text-[#404943]'
          }`}
        >
          시니어 (7세 이상)
        </button>

        <span className="h-3 w-px bg-[#bfc9c1] shrink-0 mx-1"></span>

        {/* Clinical Target Chips */}
        <span className="text-xs text-[#404943] font-medium shrink-0">임상 기능</span>

        <button
          onClick={() => onSelectClinicalTarget(clinicalTarget === 'joints' ? 'all' : 'joints')}
          className={`text-xs px-3 py-1 rounded-full shrink-0 transition-colors flex items-center gap-1 font-medium ${
            clinicalTarget === 'joints'
              ? 'bg-white border border-[#0f5238] text-[#0f5238] font-bold shadow-sm ring-1 ring-[#0f5238]'
              : 'bg-white border border-[#bfc9c1] hover:border-[#0f5238] text-[#404943]'
          }`}
        >
          <span className="material-symbols-outlined text-xs">healing</span>
          <span>슬개골/관절</span>
        </button>

        <button
          onClick={() => onSelectClinicalTarget(clinicalTarget === 'allergies' ? 'all' : 'allergies')}
          className={`text-xs px-3 py-1 rounded-full shrink-0 transition-colors font-medium ${
            clinicalTarget === 'allergies'
              ? 'bg-white border border-[#0f5238] text-[#0f5238] font-bold shadow-sm ring-1 ring-[#0f5238]'
              : 'bg-white border border-[#bfc9c1] hover:border-[#0f5238] text-[#404943]'
          }`}
        >
          눈물/식이알러지
        </button>

        <button
          onClick={() => onSelectClinicalTarget(clinicalTarget === 'gut' ? 'all' : 'gut')}
          className={`text-xs px-3 py-1 rounded-full shrink-0 transition-colors font-medium ${
            clinicalTarget === 'gut'
              ? 'bg-white border border-[#0f5238] text-[#0f5238] font-bold shadow-sm ring-1 ring-[#0f5238]'
              : 'bg-white border border-[#bfc9c1] hover:border-[#0f5238] text-[#404943]'
          }`}
        >
          장건강/유산균
        </button>

        <span className="h-3 w-px bg-[#bfc9c1] shrink-0 mx-1"></span>

        {/* Free-From Chips */}
        <button
          onClick={() => onToggleFreeFrom('no-chicken')}
          className={`text-xs px-3 py-1 rounded-full shrink-0 font-medium transition-colors ${
            freeFromFilters.includes('no-chicken')
              ? 'bg-[#835418] text-white font-bold'
              : 'bg-[#ffdcbb] text-[#2b1700] hover:bg-[#faba75]'
          }`}
        >
          닭고기 제외
        </button>

        <button
          onClick={() => onToggleFreeFrom('grain-free')}
          className={`text-xs px-3 py-1 rounded-full shrink-0 font-medium transition-colors ${
            freeFromFilters.includes('grain-free')
              ? 'bg-[#835418] text-white font-bold'
              : 'bg-[#ffdcbb] text-[#2b1700] hover:bg-[#faba75]'
          }`}
        >
          그레인프리
        </button>

        {isAnyActive && (
          <button
            onClick={onResetFilters}
            className="text-xs text-[#707973] hover:text-[#0f5238] underline shrink-0 ml-2"
          >
            초기화
          </button>
        )}
      </div>
    </section>
  );
};
