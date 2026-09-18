'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { HANOK_ZONES } from '../data/teaData';

export const HanokZones: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>(HANOK_ZONES[0].id);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(null);

  const currentZone = HANOK_ZONES.find((z) => z.id === activeZoneId) || HANOK_ZONES[0];
  const activeHotspot =
    activeHotspotIndex === null ? null : currentZone.hotspots[activeHotspotIndex] ?? null;

  return (
    <section id="zones" className="py-24 bg-[#1f1915] text-[#f4ede2] border-t border-[#382f29]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[#cbb094] font-mono text-xs tracking-widest uppercase block mb-2">
            SECTION 01 · HANOK SPATIAL ZONING
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-bold text-white mb-4">
            차(茶)와 사람이 머무는 3대 한옥 공간
          </h2>
          <p className="text-sm lg:text-base text-[#a89888] font-light leading-relaxed break-keep">
            팽주와 마주하는 카운터 다도석부터 사계절 중정을 조망하는 툇마루 평상,
            단아한 팔각 소반이 놓인 온돌 프라이빗 다실까지 한국적 공간 미학을 구현했습니다.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#382f29] pb-4">
          {HANOK_ZONES.map((zone) => {
            const isActive = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => {
                  setActiveZoneId(zone.id);
                  setActiveHotspotIndex(null);
                }}
                aria-pressed={isActive}
                className={`inline-flex items-center justify-center min-h-11 px-5 py-3 rounded-lg font-medium text-xs lg:text-sm transition-all cursor-pointer break-keep ${
                  isActive
                    ? 'bg-[#6b5545] text-[#f4ede2] font-bold border border-[#8c715c] shadow-md'
                    : 'bg-[#261f1a] hover:bg-[#332a24] text-[#b3a190] border border-[#382f29]'
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
          <div className="lg:col-span-8 relative aspect-16/10 rounded-2xl overflow-hidden border border-[#382f29] bg-[#14110f] shadow-2xl group">
            <Image
              src={currentZone.imageUrl}
              alt={currentZone.name}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14110f]/80 via-transparent to-transparent" />

            {/* Hotspots */}
            {currentZone.hotspots.map((spot, idx) => {
              const isSelected = activeHotspotIndex === idx;
              // 사진은 overflow-hidden 이라 말풍선이 테두리를 넘으면 잘려서 안 보인다.
              // 핀이 위쪽에 있으면 아래로, 좌·우 끝에 붙어 있으면 그 변에 맞춰 띄운다.
              const tipVertical = spot.y >= 55 ? 'bottom-full mb-3' : 'top-full mt-3';
              const tipHorizontal =
                spot.x >= 70 ? 'right-0' : spot.x <= 30 ? 'left-0' : 'left-1/2 -translate-x-1/2';
              return (
                <div
                  key={idx}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    type="button"
                    onClick={() => setActiveHotspotIndex(isSelected ? null : idx)}
                    aria-pressed={isSelected}
                    aria-label={`핫스팟 ${idx + 1} — ${spot.title}`}
                    className="group/pin w-11 h-11 flex items-center justify-center cursor-pointer"
                  >
                    <span
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#d8b896] text-[#1f1915] scale-125 ring-4 ring-[#d8b896]/40 shadow-lg'
                          : 'bg-[#1f1915]/90 group-hover/pin:bg-[#d8b896] text-[#f4ede2] group-hover/pin:text-[#1f1915] border border-[#d8b896]/60 shadow-md'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold">{idx + 1}</span>
                      <span className="absolute inset-0 rounded-full bg-[#d8b896]/30 animate-ping" />
                    </span>
                  </button>

                  {/* Tooltip — 데스크톱(lg+)에서만. 좁은 화면에서는 사진 아래 설명 칸으로 내려간다 */}
                  {isSelected && (
                    <div
                      className={`hidden lg:block absolute ${tipVertical} ${tipHorizontal} w-60 p-3.5 rounded-xl bg-[#1c1714]/95 border border-[#6b5545] shadow-2xl backdrop-blur-md text-left z-30 pointer-events-none text-[#f4ede2] break-keep`}
                    >
                      <span className="text-[10px] font-mono text-[#d8b896] block mb-0.5">
                        HOTSPOT 0{idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-white mb-1">{spot.title}</h4>
                      <p className="text-[11px] text-[#c4b5a5] font-light leading-snug">
                        {spot.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Caption */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#1c1714]/90 backdrop-blur-md border border-[#382f29]">
              <span className="text-[11px] font-mono text-[#d8b896] block mb-1">
                {currentZone.engName}
              </span>
              <p className="text-xs lg:text-sm text-[#ddd2c5] line-clamp-2 break-keep">
                {currentZone.description}
              </p>
            </div>
          </div>

          {/* 좁은 화면(lg 미만) 핫스팟 설명 — 사진 안 말풍선은 테두리에 잘리므로 여기로 내린다 */}
          <div className="lg:hidden -mt-4">
            {activeHotspot ? (
              <div className="p-4 rounded-xl bg-[#1c1714] border border-[#6b5545] break-keep">
                <span className="text-[10px] font-mono text-[#d8b896] block mb-0.5">
                  HOTSPOT 0{(activeHotspotIndex ?? 0) + 1}
                </span>
                <h4 className="text-sm font-bold text-white mb-1">{activeHotspot.title}</h4>
                <p className="text-xs text-[#c4b5a5] font-light leading-snug">
                  {activeHotspot.desc}
                </p>
              </div>
            ) : (
              <p className="p-4 rounded-xl bg-[#1c1714] border border-[#382f29] text-xs text-[#8a7566] text-center break-keep">
                사진 위의 번호 핀을 누르면 그 지점의 설명이 여기에 나타납니다.
              </p>
            )}
          </div>

          {/* Zone Detail Info */}
          <div className="lg:col-span-4 p-6 lg:p-8 rounded-2xl bg-[#181310] border border-[#382f29] shadow-xl">
            <span className="text-[11px] font-mono text-[#cbb094] block mb-1">HANOK SPECIFICATION</span>
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 break-keep">
              {currentZone.name}
            </h3>
            <p className="text-xs text-[#b39274] font-medium mb-6 break-keep">
              {currentZone.subtitle}
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-3.5 rounded-xl bg-[#221c18] border border-[#382f29]">
                <span className="text-[11px] font-mono text-[#8a7566] block mb-1">SEATING CAPACITY</span>
                <span className="text-sm font-semibold text-[#f4ede2]">{currentZone.capacity}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#221c18] border border-[#382f29]">
                <span className="text-[11px] font-mono text-[#8a7566] block mb-1">TIMBER SPEC</span>
                <span className="text-sm font-semibold text-[#f4ede2]">{currentZone.timberSpec}</span>
              </div>
            </div>

            <span className="text-[11px] font-mono text-[#8a7566] block mb-3 uppercase">
              KEY ARCHITECTURAL ELEMENTS
            </span>
            <ul className="space-y-2.5">
              {currentZone.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-[#c4b5a5]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d8b896] mt-1.5 shrink-0" />
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
