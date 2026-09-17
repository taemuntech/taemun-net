'use client';

import React from 'react';
import { STUDIO_GEAR } from '../data/vocalData';
import { StudioGear } from '../types';

export function StudioGearSection() {
  return (
    <section id="studio-gear" className="py-20 lg:py-28 bg-[#0F1117] border-t border-[#1F2430]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest block mb-2">
            PRO STUDIO ENVIRONMENT
          </span>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight">
            하이엔드 레코딩 &amp; 음향 모니터링 인프라
          </h2>
          <p className="text-xs lg:text-sm text-zinc-400 mt-2">
            글로벌 메이저 음반사에서 사용하는 동일 규격의 프로페셔널 아날로그 &amp; 디지털 장비를 운용합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {STUDIO_GEAR.map((gear: StudioGear, idx: number) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#141822] border border-[#232B3A] hover:border-pink-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-pink-400 tracking-wider uppercase block mb-2">
                  {gear.category}
                </span>
                <h3 className="text-base font-bold text-white mb-1">
                  {gear.model}
                </h3>
                <p className="text-xs text-zinc-500 mb-4">
                  {gear.brand}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {gear.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#202736] flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">스튜디오 완비</span>
                <span className="text-xs text-pink-400">● LIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
