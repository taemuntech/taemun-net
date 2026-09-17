'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenConsult: () => void;
  onScrollTo: (id: string) => void;
}

export function Header({ onOpenConsult, onScrollTo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#06090E]/90 backdrop-blur-md border-b border-lime-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center font-mono font-black text-slate-950 text-xl shadow-lg shadow-lime-500/20">
            AP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black tracking-wider text-lg lg:text-xl text-white">
                APEX ATHLETIC
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-500/10 text-lime-400 border border-lime-500/30">
                ELITE SPORTS
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">
              아펙스 체대입시 &amp; 엘리트 스포츠 아카데미
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300 font-mono">
          <button
            type="button"
            onClick={() => onScrollTo('telemetry-lab')}
            className="hover:text-lime-400 transition-colors cursor-pointer"
          >
            기초실기 센서 HUD
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('admission-matrix')}
            className="hover:text-lime-400 transition-colors cursor-pointer"
          >
            수능·실기 합격 계산기
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('cases-showcase')}
            className="hover:text-lime-400 transition-colors cursor-pointer"
          >
            명문 체대 합격 아카이브
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('curriculum')}
            className="hover:text-lime-400 transition-colors cursor-pointer"
          >
            스파르타 훈련반
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4 font-mono">
          <span className="text-xs text-zinc-400">
            TEL: 02-0000-0000
          </span>
          <button
            type="button"
            onClick={onOpenConsult}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-lime-500/25 min-h-[44px] cursor-pointer"
          >
            1:1 무료 실기 측정 신청
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
        <div className="lg:hidden bg-[#0C121D] border-b border-lime-500/20 px-4 py-4 space-y-3 font-mono">
          <button
            type="button"
            onClick={() => {
              onScrollTo('telemetry-lab');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-lime-400"
          >
            기초실기 센서 HUD
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('admission-matrix');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-lime-400"
          >
            수능·실기 합격 계산기
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('cases-showcase');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-lime-400"
          >
            명문 체대 합격 아카이브
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('curriculum');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-lime-400"
          >
            스파르타 훈련반
          </button>
          <div className="pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => {
                onOpenConsult();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 font-bold text-sm text-center min-h-[44px]"
            >
              1:1 무료 실기 측정 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
