'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { TIME_MOODS } from '../data/stayData';
import { TimeOfDay } from '../types';

export const TimeMoodController: React.FC = () => {
  const [activeMoodId, setActiveMoodId] = useState<TimeOfDay>('sunset');

  const currentMood = TIME_MOODS.find((m) => m.id === activeMoodId) || TIME_MOODS[1];

  return (
    <section id="timemood" className="py-24 bg-[#141518] text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            CHRONO-SPATIAL EXPERIENCE
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-normal text-stone-100 mt-2 mb-3">
            시간의 흐름에 따라 변화하는 제주의 빛
          </h2>
          <p className="text-stone-300 text-sm lg:text-base font-light leading-relaxed">
            소소재 제주는 단순히 밤에 잠을 자는 숙소가 아닙니다. 아침의 맑은 채광부터 붉은 노을, 별빛 가득한 밤까지, 시간의 결에 따라 조도와 그림자가 유기적으로 호흡하는 인터랙티브 라이팅을 설계했습니다.
          </p>
        </div>

        {/* Controller Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8 bg-stone-900/90 p-2 rounded-sm border border-stone-800">
          {TIME_MOODS.map((mood) => {
            const isActive = activeMoodId === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setActiveMoodId(mood.id)}
                aria-pressed={isActive}
                className={`flex-1 min-w-[140px] min-h-[44px] py-3.5 px-4 rounded-sm text-xs font-mono font-bold tracking-wider transition-all flex flex-wrap items-center justify-center gap-x-2 ${
                  isActive
                    ? 'bg-amber-600 text-stone-950 shadow-md scale-[1.01]'
                    : 'bg-stone-950/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>{mood.koreanName}</span>
                <span className="text-[10px] opacity-80 font-normal">({mood.timeRange})</span>
              </button>
            );
          })}
        </div>

        {/* Visual Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Frame (7 Cols) */}
          <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-white/10 bg-stone-950 shadow-2xl group">
            <Image
              src={currentMood.imageUrl}
              alt={currentMood.name}
              fill
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
            />
            {/* Ambient Lighting Overlay according to color temperature */}
            <div className={`absolute inset-0 bg-gradient-to-t ${currentMood.bgGradient} transition-opacity duration-700`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Top Left Lighting HUD Indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-stone-200">
              <span className="text-amber-400">색온도:</span>
              <span className="font-bold text-amber-300">{currentMood.colorTemp}</span>
            </div>

            {/* Top Right Sound Preset — 실제로 소리가 나지는 않는다. 「무엇을 틀 자리인지」 적어 둔 표기다. */}
            <div className="absolute top-4 right-4 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-stone-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>음향 프리셋: {currentMood.ambientSoundName}</span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[11px] font-mono text-amber-400/90 block mb-1">
                {currentMood.lightConcept}
              </span>
              <h3 className="font-serif text-xl lg:text-2xl font-bold text-white">
                {currentMood.koreanName} · {currentMood.name}
              </h3>
            </div>
          </div>

          {/* Details & Sensory Commentary (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-900/60 p-6 lg:p-8 rounded-sm border border-stone-800 space-y-6">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                TIME & SPACE COMMENTARY
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-100">
                {currentMood.name}
              </h3>
              <p className="text-xs text-stone-400 font-mono mt-0.5">
                표준 시각 {currentMood.timeRange}
              </p>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed font-light border-y border-stone-800 py-4">
              {currentMood.description}
            </p>

            {/* Quote block */}
            <div className="p-4 bg-amber-500/10 border-l-2 border-amber-500/80 rounded-r text-stone-200 text-xs italic leading-relaxed">
              {currentMood.quote}
            </div>

            {/* Spec Matrix */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-stone-400">
                <span>조도 제어 방식</span>
                <span className="text-stone-200">DALI 스마트 서커디언 디밍</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>자연 채광 연동</span>
                <span className="text-stone-200">일조 각도 기반 전동 차양 센서</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>공간 음향 차음</span>
                <span className="text-stone-200">자연음 보존 특수 방음벽 시공</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
