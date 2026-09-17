'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#faf6f0] pt-12 pb-24">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/resonance-sound/resonance-01.jpg"
          alt="공명 성수 하이파이 오디오 청음 라운지 인테리어"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf6f0] via-[#faf6f0]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf6f0]/90 via-[#faf6f0]/40 to-[#faf6f0]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2e6d8] border border-[#ddc2aa] text-[#6b523e] text-xs font-mono tracking-widest uppercase mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#8c6544] animate-pulse" />
          Acoustic Engineering & Hi-Fi Sanctuary
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl lg:text-6xl font-normal text-[#2e2319] tracking-tight leading-[1.25] mb-6">
          빛과 소리의 공명(共鳴), <br />
          <span className="italic font-light text-[#8c6544]">화이트 오크 지상 라운지</span>의 청음 공간
        </h1>

        {/* Subtitle */}
        <p className="text-sm lg:text-lg text-[#6b523e] max-w-2xl mx-auto font-light leading-relaxed mb-10 [word-break:keep-all]">
          어두운 지하 청음실을 벗어나, 따뜻한 자연 채광과 2D QRD 음향 디퓨저, 
          RT60 0.38초 정밀 잔향 제어로 완성한 성수·한남 하이파이 프라이빗 오디오 룸 시공 공간입니다.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="w-full lg:w-auto px-8 py-4 rounded-full bg-[#5c422c] hover:bg-[#473220] text-white font-bold text-xs lg:text-sm tracking-wider uppercase transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            청음실 공간 시공 맞춤 상담
          </button>
          <a
            href="#zones"
            className="w-full lg:w-auto px-8 py-4 rounded-full bg-white/80 hover:bg-white border border-[#ebdcd0] text-[#6b523e] font-medium text-xs lg:text-sm tracking-wider uppercase transition-all shadow-sm cursor-pointer"
          >
            3대 음향 특화 존 투어
          </a>
        </div>

        {/* Quick Acoustic Spec Bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#ebdcd0]/60">
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#856b54] uppercase block mb-1">TARGET RT60</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#2e2319]">0.38s 최적 잔향 (예시)</span>
          </div>
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#856b54] uppercase block mb-1">DIFFUSION RANGE</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#2e2319]">650Hz~4.8kHz (예시)</span>
          </div>
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#856b54] uppercase block mb-1">WOOD SPECIES</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#2e2319]">솔리드 화이트 오크</span>
          </div>
          <div className="text-center p-3">
            <span className="text-[11px] font-mono text-[#856b54] uppercase block mb-1">BASS TRAP</span>
            <span className="font-serif text-lg lg:text-xl font-bold text-[#2e2319]">40Hz 멤브레인 트랩</span>
          </div>
        </div>
      </div>
    </section>
  );
};
