'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SOUND_ZONES } from '../data/soundData';

export const SoundZones: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>('sweetspot');
  const currentZone = SOUND_ZONES.find((z) => z.id === activeZoneId) || SOUND_ZONES[0];

  return (
    <section id="zones" className="scroll-mt-[calc(var(--sample-bar-h,0px)_+_80px)] py-24 bg-white border-y border-[#ebdcd0]/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono text-[#8c6544] tracking-widest uppercase block mb-2">
            ACOUSTIC ARCHITECTURE ZONING
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-normal text-[#2e2319] tracking-tight mb-4">
            청음의 몰입을 극대화하는 <br />
            <span className="italic font-light text-[#8c6544]">3대 하이파이 특화 공간</span>
          </h2>
          <p className="text-xs lg:text-sm text-[#6b523e] font-light leading-relaxed">
            삼각 스윗스팟 리스닝 룸부터 3,500장 수납 화이트 오크 바이닐 월, 패브릭 흡음 홈 시네마까지 세부 사양을 확인해 보세요.
          </p>
        </div>

        {/* Zone Selector Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-10">
          {SOUND_ZONES.map((zone) => {
            const isActive = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveZoneId(zone.id)}
                className={`p-5 rounded-2xl text-left transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-[#faf6f0] border-[#8c6544] shadow-md ring-1 ring-[#8c6544]'
                    : 'bg-white border-[#ebdcd0] hover:bg-[#faf6f0]/60'
                }`}
              >
                <span className="text-[10px] font-mono tracking-widest text-[#856b54] block mb-1">
                  {zone.tag}
                </span>
                <h3 className="font-serif text-base font-bold text-[#2e2319] mb-1">
                  {zone.name}
                </h3>
                <p className="text-xs text-[#8c6544] font-mono">{zone.engName}</p>
              </button>
            );
          })}
        </div>

        {/* Active Zone Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#faf6f0] rounded-3xl p-6 lg:p-10 border border-[#ebdcd0]">
          {/* Image View */}
          <div className="lg:col-span-7 relative h-[320px] lg:h-[480px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={currentZone.image}
              alt={currentZone.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-all duration-500"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-mono text-[#5c422c] shadow">
              {currentZone.tag}
            </div>
          </div>

          {/* Details & Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono text-[#8c6544] uppercase tracking-widest block mb-1">
                ACOUSTIC BLUEPRINT
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#2e2319] mb-3">
                {currentZone.name}
              </h3>
              <p className="text-xs lg:text-sm text-[#6b523e] font-light leading-relaxed [word-break:keep-all]">
                {currentZone.description}
              </p>
            </div>

            {/* Spec List */}
            <div className="space-y-3 pt-4 border-t border-[#ebdcd0]">
              <span className="text-xs font-mono text-[#856b54] block">음향 건축 사양</span>
              {currentZone.acousticSpecs.map((spec, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#ebdcd0]/60 text-xs">
                  <span className="text-[#856b54] font-mono">{spec.label}</span>
                  <span className="font-medium text-[#2e2319]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
