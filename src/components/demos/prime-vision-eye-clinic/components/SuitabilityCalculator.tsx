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
import { SERVICES, OUTCOME_DISCLAIMER } from '../constants';

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

  // 결과 카드의 제목과 예약 폼에 넘기는 항목은 **같은 값**이어야 한다.
  // 예전에는 고도난시 분기가 화면엔 「렌티큘 추출술」을 띄우고 폼에는 「라식」을 넘겨,
  // 고른 것과 다른 항목이 예약 요약에 찍혔다. recommendedService 는 SERVICES 에서만 고른다.
  const recommendation: CalculatorResult = useMemo(() => {
    // 4번 문항(라이프스타일)은 결과 카드의 고려 사항 한 줄과 태그 하나를 실제로 바꾼다.
    // 화면에 「…중점」이라고 적어 두고 결과가 그대로면 눌러도 아무 일 없는 문항이 된다.
    const lifestyleNote: Record<LifestyleType, { note: string; tag: string }> = {
      sports: {
        note: '활동량이 많다고 고르셨으므로, 외부 충격에 상대적으로 유리한 방식을 먼저 살펴보고 보호 안경 착용 기간을 함께 안내드립니다.',
        tag: '#충격안전성우선',
      },
      screen: {
        note: '화면을 오래 보신다고 고르셨으므로, 수술 전후 안구건조 검사와 눈물막 관리 계획을 함께 상담합니다.',
        tag: '#안구건조관리',
      },
      night: {
        note: '야간 운전·정밀작업이 잦다고 고르셨으므로, 어두운 곳에서 커지는 동공 크기를 재고 빛번짐 가능성을 미리 설명드립니다.',
        tag: '#야간빛번짐상담',
      },
    };
    const lifestyle = lifestyleNote[calcState.lifestyle];

    if (calcState.cornea === 'unknown') {
      return {
        title: '50단계 정밀 안종합 검진 먼저',
        matchRate: 0,
        description: `각막 두께 검사 경험이 없다고 고르셨습니다. 각막 두께는 시술 선택을 가르는 조건이라, 검사 전에는 어떤 시술이 맞는지 안내드릴 수 없습니다. 정밀 검진으로 각막 두께·지형도·동공 크기를 먼저 확인한 뒤 시술을 정합니다. ${lifestyle.note}`,
        tags: ['#각막두께미확인', '#정밀검진우선', lifestyle.tag],
        recommendedService: SERVICES.exam,
      };
    } else if (calcState.myopia === 'severe' || calcState.cornea === 'thin') {
      return {
        title: '안내렌즈삽입술 (유수정체 인공수정체)',
        matchRate: 97,
        description:
          '초고도 근시이거나 각막 두께가 얇은 조건에서는, 각막을 깎지 않고 홍채 뒤쪽에 생체친화성 특수 렌즈를 넣는 안내렌즈삽입술이 우선 고려됩니다. 각막을 보존하고 필요 시 렌즈를 제거할 수 있는 방식이지만, 백내장·안압 상승 등 별도의 주의사항이 있습니다. ' + lifestyle.note,
        tags: ['#각막을깎지않음', '#초고도근시선택지', lifestyle.tag],
        recommendedService: SERVICES.phakicIol,
      };
    } else if (calcState.astigmatism === 'severe') {
      return {
        title: '토포가이드 맞춤 라식 (난시축 보정)',
        matchRate: 99,
        description:
          '고도 난시축은 각막 지형도를 그대로 반영해 절삭하는 토포가이드 방식과, 자세에 따른 눈의 회선(Torsion)을 자동 회전 보정하는 기능을 함께 써서 난시 교정 정밀도를 높입니다. 교정 후 남는 난시량에는 개인차가 있습니다. ' + lifestyle.note,
        tags: ['#난시축자동보정', '#각막지형도맞춤', lifestyle.tag],
        recommendedService: SERVICES.topoLasik,
      };
    } else {
      return {
        title: '렌티큘 추출술 (KLEx)',
        matchRate: 98,
        description:
          '중등도 근시에 각막 잔여량이 충분한 조건에서는, 각막 절편을 만들지 않고 2mm 미세 절개로 렌티큘만 빼내는 렌티큘 추출술이 우선 고려됩니다. 회복 속도와 건조감 정도에는 개인차가 있습니다. ' + lifestyle.note,
        tags: ['#절편을만들지않음', '#2mm미세절개', lifestyle.tag],
        recommendedService: SERVICES.klex,
      };
    }
  }, [calcState]);

  return (
    <section id="suitability-calculator" className="w-full py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12 break-keep">
          <span className="px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary font-label-caps text-[11px] font-bold">
            SELF-CHECK GUIDE · 참고용
          </span>
          <h2 className="font-headline-xl text-[26px] lg:text-[38px] text-on-surface font-extrabold tracking-tight mt-3 leading-snug">
            {language === 'KR' ? '1분 시력교정 적합도 자가 계산기' : '1-Minute Self Vision Suitability Calculator'}
          </h2>
          <p className="font-body-lg text-[14px] lg:text-[17px] text-on-surface-variant mt-2 leading-relaxed">
            {language === 'KR'
              ? '시력 · 각막 조건 · 생활 패턴을 고르시면 일반적으로 어떤 시술을 먼저 검토하게 되는지 참고용으로 안내해 드립니다. 진단이나 수술 가능 여부 판정이 아니며, 실제 적합 여부는 정밀 검진과 진료로만 확인할 수 있습니다.'
              : 'A reference guide only — it suggests which procedure is usually considered first. It is not a diagnosis, and eligibility can only be confirmed by examination.'}
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
          <div className="lg:col-span-5 bg-gradient-to-b from-surface-container-lowest via-surface-container-lowest to-surface-container-low p-6 lg:p-8 rounded-2xl shadow-xl border-2 border-primary/20 lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-surface-container">
              <span className="flex items-center gap-1.5 font-label-caps text-[11px] text-secondary font-bold">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                선택에 따른 참고 결과
              </span>
              {recommendation.matchRate > 0 && (
                <span className="font-label-numeric text-[13px] font-bold text-primary">
                  참고 적합도: {recommendation.matchRate}% (예시 수치)
                </span>
              )}
            </div>

            <div className="my-6">
              <div className="font-label-caps text-[11px] text-on-surface-variant font-semibold">
                {recommendation.matchRate > 0 ? '먼저 검토하게 되는 시술' : '먼저 밟게 되는 단계'}
              </div>
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
              <span>{recommendation.matchRate > 0 ? '이 솔루션으로 당일 검사·수술 예약' : '정밀 안종합 검진부터 예약하기'}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            <p className="font-body-sm text-[12px] text-outline text-center mt-3 leading-relaxed break-keep">
              ※ {OUTCOME_DISCLAIMER} 수술 가능 여부는 50단계 정밀 안종합 검진과 진료를 거쳐 확정됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
