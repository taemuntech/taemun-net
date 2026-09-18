'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenTeaModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTeaModal }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#181412] text-[#f4ede2]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/jeonglim-tea/jeonglim-01.jpg"
          alt="정림다원 북촌 한옥 다도 공간 전경"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60 scale-103 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181412] via-[#181412]/50 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#181412]/40 to-[#181412]/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 py-20 text-center">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a221c]/80 border border-[#524134] text-[#cbb094] font-mono text-xs mb-8 tracking-wider shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#cbb094] animate-pulse" />
          MODERN HANOK & TEA CULTURE SPATIAL DESIGN
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-3xl lg:text-6xl font-bold tracking-tight text-[#f4ede2] mb-6 leading-tight break-keep">
          비움과 침묵 속에 피어나는
          <br />
          <span className="text-[#d8b896]">
            백 년 고재와 먹색 화강석의 조화
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm lg:text-lg text-[#b8a796] font-light leading-relaxed mb-10 break-keep">
          북촌과 서촌의 전통 고택 건축 미학을 현대적인 다도 문화 공간으로 재해석합니다.
          자연 건조된 춘양목 서까래 아래, 현대식 블랙 화강석 팽주석과 비 내리는 중정 툇마루가 어우러져
          시간이 멈춘 듯한 고요한 차 한 잔의 여백을 짓습니다.
        </p>

        {/* Spec Grid Mini */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12">
          <div className="p-4 rounded-xl bg-[#221c18]/80 border border-[#3d3127] shadow-sm backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-[#8a7566] uppercase">LOCATION</span>
            <span className="text-base font-bold text-[#d8b896] break-keep">서울 종로구 북촌 일대 (가상)</span>
          </div>
          <div className="p-4 rounded-xl bg-[#221c18]/80 border border-[#3d3127] shadow-sm backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-[#8a7566] uppercase">STRUCTURE</span>
            <span className="text-base font-bold text-[#d8b896] break-keep">전통 목구조 복원 (예시)</span>
          </div>
          <div className="p-4 rounded-xl bg-[#221c18]/80 border border-[#3d3127] shadow-sm backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-[#8a7566] uppercase">CONCEPT</span>
            <span className="text-base font-bold text-[#d8b896] break-keep">모던 한옥 &amp; 다도 팽주석</span>
          </div>
          <div className="p-4 rounded-xl bg-[#221c18]/80 border border-[#3d3127] shadow-sm backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-[#8a7566] uppercase">LANDSCAPE</span>
            <span className="text-base font-bold text-[#d8b896] break-keep">이끼 중정 &amp; 석등 파노라마</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <a
            href="#zones"
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-[#6b5545] hover:bg-[#856b57] text-[#f4ede2] font-bold text-sm tracking-wide shadow-lg shadow-black/40 transition-all active:scale-95 border border-[#8c715c]"
          >
            한옥 3대 다도 공간 둘러보기
          </a>
          <button
            onClick={onOpenTeaModal}
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-[#2a221c]/90 hover:bg-[#382f28] text-[#cbb094] border border-[#524134] font-semibold text-sm transition-all active:scale-95 cursor-pointer"
          >
            한옥 다도 공간 시공 견적 상담
          </button>
        </div>
      </div>
    </section>
  );
};
