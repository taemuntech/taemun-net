import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import type { Currency, NavTarget } from '../types';

interface HeaderProps {
  onOpenBooking: () => void;
  currency: Currency;
  onToggleCurrency: () => void;
  /** 메뉴는 이동만 하지 않는다 — 컬렉션 필터·익스피리언스 탭까지 그 항목에 맞게 바꾼다 */
  onNavigate: (target: NavTarget) => void;
  activeNav: NavTarget;
}

const NAV_ITEMS: { target: NavTarget; label: string; href: string }[] = [
  { target: 'collection', label: 'The Collection', href: '#collection' },
  { target: 'estates', label: 'Private Estates', href: '#collection' },
  { target: 'wellness', label: 'Wellness & Spa', href: '#wellness' },
  { target: 'gastronomy', label: 'Gastronomy', href: '#wellness' },
  { target: 'journeys', label: 'Sanctuary Journeys', href: '#wellness' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  currency,
  onToggleCurrency,
  onNavigate,
  activeNav,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: NavTarget) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    // 공용 샘플 바(44px)에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다 — 바가 없으면 0px 라 화면은 그대로다.
    <header className="fixed top-[var(--sample-bar-h,0px)] left-0 right-0 z-50 bg-[#fcf9f3]/90 backdrop-blur-md border-b border-[#c6c7c0]/25 transition-all duration-300">
      <div className="w-full px-4 lg:px-14 py-2.5 lg:py-3.5 flex items-center justify-between gap-3 mx-auto">
        {/* Brand Logo & Name — 맨 위로 되돌린다(예전에는 빈 앵커라 아무 데도 가지 않았다) */}
        <a href="#top" className="flex min-h-11 items-center gap-2.5 group min-w-0" id="header-brand-logo">
          <BrandMark className="w-7 h-7 shrink-0 transition-transform duration-500 group-hover:scale-105" />
          {/* 375px 에서 정식 명칭이 석 줄로 접혀 헤더가 110px 까지 커졌다 — lg 미만은 짧은 표기를 쓴다 */}
          <span className="lg:hidden font-editorial text-[13px] tracking-[0.14em] text-[#030402] uppercase font-medium whitespace-nowrap">
            Atlas Resorts
          </span>
          {/*
            정식 명칭은 whitespace-nowrap 이라 폭이 안 줄고 오른쪽 내비 첫 항목 위로 겹쳐 찍혔다
            (실측 겹침: 1280 298px · 1440 138px · 1536 42px · 1680 해소).
            부제 「& PRIVATE VILLAS」만 아주 넓은 화면에서 붙여 lg~2xl 구간의 겹침을 없앤다 — 서체·자간·크기는 그대로.
          */}
          <span className="hidden lg:inline font-editorial text-base xl:text-lg tracking-[0.16em] text-[#030402] uppercase font-medium whitespace-nowrap">
            ATLAS RESORTS<span className="hidden min-[1700px]:inline"> &amp; PRIVATE VILLAS</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = item.target === activeNav;
            return (
              <a
                key={item.target}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.target)}
                aria-current={isActive ? 'true' : undefined}
                className={`whitespace-nowrap text-[11px] uppercase tracking-[0.2em] font-medium transition-colors border-b pb-1 ${
                  isActive
                    ? 'text-[#030402] border-[#725b38]'
                    : 'text-[#454742] border-transparent hover:text-[#030402]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Trailing Actions & Currency */}
        <div className="flex items-center gap-1 lg:gap-4 shrink-0">
          {/* 예전엔 라벨만 KRW↔USD 로 바뀌고 금액은 그대로였다 — 지금은 화면의 모든 금액이 바뀐다 */}
          <button
            type="button"
            onClick={onToggleCurrency}
            id="lang-toggle-btn"
            aria-label={`표시 통화 변경 — 현재 ${currency}`}
            className="flex min-h-11 items-center gap-1.5 px-2 text-[#454742] hover:text-[#725b38] transition-colors text-[11px] uppercase tracking-[0.18em] font-medium"
            title="표시 통화 변경 (예시 환율)"
          >
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{currency}</span>
          </button>

          <button
            type="button"
            onClick={onOpenBooking}
            id="nav-book-button"
            className="hidden lg:inline-block bg-[#1c1e1a] text-[#fcf9f3] px-7 py-3 rounded text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-[#31312d] transition-colors duration-300 whitespace-nowrap"
          >
            Book a Sanctuary
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded text-[#030402] focus:outline-none hover:bg-[#f0eee8] transition-colors"
            aria-label="모바일 메뉴 토글"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-h-[70svh] overflow-y-auto bg-[#f0eee8] border-b border-[#c6c7c0]/30 px-4 py-3 shadow-sm animate-in fade-in duration-200">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.target}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.target)}
              className={`flex min-h-11 items-center text-xs uppercase tracking-[0.2em] font-medium ${
                item.target === activeNav ? 'text-[#030402]' : 'text-[#454742]'
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full mt-3 mb-1 min-h-12 bg-[#030402] text-[#fcf9f3] rounded text-xs uppercase tracking-[0.2em] font-medium"
          >
            Book a Sanctuary
          </button>
        </div>
      )}
    </header>
  );
};
