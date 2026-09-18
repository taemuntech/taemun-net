'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenTrial: () => void;
  onScrollTo: (id: string) => void;
}

export function Header({ onOpenTrial, onScrollTo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#070B14]/90 backdrop-blur-md border-b border-orange-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-mono font-black text-slate-950 text-xl shadow-lg shadow-orange-500/20">
            K
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black tracking-wider text-lg lg:text-xl text-white">
                KINETICS
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                STEM LAB
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              키네틱스 영재로봇공학 &amp; 피지컬컴퓨팅 센터
            </p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <button
            type="button"
            onClick={() => onScrollTo('robot-lab')}
            className="hover:text-orange-400 transition-colors cursor-pointer"
          >
            4자유도 로봇암 Lab
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('projects-archive')}
            className="hover:text-orange-400 transition-colors cursor-pointer"
          >
            수강생 공학 프로젝트
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('curriculum')}
            className="hover:text-orange-400 transition-colors cursor-pointer"
          >
            영재 &amp; 대회 커리큘럼
          </button>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <span className="text-xs font-mono text-zinc-400">
            TEL: 02-0000-0000
          </span>
          <button
            type="button"
            onClick={onOpenTrial}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-orange-500/25 min-h-[44px] cursor-pointer"
          >
            1:1 공학 적성 체험 신청
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label="모바일 메뉴 토글"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0F1D] border-b border-orange-500/20 px-4 py-4 space-y-3">
          <button
            type="button"
            onClick={() => {
              onScrollTo('robot-lab');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-orange-400"
          >
            4자유도 로봇암 Lab
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('projects-archive');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-orange-400"
          >
            수강생 공학 프로젝트
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('curriculum');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-orange-400"
          >
            영재 &amp; 대회 커리큘럼
          </button>
          <div className="pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => {
                onOpenTrial();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-sm text-center min-h-[44px]"
            >
              1:1 공학 적성 체험 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
