'use client';
import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onExploreZoning: () => void;
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreZoning, onOpenEstimator }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0d0e11] text-white">
      {/* Background Media with Gradient Masks */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/seongsu-showroom/seongsu-01.jpg"
          alt="아틀리에 무드 성수 1F 웰컴 라운지 — 목재 프레임 유리 파티션과 모듈러 소파"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Subtle Ambient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-[#0d0e11]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e11]/80 via-transparent to-[#0d0e11]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Floating Spatial Micro Tags */}
      <div className="absolute top-28 left-6 lg:left-16 z-10 hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs font-mono tracking-widest text-stone-300">
          SEONGSU FLAGSHIP · 3-STORY CURATED ARCHIVE
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 py-24 text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded bg-stone-800/80 border border-stone-700 text-amber-400 text-xs font-mono tracking-wider">
          <span>SPATIAL BRANDING</span>
          <span className="text-stone-500">/</span>
          <span>COMMERCIAL ARCHITECTURE</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl lg:text-6xl font-normal tracking-tight text-stone-100 mb-6 leading-tight lg:leading-[1.15]">
          원초적 물성과 구조가 완성하는<br />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-amber-200 to-amber-400">
            성수 플래그십 쇼룸의 새로운 기준
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm lg:text-lg text-stone-300 font-light leading-relaxed mb-10">
          옛 공장 건물의 골조와 창을 남기고, 목재 프레임과 반투명 유리, 정밀 가공된 금속을 더했습니다.<br className="hidden lg:inline" />
          공간 자체가 브랜드의 강력한 서사가 되는 상업 쇼룸 및 복합문화공간을 설계합니다.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onExploreZoning}
            className="w-full lg:w-auto px-8 py-4 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm tracking-widest uppercase transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <span>3층 조닝 인터랙티브 투어</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onOpenEstimator}
            className="w-full lg:w-auto px-8 py-4 rounded-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-sm tracking-wider transition-all backdrop-blur-sm"
          >
            공간 견적 시뮬레이션 진단
          </button>
        </div>

        {/* Architecture Specs Highlight Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-stone-400 tracking-wider">FLOOR STRUCTURE</span>
            <p className="text-sm lg:text-base font-serif font-bold text-stone-200">지상 3개 층 (555 m²)</p>
            <p className="text-xs text-stone-400">쇼룸 · 갤러리 · VIP 살롱</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-stone-400 tracking-wider">CEILING VOID</span>
            <p className="text-sm lg:text-base font-serif font-bold text-stone-200">최대 4.8M 보이드</p>
            <p className="text-xs text-stone-400">오픈형 수직 공간감 연출</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-stone-400 tracking-wider">LIGHTING SYSTEM</span>
            <p className="text-sm lg:text-base font-serif font-bold text-stone-200">CRI 97+ 고연색성</p>
            <p className="text-xs text-stone-400">시간대별 조도 자동 연동</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-stone-400 tracking-wider">MATERIAL CURATION</span>
            <p className="text-sm lg:text-base font-serif font-bold text-stone-200">5종 핵심 하이엔드 자재</p>
            <p className="text-xs text-stone-400">스펙 아카이브 직접 체험</p>
          </div>
        </div>
      </div>
    </section>
  );
};
