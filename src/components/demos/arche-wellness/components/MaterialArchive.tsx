'use client';

import React from 'react';
import { WELLNESS_MATERIALS } from '../data/wellnessData';
import { WellnessMaterial } from '../types';

interface MaterialArchiveProps {
  onSelectMaterial: (mat: WellnessMaterial) => void;
}

export const MaterialArchive: React.FC<MaterialArchiveProps> = ({ onSelectMaterial }) => {
  return (
    <section id="materials" className="py-24 bg-[#faf7f2] text-[#3d322a] border-t border-[#ebdcd0]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-[#b8613d] font-mono text-xs tracking-widest uppercase block mb-2">
            SECTION 03 · ORGANIC & ECO-SUSTAINABLE MATERIALS
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-bold text-[#2d221b] mb-4">
            몸에 닿는 순수 천연 마감재 라이브러리
          </h2>
          <p className="text-sm lg:text-base text-[#6e5d50] font-light leading-relaxed">
            인공 화학 본드와 유해 페인트를 배제하고 흙, 나무, 돌, 린넨 본연의 물성만을 담았습니다.
            스튜디오에 머무는 것만으로도 호흡이 편안해지는 친환경 마감 스펙을 확인해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {WELLNESS_MATERIALS.map((mat) => (
            <div
              key={mat.id}
              onClick={() => onSelectMaterial(mat)}
              className="p-6 rounded-2xl bg-white border border-[#ebdcd0] hover:border-[#d27952] transition-all hover:-translate-y-1 group cursor-pointer shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-8 h-8 rounded-full border border-black/10 shadow-inner"
                    style={{ backgroundColor: mat.colorHex }}
                  />
                  <span className="text-[10px] font-mono text-[#b8613d] px-2 py-0.5 rounded bg-[#f5efe6] border border-[#e5d5c7]">
                    스펙 확인 ↗
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#2d221b] group-hover:text-[#d27952] transition-colors mb-1">
                  {mat.name}
                </h3>
                <p className="text-xs font-mono text-[#8a7566] mb-3 uppercase">{mat.engName}</p>
                <p className="text-xs text-[#5a483c] font-light line-clamp-3 mb-4 leading-relaxed">
                  {mat.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#ebdcd0]">
                <span className="text-[10px] font-mono text-[#8a7566] block mb-0.5">
                  ECO-CERTIFICATION
                </span>
                <p className="text-xs text-emerald-700 font-mono font-medium truncate">
                  {mat.ecoCert}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
