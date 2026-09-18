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
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* 로고 */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-left"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-stone-900 font-serif text-lg font-bold text-stone-100 shadow-sm">
            A
          </div>
          <div>
            <span className="font-serif text-base font-bold tracking-widest text-stone-900">
              ARCHE HOUSE
            </span>
            <p className="text-[10px] tracking-wider text-stone-500 uppercase">
              Architects &amp; Builders
            </p>
          </div>
        </button>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden items-center gap-8 lg:flex">
          <button
            onClick={() => scrollToSection('projects')}
            className="text-xs font-medium tracking-wide text-stone-600 transition-colors hover:text-stone-950"
          >
            완공 프로젝트
          </button>
          <button
            onClick={() => scrollToSection('philosophy')}
            className="text-xs font-medium tracking-wide text-stone-600 transition-colors hover:text-stone-950"
          >
            건축 철학
          </button>
          <button
            onClick={() => scrollToSection('estimator')}
            className="text-xs font-medium tracking-wide text-stone-600 transition-colors hover:text-stone-950"
          >
            예상 건축비 가이드
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="text-xs font-medium tracking-wide text-stone-600 transition-colors hover:text-stone-950"
          >
            진행 프로세스
          </button>
        </nav>

        {/* CTA 버튼 */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="rounded-sm bg-stone-900 px-4 py-2 text-xs font-medium text-stone-100 transition-all hover:bg-stone-800 shadow-sm"
          >
            1:1 건축 상담 신청
          </button>

          {/* 모바일 토글 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-stone-300 text-stone-700 hover:text-stone-950 lg:hidden"
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
        <div className="border-b border-stone-200 bg-white px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => scrollToSection('projects')}
              className="text-left text-sm font-medium text-stone-700 hover:text-stone-950"
            >
              완공 프로젝트
            </button>
            <button
              onClick={() => scrollToSection('philosophy')}
              className="text-left text-sm font-medium text-stone-700 hover:text-stone-950"
            >
              건축 철학
            </button>
            <button
              onClick={() => scrollToSection('estimator')}
              className="text-left text-sm font-medium text-stone-700 hover:text-stone-950"
            >
              예상 건축비 가이드
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-left text-sm font-medium text-stone-700 hover:text-stone-950"
            >
              진행 프로세스
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
