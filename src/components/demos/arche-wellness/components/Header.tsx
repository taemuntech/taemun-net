'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  onOpenTrial: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTrial }) => {
  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#faf7f2]/90 backdrop-blur-md border-b border-[#ebdcd0] transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/demo/arche-wellness" className="flex min-h-11 items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#d27952] flex items-center justify-center text-white font-serif font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
            A
          </div>
          <div>
            <span className="font-serif text-lg lg:text-xl font-bold tracking-widest text-[#3d322a] block uppercase">
              ARCHE WELLNESS
            </span>
            <span className="text-[10px] font-mono tracking-wider text-[#916b53] block">
              PRIVATE PILATES & SPA ATELIER
            </span>
          </div>
        </Link>

        {/* Desktop Nav — 「공간 힐링 철학」 항목은 해당 섹션이 없어 #philosophy 가 아무 데도 가지 않았다. 없는 화면 대신 링크를 걷어냈다. */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#6e5d50]">
          <a href="#zones" className="hover:text-[#d27952] transition-colors">
            스튜디오 조닝
          </a>
          <a href="#telemetry" className="hover:text-[#d27952] transition-colors">
            클린 에어 텔레메트리
          </a>
          <a href="#materials" className="hover:text-[#d27952] transition-colors">
            친환경 자재 아카이브
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenTrial}
            className="min-h-11 px-4 py-2.5 rounded-lg bg-[#d27952] hover:bg-[#b8613d] text-white font-semibold text-xs lg:text-sm shadow-md shadow-[#d27952]/20 transition-all active:scale-95 cursor-pointer"
          >
            웰니스 스튜디오 시공 상담
          </button>
        </div>
      </div>
    </header>
  );
};
