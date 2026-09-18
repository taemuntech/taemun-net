'use client';

import React from 'react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full bg-[#faf6f0]/90 backdrop-blur-md border-b border-[#ebdcd0]/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#eedbc9] border border-[#ddc2aa] flex items-center justify-center text-[#5c422c] font-bold text-lg shadow-sm">
            鳴
          </div>
          <div>
            <span className="font-serif text-lg lg:text-xl font-bold tracking-tight text-[#2e2319] block leading-none">
              RESONANCE · 공명
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#856b54] uppercase mt-0.5 block">
              Hi-Fi Audio & Acoustic Studio
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        {/* 링크 자체는 글자 높이 16px 이라 탭 대상이 작다 — min-h-[44px] 로 누를 면적만 넓힌다(헤더 높이 80px 안에서 소화) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-[#6b523e] tracking-wider uppercase">
          <a href="#zones" className="min-h-[44px] flex items-center hover:text-[#2e2319] transition-colors">
            Acoustic Zones
          </a>
          <a href="#rt60" className="min-h-[44px] flex items-center hover:text-[#2e2319] transition-colors">
            RT60 Simulation
          </a>
          <a href="#materials" className="min-h-[44px] flex items-center hover:text-[#2e2319] transition-colors">
            Sound Materials
          </a>
          {/* 「Philosophy」 링크는 대상 섹션이 문서에 없어 눌러도 아무 데도 가지 않았다 — 없는 앵커라 제거 */}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#5c422c] hover:bg-[#473220] text-white text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
          >
            청음실 시공 상담
          </button>
        </div>
      </div>
    </header>
  );
};
