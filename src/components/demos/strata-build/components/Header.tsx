'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onOpenConsultation: () => void;
  activeSection: string;
}

export default function Header({ onOpenConsultation, activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'timelapse', label: '공정 타임랩스' },
    { id: 'hud', label: '현장 감리 HUD' },
    { id: 'landmarks', label: '메가 랜드마크' },
    { id: 'materials', label: '구조재 아카이브' },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full border-b border-amber-500/30 bg-slate-950/90 backdrop-blur-md">
      {/* 상단 러기드 텔레메트리 바 */}
      <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-1.5 text-[11px] font-mono text-slate-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
              LIVE TELEMETRY
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">SITE: 강남 테크타워 04구역</span>
            <span className="hidden text-slate-600 lg:inline">|</span>
            <span className="hidden text-slate-400 lg:inline">GPS: N 37°30&apos;04&quot; E 127°02&apos;21&quot;</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-slate-400 lg:inline">LINK: 5G RUGGED VPN</span>
            <span className="hidden text-slate-600 lg:inline">|</span>
            <span className="text-emerald-400">STATUS: NORMAL</span>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5">
        {/* 로고 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2.5 text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded border border-amber-500/60 bg-amber-500/10 font-mono text-lg font-black tracking-tighter text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:border-amber-400 group-hover:bg-amber-500/20">
              ST
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-widest text-white">STRATA</span>
                <span className="rounded bg-amber-500/20 px-1 py-0.2 text-[9px] font-mono font-bold tracking-wider text-amber-400 border border-amber-500/30">
                  MEGA-BUILD
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-tight text-slate-400">
                스트라타 종합건설 · 시공 엔지니어링
              </p>
            </div>
          </button>
        </div>

        {/* 데스크톱 네비게이션 (lg: 에서만 노출) */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`rounded px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* 액션 버튼 */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenConsultation}
            className="flex items-center gap-1.5 rounded border border-amber-500/80 bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>합동 감리 및 견적 신청</span>
          </button>

          {/* 모바일 햄버거 토글 (lg: 에서는 숨김) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded border border-slate-700 bg-slate-900 text-slate-300 hover:text-white lg:hidden"
            aria-label="메뉴 열기"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 (lg: 에서는 숨김) */}
      {isMobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center justify-between rounded px-3 py-2 text-left text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-amber-400"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-slate-500">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
