'use client';

import React from 'react';
import { ACOUSTIC_MATERIALS } from '../data/workData';
import { AcousticMaterial } from '../types';

interface AcousticMaterialsProps {
  onSelectMaterial: (material: AcousticMaterial) => void;
}

export const AcousticMaterials: React.FC<AcousticMaterialsProps> = ({ onSelectMaterial }) => {
  return (
    <section id="acoustics" className="py-24 bg-[#0e1017] text-zinc-200 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
              ACOUSTIC SPECIFICATION ARCHIVE
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
              소음을 지우는 4대 음향 마감재
            </h2>
          </div>
          <p className="mt-4 lg:mt-0 text-sm text-zinc-400 max-w-md font-light leading-relaxed">
            시각적 아름다움 뒤에 정밀한 음향 엔지니어링을 숨겼습니다. 잔향 시간을 제어하고 스피치 명료도를 높이는 엄선된 친환경 차음재를 적용합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {ACOUSTIC_MATERIALS.map((mat, idx) => (
            <div
              key={mat.id}
              className="group relative rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-cyan-500/50 p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/20 hover:-translate-y-1 focus-within:border-cyan-500/50"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                      style={{ backgroundColor: mat.colorHex }}
                    />
                    <span className="font-mono text-xs text-zinc-500">SPEC #0{idx + 1}</span>
                  </div>
                  {/* 카드 전체를 덮는 실제 버튼 — 키보드로도 열리고, ::after 로 카드 전면이 탭 영역이 된다 */}
                  <button
                    type="button"
                    onClick={() => onSelectMaterial(mat)}
                    className="-my-3 inline-flex min-h-[44px] items-center text-xs font-mono text-zinc-400 group-hover:text-cyan-300 transition-colors cursor-pointer after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                  >
                    <span className="sr-only">{mat.name} </span>스펙 보기 →
                  </button>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors mb-1">
                  {mat.name}
                </h3>
                <p className="text-xs font-mono text-zinc-500 mb-4 uppercase">
                  {mat.engName}
                </p>

                <div className="mb-4 inline-block px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-800/50 text-cyan-300 font-mono text-xs font-semibold">
                  {mat.nrcGrade}
                </div>

                <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6 line-clamp-3">
                  {mat.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <span className="text-[11px] font-mono text-zinc-400 block mb-1">친환경 규격 (예시 표기)</span>
                {/* truncate 금지 — 잘리면 「(예시)」 표기가 통째로 사라진다 */}
                <p className="text-xs text-emerald-400 font-mono font-medium leading-snug [word-break:keep-all]">
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
