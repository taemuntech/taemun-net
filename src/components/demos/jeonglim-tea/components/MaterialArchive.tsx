'use client';

import React from 'react';
import { HANOK_MATERIALS } from '../data/teaData';
import { HanokMaterial } from '../types';

interface MaterialArchiveProps {
  onSelectMaterial: (mat: HanokMaterial) => void;
}

export const MaterialArchive: React.FC<MaterialArchiveProps> = ({ onSelectMaterial }) => {
  return (
    <section id="materials" className="py-24 bg-[#1f1915] text-[#f4ede2] border-t border-[#382f29]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-[#cbb094] font-mono text-xs tracking-widest uppercase block mb-2">
            SECTION 03 · HERITAGE TIMBER & ARTISANAL MATERIALS
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-bold text-white mb-4">
            시간이 빚어낸 한국 전통 고재 자재
          </h2>
          <p className="text-sm lg:text-base text-[#a89888] font-light leading-relaxed">
            백 년을 견딘 소나무의 나이테부터 햇빛을 온화하게 걸러내는 닥나무 한지까지,
            세월의 깊이를 품어 묵직한 위로를 건네는 전통 자재 라이브러리를 소개합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {HANOK_MATERIALS.map((mat) => (
            <div
              key={mat.id}
              onClick={() => onSelectMaterial(mat)}
              className="p-6 rounded-2xl bg-[#181310] border border-[#382f29] hover:border-[#8c715c] transition-all hover:-translate-y-1 group cursor-pointer shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-8 h-8 rounded-lg border border-white/10 shadow-inner"
                    style={{ backgroundColor: mat.colorHex }}
                  />
                  <span className="text-[10px] font-mono text-[#d8b896] px-2 py-0.5 rounded bg-[#261f1a] border border-[#3d3127]">
                    결감 보기 ↗
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#d8b896] transition-colors mb-1">
                  {mat.name}
                </h3>
                <p className="text-xs font-mono text-[#8a7566] mb-3 uppercase">{mat.engName}</p>
                <p className="text-xs text-[#b8a796] font-light line-clamp-3 mb-4 leading-relaxed">
                  {mat.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#382f29]">
                <span className="text-[10px] font-mono text-[#8a7566] block mb-0.5">
                  CRAFT HERITAGE
                </span>
                <p className="text-xs text-[#cbb094] font-mono font-medium truncate">
                  {mat.craftHeritage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
