'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenAudition: () => void;
}

export function Header({ onOpenAudition }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#0F0E11]/95 backdrop-blur-md border-b border-[#252229]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-left group min-h-[44px]"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D8829D] to-[#F4ACB7] flex items-center justify-center text-[#0F0E11] text-xl font-bold shadow-lg group-hover:scale-105 transition-transform">
            🩰
          </div>
          <div>
            <span className="font-serif text-xl tracking-wider text-[#F7F3F5] font-semibold block">
              ROYAL BALLET
            </span>
            <span className="text-[11px] text-[#F4ACB7] tracking-widest uppercase block font-semibold">
              Academy & Contemporary
            </span>
          </div>
        </button>

        {/* Desktop Nav - lg: only */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            type="button"
            onClick={() => scrollTo('anatomy-section')}
            className="text-sm font-medium text-[#C8BFC7] hover:text-[#F4ACB7] transition-colors py-2"
          >
            발레 5대 포지션 해부학 Lab
          </button>
          <button
            type="button"
            onClick={() => scrollTo('courses-section')}
            className="text-sm font-medium text-[#C8BFC7] hover:text-[#F4ACB7] transition-colors py-2"
          >
            입시 및 전문 클래스
          </button>
          <button
            type="button"
            onClick={() => scrollTo('performance-section')}
            className="text-sm font-medium text-[#C8BFC7] hover:text-[#F4ACB7] transition-colors py-2"
          >
            정기 갈라 공연 아카이브
          </button>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenAudition}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D8829D] to-[#F4ACB7] text-[#0F0E11] text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-md min-h-[44px] flex items-center justify-center"
          >
            1:1 체형 진단 & 오디션 신청
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#C8BFC7] hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
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
        <div className="lg:hidden bg-[#151319] border-b border-[#252229] px-6 py-6 space-y-3">
          <button
            type="button"
            onClick={() => scrollTo('anatomy-section')}
            className="block w-full text-left text-base font-medium text-[#C8BFC7] hover:text-[#F4ACB7] py-2 min-h-[44px]"
          >
            발레 5대 포지션 해부학 Lab
          </button>
          <button
            type="button"
            onClick={() => scrollTo('courses-section')}
            className="block w-full text-left text-base font-medium text-[#C8BFC7] hover:text-[#F4ACB7] py-2 min-h-[44px]"
          >
            바가노바 영재 입시 커리큘럼
          </button>
          <button
            type="button"
            onClick={() => scrollTo('performance-section')}
            className="block w-full text-left text-base font-medium text-[#C8BFC7] hover:text-[#F4ACB7] py-2 min-h-[44px]"
          >
            정기 갈라 공연 아카이브
          </button>
        </div>
      )}
    </header>
  );
}
