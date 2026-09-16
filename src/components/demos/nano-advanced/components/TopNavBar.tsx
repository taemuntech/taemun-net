import React, { useState } from 'react';
import { ArrowRight, Globe, Menu, X } from 'lucide-react';
import { LOGO_URL } from '../data/packagingData';

interface TopNavBarProps {
  onOpenConsultation: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'KR' | 'EN'>('KR');

  const navLinks = [
    { label: '기술 혁신', href: '#solutions', active: true },
    { label: '2.5D/3D 패키징 솔루션', href: '#layer-explorer', active: false },
    { label: '차세대 유리 기판 (Glass Core)', href: '#solutions', active: false },
    { label: '파운드리 수율 데이터', href: '#yield-metrics', active: false },
    { label: 'R&D 팹 캠퍼스', href: '#quality-standards', active: false },
    { label: 'IR 공시', href: '#footer-section', active: false },
  ];

  return (
    <header className="bg-[#f8f9ff]/90 backdrop-blur-md text-[#00288e] top-0 fixed w-full z-50 border-b border-[#c4c5d5]/30 shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full flex justify-between items-center h-16">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-x-2.5 active:scale-[0.98] transition-transform duration-100 ease-out group"
        >
          <img
            alt="NANO ADVANCED Brand Logo"
            className="h-8 w-auto object-contain"
            src={LOGO_URL} referrerPolicy="no-referrer" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-x-6 text-[13px] font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${ link.active ? 'text-[#00288e] font-bold border-b-2 border-[#00288e] pb-1' : 'text-[#444653] hover:text-[#00288e]' } transition-colors duration-150 active:scale-[0.98]`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Trailing Action Systems */}
        <div className="flex items-center gap-x-2">
          {/* Language Toggle */}
          <button
            aria-label="언어 변경"
            onClick={() => setLang(lang === 'KR' ? 'EN' : 'KR')}
            className="p-2 text-[#444653] hover:text-[#00288e] transition-colors rounded-lg flex items-center justify-center gap-1 text-xs font-semibold"
            type="button"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden font-mono">{lang}</span>
          </button>

          {/* CTA Button */}
          <button
            onClick={onOpenConsultation}
            className="bg-[#1e40af] text-white text-[12px] font-semibold px-3 py-2 rounded-lg hover:bg-[#00288e] transition-colors duration-150 active:scale-[0.98] shadow-sm flex items-center gap-x-1.5 cursor-pointer"
            type="button"
          >
            <span className="truncate">엔지니어링 샘플 및 수율 검토 신청</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#444653] hover:text-[#00288e]"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f8f9ff] border-b border-[#c4c5d5]/40 px-4 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#0b1c30] hover:text-[#00288e] border-b border-[#c4c5d5]/20 last:border-none"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-[#00288e] text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span>엔지니어링 기술 상담 접수</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
