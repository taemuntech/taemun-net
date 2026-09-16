"use client";

import React, { useState } from 'react';
import { BRAND_INFO } from '../data/antiqueData';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    onNavigateSection(targetId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement Marquee Bar */}
      <aside
        id="announcement-banner"
        aria-label="Announcement"
        className="bg-[#300a10] text-[#ffffff] border-b border-[#4a1e23] text-center py-2.5 px-4 tracking-widest text-[11px] font-label-sm uppercase flex items-center justify-center space-x-3"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#735b24]"></span>
        <span className="truncate">{BRAND_INFO.announcement}</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#735b24]"></span>
      </aside>

      {/* Main Header Bar */}
      <header
        id="main-header"
        className="sticky top-0 z-40 bg-[#fff8f5]/95 backdrop-blur-md border-b border-[#d6c2c2] transition-colors duration-200"
      >
        <div className="flex justify-between items-center w-full px-4 lg:px-16 max-w-7xl mx-auto h-20">
          {/* Brand Anchor */}
          <a
            id="brand-logo-link"
            href="#"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex items-center space-x-3 group text-left cursor-pointer"
          >
            <img
              id="brand-logo-img"
              alt="Maison d'Antique Brand Logo"
              className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105"
              src={BRAND_INFO.logoUrl}
            />
            <div className="flex flex-col">
              <span className="font-serif text-[26px] lg:text-[28px] text-[#300a10] tracking-tight italic leading-none">
                {BRAND_INFO.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#735b24] font-semibold mt-1">
                {BRAND_INFO.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7">
            <a
              id="nav-link-furniture"
              href="#furniture"
              onClick={(e) => handleNavClick(e, 'furniture')}
              className="text-[13px] uppercase tracking-wider text-[#300a10] font-semibold hover:border-b hover:border-[#735b24] pb-0.5 transition-colors duration-200"
            >
              Furniture
            </a>
            <a
              id="nav-link-lighting"
              href="#lighting"
              onClick={(e) => handleNavClick(e, 'lighting')}
              className="text-[13px] uppercase tracking-wider text-[#514344] hover:text-[#300a10] font-semibold transition-colors duration-200"
            >
              Lighting &amp; Mirrors
            </a>
            <a
              id="nav-link-objects"
              href="#objects"
              onClick={(e) => handleNavClick(e, 'objects')}
              className="text-[13px] uppercase tracking-wider text-[#514344] hover:text-[#300a10] font-semibold transition-colors duration-200"
            >
              Decorative Objects
            </a>
            <a
              id="nav-link-curation"
              href="#curation"
              onClick={(e) => handleNavClick(e, 'curation')}
              className="text-[13px] uppercase tracking-wider text-[#514344] hover:text-[#300a10] font-semibold transition-colors duration-200"
            >
              Rare Archives
            </a>
            <a
              id="nav-link-atelier"
              href="#atelier"
              onClick={(e) => handleNavClick(e, 'atelier')}
              className="text-[13px] uppercase tracking-wider text-[#514344] hover:text-[#300a10] font-semibold transition-colors duration-200"
            >
              Atelier Restoration
            </a>
            <a
              id="nav-link-viewing"
              href="#viewing"
              onClick={(e) => handleNavClick(e, 'viewing')}
              className="text-[13px] uppercase tracking-wider text-[#514344] hover:text-[#300a10] font-semibold transition-colors duration-200"
            >
              Private Viewing
            </a>
          </nav>

          {/* Trailing Icon & Primary CTAs */}
          <div className="flex items-center space-x-3 lg:space-x-5">
            {/* Search Icon */}
            <button
              id="btn-header-search"
              aria-label="Search Catalog"
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-[#514344] hover:text-[#300a10] transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Wishlist Icon */}
            <button
              id="btn-header-wishlist"
              aria-label="Archival Wishlist"
              type="button"
              onClick={onOpenWishlist}
              className="p-2 text-[#514344] hover:text-[#300a10] transition-colors duration-200 relative flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlistCount > 0 && (
                <span
                  id="wishlist-badge-count"
                  className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#735b24]"
                ></span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              id="btn-header-cart"
              aria-label="Acquisition Folio"
              type="button"
              onClick={onOpenCart}
              className="p-2 text-[#514344] hover:text-[#300a10] transition-colors duration-200 relative flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-0.5 -right-0.5 bg-[#300a10] text-[#fff8f5] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Private Viewing CTA */}
            <button
              id="btn-header-private-viewing"
              type="button"
              onClick={(e) => handleNavClick(e, 'viewing')}
              className="hidden lg:inline-flex items-center justify-center bg-[#4a1e23] text-[#fff8f5] hover:bg-[#300a10] px-5 py-2.5 text-[12px] uppercase tracking-wider font-semibold transition-all duration-300 border border-[#735b24]/30 shadow-sm cursor-pointer"
            >
              Private Viewing
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="btn-mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#514344] hover:text-[#300a10] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[26px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            className="lg:hidden bg-[#fff8f5] border-b border-[#d6c2c2] px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top duration-200"
          >
            <nav className="flex flex-col space-y-3">
              <a
                href="#furniture"
                onClick={(e) => handleNavClick(e, 'furniture')}
                className="text-[14px] uppercase tracking-wider text-[#300a10] font-semibold py-1 border-b border-[#d6c2c2]/40"
              >
                Furniture (대형 가구)
              </a>
              <a
                href="#lighting"
                onClick={(e) => handleNavClick(e, 'lighting')}
                className="text-[14px] uppercase tracking-wider text-[#514344] font-semibold py-1 border-b border-[#d6c2c2]/40"
              >
                Lighting &amp; Mirrors (조명 &amp; 거울)
              </a>
              <a
                href="#objects"
                onClick={(e) => handleNavClick(e, 'objects')}
                className="text-[14px] uppercase tracking-wider text-[#514344] font-semibold py-1 border-b border-[#d6c2c2]/40"
              >
                Decorative Objects (도자기 &amp; 은제)
              </a>
              <a
                href="#curation"
                onClick={(e) => handleNavClick(e, 'curation')}
                className="text-[14px] uppercase tracking-wider text-[#514344] font-semibold py-1 border-b border-[#d6c2c2]/40"
              >
                Rare Archives (이달의 셀렉션)
              </a>
              <a
                href="#atelier"
                onClick={(e) => handleNavClick(e, 'atelier')}
                className="text-[14px] uppercase tracking-wider text-[#514344] font-semibold py-1 border-b border-[#d6c2c2]/40"
              >
                Atelier Restoration (복원 아틀리에)
              </a>
              <a
                href="#viewing"
                onClick={(e) => handleNavClick(e, 'viewing')}
                className="text-[14px] uppercase tracking-wider text-[#514344] font-semibold py-1 border-b border-[#d6c2c2]/40"
              >
                Private Viewing (살롱 예약)
              </a>
            </nav>
            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => handleNavClick(e, 'viewing')}
                className="w-full bg-[#4a1e23] text-[#fff8f5] py-3 text-center text-[12px] uppercase tracking-widest font-semibold"
              >
                프라이빗 뷰잉 살롱 예약하기
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
