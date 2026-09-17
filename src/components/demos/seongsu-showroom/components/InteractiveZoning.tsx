'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FLOOR_ZONES } from '../data/showroomData';
import { FloorZone } from '../types';

export const InteractiveZoning: React.FC = () => {
  const [activeFloorId, setActiveFloorId] = useState<string>('floor-1f');
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(null);

  const currentZone: FloorZone =
    FLOOR_ZONES.find((z) => z.id === activeFloorId) || FLOOR_ZONES[0];

  return (
    <section id="zoning" className="py-24 bg-[#0e0f12] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              INTERACTIVE ZONING EXPERIENCE
            </span>
            <h2 className="font-serif text-2xl lg:text-4xl font-normal text-stone-100 mt-2">
              층별 공간 조닝 & 건축 디테일 인터랙션
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              각 층의 탭을 선택하고, 이미지 속 원형 핫스팟을 클릭하여 숨겨진 시공 공법과 자재 디테일을 확인해 보세요.
            </p>
          </div>

          {/* Floor Switcher Buttons */}
          <div className="flex items-center gap-2 mt-6 lg:mt-0 bg-stone-900/80 p-1.5 rounded-sm border border-white/10">
            {FLOOR_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => {
                  setActiveFloorId(zone.id);
                  setActiveHotspotIndex(null);
                }}
                className={`px-5 py-2.5 rounded-sm text-xs font-mono font-bold tracking-wider transition-all ${
                  activeFloorId === zone.id
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {zone.floor} · {zone.name.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Visual with Hotspots (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-white/10 bg-stone-900 group">
              <Image
                src={currentZone.imageUrl}
                alt={currentZone.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Hotspot Pins */}
              {currentZone.hotspots.map((spot, idx) => {
                const isActive = activeHotspotIndex === idx;
                return (
                  <div
                    key={idx}
                    className="absolute z-20"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <button
                      onClick={() => setActiveHotspotIndex(isActive ? null : idx)}
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                        isActive
                          ? 'bg-amber-400 text-stone-950 scale-125 ring-4 ring-amber-400/40'
                          : 'bg-stone-900/80 text-amber-300 border border-amber-400/60 hover:scale-110'
                      }`}
                      aria-label={spot.title}
                    >
                      <span className="text-[11px] font-mono font-black">{idx + 1}</span>
                      <span className="absolute -inset-1 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />
                    </button>

                    {/* Active Hotspot Popover */}
                    {isActive && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 p-3 rounded bg-stone-950/95 border border-amber-400/40 backdrop-blur-md shadow-2xl text-left z-30 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between pb-1 border-b border-white/10 mb-1.5">
                          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                            POINT #{idx + 1}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspotIndex(null);
                            }}
                            className="text-stone-400 hover:text-white text-xs"
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

              {/* Bottom Overlay Label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-xs text-stone-300 font-mono">
                  {currentZone.concept}
                </div>
                <div className="text-[11px] text-stone-400 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                  핀 번호를 누르면 공법이 표시됩니다
                </div>
              </div>
            </div>

            {/* Quick Hotspot Bar */}
            <div className="grid grid-cols-3 gap-2">
              {currentZone.hotspots.map((spot, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHotspotIndex(idx)}
                  className={`p-2.5 rounded-sm border text-left transition-all ${
                    activeHotspotIndex === idx
                      ? 'bg-amber-500/15 border-amber-500/60 text-white'
                      : 'bg-stone-900/40 border-white/5 text-stone-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold truncate">{spot.title}</span>
                  </div>
                  <p className="text-[10px] text-stone-400 truncate">{spot.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Floor Details & Specs (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-900/50 p-6 lg:p-8 rounded-sm border border-white/10 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 text-xs font-black font-mono">
                  {currentZone.floor}
                </span>
                <span className="text-xs font-mono text-stone-400 tracking-wider">
                  {currentZone.subtitle}
                </span>
              </div>
              <h3 className="font-serif text-xl lg:text-2xl font-bold text-stone-100">
                {currentZone.name}
              </h3>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed font-light border-y border-white/5 py-4">
              {currentZone.description}
            </p>

            {/* Technical Specs List */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-black/40 p-3 rounded border border-white/5">
                <span className="text-stone-400 block mb-1">전용 면적</span>
                <span className="text-stone-200 font-bold">{currentZone.area}</span>
              </div>
              <div className="bg-black/40 p-3 rounded border border-white/5">
                <span className="text-stone-400 block mb-1">천장고 스펙</span>
                <span className="text-stone-200 font-bold">{currentZone.ceilingHeight}</span>
              </div>
              <div className="bg-black/40 p-3 rounded border border-white/5">
                <span className="text-stone-400 block mb-1">조명 색온도</span>
                <span className="text-stone-200 font-bold">{currentZone.lightingTemp}</span>
              </div>
              <div className="bg-black/40 p-3 rounded border border-white/5">
                <span className="text-stone-400 block mb-1">음향 차음 등급</span>
                <span className="text-stone-200 font-bold">{currentZone.acousticRating}</span>
              </div>
            </div>

            {/* Key Materials Tag Cloud */}
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block mb-2">
                적용 마감재 구성
              </span>
              <div className="flex flex-wrap gap-2">
                {currentZone.keyMaterials.map((mat, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-stone-800 text-stone-300 text-xs border border-white/10"
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
