"use client";

import React, { useState } from 'react';
import { Globe, Menu, X, Shield, CalendarCheck } from 'lucide-react';
import { LOGO_URL, NAV_ITEMS } from '../data';

interface HeaderProps {
  onOpenProposal: () => void;
  onOpenVisit: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenProposal,
  onOpenVisit,
  activeSection = 'business',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'KR' | 'EN' | 'CN' | 'JP'>('KR');

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#c3c6d6]/30 shadow-xs transition-all duration-200">
      <div className="flex justify-between items-center w-full px-6 max-w-[1320px] mx-auto h-20">
        {/* Logo + Brand Identifier */}
        <a
          href="#"
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          id="header-brand-logo"
        >
          <img
            src={LOGO_URL}
            alt="Wonik QnC Logo"
            className="h-10 w-10 object-contain transition-transform duration-200 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <span className="text-2xl font-extrabold tracking-tight text-[#003d9b]">
            WONIK QnC
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isCurrent =
              item.href.replace('#', '') === activeSection ||
              (item.isActive && activeSection === 'business');
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`text-[15px] font-medium transition-colors cursor-pointer pb-1 ${
                  isCurrent
                    ? 'text-[#003d9b] border-b-2 border-[#003d9b] font-semibold'
                    : 'text-[#434654] hover:text-[#003d9b]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Trailing Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <div className="hidden lg:flex items-center border border-[#c3c6d6]/50 rounded-md px-2.5 py-1.5 bg-white text-xs text-[#434654] font-mono shadow-2xs">
            <Globe className="w-3.5 h-3.5 mr-1.5 text-[#003d9b]" />
            {(['KR', 'EN', 'CN', 'JP'] as const).map((lang, idx) => (
              <React.Fragment key={lang}>
                {idx > 0 && <span className="mx-1 text-[#c3c6d6]">|</span>}
                <button
                  type="button"
                  onClick={() => setCurrentLang(lang)}
                  className={`hover:text-[#003d9b] transition-colors cursor-pointer ${
                    currentLang === lang ? 'font-bold text-[#003d9b]' : ''
                  }`}
                >
                  {lang}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Partner Proposal Button */}
          <button
            type="button"
            onClick={onOpenProposal}
            id="btn-partner-proposal"
            className="hidden lg:inline-flex items-center justify-center px-3.5 py-2 rounded-md bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#003d9b] font-medium text-xs tracking-wide transition-all shadow-2xs border border-white/60 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 mr-1 text-[#003d9b]" />
            신규협력제안
          </button>

          {/* Visit Reservation Button */}
          <button
            type="button"
            onClick={onOpenVisit}
            id="btn-visit-reservation"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#0052cc] hover:bg-[#003d9b] text-white font-medium text-xs tracking-wide shadow-sm transition-all cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5 mr-1" />
            방문예약
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="lg:hidden p-2 text-[#131b2e] hover:text-[#003d9b] rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#c3c6d6]/40 px-6 py-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-3 text-base text-[#131b2e] font-medium">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="text-left py-2 hover:text-[#003d9b] border-b border-gray-100 last:border-0"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#c3c6d6]/30 flex flex-col gap-2">
            <div className="flex items-center justify-center gap-3 py-2 bg-gray-50 rounded text-xs font-mono text-[#434654]">
              <Globe className="w-3.5 h-3.5 text-[#003d9b]" />
              {(['KR', 'EN', 'CN', 'JP'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`px-1.5 py-0.5 rounded ${
                    currentLang === lang ? 'bg-[#003d9b] text-white font-bold' : ''
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProposal();
                }}
                className="flex-1 text-center py-2.5 bg-[#e2e7ff] text-xs font-medium text-[#003d9b] rounded-md"
              >
                신규협력제안
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVisit();
                }}
                className="flex-1 text-center py-2.5 bg-[#0052cc] text-xs font-medium text-white rounded-md"
              >
                방문예약
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
