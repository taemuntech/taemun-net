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
          <p className="text-sm lg:text-base text-stone-400 font-light leading-relaxed break-keep">
            바쁜 오픈 키친의 에너지부터 온실 테라스의 여유, 독립 살롱의 정숙함까지
            손님의 동선과 머무는 시간을 함께 고려한 맞춤 조닝 아키텍처입니다.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-stone-800 pb-4">
          {DINING_ZONES.map((zone) => {
            const isActive = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setActiveZoneId(zone.id);
                  setActiveHotspotIndex(null);
                }}
                className={`min-h-11 px-5 py-3 rounded-lg font-medium text-xs lg:text-sm transition-all cursor-pointer break-keep ${
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
          {/*
            Interactive Image with Hotspots.
            바깥을 relative 로 두고 캡션을 lg 에서만 사진 위에 얹는다 — 모바일(lg 미만)에서는 캡션 카드가
            사진 아래로 흘러간다. 얹어 두면 375 에서 캡션이 사진 아래쪽 절반을 덮어 핫스팟 핀 1·3 과
            캡션 글자가 서로 겹쳤다.
          */}
          <div className="lg:col-span-8 relative">
            <div className="relative aspect-16/10 rounded-2xl border border-stone-800 bg-stone-950 shadow-2xl group">
              {/* 사진·그라데이션만 잘라 낸다 — 핫스팟 말풍선까지 이 상자에 가두면 사진 밖으로 나가는 순간 잘린다 */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src={currentZone.imageUrl}
                  alt={currentZone.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30" />
              </div>

              {/* Hotspots */}
              {currentZone.hotspots.map((spot, idx) => {
                const isSelected = activeHotspotIndex === idx;
                // 말풍선 폭이 사진 폭의 절반을 넘어, 핀이 가장자리에 붙어 있으면 가운데 정렬로는 밖으로 나간다.
                // 그 변에 맞춰 붙이고, 핀이 위쪽이면 말풍선을 아래로 뒤집는다.
                const horizontal =
                  spot.x < 30
                    ? 'left-0'
                    : spot.x > 70
                      ? 'right-0'
                      : 'left-1/2 -translate-x-1/2';
                const vertical = spot.y < 50 ? 'top-full mt-3' : 'bottom-full mb-3';
                return (
                  <div
                    key={idx}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    {/* 보이는 원은 32px 그대로 두고, 손가락이 닿는 범위만 44px 로 넓힌다 */}
                    <button
                      type="button"
                      aria-label={`${spot.title} 설명 ${isSelected ? '닫기' : '보기'}`}
                      aria-expanded={isSelected}
                      onClick={() => setActiveHotspotIndex(isSelected ? null : idx)}
                      className="w-11 h-11 flex items-center justify-center cursor-pointer"
                    >
                      <span
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-stone-950 scale-125 ring-4 ring-amber-400/40 shadow-lg'
                            : 'bg-stone-900/80 hover:bg-amber-400 text-stone-100 hover:text-stone-950 border border-amber-400/60'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold">{idx + 1}</span>
                        <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping" />
                      </span>
                    </button>

                    {/* Tooltip */}
                    {isSelected && (
                      <div
                        className={`absolute ${horizontal} ${vertical} w-52 lg:w-60 p-3 rounded-xl bg-stone-950/95 border border-amber-400/50 shadow-2xl backdrop-blur-md text-left z-30 pointer-events-none break-keep`}
                      >
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
            </div>

            {/* Caption — 모바일은 사진 아래, lg 이상은 사진 위에 얹는다 */}
            <div className="mt-3 lg:mt-0 lg:absolute lg:bottom-4 lg:left-4 lg:right-4 p-4 rounded-xl bg-stone-900/85 backdrop-blur-md border border-stone-800">
              <span className="text-[11px] font-mono text-amber-300 block mb-1">
                {currentZone.engName}
              </span>
              <p className="text-xs lg:text-sm text-stone-200 line-clamp-3 lg:line-clamp-2 break-keep">
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
