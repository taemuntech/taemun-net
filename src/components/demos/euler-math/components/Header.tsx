'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenDiagnostic: () => void;
  onScrollTo: (id: string) => void;
}

export function Header({ onOpenDiagnostic, onScrollTo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '다면체 기하학 Lab', id: 'geometry-lab' },
    { label: 'KMO 기출 심층해체', id: 'problem-analysis' },
    { label: '영재 커리큘럼', id: 'curriculum' },
    { label: '올림피아드 로드맵', id: 'roadmap' },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#0A0D14]/95 backdrop-blur-md border-b border-[#1E293B] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-mono font-bold text-lg shadow-md shadow-cyan-500/20">
            &Sigma;
          </div>
          <div>
            <span className="font-mono font-extrabold text-base tracking-wider text-white uppercase block">
              EULER MATHEMATICS
            </span>
            <span className="text-[10px] text-cyan-400 font-semibold tracking-widest block uppercase">
              Olympiad &amp; Gifted Academy
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer py-2 min-h-[44px] flex items-center"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDiagnostic}
            className="px-4 lg:px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer min-h-[44px] flex items-center justify-center"
          >
            1:1 영재성 진단평가 신청
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg border border-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="메뉴 토글"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F1420] border-b border-[#1E293B] px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-[#1A2234] rounded-lg transition-colors min-h-[44px] flex items-center"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
