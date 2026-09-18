'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenConsult: () => void;
  onScrollTo: (id: string) => void;
}

export function Header({ onOpenConsult, onScrollTo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#090E17]/90 backdrop-blur-md border-b border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center font-serif font-black text-slate-950 text-xl shadow-lg shadow-amber-900/30 border border-amber-400/30">
            §
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black tracking-wider text-lg lg:text-xl text-white">
                LEX ACADEMY
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                LEET &amp; CPA
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-serif">
              렉스 로스쿨 LEET &amp; CPA 전문 고시관
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300 font-serif">
          <button
            type="button"
            onClick={() => onScrollTo('leet-lab')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            기출 핀셋 해체 Lab
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('score-simulator')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            합격 표준점수 시뮬레이터
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('pass-cases')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            합격자 데이터 아카이브
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('curriculum')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            스파르타 커리큘럼
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4 font-serif">
          <span className="text-xs font-mono text-zinc-400">
            TEL: 02-0000-0000
          </span>
          <button
            type="button"
            onClick={onOpenConsult}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-900/30 min-h-[44px] cursor-pointer"
          >
            1:1 합격 가능성 진단
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label="모바일 메뉴 토글"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-b border-amber-500/20 px-4 py-4 space-y-3 font-serif">
          <button
            type="button"
            onClick={() => {
              onScrollTo('leet-lab');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-amber-400"
          >
            기출 핀셋 해체 Lab
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('score-simulator');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-amber-400"
          >
            합격 표준점수 시뮬레이터
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('pass-cases');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-amber-400"
          >
            합격자 데이터 아카이브
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('curriculum');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-amber-400"
          >
            스파르타 커리큘럼
          </button>
          <div className="pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => {
                onOpenConsult();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm text-center min-h-[44px]"
            >
              1:1 합격 가능성 진단 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
