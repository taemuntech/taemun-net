'use client';
import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onExploreMood: () => void;
  onExploreZones: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMood, onExploreZones }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#111215] text-stone-100">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/stay-jeju/jeju-01.avif"
          alt="소소재 제주 독채 스테이 전경"
          fill
          priority
          className="object-cover object-center opacity-50 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Soft Organic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-[#111215]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111215]/80 via-transparent to-[#111215]/80" />
      </div>

      {/* Micro Label */}
      <div className="absolute top-28 left-6 lg:left-16 z-10 hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="text-xs font-mono tracking-widest text-stone-300">
          JEJU AEWEOL · PRIVATE WELLNESS SANCTUARY
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 py-24 text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-stone-900/80 border border-stone-700 text-amber-300 text-xs font-mono tracking-wider">
          <span>HOSPITALITY ARCHITECTURE</span>
          <span className="text-stone-500">/</span>
          <span>BOUTIQUE STAY DESIGN</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl lg:text-6xl font-normal tracking-tight text-stone-100 mb-6 leading-tight lg:leading-[1.2]">
          제주의 돌담과 고요한 시간이 머무는<br />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-amber-200 to-amber-400">
            소소재 제주 (小素齋)
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm lg:text-lg text-stone-300 font-light leading-relaxed mb-10">
          시간의 흐름에 따라 변화하는 제주의 빛과 바람을 공간으로 온전히 담아냈습니다.<br className="hidden lg:inline" />
          현무암 겹돌담과 100년 편백 고재, 하늘로 열린 천창이 완성하는 가장 깊은 휴식을 제안합니다.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreMood}
            className="w-full lg:w-auto px-8 py-4 rounded-sm bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm tracking-widest uppercase transition-all shadow-xl shadow-amber-600/20 flex items-center justify-center gap-2"
          >
            <span>시간대별 무드(낮/노을/밤) 전환 체험</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          <button
            onClick={onExploreZones}
            className="w-full lg:w-auto px-8 py-4 rounded-sm bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-white/10 font-medium text-sm tracking-wider transition-all backdrop-blur-sm"
          >
            안채 & 노천 히노끼탕 공간 투어
          </button>
        </div>

        {/* Space Meta Indicators */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-stone-400 tracking-wider">LOCATION</span>
            <p className="text-sm lg:text-base font-serif font-bold text-stone-200">제주시 애월읍 고내리</p>
            <p className="text-xs text-stone-400">바다와 오름을 품은 대지</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-stone-400 tracking-wider">ARCHITECTURE</span>
            <p className="text-sm lg:text-base font-serif font-bold text-stone-200">독채 116 m² (35평형)</p>
            <p className="text-xs text-stone-400">안채 · 다도실 · 노천 온천</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-stone-400 tracking-wider">NATURAL MATERIAL</span>
            <p className="text-sm lg:text-base font-serif font-bold text-stone-200">제주 현무암 & 편백</p>
            <p className="text-xs text-stone-400">장인의 수작업 정다듬 가공</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-stone-400 tracking-wider">LIGHTING CONCEPT</span>
            <p className="text-sm lg:text-base font-serif font-bold text-stone-200">시간대별 서커디언 조명</p>
            <p className="text-xs text-stone-400">2,200K ~ 5,000K 색온도 제어</p>
          </div>
        </div>
      </div>
    </section>
  );
};
