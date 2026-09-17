import React, { useState, useMemo } from 'react';
import {
  CalculatorState,
  CalculatorResult,
  MyopiaLevel,
  AstigmatismLevel,
  CorneaThickness,
  LifestyleType,
  Language,
} from '../types';

interface SuitabilityCalculatorProps {
  language: Language;
  onSelectRecommendedService: (serviceName: string) => void;
}

export const SuitabilityCalculator: React.FC<SuitabilityCalculatorProps> = ({
  language,
  onSelectRecommendedService,
}) => {
  const [calcState, setCalcState] = useState<CalculatorState>({
    myopia: 'moderate',
    astigmatism: 'mild',
    cornea: 'normal',
    lifestyle: 'sports',
  });

  const recommendation: CalculatorResult = useMemo(() => {
    if (calcState.myopia === 'severe' || calcState.cornea === 'thin') {
      return {
        title: 'EVO+ 아쿠아 ICL 안내렌즈삽입술',
        matchRate: 97,
        description:
          '초고도 근시이거나 각막 두께가 얇은 조건에서는 각막을 깎지 않고 홍채 뒤쪽에 콜라머 특수 렌즈를 삽입하는 ICL이 빛번짐과 퇴행 없는 최상의 안전성을 지향합니다.',
        tags: ['#각막보존100%', '#초고도근시최적', '#원상복구가능'],
        recommendedService: 'EVO+ 아쿠아 ICL',
      };
    } else if (calcState.astigmatism === 'severe') {
      return {
        title: '토포가이드 7초 스마일프로 (OcuLign®)',
        matchRate: 99,
        description:
          '고도 난시 축의 경우 자세에 따른 눈의 회선(Torsion)을 실시간 자동 회전 보정하는 비쥬맥스 800 OcuLign® 기술을 적용해 선명하고 겹침 없는 1.0 시력을 완성합니다.',
        tags: ['#난시축자동보정', '#잔여난시0D도전', '#7초스마일프로'],
        recommendedService: '토포 커스텀 라식',
      };
    } else {
      return {
        title: '7초 자이스 스마일프로 (SMILE Pro)',
        matchRate: 98,
        description:
          '중등도 근시와 충분한 각막 잔여량을 갖추었으며, 활동적인 라이프스타일에는 2mm 미세 절개로 각막 구조 손상을 80% 줄이는 4세대 스마일프로가 가장 안전하고 이상적입니다.',
        tags: ['#수술익일일상복귀', '#외부충격우수', '#안구건조최소화'],
        recommendedService: '7초 스마일프로',
      };
    }
  }, [calcState]);

  return (
    <section id="suitability-calculator" className="w-full py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12 break-keep">
          <span className="px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary font-label-caps text-[11px] font-bold">
            AI-POWERED CLINICAL ALGORITHM
          </span>
          <h2 className="font-headline-xl text-[26px] lg:text-[38px] text-on-surface font-extrabold tracking-tight mt-3 leading-snug">
            {language === 'KR' ? '1분 시력교정 적합도 자가 계산기' : '1-Minute Self Vision Suitability Calculator'}
          </h2>
          <p className="font-body-lg text-[14px] lg:text-[17px] text-on-surface-variant mt-2 leading-relaxed">
            {language === 'KR'
              ? '본인의 시력, 각막 조건, 라이프스타일을 선택하시면 프라임 안과의 안전 기준에 부합하는 최적의 수술법을 즉시 예측 분석해 드립니다.'
              : 'Select your vision status, corneal condition, and lifestyle to predict the safest and most optimal procedure based on Prime Vision protocols.'}
          </p>
        </div>

        {/* Calculator Interactive Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 lg:p-8 rounded-2xl shadow-sm flex flex-col gap-6 border border-surface-container/50">
            {/* Question 1: Myopia */}
            <div>
              <label className="block font-headline-sm text-[16px] lg:text-[17px] text-on-surface font-bold mb-3">
                1. 현재 예상되는 근시(도수) 수준은 어느 정도인가요?
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setCalcState((s) => ({ ...s, myopia: 'mild' }))}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    calcState.myopia === 'mild'
                      ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`font-headline-sm text-[15px] font-bold ${calcState.myopia === 'mild' ? 'text-primary' : 'text-on-surface'}`}>
                    경도 근시
                  </div>
                  <div className={`font-label-numeric text-[12px] mt-0.5 ${calcState.myopia === 'mild' ? 'text-primary/80' : 'text-on-surface-variant'}`}>
                    -0.5D ~ -3.0D
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcState((s) => ({ ...s, myopia: 'moderate' }))}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    calcState.myopia === 'moderate'
                      ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`font-headline-sm text-[15px] font-bold ${calcState.myopia === 'moderate' ? 'text-primary' : 'text-on-surface'}`}>
                    중등도 근시
                  </div>
                  <div className={`font-label-numeric text-[12px] mt-0.5 ${calcState.myopia === 'moderate' ? 'text-primary/80' : 'text-on-surface-variant'}`}>
                    -3.0D ~ -6.0D
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcState((s) => ({ ...s, myopia: 'severe' }))}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    calcState.myopia === 'severe'
                      ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`font-headline-sm text-[15px] font-bold ${calcState.myopia === 'severe' ? 'text-primary' : 'text-on-surface'}`}>
                    초고도 근시
                  </div>
                  <div className={`font-label-numeric text-[12px] mt-0.5 ${calcState.myopia === 'severe' ? 'text-primary/80' : 'text-on-surface-variant'}`}>
                    -6.0D 이상
                  </div>
                </button>
              </div>
            </div>

            {/* Question 2: Astigmatism */}
            <div>
              <label className="block font-headline-sm text-[16px] lg:text-[17px] text-on-surface font-bold mb-3">
                2. 안경이나 렌즈 처방 시 난시 교정이 함께 포함되어 있나요?
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCalcState((s) => ({ ...s, astigmatism: 'mild' }))}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    calcState.astigmatism === 'mild'
                      ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`font-headline-sm text-[15px] font-bold ${calcState.astigmatism === 'mild' ? 'text-primary' : 'text-on-surface'}`}>
                    경도 난시 · 거의 없음
                  </div>
                  <div className={`font-body-sm text-[12px] mt-0.5 ${calcState.astigmatism === 'mild' ? 'text-primary/80' : 'text-on-surface-variant'}`}>
                    일상 흐림 적음 (-1.5D 미만)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcState((s) => ({ ...s, astigmatism: 'severe' }))}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    calcState.astigmatism === 'severe'
                      ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`font-headline-sm text-[15px] font-bold ${calcState.astigmatism === 'severe' ? 'text-primary' : 'text-on-surface'}`}>
                    고도 난시
                  </div>
                  <div className={`font-body-sm text-[12px] mt-0.5 ${calcState.astigmatism === 'severe' ? 'text-primary/80' : 'text-on-surface-variant'}`}>
                    글자가 겹쳐 보임 (-2.0D 이상)
                  </div>
                </button>
              </div>
            </div>

            {/* Question 3: Cornea Thickness */}
            <div>
              <label className="block font-headline-sm text-[16px] lg:text-[17px] text-on-surface font-bold mb-3">
                3. 과거 안과 검진 시 각막 두께에 대한 소견을 들으신 적이 있나요?
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setCalcState((s) => ({ ...s, cornea: 'normal' }))}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    calcState.cornea === 'normal'
                      ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`font-headline-sm text-[14px] font-bold ${calcState.cornea === 'normal' ? 'text-primary' : 'text-on-surface'}`}>
                    충분한 두께
                  </div>
                  <div className={`font-label-numeric text-[11px] mt-0.5 ${calcState.cornea === 'normal' ? 'text-primary/80' : 'text-on-surface-variant'}`}>
                    520㎛ 이상
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcState((s) => ({ ...s, cornea: 'thin' }))}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    calcState.cornea === 'thin'
                      ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`font-headline-sm text-[14px] font-bold ${calcState.cornea === 'thin' ? 'text-primary' : 'text-on-surface'}`}>
                    얇은 각막
                  </div>
                  <div className={`font-label-numeric text-[11px] mt-0.5 ${calcState.cornea === 'thin' ? 'text-primary/80' : 'text-on-surface-variant'}`}>
                    500㎛ 미만
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcState((s) => ({ ...s, cornea: 'unknown' }))}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    calcState.cornea === 'unknown'
                      ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`font-headline-sm text-[14px] font-bold ${calcState.cornea === 'unknown' ? 'text-primary' : 'text-on-surface'}`}>
                    검사 경험 없음
                  </div>
                  <div className={`font-body-sm text-[11px] mt-0.5 ${calcState.cornea === 'unknown' ? 'text-primary/80' : 'text-on-surface-variant'}`}>
                    정밀 진단 필요
                  </div>
                </button>
              </div>
            </div>

            {/* Question 4: Lifestyle */}
            <div>
              <label className="block font-headline-sm text-[16px] lg:text-[17px] text-on-surface font-bold mb-3">
                4. 고객님의 주된 라이프스타일 및 직업 환경은 어디에 가장 가깝나요?
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setCalcState((s) => ({ ...s, lifestyle: 'sports' }))}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    calcState.lifestyle === 'sports'
                      ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`flex items-center gap-1.5 font-headline-sm text-[14px] font-bold ${calcState.lifestyle === 'sports' ? 'text-primary' : 'text-on-surface'}`}>
                    <span className="material-symbols-outlined text-[18px]">fitness_center</span>
                    <span>야외·운동·군인</span>
                  </div>
                  <div className={`font-body-sm text-[11px] mt-1 ${calcState.lifestyle === 'sports' ? 'text-primary/80' : 'text-on-surface-variant'}`}>
                    충격 안전성 최우선
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcState((s) => ({ ...s, lifestyle: 'screen' }))}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    calcState.lifestyle === 'screen'
                      ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`flex items-center gap-1.5 font-headline-sm text-[14px] font-bold ${calcState.lifestyle === 'screen' ? 'text-primary' : 'text-on-surface'}`}>
                    <span className="material-symbols-outlined text-[18px]">laptop</span>
                    <span>장시간 PC·스마트폰</span>
                  </div>
                  <div className={`font-body-sm text-[11px] mt-1 ${calcState.lifestyle === 'screen' ? 'text-primary/80' : 'text-on-surface-variant'}`}>
                    안구건조 예방 중점
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcState((s) => ({ ...s, lifestyle: 'night' }))}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    calcState.lifestyle === 'night'
                      ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`flex items-center gap-1.5 font-headline-sm text-[14px] font-bold ${calcState.lifestyle === 'night' ? 'text-primary' : 'text-on-surface'}`}>
                    <span className="material-symbols-outlined text-[18px]">directions_car</span>
                    <span>야간 운전·정밀작업</span>
                  </div>
                  <div className={`font-body-sm text-[11px] mt-1 ${calcState.lifestyle === 'night' ? 'text-primary/80' : 'text-on-surface-variant'}`}>
                    빛번짐 최소화 중점
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Recommendation Result Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-surface-container-lowest via-surface-container-lowest to-surface-container-low p-6 lg:p-8 rounded-2xl shadow-xl border-2 border-primary/20 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container">
              <span className="flex items-center gap-1.5 font-label-caps text-[11px] text-secondary font-bold">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                실시간 분석 결과
              </span>
              <span className="font-label-numeric text-[13px] font-bold text-primary">
                적합 매칭 지수: {recommendation.matchRate}%
              </span>
            </div>

            <div className="my-6">
              <div className="font-label-caps text-[11px] text-on-surface-variant font-semibold">추천 1순위 최적 시술</div>
              <h3 className="font-headline-xl text-[24px] lg:text-[28px] font-extrabold text-primary mt-1 leading-snug">
                {recommendation.title}
              </h3>
              <p className="font-body-md text-[14px] lg:text-[15px] text-on-surface-variant mt-3 leading-relaxed">
                {recommendation.description}
              </p>
            </div>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {recommendation.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-surface-container text-primary font-body-sm text-[12px] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Direct CTA button connected to Fast-Track */}
            <button
              type="button"
              onClick={() => onSelectRecommendedService(recommendation.recommendedService)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-headline-sm text-[15px] font-bold shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>이 솔루션으로 당일 검사·수술 예약</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            <p className="font-body-sm text-[12px] text-outline text-center mt-3">
              ※ 정확한 수술 가능 여부는 50단계 정밀 안종합 검진 데이터 산출 후 최종 확정됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
