'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-md text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* 로고 */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-left"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded bg-amber-500 font-mono text-base font-black text-neutral-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            LM
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-base font-black tracking-widest text-white">LUMEN</span>
              <span className="rounded bg-amber-500/20 px-1 py-0.2 text-[9px] font-mono font-bold text-amber-400 border border-amber-500/40">
                BUILD
              </span>
            </div>
            <p className="text-[10px] tracking-wider text-neutral-400 uppercase">
              Commercial Architecture &amp; Construction
            </p>
          </div>
        </button>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden items-center gap-7 lg:flex">
          <button
            onClick={() => scrollToSection('showcase')}
            className="text-xs font-medium tracking-wide text-neutral-300 transition-colors hover:text-amber-400"
          >
            완공 꼬마빌딩 실적
          </button>
          <button
            onClick={() => scrollToSection('calculator')}
            className="text-xs font-medium tracking-wide text-neutral-300 transition-colors hover:text-amber-400"
          >
            신축 사업성 계산기
          </button>
          <button
            onClick={() => scrollToSection('strategy')}
            className="text-xs font-medium tracking-wide text-neutral-300 transition-colors hover:text-amber-400"
          >
            임대 수익 극대화 전략
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="text-xs font-medium tracking-wide text-neutral-300 transition-colors hover:text-amber-400"
          >
            원스톱 5단계 로드맵
          </button>
        </nav>

        {/* CTA 버튼 */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="rounded bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-neutral-950 shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all hover:from-amber-400 hover:to-amber-500"
          >
            무료 사업성 검토 신청
          </button>

          {/* 모바일 토글 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded border border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white lg:hidden"
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

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => scrollToSection('showcase')}
              className="text-left text-sm font-medium text-neutral-300 hover:text-amber-400"
            >
              완공 꼬마빌딩 실적
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-left text-sm font-medium text-neutral-300 hover:text-amber-400"
            >
              신축 사업성 계산기
            </button>
            <button
              onClick={() => scrollToSection('strategy')}
              className="text-left text-sm font-medium text-neutral-300 hover:text-amber-400"
            >
              임대 수익 극대화 전략
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-left text-sm font-medium text-neutral-300 hover:text-amber-400"
            >
              원스톱 5단계 로드맵
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
