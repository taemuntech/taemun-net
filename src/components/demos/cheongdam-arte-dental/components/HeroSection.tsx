import React from 'react';
import { CLINIC_IMAGES } from '../data/clinicData';
import { 
  Calendar, 
  Box, 
  ShieldCheck, 
  Wind, 
  Shield, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface HeroSectionProps {
  onNavigateToBooking: () => void;
  onNavigateToImplant: () => void;
  onOpenClinicTour: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToBooking,
  onNavigateToImplant,
  onOpenClinicTour
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-[#faf9f6]">
      {/* Architectural Ambient Light Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#ffdea5]/40 via-[#f4f3f1]/20 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-80 right-[-100px] w-96 h-96 bg-[#cce5ff]/30 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Hero Container */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-14 lg:pt-16 lg:pb-24">
        {/* Prestige Micro-Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 lg:px-4 lg:py-2 rounded-full bg-[#f4f3f1] shadow-sm mb-6 lg:mb-8 border border-[#d1c5b4]/40">
          <span className="w-2 h-2 rounded-full bg-[#775a19] animate-pulse shrink-0" />
          <span className="text-[11px] lg:text-xs text-[#1a1c1a] tracking-wider uppercase font-semibold break-keep">
            CHEF-D'ŒUVRE OF DIGITAL DENTISTRY • 청담동 명품 진료
          </span>
        </div>

        {/* Hero Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <h1 className="font-serif text-[28px] lg:text-[50px] text-[#1a1c1a] tracking-tight leading-[1.25] font-medium break-keep">
              디지털 정밀함에<br />
              <span className="italic font-normal text-[#775a19]">
                예술적 심미를 더하다
              </span><br />
              청담 아르떼 치과
            </h1>

            <p className="text-[#4e4639] text-[15px] lg:text-[17px] max-w-2xl leading-relaxed font-sans break-keep">
              구강악안면외과 &amp; 치과보철과 전문의 2인 협진 체제.<br className="hidden lg:inline" />
              3D 컴퓨터 모의수술로 계획하는 네비게이션 임플란트와 자연 법랑질의 투명도를 고려해 설계하는
              미세 삭제 라미네이트를 안내해 드립니다. 치료 방법과 기간은 진단 후 결정됩니다.
            </p>

            {/* CTAs */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 pt-2 w-full lg:w-auto">
              <button
                onClick={onNavigateToBooking}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 lg:px-7 lg:py-4 rounded-full bg-[#1a1c1a] text-white text-sm font-semibold tracking-wide shadow-xl hover:bg-[#775a19] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>온라인 사전 문진 &amp; 예약</span>
                <Calendar className="w-4 h-4 text-[#ffdea5]" />
              </button>
              
              <button
                onClick={onNavigateToImplant}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 lg:py-4 rounded-full bg-[#f4f3f1] text-[#1a1c1a] text-sm font-semibold tracking-wide shadow-sm hover:bg-[#e9e8e5] border border-[#d1c5b4]/50 transition-all"
              >
                <Box className="w-4 h-4 text-[#775a19]" />
                <span>1:1 디지털 진단 시스템</span>
              </button>
            </div>

            {/* Trust Badges Row */}
            <div className="pt-2 lg:pt-4 flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-6 text-[#4e4639] text-xs font-semibold break-keep">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5 text-[#775a19] shrink-0" />
                <span>국내 허가 임플란트 정품 사용 · 확인서 발급</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 lg:w-5 lg:h-5 text-[#006398] shrink-0" />
                <span>전 좌석 단독 1인 VIP 음압/양압 멸균룸</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <button
              type="button"
              onClick={onOpenClinicTour}
              aria-label="클리닉 공간 투어 열기"
              className="group cursor-pointer relative block w-full text-left rounded-3xl overflow-hidden shadow-2xl bg-[#e9e8e5] border border-[#d1c5b4]/40 transition-transform duration-500 hover:scale-[1.01]"
            >
              <img
                src={CLINIC_IMAGES.heroSuite}
                alt="Cheongdam Arte Dental Clinic VIP Suite"
                className="w-full h-[440px] lg:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              
              {/* Floating Suite Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-white/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#775a19] uppercase font-bold tracking-wider block">
                    VIP Private Suite 01
                  </span>
                  <span className="font-serif text-[17px] text-[#1a1c1a] font-bold">
                    1인 독립 음압 진료실 • 아르떼 가든 뷰
                  </span>
                  <span className="text-[11px] text-[#7f7667] block mt-0.5">
                    클릭하여 클리닉 공간 안내 보기
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#ffdea5]/50 flex items-center justify-center text-[#775a19]">
                  <Shield className="w-5 h-5" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Stats Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-16">
          <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-[#d1c5b4]/30 flex flex-col justify-between">
            <span className="text-[11px] text-[#7f7667] tracking-wider uppercase font-semibold mb-1">
              PERSONALIZED PLAN
            </span>
            <span className="font-sans text-4xl lg:text-[42px] font-bold text-[#775a19] tracking-tight my-1">
              1:1 설계
            </span>
            <span className="text-xs text-[#4e4639] mt-1 leading-relaxed">
              3D 진단 데이터로 환자마다 새로 세우는 치료 계획
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-[#d1c5b4]/30 flex flex-col justify-between">
            <span className="text-[11px] text-[#006398] tracking-wider uppercase font-semibold mb-1">
              SURGICAL PRECISION
            </span>
            <span className="font-sans text-4xl lg:text-[42px] font-bold text-[#1a1c1a] tracking-tight my-1">
              &lt; 0.1mm
            </span>
            <span className="text-xs text-[#4e4639] mt-1 leading-relaxed">
              3D 맞춤 수술 가이드 설계 시 허용 오차 기준
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-[#d1c5b4]/30 flex flex-col justify-between">
            <span className="text-[11px] text-[#775a19] tracking-wider uppercase font-semibold mb-1">
              VIP SUITE SPACE
            </span>
            <span className="font-sans text-4xl lg:text-[42px] font-bold text-[#775a19] tracking-tight my-1">
              100%
            </span>
            <span className="text-xs text-[#4e4639] mt-1 leading-relaxed">
              전 진료 좌석 1인 독립 VIP 룸 &amp; 양압 클린에어
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-[#d1c5b4]/30 flex flex-col justify-between">
            <span className="text-[11px] text-[#7f7667] tracking-wider uppercase font-semibold mb-1">
              STERILIZATION SYSTEM
            </span>
            <span className="font-sans text-4xl lg:text-[42px] font-bold text-[#1a1c1a] tracking-tight my-1">
              9-Stage
            </span>
            <span className="text-xs text-[#4e4639] mt-1 leading-relaxed">
              진료 기구 1인 1팩 중앙 멸균 감염관리 절차
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
