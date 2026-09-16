import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Sparkles, BrainCircuit, X } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/mockData';

interface HeaderProps {
  wishlistCount: number;
  cartCount: number;
  onOpenDiagnosis: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearch: (term: string) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  wishlistCount,
  cartCount,
  onOpenDiagnosis,
  onOpenCart,
  onOpenWishlist,
  onSearch,
  activeNav,
  setActiveNav,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleQuickKeyword = (kw: string) => {
    setSearchTerm(kw);
    onSearch(kw);
  };

  const navItems = [
    { label: '실시간 랭킹', href: '#ranking-section' },
    { label: '피부고민별 케어', href: '#filter-section' },
    { label: '클린&비건', href: '#formula-inspector' },
    { label: '신상품', href: '#hero-runway' },
    { label: '기획세트', href: '#bundle-section' },
    { label: '리뷰 어워드', href: '#reviews-section' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#bccac0]/30 shadow-xs">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 flex flex-col">
        {/* Main Header Row */}
        <div className="flex items-center justify-between py-3 lg:py-4 gap-4">
          {/* Brand Identity */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <img
              src={BRAND_LOGO_URL}
              alt="LUMINOUS LAB Brand Logo"
              className="w-9 h-9 lg:w-10 lg:h-10 object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
            referrerPolicy="no-referrer" />
            <div className="flex flex-col">
              <span className="text-[20px] lg:text-[22px] font-bold tracking-tight text-[#141b2b] leading-none">
                LUMINOUS LAB
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#006948] uppercase font-extrabold mt-0.5">
                Clinical Dermaceutical
              </span>
            </div>
          </a>

          {/* Search Bar with Trending Terms (Desktop) */}
          <div className="flex-1 max-w-xl mx-2 hidden lg:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="저분자 히알루론산, 엑소좀 시카, 비타민 앰플..."
                className="w-full h-11 pl-4 pr-12 rounded-full border border-[#bccac0]/60 bg-white focus:outline-none focus:border-[#006948] focus:ring-2 focus:ring-[#006948]/20 text-sm transition-all shadow-2xs"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    onSearch('');
                  }}
                  className="absolute right-10 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                aria-label="검색"
                className="absolute right-3.5 text-[#006948] hover:text-[#005137] p-1 rounded-full flex items-center justify-center cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Trending Quick Keywords */}
            <div className="flex items-center gap-2 mt-1.5 px-3 text-[11px] text-[#3d4a42]">
              <span className="font-bold text-[#006948] shrink-0">인기 키워드:</span>
              <button
                type="button"
                onClick={() => handleQuickKeyword('저분자 히알루론산')}
                className="hover:text-[#006948] hover:underline transition-colors"
              >
                1. 저분자 히알루론산
              </button>
              <span className="text-[#bccac0]">•</span>
              <button
                type="button"
                onClick={() => handleQuickKeyword('엑소좀 시카')}
                className="hover:text-[#006948] hover:underline transition-colors"
              >
                2. 엑소좀 시카
              </button>
              <span className="text-[#bccac0]">•</span>
              <button
                type="button"
                onClick={() => handleQuickKeyword('레티놀 탄력')}
                className="hover:text-[#006948] hover:underline transition-colors"
              >
                3. 레티놀 탄력
              </button>
            </div>
          </div>

          {/* Trailing Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={onOpenDiagnosis}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#006948]/10 text-[#006948] border border-[#006948]/20 hover:bg-[#006948] hover:text-white transition-all duration-200 text-xs font-bold cursor-pointer shadow-2xs"
            >
              <BrainCircuit className="w-4 h-4" />
              피부 진단 테스트
            </button>

            <div className="flex items-center gap-1 lg:gap-1.5 text-[#141b2b]">
              {/* Search toggle on mobile */}
              <button
                aria-label="검색 열기"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              {/* Wishlist */}
              <button
                aria-label="관심상품"
                onClick={onOpenWishlist}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative cursor-pointer group"
                title="관심상품 목록"
              >
                <Heart className="w-5 h-5 text-gray-700 group-hover:text-[#ae2f34] transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-[#ae2f34] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag */}
              <button
                aria-label="장바구니"
                onClick={onOpenCart}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative cursor-pointer group"
                title="장바구니 열기"
              >
                <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-[#006948] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-[#006948] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Person (My Page) */}
              <button
                aria-label="마이페이지"
                onClick={() => alert('루미너스 랩 VIP 회원 (contact@taemun.co.kr) • 적립금 5,000P 보유')}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="마이페이지"
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Row */}
        {mobileSearchOpen && (
          <form onSubmit={handleSearchSubmit} className="lg:hidden pb-3">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어를 입력하세요..."
                className="w-full h-10 pl-4 pr-10 rounded-full border border-gray-300 text-sm focus:border-[#006948] focus:outline-none"
              />
              <button type="submit" className="absolute right-3 text-[#006948]">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Category Navigation Links */}
        <nav className="flex items-center gap-6 lg:gap-8 overflow-x-auto no-scrollbar pt-1 pb-2.5 text-sm font-medium border-t border-gray-100">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActiveNav(item.label)}
              className={`shrink-0 transition-colors pb-1 ${ activeNav === item.label ? 'text-[#006948] font-bold border-b-2 border-[#006948]' : 'text-[#3d4a42] hover:text-[#006948]' }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
