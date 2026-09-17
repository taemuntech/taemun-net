'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenEvaluation: () => void;
}

export function Header({ onOpenEvaluation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#16191F]/95 backdrop-blur-md border-b border-[#2A303C]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-left group min-h-[44px]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-105 transition-transform">
            🖌️
          </div>
          <div>
            <span className="font-serif text-xl tracking-tight text-white font-bold block">
              ATELIER BEAUX-ARTS
            </span>
            <span className="text-[11px] text-[#38BDF8] tracking-widest uppercase block font-semibold">
              명문 미대입시 & 디자인 조형 랩
            </span>
          </div>
        </button>

        {/* Desktop Nav - lg: only */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            type="button"
            onClick={() => scrollTo('gallery-3d-section')}
            className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors py-2"
          >
            3D 합격작 큐레이션 갤러리
          </button>
          <button
            type="button"
            onClick={() => scrollTo('exam-lab-section')}
            className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors py-2"
          >
            기출 발문 핀셋 해체 Lab
          </button>
          <button
            type="button"
            onClick={() => scrollTo('courses-section')}
            className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors py-2"
          >
            목표 대학별 커리큘럼
          </button>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenEvaluation}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-md min-h-[44px] flex items-center justify-center"
          >
            1:1 모의 실기 평가 신청
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#94A3B8] hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#16191F] border-b border-[#2A303C] px-6 py-6 space-y-3">
          <button
            type="button"
            onClick={() => scrollTo('gallery-3d-section')}
            className="block w-full text-left text-base font-medium text-[#94A3B8] hover:text-[#38BDF8] py-2 min-h-[44px]"
          >
            3D 합격작 큐레이션 갤러리
          </button>
          <button
            type="button"
            onClick={() => scrollTo('exam-lab-section')}
            className="block w-full text-left text-base font-medium text-[#94A3B8] hover:text-[#38BDF8] py-2 min-h-[44px]"
          >
            기출 발문 핀셋 해체 Lab
          </button>
          <button
            type="button"
            onClick={() => scrollTo('courses-section')}
            className="block w-full text-left text-base font-medium text-[#94A3B8] hover:text-[#38BDF8] py-2 min-h-[44px]"
          >
            목표 대학별 커리큘럼
          </button>
        </div>
      )}
    </header>
  );
}
