'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenConsultation: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Header({ onOpenConsultation, onNavigateSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '항만 · 방파제 실적', id: 'section-projects' },
    { label: '메가 케이슨 공법', id: 'section-caisson' },
    { label: '항만 공사비 시뮬레이터', id: 'section-estimator' },
  ];

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full border-b border-sky-500/20 bg-slate-950/95 py-4 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 font-mono text-sm font-black text-slate-950 shadow-md shadow-sky-500/20">
            OM
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-mono text-base font-black tracking-wider text-white">
              OCEAN<span className="text-sky-400">MARINE</span>
            </div>
            <p className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
              Deepwater Port &amp; Offshore Caisson Civil E&amp;C
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigateSection(item.id)}
              className="text-xs font-medium tracking-wider text-slate-300 transition-colors hover:text-sky-400"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={onOpenConsultation}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 font-mono text-xs font-bold text-slate-950 shadow-md shadow-sky-500/20 transition-all hover:from-sky-400 hover:to-blue-500"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            항만 인프라 턴키 기술 자문 신청
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 lg:hidden"
          aria-label="메뉴 열기"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-sky-500/20 bg-slate-950 px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-xs font-medium text-slate-300 hover:text-sky-400"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-2.5 text-center font-mono text-xs font-bold text-slate-950"
            >
              항만 인프라 턴키 기술 자문 신청
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
