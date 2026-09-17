import React, { useState } from 'react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onNavigate,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'clinic-story', label: language === 'KR' ? '병원 소개' : 'About Clinic' },
    { id: 'specialists', label: language === 'KR' ? '각막 & 망막 의료진' : 'Specialists' },
    { id: 'procedure-comparison', label: language === 'KR' ? '7초 스마일프로' : '7s SMILE Pro' },
    { id: 'lens-simulator', label: language === 'KR' ? '노안 & 백내장' : 'Presbyopia & Cataract' },
    { id: 'diagnostic-suite', label: language === 'KR' ? '50가지 정밀검진' : '50-Step Exam' },
    { id: 'suitability-calculator', label: language === 'KR' ? '시력교정 계산기' : 'Suitability Test' },
  ];

  return (
    <header className="fixed top-[var(--sample-bar-h,0px)] left-0 right-0 z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)] bg-surface-container-lowest">
      {/* Top Utility Bar */}
      <div className="bg-surface-container-low text-on-surface-variant font-body-sm text-[13px] border-b border-surface-container/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-9 flex items-center justify-between">
          <div className="flex items-center gap-space-md overflow-hidden">
            <a
              href="#fast-track-section"
              className="flex items-center gap-space-xs font-label-numeric font-semibold text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>02-0000-0000</span>
            </a>
            <div className="hidden lg:flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[15px] text-tertiary">schedule</span>
              <span>
                {language === 'KR'
                  ? '평일 09:30~18:30 (금 야간 20:30) | 토 09:00~16:00'
                  : 'Mon-Thu 09:30~18:30 (Fri Night 20:30) | Sat 09:00~16:00'}
              </span>
            </div>
            <div className="hidden xl:flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[15px] text-primary">pin_drop</span>
              <span className="truncate">
                {language === 'KR'
                  ? '강남역 1번 출구 테헤란로 124 프라임 메디컬 타워 4-7F'
                  : 'Gangnam Station Exit 1, Teheran-ro 124, 4-7F'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs">
              <button
                type="button"
                onClick={() => onLanguageChange('KR')}
                className={`font-label-caps text-[11px] px-1.5 py-0.5 rounded ${
                  language === 'KR' ? 'text-primary font-bold bg-primary-fixed/40' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                KR
              </button>
              <span className="text-outline-variant text-[10px]">|</span>
              <button
                type="button"
                onClick={() => onLanguageChange('EN')}
                className={`font-label-caps text-[11px] px-1.5 py-0.5 rounded ${
                  language === 'EN' ? 'text-primary font-bold bg-primary-fixed/40' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                EN
              </button>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 font-label-caps text-[11px] text-secondary font-medium">
              <span className="w-2 h-2 rounded-full bg-primary-container inline-block animate-ping"></span>
              <span>SMILE Pro 7s Center</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-surface/90 backdrop-blur-xl h-20 border-b border-surface-container/30">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-space-md">
          {/* Logo */}
          <button
            type="button"
            onClick={() => onNavigate('hero-section')}
            className="flex items-center gap-space-md shrink-0 text-left cursor-pointer focus:outline-none"
          >
            <img
              src="/demo-media/prime-vision-eye-clinic/prime-vision-eye-clinic-07.png"
              alt="Prime Vision Eye Clinic Logo"
              className="h-8 w-auto object-contain"
             referrerPolicy="no-referrer" />
            <div className="flex flex-col">
              <span className="font-headline-sm text-[18px] font-bold text-on-surface leading-tight tracking-tight">
                PRIME VISION
              </span>
              <span className="font-label-caps text-[11px] text-secondary font-semibold">
                {language === 'KR' ? '프라임 스마트 아이 안과' : 'Precision Ophthalmic Center'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-2 rounded-lg transition-colors font-body-sm text-[14px] ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action & CTA */}
          <div className="flex items-center gap-space-sm shrink-0">
            <div className="hidden lg:flex flex-col text-right pr-2">
              <span className="font-label-caps text-[11px] text-on-surface-variant">
                {language === 'KR' ? '빠른 수술 문의' : 'Direct Call'}
              </span>
              <span className="font-label-numeric text-[14px] font-bold text-primary">
                02-0000-0000
              </span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('fast-track-section')}
              className="animate-pulse-subtle flex items-center gap-space-xs bg-primary-container text-on-primary-container font-headline-sm text-[13px] lg:text-[14px] px-3.5 lg:px-space-md py-2.5 rounded-full shadow-[0_4px_12px_rgba(14,165,233,0.25)] hover:bg-primary hover:text-on-primary transition-all font-semibold active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              <span className="whitespace-nowrap">
                {language === 'KR' ? '원데이 당일 검사·수술' : '1-Day Fast-Track'}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-container-lowest border-b border-surface-container px-6 py-4 shadow-xl flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2.5 px-3 rounded-lg text-[15px] font-medium text-on-surface hover:bg-surface-container-low transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
