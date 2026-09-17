import React, { useState } from 'react';
import {
  Menu,
  X,
  Search,
  Box,
  Sun,
  Moon,
  Heart,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/products';

interface HeaderProps {
  lightingMood: 'day' | 'night';
  onToggleLighting: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenShowroomModal: () => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lightingMood,
  onToggleLighting,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenShowroomModal,
  onSelectCategory,
  selectedCategory,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 카테고리 id 는 FilterBar·상품 데이터와 **같은 값**만 쓰고, 상품이 실제로 있는 것만 둔다.
  // 예전엔 'fabric'·'decor' 가 있었는데 그런 상품이 없어 필터가 조건을 하나도 못 만나고 전체 목록이
  // 그대로 나왔다 — 「패브릭/침구」를 눌렀는데 소파가 보였다.
  const navLinks = [
    { label: '전체 컬렉션', category: 'all' },
    { label: '모듈 소파 & 테이블', category: 'sofa' },
    { label: '다이닝 테이블', category: 'dining' },
    { label: '조명 컬렉션', category: 'lighting' }
  ];

  const handleNavClick = (category: string) => {
    onSelectCategory(category);
    const target = document.getElementById('furniture');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToSpatial = () => {
    const target = document.getElementById('spatial-tour');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div id="announcement-bar" className="bg-[#100e0d] text-[#fff8f4] py-2 px-4 text-center border-b border-[#d0c4c0]/20 text-[11px] font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden lg:inline text-[10px] tracking-[0.15em] text-[#ccc5c3] font-semibold uppercase">
            ARCHITECTURAL RESIDENTIAL COMMERCE
          </span>
          <p className="mx-auto lg:mx-0">
            수도권 전문 기사 2인 1조 배송·설치 서비스
            <span className="opacity-40 mx-2">|</span>
            청담·한남 쇼룸 사전 예약제 운영
          </p>
          <button
            onClick={onOpenShowroomModal}
            className="hidden lg:inline-flex items-center gap-1 text-[11px] text-[#e9c176] hover:underline underline-offset-4 transition-colors"
          >
            <span>프라이빗 큐레이션 예약</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Sticky Header */}
      {/* 공용 샘플 바에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다 — 바가 없으면 0px 라 화면은 그대로다. */}
      <header className="bg-[#fff8f4]/95 backdrop-blur-md text-[#100e0d] top-[var(--sample-bar-h,0px)] z-40 border-b border-[#d0c4c0]/40 sticky shadow-[0_4px_20px_-2px_rgba(38,35,34,0.03)] transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-2">
          {/* Brand Logo & Mobile Trigger */}
          <div className="flex items-center gap-2 lg:gap-4 min-w-0">
            <button
              id="mobile-menu-btn"
              className="lg:hidden flex items-center justify-center w-11 h-11 -ml-2 shrink-0 text-[#1f1b17] hover:bg-[#f0e7df] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기/닫기"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {/* 예전엔 빈 앵커 주소를 가진 <a> 였다 — 주소를 바꾸지 않고 맨 위로만 올리므로 버튼이 맞다 */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 lg:gap-3 group min-w-0 py-2"
              aria-label="맨 위로"
            >
              <img
                src={BRAND_LOGO_URL}
                alt="MAISON ARCHITECT Brand Logo"
                className="w-7 h-7 lg:w-8 lg:h-8 shrink-0 rounded-sm object-contain brightness-95 group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer" />
              {/* 375 에서 2xl 이면 두 줄로 접혀 오른쪽 아이콘과 겹쳤다 — 크기를 줄이고,
                  모바일에선 남는 폭(≈119px)에 맞춰 두 줄로 접히게 둔다(잘라내면 브랜드명이 사라진다).
                  h-20 헤더라 두 줄이 들어가고, 부모가 min-w-0 이라 오른쪽 아이콘과 겹치지 않는다. */}
              <span className="font-serif text-base sm:text-xl lg:text-2xl tracking-wider text-[#100e0d] uppercase font-normal leading-[1.05] text-left lg:whitespace-nowrap lg:truncate">
                MAISON ARCHITECT
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold tracking-wider">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.category)}
                className={`pb-1 transition-colors duration-200 ${
                  selectedCategory === link.category
                    ? 'text-[#100e0d] border-b-2 border-[#100e0d]'
                    : 'text-[#4d4542] hover:text-[#944931]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Trailing Actions: Search, 3D Tour, Mood Switcher, Wishlist, Cart */}
          <div className="flex items-center shrink-0 gap-0.5 lg:gap-3">
            {/* Search Input */}
            <div className="hidden lg:flex items-center relative w-56 bg-[#fbf2eb] rounded-lg px-3 py-1.5 border border-[#d0c4c0]/60 focus-within:border-[#100e0d] transition-colors">
              <Search className="w-4 h-4 text-[#7f7571] mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="소파, 트래버틴, 조명..."
                aria-label="가구 검색"
                className="bg-transparent border-none text-xs text-[#100e0d] placeholder:text-[#7f7571] p-0 focus:outline-none focus:ring-0 w-full"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="검색어 지우기"
                  className="text-[#7f7571] hover:text-[#100e0d]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 3D Room Tour Link */}
            <button
              onClick={scrollToSpatial}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f6ece5] hover:bg-[#f0e7df] text-[#100e0d] text-[11px] font-semibold border border-[#d0c4c0]/50 transition-all active:scale-95 shadow-2xs"
            >
              <Box className="w-3.5 h-3.5 text-[#944931]" />
              <span>3D 룸투어</span>
            </button>

            {/* Day / Night Mood Switcher */}
            <button
              onClick={onToggleLighting}
              className="flex items-center justify-center w-11 h-11 lg:w-10 lg:h-10 rounded-lg text-[#100e0d] hover:bg-[#f0e7df] transition-colors relative"
              title={lightingMood === 'day' ? '나이트 3000K 무드로 전환' : '자연광 5000K로 전환'}
              aria-label={lightingMood === 'day' ? '나이트 3000K 무드로 전환' : '자연광 5000K로 전환'}
            >
              {lightingMood === 'day' ? (
                <Sun className="w-5 h-5 text-[#944931]" />
              ) : (
                <Moon className="w-5 h-5 text-[#e9c176]" />
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="flex items-center justify-center w-11 h-11 lg:w-10 lg:h-10 text-[#100e0d] hover:bg-[#f0e7df] rounded-lg transition-colors relative"
              aria-label={`위시리스트 열기 (${wishlistCount}개)`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#944931] text-[#fff8f4] text-[9px] font-bold flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onOpenCart}
              className="flex items-center justify-center w-11 h-11 lg:w-10 lg:h-10 text-[#100e0d] hover:bg-[#f0e7df] rounded-lg transition-colors relative"
              aria-label={`장바구니 열기 (${cartCount}개)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#100e0d] text-[#fff8f4] text-[9px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#fff8f4] border-b border-[#d0c4c0]/40 px-6 py-4 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Mobile Search */}
            <div className="flex items-center bg-[#fbf2eb] rounded-lg px-3 min-h-11 border border-[#d0c4c0]/60">
              <Search className="w-4 h-4 text-[#7f7571] mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="가구, 소재, 치수 검색..."
                aria-label="가구 검색"
                className="bg-transparent border-none text-xs text-[#100e0d] placeholder:text-[#7f7571] p-0 focus:outline-none w-full"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="검색어 지우기"
                  className="flex items-center justify-center w-9 h-9 -mr-2 shrink-0 text-[#7f7571] hover:text-[#100e0d]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.category)}
                  className={`flex items-center min-h-11 px-3 rounded-lg text-left font-medium transition-colors ${
                    selectedCategory === link.category
                      ? 'bg-[#100e0d] text-[#fff8f4]'
                      : 'bg-[#fbf2eb] text-[#1f1b17] hover:bg-[#f0e7df]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#d0c4c0]/30 flex flex-wrap justify-between items-center gap-x-3 text-xs">
              <span className="text-[#4d4542]">쇼룸 직통: 02-0000-0000 (예시)</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShowroomModal();
                }}
                className="flex items-center min-h-11 text-[#944931] font-semibold"
              >
                쇼룸 예약하기 →
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
