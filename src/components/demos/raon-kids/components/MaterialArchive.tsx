'use client';

import React from 'react';
import Image from 'next/image';
import { KIDS_MATERIALS } from '../data/kidsData';
import { KidsMaterial } from '../types';

interface MaterialArchiveProps {
  onSelectMaterial: (material: KidsMaterial) => void;
}

export const MaterialArchive: React.FC<MaterialArchiveProps> = ({ onSelectMaterial }) => {
  return (
    <section id="materials" className="py-24 bg-white border-b border-[#ebdcd0]/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono text-[#c98330] tracking-widest uppercase block mb-2">
              NATURAL TACTILE ARCHIVE
            </span>
            <h2 className="font-serif text-2xl lg:text-4xl font-normal text-[#3b2e1e] tracking-tight mb-4">
              손끝으로 느끼는 자연, <br />
              <span className="italic font-light text-[#c98330]">5대 친환경 키즈 건축 마감재</span>
            </h2>
            <p className="text-xs lg:text-sm text-[#6e5840] font-light leading-relaxed [word-break:keep-all]">
              핀란드산 E0 무절 자작나무부터 포르투갈 천연 코르크, 천연 점토 테라코타까지 
              아이가 피부로 맞닿는 모든 표면의 유기농 마감 기준을 확인해 보세요.
            </p>
          </div>

          <div className="lg:col-span-6 relative h-[260px] lg:h-[320px] rounded-3xl overflow-hidden shadow-md">
            <Image
              src="/portfolio/raon-kids/raon-05.jpg"
              alt="라온 키즈 친환경 건축 자재 아카이브"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Material Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {KIDS_MATERIALS.map((mat) => (
            <div
              key={mat.id}
              onClick={() => onSelectMaterial(mat)}
              className="p-6 rounded-3xl bg-[#fcf9f2] border border-[#ebdcd0] hover:border-[#e39c44] transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <span className="text-[10px] font-mono text-[#c98330] tracking-widest uppercase block mb-2">
                {mat.category}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#3b2e1e] group-hover:text-[#c98330] transition-colors mb-2">
                {mat.name}
              </h3>
              <p className="text-xs text-[#8c7456] font-mono mb-4">{mat.engName}</p>
              <p className="text-xs text-[#6e5840] font-light leading-relaxed line-clamp-2 mb-4">
                {mat.description}
              </p>
              <div className="pt-3 border-t border-[#ebdcd0]/60 flex items-center justify-between text-[11px] text-[#8c7456]">
                <span>친환경 스펙 보기</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
