import React, { useState } from 'react';
import { LensMode, Language } from '../types';

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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-tertiary font-label-caps text-[11px] font-bold tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>INTERACTIVE INTRAOCULAR LENS SIMULATOR</span>
            </div>
            <h2 className="font-headline-xl text-[30px] lg:text-[38px] text-on-surface font-extrabold tracking-tight">
              {language === 'KR' ? '노안 & 백내장 인공수정체 시야 시뮬레이터' : 'Presbyopia & Cataract IOL Visual Simulator'}
            </h2>
            <p className="font-body-lg text-[15px] lg:text-[17px] text-on-surface-variant mt-2">
              {language === 'KR'
                ? '원거리, 중간거리, 근거리를 직접 비교해 보고, 내 생활 패턴과 취미에 가장 적합한 프리미엄 다초점 인공수정체를 체험해 보세요.'
                : 'Experience interactive simulated vision across near, intermediate, and far distances with Monofocal, EDOF, and Multifocal IOLs.'}
            </p>
          </div>

          {/* Interactive Mode Buttons */}
          <div className="inline-flex p-1.5 rounded-xl bg-surface-container-highest self-start lg:self-auto shadow-inner">
            <button
              type="button"
              onClick={() => setLensMode('mono')}
              className={`px-3.5 lg:px-4 py-2 rounded-lg font-headline-sm text-[13px] lg:text-[14px] transition-all cursor-pointer ${
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
              className={`px-3.5 lg:px-4 py-2 rounded-lg font-headline-sm text-[13px] lg:text-[14px] transition-all cursor-pointer ${
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
              className={`px-3.5 lg:px-4 py-2 rounded-lg font-headline-sm text-[13px] lg:text-[14px] transition-all cursor-pointer ${
                lensMode === 'multi'
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              프리미엄 4초점 다초점
            </button>
          </div>
        </div>

        {/* 3 Distances Interactive Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJAsckvWpgRJUwYgT1pRmj6_PPuU6C_6mCvaFLcyS-iDtcXdgNImFSk2Fab0TOZNKdqxm30cYADawuBCiv90SO9dyb6mmaBkTpC1_abQaewgQDAhZYZh-PaOu4Fb3mTBQzIX21sLwcoRvzsf32NWa8ztncH5p3N6cbEyjJPQ7AlIEONp7PmQJoNlmIk29OPI_UVvFpTim-9BRiXooKDnQIm6GuePa2SSjviFS6mc7Ly19pKTFB7-xL2Q"
                alt="Near distance simulation smartphone screen text"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  lensMode === 'mono' ? 'blur-md opacity-80' : lensMode === 'edof' ? 'blur-[1.5px]' : 'blur-0'
                }`}
               referrerPolicy="no-referrer" />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-numeric text-[12px] font-bold text-primary shadow">
                {lensMode === 'mono' ? '흐림 (돋보기 필요)' : lensMode === 'edof' ? '약간 흐림 (보조)' : '선명 (안경 프리)'}
              </div>
            </div>

            <div className="p-4 font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              {lensMode === 'mono' && '초점이 원거리에 맞춰져 근거리 글자가 심하게 뭉개지며 돋보기 착용이 반드시 필요합니다.'}
              {lensMode === 'edof' && '중간거리 중심 설계로 일반 글씨는 식별 가능하나 약봉투 등 미세 글씨는 돋보기가 도움될 수 있습니다.'}
              {lensMode === 'multi' && '자이스 프리미엄 4초점 광학 설계로 돋보기 없이도 카카오톡, 신문, 책을 또렷하게 읽을 수 있습니다.'}
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq0LY4usbAd_-knLQztPGMPME5byh98HZoifuwPrFHkRSOLAuNSKLOZCaMhDsvykNddPY8nZOo1kgkuEgrUEz0RZY3xr_pF-bv1YNMeVwChAUGqA6JCjPfOk-ARFs0Q4fs5TMEKRGCEeSkCgrvVo_hVQYBYHPS5AG-1iXXAw9-LTST1lLFuSSsoy-hfGwr5_cNGmxlcahVqABwAlAUumzFMkOU4DrUzF6pWwbEjqX4YWIk945xCtYBXQ"
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
              {lensMode === 'edof' && 'EDOF(확장 연속 초점) 특화 영역으로 모니터와 주방 싱크대, 차량 내비게이션이 매우 깨끗합니다.'}
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs3CI-SIW-kPxAeV4vUmFOtxTY5AAyPIUn_3IKglFrthtQ5fvSelaHlz70dZCqhADCPNakqurZWb5P9bjv5BySep588ntYUUuTt6w3Q9pGfr5rvJ8zMdcWmt-kxuQhMbB5kY1pzPNtcnEPw4O0hLPksf17bKpPN3JAKFVghU5HKFh4D3Flq7obCUXJYHeCXA7ZrohDCgXrhj3eEYdq0fleZ-Dr5ddYCIK3Yb5-7BGLwmluVnXSICHmUQ"
                alt="Far distance night driving road signs"
                className="w-full h-full object-cover transition-all duration-500 blur-0"
               referrerPolicy="no-referrer" />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-numeric text-[12px] font-bold text-primary shadow">
                선명 (전 렌즈 우수)
              </div>
            </div>

            <div className="p-4 font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              {lensMode === 'mono' && '빛을 나누지 않고 원거리에 100% 집중하므로 야간 운전 시 번짐 없이 가장 선명한 시야를 제공합니다.'}
              {lensMode === 'edof' && '비회절형 렌즈 설계로 야간 헤드라이트 빛번짐이 거의 없어 야간 고속도로 운전에 매우 탁월합니다.'}
              {lensMode === 'multi' && '원거리 표지판과 풍경이 또렷하며, 초기 미세 링 빛번짐은 뇌의 시각 적응(Neuroadaptation)을 통해 완화됩니다.'}
            </div>
          </div>
        </div>

        {/* Selected Mode Summary Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6 border border-surface-container/50">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-caps text-[11px] font-bold">
                {lensMode === 'mono' ? '경제적 선택' : lensMode === 'edof' ? '활동적 중장년' : '최고급 올인원'}
              </span>
              <span className="font-headline-sm text-[18px] font-bold text-on-surface">
                {lensMode === 'mono' && '단초점 인공수정체 (Monofocal)'}
                {lensMode === 'edof' && '연속초점 인공수정체 (EDOF / Extended Depth of Focus)'}
                {lensMode === 'multi' && '자이스 프리미엄 4초점 다초점 인공수정체 (Zeiss Trifocal/Quad)'}
              </span>
            </div>
            <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
              {lensMode === 'mono' &&
                '건강보험 적용으로 수술 비용 부담이 적으며 원거리가 매우 깨끗하지만, 독서나 스마트폰 등 일상 근거리 작업 시 돋보기 안경 착용이 필수적입니다.'}
              {lensMode === 'edof' &&
                '빛번짐을 줄이면서 중간거리(컴퓨터/계기판)부터 원거리까지 부드럽게 연결해 골프, 야간 운전, 오피스 업무를 즐기시는 분들에게 가장 만족도가 높습니다.'}
              {lensMode === 'multi' &&
                '근거리, 중간거리, 원거리를 모두 커버하여 수술 후 돋보기 안경 의존도를 95% 이상 획기적으로 줄여주며, 완벽한 자유로운 일상을 되찾아 드립니다.'}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={onNavigateBooking}
              className="w-full lg:w-auto px-6 py-3.5 rounded-xl bg-primary text-on-primary font-headline-sm text-[14px] font-bold hover:bg-primary-container hover:text-on-primary-container transition-all shadow cursor-pointer text-center"
            >
              노안·백내장 1:1 맞춤 정밀 상담
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
