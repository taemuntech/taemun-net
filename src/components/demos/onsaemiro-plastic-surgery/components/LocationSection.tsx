import React from 'react';
import { MapPin, Navigation, Car, Clock, Phone, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-20 lg:py-28 bg-[#FAF6F2] text-[#1A1817] border-t border-[#E8DDD4]">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DDD4] text-[#8C6D4F] text-[12px] font-semibold mb-3">
            <MapPin className="w-3 h-3 text-[#B08968]" />
            <span>오시는 길 &amp; 진료 시간</span>
          </div>
          <h2 className="text-[28px] lg:text-[40px] font-serif font-bold text-[#1A1817] leading-tight mb-4">
            압구정 중심에서 만나는<br />
            <span className="text-[#8C6D4F]">프라이빗 온새미로 메디컬 라운지</span>
          </h2>
          <p className="text-[15px] text-[#68625D] leading-relaxed">
            수인분당선 압구정로데오역 도보 2분 거리에 위치하며, 전용 발렛 파킹 서비스를 지원합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Info (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#E8DDD4] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF6F2] flex items-center justify-center text-[#8C6D4F] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#1A1817]">병원 위치</div>
                  <div className="text-[13px] text-[#68625D] mt-0.5 leading-relaxed">
                    {CLINIC_INFO.address}
                  </div>
                  <div className="text-[12px] text-[#8C6D4F] font-semibold mt-1">
                    {CLINIC_INFO.subway}
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF6F2] flex items-center justify-center text-[#8C6D4F] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#1A1817]">진료 시간</div>
                  <div className="text-[13px] text-[#68625D] mt-0.5 space-y-0.5">
                    <div>{CLINIC_INFO.hours.weekday}</div>
                    <div>{CLINIC_INFO.hours.saturday}</div>
                    <div className="text-[12px] text-[#8C857D]">{CLINIC_INFO.hours.closed}</div>
                  </div>
                </div>
              </div>

              {/* Valet */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF6F2] flex items-center justify-center text-[#8C6D4F] shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#1A1817]">프라이빗 무료 발렛 파킹</div>
                  <div className="text-[13px] text-[#68625D] mt-0.5 leading-relaxed">
                    건물 1층 정문 앞 전용 발렛 부스에서 담당 기사가 안전하게 발렛 주차를 도와드립니다.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Call Box */}
            <div className="p-4 rounded-2xl bg-[#FAF6F2] border border-[#E8DDD4] flex items-center justify-between">
              <div>
                <div className="text-[11px] text-[#8C857D]">대표 전화 예약 문의</div>
                <div className="text-[18px] font-bold text-[#1A1817] font-mono">{CLINIC_INFO.tel}</div>
              </div>
              <div className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-[#1A1817] text-white">
                100% 예약제
              </div>
            </div>
          </div>

          {/* Right Map Mockup & Visual (7 cols) */}
          <div className="lg:col-span-7 bg-[#252220] rounded-3xl overflow-hidden border border-[#E8DDD4] relative min-h-[360px] flex flex-col justify-between p-8 text-white shadow-sm">
            {/* Background Aesthetic Image */}
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
              alt="온새미로 프라이빗 로비"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1817] via-[#1A1817]/60 to-transparent" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-white/10 backdrop-blur-md border border-white/20 text-[#E8DDD4]">
                Apgujeong Rodeo Medical Tower
              </span>
              <span className="text-[12px] text-[#C5A880] font-mono">37.5268° N, 127.0392° E</span>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="bg-[#1A1817]/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 max-w-md">
                <div className="flex items-center gap-2 text-[#C5A880] text-[13px] font-bold mb-1">
                  <Navigation className="w-4 h-4" />
                  <span>내비게이션 검색 안내</span>
                </div>
                <p className="text-[13px] text-[#D3CBC3] leading-relaxed">
                  카카오내비, 티맵, 네이버지도에서 <strong className="text-white">‘온새미로 성형외과’</strong>를 검색하시면 주차장 입구로 바로 안내됩니다.
                </p>
              </div>

              <div className="text-[12px] text-[#A69F97]">
                ※ 수술 당일에는 자가운전이 어려울 수 있으므로 대중교통 이용 또는 보호자 동행을 권장합니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
