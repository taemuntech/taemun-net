'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  onOpenReserve: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReserve }) => {
  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/demo/nouveau-dining" className="flex min-h-11 items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            N
          </div>
          <div>
            <span className="font-serif text-lg lg:text-xl font-bold tracking-widest text-stone-100 block uppercase">
              NOUVEAU DINING
            </span>
            <span className="text-[10px] font-mono tracking-wider text-amber-300/80 block">
              BISTRO & SPATIAL ATELIER
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
          <a href="#zones" className="hover:text-amber-300 transition-colors">
            공간 조닝 (Zoning)
          </a>
          <a href="#lighting" className="hover:text-amber-300 transition-colors">
            조도 시뮬레이션
          </a>
          <a href="#materials" className="hover:text-amber-300 transition-colors">
            마감재 아카이브
          </a>
          {/* 「디자인 철학(#philosophy)」 링크는 지웠다 — 그런 섹션이 이 화면에 없어 눌러도 아무 데도 가지 않았다. */}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReserve}
            type="button"
            className="min-h-11 px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs lg:text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer break-keep"
          >
            F&B 공간 상담 신청
          </button>
        </div>
      </div>
    </header>
  );
};
