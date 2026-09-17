import React from 'react';
import { MapPin, Navigation, Car, Clock, Phone, ExternalLink } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location-hours" className="w-full py-16 lg:py-20 bg-[#fbf9f6] border-b border-[#eae8e5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="px-3 py-1 rounded-full bg-[#efeeeb] text-[#745a2a] text-xs font-semibold tracking-wider uppercase mb-2 inline-block border border-[#e4e2df]">
            Location & Operating Hours
          </span>
          <h2 className="font-serif text-2xl lg:text-3xl lg:text-[32px] text-[#00110b] tracking-tight mb-3">
            더 노블 청담 오시는 길 & 진료 시간 안내
          </h2>
          <p className="text-sm lg:text-base text-[#424845] leading-relaxed">
            압구정·청담 거리 인접. 지하철과 도보로 오시기 편한 곳에 있으며, 차량 이용 시 발렛 파킹을 지원합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 6 Columns: Address, Subway, Hours */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            {/* Address & Valet Card */}
            <div className="bg-[#ffffff] p-6 rounded-xl border border-[#eae8e5] shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#efeeeb] flex items-center justify-center text-[#745a2a] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#00110b]">
                    {CLINIC_INFO.name}
                  </h3>
                  <p className="text-xs lg:text-sm text-[#424845] mt-1 font-medium">
                    {CLINIC_INFO.address}
                  </p>
                  <p className="text-xs text-[#727975] mt-1">
                    {CLINIC_INFO.subway}
                  </p>
                </div>
              </div>

              {/* Valet Parking Guarantee */}
              <div className="bg-[#f5f3f0] p-4 rounded-lg border border-[#eae8e5] flex items-start gap-3 text-xs">
                <Car className="w-5 h-5 text-[#745a2a] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#00110b] block mb-0.5">
                    내원 고객 발렛 파킹 지원
                  </span>
                  <p className="text-[#424845] leading-relaxed">
                    {CLINIC_INFO.valet}
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-[#ffffff] p-6 rounded-xl border border-[#eae8e5] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#745a2a]" />
                <h3 className="font-serif text-lg font-medium text-[#00110b]">
                  정규 진료 및 야간진료 스케줄
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                {CLINIC_INFO.hours.map((h, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-lg ${
                      h.highlight
                        ? 'bg-[#efeeeb] font-semibold text-[#00110b] border border-[#745a2a]/20'
                        : 'text-[#424845] bg-[#f5f3f0]'
                    }`}
                  >
                    <span>{h.days}</span>
                    <span className="font-mono text-right">{h.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-[11px] text-[#727975] flex items-center justify-between pt-2 border-t border-[#efeeeb]">
                <span>점심시간: {CLINIC_INFO.lunchHour}</span>
                <span className="text-[#745a2a] font-medium">사전 예약제</span>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Interactive Map Card */}
          <div className="lg:col-span-6 flex">
            <div className="w-full rounded-xl bg-[#ffffff] p-6 border border-[#eae8e5] shadow-sm flex flex-col justify-between overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-[#745a2a]" />
                    <span className="font-serif text-lg font-medium text-[#00110b]">
                      청담 메디컬 맵 & 내비게이션
                    </span>
                  </div>
                  <span className="text-xs text-[#727975]">압구정로 412</span>
                </div>

                {/* Simulated Stylized Map Canvas */}
                <div className="relative h-64 lg:h-72 rounded-lg overflow-hidden bg-[#efeeeb] border border-[#e4e2df] mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#c1c8c4_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Road Vector Graphic Simulation */}
                  <svg className="absolute inset-0 w-full h-full text-[#e4e2df]" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="24" />
                    <line x1="45%" y1="0" x2="45%" y2="100%" stroke="currentColor" strokeWidth="18" />
                    <line x1="0" y1="20%" x2="100%" y2="70%" stroke="#d8d5d0" strokeWidth="12" />
                  </svg>

                  {/* Landmarks */}
                  <div className="absolute top-6 left-8 bg-[#ffffff] px-2.5 py-1 rounded shadow-sm text-[11px] text-[#727975] font-medium border border-[#eae8e5]">
                    압구정로데오역 3번출구
                  </div>
                  <div className="absolute bottom-6 right-8 bg-[#ffffff] px-2.5 py-1 rounded shadow-sm text-[11px] text-[#727975] font-medium border border-[#eae8e5]">
                    청담사거리 / 갤러리아
                  </div>

                  {/* Center Pin Marker */}
                  <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
                    <div className="bg-[#00110b] text-[#ffdea7] px-3 py-1.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-1.5 border border-[#ffdea7]/30">
                      <span className="w-2 h-2 rounded-full bg-[#ffdea7]" />
                      <span>더 노블 청담 피부과</span>
                    </div>
                    <div className="w-3 h-3 bg-[#00110b] rotate-45 -mt-1.5" />
                  </div>
                </div>
              </div>

              {/* Navigation App Links */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#efeeeb]">
                <span className="text-xs text-[#727975]">지도 앱 열기 (가상 주소라 검색 결과는 없습니다):</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://map.naver.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 min-h-11 rounded bg-[#f5f3f0] hover:bg-[#efeeeb] text-[#00110b] text-xs font-medium flex items-center gap-1 transition-colors border border-[#eae8e5]"
                  >
                    <span>네이버 지도</span>
                    <ExternalLink className="w-3 h-3 text-[#727975]" />
                  </a>
                  <a
                    href="https://map.kakao.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 min-h-11 rounded bg-[#f5f3f0] hover:bg-[#efeeeb] text-[#00110b] text-xs font-medium flex items-center gap-1 transition-colors border border-[#eae8e5]"
                  >
                    <span>카카오맵</span>
                    <ExternalLink className="w-3 h-3 text-[#727975]" />
                  </a>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 min-h-11 rounded bg-[#f5f3f0] hover:bg-[#efeeeb] text-[#00110b] text-xs font-medium flex items-center gap-1 transition-colors border border-[#eae8e5]"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#727975]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
