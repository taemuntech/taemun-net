import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { LOGO_IMG_URL } from '../data/mockData';

interface HeaderProps {
  onOpenDeckModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDeckModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // 공용 샘플 바(44px)에 가리지 않게 top 을 변수로 둔다 — 바가 없으면 0px 라 지금 화면은 그대로다
    <header className="fixed top-[var(--sample-bar-h,0px)] left-0 right-0 z-50 bg-[#ffffff]/90 backdrop-blur-md shadow-xs border-b border-[#c4c5d5]/30 h-20">
      <div className="flex items-center justify-between px-6 lg:px-12 max-w-7xl mx-auto h-full">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center space-x-3 text-[20px] font-bold text-[#00288e] tracking-tight group"
        >
          <img 
            alt="Celebris Biopharma Logo" 
            className="h-10 w-10 object-contain rounded-lg shadow-xs group-hover:scale-105 transition-transform" 
            src={LOGO_IMG_URL}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-[20px] font-bold text-[#00288e] tracking-tight leading-tight">
              CELEBRIS BIOPHARMA
            </span>
            <span className="text-[11px] font-code-mono text-[#757684] uppercase tracking-wider">
              Oncology TPD & ADC
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('vision')} 
            className="text-[#00288e] font-semibold border-b-2 border-[#00288e] pb-1 transition-colors text-[13px] hover:text-[#1e40af] cursor-pointer"
          >
            Corporate Vision
          </button>
          <button 
            onClick={() => scrollToSection('pipeline')} 
            className="text-[#444653] font-medium hover:text-[#00288e] transition-colors text-[13px] cursor-pointer"
          >
            R&D Pipeline
          </button>
          <button 
            onClick={() => scrollToSection('platform')} 
            className="text-[#444653] font-medium hover:text-[#00288e] transition-colors text-[13px] cursor-pointer"
          >
            PROTEA-AI Platform
          </button>
          <button 
            onClick={() => scrollToSection('infrastructure')} 
            className="text-[#444653] font-medium hover:text-[#00288e] transition-colors text-[13px] cursor-pointer"
          >
            cGMP Infrastructure
          </button>
          <button 
            onClick={() => scrollToSection('sab')} 
            className="text-[#444653] font-medium hover:text-[#00288e] transition-colors text-[13px] cursor-pointer"
          >
            SAB
          </button>
          <button 
            onClick={() => scrollToSection('wizard')} 
            className="text-[#444653] font-medium hover:text-[#00288e] transition-colors text-[13px] cursor-pointer"
          >
            Global Partnerships
          </button>
        </nav>

        {/* Trailing Action */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => scrollToSection('wizard')}
            className="inline-flex items-center space-x-2 bg-[#1e40af] hover:bg-[#00288e] text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span>L/O & Partnering Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0b1c30] hover:text-[#00288e] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#c4c5d5]/40 px-6 py-4 space-y-3 shadow-lg">
          <button 
            onClick={() => scrollToSection('vision')} 
            className="block w-full text-left py-2 text-sm font-semibold text-[#00288e]"
          >
            Corporate Vision
          </button>
          <button 
            onClick={() => scrollToSection('pipeline')} 
            className="block w-full text-left py-2 text-sm font-medium text-[#444653]"
          >
            R&D Pipeline
          </button>
          <button 
            onClick={() => scrollToSection('platform')} 
            className="block w-full text-left py-2 text-sm font-medium text-[#444653]"
          >
            PROTEA-AI Platform
          </button>
          <button 
            onClick={() => scrollToSection('infrastructure')} 
            className="block w-full text-left py-2 text-sm font-medium text-[#444653]"
          >
            cGMP Infrastructure
          </button>
          <button 
            onClick={() => scrollToSection('sab')} 
            className="block w-full text-left py-2 text-sm font-medium text-[#444653]"
          >
            SAB
          </button>
          <button 
            onClick={() => scrollToSection('wizard')} 
            className="block w-full text-left py-2 text-sm font-medium text-[#444653]"
          >
            Global Partnerships
          </button>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => scrollToSection('wizard')}
              className="w-full flex items-center justify-center space-x-2 bg-[#1e40af] text-white py-2.5 rounded-lg text-sm font-medium"
            >
              <span>L/O & Partnering Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
