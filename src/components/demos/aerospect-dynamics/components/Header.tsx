import React, { useState } from 'react';
import { ASSET_IMAGES } from '../data/mockData';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenPocModal: () => void;
  onOpenWhitepaper: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenPocModal,
  onOpenWhitepaper,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenType; label: string }[] = [
    { id: 'fleet', label: '기체 라인업 (Fleet)' },
    { id: 'solutions', label: 'AI 솔루션 (Solutions)' },
    { id: 'payloads', label: '라이다·열화상 (Payloads)' },
    { id: 'dock-system', label: '무인 관제 (Dock System)' },
    { id: 'case-studies', label: '고객 사례 (Case Studies)' },
  ];

  const handleNavClick = (screen: ScreenType) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-[var(--sample-bar-h,0px)] left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-zinc-200">
      <div className="h-16 lg:h-20 max-w-7xl mx-auto px-3.5 lg:px-12 flex items-center justify-between gap-2 lg:gap-4">
        {/* Brand Identity */}
        <button
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-2 lg:gap-3 text-left group focus:outline-none cursor-pointer shrink-0"
        >
          <img
            alt="AEROSPECT DYNAMICS Logo"
            className="h-6 lg:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={ASSET_IMAGES.logo}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col justify-center">
            <span className="text-xs lg:text-base font-bold tracking-tight text-zinc-950 uppercase whitespace-nowrap">
              AEROSPECT DYNAMICS
            </span>
            <span className="hidden lg:inline-block font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
              AEROSPACE AUTONOMY LAB // KR-DEF
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg transition-all text-sm font-medium cursor-pointer ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Demo CTA */}
        <div className="flex items-center gap-1.5 lg:gap-3 shrink-0">
          <button
            onClick={onOpenWhitepaper}
            className="hidden lg:inline-flex text-zinc-600 hover:text-zinc-950 font-mono text-xs uppercase tracking-wider transition-colors px-2.5 py-2 rounded-lg hover:bg-zinc-100 cursor-pointer"
          >
            기술 백서 (Specs)
          </button>

          <button
            onClick={onOpenPocModal}
            className="px-2.5 py-1.5 lg:px-4 lg:py-2.5 bg-zinc-950 text-white font-mono text-[11px] lg:text-xs uppercase tracking-wider rounded-lg lg:rounded-xl transition-all hover:bg-zinc-800 shadow-xs active:scale-95 cursor-pointer font-semibold whitespace-nowrap"
          >
            데모 비행 신청
          </button>

          <div
            title="인증된 사용자 세션: 국방·인프라 관제망"
            className="hidden lg:flex w-8 h-8 rounded-full bg-zinc-950 items-center justify-center cursor-pointer hover:ring-2 hover:ring-sky-500/50 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-zinc-800 hover:bg-zinc-100 cursor-pointer"
            aria-label="메뉴 열기"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-4 py-4 flex flex-col gap-2 shadow-lg">
          <button
            onClick={() => handleNavClick('overview')}
            className={`text-left px-3 py-2.5 rounded-lg font-medium text-sm ${
              currentScreen === 'overview'
                ? 'bg-zinc-100 text-zinc-950 font-bold'
                : 'text-zinc-600'
            }`}
          >
            전체 개요 (Overview)
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left px-3 py-2.5 rounded-lg font-medium text-sm ${
                currentScreen === item.id
                  ? 'bg-zinc-100 text-zinc-950 font-bold'
                  : 'text-zinc-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-zinc-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhitepaper();
              }}
              className="text-left px-3 py-2 font-mono text-xs text-zinc-600 hover:text-zinc-950 cursor-pointer"
            >
              📄 기술 백서 (Specs) 다운로드
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPocModal();
              }}
              className="w-full py-3 bg-zinc-950 text-white font-mono text-xs text-center rounded-xl font-semibold cursor-pointer"
            >
              현장 실증(PoC) 비행 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
