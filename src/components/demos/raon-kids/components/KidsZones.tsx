'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { KIDS_ZONES } from '../data/kidsData';

export const KidsZones: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>('water-clay');
  const currentZone = KIDS_ZONES.find((z) => z.id === activeZoneId) || KIDS_ZONES[0];

  return (
    <section id="zones" className="py-24 bg-white border-y border-[#ebdcd0]/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono text-[#c98330] tracking-widest uppercase block mb-2">
            CREATIVE PLAY & SAFETY ZONING
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-normal text-[#3b2e1e] tracking-tight mb-4">
            모서리가 없는 안전한 놀이터, <br />
            <span className="italic font-light text-[#c98330]">3대 창의 발달 특화 공간</span>
          </h2>
          <p className="text-xs lg:text-sm text-[#6e5840] font-light leading-relaxed">
            워터 앤 점토 촉각 아틀리에부터 대근육 놀이 파빌리온, 부모 전용 감성 살롱까지 공간별 특화 설계를 확인해 보세요.
          </p>
        </div>

        {/* Zone Selector Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-10">
          {KIDS_ZONES.map((zone) => {
            const isActive = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZoneId(zone.id)}
                className={`p-5 rounded-2xl text-left transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-[#fcf9f2] border-[#e39c44] shadow-md ring-1 ring-[#e39c44]'
                    : 'bg-white border-[#ebdcd0] hover:bg-[#fcf9f2]/60'
                }`}
              >
                <span className="text-[10px] font-mono tracking-widest text-[#8c7456] block mb-1">
                  {zone.tag}
                </span>
                <h3 className="font-serif text-base font-bold text-[#3b2e1e] mb-1">
                  {zone.name}
                </h3>
                <p className="text-xs text-[#c98330] font-mono">{zone.engName}</p>
              </button>
            );
          })}
        </div>

        {/* Active Zone Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#fcf9f2] rounded-3xl p-6 lg:p-10 border border-[#ebdcd0]">
          {/* Image View */}
          <div className="lg:col-span-7 relative h-[320px] lg:h-[480px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={currentZone.image}
              alt={currentZone.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-all duration-500"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-mono text-[#735824] shadow">
              {currentZone.tag}
            </div>
          </div>

          {/* Details & Safety Points */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono text-[#c98330] uppercase tracking-widest block mb-1">
                SAFETY ARCHITECTURE
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#3b2e1e] mb-3">
                {currentZone.name}
              </h3>
              <p className="text-xs lg:text-sm text-[#6e5840] font-light leading-relaxed [word-break:keep-all]">
                {currentZone.description}
              </p>
            </div>

            {/* Safety Points List */}
            <div className="space-y-3 pt-4 border-t border-[#ebdcd0]">
              <span className="text-xs font-mono text-[#8c7456] block">안심 설계 체크포인트</span>
              {currentZone.safetyPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1.5 text-xs text-[#3b2e1e]">
                  <span className="w-4 h-4 rounded-full bg-[#f5e6bb] text-[#735824] flex items-center justify-center text-[10px] font-bold shrink-0">
                    ✓
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
