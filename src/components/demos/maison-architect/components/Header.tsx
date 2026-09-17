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

  const navLinks = [
    { label: '가구', category: 'sofa' },
    { label: '조명', category: 'lighting' },
    { label: '패브릭/침구', category: 'fabric' },
    { label: '홈데코/오브제', category: 'decor' },
    { label: '키친/다이닝', category: 'dining' },
    { label: '수납/선반', category: 'storage' }
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
            수도권 전지역 전문 기사 2인 1조 무료 배송 및 설치
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
      <header className="bg-[#fff8f4]/95 backdrop-blur-md text-[#100e0d] top-0 z-40 border-b border-[#d0c4c0]/40 sticky shadow-[0_4px_20px_-2px_rgba(38,35,34,0.03)] transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <button
              id="mobile-menu-btn"
              className="lg:hidden p-1.5 text-[#1f1b17] hover:bg-[#f0e7df] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <a
              href="#"
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src={BRAND_LOGO_URL}
                alt="MAISON ARCHITECT Brand Logo"
                className="w-8 h-8 rounded-sm object-contain brightness-95 group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer" />
              <span className="font-serif text-2xl tracking-wider text-[#100e0d] uppercase font-normal">
                MAISON ARCHITECT
              </span>
            </a>
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
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search Input */}
            <div className="hidden lg:flex items-center relative w-56 bg-[#fbf2eb] rounded-lg px-3 py-1.5 border border-[#d0c4c0]/60 focus-within:border-[#100e0d] transition-colors">
              <Search className="w-4 h-4 text-[#7f7571] mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="소파, 천연대리석, 조명..."
                className="bg-transparent border-none text-xs text-[#100e0d] placeholder:text-[#7f7571] p-0 focus:outline-none focus:ring-0 w-full"
              />
              {searchQuery && (
                <button onClick={() => onSearchChange('')} className="text-[#7f7571] hover:text-[#100e0d]">
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
              className="p-2 rounded-lg text-[#100e0d] hover:bg-[#f0e7df] transition-colors relative"
              title={lightingMood === 'day' ? '나이트 3000K 무드로 전환' : '자연광 5000K로 전환'}
              aria-label="Toggle Lighting Mood"
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
              className="p-2 text-[#100e0d] hover:bg-[#f0e7df] rounded-lg transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#944931] text-[#fff8f4] text-[9px] font-bold flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onOpenCart}
              className="p-2 text-[#100e0d] hover:bg-[#f0e7df] rounded-lg transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#100e0d] text-[#fff8f4] text-[9px] font-bold flex items-center justify-center rounded-full">
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
            <div className="flex items-center bg-[#fbf2eb] rounded-lg px-3 py-2 border border-[#d0c4c0]/60">
              <Search className="w-4 h-4 text-[#7f7571] mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="가구, 소재, 치수 검색..."
                className="bg-transparent border-none text-xs text-[#100e0d] placeholder:text-[#7f7571] p-0 focus:outline-none w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.category)}
                  className={`p-2.5 rounded-lg text-left font-medium transition-colors ${
                    selectedCategory === link.category
                      ? 'bg-[#100e0d] text-[#fff8f4]'
                      : 'bg-[#fbf2eb] text-[#1f1b17] hover:bg-[#f0e7df]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#d0c4c0]/30 flex justify-between items-center text-xs">
              <span className="text-[#4d4542]">쇼룸 직통: 02-0000-0000 (예시)</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShowroomModal();
                }}
                className="text-[#944931] font-semibold"
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
