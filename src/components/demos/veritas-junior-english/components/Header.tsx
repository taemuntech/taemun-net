'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenLevelTest: () => void;
  onScrollTo: (id: string) => void;
}

export function Header({ onOpenLevelTest, onScrollTo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '렉사일 도서관', id: 'lexile-library' },
    { label: 'AI 스피킹 랩', id: 'speaking-lab' },
    { label: '몰입 커리큘럼', id: 'curriculum' },
    { label: '원어민 교수진', id: 'faculty' },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
          <div className="w-10 h-10 rounded-xl bg-[#0F2942] flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
            V
          </div>
          <div>
            <span className="font-serif font-extrabold text-base tracking-wider text-[#0F2942] uppercase block">
              VERITAS JUNIOR
            </span>
            <span className="text-[10px] text-blue-600 font-semibold tracking-widest block uppercase">
              Prestige English Academy
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer py-2 min-h-[44px] flex items-center"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLevelTest}
            className="px-4 lg:px-5 py-2.5 rounded-xl bg-[#0F2942] hover:bg-blue-900 text-white text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer min-h-[44px] flex items-center justify-center"
          >
            1:1 레벨테스트 예약
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="메뉴 토글"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors min-h-[44px] flex items-center"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
