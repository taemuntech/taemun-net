'use client';

import React from 'react';
import { DINING_MATERIALS } from '../data/diningData';
import { DiningMaterial } from '../types';

interface MaterialArchiveProps {
  onSelectMaterial: (mat: DiningMaterial) => void;
}

export const MaterialArchive: React.FC<MaterialArchiveProps> = ({ onSelectMaterial }) => {
  return (
    <section id="materials" className="py-24 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-amber-400 font-mono text-xs tracking-widest uppercase block mb-2">
            SECTION 03 · MATERIAL & TACTILE LIBRARY
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-bold text-white mb-4">
            손끝에 닿는 감각, F&B 프리미엄 마감재
          </h2>
          <p className="text-sm lg:text-base text-stone-400 font-light leading-relaxed">
            미식의 품격은 음식뿐 아니라 고객이 닿는 식탁, 바 카운터, 패브릭의 물성에서 완성됩니다.
            오랜 시간 검증된 내구성과 촉각적 만족감을 주는 4대 핵심 마감재를 소개합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {DINING_MATERIALS.map((mat) => (
            <div
              key={mat.id}
              onClick={() => onSelectMaterial(mat)}
              className="p-6 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-400/60 transition-all hover:-translate-y-1 group cursor-pointer shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-8 h-8 rounded-full border border-stone-700 shadow-inner"
                    style={{ backgroundColor: mat.colorHex }}
                  />
                  <span className="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
                    상세보기 ↗
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
                  {mat.name}
                </h3>
                <p className="text-xs font-mono text-stone-400 mb-3 uppercase">{mat.engName}</p>
                <p className="text-xs text-stone-300 font-light line-clamp-3 mb-4 leading-relaxed">
                  {mat.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 block mb-0.5">
                  SPECIFICATION
                </span>
                <p className="text-xs text-amber-200/90 font-mono truncate">{mat.spec}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
