'use client';

import React from 'react';
import Image from 'next/image';
import { SOUND_MATERIALS } from '../data/soundData';
import { SoundMaterial } from '../types';

interface MaterialArchiveProps {
  onSelectMaterial: (material: SoundMaterial) => void;
}

export const MaterialArchive: React.FC<MaterialArchiveProps> = ({ onSelectMaterial }) => {
  return (
    <section id="materials" className="scroll-mt-[calc(var(--sample-bar-h,0px)_+_80px)] py-24 bg-white border-b border-[#ebdcd0]/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono text-[#8c6544] tracking-widest uppercase block mb-2">
              ACOUSTIC MATERIAL ARCHIVE
            </span>
            <h2 className="font-serif text-2xl lg:text-4xl font-normal text-[#2e2319] tracking-tight mb-4">
              순수한 소리를 빚어내는 <br />
              <span className="italic font-light text-[#8c6544]">5대 하이파이 음향 건축 자재</span>
            </h2>
            <p className="text-xs lg:text-sm text-[#6b523e] font-light leading-relaxed [word-break:keep-all]">
              소리를 왜곡 없이 확산시키는 솔리드 화이트 오크 2D 디퓨저부터 천연 코르크 방진 패드, 
              재생 PET 흡음 펠트까지 오디오 룸의 물성 스펙을 확인해 보세요.
            </p>
          </div>

          <div className="lg:col-span-6 relative h-[260px] lg:h-[320px] rounded-3xl overflow-hidden shadow-md">
            <Image
              src="/portfolio/resonance-sound/resonance-05.jpg"
              alt="공명 하이파이 음향 건축 자재 아카이브"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Material Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SOUND_MATERIALS.map((mat) => (
            <button
              key={mat.id}
              type="button"
              onClick={() => onSelectMaterial(mat)}
              aria-label={`${mat.name} 음향 특성 보기`}
              className="w-full text-left p-6 rounded-3xl bg-[#faf6f0] border border-[#ebdcd0] hover:border-[#8c6544] focus-visible:border-[#8c6544] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6544] transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <span className="text-[10px] font-mono text-[#8c6544] tracking-widest uppercase block mb-2">
                {mat.category}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#2e2319] group-hover:text-[#8c6544] transition-colors mb-2">
                {mat.name}
              </h3>
              <p className="text-xs text-[#856b54] font-mono mb-4">{mat.engName}</p>
              <p className="text-xs text-[#6b523e] font-light leading-relaxed line-clamp-2 mb-4">
                {mat.description}
              </p>
              <div className="pt-3 border-t border-[#ebdcd0]/60 flex items-center justify-between text-[11px] text-[#856b54]">
                <span>음향 특성 보기</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
