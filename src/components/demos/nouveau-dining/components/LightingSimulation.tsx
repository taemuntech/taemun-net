'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LIGHTING_MODES } from '../data/diningData';

export const LightingSimulation: React.FC = () => {
  const [activeModeId, setActiveModeId] = useState<'daylight' | 'sunset' | 'midnight'>('daylight');

  const currentMode = LIGHTING_MODES.find((m) => m.id === activeModeId) || LIGHTING_MODES[0];

  return (
    <section id="lighting" className="py-24 bg-stone-950 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-amber-400 font-mono text-xs tracking-widest uppercase block mb-2">
            SECTION 02 · LIGHTING & AMBIENCE SIMULATOR
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-bold text-white mb-4">
            시간대에 따라 변화하는 3단계 조도 시뮬레이션
          </h2>
          <p className="text-sm lg:text-base text-stone-400 font-light leading-relaxed break-keep">
            F&B 공간의 분위기와 손님이 머무는 시간은 빛이 크게 좌우합니다.
            자연 채광 브런치부터 은은한 심야 캔들 다이닝까지 실시간 조명 설계를 시뮬레이션해 보세요.
          </p>
        </div>

        {/* Controller Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {LIGHTING_MODES.map((mode) => {
            const isSelected = mode.id === activeModeId;
            return (
              <button
                key={mode.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveModeId(mode.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer break-keep ${
                  isSelected
                    ? 'bg-stone-900 border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400'
                    : 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-amber-400 font-bold">{mode.timeRange}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                    {mode.lux} LUX
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">{mode.name}</h4>
                <p className="text-xs text-stone-400 font-light line-clamp-2">{mode.desc}</p>
              </button>
            );
          })}
        </div>

        {/*
          Visual Simulation Display Box.
          HUD 를 lg 미만에서 사진 위에 얹으면(375 기준 사진 높이 약 193px) HUD 가 사진을 거의 다 덮어,
          조명이 어떻게 바뀌는지가 보이지 않았다 — 모바일에서는 HUD 를 사진 아래로 내린다.
        */}
        <div className="relative">
          <div className="relative aspect-16/9 rounded-3xl overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl">
            {/* Base Image */}
            <Image
              src={
                activeModeId === 'daylight'
                  ? '/portfolio/nouveau-dining/nouveau-01.jpg'
                  : activeModeId === 'sunset'
                  ? '/portfolio/nouveau-dining/nouveau-03.jpg'
                  : '/portfolio/nouveau-dining/nouveau-02.jpg'
              }
              alt={currentMode.name}
              fill
              sizes="100vw"
              className="object-cover object-center transition-all duration-700"
            />

            {/* Dynamic Light Filter Overlay */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                activeModeId === 'daylight'
                  ? 'bg-amber-100/10'
                  : activeModeId === 'sunset'
                  ? 'bg-amber-700/25 mix-blend-multiply'
                  : 'bg-indigo-950/45 mix-blend-multiply'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-stone-950/20" />
          </div>

          {/* Telemetry HUD — 모바일은 사진 아래, lg 이상은 사진 위에 얹는다 */}
          <div className="mt-4 lg:mt-0 lg:absolute lg:bottom-6 lg:left-6 lg:right-6 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 p-5 lg:p-6 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-stone-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-mono text-amber-300 font-bold uppercase">
                  ACTIVE LIGHTING TELEMETRY
                </span>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white break-keep">{currentMode.name}</h3>
              <p className="text-xs text-stone-300 max-w-xl break-keep">{currentMode.desc}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] font-mono text-stone-400 block uppercase">
                  ILLUMINANCE
                </span>
                <span className="text-xl font-mono font-bold text-amber-300">
                  {currentMode.lux}{' '}
                  <span className="text-xs font-normal text-stone-400">Lux (예시)</span>
                </span>
              </div>
              <div className="w-px h-8 bg-stone-800" />
              <div className="text-right">
                <span className="text-[10px] font-mono text-stone-400 block uppercase">
                  COLOR TEMP
                </span>
                <span className="text-xl font-mono font-bold text-amber-300">
                  {currentMode.kelvin}{' '}
                  <span className="text-xs font-normal text-stone-400">Kelvin</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
