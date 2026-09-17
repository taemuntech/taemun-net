'use client';

import React, { useState } from 'react';
import { WORK_BRAND } from '../data/workData';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full bg-[#0d0f14]/90 backdrop-blur-md border-b border-zinc-800 text-zinc-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNavClick('hero')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-zinc-950 flex items-center justify-center font-mono font-black text-lg shadow-lg shadow-cyan-500/20">
            NW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono tracking-wider text-lg font-bold text-white">
                {WORK_BRAND.name}
              </span>
              <span className="hidden lg:inline-block text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Smart Office Architecture
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans tracking-wide">
              성수·강남 하이테크 스마트 사옥 인테리어
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <button
            onClick={() => handleNavClick('zones')}
            className="hover:text-cyan-400 transition-colors tracking-wider"
          >
            4대 몰입 존 투어
          </button>
          <button
            onClick={() => handleNavClick('meeting-hud')}
            className="hover:text-cyan-400 transition-colors tracking-wider flex items-center gap-1.5"
          >
            <span>스마트 회의실 HUD</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
          <button
            onClick={() => handleNavClick('acoustics')}
            className="hover:text-cyan-400 transition-colors tracking-wider"
          >
            음향 차음 마감재
          </button>
          <button
            onClick={() => handleNavClick('philosophy')}
            className="hover:text-cyan-400 transition-colors tracking-wider"
          >
            공간 철학
          </button>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-zinc-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-cyan-500/20"
          >
            오피스 실측 & 시공 상담
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#11131a] border-b border-zinc-800 px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 text-sm text-zinc-300 font-medium">
            <button
              onClick={() => handleNavClick('zones')}
              className="text-left py-2 hover:text-cyan-400 transition-colors border-b border-white/5"
            >
              4대 몰입 존 투어 (Workspace Zones)
            </button>
            <button
              onClick={() => handleNavClick('meeting-hud')}
              className="text-left py-2 hover:text-cyan-400 transition-colors border-b border-white/5 flex items-center justify-between"
            >
              <span>스마트 회의실 관제 HUD</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                LIVE
              </span>
            </button>
            <button
              onClick={() => handleNavClick('acoustics')}
              className="text-left py-2 hover:text-cyan-400 transition-colors border-b border-white/5"
            >
              음향 차음 마감재 스펙 아카이브
            </button>
            <button
              onClick={() => handleNavClick('philosophy')}
              className="text-left py-2 hover:text-cyan-400 transition-colors border-b border-white/5"
            >
              공간 철학 & 설계 가이드
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-zinc-950 font-bold text-xs tracking-wider uppercase shadow-md shadow-cyan-500/20"
            >
              오피스 인테리어 실측 상담 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
