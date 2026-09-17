import React, { useState } from 'react';
import { Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { LOGO_URL } from '../data';

interface HeaderProps {
  favoritesCount: number;
  cartCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenConcierge: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoritesCount,
  cartCount,
  onOpenCart,
  onOpenFavorites,
  onOpenConcierge,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Leathercraft', href: '#leathercraft', active: true },
    { name: 'Ceramics', href: '#ceramics' },
    { name: 'Metal & Jewelry', href: '#metal' },
    { name: 'Woodcraft & Living', href: '#woodcraft' },
    { name: 'Traditional Fabric', href: '#fabric' },
    { name: 'Bespoke Gifting', href: '#bespoke-gifting' },
  ];

  return (
    <header
      id="main-header"
      className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#d6c3ba]/40 shadow-xs transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-12 flex items-center justify-between h-20">
        {/* Brand Logo Anchor */}
        <div className="flex items-center gap-3">
          <a
            id="brand-logo-link"
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
            href="#"
          >
            <img
              src={LOGO_URL}
              alt="ARTISAN & GIFT"
              referrerPolicy="no-referrer"
              className="h-9 lg:h-10 w-auto object-contain"
            />
          </a>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav
          id="desktop-navigation"
          aria-label="주요 카테고리 메뉴"
          className="hidden lg:flex items-center space-x-7"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs font-medium tracking-wider uppercase transition-colors pb-1 ${
                link.active
                  ? 'border-b-2 border-[#3e1c06] text-[#3e1c06] font-semibold'
                  : 'text-[#51443d] hover:text-[#3e1c06]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Trailing Action Cluster */}
        <div className="flex items-center gap-2 lg:gap-3">
          <a
            id="bespoke-order-btn"
            href="#bespoke-simulator"
            className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs font-medium tracking-wide bg-[#3e1c06] text-[#FAF7F2] rounded hover:bg-[#583119] transition-colors shadow-xs"
          >
            Bespoke Order
          </a>
          <button
            id="concierge-trigger-btn"
            type="button"
            onClick={onOpenConcierge}
            className="hidden lg:inline-flex items-center justify-center px-3 py-2 text-xs font-medium tracking-wide border border-[#3e1c06]/30 text-[#3e1c06] rounded hover:bg-[#3e1c06]/5 transition-colors"
          >
            Concierge
          </button>

          <div className="flex items-center space-x-1 pl-2 border-l border-[#d6c3ba]/40">
            <button
              id="header-favorites-btn"
              type="button"
              onClick={onOpenFavorites}
              aria-label="찜한 상품 목록"
              className="p-2 text-[#3e1c06] hover:text-[#C84B31] transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C84B31] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              id="header-cart-btn"
              type="button"
              onClick={onOpenCart}
              aria-label="장바구니 열기"
              className="p-2 text-[#3e1c06] hover:text-[#583119] transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C84B31] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>

            <button
              id="header-profile-btn"
              type="button"
              onClick={onOpenProfile}
              aria-label="회원 프로필 및 주문 조회"
              className="p-2 text-[#3e1c06] hover:text-[#583119] transition-colors"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#3e1c06] lg:hidden hover:bg-stone-200/50 rounded"
              aria-label="모바일 메뉴"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#d6c3ba]/40 bg-[#fcf9f4] px-5 py-4 space-y-3 shadow-md">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-xs font-medium text-[#51443d] hover:text-[#3e1c06]"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-[#d6c3ba]/30 flex items-center gap-2">
            <a
              href="#bespoke-simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 bg-[#3e1c06] text-white text-xs font-medium rounded"
            >
              Bespoke Order
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="flex-1 text-center py-2.5 border border-[#3e1c06] text-[#3e1c06] text-xs font-medium rounded"
            >
              Concierge
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
