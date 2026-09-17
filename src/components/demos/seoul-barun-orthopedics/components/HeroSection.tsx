import React from 'react';
import { CLINIC_IMAGES } from '../data/clinicData';

interface HeroSectionProps {
  onScrollToQuiz: () => void;
  onScrollToBooking: () => void;
  onScrollToRehab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToQuiz,
  onScrollToBooking,
  onScrollToRehab,
}) => {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-[#FAF9F6] pb-12 pt-6">
      {/* Ambient biomechanical backdrop glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#95F8A7]/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#89F5E7]/25 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12 relative z-10">
        {/* Top Clinical Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9E8E5] text-[#3F493F] text-xs lg:text-sm mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#00652C] animate-pulse"></span>
          <span className="font-bold text-[#00652C]">정밀진단 원스톱 인프라</span>
          <span className="text-[#BECABC]">|</span>
          <span>1.5T MRI 당일 가동 중 (예시 사양)</span>
        </div>

        {/* Main Asymmetric Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="space-y-2">
              <span className="text-[12px] lg:text-[13px] text-[#00652C] tracking-widest uppercase font-bold block">
                Orthopedic &amp; Spine Biomechanics Institute
              </span>
              <h1 className="text-[26px] lg:text-[44px] font-bold text-[#1A1C1A] tracking-tight leading-[1.3] lg:leading-[1.22] break-keep">
                칼을 대지 않는 <br className="hidden lg:inline" />
                <span className="text-[#00652C] underline decoration-[#00652C]/30 underline-offset-8">
                  비수술 우선 원칙
                </span>{' '}
                — <br />
                척추·관절의 바른 회복을 함께합니다.
              </h1>
            </div>

            <p className="text-[15px] lg:text-lg text-[#3F493F] max-w-2xl leading-relaxed break-keep">
              정형외과 전문의 2인이 함께 보는 협진 체계.
              정밀 초음파·C-Arm 유도 주사 치료, 1.5T MRI 당일 판독 원스톱,
              그리고 100평 전용 물리도수운동치료센터를 하나의 치료 플랜으로 안내합니다.
            </p>

            {/* CTAs */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 lg:gap-3 pt-1 w-full lg:w-auto">
              <button
                onClick={onScrollToQuiz}
                className="h-11 lg:h-12 px-5 lg:px-6 rounded-xl bg-[#00652C] text-white text-sm lg:text-base font-bold inline-flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,101,44,0.22)] hover:bg-[#15803D] transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[20px]">stethoscope</span>
                <span>4대 부위 통증 자가체크</span>
              </button>

              <button
                onClick={onScrollToBooking}
                className="h-11 lg:h-12 px-5 lg:px-6 rounded-xl bg-[#E3E2E0] text-[#1A1C1A] text-sm lg:text-base font-bold inline-flex items-center justify-center gap-2 hover:bg-[#D5E0F8] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-[#007D73]">flash_on</span>
                <span>당일 1.5T MRI 예약</span>
              </button>

              <button
                onClick={onScrollToRehab}
                className="h-11 lg:h-12 px-4 lg:px-5 rounded-xl bg-white text-[#545F73] text-sm lg:text-base font-semibold inline-flex items-center justify-center gap-2 shadow-sm border border-[#E9E8E5] hover:text-[#1A1C1A] hover:bg-[#F4F3F1] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">sports_gymnastics</span>
                <span>1:1 도수재활 상담</span>
              </button>
            </div>

            {/* Micro Medical Proof Badges */}
            <div className="flex flex-wrap items-center gap-3 lg:gap-6 pt-2 text-[#545F73] text-xs lg:text-sm font-medium break-keep">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00652C] text-[18px]">verified</span>
                <span>정형외과 전문의 상주 진료</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00652C] text-[18px]">verified</span>
                <span>집중형·방사형 체외충격파 장비 보유</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00652C] text-[18px]">verified</span>
                <span>물리치료사 1:1 전담 재활</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composite Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#EFEEEB] shadow-[0_12px_36px_rgba(0,0,0,0.06)] aspect-[4/3] w-full border border-[#E9E8E5]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                alt="Modern orthopedic clinic interior in Seoul Barun Madi"
                src={CLINIC_IMAGES.interior}
               referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F312F]/85 via-[#2F312F]/30 to-transparent pointer-events-none"></div>

              {/* Inset Telemetry Chip */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md flex items-center gap-2 border border-white/60">
                <div className="w-2.5 h-2.5 rounded-full bg-[#007D73] animate-pulse"></div>
                <span className="text-xs lg:text-sm text-[#1A1C1A] font-bold">1.5T MRI 실시간 슬롯 가동</span>
              </div>

              {/* Inset Diagnostic Metric Footer */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF9F6]/95 backdrop-blur-md p-3 rounded-xl flex items-center justify-between shadow-sm border border-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00652C]/10 flex items-center justify-center text-[#00652C]">
                    <span className="material-symbols-outlined">arrows_outward</span>
                  </div>
                  <div>
                    <div className="text-xs lg:text-sm text-[#1A1C1A] font-bold">당일 정밀진단 &amp; 비수술 시술</div>
                    <div className="text-[11px] text-[#545F73]">검사 후 1시간 내 판독 결과 상담 및 시술</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#00652C] text-white text-[11px] font-bold">
                  원스톱
                </span>
              </div>
            </div>

            {/* Floating Overlap Badge */}
            <div className="-mt-6 ml-6 relative z-20 max-w-xs bg-white p-3.5 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center gap-3 border border-[#E9E8E5]">
              <div className="w-10 h-10 rounded-full bg-[#D5E0F8] flex items-center justify-center text-[#586377] font-bold">
                <span className="material-symbols-outlined text-[20px]">medical_services</span>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-[#1A1C1A] font-bold">비수술 치료 중심 진료 (예시)</div>
                <div className="text-[11px] text-[#6F7A6E]">정형외과 세부 전문의 2인의 협진</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Numbers Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Metric 1 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E9E8E5] flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-[#545F73] font-semibold uppercase tracking-wider">
                Conservative First
              </span>
              <span className="material-symbols-outlined text-[#00652C] text-[22px]">healing</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00652C] tracking-tight">비수술 우선</div>
              <div className="text-sm font-bold text-[#1A1C1A] mt-1">보존적 치료 우선 원칙</div>
              <p className="text-xs text-[#3F493F] mt-0.5">수술 여부는 검사 결과를 보고 전문의와 상의해 정합니다</p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E9E8E5] flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-[#545F73] font-semibold uppercase tracking-wider">
                Diagnostic Speed
              </span>
              <span className="material-symbols-outlined text-[#007D73] text-[22px]">shutter_speed</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#007D73] tracking-tight">당일 판독</div>
              <div className="text-sm font-bold text-[#1A1C1A] mt-1">1.5T MRI 원스톱 검사</div>
              <p className="text-xs text-[#3F493F] mt-0.5">1.5T 영상장비 및 판독 소견서 당일 발급</p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E9E8E5] flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-[#545F73] font-semibold uppercase tracking-wider">
                Rehab Capacity
              </span>
              <span className="material-symbols-outlined text-[#545F73] text-[22px]">fitness_center</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1A1C1A] tracking-tight">100평 규모</div>
              <div className="text-sm font-bold text-[#1A1C1A] mt-1">1:1 도수재활 전용센터</div>
              <p className="text-xs text-[#3F493F] mt-0.5">슬링·3D 감압기·메디컬 필라테스 기구</p>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E9E8E5] flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-[#545F73] font-semibold uppercase tracking-wider">
                Faculty Lineup
              </span>
              <span className="material-symbols-outlined text-[#15803D] text-[22px]">workspace_premium</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1A1C1A] tracking-tight">전문의 2인</div>
              <div className="text-sm font-bold text-[#1A1C1A] mt-1">정형외과 전문의 협진</div>
              <p className="text-xs text-[#3F493F] mt-0.5">척추 외과 및 관절 스포츠의학 세부전공 협진</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
