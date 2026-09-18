'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenConsultation: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Header({ onOpenConsultation, onNavigateSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '완공 실적', id: 'section-portfolio' },
    { label: 'BIM 4D 스마트 관제', id: 'section-bim' },
    { label: '턴키 솔루션', id: 'section-turnkey' },
    { label: '공사비 시뮬레이터', id: 'section-calculator' },
  ];

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full border-b border-slate-800 bg-slate-950/95 py-4 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-indigo-700 font-mono text-sm font-black text-white shadow-md shadow-blue-500/20">
            MB
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-mono text-base font-black tracking-wider text-white">
              METRO<span className="text-blue-400">BUILD</span>
            </div>
            <p className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
              General Construction &amp; Turnkey
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigateSection(item.id)}
              className="text-xs font-medium tracking-wider text-slate-300 transition-colors hover:text-blue-400"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={onOpenConsultation}
            className="flex items-center gap-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:from-blue-500 hover:to-indigo-500"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            신축 부지 턴키 견적 의뢰
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded border border-slate-800 bg-slate-900 text-slate-300 lg:hidden"
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
        <div className="border-b border-slate-800 bg-slate-950 px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-xs font-medium text-slate-300 hover:text-blue-400"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full rounded bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-center font-mono text-xs font-bold text-white"
            >
              신축 부지 턴키 견적 의뢰
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
