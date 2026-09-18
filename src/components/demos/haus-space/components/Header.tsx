'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/portfolioData';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Selected Works', href: '#selected-works' },
    { label: 'Transformation', href: '#transformation' },
    { label: 'Process & Atelier', href: '#process-atelier' },
    { label: 'Material Archive', href: '#material-archive' },
    { label: 'Press & Recognition', href: '#press-recognition' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // 공용 샘플 바에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다 — 바가 없으면 0px 라 화면은 그대로다.
    <header className="sticky top-[var(--sample-bar-h,0px)] z-50 backdrop-blur-md bg-[#121315]/85 border-b border-white/10 transition-all duration-300">
      <div className="w-full px-5 lg:px-16 max-w-[1440px] mx-auto flex items-center justify-between h-20">
        {/* Brand Logo — 예전엔 빈 앵커라 눌러도 아무 일이 없었다. 맨 위로 올리는 버튼으로 바꿨다.
            로고가 높이 기준으로만 커서 상자가 40px 폭에 그쳤다 — 탭 대상 44px 를 채우려고 최소 폭만 더했다(로고 크기·위치는 그대로). */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="맨 위로"
          className="flex items-center gap-3 group min-h-11 min-w-11 cursor-pointer"
        >
          <img
            src={BRAND_LOGO_URL}
            alt="HAUS & SPACE 브랜드 로고"
            className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
          />
        </button>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs uppercase tracking-[0.14em] transition-colors duration-300 ${
                idx === 0
                  ? 'text-[#e2c399] border-b border-[#e2c399]/80 pb-1 font-medium'
                  : 'text-[#d1c5b8]/80 hover:text-[#e2c399]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Trailing Action */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="hidden lg:inline-flex items-center justify-center bg-[#c5a880] text-[#121315] font-semibold px-6 py-2.5 text-xs tracking-[0.16em] uppercase border border-[#c5a880] hover:bg-[#e0c298] hover:border-[#e0c298] shadow-[0_0_20px_rgba(197,168,128,0.15)] transition-all duration-300 cursor-pointer"
          >
            Private Consultation
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-11 w-11 items-center justify-center text-[#e2c399] hover:text-[#dac3a6] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1b1c1e] border-b border-white/10 px-6 py-6 transition-all duration-300 animate-in fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.14em] text-[#d1c5b8] hover:text-[#e2c399] min-h-11 py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880]" />
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="mt-4 w-full text-center bg-[#c5a880] text-[#121315] font-semibold py-3 text-xs tracking-[0.16em] uppercase hover:bg-[#e0c298] transition cursor-pointer"
            >
              Private Consultation
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
