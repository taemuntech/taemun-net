'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CHAMBER_ZONES } from '../data/logisData';
import { ChamberZone } from '../types';

export default function ChamberDiagram() {
  const [activeZone, setActiveZone] = useState<ChamberZone>(CHAMBER_ZONES[0]);

  return (
    <section id="section-chamber" className="w-full bg-neutral-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
            MULTI-TEMPERATURE CHAMBER ENGINEERING
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            -25℃ 초저온부터 상온까지 멀티 챔버 공조 설계
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            신선식품, 바이오 의약품, 일반 소비재까지 다양한 화물의 최적 보관 조건을 구현하는 
            로지스파크만의 고기밀 단열 및 냉동 공조 엔지니어링 시스템입니다.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CHAMBER_ZONES.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 font-mono text-xs font-bold transition-all ${
                activeZone.id === zone.id
                  ? 'bg-cyan-500 text-neutral-950 shadow-lg shadow-cyan-500/25'
                  : 'border border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white'
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${
                zone.id === 'freezer' ? 'bg-blue-400 animate-pulse' : zone.id === 'chiller' ? 'bg-cyan-300' : 'bg-amber-400'
              }`} />
              <span>{zone.name.split(' (')[0]}</span>
              <span className="rounded bg-black/20 px-2 py-0.5 text-[11px] font-normal">
                {zone.tempRange}
              </span>
            </button>
          ))}
        </div>

        {/* Active Zone Detail Card */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image Area */}
            <div className="relative h-[320px] lg:col-span-6 lg:h-auto">
              <Image
                src={
                  activeZone.id === 'freezer'
                    ? '/portfolio/logis-park/logis-03.jpg'
                    : activeZone.id === 'chiller'
                    ? '/portfolio/logis-park/logis-01.jpg'
                    : '/portfolio/logis-park/logis-02.jpg'
                }
                alt={activeZone.name}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 rounded-lg border border-cyan-500/40 bg-neutral-950/80 px-3 py-1.5 backdrop-blur-md">
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {activeZone.tempRange}
                </span>
              </div>
            </div>

            {/* Info Area */}
            <div className="p-6 lg:col-span-6 lg:p-10 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-neutral-500">ZONE SPECIFICATION</span>
                <h3 className="mt-1 font-mono text-2xl font-bold text-white">
                  {activeZone.name}
                </h3>
                <p className="mt-4 text-xs leading-relaxed text-neutral-300">
                  {activeZone.description}
                </p>

                {/* Specs Box */}
                <div className="mt-8 space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 font-mono text-xs">
                  <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                    <span className="text-neutral-500">운영 보증 온도대</span>
                    <strong className="text-cyan-400 font-bold">{activeZone.tempRange}</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                    <span className="text-neutral-500">주요 보관 화물</span>
                    <span className="text-white text-right">{activeZone.targetItems}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-neutral-500">단열 &amp; 기밀 설계</span>
                    <span className="text-emerald-400 font-semibold text-right">{activeZone.insulationSpec}</span>
                  </div>
                </div>
              </div>

              {/* Engineering Point */}
              <div className="mt-8 pt-4 border-t border-neutral-800/80">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-300">
                  <span>❄️</span>
                  <span>단열 결로 및 바닥 동결 방지 특화 설계(예시)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
