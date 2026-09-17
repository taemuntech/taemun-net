'use client';

import React from 'react';
import Image from 'next/image';
import { MEDICAL_MATERIALS } from '../data/medicalData';
import { MedicalMaterial } from '../types';

interface MaterialArchiveProps {
  onSelectMaterial: (material: MedicalMaterial) => void;
}

export const MaterialArchive: React.FC<MaterialArchiveProps> = ({ onSelectMaterial }) => {
  return (
    <section id="materials" className="py-24 bg-white border-b border-[#ebdcd0]/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono text-[#a38068] tracking-widest uppercase block mb-2">
              TACTILE MATERIAL ARCHIVE
            </span>
            <h2 className="font-serif text-2xl lg:text-4xl font-normal text-[#2d241e] tracking-tight mb-4">
              의료 환경의 위생과 <br />
              <span className="italic font-light text-[#7a6252]">자연 물성의 감성적 결합</span>
            </h2>
            <p className="text-xs lg:text-sm text-[#6e5849] font-light leading-relaxed [word-break:keep-all]">
              화학 페인트를 배제한 천연 규조토 미장 회벽, 2,000년 세월의 로만 트래버틴, 
              항균 처리된 친환경 마감재로 완성하는 청담 메디컬 인테리어의 물성을 확인해 보세요.
            </p>
          </div>

          <div className="lg:col-span-6 relative h-[260px] lg:h-[320px] rounded-3xl overflow-hidden shadow-md">
            <Image
              src="/portfolio/aether-medical/aether-05.jpg"
              alt="에테르 메디컬 친환경 자재 아카이브"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Material Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MEDICAL_MATERIALS.map((mat) => (
            <div
              key={mat.id}
              onClick={() => onSelectMaterial(mat)}
              className="p-6 rounded-3xl bg-[#faf7f2] border border-[#ebdcd0] hover:border-[#a38068] transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <span className="text-[10px] font-mono text-[#a38068] tracking-widest uppercase block mb-2">
                {mat.category}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#2d241e] group-hover:text-[#a38068] transition-colors mb-2">
                {mat.name}
              </h3>
              <p className="text-xs text-[#7a6252] font-mono mb-4">{mat.engName}</p>
              <p className="text-xs text-[#6e5849] font-light leading-relaxed line-clamp-2 mb-4">
                {mat.description}
              </p>
              <div className="pt-3 border-t border-[#ebdcd0]/60 flex items-center justify-between text-[11px] text-[#9c8473]">
                <span>상세 규격 보기</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
