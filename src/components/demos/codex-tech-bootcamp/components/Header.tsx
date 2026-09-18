'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenApply: () => void;
  onScrollTo: (id: string) => void;
}

export function Header({ onOpenApply, onScrollTo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#030712]/90 backdrop-blur-md border-b border-emerald-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-mono font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
            &gt;_
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black tracking-wider text-lg lg:text-xl text-white">
                CODEX
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                TECH CAMP
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">
              코덱스 아카데미 풀스택 &amp; AI 엔지니어링 랩
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300 font-mono">
          <button
            type="button"
            onClick={() => onScrollTo('terminal-sandbox')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            터미널 샌드박스
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('commit-heatmap')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            16주 몰입 잔디
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('projects-showcase')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            프로덕션 프로젝트
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('curriculum')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            실무 커리큘럼
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <span className="text-xs font-mono text-zinc-400">
            TEL: 02-0000-0000
          </span>
          <button
            type="button"
            onClick={onOpenApply}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 min-h-[44px] cursor-pointer font-mono"
          >
            1:1 코딩테스트 &amp; 상담 신청
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
        <div className="lg:hidden bg-[#0B0F17] border-b border-emerald-500/20 px-4 py-4 space-y-3 font-mono">
          <button
            type="button"
            onClick={() => {
              onScrollTo('terminal-sandbox');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-emerald-400"
          >
            터미널 샌드박스
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('commit-heatmap');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-emerald-400"
          >
            16주 몰입 잔디
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('projects-showcase');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-emerald-400"
          >
            프로덕션 프로젝트
          </button>
          <button
            type="button"
            onClick={() => {
              onScrollTo('curriculum');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-emerald-400"
          >
            실무 커리큘럼
          </button>
          <div className="pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => {
                onOpenApply();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm text-center min-h-[44px]"
            >
              1:1 코딩테스트 &amp; 상담 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
