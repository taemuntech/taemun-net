import React from 'react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onNavigate }) => {
  return (
    <section
      id="clinic-story"
      className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-space-xl pb-20 lg:pb-24"
    >
      {/* Atmospheric Optic Glow Background */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[840px] h-[340px] bg-gradient-to-r from-primary/10 via-primary-container/20 to-tertiary/10 blur-3xl pointer-events-none -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Eyebrow Badge Row */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps text-[11px] font-semibold tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            CARL ZEISS VISUMAX 800 MASTER CLINIC
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-secondary font-label-caps text-[11px] font-semibold">
            30,000+ (예시 수치) {language === 'KR' ? '무사고 수술 케이스' : 'Accident-Free Cases'}
          </span>
          <span className="hidden lg:inline-flex px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-caps text-[11px]">
            {language === 'KR'
              ? '국내 명문대(예시) · 세브란스 각막·망막 전임의 팀'
              : 'Seoul Univ & Severance Subspecialist Team'}
          </span>
        </div>

        {/* Main Headline & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h1 className="font-headline-xl text-[36px] lg:text-[44px] lg:text-[52px] text-on-surface font-extrabold tracking-tight leading-[1.18]">
              {language === 'KR' ? (
                <>
                  눈부신 세상의 디테일을 되찾다<br />
                  <span className="bg-gradient-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent">
                    7초의 정밀함, 스마일프로
                  </span>
                  {' '}&amp; 프리미엄 백내장
                </>
              ) : (
                <>
                  Rediscover the Brilliance of Sight<br />
                  <span className="bg-gradient-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent">
                    7-Second Precision SMILE Pro
                  </span>
                  {' '}&amp; Premium Cataract
                </>
              )}
            </h1>

            <p className="font-body-lg text-[16px] lg:text-[17px] text-on-surface-variant leading-relaxed max-w-2xl">
              {language === 'KR'
                ? '국내 명문 A대학(예시)병원 · 신촌대학병원(예시) 각막 및 망막 세부전공 안과 전문의 직접 집도. 초고속 2MHz 펄스 자이스 비쥬맥스 800과 50여 가지 정밀 안구 안전 교차 검진으로 각막 손상을 극소화하고 가장 맑은 시야를 완성합니다.'
                : 'Directly operated by corneal & retinal subspecialist fellows from Seoul National University and Severance Hospital. Leveraging the 2.0MHz ultra-speed Carl Zeiss VisuMax 800 and 50-step cross-checking diagnostics for optimal visual acuity.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('fast-track-section')}
                className="flex items-center gap-2 px-7 py-4 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-[15px] font-bold shadow-lg shadow-primary-container/25 hover:bg-primary hover:text-on-primary transition-all active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[22px]">calendar_today</span>
                <span>{language === 'KR' ? '원데이 당일 검사·수술 신청' : 'Apply for 1-Day Fast-Track'}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('suitability-calculator')}
                className="flex items-center gap-2 px-6 py-4 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container-low font-headline-sm text-[15px] font-semibold shadow-sm hover:shadow-md transition-all border border-surface-container"
              >
                <span className="material-symbols-outlined text-[22px]">calculate</span>
                <span>{language === 'KR' ? '시력교정 적합도 자가진단' : 'Self Suitability Test'}</span>
              </button>
            </div>

            {/* Micro Certifications Row */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-on-surface-variant font-body-sm text-[13px]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                <span>독일 자이스 VisuMax 800 공인 인증</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">security</span>
                <span>각막잔여량 350㎛+ 엄격한 안전 보존 마진</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">speed</span>
                <span>검사 후 당일 오후 일상 회복형 수술</span>
              </div>
            </div>
          </div>

          {/* High-Tech Optical Graphic Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-surface-container-low p-3">
              <div className="relative w-full h-[360px] lg:h-[400px] rounded-xl overflow-hidden">
                <img
                  src="/portfolio/prime-vision-eye-clinic/eye-exam-friendly.jpg"
                  alt="프라임 스마트 아이 안과 세극등 정밀 안종합검진 및 시력교정 상담"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent pointer-events-none"></div>

                {/* Floating Top HUD Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-numeric text-[13px] text-primary font-bold shadow-md">
                    ZEISS VISUMAX 800 · 2.0MHz
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-numeric text-[12px] text-tertiary font-semibold">
                    LASER TIME: 07.2s
                  </span>
                </div>

                {/* Real-time HUD Corneal Scanner Visual Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[24px]">center_focus_strong</span>
                    </div>
                    <div>
                      <div className="font-headline-sm text-[14px] lg:text-[15px] font-bold text-on-surface">
                        CentraLign® 실시간 동공 추적
                      </div>
                      <div className="font-body-sm text-[12px] text-on-surface-variant">
                        오차 없는 시축 중심 정렬 완료 (0.00mm)
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-label-numeric text-[16px] font-bold text-primary">99.8%</div>
                    <div className="font-label-caps text-[10px] text-outline">정밀 시축 일치도</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST BENTO METRICS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {/* Bento 1 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/40">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-primary-fixed text-primary">
                <span className="material-symbols-outlined text-[26px]">timer</span>
              </span>
              <span className="font-label-caps text-[11px] text-secondary font-bold">ZEISS TECHNOLOGY</span>
            </div>
            <div className="mt-4">
              <div className="font-label-numeric text-[32px] font-bold text-primary tracking-tight">
                7초<span className="text-[17px] text-on-surface font-normal"> 초고속 레이저</span>
              </div>
              <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed">
                단안 기준 7초 만에 각막 실질 분리 완료. 수술 중 석션 로스 위험성과 환자의 심리적 공포를 획기적으로 차단합니다.
              </p>
            </div>
          </div>

          {/* Bento 2 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/40">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-surface-container-high text-tertiary">
                <span className="material-symbols-outlined text-[26px]">straighten</span>
              </span>
              <span className="font-label-caps text-[11px] text-tertiary font-bold">MINIMAL INCISION</span>
            </div>
            <div className="mt-4">
              <div className="font-label-numeric text-[32px] font-bold text-tertiary tracking-tight">
                2mm<span className="text-[17px] text-on-surface font-normal"> 미세 각막 절개</span>
              </div>
              <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed">
                기존 라식의 20mm 절개 대비 80% 이상 절개창을 줄여 각막 지각 신경 손상 및 수술 후 안구건조증을 최소화합니다.
              </p>
            </div>
          </div>

          {/* Bento 3 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/40">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-primary-fixed text-secondary">
                <span className="material-symbols-outlined text-[26px]">health_and_safety</span>
              </span>
              <span className="font-label-caps text-[11px] text-secondary font-bold">SURGICAL RECORD</span>
            </div>
            <div className="mt-4">
              <div className="font-label-numeric text-[32px] font-bold text-secondary tracking-tight">
                30,000+ (예시 수치)<span className="text-[17px] text-on-surface font-normal"> 누적 수술</span>
              </div>
              <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed">
                국내 명문대(예시) · 세브란스 출신 전임의의 숙련된 노하우로 축적된 안전 수술 케이스. 1:1 맞춤 사후 관리 평생 보증제.
              </p>
            </div>
          </div>

          {/* Bento 4 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/40">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-surface-container-high text-primary">
                <span className="material-symbols-outlined text-[26px]">checklist</span>
              </span>
              <span className="font-label-caps text-[11px] text-primary font-bold">SAFETY PROTOCOL</span>
            </div>
            <div className="mt-4">
              <div className="font-label-numeric text-[32px] font-bold text-primary tracking-tight">
                50-Step<span className="text-[17px] text-on-surface font-normal"> 정밀검진</span>
              </div>
              <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed">
                각막 전·후면, 잠재적 원추각막, 망막 중심부, 시신경 섬유층까지 수술 전 50단계 크로스체크를 통과해야만 수술을 진행합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
