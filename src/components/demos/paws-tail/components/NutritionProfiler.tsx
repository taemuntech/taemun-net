import React, { useState } from 'react';
import { PetSpecies, ProfilerState } from '../types';

interface NutritionProfilerProps {
  onAddPrescriptionToCart: (prescription: {
    name: string;
    dailyGrams: number;
    price: number;
    species: PetSpecies;
  }) => void;
  onOpenReportModal: (profilerState: ProfilerState, calculatedGrams: number) => void;
}

export const NutritionProfiler: React.FC<NutritionProfilerProps> = ({
  onAddPrescriptionToCart,
  onOpenReportModal,
}) => {
  const [species, setSpecies] = useState<PetSpecies>('dog');
  const [isNeutered, setIsNeutered] = useState<boolean>(true);
  const [age, setAge] = useState<number>(3);
  const [weight, setWeight] = useState<number>(4.8);

  const [concerns, setConcerns] = useState({
    joints: true,
    allergies: false,
    weightControl: false,
    urinary: false,
  });

  const toggleConcern = (key: keyof typeof concerns) => {
    setConcerns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Veterinary RER / DER calculation
  // RER = 70 * (weight in kg)^0.75
  // DER factor: neutered dog = 1.6, unneutered = 1.8, weight control = 1.0, senior = 1.4, cat = 1.2
  const rer = 70 * Math.pow(weight, 0.75);
  let derFactor = 1.6;
  if (species === 'cat') {
    derFactor = isNeutered ? 1.2 : 1.4;
  } else {
    if (concerns.weightControl) derFactor = 1.2;
    else if (age >= 8) derFactor = 1.3;
    else if (!isNeutered) derFactor = 1.8;
    else derFactor = 1.6;
  }
  const dailyKcal = Math.round(rer * derFactor);
  // Assume ~370 kcal per 100g -> ~3.7 kcal/g
  const dailyGrams = Math.max(25, Math.round(dailyKcal / 3.7));
  const morningGrams = Math.round(dailyGrams / 2);
  const eveningGrams = dailyGrams - morningGrams;

  // Age group text
  let ageLabel = '어덜트';
  if (age <= 1) ageLabel = species === 'dog' ? '퍼피' : '키튼';
  else if (age >= 8) ageLabel = '시니어';

  // Weight condition description
  let weightDesc = '권장 표준 체형 대비 정상 유지군입니다.';
  let weightCategory = '소형견';
  if (species === 'cat') {
    weightCategory = '반려묘';
    if (weight < 3.5) weightDesc = '초소형/슬림 체형 유지군입니다.';
    else if (weight > 6.0) weightDesc = '체중 감량 및 음수량 관리가 필요한 구간입니다.';
  } else {
    if (weight < 3.0) {
      weightCategory = '초소형견';
      weightDesc = '초소형견 저혈당 예방 및 고밀도 영양군입니다.';
    } else if (weight <= 10.0) {
      weightCategory = '소형견';
      weightDesc = '권장 표준 체형 대비 정상 유지군입니다.';
    } else if (weight <= 20.0) {
      weightCategory = '중형견';
      weightDesc = '활동량에 따른 관절 연골 집중 보강군입니다.';
    } else {
      weightCategory = '대형견';
      weightDesc = '골격 및 심장 기능 보존 집중 관리군입니다.';
    }
  }

  // Dynamic Prescription Name & Nutritional Points
  let recipeTitle = '포우즈 알래스카 생연어 & 초록입홍합 조인트 리페어 1.5kg';
  let recipeDetail = `1일 권장 급여량 ${dailyGrams}g (아침 ${morningGrams}g / 저녁 ${eveningGrams}g) — 글루코사민 750mg 및 오메가-3 고함량 강화`;
  let prescriptionPrice = 38250;

  if (species === 'cat') {
    recipeTitle = '노르웨이 생연어 & 크랜베리 유리너리 스트루바이트 케어 1.2kg';
    recipeDetail = `1일 권장 급여량 ${dailyGrams}g (아침 ${morningGrams}g / 저녁 ${eveningGrams}g) — 타우린 2,500mg 및 요로 pH 6.3 밸런스 유지`;
    prescriptionPrice = 35100;
  } else if (concerns.weightControl) {
    recipeTitle = '포우즈 라이트핏 화이트피쉬 & 차전자피 체중조절 포뮬러 1.5kg';
    recipeDetail = `1일 권장 급여량 ${dailyGrams}g (아침 ${morningGrams}g / 저녁 ${eveningGrams}g) — L-카르니틴 강화 및 조지방 9% 저칼로리 설계`;
    prescriptionPrice = 37800;
  } else if (concerns.allergies) {
    recipeTitle = '포우즈 단일단백질 생연어 & 유기농 슈퍼베리 알러지케어 1.5kg';
    recipeDetail = `1일 권장 급여량 ${dailyGrams}g (아침 ${morningGrams}g / 저녁 ${eveningGrams}g) — 가수분해 펩타이드 및 눈물자국 루테인 4중 복합체`;
    prescriptionPrice = 38250;
  } else if (concerns.urinary) {
    recipeTitle = '포우즈 유리너리 케어 알래스카 대구 & 크랜베리 포뮬러 1.5kg';
    recipeDetail = `1일 권장 급여량 ${dailyGrams}g (아침 ${morningGrams}g / 저녁 ${eveningGrams}g) — 마그네슘 저감 및 음수 자극 미네랄 균형`;
    prescriptionPrice = 39000;
  }

  const handleAddToCart = () => {
    onAddPrescriptionToCart({
      name: recipeTitle,
      dailyGrams,
      price: prescriptionPrice,
      species,
    });
  };

  const handleOpenPdfReport = () => {
    onOpenReportModal(
      {
        species,
        isNeutered,
        age,
        weight,
        concerns,
      },
      dailyGrams
    );
  };

  return (
    <section className="py-12 lg:py-20 bg-[#f8f9ff]" id="profiler">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#b1f0ce] text-[#0f5238] px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm">
            <span className="material-symbols-outlined text-sm">neurology</span>
            <span>AI 임상 알고리즘 V3.4</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#121c2a] tracking-tight">
            AI 수의학 맞춤 영양 프로파일러
          </h2>
          <p className="text-sm text-[#404943] mt-2 leading-relaxed">
            반려동물의 체질, 체중, 건강 고민에 맞춰 임상영양 수의학 전문 데이터베이스(예시)가 맞춤
            급여 처방을 도출합니다.
          </p>
        </div>

        {/* 3-Step Interactive HUD Container */}
        <div className="bg-white border border-[#bfc9c1]/80 rounded-2xl p-6 lg:p-10 shadow-lg max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#bfc9c1]/60">
            {/* Step 1: 반려동물 선택 */}
            <div className="flex flex-col gap-4 pt-4 lg:pt-0">
              <div className="flex items-center gap-2 text-base font-bold text-[#0f5238]">
                <span className="w-6 h-6 rounded-full bg-[#0f5238] text-white flex items-center justify-center text-xs">
                  1
                </span>
                <span>반려동물 선택</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setSpecies('dog')}
                  className={`p-4 rounded-xl border-2 transition-all text-center flex flex-col items-center gap-2 ${
                    species === 'dog'
                      ? 'border-[#0f5238] bg-[#eff4ff] shadow-sm'
                      : 'border-[#bfc9c1] hover:border-[#0f5238] bg-white'
                  }`}
                >
                  <span className="text-3xl">🐶</span>
                  <span className="text-sm font-bold text-[#121c2a]">반려견</span>
                  <span className="text-[11px] text-[#404943]">Dog Care</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSpecies('cat')}
                  className={`p-4 rounded-xl border-2 transition-all text-center flex flex-col items-center gap-2 ${
                    species === 'cat'
                      ? 'border-[#0f5238] bg-[#eff4ff] shadow-sm'
                      : 'border-[#bfc9c1] hover:border-[#0f5238] bg-white'
                  }`}
                >
                  <span className="text-3xl">🐱</span>
                  <span className="text-sm font-bold text-[#121c2a]">반려묘</span>
                  <span className="text-[11px] text-[#404943]">Cat Care</span>
                </button>
              </div>

              <div className="mt-2">
                <label className="block text-xs text-[#404943] font-bold mb-1.5">
                  중성화 여부
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNeutered(true)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                      isNeutered
                        ? 'bg-[#0f5238] text-white shadow-sm'
                        : 'border border-[#bfc9c1] hover:border-[#0f5238] text-[#404943]'
                    }`}
                  >
                    완료
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNeutered(false)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                      !isNeutered
                        ? 'bg-[#0f5238] text-white shadow-sm'
                        : 'border border-[#bfc9c1] hover:border-[#0f5238] text-[#404943]'
                    }`}
                  >
                    미완료
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: 나이 및 체중 */}
            <div className="flex flex-col gap-4 pt-6 lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-2 text-base font-bold text-[#0f5238]">
                <span className="w-6 h-6 rounded-full bg-[#0f5238] text-white flex items-center justify-center text-xs">
                  2
                </span>
                <span>나이 및 체중</span>
              </div>

              <div className="space-y-4 mt-2">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-[#404943] font-bold">아이의 나이</label>
                    <span className="text-xs font-bold text-[#0f5238]">
                      {age}세 ({ageLabel})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-[#0f5238] h-2 bg-[#e6eeff] rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#707973] mt-1">
                    <span>자견/묘 (1세)</span>
                    <span>성견/묘 (7세)</span>
                    <span>노령견/묘 (15세+)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-[#404943] font-bold">현재 체중</label>
                    <span className="text-xs font-bold text-[#0f5238]">
                      {weight.toFixed(1)} kg ({weightCategory})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="30.0"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    className="w-full accent-[#0f5238] h-2 bg-[#e6eeff] rounded-lg cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#bfc9c1]/60 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#835418] text-base">
                    monitor_weight
                  </span>
                  <span className="text-[#404943] text-xs">
                    {weightDesc}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3: 중점 케어 부위 */}
            <div className="flex flex-col gap-4 pt-6 lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-2 text-base font-bold text-[#0f5238]">
                <span className="w-6 h-6 rounded-full bg-[#0f5238] text-white flex items-center justify-center text-xs">
                  3
                </span>
                <span>집중 케어 부위</span>
              </div>

              <div className="space-y-2 mt-2">
                <label
                  onClick={() => toggleConcern('joints')}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                    concerns.joints
                      ? 'border-[#0f5238] bg-[#b1f0ce]/25 shadow-sm'
                      : 'border-[#bfc9c1] hover:border-[#0f5238] bg-white'
                  }`}
                >
                  <span className="text-xs font-semibold text-[#121c2a] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0f5238] text-base">
                      accessible_forward
                    </span>
                    <span>관절/슬개골 2~3기</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={concerns.joints}
                    onChange={() => {}}
                    className="rounded text-[#0f5238] focus:ring-[#0f5238] h-4 w-4 pointer-events-none"
                  />
                </label>

                <label
                  onClick={() => toggleConcern('allergies')}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                    concerns.allergies
                      ? 'border-[#0f5238] bg-[#b1f0ce]/25 shadow-sm'
                      : 'border-[#bfc9c1] hover:border-[#0f5238] bg-white'
                  }`}
                >
                  <span className="text-xs font-semibold text-[#121c2a] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#835418] text-base">
                      visibility
                    </span>
                    <span>눈물자국/식이알러지</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={concerns.allergies}
                    onChange={() => {}}
                    className="rounded text-[#0f5238] focus:ring-[#0f5238] h-4 w-4 pointer-events-none"
                  />
                </label>

                <label
                  onClick={() => toggleConcern('weightControl')}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                    concerns.weightControl
                      ? 'border-[#0f5238] bg-[#b1f0ce]/25 shadow-sm'
                      : 'border-[#bfc9c1] hover:border-[#0f5238] bg-white'
                  }`}
                >
                  <span className="text-xs font-semibold text-[#121c2a] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#707973] text-base">
                      scale
                    </span>
                    <span>체중감량/저지방 케어</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={concerns.weightControl}
                    onChange={() => {}}
                    className="rounded text-[#0f5238] focus:ring-[#0f5238] h-4 w-4 pointer-events-none"
                  />
                </label>

                <label
                  onClick={() => toggleConcern('urinary')}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                    concerns.urinary
                      ? 'border-[#0f5238] bg-[#b1f0ce]/25 shadow-sm'
                      : 'border-[#bfc9c1] hover:border-[#0f5238] bg-white'
                  }`}
                >
                  <span className="text-xs font-semibold text-[#121c2a] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#703800] text-base">
                      water_drop
                    </span>
                    <span>신장/요로계(스트루바이트)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={concerns.urinary}
                    onChange={() => {}}
                    className="rounded text-[#0f5238] focus:ring-[#0f5238] h-4 w-4 pointer-events-none"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* AI Profiler Result Diagnostic Box */}
          <div className="mt-8 pt-6 border-t border-[#bfc9c1]/70 bg-[#dee9fc]/40 p-5 lg:p-6 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f5238] text-white flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-2xl">prescriptions</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#0f5238] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[#0f5238]/30">
                    처방 리포트
                  </span>
                  <span className="text-[11px] text-[#404943]">분석 완료 (일치율 98.2%)</span>
                </div>
                <h3 className="text-base lg:text-lg font-bold text-[#121c2a] mt-1">
                  추천 식단: '{recipeTitle}'
                </h3>
                <p className="text-xs lg:text-sm text-[#404943] mt-0.5 leading-relaxed">
                  {recipeDetail}
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={handleAddToCart}
                className="w-full lg:w-auto h-12 px-6 rounded-full bg-[#0f5238] text-white text-xs lg:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#2d6a4f] transition-all active:scale-95 whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-lg">local_mall</span>
                <span>
                  4주 주기 정기구독 담기 (첫 결제 15% ₩{prescriptionPrice.toLocaleString()})
                </span>
              </button>

              <button
                onClick={handleOpenPdfReport}
                className="w-full lg:w-auto h-12 px-4 rounded-full bg-white border border-[#bfc9c1] hover:border-[#0f5238] text-[#121c2a] text-xs font-semibold flex items-center justify-center gap-1 transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>영양 리포트 PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
