'use client';
import React from 'react';
import { MATERIALS } from '../data/showroomData';
import { MaterialItem } from '../types';

interface MaterialArchiveProps {
  onSelectMaterial: (material: MaterialItem) => void;
}

export const MaterialArchive: React.FC<MaterialArchiveProps> = ({ onSelectMaterial }) => {
  return (
    <section id="materials" className="py-24 bg-[#121316] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              TACTILE MATERIAL SPEC ARCHIVE
            </span>
            <h2 className="font-serif text-2xl lg:text-4xl font-normal text-stone-100 mt-2">
              엄선된 5대 하이엔드 건축·인테리어 물성
            </h2>
            <p className="text-stone-400 text-sm mt-2 max-w-2xl">
              스튜디오가 직접 감리하고 시공에 투입하는 대표 자재들의 물성과 특성입니다. 카드를 클릭하면 상세 시공 가이드와 조명 페어링 정보를 확인하실 수 있습니다.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 text-right">
            <span className="text-xs font-mono text-stone-400">자재 클릭 시 상세 스펙 시트 열람 가능</span>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {MATERIALS.map((mat) => (
            <button
              key={mat.id}
              type="button"
              onClick={() => onSelectMaterial(mat)}
              aria-label={`${mat.name} 스펙 시트 보기`}
              className="group text-left w-full cursor-pointer rounded-sm bg-stone-900/60 border border-white/10 hover:border-amber-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 transition-all duration-300 p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div>
                {/* Color/Texture Swatch Preview */}
                <div
                  className="w-full h-28 rounded-sm mb-5 relative overflow-hidden border border-white/10 flex items-end p-3 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: mat.colorHex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="relative z-10 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-sm border border-white/10">
                    {mat.category}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <h3 className="font-serif text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {mat.name}
                  </h3>
                  <p className="text-[11px] font-mono text-stone-400 break-words">
                    {mat.engName}
                  </p>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed line-clamp-3 mb-4 font-light">
                  {mat.textureDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="text-[11px] text-stone-400">
                  <span className="font-mono text-amber-400/80 block">권장 용도</span>
                  <span className="block text-stone-300 leading-relaxed [word-break:keep-all]">{mat.recommendedUse}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 pt-1 group-hover:underline">
                  <span>스펙 시트 보기</span>
                  <span>→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
