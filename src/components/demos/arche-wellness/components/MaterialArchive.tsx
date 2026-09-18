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
            카드를 누르면 자재별 마감 스펙을 볼 수 있습니다 — 규격과 인증 표기는 모두 예시입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {WELLNESS_MATERIALS.map((mat) => (
            // 예전에는 onClick 이 달린 <div> 라 키보드·보조기기로는 열 수 없었다 — 진짜 버튼으로 바꾼다.
            <button
              key={mat.id}
              type="button"
              onClick={() => onSelectMaterial(mat)}
              aria-label={`${mat.name} 자재 스펙 열기`}
              className="p-6 text-left rounded-2xl bg-white border border-[#ebdcd0] hover:border-[#d27952] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d27952] transition-all hover:-translate-y-1 group cursor-pointer shadow-md flex flex-col justify-between"
            >
              {/* <button> 안쪽은 phrasing content 만 둘 수 있어 div·h3·p 대신 block span 을 쓴다(stay-jeju 와 같은 방식). */}
              <span className="block">
                <span className="flex items-center justify-between mb-4">
                  <span
                    className="block w-8 h-8 rounded-full border border-black/10 shadow-inner"
                    style={{ backgroundColor: mat.colorHex }}
                  />
                  <span className="text-[10px] font-mono text-[#b8613d] px-2 py-0.5 rounded bg-[#f5efe6] border border-[#e5d5c7]">
                    스펙 확인 ↗
                  </span>
                </span>

                <span className="block text-lg font-bold text-[#2d221b] group-hover:text-[#d27952] transition-colors mb-1">
                  {mat.name}
                </span>
                <span className="block text-xs font-mono text-[#8a7566] mb-3 uppercase">
                  {mat.engName}
                </span>
                {/* line-clamp 유틸이 display 를 직접 잡는다 — block 과 같이 쓰면 둘이 싸우므로 붙이지 않는다. */}
                <span className="text-xs text-[#5a483c] font-light line-clamp-3 mb-4 leading-relaxed">
                  {mat.desc}
                </span>
              </span>

              <span className="block pt-4 border-t border-[#ebdcd0]">
                <span className="text-[10px] font-mono text-[#8a7566] block mb-0.5">
                  ECO-MATERIAL SPEC
                </span>
                <span className="block text-xs text-emerald-700 font-mono font-medium leading-snug">
                  {mat.ecoCert}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
