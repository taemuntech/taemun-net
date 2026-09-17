'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenConsult: () => void;
  onScrollTo: (id: string) => void;
}

export function Header({ onOpenConsult, onScrollTo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#1A030A]/90 backdrop-blur-md border-b border-rose-900/40 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-700 to-amber-700 flex items-center justify-center font-serif font-bold text-amber-100 text-xl shadow-lg shadow-rose-950/40 border border-amber-500/30">
            IV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold tracking-wider text-lg lg:text-xl text-white">
                IVY PREP
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                BOARDING &amp; IVY
              </span>
            </div>
            <p className="text-[11px] text-rose-200/60 font-serif">
              아이비 프렙 아카데미 · 미국 보딩스쿨 &amp; 아이비리그 전문관
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-rose-100/80">
          <button
            type="button"
            onClick={() => onScrollTo('radar-lab')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            6대 입시역량 Radar
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('sat-telemetry')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Digital SAT 진단기
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('admissions-showcase')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            명문대 합격 사례
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('curriculum')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            프레스티지 프로그램
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <span className="text-xs font-mono text-rose-200/60">
            TEL: 02-0000-0000
          </span>
          <button
            type="button"
            onClick={onOpenConsult}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-amber-50 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-rose-900/40 min-h-[44px] cursor-pointer border border-amber-400/30 font-serif"
          >
            1:1 프라이빗 입시 진단
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-rose-950 border border-rose-900 text-rose-200 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label="모바일 메뉴 토글"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1A030A] border-b border-rose-900/40 px-4 py-4 space-y-3 font-serif">
          <button
            type="button"
            onClick={() => {
              onScrollTo('radar-lab');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-rose-200 hover:text-amber-300"
          >
            6대 입시역량 Radar
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('sat-telemetry');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-rose-200 hover:text-amber-300"
          >
            Digital SAT 진단기
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('admissions-showcase');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-rose-200 hover:text-amber-300"
          >
            명문대 합격 사례
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('curriculum');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-rose-200 hover:text-amber-300"
          >
            프레스티지 프로그램
          </button>
          <div className="pt-2 border-t border-rose-900">
            <button
              type="button"
              onClick={() => {
                onOpenConsult();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-amber-50 font-bold text-sm text-center min-h-[44px]"
            >
              1:1 프라이빗 입시 진단 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
