import React, { useState } from 'react';
import { BRAND_LOGO_URL } from '../data/luxuryData';
import { X, ShieldCheck, Heart, ShoppingBag, Search, Headphones, User } from 'lucide-react';

interface HeaderProps {
  onOpenSerialModal: () => void;
  onOpenConcierge: () => void;
  onToggleCart: () => void;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSerialModal,
  onOpenConcierge,
  onToggleCart,
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="w-full px-4 lg:px-16 py-2 border-b border-[#4d4635] flex flex-col gap-2 bg-[#0e0e0e] relative z-40">
      {/* Top Row: VIP Notice & Global Ticker */}
      <div className="flex items-center justify-between text-[#99907c] border-b border-[#4d4635] pb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse"></span>
          <span className="text-[10px] tracking-widest text-[#d0c5af] font-medium">
            ARCHIVAL BOUTIQUE &amp; CONCIERGE SALON : 밀라노 · 파리 직송 정품 보증
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-[10px] tracking-wider font-medium">
          <button
            type="button"
            className="text-[#f2ca50] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
            onClick={onOpenSerialModal}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            디지털 정품 보증서 조회
          </button>
          <span className="text-[#99907c]">|</span>
          <span className="text-[#d0c5af]">관·부가세 100% 전액 포함 결제 시스템</span>
          <span className="text-[#99907c]">|</span>
          <span className="text-[#f2ca50] font-bold">200% 책임 보상제 적용</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between py-1">
        {/* Brand Logo Cluster */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 group">
            <img
              alt="MAISON DE LUXE Brand Logo"
              className="w-10 h-10 object-contain rounded-full border border-[#d4af37]/40 group-hover:border-[#f2ca50] transition-colors"
              src={BRAND_LOGO_URL}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-wider uppercase text-[#f2ca50] leading-tight font-medium">
                MAISON DE LUXE
              </span>
              <span className="text-[10px] text-[#99907c] tracking-widest -mt-0.5">
                PARIS · SEOUL · MILANO
              </span>
            </div>
          </a>
        </div>

        {/* Center Category Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7">
          <a
            className="text-[#f2ca50] border-b border-[#f2ca50] pb-1 font-semibold tracking-widest text-[11px] uppercase transition-colors"
            href="#womens-bags"
          >
            Women's Bags
          </a>
          <a
            className="text-[#d0c5af] hover:text-[#f2ca50] tracking-widest uppercase transition-colors text-[11px]"
            href="#mens-luxury"
          >
            Men's Luxury
          </a>
          <a
            className="text-[#d0c5af] hover:text-[#f2ca50] tracking-widest uppercase transition-colors text-[11px]"
            href="#watches-jewelry"
          >
            Watches &amp; Fine Jewelry
          </a>
          <a
            className="text-[#d0c5af] hover:text-[#f2ca50] tracking-widest uppercase transition-colors text-[11px]"
            href="#shoes"
          >
            Shoes
          </a>
          <a
            className="text-[#d0c5af] hover:text-[#f2ca50] tracking-widest uppercase transition-colors text-[11px]"
            href="#ready-to-wear"
          >
            Ready-To-Wear
          </a>
        </nav>

        {/* Trailing Actions & Search */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center bg-[#1c1b1b] border border-[#d4af37]/30 px-3 py-1.5 rounded">
            <input
              className="bg-transparent border-none focus:outline-none text-[#e5e2e1] text-xs w-48 placeholder-[#99907c]"
              placeholder="샤넬 클래식, 에르메스 버킨, 롤렉스..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button type="button" className="text-[#f2ca50] hover:text-[#ffe088] transition-colors" title="검색">
              <Search className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-[#e5e2e1]">
            <button
              type="button"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 border border-[#f2ca50] text-[#f2ca50] text-[11px] tracking-widest font-semibold hover:bg-[#d4af37] hover:text-[#0e0e0e] transition-all cursor-pointer"
              onClick={onOpenConcierge}
            >
              <Headphones className="w-3.5 h-3.5" />
              Private Concierge
            </button>

            <button
              type="button"
              className="p-2 text-[#e5e2e1] hover:text-[#f2ca50] transition-colors relative cursor-pointer"
              title="위시리스트"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#f2ca50] rounded-full animate-ping"></span>
              )}
            </button>

            <button
              type="button"
              id="cart-toggle-btn"
              className="p-2 text-[#e5e2e1] hover:text-[#f2ca50] transition-colors relative cursor-pointer"
              onClick={onToggleCart}
              title="장바구니 열기"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#f2ca50] text-[#0e0e0e] text-[10px] flex items-center justify-center font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="p-1 border border-[#d4af37]/40 rounded-full hover:border-[#f2ca50] transition-colors text-[#f2ca50] cursor-pointer"
              title="VIP Collector Status"
              onClick={() => alert('VIP Collector 회원 등급: NOIR LEVEL (파리 방돔 아틀리에 무제한 안심 예치 보증 정회원 상태입니다).')}
            >
              <User className="w-5 h-5 p-0.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
