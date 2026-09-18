'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onExploreZones: () => void;
  onExploreHUD: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreZones, onExploreHUD }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#090a0f] text-zinc-100"
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/nexus-work/nexus-01.jpg"
          alt="넥서스 워크 스마트 오피스 메인 전경"
          fill
          priority
          className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Modern Tech Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f]/90 via-transparent to-[#090a0f]/90" />
      </div>

      {/* Micro Label */}
      <div className="absolute top-28 left-6 lg:left-16 z-10 hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs font-mono tracking-widest text-zinc-300">
          SEONGSU TECH HUB · SMART WORKSPACE ARCHITECTURE
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 py-24 text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-zinc-900/90 border border-zinc-700 text-cyan-400 text-xs font-mono tracking-wider">
          <span>HIGH-TECH INTERIOR</span>
          <span className="text-zinc-500">/</span>
          <span>HYBRID WORKSPACE DESIGN</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-sans text-3xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight lg:leading-[1.15]">
          몰입과 유기적 연결이 공존하는<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-indigo-400">
            NEXUS WORK (넥서스 워크)
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm lg:text-lg text-zinc-300 font-light leading-relaxed mb-10">
          소음은 음향 차음 설계로 제어하고, 자연 채광과 바이오필릭 정원으로 창의성을 깨웁니다.<br className="hidden lg:inline" />
          성수·강남 딥테크 및 스타트업 사옥을 위한 차세대 하이브리드 워크스페이스를 구현합니다.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreZones}
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-zinc-950 font-bold text-sm tracking-wider uppercase transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <span>4대 업무 몰입 존 투어</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button
            onClick={onExploreHUD}
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-white/10 font-medium text-sm tracking-wider transition-all backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>스마트 회의실 IoT 관제 HUD</span>
          </button>
        </div>

        {/* Space Meta Indicators */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-zinc-400 tracking-wider">ACOUSTICS</span>
            <p className="text-sm lg:text-base font-bold text-zinc-200">-38dB 소음 감쇄 (예시)</p>
            <p className="text-xs text-zinc-400 font-light">3중 차음 캡슐 & 음향 루버</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-zinc-400 tracking-wider">FLOOR SCALE</span>
            <p className="text-sm lg:text-base font-bold text-zinc-200">775 m² (약 235평, 예시)</p>
            <p className="text-xs text-zinc-400 font-light">코워킹 · 타운홀 · 웰니스</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-zinc-400 tracking-wider">SMART SENSING</span>
            <p className="text-sm lg:text-base font-bold text-zinc-200">CO2 700ppm 이하 (예시)</p>
            <p className="text-xs text-zinc-400 font-light">온습도·조도 스마트 자동 제어</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-zinc-400 tracking-wider">BIOPHILIC WELLNESS</span>
            <p className="text-sm lg:text-base font-bold text-zinc-200">8M 수직 식재 정원 (예시)</p>
            <p className="text-xs text-zinc-400 font-light">자연 채광 & 피톤치드 테라피</p>
          </div>
        </div>
      </div>
    </section>
  );
};
