import React, { useState, useEffect } from 'react';
import { QUICK_PILLS } from '../data/mockData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAddress: () => void;
  onOpenCategory: () => void;
  /** 검색어를 실제로 상품 목록에 건다 — 빈 문자열이면 해제 */
  searchTerm: string;
  onSearch: (keyword: string) => void;
  wishlistCount: number;
  isWishlistOnly: boolean;
  onToggleWishlistOnly: () => void;
  /** 샘플이라 동작하지 않는 자리(로그인 등)에서 공용 안내 모달을 연다 — 브라우저 기본 경고창은 쓰지 않는다 */
  onOpenNotice: () => void;
}

/**
 * 검색창 — 데스크톱 상단과 모바일(1023px 이하) 줄이 **같은 폼**을 쓴다.
 * 접수 폼이 아니라 화면 안 상품 목록만 거르는 검색이라 입력값은 어디에도 전송되지 않는다.
 */
function SearchForm({
  value,
  onChange,
  onSearchSubmit,
  onClear
}: {
  value: string;
  onChange: (v: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
}) {
  return (
    <form role="search" onSubmit={onSearchSubmit} className="relative flex items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="상품 검색"
        placeholder="한우, 흙당근, 생연어, 사워도우 검색"
        className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2.5 max-lg:py-3 pl-4 pr-20 text-[13px] placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
      />
      {value.trim().length > 0 && (
        <button
          type="button"
          onClick={onClear}
          aria-label="검색어 지우기"
          className="absolute right-11 flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      )}
      <button
        type="submit"
        aria-label="검색"
        className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full text-primary hover:text-secondary transition-colors"
      >
        <span className="material-symbols-outlined text-2xl">search</span>
      </button>
    </form>
  );
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenAddress,
  onOpenCategory,
  searchTerm,
  onSearch,
  wishlistCount,
  isWishlistOnly,
  onToggleWishlistOnly,
  onOpenNotice
}) => {
  // Dawn Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 11 });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 칩·인기어 쪽에서 검색어가 바뀌면 입력창도 따라간다 — 입력창만 옛 글자를 들고 있으면 「검색이 안 먹는다」로 보인다
  useEffect(() => {
    setSearchQuery(searchTerm);
  }, [searchTerm]);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* DAWN DELIVERY COUNTDOWN TOP BANNER */}
      <div id="dawn-banner" className="bg-primary-container text-on-primary py-2 px-4 border-b border-primary text-center relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap text-xs font-mono">
          <span className="inline-flex items-center gap-1 bg-on-tertiary-container/20 text-on-tertiary-container px-2 py-0.5 rounded text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container animate-dawn-pulse"></span>
            새벽배송 마감 임박
          </span>
          {/* 도착 시각을 단정하지 않는다 — 샘플이 지킬 수 없는 약속이다 */}
          <span className="font-sans text-xs">오늘 밤 11시 전 주문 시, 내일 아침 7시 전 도착 (예시 안내)</span>
          <span className="font-bold text-secondary-fixed bg-black/25 px-2 py-0.5 rounded tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span id="dawn-timer">
              {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
            </span> 남음
          </span>
          <span className="text-on-primary-container text-[11px] font-sans hidden lg:inline">
            | 전 차량 골든 콜드체인 안심센서 가동 중 (예시 화면)
          </span>
        </div>
      </div>

      {/* UTILITY SUB-HEADER */}
      <div className="bg-surface-container-low border-b border-outline-variant text-[13px] text-on-surface-variant">
        <div className="max-w-7xl mx-auto px-4 lg:px-12 py-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-4 min-w-0">
            {/* 좁은 화면에서는 오른쪽 두 링크만으로도 가로가 꽉 찬다 — 이 배지까지 두면 줄이 밀려 나간다 */}
            <span className="hidden lg:flex items-center gap-1 text-[11px] font-mono text-secondary font-medium whitespace-nowrap">
              <span className="material-symbols-outlined text-base">verified</span>
              산지직송 실명제 (예시)
            </span>
            <span className="hidden lg:inline text-outline-variant">|</span>
            <button
              type="button"
              onClick={() => scrollToSection('coldchain-inspection')}
              className="hidden lg:inline hover:text-primary transition-colors text-xs"
            >
              골든 콜드체인 0~2℃ 여정기록
            </button>
            <span className="hidden lg:inline text-outline-variant">|</span>
            <button
              type="button"
              onClick={() => scrollToSection('recipe-section')}
              className="hidden lg:inline hover:text-primary transition-colors text-xs"
            >
              셰프의 파인다이닝 키친
            </button>
          </div>
          <div className="flex items-center gap-2 lg:gap-3 text-xs font-sans shrink-0">
            <button
              type="button"
              onClick={onOpenAddress}
              className="cursor-pointer hover:text-primary whitespace-nowrap inline-flex items-center px-1 max-lg:min-h-11"
            >
              새벽 배송지역 조회
            </button>
            {/* 고객센터 번호는 푸터에도 있다 — 좁은 화면에서는 줄이 두 겹으로 접혀 글자가 뭉개지므로 감춘다 */}
            <span className="hidden lg:inline text-outline-variant">·</span>
            <span className="hidden lg:inline text-on-surface-variant whitespace-nowrap">고객센터 1588-0000 (예시)</span>
            <span className="text-outline-variant">·</span>
            <button
              type="button"
              onClick={onOpenNotice}
              className="cursor-pointer hover:text-primary font-medium text-primary whitespace-nowrap inline-flex items-center px-1 max-lg:min-h-11"
            >
              로그인 / 회원가입
            </button>
          </div>
        </div>
      </div>

      {/* MAIN APP BAR — 공용 샘플 바에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다(바가 없으면 0px) */}
      <header className="bg-surface-container-lowest shadow-sm border-b border-outline-variant sticky top-[var(--sample-bar-h,0px)] z-40">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col">
          {/* Upper Tier: Brand + Search + Actions */}
          <div className="flex items-center justify-between py-3 gap-3 lg:gap-4">
            {/* Brand — 빈 앵커 주소는 눌러도 아무 일이 없어 맨 위로 올리는 버튼으로 바꾼다 */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="VERDE GOURMET — 맨 위로"
              className="flex items-center gap-2 lg:gap-3 min-w-0 group text-left"
            >
              <img
                src="/demo-media/verde-gourmet/verde-gourmet-08.png"
                alt="VERDE GOURMET Brand Logo"
                className="w-9 h-9 lg:w-10 lg:h-10 shrink-0 rounded-lg object-contain bg-surface-container-lowest border border-outline-variant p-0.5 shadow-sm group-hover:scale-105 transition-all"
              referrerPolicy="no-referrer" />
              <span className="flex flex-col min-w-0">
                {/* 이 글자가 모바일에서 커서 헤더가 375px 보다 넓어졌고, 브라우저가 지면을 통째로 축소해 글자가 작아졌다 */}
                <span className="text-lg lg:text-3xl font-bold text-primary tracking-tight leading-none truncate">
                  VERDE GOURMET
                </span>
                <span className="text-[10px] lg:text-[11px] font-mono text-secondary tracking-widest mt-0.5 font-bold truncate">
                  베르데 고메 · 새벽신선
                </span>
              </span>
            </button>

            {/* Search Bar with Real-time Keywords */}
            <div className="flex-1 max-w-xl hidden lg:block mx-4">
              <SearchForm
                value={searchQuery}
                onChange={setSearchQuery}
                onSearchSubmit={handleSearchSubmit}
                onClear={handleClearSearch}
              />
              <div className="flex items-center gap-2 mt-1.5 px-2 text-[11px] font-sans text-on-surface-variant overflow-hidden">
                <span className="text-secondary font-bold flex-shrink-0">인기</span>
                {['마블링 한우', '제주 흙당근', '노르웨이 생연어', '천연발효 사워도우'].map((keyword, idx) => (
                  <React.Fragment key={keyword}>
                    {idx > 0 && <span className="text-outline-variant">·</span>}
                    <button
                      type="button"
                      onClick={() => onSearch(keyword)}
                      className="cursor-pointer hover:underline whitespace-nowrap"
                    >
                      {keyword}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Trailing Actions */}
            <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
              {/* Delivery Address Badge */}
              <button
                type="button"
                onClick={onOpenAddress}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-full border border-outline-variant text-xs text-primary hover:border-primary transition-all text-left"
              >
                <span className="material-symbols-outlined text-secondary text-lg">location_on</span>
                <span className="max-w-[140px] truncate font-medium">서울 용산구 한남동</span>
                <span className="bg-secondary text-on-secondary px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                  새벽배송
                </span>
              </button>

              {/* Wishlist Button — 누르면 찜한 상품만 보여 주는 실제 필터다 */}
              <button
                type="button"
                onClick={onToggleWishlistOnly}
                aria-label={isWishlistOnly ? '찜한 상품만 보기 해제' : '찜한 상품만 보기'}
                aria-pressed={isWishlistOnly}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-colors ${ isWishlistOnly ? 'bg-error-container text-error' : 'text-on-surface-variant hover:text-primary' }`}
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: isWishlistOnly ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-error text-on-error text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={onOpenCart}
                id="cart-indicator-btn"
                aria-label="장바구니 열기"
                className="relative flex min-h-11 items-center gap-2 bg-primary-container text-on-primary px-3.5 py-2 rounded-full hover:bg-secondary transition-all active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                <span className="text-xs font-mono font-bold hidden lg:inline">장바구니</span>
                <span
                  id="cart-counter-badge"
                  className="bg-on-tertiary-container text-on-primary text-[11px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center transition-transform"
                >
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* 1023px 이하에는 검색창이 아예 없어 상품을 찾을 방법이 칩뿐이었다 — 같은 폼을 한 줄로 내려 준다 */}
          <div className="lg:hidden pb-3">
            <SearchForm
              value={searchQuery}
              onChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
              onClear={handleClearSearch}
            />
          </div>

          {/* Lower Tier: Categories & Navigation Links */}
          <nav className="border-t border-outline-variant/60 py-2.5 flex items-center justify-between overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6 flex-shrink-0">
              {/* Category Drawer Trigger */}
              <button
                type="button"
                onClick={onOpenCategory}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors pr-2 max-lg:min-h-11"
              >
                <span className="material-symbols-outlined">menu</span>
                <span className="text-sm">카테고리</span>
              </button>

              {/* Navigation Links — 전부 이 지면 안에 실제로 있는 구역으로 간다 */}
              <div className="flex items-center gap-5 lg:gap-8">
                <button
                  type="button"
                  onClick={() => scrollToSection('best-section')}
                  className="text-primary border-b-2 border-primary pb-1 text-sm whitespace-nowrap font-bold inline-flex items-center max-lg:min-h-11"
                >
                  베스트
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('recipe-section')}
                  className="text-on-surface-variant hover:text-primary pb-1 text-sm transition-colors whitespace-nowrap inline-flex items-center max-lg:min-h-11"
                >
                  셰프의 레시피
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('coldchain-inspection')}
                  className="text-on-surface-variant hover:text-primary pb-1 text-sm transition-colors whitespace-nowrap inline-flex items-center gap-1 max-lg:min-h-11"
                >
                  <span className="material-symbols-outlined text-secondary text-sm">ac_unit</span>
                  골든 콜드체인
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('verde-pillars')}
                  className="text-on-surface-variant hover:text-primary pb-1 text-sm transition-colors whitespace-nowrap inline-flex items-center max-lg:min-h-11"
                >
                  교환·환불 안내
                </button>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-secondary">
              <span className="inline-flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-secondary animate-dawn-pulse"></span>
                전국 허브 0.0~2.0℃ 동기화 (예시 수치)
              </span>
            </div>
          </nav>
        </div>
      </header>

      {/* QUICK CATEGORY PILLS BAR — 칩마다 실제 검색어가 걸리고, 지금 걸린 칩이 진하게 남는다 */}
      <div className="bg-surface-container-low border-b border-outline-variant py-2.5">
        <div className="max-w-7xl mx-auto px-4 lg:px-12 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {QUICK_PILLS.map((pill) => {
            const isActive = searchTerm === pill.query;
            return (
              <button
                key={pill.name}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSearch(isActive ? '' : pill.query)}
                className={`px-3.5 py-1.5 max-lg:min-h-11 rounded-full text-xs font-medium flex-shrink-0 flex items-center gap-1 transition-all ${ isActive ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant border border-outline-variant' }`}
              >
                <span className="material-symbols-outlined text-sm">{pill.icon}</span>
                {pill.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
