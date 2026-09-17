import React, { useState } from 'react';
import Image from 'next/image';
import { Shield, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { STRATA_ZONES } from '../data/terraData';

export const StrataZones: React.FC = () => {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(0);

  const currentZone = STRATA_ZONES[activeZoneIndex];

  return (
    <section id="strata-zones" className="py-20 bg-[#0b0e14] text-white border-b border-[#30363d] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#ff6b2b]/15 text-[#ff6b2b] text-xs font-mono tracking-widest uppercase mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>4-SECTOR STRATA EXCAVATION TOUR</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-black font-mono tracking-tight text-white">
            4대 지층 특화 굴착 단면 쇼케이스
          </h2>
          <p className="text-xs lg:text-sm text-[#8b949e] font-sans mt-2">
            도심 연약지반 지하철 횡단부터 대심도 80m 암반 해저 침매터널까지,
            지층 조건별 무침하·초정밀 특수 토목 공법 현장 투어입니다.
          </p>
        </div>

        {/* 4 Strata Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8 font-mono text-xs">
          {STRATA_ZONES.map((zone, idx) => (
            <button
              key={zone.id}
              onClick={() => {
                setActiveZoneIndex(idx);
                setActiveHotspotIndex(0);
              }}
              className={`p-4 rounded-lg text-left transition-all border cursor-pointer ${
                activeZoneIndex === idx
                  ? 'bg-[#161b22] border-[#ff6b2b] text-white shadow-lg shadow-[#ff6b2b]/10'
                  : 'bg-[#0d1117] border-[#30363d] text-[#8b949e] hover:text-white hover:border-[#8b949e]'
              }`}
            >
              <div className="text-[10px] text-[#ff6b2b] font-bold mb-1">{zone.depth}</div>
              <div className="text-xs lg:text-sm font-bold truncate">{zone.koreanName}</div>
            </button>
          ))}
        </div>

        {/* Active Zone Interactive Visual & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Image Viewport with Hotspots (Left 7 Cols) */}
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-[#30363d] bg-[#161b22]">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={currentZone.image}
                alt={currentZone.koreanName}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/80 via-transparent to-transparent pointer-events-none" />

              {/* Hotspot Pins */}
              {currentZone.hotspots.map((spot, hIdx) => {
                const isSelected = activeHotspotIndex === hIdx;
                return (
                  <button
                    key={hIdx}
                    onClick={() => setActiveHotspotIndex(hIdx)}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 focus:outline-none"
                    aria-label={spot.title}
                  >
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isSelected ? 'bg-[#ff6b2b]' : 'bg-white'
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-7 w-7 items-center justify-center font-mono text-[11px] font-bold border-2 transition-transform shadow-lg ${
                          isSelected
                            ? 'bg-[#ff6b2b] text-black border-white scale-110'
                            : 'bg-[#0d1117]/90 text-white border-[#ff6b2b]'
                        }`}
                      >
                        0{hIdx + 1}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Hotspot Bottom Sheet / Card */}
            {activeHotspotIndex !== null && currentZone.hotspots[activeHotspotIndex] && (
              <div className="p-5 bg-[#161b22] border-t border-[#30363d] font-mono">
                <div className="flex items-center gap-2 text-[#ff6b2b] text-xs font-bold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>HOTSPOT 0{activeHotspotIndex + 1}: {currentZone.hotspots[activeHotspotIndex].title}</span>
                </div>
                <p className="text-xs font-sans text-[#c9d1d9] leading-relaxed">
                  {currentZone.hotspots[activeHotspotIndex].description}
                </p>
              </div>
            )}
          </div>

          {/* Strata Technical Data Sheet (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-5 font-mono">
            <div className="p-6 rounded-xl bg-[#161b22] border border-[#30363d]">
              <div className="text-xs text-[#ff6b2b] uppercase tracking-wider mb-1">
                {currentZone.strataName}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {currentZone.koreanName}
              </h3>
              <p className="text-xs font-sans text-[#8b949e] leading-relaxed mb-6">
                {currentZone.description}
              </p>

              <div className="space-y-3 border-t border-[#30363d] pt-4 text-xs">
                <div className="flex items-start justify-between">
                  <span className="text-[#8b949e]">지반 계측 규격</span>
                  <span className="text-white text-right font-bold">{currentZone.spec}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#8b949e]">구조 안전율</span>
                  <span className="text-emerald-400 text-right font-bold">{currentZone.safetyFactor}</span>
                </div>
              </div>
            </div>

            {/* Hotspots Quick Index List */}
            <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2 text-xs">
              <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block mb-2">
                SECTOR INSPECTION POINTS
              </span>
              {currentZone.hotspots.map((spot, hIdx) => (
                <button
                  key={hIdx}
                  onClick={() => setActiveHotspotIndex(hIdx)}
                  className={`w-full p-2.5 rounded text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeHotspotIndex === hIdx
                      ? 'bg-[#ff6b2b]/15 text-white border border-[#ff6b2b]/40'
                      : 'bg-[#0d1117] text-[#8b949e] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-bold text-[#ff6b2b]">0{hIdx + 1}.</span>
                    <span>{spot.title}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8b949e]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
