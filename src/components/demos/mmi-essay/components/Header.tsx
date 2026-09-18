'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenConsultation: () => void;
  onScrollTo: (id: string) => void;
}

export function Header({ onOpenConsultation, onScrollTo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '빨간펜 첨삭 비교', id: 'critique-lab' },
    { label: '의대 MMI 시뮬레이션', id: 'mmi-lab' },
    { label: '논술/면접 커리큘럼', id: 'curriculum' },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#12141A]/95 backdrop-blur-md border-b border-[#242A38] shadow-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-amber-600 flex items-center justify-center text-white font-serif font-bold text-lg shadow-md shadow-rose-600/20">
            &para;
          </div>
          <div>
            <span className="font-serif font-extrabold text-base tracking-wider text-white uppercase block">
              AGORA ESSAY &amp; MMI
            </span>
            <span className="text-[10px] text-rose-400 font-semibold tracking-widest block uppercase">
              Prestige Logic &amp; Medical Interview
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-xs font-semibold text-slate-300 hover:text-rose-400 transition-colors cursor-pointer py-2 min-h-[44px] flex items-center"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="px-4 lg:px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:brightness-110 text-white text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer min-h-[44px] flex items-center justify-center"
          >
            1:1 답안 첨삭 &amp; MMI 진단
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg border border-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="메뉴 토글"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181C26] border-b border-[#242A38] px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-rose-400 hover:bg-[#202636] rounded-lg transition-colors min-h-[44px] flex items-center"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
