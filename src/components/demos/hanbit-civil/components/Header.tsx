'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onOpenConsultation: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Header({ onOpenConsultation, onNavigateSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '주요 메가 인프라', id: 'section-projects' },
    { label: '핵심 토목 공법', id: 'section-tech' },
    { label: '인프라 사업비 시뮬레이터', id: 'section-estimator' },
  ];

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full border-b border-amber-500/20 bg-neutral-950/95 py-4 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded bg-gradient-to-br from-amber-500 to-orange-600 font-mono text-sm font-black text-neutral-950 shadow-md shadow-amber-500/20">
            HB
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-mono text-base font-black tracking-wider text-white">
              HANBIT<span className="text-amber-400">CIVIL</span>
            </div>
            <p className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
              Infrastructure &amp; Mega Civil E&amp;C
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigateSection(item.id)}
              className="text-xs font-medium tracking-wider text-neutral-300 transition-colors hover:text-amber-400"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={onOpenConsultation}
            className="flex items-center gap-2 rounded bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 font-mono text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-orange-400"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            인프라 사업 기술 협력 문의
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
        <div className="border-b border-amber-500/20 bg-neutral-950 px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-xs font-medium text-neutral-300 hover:text-amber-400"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full rounded bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-center font-mono text-xs font-bold text-neutral-950"
            >
              인프라 사업 기술 협력 문의
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
