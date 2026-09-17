'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  onOpenTeaModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTeaModal }) => {
  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#1c1815]/95 backdrop-blur-md border-b border-[#382f29] transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/demo/jeonglim-tea" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#3d2f25] border border-[#6b5545] flex items-center justify-center text-[#f4ede2] font-serif font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
            靜
          </div>
          <div>
            <span className="font-serif text-lg lg:text-xl font-bold tracking-widest text-[#f4ede2] block">
              정림다원 (靜林茶院)
            </span>
            <span className="text-[10px] font-mono tracking-wider text-[#b39274] block uppercase">
              MODERN HANOK TEA ATELIER
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#c4b5a5]">
          <a href="#zones" className="hover:text-[#e8cb9e] transition-colors">
            한옥 공간 조닝
          </a>
          <a href="#pairing" className="hover:text-[#e8cb9e] transition-colors">
            날씨 & 차 앰비언스
          </a>
          <a href="#materials" className="hover:text-[#e8cb9e] transition-colors">
            전통 고재 자재
          </a>
          <a href="#philosophy" className="hover:text-[#e8cb9e] transition-colors">
            여백의 미학
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTeaModal}
            className="px-4 py-2.5 rounded-lg bg-[#6b5545] hover:bg-[#856b57] text-[#f4ede2] font-semibold text-xs lg:text-sm shadow-md transition-all active:scale-95 border border-[#8c715c] cursor-pointer"
          >
            한옥 다도 공간 시공 상담
          </button>
        </div>
      </div>
    </header>
  );
};
