import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Destination, Villa, AddOnOption } from '../types';
import { DESTINATIONS, VILLAS, ADDONS } from '../data/resorts';

interface StayCalculatorProps {
  selectedDestination: Destination;
  onSelectDestination: (dest: Destination) => void;
  selectedVilla: Villa;
  onSelectVilla: (villa: Villa) => void;
  nights: number;
  onNightsChange: (nights: number) => void;
  selectedAddons: string[];
  onToggleAddon: (addonId: string) => void;
  onOpenBooking: () => void;
}

export const StayCalculator: React.FC<StayCalculatorProps> = ({
  selectedDestination,
  onSelectDestination,
  selectedVilla,
  onSelectVilla,
  nights,
  onNightsChange,
  selectedAddons,
  onToggleAddon,
  onOpenBooking,
}) => {
  // Calculate total addons cost
  const addonsTotal = ADDONS.filter((addon) => selectedAddons.includes(addon.id)).reduce(
    (sum, addon) => sum + addon.price,
    0
  );

  // Grand Total calculation: (base rate * nights * multiplier) + addons
  const baseRate = selectedVilla.pricePerNight;
  const stayCost = Math.round(baseRate * nights * selectedDestination.multiplier);
  const grandTotal = stayCost + addonsTotal;

  return (
    <section className="py-20 lg:py-24 bg-[#fcf9f3] border-y border-[#c6c7c0]/20" id="calculator">
      <div className="w-full px-6 lg:px-14 mx-auto max-w-7xl">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] text-[#725b38] uppercase tracking-[0.22em] font-medium block mb-2">
            Bespoke Curation Engine
          </span>
          <h2 className="font-editorial text-3xl lg:text-5xl text-[#030402] mb-4">
            프라이빗 스테이 &amp; 여정 시뮬레이터
          </h2>
          <p className="text-xs lg:text-sm text-[#454742] font-light leading-relaxed">
            목적지와 빌라 타입, VIP 큐레이션 옵션을 선택하여 투숙 여정을 사전에 맞춤 설계하십시오.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Control Panel */}
          <div className="lg:col-span-7 bg-[#f6f3ed] p-6 lg:p-10 rounded border border-[#c6c7c0]/30 space-y-8 shadow-sm">
            {/* 1. Destination */}
            <div>
              <label className="text-[11px] text-[#1c1c18] uppercase tracking-[0.22em] font-medium block mb-3">
                1. 희망 안식처 목적지 (Destination)
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5" id="destination-options">
                {DESTINATIONS.map((dest) => {
                  const isActive = selectedDestination.id === dest.id;
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => onSelectDestination(dest)}
                      className={`p-3 text-center border rounded text-[10px] uppercase tracking-[0.16em] font-semibold transition-all duration-200 ${ isActive ? 'border-[#030402] bg-[#030402] text-[#fcf9f3]' : 'border-[#c6c7c0]/40 bg-[#fcf9f3] text-[#1c1c18] hover:border-[#030402]' }`}
                    >
                      {dest.nameKo}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Villa Suite Type */}
            <div>
              <label className="text-[11px] text-[#1c1c18] uppercase tracking-[0.22em] font-medium block mb-3">
                2. 빌라 스위트 타입 (Villa Suite)
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {VILLAS.map((villa) => {
                  const isSelected = selectedVilla.id === villa.id;
                  return (
                    <label
                      key={villa.id}
                      onClick={() => onSelectVilla(villa)}
                      className={`cursor-pointer border p-4 rounded flex flex-col justify-between transition-all duration-200 ${ isSelected ? 'border-[#030402] bg-[#fcf9f3] ring-1 ring-[#030402]' : 'border-[#c6c7c0]/40 bg-[#fcf9f3] hover:border-[#030402]' }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs lg:text-sm font-medium text-[#030402]">
                          {villa.name}
                        </span>
                        <input
                          type="radio"
                          name="villa-choice"
                          checked={isSelected}
                          onChange={() => onSelectVilla(villa)}
                          className="accent-[#030402] text-[#030402] focus:ring-0"
                        />
                      </div>
                      <span className="text-[10px] text-[#767872]">
                        ₩{villa.pricePerNight.toLocaleString()} / 1박
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. Stay Duration Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] text-[#1c1c18] uppercase tracking-[0.22em] font-medium">
                  3. 투숙 기간 (Stay Duration)
                </label>
                <span className="font-editorial text-xl lg:text-2xl text-[#030402]" id="nights-display">
                  {nights}박 ({nights} Nights)
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="7"
                value={nights}
                onChange={(e) => onNightsChange(parseInt(e.target.value, 10))}
                className="w-full accent-[#030402] h-1.5 bg-[#c6c7c0]/50 rounded-lg cursor-pointer"
                id="nights-slider"
              />
              <div className="flex justify-between text-[#454742] text-[10px] mt-2 tracking-wider">
                <span>2박 (최소 체류)</span>
                <span>4박</span>
                <span>7박 (장기 리추얼)</span>
              </div>
            </div>

            {/* 4. Bespoke Add-ons */}
            <div>
              <label className="text-[11px] text-[#1c1c18] uppercase tracking-[0.22em] font-medium block mb-3">
                4. 비스포크 큐레이션 익스피리언스
              </label>
              <div className="space-y-3">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between p-3.5 bg-[#fcf9f3] border rounded cursor-pointer transition-colors duration-200 ${ isChecked ? 'border-[#725b38]' : 'border-[#c6c7c0]/30 hover:border-[#725b38]' }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleAddon(addon.id)}
                          className="rounded accent-[#030402] text-[#030402] focus:ring-0 w-4 h-4"
                        />
                        <span className="text-xs lg:text-sm text-[#030402] font-normal">
                          {addon.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#725b38] font-semibold shrink-0 ml-2">
                        + ₩{addon.price.toLocaleString()}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Dynamic Output Panel */}
          <div className="lg:col-span-5 bg-[#f0eee8] p-6 lg:p-10 rounded border border-[#c6c7c0]/40 shadow-sm flex flex-col justify-between sticky top-24">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-[#c6c7c0]/20 mb-6">
                <span className="text-[11px] text-[#725b38] uppercase tracking-[0.22em] font-semibold">
                  Bespoke Estimate
                </span>
                <span className="text-[9px] bg-[#030402] text-[#fcf9f3] px-2.5 py-1 rounded uppercase tracking-wider font-semibold">
                  예시 견적 (Sample)
                </span>
              </div>

              {/* Selected Narrative Summary */}
              <div className="space-y-3.5 mb-8 text-[#454742] text-xs lg:text-sm">
                <div className="flex justify-between">
                  <span className="text-[#767872]">선택 목적지</span>
                  <span className="text-[#030402] font-medium" id="summary-dest">
                    {selectedDestination.nameKo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#767872]">선택 빌라</span>
                  <span className="text-[#030402] font-medium" id="summary-villa">
                    {selectedVilla.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#767872]">체류 기간</span>
                  <span className="text-[#030402] font-medium" id="summary-nights">
                    {nights}박 ({nights} Nights)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#767872]">포함된 큐레이션</span>
                  <span className="text-[#030402] font-medium" id="summary-addons-count">
                    {selectedAddons.length}개 프로그램
                  </span>
                </div>
              </div>

              {/* VIP Privilege Inclusion Card */}
              <div className="bg-[#fcf9f3] p-4 rounded border border-[#c6c7c0]/30 mb-8 space-y-2">
                <div className="flex items-center gap-2 text-[#030402] text-xs lg:text-sm font-medium">
                  <ShieldCheck className="w-5 h-5 text-[#725b38] shrink-0" />
                  <span>1:1 전담 수석 버틀러 24시간 배정</span>
                </div>
                <p className="text-xs text-[#454742] font-light leading-relaxed">
                  웰컴 빈티지 샴페인, 에스테이트 전용 턴다운 아로마 리추얼, 프라이빗 셰프의 아침 수제 조식 카트가 기본 제공됩니다. (예시 구성)
                </p>
              </div>
            </div>

            {/* Grand Total & Direct Trigger */}
            <div className="pt-6 border-t border-[#c6c7c0]/30">
              <span className="text-[10px] text-[#767872] uppercase tracking-[0.2em] font-medium block mb-1">
                총 예상 숙박 및 큐레이션 금액 (예시 요금)
              </span>
              <div className="flex items-baseline gap-2 mb-6 flex-wrap">
                <span className="font-editorial text-3xl lg:text-5xl text-[#030402] font-normal" id="grand-total">
                  ₩{grandTotal.toLocaleString()}
                </span>
                <span className="text-[#767872] text-[10px] uppercase tracking-wider">
                  KRW (V.A.T 포함)
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenBooking}
                id="btn-confirm-estimate"
                className="w-full bg-[#1c1e1a] text-[#fcf9f3] py-4 rounded text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#31312d] transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>견적 확인 및 프라이빗 버틀러 예약 상담 신청</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
