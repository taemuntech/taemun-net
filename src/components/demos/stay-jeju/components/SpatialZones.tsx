'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { SPATIAL_ZONES } from '../data/stayData';
import { SpatialZone } from '../types';

export const SpatialZones: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>('zone-living');
  const [activeSpotIndex, setActiveSpotIndex] = useState<number | null>(null);

  const currentZone: SpatialZone =
    SPATIAL_ZONES.find((z) => z.id === activeZoneId) || SPATIAL_ZONES[0];

  const activeSpot =
    activeSpotIndex === null ? null : (currentZone.hotspots[activeSpotIndex] ?? null);

  return (
    <section id="zones" className="py-24 bg-[#111215] text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              SPATIAL ARCHITECTURE & INTERACTIVE TOURS
            </span>
            <h2 className="font-serif text-2xl lg:text-4xl font-normal text-stone-100 mt-2">
              안채와 노천탕, 세 가지 쉼의 공간
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              공간을 선택하고 이미지 속 핀을 클릭하여, 전통과 현대가 만나는 시공 디테일을 확인해 보세요.
            </p>
          </div>

          {/* Zone Switcher */}
          <div className="flex flex-wrap items-center gap-2 mt-6 lg:mt-0 bg-stone-900 p-1.5 rounded-sm border border-stone-800">
            {SPATIAL_ZONES.map((zone) => (
              <button
                key={zone.id}
                type="button"
                aria-pressed={activeZoneId === zone.id}
                onClick={() => {
                  setActiveZoneId(zone.id);
                  setActiveSpotIndex(null);
                }}
                className={`px-4 py-2.5 min-h-[44px] rounded-sm text-xs font-mono font-bold tracking-wider transition-all ${
                  activeZoneId === zone.id
                    ? 'bg-amber-600 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {zone.name.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Spatial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual with Interactive Hotspots (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-white/10 bg-stone-950 group">
              <Image
                src={currentZone.imageUrl}
                alt={currentZone.name}
                fill
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Hotspots */}
              {currentZone.hotspots.map((spot, idx) => {
                const isActive = activeSpotIndex === idx;
                // 말풍선은 이미지 상자가 overflow-hidden 이라 가장자리에서 그대로 잘린다.
                // 핀의 가로 위치에 따라 붙는 쪽을 바꿔 상자 안에 들어오게 한다.
                const anchorX =
                  spot.x >= 66
                    ? 'right-0 translate-x-0'
                    : spot.x <= 34
                      ? 'left-0 translate-x-0'
                      : 'left-1/2 -translate-x-1/2';
                // 위쪽 핀은 말풍선을 위로 띄우면 상자 천장에 잘린다 — 아래로 내려 단다.
                const anchorY = spot.y <= 40 ? 'top-full mt-3' : 'bottom-full mb-3';
                return (
                  <div
                    key={idx}
                    className="absolute z-20"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    {/* 탭 대상 44px — 눈에 보이는 핀은 32px 그대로 두고 눌리는 상자만 키웠다 */}
                    <button
                      onClick={() => setActiveSpotIndex(isActive ? null : idx)}
                      className="flex items-center justify-center w-11 h-11 -m-1.5 rounded-full"
                      aria-label={spot.title}
                      aria-expanded={isActive}
                    >
                      <span
                        className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                          isActive
                            ? 'bg-amber-400 text-stone-950 scale-125 ring-4 ring-amber-400/40'
                            : 'bg-stone-900/80 text-amber-300 border border-amber-400/60 hover:scale-110'
                        }`}
                      >
                        <span className="text-[11px] font-mono font-black">{idx + 1}</span>
                        <span className="absolute -inset-1 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />
                      </span>
                    </button>

                    {/* Popover — 데스크톱은 핀에 붙는다 */}
                    {isActive && (
                      <div
                        className={`hidden lg:block absolute ${anchorX} ${anchorY} w-64 p-3 rounded bg-stone-950/95 border border-amber-400/40 backdrop-blur-md shadow-2xl text-left z-30 animate-in fade-in zoom-in-95 duration-150`}
                      >
                        <div className="flex items-center justify-between pb-1 border-b border-white/10 mb-1.5">
                          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                            POINT #{idx + 1}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSpotIndex(null);
                            }}
                            aria-label="설명 닫기"
                            className="w-8 h-8 -m-1 flex items-center justify-center text-stone-400 hover:text-white text-xs"
                          >
                            ✕
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1">{spot.title}</h4>
                        <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                          {spot.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* 모바일·태블릿(lg 미만) — 이미지 상자가 낮아 핀에 붙이면 말풍선이 위아래로 잘린다.
                  상자 아래쪽에 고정해 항상 다 보이게 한다. */}
              {activeSpot && (
                <div className="lg:hidden absolute inset-x-3 bottom-3 z-30 p-3 rounded bg-stone-950/95 border border-amber-400/40 backdrop-blur-md shadow-2xl text-left animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <div className="flex items-center justify-between pb-1 border-b border-white/10 mb-1.5">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                      POINT #{(activeSpotIndex ?? 0) + 1}
                    </span>
                    <button
                      onClick={() => setActiveSpotIndex(null)}
                      aria-label="설명 닫기"
                      className="w-11 h-11 -m-2.5 flex items-center justify-center text-stone-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{activeSpot.title}</h4>
                  <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                    {activeSpot.desc}
                  </p>
                </div>
              )}

              <div
                className={`absolute bottom-4 left-4 right-4 items-center justify-between pointer-events-none ${
                  activeSpot ? 'hidden lg:flex' : 'flex'
                }`}
              >
                <div className="px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-xs text-stone-300 font-mono">
                  {currentZone.viewAngle}
                </div>
                <div className="text-[11px] text-stone-400 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                  핀을 누르면 시공 공법이 안내됩니다
                </div>
              </div>
            </div>

            {/* Quick Hotspot Buttons
                375px 에서 3열이면 한 칸이 약 105px 라 「통원목 티 테이블 & 다도구」가 들어가지 않는다.
                이 저장소의 lg 경계와 별개로, 글자가 잘리는 폭에서만 1열로 내린다(sm=640 이상부터 3열). */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentZone.hotspots.map((spot, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSpotIndex(idx)}
                  aria-pressed={activeSpotIndex === idx}
                  className={`p-2.5 min-h-[44px] rounded-sm border text-left transition-all ${
                    activeSpotIndex === idx
                      ? 'bg-amber-600/20 border-amber-500 text-white'
                      : 'bg-stone-900/40 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-start gap-1.5 mb-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400 pt-0.5">
                      #{idx + 1}
                    </span>
                    {/* truncate 는 말줄임으로 제목을 잘라 먹는다 — 두 줄까지 접어 보여 준다 */}
                    <span className="text-xs font-semibold line-clamp-2">{spot.title}</span>
                  </div>
                  <p className="text-[10px] text-stone-400 line-clamp-2">{spot.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Details Column (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-900/50 p-6 lg:p-8 rounded-sm border border-stone-800 space-y-6">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                {currentZone.subtitle}
              </span>
              <h3 className="font-serif text-xl lg:text-2xl font-bold text-stone-100">
                {currentZone.name}
              </h3>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed font-light border-y border-stone-800 py-4">
              {currentZone.description}
            </p>

            {/* Spatial Specs */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-black/40 p-3 rounded border border-stone-800">
                <span className="text-stone-400 block mb-1">공간 전용 면적</span>
                <span className="text-stone-200 font-bold">{currentZone.area}</span>
              </div>
              <div className="bg-black/40 p-3 rounded border border-stone-800">
                <span className="text-stone-400 block mb-1">천장고 구조</span>
                <span className="text-stone-200 font-bold">{currentZone.ceiling}</span>
              </div>
            </div>

            {/* Materials Cloud */}
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block mb-2">
                적용 자연 자재
              </span>
              <div className="flex flex-wrap gap-2">
                {currentZone.materials.map((mat, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-stone-800/80 text-stone-300 text-xs border border-stone-700"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
