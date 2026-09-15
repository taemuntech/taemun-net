'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenJournal: () => void;
  onOpenPress: () => void;
  onOpenMaterialArchive: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenJournal,
  onOpenPress,
  onOpenMaterialArchive,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-[#faf9f7]/95 backdrop-blur-md text-[#161714] docked full-width top-0 sticky z-50 border-b border-[#c8c7bf]/30 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Studio Logo */}
        <a
          href="#"
          className="flex flex-col group cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="text-lg lg:text-xl font-bold tracking-[0.25em] uppercase text-[#161714] font-sans transition-colors group-hover:text-[#904b35]">
            ATELIER VAUCLUSE
          </span>
          <span className="text-[10px] lg:text-[11px] tracking-[0.28em] text-[#474741]/70 uppercase font-sans">
            Architecture &amp; Spatial Interior
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('philosophy')}
            className="text-xs uppercase tracking-[0.15em] text-[#474741] hover:text-[#161714] transition-colors duration-200 cursor-pointer"
          >
            Philosophy
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-xs uppercase tracking-[0.15em] text-[#474741] hover:text-[#161714] transition-colors duration-200 cursor-pointer"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="text-xs uppercase tracking-[0.15em] text-[#474741] hover:text-[#161714] transition-colors duration-200 cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={onOpenPress}
            className="text-xs uppercase tracking-[0.15em] text-[#474741] hover:text-[#161714] transition-colors duration-200 cursor-pointer"
          >
            Press
          </button>
          <button
            onClick={onOpenJournal}
            className="text-xs uppercase tracking-[0.15em] text-[#474741] hover:text-[#161714] transition-colors duration-200 cursor-pointer"
          >
            Journal
          </button>
          <button
            onClick={onOpenMaterialArchive}
            className="text-xs uppercase tracking-[0.15em] text-[#904b35] hover:text-[#161714] font-medium transition-colors duration-200 cursor-pointer"
          >
            Materials
          </button>
        </nav>

        {/* Trailing Action */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => scrollToSection('consultation')}
            className="bg-[#2b2b28] text-[#faf9f7] hover:bg-[#904b35] transition-colors duration-300 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded shadow-none cursor-pointer flex items-center gap-1.5"
          >
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#161714] hover:text-[#904b35] focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf9f7] border-b border-[#c8c7bf]/40 px-6 py-6 space-y-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => scrollToSection('philosophy')}
            className="block w-full text-left py-2 text-sm uppercase tracking-wider text-[#474741] hover:text-[#161714]"
          >
            Philosophy
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="block w-full text-left py-2 text-sm uppercase tracking-wider text-[#474741] hover:text-[#161714]"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="block w-full text-left py-2 text-sm uppercase tracking-wider text-[#474741] hover:text-[#161714]"
          >
            Process
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPress();
            }}
            className="block w-full text-left py-2 text-sm uppercase tracking-wider text-[#474741] hover:text-[#161714]"
          >
            Press
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenJournal();
            }}
            className="block w-full text-left py-2 text-sm uppercase tracking-wider text-[#474741] hover:text-[#161714]"
          >
            Journal
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMaterialArchive();
            }}
            className="block w-full text-left py-2 text-sm uppercase tracking-wider text-[#904b35] font-medium"
          >
            Materials &amp; Detail Archive
          </button>
          <div className="pt-2">
            <button
              onClick={() => scrollToSection('consultation')}
              className="w-full bg-[#2b2b28] text-[#faf9f7] py-3 rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-[#904b35] transition-colors"
            >
              <span>1:1 상담 예약 신청</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
