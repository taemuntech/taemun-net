import React, { useState } from 'react';
import { INITIAL_SEATS, CARREL_SPECIFICATIONS } from '../data/mockData';
import { CarrelSeat } from '../types';
import { VolumeX, Wind, Armchair, Zap, Check, ShieldAlert } from 'lucide-react';

interface CarrelFloorplanProps {
  onSelectSeatForApplication: (seat: CarrelSeat) => void;
}

export const CarrelFloorplan: React.FC<CarrelFloorplanProps> = ({
  onSelectSeatForApplication,
}) => {
  const [seats, setSeats] = useState<CarrelSeat[]>(INITIAL_SEATS);
  const [selectedSeat, setSelectedSeat] = useState<CarrelSeat>(
    INITIAL_SEATS.find((s) => s.id === 'A-03') || INITIAL_SEATS[0]
  );

  const handleSeatClick = (seat: CarrelSeat) => {
    setSelectedSeat(seat);
  };

  const handleBookSelected = () => {
    onSelectSeatForApplication(selectedSeat);
  };

  return (
    <section
      id="carrel-floorplan"
      className="w-full px-4 lg:px-8 lg:px-12 xl:px-16 py-16 lg:py-20 bg-[#eff4ff]"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="font-label-sm text-xs text-[#45464d] uppercase tracking-widest">
              MODULE III // ACOUSTIC SANCTUARY
            </span>
            <span className="text-[#45464d]">◆</span>
            <span className="font-label-sm text-xs text-[#cf6721] font-semibold uppercase">
              ZERO LATENCY ISOLATION
            </span>
          </div>
          <h2 className="font-headline-lg text-3xl lg:text-4xl text-[#0d1c2f] uppercase tracking-tight font-bold">
            1-Person Soundproof Architectural Carrel
          </h2>
          <p className="font-body-md text-sm lg:text-base text-[#45464d] max-w-3xl leading-relaxed">
            외부 소음 고효율 감쇠 (예시)(48dB 감쇠), 펠티어 항온항습 무풍 공조, 에체고노믹 허먼밀러 에어로
            체어가 완비된 1인 고독립형 (예시) 집중 학습 터미널.
          </p>
        </div>

        {/* Real-Time Telemetry Bar */}
        <div className="p-3.5 lg:p-4 bg-[#ffffff] border border-[#0d1c2f]/10 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ba1a1a]"></span>
              </span>
              <span className="font-label-sm text-xs uppercase tracking-wider text-[#0d1c2f] font-bold">
                LIVE OCCUPANCY:
              </span>
              <span className="font-label-md text-xs lg:text-sm text-[#0d1c2f]">
                총 240석 중 214석 집중 학습 중 (가용 26석 // 점유율 89.2%)
              </span>
            </div>

            <span className="text-[#c6c6cd] hidden lg:inline">|</span>

            <div className="flex items-center gap-1.5">
              <VolumeX className="w-4 h-4 text-[#45464d]" />
              <span className="font-label-sm text-xs text-[#45464d]">
                내부 음압: 21.4 dB (완전 무음 구역)
              </span>
            </div>

            <span className="text-[#c6c6cd] hidden lg:inline">|</span>

            <div className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-[#45464d]" />
              <span className="font-label-sm text-xs text-[#45464d]">
                공기질: HEPA H14 필터 가동 중 (CO2 420ppm)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#dae2fd] border border-[#0d1c2f]/20 inline-block"></span>
              <span className="font-label-sm text-xs text-[#45464d]">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#ba1a1a] inline-block"></span>
              <span className="font-label-sm text-xs text-[#45464d]">Occupied</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#e5e2dc] border border-[#0d1c2f]/20 inline-block"></span>
              <span className="font-label-sm text-xs text-[#45464d]">Reserved</span>
            </div>
          </div>
        </div>

        {/* Main Interactive Blueprint & Specification Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left: 2D Architectural Blueprint Grid (7 cols) */}
          <div className="lg:col-span-7 bg-[#ffffff] p-4 lg:p-6 border border-[#0d1c2f]/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#0d1c2f]/10">
              <span className="font-label-md text-xs lg:text-sm uppercase tracking-wider text-[#0d1c2f] font-bold">
                SEOCHO FLOOR 4: JURIDICAL TACTICAL WING
              </span>
              <span className="font-label-sm text-xs text-[#45464d]">
                SCALE: 1:50 ARCH-SPEC
              </span>
            </div>

            {/* Interactive Floorplan Grid Container */}
            <div className="relative w-full bg-[#eff4ff] p-4 lg:p-5 border border-[#0d1c2f]/10 overflow-hidden">
              {/* Zone Division Labels */}
              <div className="grid grid-cols-3 gap-2 lg:gap-3 text-center mb-4">
                <div className="p-2 bg-[#e6eeff] border border-[#0d1c2f]/10 text-[#0d1c2f] font-label-sm text-[11px] lg:text-xs uppercase tracking-wider font-semibold">
                  ZONE A: SOLITARY
                </div>
                <div className="p-2 bg-[#e6eeff] border border-[#0d1c2f]/10 text-[#0d1c2f] font-label-sm text-[11px] lg:text-xs uppercase tracking-wider font-semibold">
                  ZONE B: ARCHIVE LAB
                </div>
                <div className="p-2 bg-[#e6eeff] border border-[#0d1c2f]/10 text-[#0d1c2f] font-label-sm text-[11px] lg:text-xs uppercase tracking-wider font-semibold">
                  ZONE C: CPA INTENSIVE
                </div>
              </div>

              {/* Seat Matrix Map Grid */}
              <div className="grid grid-cols-5 lg:grid-cols-10 gap-2 lg:gap-2.5 py-2">
                {seats.map((seat) => {
                  const isSelected = selectedSeat.id === seat.id;
                  let colorClasses = '';

                  if (seat.status === 'Available') {
                    colorClasses =
                      'bg-[#dae2fd] text-[#131b2e] border border-[#0d1c2f]/20 hover:border-[#0d1c2f] font-bold';
                  } else if (seat.status === 'Occupied') {
                    colorClasses = 'bg-[#ba1a1a] text-white font-medium hover:opacity-90';
                  } else {
                    colorClasses =
                      'bg-[#e5e2dc] text-[#656460] border border-[#0d1c2f]/15 cursor-not-allowed';
                  }

                  return (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      className={`h-11 lg:h-12 flex flex-col items-center justify-center font-label-sm text-xs cursor-pointer shadow-xs transition-all relative ${colorClasses} ${
                        isSelected
                          ? 'ring-2 ring-[#000000] ring-offset-2 scale-105 z-10'
                          : ''
                      }`}
                      title={`좌석 #${seat.id} (${seat.zoneName}) - ${seat.status}`}
                    >
                      <span className="leading-tight">{seat.seatNumber}</span>
                      <span className="text-[9px] opacity-75">
                        {seat.status === 'Available' ? '가용' : seat.status === 'Occupied' ? '재실' : '정비'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Floorplan Status Bar */}
              <div className="mt-4 p-3.5 bg-[#f8f9ff] border border-[#0d1c2f]/15 text-[#0d1c2f] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
                <div>
                  <span className="font-label-sm text-[11px] uppercase text-[#45464d] block">
                    SELECTED SEAT SPECIMEN:
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-label-md text-sm lg:text-base font-bold text-[#0d1c2f]">
                      Carrel #{selectedSeat.id} ({selectedSeat.zoneName})
                    </span>
                    {selectedSeat.noiseDb && (
                      <span className="text-xs font-label-sm text-[#45464d]">
                        [내부 음압: {selectedSeat.noiseDb} dB]
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-stretch lg:self-auto justify-between lg:justify-end">
                  <span
                    className={`font-label-sm text-xs px-2.5 py-1 font-semibold uppercase border ${
                      selectedSeat.status === 'Available'
                        ? 'bg-[#e6eeff] text-[#0d1c2f] border-[#0d1c2f]/20'
                        : selectedSeat.status === 'Occupied'
                        ? 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/30'
                        : 'bg-[#e5e2dc] text-[#656460] border-[#0d1c2f]/15'
                    }`}
                  >
                    {selectedSeat.status === 'Available'
                      ? '가용 (AVAILABLE FOR 2025 TERM)'
                      : selectedSeat.status === 'Occupied'
                      ? '학습 중 (CURRENTLY OCCUPIED)'
                      : '점검 및 정비 중 (MAINTENANCE)'}
                  </span>

                  {selectedSeat.status === 'Available' && (
                    <button
                      onClick={handleBookSelected}
                      className="px-3 py-1 bg-[#000000] text-white font-label-sm text-xs uppercase hover:bg-[#131b2e] transition-colors"
                    >
                      선택
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Carrel Spec Breakdown & Architectural Dossier (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-[#ffffff] p-5 lg:p-6 border border-[#0d1c2f]/10 shadow-xs space-y-3">
              <span className="font-label-sm text-xs uppercase tracking-widest text-[#cf6721] block font-semibold">
                ARCHITECTURAL SPECIFICATION
              </span>
              <h3 className="font-headline-md text-2xl text-[#0d1c2f] uppercase font-bold">
                The Monastic Pod™ Spec
              </h3>

              <ul className="space-y-3 pt-1 font-body-sm text-xs lg:text-sm text-[#0d1c2f]">
                {CARREL_SPECIFICATIONS.map((spec) => (
                  <li
                    key={spec.code}
                    className="p-3 bg-[#eff4ff] border border-[#0d1c2f]/10 leading-relaxed"
                  >
                    <span className="font-label-sm text-xs text-[#0d1c2f] font-bold uppercase block mb-0.5">
                      {spec.code} // {spec.title}
                    </span>
                    <p className="text-[#45464d]">{spec.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instant Carrel Booking Action Box */}
            <div className="p-5 lg:p-6 bg-[#000000] text-white shadow-md space-y-2">
              <div className="font-label-sm text-xs uppercase tracking-widest text-[#dae2fd]">
                CARREL ALLOCATION PRIVILEGE
              </div>
              <div className="font-title-lg text-lg lg:text-xl text-white font-bold">
                지정석 우선 배정 심사 등록
              </div>
              <p className="font-body-sm text-xs lg:text-sm text-[#dae2fd]/85 leading-relaxed">
                정규반 입실 승인 시 본인이 선택한 열람실 존(Zone) 및 좌석이 졸업 시까지 영구 고정 배정됩니다.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleBookSelected}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ffffff] text-[#0d1c2f] font-label-md text-xs lg:text-sm uppercase tracking-wider font-semibold hover:bg-[#e6eeff] transition-colors cursor-pointer"
                >
                  <Armchair className="w-4 h-4 text-[#cf6721]" />
                  <span>
                    Carrel #{selectedSeat.id} ({selectedSeat.zoneName}) 스크리닝 신청
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
