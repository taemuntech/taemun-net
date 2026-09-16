import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/resorts';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyLang, setCurrencyLang] = useState<'KRW' | 'USD'>('KRW');

  const toggleCurrencyLang = () => {
    setCurrencyLang((prev) => (prev === 'KRW' ? 'USD' : 'KRW'));
  };

  return (
    // 공용 샘플 바(44px)에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다 — 바가 없으면 0px 라 화면은 그대로다.
    <header className="fixed top-[var(--sample-bar-h,0px)] left-0 right-0 z-50 bg-[#fcf9f3]/90 backdrop-blur-md border-b border-[#c6c7c0]/25 transition-all duration-300">
      <div className="w-full px-6 lg:px-14 py-3 lg:py-3.5 flex items-center justify-between mx-auto">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group" id="header-brand-logo">
          <img
            src={BRAND_LOGO_URL}
            alt="ATLAS RESORTS Brand Logo"
            className="w-7 h-7 object-contain transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <span className="font-editorial text-lg lg:text-xl tracking-[0.18em] text-[#030402] uppercase font-medium">
            ATLAS RESORTS &amp; PRIVATE VILLAS
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
          <a
            href="#collection"
            className="text-[#030402] border-b border-[#725b38] pb-1 text-[11px] uppercase tracking-[0.22em] font-medium transition-colors"
          >
            The Collection
          </a>
          <a
            href="#collection"
            className="text-[#454742] hover:text-[#030402] transition-colors text-[11px] uppercase tracking-[0.22em] font-medium"
          >
            Private Estates
          </a>
          <a
            href="#wellness"
            className="text-[#454742] hover:text-[#030402] transition-colors text-[11px] uppercase tracking-[0.22em] font-medium"
          >
            Wellness &amp; Spa
          </a>
          <a
            href="#wellness"
            className="text-[#454742] hover:text-[#030402] transition-colors text-[11px] uppercase tracking-[0.22em] font-medium"
          >
            Gastronomy
          </a>
          <a
            href="#calculator"
            className="text-[#454742] hover:text-[#030402] transition-colors text-[11px] uppercase tracking-[0.22em] font-medium"
          >
            Sanctuary Journeys
          </a>
        </nav>

        {/* Trailing Actions & Language */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={toggleCurrencyLang}
            id="lang-toggle-btn"
            className="flex items-center space-x-1.5 text-[#454742] hover:text-[#725b38] transition-colors text-[11px] uppercase tracking-[0.22em] font-medium"
            title="통화 및 언어 변경"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{currencyLang} / {currencyLang === 'KRW' ? 'KO' : 'EN'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenBooking}
            id="nav-book-button"
            className="hidden lg:inline-block bg-[#1c1e1a] text-[#fcf9f3] px-7 py-3 rounded text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-[#31312d] transition-colors duration-300"
          >
            Book a Sanctuary
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 text-[#030402] focus:outline-none"
            aria-label="모바일 메뉴 토글"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f0eee8] border-b border-[#c6c7c0]/30 px-6 py-6 space-y-4 shadow-sm animate-in fade-in duration-200">
          <a
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#030402] text-xs uppercase tracking-[0.2em] font-medium"
          >
            The Collection
          </a>
          <a
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#454742] text-xs uppercase tracking-[0.2em] font-medium"
          >
            Private Estates
          </a>
          <a
            href="#wellness"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#454742] text-xs uppercase tracking-[0.2em] font-medium"
          >
            Wellness &amp; Spa
          </a>
          <a
            href="#wellness"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#454742] text-xs uppercase tracking-[0.2em] font-medium"
          >
            Gastronomy
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#454742] text-xs uppercase tracking-[0.2em] font-medium"
          >
            Sanctuary Journeys
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full mt-3 bg-[#030402] text-[#fcf9f3] py-3 rounded text-xs uppercase tracking-[0.2em] font-medium"
          >
            Book a Sanctuary
          </button>
        </div>
      )}
    </header>
  );
};
