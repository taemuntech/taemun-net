'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenReservation: (type?: string) => void;
}

export function Header({ onOpenReservation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#121110]/95 backdrop-blur-md border-b border-[#2d2926]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-left group min-h-[44px]"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c7322] flex items-center justify-center text-[#121110] font-serif font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
            🎹
          </div>
          <div>
            <span className="font-serif text-xl tracking-wider text-[#f5f0eb] font-semibold block">
              CHOPIN HAUS
            </span>
            <span className="text-[11px] text-[#c5a880] tracking-widest uppercase block">
              Piano Masterclass & Salon
            </span>
          </div>
        </button>

        {/* Desktop Nav - lg: only */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            type="button"
            onClick={() => scrollToSection('piano-section')}
            className="text-sm text-[#d4cfc9] hover:text-[#e0c298] transition-colors py-2"
          >
            인터랙티브 88건반
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('spectrum-section')}
            className="text-sm text-[#d4cfc9] hover:text-[#e0c298] transition-colors py-2"
          >
            어쿠스틱 잔향 분석
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('courses-section')}
            className="text-sm text-[#d4cfc9] hover:text-[#e0c298] transition-colors py-2"
          >
            마스터클래스 커리큘럼
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faculty-section')}
            className="text-sm text-[#d4cfc9] hover:text-[#e0c298] transition-colors py-2"
          >
            교수진 프로필
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('rooms-section')}
            className="text-sm text-[#d4cfc9] hover:text-[#e0c298] transition-colors py-2"
          >
            스타인웨이 살롱 대관
          </button>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenReservation('audition')}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89528] text-[#121110] text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-md min-h-[44px] flex items-center justify-center"
          >
            1:1 청강 및 진단 신청
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#d4cfc9] hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
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
        <div className="lg:hidden bg-[#1a1816] border-b border-[#2d2926] px-6 py-6 space-y-4">
          <button
            type="button"
            onClick={() => scrollToSection('piano-section')}
            className="block w-full text-left text-[#d4cfc9] hover:text-[#e0c298] py-2 text-base font-medium min-h-[44px]"
          >
            인터랙티브 88건반 체험
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('spectrum-section')}
            className="block w-full text-left text-[#d4cfc9] hover:text-[#e0c298] py-2 text-base font-medium min-h-[44px]"
          >
            스타인웨이 음향 잔향 분석
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('courses-section')}
            className="block w-full text-left text-[#d4cfc9] hover:text-[#e0c298] py-2 text-base font-medium min-h-[44px]"
          >
            입시 및 유학 커리큘럼
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faculty-section')}
            className="block w-full text-left text-[#d4cfc9] hover:text-[#e0c298] py-2 text-base font-medium min-h-[44px]"
          >
            유럽·미국 명문 교수진
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('rooms-section')}
            className="block w-full text-left text-[#d4cfc9] hover:text-[#e0c298] py-2 text-base font-medium min-h-[44px]"
          >
            연습실 및 홀 대관 안내
          </button>
        </div>
      )}
    </header>
  );
}
