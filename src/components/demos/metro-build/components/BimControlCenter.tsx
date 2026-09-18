'use client';

import React from 'react';
import Image from 'next/image';
import { BIM_FEATURES } from '../data/metroData';

export default function BimControlCenter() {
  return (
    <section id="section-bim" className="w-full bg-slate-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-widest">
            DIGITAL TWIN &amp; SMART CONSTRUCTION
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            스마트 BIM 4D 통합 관제 시스템
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            착공 전 3D 가상 시뮬레이션부터 드론·계측 센서 기반 현장 정밀 공정 관제까지(예시).
            메트로종합건설만의 디지털 트윈 관제로 설계 오류를 방지하고 완벽한 공기 준수를 추구합니다.
          </p>
        </div>

        {/* Command Center Showcase Graphic */}
        <div className="relative mt-12 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl">
          <div className="relative h-[320px] w-full lg:h-[460px]">
            <Image
              src="/portfolio/metro-build/metro-04.jpg"
              alt="메트로종합건설 스마트 BIM 4D 통합 관제센터"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            {/* Live Status HUD Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-3 rounded-lg border border-blue-500/40 bg-slate-950/80 px-4 py-2 backdrop-blur-md">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs font-bold text-white">
                BIM 4D LIVE OPERATIONS ACTIVE
              </span>
              <span className="font-mono text-[10px] text-slate-400">(관제 화면 예시)</span>
            </div>
          </div>

          {/* Three Feature Cards Grid */}
          <div className="grid grid-cols-1 gap-6 border-t border-slate-800 bg-slate-950/90 p-6 lg:grid-cols-3 lg:p-8">
            {BIM_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-blue-500/40"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-blue-500/20 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-blue-300">
                    {feature.badge}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-emerald-400">
                    {feature.metrics}
                  </span>
                </div>
                <h3 className="mt-3 font-mono text-base font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
