import React from 'react';
import { AVAILABLE_HARMONY, AVAILABLE_ROYAL, HOSPITAL_IMAGES } from '../data/hospitalData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenTour: () => void;
  onOpenBedStatus: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenTour,
  onOpenBedStatus,
}) => {
  return (
    <section id="hospital-philosophy" className="relative w-full bg-[#faf9f6] overflow-hidden pt-6 pb-16">
      {/* Ambient organic gradient glow */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-[#cbe9da]/25 blur-3xl pointer-events-none -mr-32 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-[#ffd9b4]/20 blur-3xl pointer-events-none -ml-24"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Top Badges & Real-time Sensor HUD */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-[#e9e8e5] px-3.5 py-1.5 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#102a20] animate-ping"></span>
            <span className="text-[12px] text-[#102a20] font-semibold tracking-wide">
              80병상 입원 병동 · 의·한의 협진 통합진료 (가상 브랜드 샘플)
            </span>
          </div>

          {/* Smart Clean Air / Water Sensor Capsule */}
          <div className="hidden lg:flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm text-[12px] text-[#424844] border border-[#e3e2e0]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#102a20]">filter_vintage</span>
              <span className="font-medium">지리산 GAP 인증 엄선 본초</span>
            </div>
            <span className="text-[#c2c8c3] opacity-60">|</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#75593c]">water_drop</span>
              <span className="font-medium">3중 역삼투압(RO) 정수 탕전</span>
            </div>
            <span className="text-[#c2c8c3] opacity-60">|</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#264035] animate-pulse"></span>
              <span className="text-[#102a20] font-medium">병동 공조·환기 상시 가동</span>
            </div>
          </div>
        </div>

        {/* Hero Main Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-block">
              <span className="text-[13px] text-[#75593c] tracking-widest uppercase font-semibold">
                Integrative Oncology &amp; Holistic Recovery
              </span>
            </div>

            <h1 className="font-serif text-[26px] lg:text-[46px] text-[#102a20] tracking-tight leading-[1.25] break-keep">
              비움과 채움의 치유 미학 —<br />
              <span className="text-[#75593c] italic font-serif">의·한의 통합 80병상</span><br />
              본초 한방병원
            </h1>

            <p className="text-[14px] lg:text-[16px] text-[#424844] leading-relaxed max-w-[560px] break-keep">
              고주파 온열치료(13.56MHz)와 면역 영양 수액, 그리고 환자마다 따로 내는 본초 탕약을 의사·한의사가 함께 상의해 진료 계획을 세웁니다. 편백 향이 나는 프라이빗 입원실에서 치료 기간을 보내실 수 있습니다.
            </p>

            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 lg:gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-5 lg:px-6 py-3.5 rounded-lg bg-[#102a20] text-white text-[14px] font-semibold shadow-md hover:bg-[#264035] active:scale-98 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                <span className="break-keep">입원 상담 및 예약 신청</span>
              </button>

              <button
                onClick={onOpenTour}
                className="inline-flex items-center justify-center gap-2 px-5 lg:px-6 py-3.5 rounded-lg bg-white text-[#75593c] text-[14px] font-semibold shadow-sm border border-[#e3e2e0] hover:bg-[#f4f3f0] active:scale-98 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
                <span className="break-keep">360° VIP 입원실 둘러보기</span>
              </button>
            </div>

            {/* Quick Hospital Stats Bar */}
            <div className="pt-2 grid grid-cols-3 gap-2 lg:gap-4 bg-[#f4f3f0] p-3.5 lg:p-4 rounded-xl shadow-sm border border-[#e9e8e5] break-keep">
              <div>
                <div className="text-[11px] lg:text-[12px] text-[#75593c] font-medium">의·한의 복수면허</div>
                <div className="font-serif text-[18px] lg:text-[22px] text-[#102a20] font-semibold">1:1 협진</div>
              </div>
              <div>
                <div className="text-[11px] lg:text-[12px] text-[#75593c] font-medium">전 병상 모션베드</div>
                <div className="font-serif text-[22px] text-[#102a20] font-semibold">80 Beds</div>
              </div>
              <div>
                <div className="text-[12px] text-[#75593c] font-medium">협력 이송 핫라인</div>
                <div className="font-serif text-[22px] text-[#102a20] font-semibold">24h 케어</div>
              </div>
            </div>
          </div>

          {/* Visual Hero Sanctuary Card Mosaic */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#efeeeb] group">
              {/* Main Hero Image */}
              <img
                className="w-full h-[460px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                alt="본초 한방병원 1인실 로열 프라이빗 테라스 스위트"
                src={HOSPITAL_IMAGES.heroSuite}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102a20]/80 via-[#102a20]/15 to-transparent pointer-events-none"></div>

              {/* Floating In-Image Badge */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-lg shadow-md flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#102a20] animate-pulse"></div>
                <span className="text-[13px] text-[#102a20] font-semibold">
                  1인실 로열 프라이빗 테라스 룸
                </span>
              </div>

              {/* Floating Overlay Card: Today's Realtime Status */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex flex-col lg:flex-row items-center justify-between gap-3 text-[#1a1c1a]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#cbe9da] flex items-center justify-center text-[#102a20] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">hotel</span>
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-[#102a20]">오늘 입원 가능 병상 안내</div>
                    <div className="text-[13px] text-[#424844]">
                      1인실 <strong className="text-[#102a20]">{AVAILABLE_ROYAL}실</strong> · 2인실 <strong className="text-[#75593c]">{AVAILABLE_HARMONY}병상</strong> (오늘 기준 안내 · 예시)
                    </div>
                  </div>
                </div>
                <button
                  onClick={onOpenBedStatus}
                  className="shrink-0 w-full lg:w-auto px-4 py-2 max-lg:min-h-[44px] rounded-lg bg-[#264035] text-white text-[13px] font-semibold hover:bg-[#102a20] active:scale-95 transition-all cursor-pointer"
                >
                  병실 현황 조회
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Key Trust Metrics Bento Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-12">
          {/* Bento 1 */}
          <div className="p-6 rounded-xl bg-white border border-[#e3e2e0] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#e9e8e5] flex items-center justify-center text-[#102a20] mb-4">
              <span className="material-symbols-outlined text-[26px]">king_bed</span>
            </div>
            <div className="font-serif text-[18px] text-[#102a20] font-semibold mb-1">
              80-Bed Luxury Suite
            </div>
            <p className="text-[13px] text-[#424844] leading-relaxed">
              전 병상 전동 모션베드와 병실별 공기청정·환기 설비
            </p>
          </div>

          {/* Bento 2 */}
          <div className="p-6 rounded-xl bg-white border border-[#e3e2e0] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#ffd9b4] flex items-center justify-center text-[#533417] mb-4">
              <span className="material-symbols-outlined text-[26px]">vital_signs</span>
            </div>
            <div className="font-serif text-[18px] text-[#102a20] font-semibold mb-1">
              1:1 Integrative Oncology
            </div>
            <p className="text-[13px] text-[#424844] leading-relaxed">
              의사·한의사 복수면허 의료진과 간호인력이 함께 보는 365일 협진 진료 계획
            </p>
          </div>

          {/* Bento 3 */}
          <div className="p-6 rounded-xl bg-white border border-[#e3e2e0] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#e9e8e5] flex items-center justify-center text-[#75593c] mb-4">
              <span className="material-symbols-outlined text-[26px]">compost</span>
            </div>
            <div className="font-serif text-[18px] text-[#102a20] font-semibold mb-1">
              GAP·hGMP 규격 약재
            </div>
            <p className="text-[13px] text-[#424844] leading-relaxed">
              중금속·잔류농약 시험 성적서를 로트별로 보관하는 원내 옹기 무압력 추출 탕제 (예시 표기)
            </p>
          </div>

          {/* Bento 4 */}
          <div className="p-6 rounded-xl bg-white border border-[#e3e2e0] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#264035] flex items-center justify-center text-white mb-4">
              <span className="material-symbols-outlined text-[26px]">emergency</span>
            </div>
            <div className="font-serif text-[18px] text-[#102a20] font-semibold mb-1">
              24h Medical Network
            </div>
            <p className="text-[13px] text-[#424844] leading-relaxed">
              24시간 당직의 및 간호사 상주, 인근 대형병원 (가상 협력망) 응급 이송 핫라인
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
