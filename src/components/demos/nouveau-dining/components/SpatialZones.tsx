'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DINING_ZONES } from '../data/diningData';

export const SpatialZones: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>(DINING_ZONES[0].id);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(null);

  const currentZone = DINING_ZONES.find((z) => z.id === activeZoneId) || DINING_ZONES[0];

  return (
    <section id="zones" className="py-24 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-amber-400 font-mono text-xs tracking-widest uppercase block mb-2">
            SECTION 01 · SPATIAL ZONING
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-bold text-white mb-4">
            공간의 목적과 무드를 분리한 3대 조닝
          </h2>
          <p className="text-sm lg:text-base text-stone-400 font-light leading-relaxed">
            바쁜 오픈 키친의 에너지부터 온실 테라스의 여유, 독립 살롱의 정숙함까지
            F&B 공간의 매출과 만족도를 극대화하는 맞춤 조닝 아키텍처입니다.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-stone-800 pb-4">
          {DINING_ZONES.map((zone) => {
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
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300'
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
          <div className="lg:col-span-8 relative aspect-16/10 rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-2xl group">
            <Image
              src={currentZone.imageUrl}
              alt={currentZone.name}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30" />

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
                        ? 'bg-amber-400 text-stone-950 scale-125 ring-4 ring-amber-400/40 shadow-lg'
                        : 'bg-stone-900/80 hover:bg-amber-400 text-stone-100 hover:text-stone-950 border border-amber-400/60'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold">{idx + 1}</span>
                    <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping" />
                  </button>

                  {/* Tooltip */}
                  {isSelected && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-60 p-3 rounded-xl bg-stone-950/95 border border-amber-400/50 shadow-2xl backdrop-blur-md text-left z-30 pointer-events-none">
                      <span className="text-[10px] font-mono text-amber-300 block mb-0.5">
                        HOTSPOT 0{idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-white mb-1">{spot.title}</h4>
                      <p className="text-[11px] text-stone-300 font-light leading-snug">
                        {spot.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Caption inside Image */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-900/85 backdrop-blur-md border border-stone-800">
              <span className="text-[11px] font-mono text-amber-300 block mb-1">
                {currentZone.engName}
              </span>
              <p className="text-xs lg:text-sm text-stone-200 line-clamp-2">
                {currentZone.description}
              </p>
            </div>
          </div>

          {/* Zone Detail Info */}
          <div className="lg:col-span-4 p-6 lg:p-8 rounded-2xl bg-stone-950 border border-stone-800 shadow-xl">
            <span className="text-[11px] font-mono text-amber-400 block mb-1">ZONE OVERVIEW</span>
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">{currentZone.name}</h3>
            <p className="text-xs text-amber-200/80 font-medium mb-6">{currentZone.subtitle}</p>

            <div className="space-y-4 mb-6">
              <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[11px] font-mono text-stone-400 block mb-1">CAPACITY</span>
                <span className="text-sm font-semibold text-stone-200">
                  {currentZone.capacity}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[11px] font-mono text-stone-400 block mb-1">
                  LIGHTING SPEC
                </span>
                <span className="text-sm font-semibold text-stone-200">
                  {currentZone.lightingSpec}
                </span>
              </div>
            </div>

            <span className="text-[11px] font-mono text-stone-400 block mb-3 uppercase">
              KEY ARCHITECTURAL ELEMENTS
            </span>
            <ul className="space-y-2.5">
              {currentZone.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-stone-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
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
