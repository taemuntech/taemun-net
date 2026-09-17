import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, BrainCircuit, X } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/mockData';
import type { InfoDialogContent } from './InfoDialog';

interface HeaderProps {
  wishlistCount: number;
  cartCount: number;
  onOpenDiagnosis: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearch: (term: string) => void;
  onShowInfo: (content: InfoDialogContent) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const MY_PAGE_INFO: InfoDialogContent = {
  title: '마이페이지 (예시 화면)',
  lines: [
    '샘플 사이트라 로그인·회원 정보·주문 내역은 제공되지 않습니다.',
    '실제 서비스라면 이 자리에서 주문 조회, 적립금, 정기배송 관리, 리뷰 작성으로 이어집니다.',
  ],
};

export const Header: React.FC<HeaderProps> = ({
  wishlistCount,
  cartCount,
  onOpenDiagnosis,
  onOpenCart,
  onOpenWishlist,
  onSearch,
  onShowInfo,
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
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-white/95 backdrop-blur-md border-b border-[#bccac0]/30 shadow-xs">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 flex flex-col">
        {/* Main Header Row */}
        <div className="flex items-center justify-between py-3 lg:py-4 gap-4">
          {/* Brand Identity */}
          <a
            href="#hero-runway"
            className="flex items-center gap-2.5 group min-w-0 min-h-11"
            aria-label="LUMINOUS LAB 홈"
          >
            <img
              src={BRAND_LOGO_URL}
              alt="LUMINOUS LAB Brand Logo"
              className="w-9 h-9 lg:w-10 lg:h-10 object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0"
            referrerPolicy="no-referrer" />
            <div className="flex flex-col min-w-0">
              <span className="text-[18px] lg:text-[22px] font-bold tracking-tight text-[#141b2b] leading-none truncate">
                LUMINOUS LAB
              </span>
              <span className="text-[8px] tracking-[0.14em] lg:text-[9px] lg:tracking-[0.2em] text-[#006948] uppercase font-extrabold mt-0.5 truncate">
                Clinical Dermaceutical
              </span>
            </div>
          </a>

          {/* Search Bar with Trending Terms (Desktop) */}
          <div className="flex-1 max-w-xl mx-2 hidden lg:block">
            <form role="search" onSubmit={handleSearchSubmit} className="relative flex items-center">
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
              <span className="font-bold text-[#006948] shrink-0">인기 키워드 (예시):</span>
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

            <div className="flex items-center gap-0.5 lg:gap-1.5 text-[#141b2b] shrink-0">
              {/* Search toggle on mobile */}
              <button
                aria-label={mobileSearchOpen ? '검색 닫기' : '검색 열기'}
                aria-expanded={mobileSearchOpen}
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className={`lg:hidden w-11 h-11 lg:w-auto lg:h-auto flex items-center justify-center rounded-full transition-colors cursor-pointer ${ mobileSearchOpen ? 'bg-[#006948]/10 text-[#006948]' : 'hover:bg-gray-100' }`}
              >
                <Search className={`w-5 h-5 ${mobileSearchOpen ? 'text-[#006948]' : 'text-gray-700'}`} />
              </button>

              {/* Wishlist */}
              <button
                aria-label={`관심상품 ${wishlistCount}개 보기`}
                onClick={onOpenWishlist}
                className="w-11 h-11 lg:w-auto lg:h-auto lg:p-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors relative cursor-pointer group"
                title="관심상품 목록"
              >
                <Heart className="w-5 h-5 text-gray-700 group-hover:text-[#ae2f34] transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 lg:top-1 lg:right-1 min-w-4 h-4 px-1 bg-[#ae2f34] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag */}
              <button
                aria-label={`장바구니 ${cartCount}개 열기`}
                onClick={onOpenCart}
                className="w-11 h-11 lg:w-auto lg:h-auto lg:p-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors relative cursor-pointer group"
                title="장바구니 열기"
              >
                <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-[#006948] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 lg:top-1 lg:right-1 min-w-4 h-4 px-1 bg-[#006948] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Person (My Page) — 모바일에선 폭이 모자라 숨기고, 같은 안내를 검색 줄 아래에서 연다 */}
              <button
                aria-label="마이페이지"
                onClick={() => onShowInfo(MY_PAGE_INFO)}
                className="hidden lg:flex p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                title="마이페이지"
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Row */}
        {mobileSearchOpen && (
          <div className="lg:hidden pb-3 space-y-2">
            <form role="search" onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="시카, 히알루론산, 선크림..."
                  className="w-full h-11 pl-4 pr-24 rounded-full border border-gray-300 text-sm focus:border-[#006948] focus:outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    aria-label="검색어 지우기"
                    onClick={() => {
                      setSearchTerm('');
                      onSearch('');
                    }}
                    className="absolute right-12 w-11 h-11 flex items-center justify-center text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  aria-label="검색"
                  className="absolute right-1 w-11 h-11 flex items-center justify-center text-[#006948]"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
            <div className="flex items-center gap-2 flex-wrap text-[11px]">
              <span className="font-bold text-[#006948]">인기 키워드 (예시):</span>
              {['저분자 히알루론산', '엑소좀 시카', '레티놀 탄력'].map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => handleQuickKeyword(kw)}
                  className="min-h-11 px-3 rounded-full bg-[#f1f3ff] text-[#3d4a42] font-semibold hover:text-[#006948] transition-colors cursor-pointer"
                >
                  {kw}
                </button>
              ))}
              <button
                type="button"
                onClick={() => onShowInfo(MY_PAGE_INFO)}
                className="min-h-11 px-3 rounded-full border border-[#bccac0]/60 text-[#3d4a42] font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                마이페이지
              </button>
            </div>
          </div>
        )}

        {/* Category Navigation Links */}
        <nav className="flex items-center gap-6 lg:gap-8 overflow-x-auto no-scrollbar lg:pt-1 lg:pb-2.5 text-sm font-medium border-t border-gray-100">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActiveNav(item.label)}
              className={`shrink-0 transition-colors flex items-center min-h-11 lg:min-h-0 lg:pb-1 border-b-2 ${ activeNav === item.label ? 'text-[#006948] font-bold border-[#006948]' : 'text-[#3d4a42] hover:text-[#006948] border-transparent' }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
