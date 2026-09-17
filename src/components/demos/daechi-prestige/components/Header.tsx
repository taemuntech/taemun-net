'use client';

import React, { useState, useEffect } from 'react';
import { ASSETS } from '../data/mockData';

interface HeaderProps {
  onOpenReservation: () => void;
  onOpenVipModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation, onOpenVipModal }) => {
  const [activeSection, setActiveSection] = useState('admission-diagram');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        'admission-diagram',
        'killer-anatomy',
        '168h-loop',
        'simulator',
        'reservation-section',
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyVipPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText('02-0000-0000');
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const navLinks = [
    { id: 'admission-diagram', label: '합격 진단 다이어그램' },
    { id: 'killer-anatomy', label: '킬러문항 해부도' },
    { id: '168h-loop', label: '168시간 학습루프' },
    { id: 'simulator', label: '모의지원 시뮬레이터' },
    { id: 'reservation-section', label: '입학 진단 예약' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-[var(--sample-bar-h,0px)] w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fdf9f5]/95 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
          : 'bg-[#fdf9f5]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]'
      }`}
    >
      <div className="h-20 max-w-[1320px] mx-auto px-4 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 shrink-0 group text-left cursor-pointer"
        >
          <img
            alt="Daechi Prestige Academic Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={ASSETS.logo}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-[18px] lg:text-[20px] text-on-surface tracking-tight font-serif font-semibold">
              DAECHI PRESTIGE
            </span>
            <span className="font-label-sm text-[10px] lg:text-[11px] text-primary uppercase tracking-widest font-semibold">
              대치 프레스티지 의치약한 전문관 (예시)
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors py-2 text-sm font-medium cursor-pointer min-h-[44px] flex items-center ${
                  isActive
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* VIP Direct Phone */}
          <button
            onClick={copyVipPhone}
            title="클릭하여 VIP 직통 번호 복사"
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)] cursor-pointer min-h-[44px]"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-sm text-on-surface-variant">VIP 직통</span>
            <span className="font-title-md text-sm text-primary font-bold tracking-wide">
              {phoneCopied ? '번호 복사완료' : '02-0000-0000'}
            </span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenReservation}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-inverse-surface text-surface text-xs lg:text-sm font-semibold shadow-[0_4px_16px_rgba(114,91,56,0.18)] hover:bg-on-surface hover:shadow-lg transition-all cursor-pointer min-h-[44px]"
          >
            <span className="material-symbols-outlined text-[16px] text-primary-fixed-dim mr-1.5">
              school
            </span>
            <span>1:1 정밀진단 레벨테스트 신청</span>
          </button>

          {/* VIP Portal / Profile Icon */}
          <button
            onClick={onOpenVipModal}
            title="학부모 VIP 전용 포털"
            aria-label="학부모 VIP 전용 포털 열기"
            className="w-11 h-11 rounded-full bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center transition-colors cursor-pointer shrink-0 min-h-[44px] min-w-[44px]"
          >
            <span className="material-symbols-outlined text-on-primary text-[20px]">
              person
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-on-surface hover:text-primary transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="모바일 메뉴 열기"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-surface-container px-6 py-4 flex flex-col gap-3 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection(link.id);
              }}
              className="py-2 text-on-surface hover:text-primary font-medium text-sm flex items-center justify-between border-b border-surface-container-low min-h-[44px] text-left cursor-pointer"
            >
              <span>{link.label}</span>
              <span className="material-symbols-outlined text-xs text-primary">
                chevron_right
              </span>
            </button>
          ))}
          <div className="pt-2 flex items-center justify-between text-xs text-on-surface-variant">
            <span>VIP 직통: 02-0000-0000</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="text-primary font-bold underline min-h-[44px] flex items-center cursor-pointer"
            >
              레벨테스트 예약
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
