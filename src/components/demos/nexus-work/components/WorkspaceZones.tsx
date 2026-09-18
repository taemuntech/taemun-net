'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WORKSPACE_ZONES } from '../data/workData';
import { WorkspaceZone } from '../types';

export const WorkspaceZones: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>('zone-collab');
  const [activeSpotIndex, setActiveSpotIndex] = useState<number | null>(null);

  const currentZone: WorkspaceZone =
    WORKSPACE_ZONES.find((z) => z.id === activeZoneId) || WORKSPACE_ZONES[0];

  return (
    <section id="zones" className="py-24 bg-[#0d0f15] text-zinc-100 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              WORKSPACE ZONING & INTERACTIVE TOUR
            </span>
            <h2 className="text-2xl lg:text-4xl font-bold text-white mt-2">
              업무 몰입도를 고려한 4대 특화 존
            </h2>
            <p className="text-zinc-400 text-sm mt-2 font-light">
              존을 선택하고 이미지 속 핀이나 아래 시공 포인트 목록을 눌러, 협업과 초집중을 넘나드는 시공 디테일을 확인해 보세요.
            </p>
          </div>

          {/* Zone Switcher */}
          <div className="flex items-center gap-1.5 mt-6 lg:mt-0 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 overflow-x-auto [scrollbar-width:none]">
            {WORKSPACE_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => {
                  setActiveZoneId(zone.id);
                  setActiveSpotIndex(null);
                }}
                aria-pressed={activeZoneId === zone.id}
                className={`inline-flex items-center justify-center min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all whitespace-nowrap ${
                  activeZoneId === zone.id
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-zinc-950 font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {zone.name.split(' & ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Spatial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual with Interactive Hotspots (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 group">
              <Image
                src={currentZone.imageUrl}
                alt={currentZone.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Hotspots */}
              {currentZone.hotspots.map((spot, idx) => {
                const isActive = activeSpotIndex === idx;
                // 말풍선이 이미지(overflow-hidden) 밖으로 잘리지 않도록 핀 좌표에 따라 정렬을 뒤집는다.
                const popoverX =
                  spot.x < 20 ? 'left-0' : spot.x > 78 ? 'right-0' : 'left-1/2 -translate-x-1/2';
                const popoverY = spot.y < 45 ? 'top-full mt-3' : 'bottom-full mb-3';
                return (
                  <div
                    key={idx}
                    className="absolute z-20"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    {/* 시각 원은 32px 그대로 두고, 버튼 자체를 44px 로 키워 탭 영역만 넓힌다 (-m-1.5 로 핀 위치 보정) */}
                    <button
                      onClick={() => setActiveSpotIndex(isActive ? null : idx)}
                      className="relative -m-1.5 flex items-center justify-center w-11 h-11 rounded-full"
                      aria-label={spot.title}
                      aria-expanded={isActive}
                    >
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                          isActive
                            ? 'bg-cyan-400 text-zinc-950 scale-125 ring-4 ring-cyan-400/40'
                            : 'bg-zinc-900/80 text-cyan-300 border border-cyan-400/60 hover:scale-110'
                        }`}
                      >
                        <span className="text-[11px] font-mono font-black">{idx + 1}</span>
                      </span>
                      <span className="absolute inset-0.5 rounded-full bg-cyan-400/20 animate-ping pointer-events-none" />
                    </button>

                    {/* Popover — 모바일(1023px 이하)에서는 이미지 높이가 낮아 잘리므로 아래 시공 포인트 목록이 대신 안내한다 */}
                    {isActive && (
                      <div className={`hidden lg:block absolute ${popoverX} ${popoverY} w-64 p-3.5 rounded-xl bg-zinc-950/95 border border-cyan-400/40 backdrop-blur-md shadow-2xl text-left z-30`}>
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                            TECH POINT #{idx + 1}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSpotIndex(null);
                            }}
                            className="text-zinc-400 hover:text-white text-xs -m-2 p-2"
                            aria-label="시공 포인트 설명 닫기"
                          >
                            ✕
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1">{spot.title}</h4>
                        <p className="text-[11px] text-zinc-300 leading-relaxed font-light">
                          {spot.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs text-zinc-300 font-mono">
                  {currentZone.acousticsGrade}
                </div>
                <div className="hidden lg:block text-[11px] text-zinc-400 bg-black/70 px-2.5 py-1 rounded-lg border border-white/10">
                  핀을 누르면 시공 공법이 안내됩니다
                </div>
              </div>
            </div>

            {/* Quick Hotspot Buttons */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              {currentZone.hotspots.map((spot, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSpotIndex(activeSpotIndex === idx ? null : idx)}
                  aria-pressed={activeSpotIndex === idx}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    activeSpotIndex === idx
                      ? 'bg-cyan-950/40 border-cyan-500 text-white'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-1.5 mb-1">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 shrink-0 leading-5">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold leading-5 text-zinc-200 [word-break:keep-all]">
                      {spot.title}
                    </span>
                  </div>
                  {/* 잘림 대신 줄바꿈 — 375·1440 양쪽에서 설명 전문이 보인다 */}
                  <p className="text-[10px] text-zinc-400 font-light leading-relaxed [word-break:keep-all]">
                    {spot.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Details Column (5 Cols) */}
          <div className="lg:col-span-5 bg-zinc-900/50 p-6 lg:p-8 rounded-2xl border border-zinc-800 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                {currentZone.subtitle}
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-white">
                {currentZone.name}
              </h3>
              <p className="text-xs font-mono text-zinc-500 mt-1 uppercase">
                {currentZone.engName}
              </p>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed font-light border-y border-zinc-800 py-4">
              {currentZone.description}
            </p>

            {/* Spatial Specs */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-black/40 p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-400 block mb-1">전용 구획 면적</span>
                <span className="text-zinc-200 font-bold">{currentZone.area}</span>
              </div>
              <div className="bg-black/40 p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-400 block mb-1">최대 수용 인원</span>
                <span className="text-zinc-200 font-bold">{currentZone.capacity}</span>
              </div>
            </div>

            {/* Features List */}
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-3">
                핵심 시공 스펙 & 설비
              </span>
              <div className="space-y-2">
                {currentZone.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-300 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
