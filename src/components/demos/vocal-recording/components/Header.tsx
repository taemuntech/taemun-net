'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenBooking: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export function Header({ onOpenBooking, onScrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'DAW 멀티트랙 믹서', id: 'daw-mixer' },
    { label: '보컬 음역 진단', id: 'vocal-range' },
    { label: '오디션 음원 쇼케이스', id: 'audition-tracks' },
    { label: '전문 커리큘럼', id: 'curriculum' },
    { label: '스튜디오 장비', id: 'studio-gear' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#0B0C10]/90 backdrop-blur-md border-b border-[#1F2430]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-pink-500/20">
            🎙️
          </div>
          <div>
            <span className="font-bold text-base tracking-wider text-white uppercase block">
              VOCAL HOUSE
            </span>
            <span className="text-[10px] text-pink-400 font-medium tracking-widest block uppercase">
              Pro Recording &amp; Academy
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-xs font-medium text-zinc-300 hover:text-pink-400 transition-colors cursor-pointer py-2 min-h-[44px] flex items-center"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="px-4 lg:px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer min-h-[44px] flex items-center justify-center"
          >
            1:1 보컬 진단 예약
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-lg border border-[#242B38] min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="메뉴 토글"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F1117] border-b border-[#1F2430] px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-3 py-2.5 text-sm text-zinc-300 hover:text-pink-400 hover:bg-[#1A1F2C] rounded-lg transition-colors min-h-[44px] flex items-center"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
