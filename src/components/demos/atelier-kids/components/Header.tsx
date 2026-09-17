'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenTrialModal: (ageGroup?: string) => void;
}

export function Header({ onOpenTrialModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-left group min-h-[44px]"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#E07A5F] flex items-center justify-center text-white text-xl shadow-md group-hover:rotate-6 transition-transform">
            🎨
          </div>
          <div>
            <span className="font-serif text-xl tracking-tight text-[#2D2A26] font-bold block">
              ATELIER KIDS
            </span>
            <span className="text-[11px] text-[#81B29A] tracking-wider font-semibold block uppercase">
              프랑스식 아동 감성미술원
            </span>
          </div>
        </button>

        {/* Desktop Nav - lg: only */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            type="button"
            onClick={() => scrollTo('collage-section')}
            className="text-sm font-medium text-[#4A453E] hover:text-[#E07A5F] transition-colors py-2"
          >
            비정형 꼴라주 캔버스
          </button>
          <button
            type="button"
            onClick={() => scrollTo('hud-section')}
            className="text-sm font-medium text-[#4A453E] hover:text-[#E07A5F] transition-colors py-2"
          >
            오감 발달 지표
          </button>
          <button
            type="button"
            onClick={() => scrollTo('curriculum-section')}
            className="text-sm font-medium text-[#4A453E] hover:text-[#E07A5F] transition-colors py-2"
          >
            연령별 커리큘럼
          </button>
          <button
            type="button"
            onClick={() => scrollTo('gallery-section')}
            className="text-sm font-medium text-[#4A453E] hover:text-[#E07A5F] transition-colors py-2"
          >
            어린이 작품 아카이브
          </button>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenTrialModal()}
            className="px-5 py-2.5 rounded-full bg-[#E07A5F] text-white text-sm font-semibold hover:bg-[#c9684f] active:scale-95 transition-all shadow min-h-[44px] flex items-center justify-center"
          >
            1회 무료 체험 신청
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A453E] hover:text-[#2D2A26] min-h-[44px] min-w-[44px] flex items-center justify-center"
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

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D9] px-6 py-6 space-y-3">
          <button
            type="button"
            onClick={() => scrollTo('collage-section')}
            className="block w-full text-left text-base font-medium text-[#4A453E] hover:text-[#E07A5F] py-2 min-h-[44px]"
          >
            비정형 꼴라주 캔버스 체험
          </button>
          <button
            type="button"
            onClick={() => scrollTo('hud-section')}
            className="block w-full text-left text-base font-medium text-[#4A453E] hover:text-[#E07A5F] py-2 min-h-[44px]"
          >
            연령별 감각 발달 지표 HUD
          </button>
          <button
            type="button"
            onClick={() => scrollTo('curriculum-section')}
            className="block w-full text-left text-base font-medium text-[#4A453E] hover:text-[#E07A5F] py-2 min-h-[44px]"
          >
            4~13세 연령별 커리큘럼
          </button>
          <button
            type="button"
            onClick={() => scrollTo('gallery-section')}
            className="block w-full text-left text-base font-medium text-[#4A453E] hover:text-[#E07A5F] py-2 min-h-[44px]"
          >
            어린이 전시 아카이브
          </button>
        </div>
      )}
    </header>
  );
}
