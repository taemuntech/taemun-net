import React, { useState } from 'react';
import { LensMode, Language } from '../types';
import { OUTCOME_DISCLAIMER } from '../constants';

interface LensSimulatorProps {
  language: Language;
  onNavigateBooking: () => void;
}

export const LensSimulator: React.FC<LensSimulatorProps> = ({ language, onNavigateBooking }) => {
  const [lensMode, setLensMode] = useState<LensMode>('multi');

  return (
    <section id="lens-simulator" className="w-full py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10 lg:mb-12">
          <div className="break-keep">
            <div className="flex items-center gap-2 text-tertiary font-label-caps text-[11px] font-bold tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>INTERACTIVE INTRAOCULAR LENS SIMULATOR</span>
            </div>
            <h2 className="font-headline-xl text-[26px] lg:text-[38px] text-on-surface font-extrabold tracking-tight leading-snug">
              {language === 'KR' ? '노안 & 백내장 인공수정체 시야 시뮬레이터' : 'Presbyopia & Cataract IOL Visual Simulator'}
            </h2>
            <p className="font-body-lg text-[14px] lg:text-[17px] text-on-surface-variant mt-2 leading-relaxed">
              {language === 'KR'
                ? '인공수정체 종류에 따라 원 · 중 · 근거리가 어떻게 달라지는지 보여 주는 참고용 시뮬레이션입니다. 실제로 보이는 정도는 사람마다 다릅니다.'
                : 'A reference simulation of how near, intermediate, and far vision differ by IOL type. Actual vision varies between individuals.'}
            </p>
          </div>

          {/* Interactive Mode Buttons */}
          <div className="max-w-full overflow-x-auto pb-1 lg:pb-0">
            <div className="inline-flex p-1.5 rounded-xl bg-surface-container-highest shadow-inner whitespace-nowrap">
              <button
                type="button"
                onClick={() => setLensMode('mono')}
                className={`px-3.5 lg:px-4 py-2 min-h-[44px] inline-flex items-center rounded-lg font-headline-sm text-[13px] lg:text-[14px] transition-all cursor-pointer ${
                  lensMode === 'mono'
                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
              >
                단초점 인공수정체
              </button>
              <button
                type="button"
                onClick={() => setLensMode('edof')}
                className={`px-3.5 lg:px-4 py-2 min-h-[44px] inline-flex items-center rounded-lg font-headline-sm text-[13px] lg:text-[14px] transition-all cursor-pointer ${
                  lensMode === 'edof'
                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
              >
                연속초점 (EDOF)
              </button>
              <button
                type="button"
                onClick={() => setLensMode('multi')}
                className={`px-3.5 lg:px-4 py-2 min-h-[44px] inline-flex items-center rounded-lg font-headline-sm text-[13px] lg:text-[14px] transition-all cursor-pointer ${
                  lensMode === 'multi'
                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
              >
                프리미엄 다초점
              </button>
            </div>
          </div>
        </div>

        {/* 3 Distances Interactive Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 break-keep">
          {/* Near Distance Card */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col border border-surface-container/50">
            <div className="p-4 bg-surface-container-low border-b border-surface-container flex items-center justify-between">
              <div>
                <span className="font-label-caps text-[11px] text-tertiary font-bold">근거리 (33~40cm)</span>
                <div className="font-headline-sm text-[15px] font-bold text-on-surface">스마트폰 텍스트 · 책 · 네일</div>
              </div>
              <span className="material-symbols-outlined text-tertiary text-[20px]">phone_android</span>
            </div>

            <div className="relative h-60 w-full overflow-hidden bg-on-surface">
              <img
                src="/demo-media/prime-vision-eye-clinic/prime-vision-eye-clinic-03.jpg"
                alt="Near distance simulation smartphone screen text"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  lensMode === 'mono' ? 'blur-md opacity-80' : lensMode === 'edof' ? 'blur-[1.5px]' : 'blur-0'
                }`}
               referrerPolicy="no-referrer" />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-numeric text-[12px] font-bold text-primary shadow">
                {lensMode === 'mono' ? '흐림 (돋보기 필요)' : lensMode === 'edof' ? '약간 흐림 (보조)' : '선명 (시뮬레이션)'}
              </div>
            </div>

            <div className="p-4 font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              {lensMode === 'mono' && '초점이 원거리에 맞춰져 근거리 글자가 심하게 뭉개지며 돋보기 착용이 반드시 필요합니다.'}
              {lensMode === 'edof' && '중간거리 중심 설계로 일반 글씨는 식별 가능하나 약봉투 등 미세 글씨는 돋보기가 도움될 수 있습니다.'}
              {lensMode === 'multi' && '다초점 광학 설계로 근거리 돋보기 의존도를 줄이는 것을 목표로 합니다. 읽히는 글자 크기와 밝기 조건에 따라 차이가 있습니다.'}
            </div>
          </div>

          {/* Intermediate Distance Card */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col border border-surface-container/50">
            <div className="p-4 bg-surface-container-low border-b border-surface-container flex items-center justify-between">
              <div>
                <span className="font-label-caps text-[11px] text-primary font-bold">중간거리 (60~80cm)</span>
                <div className="font-headline-sm text-[15px] font-bold text-on-surface">데스크톱 PC · 차량 내비 · 요리</div>
              </div>
              <span className="material-symbols-outlined text-primary text-[20px]">desktop_windows</span>
            </div>

            <div className="relative h-60 w-full overflow-hidden bg-on-surface">
              <img
                src="/demo-media/prime-vision-eye-clinic/prime-vision-eye-clinic-05.jpg"
                alt="Intermediate distance desktop and instrument dashboard"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  lensMode === 'mono' ? 'blur-[3px]' : 'blur-0'
                }`}
               referrerPolicy="no-referrer" />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-numeric text-[12px] font-bold text-primary shadow">
                {lensMode === 'mono' ? '약간 흐림' : '선명 (최적 영역)'}
              </div>
            </div>

            <div className="p-4 font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              {lensMode === 'mono' && '컴퓨터 모니터와 차량 계기판이 다소 흐릿하게 보여 장시간 사무 작업 시 피로도가 발생합니다.'}
              {lensMode === 'edof' && 'EDOF(확장 연속 초점)가 주로 담당하는 구간으로, 모니터 · 주방 · 차량 내비게이션 거리에서 비교적 편안합니다.'}
              {lensMode === 'multi' && '연속 초점 연결 구역으로 끊김 없는 부드러운 초점 전환을 지원하여 컴퓨터 작업이 편안합니다.'}
            </div>
          </div>

          {/* Far Distance Card */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col border border-surface-container/50">
            <div className="p-4 bg-surface-container-low border-b border-surface-container flex items-center justify-between">
              <div>
                <span className="font-label-caps text-[11px] text-secondary font-bold">원거리 (5m 이상)</span>
                <div className="font-headline-sm text-[15px] font-bold text-on-surface">야간 운전 · 골프 공 낙하 · 표지판</div>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]">directions_car</span>
            </div>

            <div className="relative h-60 w-full overflow-hidden bg-on-surface">
              <img
                src="/demo-media/prime-vision-eye-clinic/prime-vision-eye-clinic-01.jpg"
                alt="Far distance night driving road signs"
                className="w-full h-full object-cover transition-all duration-500 blur-0"
               referrerPolicy="no-referrer" />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-numeric text-[12px] font-bold text-primary shadow">
                선명 (전 렌즈 우수)
              </div>
            </div>

            <div className="p-4 font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              {lensMode === 'mono' && '빛을 나누지 않고 원거리에 초점을 모으는 설계라, 야간 운전에서 빛번짐이 비교적 적은 편입니다.'}
              {lensMode === 'edof' && '비회절형 렌즈 설계로 야간 헤드라이트 빛번짐이 상대적으로 적은 편이라 야간 운전이 잦은 분들이 많이 선택합니다.'}
              {lensMode === 'multi' && '원거리 표지판과 풍경을 담당하는 구간입니다. 초기에는 불빛 주변에 미세한 링 빛번짐이 보일 수 있고, 적응 기간과 정도에는 개인차가 있습니다.'}
            </div>
          </div>
        </div>

        {/* 시술 효과를 이미지로 보여 주는 구역이라 같은 화면에 고지를 둔다 (의료법 제56조 제2항) */}
        <div className="mb-10 p-4 lg:p-5 rounded-xl bg-surface-container-high border border-outline-variant/50 flex items-start gap-3 break-keep">
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant shrink-0 mt-0.5">info</span>
          <p className="font-body-sm text-[12px] lg:text-[13px] text-on-surface-variant leading-relaxed">
            {OUTCOME_DISCLAIMER} 위 사진은 초점 거리 차이를 설명하기 위해 흐림 효과를 입힌 연출 이미지이며, 실제 수술 전후 사진이 아닙니다.
          </p>
        </div>

        {/* Selected Mode Summary Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6 border border-surface-container/50">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-caps text-[11px] font-bold">
                {lensMode === 'mono' ? '경제적 선택' : lensMode === 'edof' ? '활동적 중장년' : '프리미엄 올인원'}
              </span>
              <span className="font-headline-sm text-[18px] font-bold text-on-surface">
                {lensMode === 'mono' && '단초점 인공수정체 (Monofocal)'}
                {lensMode === 'edof' && '연속초점 인공수정체 (EDOF / Extended Depth of Focus)'}
                {lensMode === 'multi' && '프리미엄 다초점(4초점) 인공수정체'}
              </span>
            </div>
            <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
              {lensMode === 'mono' &&
                '건강보험 적용으로 수술 비용 부담이 적으며 원거리가 매우 깨끗하지만, 독서나 스마트폰 등 일상 근거리 작업 시 돋보기 안경 착용이 필수적입니다.'}
              {lensMode === 'edof' &&
                '빛번짐을 줄이면서 중간거리(컴퓨터 · 계기판)부터 원거리까지 이어 주는 설계라, 골프 · 야간 운전 · 사무 업무가 많은 분들이 많이 선택합니다.'}
              {lensMode === 'multi' &&
                '근거리 · 중간거리 · 원거리를 함께 담당하는 설계로, 수술 후 돋보기 의존도를 크게 줄이는 것을 목표로 합니다. 다만 빛번짐 · 대비감도 저하가 나타날 수 있고 결과에는 개인차가 있습니다.'}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={onNavigateBooking}
              className="w-full lg:w-auto px-6 py-3.5 min-h-[44px] rounded-xl bg-primary text-on-primary font-headline-sm text-[14px] font-bold hover:bg-primary-container hover:text-on-primary-container transition-all shadow cursor-pointer text-center"
            >
              노안·백내장 1:1 맞춤 정밀 상담
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
