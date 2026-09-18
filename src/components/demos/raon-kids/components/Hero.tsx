'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#fcf9f2] pt-12 pb-24">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/raon-kids/raon-01.jpg"
          alt="라온 키즈 아틀리에 판교 실내 인테리어"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f2] via-[#fcf9f2]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcf9f2]/90 via-[#fcf9f2]/40 to-[#fcf9f2]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faedd0] border border-[#ebd29c] text-[#825e1a] text-xs font-mono tracking-widest uppercase mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#e39c44] animate-pulse" />
          Eco-Friendly Kids Architecture Atelier
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl lg:text-6xl font-normal text-[#3b2e1e] tracking-tight leading-[1.25] mb-6">
          상상력이 피어나는 햇살, <br />
          <span className="italic font-light text-[#c98330]">저VOC 친환경 마감</span>의 키즈 복합공간
        </h1>

        {/* Subtitle */}
        <p className="text-sm lg:text-lg text-[#6e5840] max-w-2xl mx-auto font-light leading-relaxed mb-10 [word-break:keep-all]">
          모든 모서리를 부드러운 곡면으로 다듬고, 핀란드산 자작나무와 천연 코르크로 완성한 
          서초·판교 프리미엄 어린이 창의 에듀 라운지 시공 공간입니다.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="w-full lg:w-auto px-8 py-4 rounded-full bg-[#e39c44] hover:bg-[#c98330] text-white font-bold text-xs lg:text-sm tracking-wider uppercase transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            키즈 공간 시공 견적 상담
          </button>
          <a
            href="#zones"
            className="w-full lg:w-auto px-8 py-4 rounded-full bg-white/80 hover:bg-white border border-[#ebdcd0] text-[#6e5840] font-medium text-xs lg:text-sm tracking-wider uppercase transition-all shadow-sm cursor-pointer"
          >
            3대 창의 놀이존 투어
          </a>
        </div>

        {/* Quick Safety Spec Bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#ebdcd0]/60">
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#8c7456] uppercase block mb-1">RADON</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#3b2e1e]">0.02 pCi/L (예시)</span>
          </div>
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#8c7456] uppercase block mb-1">WOOD GRADE</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#3b2e1e]">E0 등급 무절 자작나무 (예시)</span>
          </div>
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#8c7456] uppercase block mb-1">IMPACT ABSORB</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#3b2e1e]">42% 충격 완화 (예시)</span>
          </div>
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#8c7456] uppercase block mb-1">ROUND CORNER</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#3b2e1e]">R150 곡선 안전각 (예시)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
