import React, { useState } from 'react';
import { MapPin, Clock, Phone, User, Menu, X, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeaderProps {
  onOpenBooking: () => void;
  lang: 'KR' | 'EN';
  setLang: (lang: 'KR' | 'EN') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-[var(--sample-bar-h,0px)] left-0 right-0 z-50 bg-[#fbf9f6]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eae8e5]">
      {/* Top Utility Ribbon */}
      <div className="bg-[#eae8e5] text-[#424845] border-b border-[#e4e2df]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-8 h-10 flex items-center justify-between text-xs tracking-wider">
          <div className="flex items-center gap-4 truncate">
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#745a2a] shrink-0" />
              <span className="truncate">{CLINIC_INFO.address} (발렛 파킹 상시 지원)</span>
            </span>
            <span className="hidden lg:inline text-[#c1c8c4]">•</span>
            <span className="hidden lg:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#745a2a] shrink-0" />
              <span>진료시간: 월-금 10:00 - 20:00 (야간진료) / 토 10:00 - 17:00</span>
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#745a2a] shrink-0" />
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="font-semibold text-[#00110b] hover:text-[#745a2a] transition-colors"
              >
                VIP Concierge: {CLINIC_INFO.phone}
              </a>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLang('KR')}
                className={`px-1 py-0.5 rounded transition-colors ${
                  lang === 'KR' ? 'text-[#00110b] font-bold underline' : 'text-[#727975] hover:text-[#00110b]'
                }`}
              >
                KR
              </button>
              <span className="text-[#c1c8c4]">|</span>
              <button
                type="button"
                onClick={() => setLang('EN')}
                className={`px-1 py-0.5 rounded transition-colors ${
                  lang === 'EN' ? 'text-[#00110b] font-bold underline' : 'text-[#727975] hover:text-[#00110b]'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 lg:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Crest & Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3.5 shrink-0 group"
        >
          <img
            src="/demo-media/the-noble-dermatology/the-noble-dermatology-07.png"
            alt="The Noble Cheongdam Logo"
            className="h-8 lg:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
           referrerPolicy="no-referrer" />
          <div className="flex flex-col">
            <span className="font-serif text-lg lg:text-xl font-medium tracking-tight text-[#00110b] leading-none">
              THE NOBLE
            </span>
            <span className="text-[10px] lg:text-xs text-[#745a2a] tracking-[0.22em] uppercase font-semibold mt-1">
              Cheongdam Medical
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => scrollToSection('philosophy')}
            className="text-[#424845] hover:text-[#00110b] py-2 tracking-wide transition-colors"
          >
            의원 철학
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('dermatologists')}
            className="text-[#424845] hover:text-[#00110b] py-2 tracking-wide transition-colors"
          >
            전문의 소개
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('signature-lifting')}
            className="text-[#424845] hover:text-[#00110b] py-2 tracking-wide transition-colors"
          >
            시그니처 리프팅
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('mark-vu-section')}
            className="text-[#424845] hover:text-[#00110b] py-2 tracking-wide transition-colors"
          >
            마크뷰 정밀 진단
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('private-suites')}
            className="text-[#424845] hover:text-[#00110b] py-2 tracking-wide transition-colors"
          >
            1인 프라이빗 룸
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('genuine-verification')}
            className="text-[#424845] hover:text-[#00110b] py-2 tracking-wide transition-colors"
          >
            정품 인증 센터
          </button>
        </nav>

        {/* Action Button & VIP Icon */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="relative inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2.5 rounded-lg bg-[#00110b] text-[#ffffff] text-xs lg:text-sm font-semibold tracking-wider shadow-[0_4px_20px_-4px_rgba(13,40,32,0.2)] hover:bg-[#0d2820] active:scale-95 transition-all duration-300"
          >
            <Calendar className="w-4 h-4 text-[#fedb9e]" />
            <span>1:1 프라이빗 예약</span>
          </button>

          <button
            type="button"
            onClick={onOpenBooking}
            aria-label="VIP Account"
            className="w-9 h-9 rounded-full bg-[#00110b] flex items-center justify-center text-[#ffffff] hover:bg-[#0d2820] transition-colors shrink-0"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="xl:hidden p-2 rounded-lg text-[#00110b] hover:bg-[#eae8e5] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fbf9f6] border-b border-[#eae8e5] px-6 py-5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 font-medium text-[#1b1c1a]">
            <button
              type="button"
              onClick={() => scrollToSection('philosophy')}
              className="text-left py-2 hover:text-[#745a2a] border-b border-[#efeeeb]"
            >
              의원 철학 (Philosophy)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('dermatologists')}
              className="text-left py-2 hover:text-[#745a2a] border-b border-[#efeeeb]"
            >
              전문의 소개 (Medical Faculty)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('signature-lifting')}
              className="text-left py-2 hover:text-[#745a2a] border-b border-[#efeeeb]"
            >
              시그니처 리프팅 (Signature Protocols)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('mark-vu-section')}
              className="text-left py-2 hover:text-[#745a2a] border-b border-[#efeeeb]"
            >
              마크뷰 정밀 진단 (Mark-Vu 4D Scan)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('private-suites')}
              className="text-left py-2 hover:text-[#745a2a] border-b border-[#efeeeb]"
            >
              1인 프라이빗 룸 (Single Suites)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('genuine-verification')}
              className="text-left py-2 hover:text-[#745a2a] border-b border-[#efeeeb]"
            >
              정품 인증 센터 (Authentication)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('location-hours')}
              className="text-left py-2 hover:text-[#745a2a]"
            >
              오시는 길 & 진료 안내 (Location)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
