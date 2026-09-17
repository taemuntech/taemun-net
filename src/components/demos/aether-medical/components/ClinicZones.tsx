'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CLINIC_ZONES } from '../data/medicalData';

export const ClinicZones: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>('suite');
  const currentZone = CLINIC_ZONES.find((z) => z.id === activeZoneId) || CLINIC_ZONES[0];

  return (
    <section id="zones" className="py-24 bg-white border-y border-[#ebdcd0]/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono text-[#a38068] tracking-widest uppercase block mb-2">
            ARCHITECTURAL SPATIAL ZONING
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-normal text-[#2d241e] tracking-tight mb-4">
            환자의 불안을 치유하는 <br />
            <span className="italic font-light text-[#7a6252]">3대 VIP 프라이빗 공간 설계</span>
          </h2>
          <p className="text-xs lg:text-sm text-[#6e5849] font-light leading-relaxed">
            원내 동선이 겹치지 않는 독립 1인 스위트와 호텔식 파우더 룸을 직접 선택하여 공간 디테일을 살펴보실 수 있습니다.
          </p>
        </div>

        {/* Zone Selector Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-10">
          {CLINIC_ZONES.map((zone) => {
            const isActive = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZoneId(zone.id)}
                className={`p-5 rounded-2xl text-left transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-[#faf7f2] border-[#a38068] shadow-md ring-1 ring-[#a38068]'
                    : 'bg-white border-[#ebdcd0] hover:bg-[#faf7f2]/60'
                }`}
              >
                <span className="text-[10px] font-mono tracking-widest text-[#9c8473] block mb-1">
                  {zone.tag}
                </span>
                <h3 className="font-serif text-base font-bold text-[#2d241e] mb-1">
                  {zone.name}
                </h3>
                <p className="text-xs text-[#7a6252] font-mono">{zone.engName}</p>
              </button>
            );
          })}
        </div>

        {/* Active Zone Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#faf7f2] rounded-3xl p-6 lg:p-10 border border-[#ebdcd0]">
          {/* Image View */}
          <div className="lg:col-span-7 relative h-[320px] lg:h-[480px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={currentZone.image}
              alt={currentZone.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-all duration-500"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-mono text-[#524135] shadow">
              {currentZone.tag}
            </div>
          </div>

          {/* Details & Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono text-[#a38068] uppercase tracking-widest block mb-1">
                ZONE SPECIFICATIONS
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#2d241e] mb-3">
                {currentZone.name}
              </h3>
              <p className="text-xs lg:text-sm text-[#6e5849] font-light leading-relaxed [word-break:keep-all]">
                {currentZone.description}
              </p>
            </div>

            {/* Spec List */}
            <div className="space-y-3 pt-4 border-t border-[#ebdcd0]">
              {currentZone.specs.map((spec, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#ebdcd0]/50 text-xs">
                  <span className="text-[#9c8473] font-mono">{spec.label}</span>
                  <span className="font-medium text-[#2d241e]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
