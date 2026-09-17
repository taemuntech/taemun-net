"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Sliders, ChevronRight } from 'lucide-react';

interface HeaderProps {
  currentLang: 'KR' | 'EN';
  onToggleLang: () => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  onOpenConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('company');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['company', 'divisions', 'rnd', 'quality', 'careers', 'consultation'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'company', label: currentLang === 'KR' ? '회사소개' : 'About Us' },
    { id: 'divisions', label: currentLang === 'KR' ? '사업영역' : 'Divisions' },
    { id: 'rnd', label: currentLang === 'KR' ? 'R&D 및 기술력' : 'R&D & Tech' },
    { id: 'quality', label: currentLang === 'KR' ? '품질경영' : 'Quality' },
    { id: 'careers', label: currentLang === 'KR' ? '인재경영' : 'Careers' },
    { id: 'consultation', label: currentLang === 'KR' ? '지속가능경영' : 'Sustainability' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf8ff]/95 backdrop-blur-md border-b border-[#c3c6d6]/40 shadow-xs transition-all duration-200">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-6 h-20">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3.5 group cursor-pointer focus:outline-hidden"
          id="header-logo-link"
        >
          <img
            src="/portfolio/hysfa/hysfa-02.png"
            alt="HANYANGSYSTEM Logo"
            referrerPolicy="no-referrer"
            className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-[20px] font-bold tracking-tight text-[#003d9b] leading-tight font-sans">
              한양시스템㈜
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#434654] uppercase font-semibold">
              HANYANGSYSTEM CO., LTD.
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                id={`nav-link-${item.id}`}
                className={`py-2 text-[15px] font-medium transition-all duration-150 border-b-2 ${
                  isActive
                    ? 'text-[#003d9b] border-[#003d9b] font-semibold'
                    : 'text-[#434654] border-transparent hover:text-[#003d9b] hover:border-[#003d9b]/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Trailing Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <button
            id="btn-language-toggle"
            type="button"
            onClick={onToggleLang}
            aria-label="Language Selector"
            className="flex items-center gap-1.5 text-[12px] font-mono text-[#434654] hover:text-[#003d9b] transition-colors py-1.5 px-3 border border-[#c3c6d6]/60 rounded-lg hover:border-[#003d9b] bg-white cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#003d9b]" />
            <span className={currentLang === 'KR' ? 'font-bold text-[#003d9b]' : 'text-slate-500'}>KR</span>
            <span className="text-[#c3c6d6]">/</span>
            <span className={currentLang === 'EN' ? 'font-bold text-[#003d9b]' : 'text-slate-500'}>EN</span>
          </button>

          {/* CTA Consultation Button */}
          <a
            href="#consultation"
            id="btn-nav-consultation"
            onClick={(e) => {
              // Smooth scroll to form or open directly
              const target = document.getElementById('consultation');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hidden lg:inline-flex items-center gap-2 bg-[#0052cc] hover:bg-[#003d9b] text-white font-medium text-[14px] px-5 py-2.5 rounded-lg shadow-xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>{currentLang === 'KR' ? '견적 및 기술 미팅 문의' : 'Inquiry & Quote'}</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            id="btn-mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#434654] hover:text-[#003d9b] hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#c3c6d6]/30 bg-[#faf8ff] px-6 py-5 shadow-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-md text-[15px] font-medium text-[#131b2e] hover:bg-[#eaedff] hover:text-[#003d9b] transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#737685]" />
              </a>
            ))}
            <div className="pt-3 border-t border-[#c3c6d6]/30">
              <a
                href="#consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#0052cc] text-white py-3 rounded-lg font-semibold text-[14px] shadow-xs"
              >
                <Sliders className="w-4 h-4" />
                <span>{currentLang === 'KR' ? '견적 및 기술 미팅 문의' : 'Inquiry & Quote'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
