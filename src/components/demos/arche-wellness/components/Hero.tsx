'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenTrial: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#f5efe6] text-[#3d322a]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/arche-wellness/arche-01.jpg"
          alt="아르케 웰니스 한남동 필라테스 스튜디오 전경"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5efe6] via-[#f5efe6]/40 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#f5efe6]/30 to-[#f5efe6]/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 py-20 text-center">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#e0cbbe] text-[#916b53] font-mono text-xs mb-8 tracking-wider shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#d27952] animate-pulse" />
          PRIVATE BOUTIQUE PILATES & SPA ATELIER
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-3xl lg:text-6xl font-bold tracking-tight text-[#2d221b] mb-6 leading-tight">
          빛과 곡선이 머무는 곳,
          <br />
          <span className="text-[#b8613d]">
            온전한 회복을 담은 웰니스 인테리어
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm lg:text-lg text-[#5a483c] font-light leading-relaxed mb-10">
          한남과 청담의 프리미엄 프라이빗 필라테스 & 스파를 위한 공간 솔루션.
          자연 채광을 투과시키는 린넨과 웜 샌드 미장, 천연 히노끼 마감과 청정 공조가 어우러져
          고객의 몸과 마음에 온전한 휴식의 시간을 건넵니다.
        </p>

        {/* Spec Grid Mini — 가상 스튜디오의 설정값이라 규모·위치에 「예시」를 남긴다(실적 수치로 읽히지 않게). */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12">
          <div className="p-4 rounded-xl bg-white/80 border border-[#ebdcd0] shadow-sm backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-[#8a7566] uppercase">LOCATION</span>
            <span className="text-base font-bold text-[#b8613d]">서울 용산구 한남동</span>
            <span className="block text-[10px] text-[#9c8b7d]">가상 스튜디오 설정</span>
          </div>
          <div className="p-4 rounded-xl bg-white/80 border border-[#ebdcd0] shadow-sm backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-[#8a7566] uppercase">SCALE</span>
            <span className="text-base font-bold text-[#b8613d]">단독 3층 (95평형)</span>
            <span className="block text-[10px] text-[#9c8b7d]">예시 규모</span>
          </div>
          <div className="p-4 rounded-xl bg-white/80 border border-[#ebdcd0] shadow-sm backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-[#8a7566] uppercase">CONCEPT</span>
            <span className="text-base font-bold text-[#b8613d]">웜 샌드 오가닉 아키텍처</span>
            <span className="block text-[10px] text-[#9c8b7d]">디자인 콘셉트</span>
          </div>
          <div className="p-4 rounded-xl bg-white/80 border border-[#ebdcd0] shadow-sm backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-[#8a7566] uppercase">AIR QUALITY</span>
            <span className="text-base font-bold text-[#b8613d]">청정 외기 항온항습</span>
            <span className="block text-[10px] text-[#9c8b7d]">예시 설비 사양</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <a
            href="#zones"
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-[#d27952] hover:bg-[#b8613d] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#d27952]/20 transition-all active:scale-95"
          >
            스튜디오 3대 룸 둘러보기
          </a>
          <button
            onClick={onOpenTrial}
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-white hover:bg-[#faf7f2] text-[#3d322a] border border-[#d6c2b4] font-semibold text-sm transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            필라테스 스튜디오 시공 상담
          </button>
        </div>
      </div>
    </section>
  );
};
