'use client';

import React from 'react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full bg-[#faf6f0]/90 backdrop-blur-md border-b border-[#ebdcd0]/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#eedbc9] border border-[#ddc2aa] flex items-center justify-center text-[#5c422c] font-bold text-lg shadow-sm">
            鳴
          </div>
          <div>
            <span className="font-serif text-lg lg:text-xl font-bold tracking-tight text-[#2e2319] block leading-none">
              RESONANCE · 공명
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#856b54] uppercase mt-0.5 block">
              Hi-Fi Audio & Acoustic Studio
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-[#6b523e] tracking-wider uppercase">
          <a href="#zones" className="hover:text-[#2e2319] transition-colors">
            Acoustic Zones
          </a>
          <a href="#rt60" className="hover:text-[#2e2319] transition-colors">
            RT60 Simulation
          </a>
          <a href="#materials" className="hover:text-[#2e2319] transition-colors">
            Sound Materials
          </a>
          <a href="#philosophy" className="hover:text-[#2e2319] transition-colors">
            Philosophy
          </a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 rounded-full bg-[#5c422c] hover:bg-[#473220] text-white text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
          >
            청음실 시공 상담
          </button>
        </div>
      </div>
    </header>
  );
};
