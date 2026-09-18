'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenConsultation: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Header({ onOpenConsultation, onNavigateSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '완공 프로젝트', id: 'section-projects' },
    { label: '멀티 챔버 공조', id: 'section-chamber' },
    { label: '특화 엔지니어링', id: 'section-tech' },
    { label: '공사비 시뮬레이터', id: 'section-calc' },
  ];

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full border-b border-cyan-900/40 bg-neutral-950/95 py-4 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded bg-gradient-to-br from-cyan-500 to-blue-600 font-mono text-sm font-black text-neutral-950 shadow-md shadow-cyan-500/20">
            LP
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-mono text-base font-black tracking-wider text-white">
              LOGIS<span className="text-cyan-400">PARK</span>
            </div>
            <p className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
              Cold-Chain &amp; Smart Logistics Builder
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigateSection(item.id)}
              className="text-xs font-medium tracking-wider text-neutral-300 transition-colors hover:text-cyan-400"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={onOpenConsultation}
            className="flex items-center gap-2 rounded bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-mono text-xs font-bold text-neutral-950 shadow-md shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            물류부지 인허가 &amp; 시공 견적 의뢰
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded border border-neutral-800 bg-neutral-900 text-neutral-300 lg:hidden"
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

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-cyan-900/40 bg-neutral-950 px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-xs font-medium text-neutral-300 hover:text-cyan-400"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full rounded bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-center font-mono text-xs font-bold text-neutral-950"
            >
              물류부지 인허가 &amp; 시공 견적 의뢰
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
