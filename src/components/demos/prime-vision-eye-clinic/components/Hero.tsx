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
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps text-[11px] lg:text-[12px] font-semibold tracking-wider shadow-sm break-keep">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping shrink-0"></span>
            <span>4TH-GEN FEMTOSECOND LASER CENTER</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-secondary font-label-caps text-[11px] lg:text-[12px] font-semibold break-keep">
            <span>30,000+ (예시 수치)</span>
            <span>{language === 'KR' ? '누적 수술 케이스' : 'Cumulative Cases'}</span>
          </span>
          <span className="hidden lg:inline-flex px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-caps text-[11px] lg:text-[12px] break-keep">
            {language === 'KR'
              ? '각막 · 망막 세부전공 안과 전문의 팀 (예시)'
              : 'Cornea & Retina Subspecialist Team (sample)'}
          </span>
        </div>

        {/* Main Headline & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5 lg:gap-6">
            <h1 className="text-[28px] lg:text-[44px] font-extrabold text-on-surface tracking-tight leading-[1.22] break-keep">
              {language === 'KR' ? (
                <>
                  눈부신 세상의 디테일을 되찾다<br />
                  <span className="text-primary inline-block">절편을 만들지 않는 렌티큘 추출술</span>
                  <span className="text-secondary font-bold text-[22px] lg:text-[34px] ml-1.5 inline-block">
                    &amp; 프리미엄 백내장
                  </span>
                </>
              ) : (
                <>
                  Rediscover the Brilliance of Sight<br />
                  <span className="text-primary inline-block">7-Second Lenticule Extraction</span>
                  <span className="text-secondary font-bold text-[22px] lg:text-[34px] ml-1.5 inline-block">
                    &amp; Premium Cataract
                  </span>
                </>
              )}
            </h1>

            <p className="font-body-lg text-[15px] lg:text-[17px] text-on-surface-variant leading-relaxed max-w-2xl break-keep">
              {language === 'KR'
                ? '국내 대학병원(예시)에서 각막 및 망막을 세부전공한 안과 전문의가 직접 집도합니다. 펨토초 레이저 장비와 50여 가지 정밀 안구 안전 교차 검진으로 각막에 가는 부담을 줄이도록 설계된 수술 방식입니다. 시력 결과에는 개인차가 있습니다.'
                : 'Performed by ophthalmologists subspecialised in cornea and retina at a university hospital (sample). A femtosecond laser system and 50-step cross-checking diagnostics are used to limit corneal burden. Outcomes vary between individuals.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('fast-track-section')}
                className="flex items-center justify-center gap-2 px-6 lg:px-7 py-3.5 lg:py-4 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-[14px] lg:text-[15px] font-bold shadow-lg shadow-primary-container/25 hover:bg-primary hover:text-on-primary transition-all active:scale-[0.99] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] lg:text-[22px]">calendar_today</span>
                <span className="break-keep">{language === 'KR' ? '원데이 당일 검사·수술 신청' : 'Apply for 1-Day Fast-Track'}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('suitability-calculator')}
                className="flex items-center justify-center gap-2 px-5 lg:px-6 py-3.5 lg:py-4 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container-low font-headline-sm text-[14px] lg:text-[15px] font-semibold shadow-sm hover:shadow-md transition-all border border-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] lg:text-[22px]">calculate</span>
                <span className="break-keep">{language === 'KR' ? '시력교정 적합도 자가진단' : 'Self Suitability Test'}</span>
              </button>
            </div>

            {/* Micro Certifications Row */}
            <div className="flex flex-wrap items-center gap-3 lg:gap-6 pt-3 text-on-surface-variant font-body-sm text-[12px] lg:text-[13px] break-keep">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px] lg:text-[20px] shrink-0">verified</span>
                <span>펨토초 레이저 장비 운용 (예시)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-tertiary text-[18px] lg:text-[20px] shrink-0">security</span>
                <span>각막잔여량 350㎛+ 엄격한 안전 보존 마진</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px] lg:text-[20px] shrink-0">speed</span>
                <span>검사 후 당일 오후 수술 진행 가능 (검진 결과에 따름)</span>
              </div>
            </div>
          </div>

          {/* High-Tech Optical Graphic Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-surface-container-low p-2.5 lg:p-3">
              <div className="relative w-full h-[320px] lg:h-[400px] rounded-xl overflow-hidden">
                <img
                  src="/portfolio/prime-vision-eye-clinic/eye-exam-friendly.jpg"
                  alt="프라임 스마트 아이 안과 세극등 정밀 안종합검진 및 시력교정 상담"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent pointer-events-none"></div>

                {/* Floating Top HUD Badges */}
                <div className="absolute top-3 left-3 right-3 lg:top-4 lg:left-4 lg:right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-numeric text-[11px] lg:text-[13px] text-primary font-bold shadow-md">
                    FEMTOSECOND LASER
                  </span>
                  <span className="px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-numeric text-[11px] lg:text-[12px] text-tertiary font-semibold">
                    LASER TIME: SECONDS
                  </span>
                </div>

                {/* Real-time HUD Corneal Scanner Visual Overlay */}
                <div className="absolute bottom-3 left-3 right-3 lg:bottom-4 lg:left-4 lg:right-4 p-3 lg:p-4 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5 lg:gap-3">
                    <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[20px] lg:text-[24px]">center_focus_strong</span>
                    </div>
                    <div className="break-keep">
                      <div className="font-headline-sm text-[13px] lg:text-[15px] font-bold text-on-surface">
                        실시간 동공 추적 · 자동 중심 정렬
                      </div>
                      <div className="font-body-sm text-[11px] lg:text-[12px] text-on-surface-variant">
                        시축 중심 정렬 진행 중 (장비 화면 예시)
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-2">
                    <div className="font-label-numeric text-[15px] lg:text-[16px] font-bold text-primary">99.8%</div>
                    <div className="font-label-caps text-[9px] lg:text-[10px] text-outline">시축 일치도 (예시 수치)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST BENTO METRICS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-5 mt-12 lg:mt-16">
          {/* Bento 1 */}
          <div className="p-5 lg:p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/40 break-keep">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 rounded-xl bg-primary-fixed text-primary">
                <span className="material-symbols-outlined text-[24px]">timer</span>
              </span>
              <span className="font-label-caps text-[11px] text-secondary font-bold">LASER TECHNOLOGY</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 font-bold tracking-tight">
                <span className="font-label-numeric text-[26px] lg:text-[30px] text-primary">수 초</span>
                <span className="text-[15px] text-on-surface font-semibold">단위 레이저 조사</span>
              </div>
              <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed break-keep">
                단안 기준 수 초 단위로 각막 실질 분리를 마칩니다. 레이저 조사 시간이 짧아 수술 중 석션 로스 위험과 환자의 부담을 줄이는 데 도움이 됩니다.
              </p>
            </div>
          </div>

          {/* Bento 2 */}
          <div className="p-5 lg:p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/40 break-keep">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 rounded-xl bg-surface-container-high text-tertiary">
                <span className="material-symbols-outlined text-[24px]">straighten</span>
              </span>
              <span className="font-label-caps text-[11px] text-tertiary font-bold">MINIMAL INCISION</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 font-bold tracking-tight">
                <span className="font-label-numeric text-[26px] lg:text-[30px] text-tertiary">2mm</span>
                <span className="text-[15px] text-on-surface font-semibold">미세 각막 절개</span>
              </div>
              <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed break-keep">
                각막 뚜껑(절편)을 만드는 방식보다 절개창이 작아, 각막 지각 신경 손상과 수술 후 안구건조 증상을 줄이는 것을 목표로 합니다. 정도는 개인차가 있습니다.
              </p>
            </div>
          </div>

          {/* Bento 3 */}
          <div className="p-5 lg:p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/40 break-keep">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 rounded-xl bg-primary-fixed text-secondary">
                <span className="material-symbols-outlined text-[24px]">health_and_safety</span>
              </span>
              <span className="font-label-caps text-[11px] text-secondary font-bold">SURGICAL RECORD</span>
            </div>
            <div>
              <div className="flex flex-wrap items-baseline gap-1.5 font-bold tracking-tight">
                <span className="font-label-numeric text-[26px] lg:text-[30px] text-secondary">30,000+</span>
                <span className="text-[11px] text-secondary font-medium px-1.5 py-0.5 rounded bg-secondary/10 shrink-0">예시 수치</span>
                <span className="text-[15px] text-on-surface font-semibold whitespace-nowrap">누적 수술</span>
              </div>
              <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed break-keep">
                국내 대학병원(예시) 세부전공 전임의 과정을 거친 의료진이 쌓아 온 수술 케이스. 1:1 맞춤 사후 관리 시스템.
              </p>
            </div>
          </div>

          {/* Bento 4 */}
          <div className="p-5 lg:p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/40 break-keep">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 rounded-xl bg-surface-container-high text-primary">
                <span className="material-symbols-outlined text-[24px]">checklist</span>
              </span>
              <span className="font-label-caps text-[11px] text-primary font-bold">SAFETY PROTOCOL</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 font-bold tracking-tight">
                <span className="font-label-numeric text-[26px] lg:text-[30px] text-primary">50-Step</span>
                <span className="text-[15px] text-on-surface font-semibold">정밀검진</span>
              </div>
              <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed break-keep">
                각막 전·후면, 잠재적 원추각막, 망막 중심부, 시신경 섬유층까지 수술 전 50단계 크로스체크를 통과해야만 수술을 진행합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
