'use client';

import React from 'react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full bg-[#fcf9f2]/90 backdrop-blur-md border-b border-[#ebdcd0]/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#f5e6bb] border border-[#e8d298] flex items-center justify-center text-[#735824] font-bold text-lg shadow-sm">
            RA
          </div>
          <div>
            <span className="font-serif text-lg lg:text-xl font-bold tracking-tight text-[#3b2e1e] block leading-none">
              RAON ATELIER
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#8c7456] uppercase mt-0.5 block">
              Kids Culture & Ed Architecture
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-[#6e5840] tracking-wider uppercase">
          <a href="#zones" className="hover:text-[#3b2e1e] transition-colors">
            Play Zones
          </a>
          <a href="#safety" className="hover:text-[#3b2e1e] transition-colors">
            Safety HUD
          </a>
          <a href="#materials" className="hover:text-[#3b2e1e] transition-colors">
            Eco Materials
          </a>
          <a href="#philosophy" className="hover:text-[#3b2e1e] transition-colors">
            Philosophy
          </a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 rounded-full bg-[#e39c44] hover:bg-[#c98330] text-white text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
          >
            키즈 공간 시공 상담
          </button>
        </div>
      </div>
    </header>
  );
};
