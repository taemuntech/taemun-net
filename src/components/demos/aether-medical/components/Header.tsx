'use client';

import React from 'react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full bg-[#faf7f2]/90 backdrop-blur-md border-b border-[#ebdcd0]/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#e8dacd] border border-[#d8c4b2] flex items-center justify-center text-[#6e5849] font-serif font-bold text-lg shadow-sm">
            AE
          </div>
          <div className="min-w-0">
            <span className="font-serif text-base lg:text-xl font-medium tracking-tight text-[#2d241e] block leading-none whitespace-nowrap">
              AETHER MEDICAL
            </span>
            {/* 아주 좁은 폭(420px 미만)에서는 이 영문 부제가 두 줄로 접혀 h-20 헤더를 밀어낸다 — 그 구간에서만 감춘다 */}
            <span className="hidden min-[420px]:block text-[10px] font-mono tracking-widest text-[#9c8473] uppercase mt-0.5 whitespace-nowrap">
              Cheongdam Aesthetic Clinic
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-[#6e5849] tracking-wider uppercase">
          <a href="#zones" className="hover:text-[#2d241e] transition-colors">
            Spatial Zones
          </a>
          <a href="#telemetry" className="hover:text-[#2d241e] transition-colors">
            Acoustic HUD
          </a>
          <a href="#materials" className="hover:text-[#2d241e] transition-colors">
            Material Archive
          </a>
          {/* Philosophy(#philosophy) 링크는 뺐다 — 그 id 를 가진 구역이 이 화면에 없어 눌러도 아무 데도 가지 않았다 */}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            type="button"
            className="px-5 py-2.5 min-h-11 whitespace-nowrap rounded-full bg-[#6e5849] hover:bg-[#524135] text-white text-xs font-medium tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
          >
            클리닉 시공 상담
          </button>
        </div>
      </div>
    </header>
  );
};
