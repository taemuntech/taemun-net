import React, { useState, useEffect, useRef } from 'react';
import { LOGO_IMG, TRENDING_KEYWORDS } from '../data/mockData';
import { CURRENCY_LABEL, SAMPLE_RATES, useCurrency, type CurrencyCode } from '../currency';

interface HeaderProps {
  wishlistCount: number;
  cartCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracking: () => void;
  onOpenConcierge: () => void;
  onSearch: (query: string) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  wishlistCount,
  cartCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTracking,
  onOpenConcierge,
  onSearch,
  activeNav,
  setActiveNav,
  onGoHome,
}) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { currency, setCurrency } = useCurrency();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const currencyBoxRef = useRef<HTMLDivElement>(null);

  // 통화 드롭다운은 바깥을 누르면 닫힌다 — 열어 둔 채로 다른 곳을 눌러도 그대로 떠 있었다.
  useEffect(() => {
    if (!showCurrencyDropdown) return;
    const onPointerDown = (e: MouseEvent) => {
      if (currencyBoxRef.current && !currencyBoxRef.current.contains(e.target as Node)) {
        setShowCurrencyDropdown(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [showCurrencyDropdown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TRENDING_KEYWORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    // 공용 샘플 바에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다 — 바가 없으면 0px 라 화면은 그대로다.
    <header className="sticky top-[var(--sample-bar-h,0px)] z-50 bg-[#0c0d0e]/90 backdrop-blur-md hairline-b">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#0d0e0f] hairline-b px-4 lg:px-6 max-lg:py-0 lg:py-1 text-[#8f9378] font-label-sm text-[11px]">
        <div className="max-w-[1920px] mx-auto flex justify-between items-center tracking-wider max-lg:min-h-11">
          <div className="flex items-center space-x-3 lg:space-x-6 overflow-x-auto no-scrollbar py-0.5">
            <span className="inline-flex items-center gap-1.5 text-[#caf300] shrink-0 font-medium">
              <span className="w-1.5 h-1.5 bg-[#caf300] inline-block"></span>
              2026 S/S CURATION DROP LIVE
            </span>
            <span className="hidden lg:inline text-[#343536]">/</span>
            <button
              onClick={onOpenTracking}
              className="hover:text-[#ffffff] transition-colors shrink-0 text-left inline-flex items-center max-lg:min-h-11"
            >
              배송조회
            </button>
            <span className="text-[#343536]">/</span>
            <a
              href="#ranking"
              className="hover:text-[#ffffff] transition-colors shrink-0 inline-flex items-center max-lg:min-h-11"
            >
              에디토리얼 매거진
            </a>
            <span className="text-[#343536]">/</span>
            <button
              onClick={onOpenConcierge}
              className="hover:text-[#ffffff] transition-colors shrink-0 inline-flex items-center max-lg:min-h-11"
            >
              신규 브랜드 입점신청
            </button>
          </div>

          <div className="flex items-center space-x-3 lg:space-x-6 shrink-0">
            <span className="hidden lg:inline hover:text-[#ffffff] transition-colors text-[11px]">
              고객센터 1588-0000 (예시) (10:00 - 18:00)
            </span>
            <span className="hidden lg:inline text-[#343536]">/</span>
            <div className="relative" ref={currencyBoxRef}>
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                aria-haspopup="listbox"
                aria-expanded={showCurrencyDropdown}
                className="flex items-center gap-1 hover:text-[#ffffff] transition-colors font-label-sm text-[11px] max-lg:min-h-11"
              >
                <span>{CURRENCY_LABEL[currency]}</span>
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </button>

              {showCurrencyDropdown && (
                <div role="listbox" className="absolute right-0 mt-1 w-56 bg-[#1b1c1d] hairline-all p-1 z-50 shadow-2xl text-[11px]">
                  {(['KRW', 'USD', 'EUR'] as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      role="option"
                      aria-selected={currency === code}
                      onClick={() => { setCurrency(code); setShowCurrencyDropdown(false); }}
                      className={`w-full text-left px-2 min-h-11 flex items-center gap-2 hover:bg-[#292a2b] hover:text-[#caf300] ${ currency === code ? 'text-[#caf300] font-bold' : '' }`}
                    >
                      <span>{CURRENCY_LABEL[code]}</span>
                      {code !== 'KRW' && (
                        <span className="ml-auto text-[#8f9378] shrink-0">1 = ₩{SAMPLE_RATES[code].toLocaleString('ko-KR')}</span>
                      )}
                    </button>
                  ))}
                  <p className="px-2 py-1.5 text-[10px] text-[#8f9378] leading-snug">
                    예시 환율입니다 — 고시 환율이 아니고, 이 샘플에서는 결제도 이루어지지 않습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. GLOBAL NAVIGATION BAR */}
      <div className="w-full px-4 lg:px-6 mx-auto max-w-[1920px] flex flex-col">
        <div className="flex items-center justify-between py-3 lg:py-4 gap-4 lg:gap-6">
          {/* Brand Identity & Logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onGoHome}
              className="flex items-center gap-3 group text-left cursor-pointer"
              aria-label="아틀리에 누아르 홈 — 맨 위로"
            >
              <img
                src={LOGO_IMG}
                alt="ATELIER NOIR Brand Logo"
                className="w-9 h-9 object-contain hairline-all group-hover:border-[#caf300] transition-colors duration-150"
              referrerPolicy="no-referrer" />
              <span className="font-display-hero text-xl lg:text-2xl font-extrabold tracking-tighter text-[#ffffff] uppercase">
                ATELIER NOIR
              </span>
            </button>
            <span className="hidden lg:inline-block font-label-sm text-[10px] text-[#8f9378] px-2 py-0.5 border border-[#444932]">
              SEOUL / PARIS
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 font-label-lg text-xs uppercase tracking-wider">
            {['BRANDS', 'RANKING', 'SALE', 'LOOKBOOK', 'EXCLUSIVE'].map((nav) => {
              const isActive = activeNav === nav;
              return (
                <button
                  key={nav}
                  onClick={() => setActiveNav(nav)}
                  className={`transition-colors duration-150 relative py-1 min-h-11 ${ isActive ? 'text-[#ffffff] font-bold border-b border-[#caf300]' : 'text-[#c5c9ac] font-medium hover:text-[#caf300]' } ${nav === 'SALE' ? 'flex items-center gap-1.5' : ''}`}
                >
                  <span>{nav}</span>
                  {nav === 'SALE' && (
                    <span className="text-[10px] text-[#caf300] font-bold">UP TO 60%</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search HUD with Live Trending Keywords Carousel */}
          <div className="flex-1 max-w-md hidden lg:block">
            <form role="search" onSubmit={handleSearchSubmit} className="relative flex items-center bg-[#1b1c1d] border border-[#444932] px-3 py-1.5 focus-within:border-[#caf300] transition-colors duration-150">
              <span className="material-symbols-outlined text-[#8f9378] text-[18px] mr-2">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="브랜드, 디자이너 컬렉션, 아이템 검색"
                className="w-full bg-transparent text-[#ffffff] text-xs focus:outline-none placeholder:text-[#8f9378]/70 border-none p-0 focus:ring-0"
              />
              {/* Live Keyword Ticker (when input is empty) */}
              {!searchQuery && (
                <div className="absolute right-3 flex items-center gap-2 pointer-events-none text-[#8f9378] font-label-sm text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#caf300] animate-ping"></span>
                  <span className="text-[#e3e2e3]">{TRENDING_KEYWORDS[tickerIndex]}</span>
                </div>
              )}
            </form>
          </div>

          {/* Trailing Icon Actions & Bag */}
          <div className="flex items-center space-x-4 lg:space-x-5 font-label-lg text-xs">
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden text-[#e3e2e3] hover:text-[#caf300] transition-colors flex items-center justify-center min-w-11 min-h-11 -m-2"
              aria-expanded={mobileSearchOpen}
              aria-label="모바일 검색"
            >
              <span className="material-symbols-outlined">search</span>
            </button>

            <button
              onClick={onOpenWishlist}
              className="flex items-center gap-1 text-[#e3e2e3] hover:text-[#caf300] transition-colors group min-h-11 px-1 -mx-1"
              title="위시리스트"
            >
              <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${wishlistCount > 0 ? 'text-[#ffb4ab]' : ''}`}>
                favorite
              </span>
              <span className="text-[10px] font-label-sm text-[#caf300] bg-[#1f2021] px-1 py-0.5 border border-[#444932]">
                {wishlistCount}
              </span>
            </button>

            <button
              onClick={onOpenConcierge}
              className="hidden lg:flex items-center gap-1 text-[#e3e2e3] hover:text-[#caf300] transition-colors min-h-11"
              title="마이페이지 / VIP 컨시어지"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
              <span className="font-label-sm text-[11px]">MY</span>
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#caf300] text-[#171e00] px-3.5 py-1.5 min-h-11 hover:bg-[#ffffff] hover:text-[#171e00] transition-all font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              <span className="tracking-wider">BAG ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {mobileSearchOpen && (
          <div className="lg:hidden pb-3">
            <form role="search" onSubmit={handleSearchSubmit} className="flex items-center bg-[#1b1c1d] border border-[#444932] px-3 py-2">
              <span className="material-symbols-outlined text-[#8f9378] text-[18px] mr-2">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="브랜드, 디자이너 컬렉션, 아이템 검색"
                className="w-full bg-transparent text-[#ffffff] text-sm focus:outline-none placeholder:text-[#8f9378]"
                autoFocus
              />
              <button type="submit" className="text-xs text-[#caf300] font-bold ml-2 min-h-11 px-2">검색</button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
