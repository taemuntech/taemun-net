import React, { useState, useId } from 'react';
import { CULTIVARS } from '../data/smartfarmData';

interface YieldCalculatorProps {
  onQuoteRequested?: (size: number, cropName: string, estimatedTonnes: number) => void;
}

export const YieldCalculator: React.FC<YieldCalculatorProps> = ({ onQuoteRequested }) => {
  const [footprint, setFootprint] = useState<number>(2500);
  const [selectedCropId, setSelectedCropId] = useState<string>('butterhead');
  const sliderId = useId();

  const selectedCrop = CULTIVARS.find((c) => c.id === selectedCropId) || CULTIVARS[0];

  // Mathematical formulation based on Jincheon Giga Biosphere benchmark:
  // Base 1,000 pyung yields ~180 tonnes/year of butterhead
  const annualTonnes = Math.round((footprint / 1000) * 180 * selectedCrop.yieldMultiplier);

  // Water saved (litres): base 1,420만 L per 1,000 pyung
  const waterSavedTenThousands = Math.round((footprint / 1000) * 1420 * selectedCrop.waterMultiplier);

  // Carbon offset: base 84.6 tCO2eq per 1,000 pyung
  const carbonOffset = ((footprint / 1000) * 84.6 * selectedCrop.yieldMultiplier).toFixed(1);

  // Estimated Revenue (in 억원): base 17.0 억원 per 1,000 pyung * price multiplier
  const estimatedRevenueEok = ((footprint / 1000) * 17.0 * selectedCrop.priceMultiplier).toFixed(1);

  // Payback period in years
  const paybackPeriod = (2.8 / (selectedCrop.priceMultiplier * 0.9)).toFixed(1);

  const getFootprintLabel = (size: number) => {
    if (size >= 8000) return `${size.toLocaleString()} 평 (엔터프라이즈 기가 팜)`;
    if (size >= 2500) return `${size.toLocaleString()} 평 (클러스터 팜)`;
    return `${size.toLocaleString()} 평 (표준 모듈)`;
  };

  const handleRequestConsultation = () => {
    if (onQuoteRequested) {
      onQuoteRequested(footprint, selectedCrop.name, annualTonnes);
    } else {
      const b2bSection = document.getElementById('b2b-contract');
      if (b2bSection) {
        b2bSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#bccac0]/30" id="calculator">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00687a]/10 border border-[#00687a]/20 mb-3">
              <span className="material-symbols-outlined text-sm text-[#00687a]">insights</span>
              <span className="font-mono text-[11px] text-[#00687a] font-semibold">
                AGRI-METRICS ENGINE V4.2
              </span>
            </div>
            <h2 className="font-headline text-2xl lg:text-[32px] text-[#131b2e] font-semibold tracking-tight">
              Interactive Harvest &amp; Environmental Yield Calculator
            </h2>
            <p className="font-body text-base lg:text-lg text-[#3d4a42] mt-2">
              시설 규모와 작물 카테고리를 선택하여 예상 수확량, 자원 절감 지표 및 ROI를 즉각 시뮬레이션하세요.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 font-mono text-[11px] text-[#6d7a72] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
            기준: 가상 시설 설정값으로 계산한 예시 수치 (실측 데이터가 아닙니다)
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Configuration Controls Panel (Left) */}
          <div className="lg:col-span-5 bg-[#faf8ff] p-6 lg:p-8 rounded-xl border border-[#bccac0]/40 flex flex-col justify-between space-y-8 shadow-xs">
            <div>
              {/* 1. Facility Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor={sliderId} className="font-mono text-[12px] text-[#131b2e] font-bold uppercase tracking-wider">
                    시설 규모 선택 (Facility Footprint)
                  </label>
                  <span className="font-mono text-[13px] text-[#006948] font-bold">
                    {getFootprintLabel(footprint)}
                  </span>
                </div>

                {/* Preset Buttons */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { size: 1000, label: '1,000 평' },
                    { size: 2500, label: '2,500 평' },
                    { size: 10000, label: '10,000 평' },
                  ].map((preset) => {
                    const isSelected = footprint === preset.size;
                    return (
                      <button
                        key={preset.size}
                        type="button"
                        onClick={() => setFootprint(preset.size)}
                        className={`py-2.5 px-2 min-h-11 rounded-lg border text-xs font-mono transition cursor-pointer ${ isSelected ? 'border-[#006948] bg-[#006948]/10 text-[#006948] font-bold' : 'border-[#bccac0] text-[#131b2e] hover:border-[#006948] active:bg-[#85f8c4]/20' }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                {/* Range Slider */}
                <input
                  id={sliderId}
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={footprint}
                  onChange={(e) => setFootprint(parseInt(e.target.value, 10))}
                  className="w-full h-11 accent-[#006948] cursor-pointer mt-1"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#6d7a72] mt-1">
                  <span>1,000평 (모듈)</span>
                  <span>5,000평</span>
                  <span>10,000평 (기가 팜)</span>
                </div>
              </div>

              {/* 2. Crop Type Selector */}
              <div id="cultivars">
                <label className="font-mono text-[12px] text-[#131b2e] font-bold uppercase tracking-wider block mb-3">
                  작물 품종군 선택 (Cultivar Profile)
                </label>
                <div className="space-y-3">
                  {CULTIVARS.map((crop) => {
                    const isSelected = selectedCropId === crop.id;
                    return (
                      <label
                        key={crop.id}
                        onClick={() => setSelectedCropId(crop.id)}
                        className={`flex items-start p-3.5 rounded-lg border cursor-pointer transition ${ isSelected ? 'border-[#006948] bg-[#006948]/5 shadow-2xs ring-1 ring-[#006948]' : 'border-[#bccac0] hover:border-[#006948] bg-white' }`}
                      >
                        <input
                          type="radio"
                          name="cultivar_selection"
                          checked={isSelected}
                          onChange={() => setSelectedCropId(crop.id)}
                          className="mt-1 text-[#006948] focus:ring-[#00687a]"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="block font-mono text-[12px] lg:text-[13px] font-bold text-[#131b2e]">
                              {crop.name}
                            </span>
                            <span className="text-[10px] font-mono bg-[#006948]/10 text-[#006948] px-2 py-0.5 rounded font-semibold shrink-0">
                              {crop.tag}
                            </span>
                          </div>
                          <span className="block font-body text-xs text-[#3d4a42] mt-0.5">
                            {crop.description}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dynamic Advisory Footer & Action */}
            <div className="pt-4 border-t border-[#bccac0]/30 space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#6d7a72]">배양 랙 층수: 12단 적층 기준</span>
                <span className="text-[#006948] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">verified</span> 설비 감가상각 10년 기준 산정
                </span>
              </div>
              <button
                type="button"
                onClick={handleRequestConsultation}
                className="w-full py-2.5 bg-[#006948]/10 hover:bg-[#006948]/20 text-[#006948] font-mono text-xs font-semibold rounded-lg border border-[#006948]/30 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>현재 시뮬레이션 조건으로 B2B 맞춤 견적 요청하기</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Real-time Output Matrix Cards (Right) */}
          {/* 모바일/웹 경계는 그대로 lg 다. md 는 태블릿(768)에서 카드가 한 장씩 늘어지던 걸 2열로 접는 중간 단계일 뿐이다. */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Output 1: Annual Yield */}
            <div className="bg-[#f2f3ff] p-6 rounded-xl border border-[#bccac0]/40 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] text-[#6d7a72] uppercase font-semibold">
                    ANNUAL HARVEST OUTPUT
                  </span>
                  <div className="p-2 rounded-lg bg-[#006948]/10 text-[#006948]">
                    <span className="material-symbols-outlined">inventory_2</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-3xl lg:text-[44px] font-bold text-[#131b2e]">
                    {annualTonnes.toLocaleString()}
                  </span>
                  <span className="font-mono text-xs lg:text-sm text-[#006948] font-bold">
                    Tonnes / Year
                  </span>
                </div>
                <p className="font-body text-xs text-[#3d4a42] mt-2 leading-relaxed">
                  연중 중단 없는 28일 회전식 배치 수확으로 일일 약{' '}
                  <strong className="text-[#131b2e]">
                    {(annualTonnes / 365).toFixed(1)}톤
                  </strong>
                  의 무농약 농산물을 균등 출하하는 설정입니다. (예시)
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#bccac0]/20 flex justify-between font-mono text-[11px]">
                <span className="text-[#6d7a72]">수율 손실률</span>
                <span className="text-[#006948] font-bold">&lt; 1.2% (예시 수치)</span>
              </div>
            </div>

            {/* Output 2: Water Conservation */}
            <div className="bg-[#f2f3ff] p-6 rounded-xl border border-[#bccac0]/40 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] text-[#6d7a72] uppercase font-semibold">
                    WATER CONSERVATION
                  </span>
                  <div className="p-2 rounded-lg bg-[#00687a]/10 text-[#00687a]">
                    <span className="material-symbols-outlined">opacity</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-3xl lg:text-[44px] font-bold text-[#00687a]">
                    {waterSavedTenThousands.toLocaleString()}만
                  </span>
                  <span className="font-mono text-xs lg:text-sm text-[#00687a] font-bold">
                    Litres Saved
                  </span>
                </div>
                <p className="font-body text-xs text-[#3d4a42] mt-2 leading-relaxed">
                  초미세 초음파 에어로포닉스 미스트 분무 후 증산 수분을 98% 응축 재포집해 재순환하는 구성입니다. (예시 수치)
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#bccac0]/20 flex justify-between font-mono text-[11px]">
                <span className="text-[#6d7a72]">노지 대비 절감율</span>
                <span className="text-[#00687a] font-bold">95.4% 감소 (예시)</span>
              </div>
            </div>

            {/* Output 3: Carbon Reduction (Scope 1/3) */}
            <div className="bg-[#f2f3ff] p-6 rounded-xl border border-[#bccac0]/40 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] text-[#6d7a72] uppercase font-semibold">
                    ESG CARBON OFFSET
                  </span>
                  <div className="p-2 rounded-lg bg-[#006947]/10 text-[#006947]">
                    <span className="material-symbols-outlined">eco</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-3xl lg:text-[44px] font-bold text-[#006947]">
                    -{carbonOffset}
                  </span>
                  <span className="font-mono text-xs lg:text-sm text-[#006947] font-bold">
                    tCO2eq
                  </span>
                </div>
                <p className="font-body text-xs text-[#3d4a42] mt-2 leading-relaxed">
                  트랙터 유류 제로, 화학 농약 미사용 및 4시간 직배송 푸드마일 단축을 전제로 산정한 탄소 감축량입니다. (예시)
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#bccac0]/20 flex justify-between font-mono text-[11px]">
                <span className="text-[#6d7a72]">재생에너지 전환 (예시)</span>
                <span className="text-[#006947] font-bold">Scope-1/Scope-3 산정 예시</span>
              </div>
            </div>

            {/* Output 4: Expected Revenue & ROI */}
            <div className="bg-[#f2f3ff] p-6 rounded-xl border border-[#bccac0]/40 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] text-[#6d7a72] uppercase font-semibold">
                    ESTIMATED B2B ROI
                  </span>
                  <div className="p-2 rounded-lg bg-[#006948]/10 text-[#006948]">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-3xl lg:text-[44px] font-bold text-[#131b2e]">
                    {paybackPeriod}년
                  </span>
                  <span className="font-mono text-xs lg:text-sm text-[#006948] font-bold">
                    Payback Period
                  </span>
                </div>
                <p className="font-body text-xs text-[#3d4a42] mt-2 leading-relaxed">
                  안정적 기업 사전 선도 구매 계약(Off-take) 및 프리미엄 식물 공장 단가 산정 모델 기준.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#bccac0]/20 flex justify-between font-mono text-[11px]">
                <span className="text-[#6d7a72]">예상 연매출 규모 (예시)</span>
                <span className="text-[#131b2e] font-bold">약 {estimatedRevenueEok} 억원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
