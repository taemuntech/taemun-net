'use client';
import React, { useState } from 'react';
import { SHOWROOM_BRAND } from '../data/showroomData';

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
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full bg-[#121316]/90 backdrop-blur-md border-b border-white/10 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo — 예전엔 div onClick 이라 키보드로는 닿지 않았다 */}
        <button
          type="button"
          onClick={() => handleNavClick('hero')}
          aria-label={`${SHOWROOM_BRAND.name} 맨 위로`}
          className="flex items-center gap-3 min-h-11 text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
        >
          <span className="w-10 h-10 shrink-0 rounded-sm bg-stone-200 text-[#121316] flex items-center justify-center font-serif font-black text-xl tracking-tighter">
            AM
          </span>
          <span className="block">
            <span className="flex items-center gap-2">
              <span className="font-serif tracking-widest text-base lg:text-lg font-bold text-white uppercase">
                {SHOWROOM_BRAND.name}
              </span>
              <span className="hidden lg:inline-block text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Flagship Studio
              </span>
            </span>
            <span className="block text-[11px] text-stone-400 font-sans tracking-wide">
              성수 플래그십 쇼룸 & 복합문화공간 디자인
            </span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
          <button
            type="button"
            onClick={() => handleNavClick('philosophy')}
            className="hover:text-amber-300 transition-colors tracking-wider"
          >
            공간 철학
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('zoning')}
            className="hover:text-amber-300 transition-colors tracking-wider"
          >
            인터랙티브 조닝
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('materials')}
            className="hover:text-amber-300 transition-colors tracking-wider"
          >
            머티리얼 아카이브
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('projects')}
            className="hover:text-amber-300 transition-colors tracking-wider"
          >
            시공 프로젝트
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('estimator')}
            className="hover:text-amber-300 transition-colors tracking-wider"
          >
            공간 견적 진단
          </button>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-amber-500/20"
          >
            프로젝트 문의
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-11 w-11 items-center justify-center -mr-2 text-stone-300 hover:text-white focus:outline-none"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
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
        <div className="lg:hidden bg-[#121316] border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 text-sm text-stone-300 font-medium">
            <button
              type="button"
              onClick={() => handleNavClick('philosophy')}
              className="text-left min-h-11 py-2 hover:text-amber-300 transition-colors border-b border-white/5"
            >
              공간 철학 (Philosophy)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('zoning')}
              className="text-left min-h-11 py-2 hover:text-amber-300 transition-colors border-b border-white/5"
            >
              인터랙티브 조닝 (Interactive Zoning)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('materials')}
              className="text-left min-h-11 py-2 hover:text-amber-300 transition-colors border-b border-white/5"
            >
              머티리얼 아카이브 (Material Archive)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('projects')}
              className="text-left min-h-11 py-2 hover:text-amber-300 transition-colors border-b border-white/5"
            >
              시공 프로젝트 (Project Archive)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('estimator')}
              className="text-left min-h-11 py-2 hover:text-amber-300 transition-colors border-b border-white/5"
            >
              공간 견적 진단 (Space Estimator)
            </button>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full min-h-11 py-3 text-center rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-widest uppercase"
            >
              프로젝트 1:1 상담 예약
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
