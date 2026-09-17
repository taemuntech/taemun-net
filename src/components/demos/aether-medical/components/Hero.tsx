'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#faf7f2] pt-12 pb-24">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/aether-medical/aether-01.jpg"
          alt="에테르 메디컬 청담 VIP 라운지 인테리어"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-[#faf7f2]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf7f2]/90 via-[#faf7f2]/40 to-[#faf7f2]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0e6dc] border border-[#ebdcd0] text-[#7a6252] text-xs font-mono tracking-widest uppercase mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#a38068] animate-pulse" />
          Cheongdam VIP Aesthetic Architecture
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl lg:text-6xl font-normal text-[#2d241e] tracking-tight leading-[1.25] mb-6">
          빛과 곡면의 안식처, <br />
          <span className="italic font-light text-[#7a6252]">6성급 호텔 라운지 감성</span>의 메디컬 인테리어
        </h1>

        {/* Subtitle */}
        <p className="text-sm lg:text-lg text-[#6e5849] max-w-2xl mx-auto font-light leading-relaxed mb-10 [word-break:keep-all]">
          차가운 병원의 인상을 완전히 지우고, 자연 채광과 천연 로만 트래버틴, 
          45dB 무소음 차음 설계로 완성한 청담동 하이엔드 피부과 & 안티에이징 센터 시공 공간입니다.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="w-full lg:w-auto px-8 py-4 rounded-full bg-[#524135] hover:bg-[#3d2f26] text-white font-medium text-xs lg:text-sm tracking-wider uppercase transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            메디컬 인테리어 맞춤 상담 신청
          </button>
          <a
            href="#zones"
            className="w-full lg:w-auto px-8 py-4 rounded-full bg-white/80 hover:bg-white border border-[#ebdcd0] text-[#524135] font-medium text-xs lg:text-sm tracking-wider uppercase transition-all shadow-sm cursor-pointer"
          >
            3대 VIP 특화 공간 투어
          </a>
        </div>

        {/* Quick Spec Bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#ebdcd0]/60">
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#9c8473] uppercase block mb-1">ACOUSTIC RATING</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#3d2f26]">45dB 이하 차음 (예시)</span>
          </div>
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#9c8473] uppercase block mb-1">LIGHTING TEMP</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#3d2f26]">3000K 간접 조도</span>
          </div>
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#9c8473] uppercase block mb-1">VENTILATION</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#3d2f26]">시간당 12회 환기 (예시)</span>
          </div>
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#9c8473] uppercase block mb-1">PRIVACY ARCH</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#3d2f26]">100% 1인 독립동선</span>
          </div>
        </div>
      </div>
    </section>
  );
};
