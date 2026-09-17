'use client';

import React from 'react';
import { STAY_MATERIALS } from '../data/stayData';
import { StayMaterial } from '../types';

interface MaterialTaleProps {
  onSelectMaterial: (material: StayMaterial) => void;
}

export const MaterialTale: React.FC<MaterialTaleProps> = ({ onSelectMaterial }) => {
  return (
    <section id="materials" className="py-24 bg-[#14161a] text-stone-200 relative overflow-hidden">
      {/* 배경 장식 텍스처 */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d8c29d_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-6 border-b border-stone-800">
          <div>
            <span className="text-amber-500/80 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
              TACTILE ARCHIVE · JEJU NATURE
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif font-light text-stone-100 tracking-tight">
              시간이 빚어낸 네 가지 물성
            </h2>
          </div>
          <p className="mt-4 lg:mt-0 text-sm text-stone-400 max-w-md font-light leading-relaxed">
            인위적인 치장을 덜어내고, 제주의 바람과 흙, 오랜 세월을 견딘 자연 소재 본연의 촉감과 향을 공간 속에 온전히 담았습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {STAY_MATERIALS.map((mat, idx) => (
            <div
              key={mat.id}
              onClick={() => onSelectMaterial(mat)}
              className="group cursor-pointer rounded-2xl bg-[#1b1e24]/70 border border-stone-800 hover:border-amber-600/50 p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/20 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                      style={{ backgroundColor: mat.colorHex }}
                    />
                    <span className="font-mono text-xs text-stone-500">0{idx + 1}</span>
                  </div>
                  <span className="text-xs font-mono text-stone-400 group-hover:text-amber-400 transition-colors">
                    상세보기 →
                  </span>
                </div>

                <h3 className="text-xl font-serif text-stone-100 group-hover:text-amber-200 transition-colors mb-1">
                  {mat.name}
                </h3>
                <p className="text-xs font-mono text-stone-500 mb-4 tracking-wider uppercase">
                  {mat.engName}
                </p>

                <p className="text-sm text-stone-300 font-light leading-relaxed mb-6 line-clamp-3">
                  {mat.textureDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80">
                <span className="text-[11px] font-mono text-stone-400 block mb-1">감각 노트 (Sensory)</span>
                <p className="text-xs text-amber-400/90 font-light italic line-clamp-2">
                  {mat.sensoryNote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
