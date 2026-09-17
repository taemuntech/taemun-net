import React from 'react';
import { CLINIC_IMAGES } from '../data/clinicData';
import { 
  MapPin, 
  Car, 
  Train, 
  Phone, 
  ExternalLink,
  Navigation,
  Compass
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12 py-20 lg:py-28" id="location-section">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] text-[#775a19] tracking-widest uppercase font-semibold block mb-2 font-sans">
          LOCATION &amp; CONCIERGE
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#1a1c1a] font-medium tracking-tight">
          청담 아르떼 치과 오시는 길
        </h2>
        <p className="text-sm lg:text-base text-[#4e4639] mt-3 leading-relaxed">
          압구정로데오역 3번 출구 도보 3분, 명품거리 중심에 위치하여 대중교통과 자가용 모두 편리하게 방문하실 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Information Card */}
        <div className="lg:col-span-5 bg-white p-8 lg:p-10 rounded-3xl shadow-lg border border-[#d1c5b4]/40 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#ffdea5] flex items-center justify-center text-[#261900] shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-[#775a19]" />
              </div>
              <div>
                <span className="text-xs text-[#7f7667] font-semibold uppercase tracking-wider block">
                  ADDRESS
                </span>
                <span className="text-sm lg:text-base font-bold text-[#1a1c1a] block mt-0.5">
                  서울특별시 강남구 압구정로 88-1
                </span>
                <span className="text-xs text-[#4e4639] block mt-0.5">
                  청담 아르떼 메디컬 타워 4층 (상담 및 진료실) &amp; 5층 (디지털 수술실)
                </span>
              </div>
            </div>

            {/* Subway */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#001d31] shrink-0 mt-1">
                <Train className="w-5 h-5 text-[#006398]" />
              </div>
              <div>
                <span className="text-xs text-[#7f7667] font-semibold uppercase tracking-wider block">
                  SUBWAY (지하철)
                </span>
                <span className="text-sm font-bold text-[#1a1c1a] block mt-0.5">
                  수인분당선 압구정로데오역 3번 출구
                </span>
                <span className="text-xs text-[#4e4639] block mt-0.5">
                  청담 명품거리 방면으로 직진 도보 약 3분 (280m 직진)
                </span>
              </div>
            </div>

            {/* Parking */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#dae2fd] flex items-center justify-center text-[#131b2e] shrink-0 mt-1">
                <Car className="w-5 h-5 text-[#565e74]" />
              </div>
              <div>
                <span className="text-xs text-[#7f7667] font-semibold uppercase tracking-wider block">
                  VIP VALET PARKING (주차 안내)
                </span>
                <span className="text-sm font-bold text-[#1a1c1a] block mt-0.5">
                  건물 1층 전용 발렛 부스 상시 대기
                </span>
                <span className="text-xs text-[#4e4639] block mt-0.5">
                  진료 및 수술 환자분들께는 전액 무료 VIP 발렛 주차권이 제공됩니다.
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#e9e8e5] flex items-center justify-center text-[#1a1c1a] shrink-0 mt-1">
                <Phone className="w-5 h-5 text-[#775a19]" />
              </div>
              <div>
                <span className="text-xs text-[#7f7667] font-semibold uppercase tracking-wider block">
                  CONCIERGE DESK
                </span>
                <a 
                  href="#booking-section"
                  className="text-base font-serif font-bold text-[#775a19] hover:underline block mt-0.5"
                >
                  02-0000-0000
                </a>
                <span className="text-xs text-[#7f7667] block mt-0.5">
                  월/수/금: 10:00 ~ 19:00 | 화/목: 10:00 ~ 21:00 (야간)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Route Links */}
          <div className="pt-6 border-t border-[#d1c5b4]/30 grid grid-cols-2 gap-3">
            <a
              href="https://map.naver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#03C75A]/10 text-[#03C75A] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#03C75A]/20 transition-colors"
            >
              <span>네이버 지도 길찾기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://map.kakao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#FEE500]/30 text-[#3C1E1E] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#FEE500]/50 transition-colors"
            >
              <span>카카오맵 길찾기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Map Visual Card */}
        <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full rounded-3xl overflow-hidden shadow-lg border border-[#d1c5b4]/40 bg-[#e9e8e5]">
          <img
            src={CLINIC_IMAGES.mapBackground}
            alt="Cheongdam Arte Dental Location Map"
            className="w-full h-full object-cover"
          referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

          {/* Interactive Pin Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#775a19] text-white flex items-center justify-center shadow-2xl animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/40 rounded-full blur-[1px]" />
            </div>

            {/* Pin Info Popup Card */}
            <div className="mt-3 px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/80 text-center">
              <span className="text-[10px] text-[#775a19] uppercase font-bold tracking-wider block">
                ARTE MEDICAL TOWER 4-5F
              </span>
              <span className="font-serif text-sm font-bold text-[#1a1c1a] block">
                청담 아르떼 치과의원
              </span>
              <span className="text-[11px] text-[#4e4639] block mt-0.5">
                압구정로데오역 3번 출구 도보 3분 • VIP 무료 발렛
              </span>
            </div>
          </div>

          {/* Map Controls Floating Badge */}
          <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#1a1c1a] shadow-md border border-[#d1c5b4]/40 flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#775a19]" />
            <span>강남구 청담동 88-1 일대</span>
          </div>
        </div>
      </div>
    </section>
  );
};
