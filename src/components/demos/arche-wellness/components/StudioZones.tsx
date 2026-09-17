'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WELLNESS_ZONES } from '../data/wellnessData';

export const StudioZones: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>(WELLNESS_ZONES[0].id);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(null);

  const currentZone = WELLNESS_ZONES.find((z) => z.id === activeZoneId) || WELLNESS_ZONES[0];

  return (
    <section id="zones" className="py-24 bg-[#faf7f2] text-[#3d322a] border-t border-[#ebdcd0]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[#b8613d] font-mono text-xs tracking-widest uppercase block mb-2">
            SECTION 01 · WELLNESS SPATIAL ZONING
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-bold text-[#2d221b] mb-4">
            고객의 동선과 호흡을 배려한 3대 웰니스 공간
          </h2>
          <p className="text-sm lg:text-base text-[#6e5d50] font-light leading-relaxed">
            1:1 레슨의 깊은 집중을 돕는 독립 리포머 룸부터 운동 전후 온전한 이완을 주는 티 라운지,
            편백 향기 가득한 호텔식 프라이빗 파우더룸까지 섬세하게 설계했습니다.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#e5d5c7] pb-4">
          {WELLNESS_ZONES.map((zone) => {
            const isActive = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                onClick={() => {
                  setActiveZoneId(zone.id);
                  setActiveHotspotIndex(null);
                }}
                className={`px-5 py-3 rounded-lg font-medium text-xs lg:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#d27952] text-white font-bold shadow-md shadow-[#d27952]/20'
                    : 'bg-white hover:bg-[#f3ece2] text-[#5a483c] border border-[#e5d5c7]'
                }`}
              >
                {zone.name}
              </button>
            );
          })}
        </div>

        {/* Zone Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Image with Hotspots */}
          <div className="lg:col-span-8 relative aspect-16/10 rounded-2xl overflow-hidden border border-[#ebdcd0] bg-white shadow-xl group">
            <Image
              src={currentZone.imageUrl}
              alt={currentZone.name}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d221b]/70 via-transparent to-transparent" />

            {/* Hotspots */}
            {currentZone.hotspots.map((spot, idx) => {
              const isSelected = activeHotspotIndex === idx;
              return (
                <div
                  key={idx}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspotIndex(isSelected ? null : idx)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#d27952] text-white scale-125 ring-4 ring-[#d27952]/40 shadow-lg'
                        : 'bg-white/90 hover:bg-[#d27952] text-[#3d322a] hover:text-white border border-[#d27952]/60 shadow-md'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold">{idx + 1}</span>
                    <span className="absolute inset-0 rounded-full bg-[#d27952]/30 animate-ping" />
                  </button>

                  {/* Tooltip */}
                  {isSelected && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-60 p-3.5 rounded-xl bg-white/95 border border-[#d27952]/40 shadow-2xl backdrop-blur-md text-left z-30 pointer-events-none text-[#3d322a]">
                      <span className="text-[10px] font-mono text-[#b8613d] block mb-0.5">
                        HOTSPOT 0{idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-[#2d221b] mb-1">{spot.title}</h4>
                      <p className="text-[11px] text-[#5a483c] font-light leading-snug">
                        {spot.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Caption */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#ebdcd0] shadow-sm">
              <span className="text-[11px] font-mono text-[#b8613d] block mb-1">
                {currentZone.engName}
              </span>
              <p className="text-xs lg:text-sm text-[#3d322a] line-clamp-2">
                {currentZone.description}
              </p>
            </div>
          </div>

          {/* Zone Detail Info */}
          <div className="lg:col-span-4 p-6 lg:p-8 rounded-2xl bg-white border border-[#ebdcd0] shadow-lg">
            <span className="text-[11px] font-mono text-[#b8613d] block mb-1">ROOM DETAILS</span>
            <h3 className="text-xl lg:text-2xl font-bold text-[#2d221b] mb-2">{currentZone.name}</h3>
            <p className="text-xs text-[#8a7566] font-medium mb-6">{currentZone.subtitle}</p>

            <div className="space-y-4 mb-6">
              <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#ebdcd0]">
                <span className="text-[11px] font-mono text-[#8a7566] block mb-1">CAPACITY</span>
                <span className="text-sm font-semibold text-[#2d221b]">{currentZone.capacity}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#ebdcd0]">
                <span className="text-[11px] font-mono text-[#8a7566] block mb-1">
                  AIR QUALITY SPEC
                </span>
                <span className="text-sm font-semibold text-[#2d221b]">{currentZone.airSpec}</span>
              </div>
            </div>

            <span className="text-[11px] font-mono text-[#8a7566] block mb-3 uppercase">
              KEY ARCHITECTURAL ELEMENTS
            </span>
            <ul className="space-y-2.5">
              {currentZone.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-[#5a483c]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d27952] mt-1.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
