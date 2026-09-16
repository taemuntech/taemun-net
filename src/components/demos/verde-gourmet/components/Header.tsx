import React, { useState, useEffect } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAddress: () => void;
  onOpenCategory: () => void;
  onSelectSearchKeyword: (keyword: string) => void;
  selectedPill: string;
  onSelectPill: (pill: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenAddress,
  onOpenCategory,
  onSelectSearchKeyword,
  selectedPill,
  onSelectPill,
  wishlistCount,
  onOpenWishlist
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

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSelectSearchKeyword(searchQuery.trim());
    }
  };

  const quickPills = [
    { name: '신선정육 (1++)', icon: 'restaurant' },
    { name: '산지수산 직송', icon: 'set_meal' },
    { name: '친환경 유기농 채소', icon: 'eco' },
    { name: '당도보증 프리미엄 과일', icon: 'nutrition' },
    { name: '아티장 베이커리 & 델리', icon: 'bakery_dining' },
    { name: '치즈 & 샤퀴테리', icon: 'lunch_dining' },
    { name: '소믈리에 셀렉션 와인', icon: 'wine_bar' },
    { name: '레스토랑 간편식(RMR)', icon: 'soup_kitchen' }
  ];

  return (
    <>
      {/* DAWN DELIVERY COUNTDOWN TOP BANNER */}
      <div id="dawn-banner" className="bg-primary-container text-on-primary py-2 px-4 border-b border-primary text-center relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap text-xs font-mono">
          <span className="inline-flex items-center gap-1 bg-on-tertiary-container/20 text-on-tertiary-container px-2 py-0.5 rounded text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container animate-dawn-pulse"></span>
            새벽배송 마감 임박
          </span>
          <span className="font-sans text-xs">오늘 밤 11시 전 주문 시, 내일 아침 7시 문 앞 도착!</span>
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
        <div className="max-w-7xl mx-auto px-4 lg:px-12 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px] font-mono text-secondary font-medium">
              <span className="material-symbols-outlined text-base">verified</span>
              산지직송 실명제 (예시)
            </span>
            <span className="hidden lg:inline text-outline-variant">|</span>
            <a href="#coldchain-inspection" className="hidden lg:inline hover:text-primary transition-colors text-xs">
              골든 콜드체인 0~2℃ 여정기록
            </a>
            <span className="hidden lg:inline text-outline-variant">|</span>
            <a href="#recipe-section" className="hidden lg:inline hover:text-primary transition-colors text-xs">
              셰프의 파인다이닝 키친
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs font-sans">
            <button onClick={onOpenAddress} className="cursor-pointer hover:text-primary">
              새벽 배송지역 조회
            </button>
            <span className="text-outline-variant">·</span>
            <span className="text-on-surface-variant">고객센터 1588-0000 (예시)</span>
            <span className="text-outline-variant">·</span>
            <button onClick={() => alert('샘플 사이트입니다 — 로그인·회원가입은 동작하지 않고, 입력하신 내용은 어디에도 전송되지 않습니다.')} className="cursor-pointer hover:text-primary font-medium text-primary">
              로그인 / 회원가입
            </button>
          </div>
        </div>
      </div>

      {/* MAIN APP BAR */}
      <header className="bg-surface-container-lowest shadow-sm border-b border-outline-variant sticky top-0 z-40">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col">
          {/* Upper Tier: Brand + Search + Actions */}
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Brand Logo & Identity */}
            <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1VmxE1YrHr6FSfXDIw14QsD1V3JIe0Ck4q3cfeFVfd4EbLtTBx7_KadPpwjs0q1KHmbRMpjVCfbhWsZOT2tv0EPXTdBRIOhEnhS5jvTk55yKbi-kook61H20rogooepq7PkV_QfZtyE2BbpjP-ve486vVVQOYKRcagqCyo2ljD2yhnvudc8Ssbr1972RWC-7QWDitjVDML6VeY1kSbqkn6RMgUa1TPZbMXG8_udOA90Slp6SrdSPIaSkpw"
                alt="VERDE GOURMET Brand Logo"
                className="w-10 h-10 rounded-lg object-contain bg-surface-container-lowest border border-outline-variant p-0.5 shadow-sm group-hover:scale-105 transition-all"
              referrerPolicy="no-referrer" />
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-bold text-primary tracking-tight leading-none">
                  VERDE GOURMET
                </span>
                <span className="text-[11px] font-mono text-secondary tracking-widest mt-0.5 font-bold">
                  베르데 고메 · 새벽신선
                </span>
              </div>
            </a>

            {/* Search Bar with Real-time Keywords */}
            <div className="flex-1 max-w-xl hidden lg:block mx-4">
              {/* 접수 폼이 아니라 화면 안 카테고리만 바꾸는 검색창 — 입력값은 어디에도 전송되지 않는다 */}
              <form role="search" onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="1++ No.9 안심, 제주 유기농 당근, 르방 사워도우 검색"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2.5 pl-4 pr-11 text-[13px] placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
                />
                <button
                  type="submit"
                  aria-label="검색"
                  className="absolute right-3 text-primary hover:text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">search</span>
                </button>
              </form>
              <div className="flex items-center gap-2 mt-1.5 px-2 text-[11px] font-sans text-on-surface-variant overflow-hidden">
                <span className="text-secondary font-bold flex-shrink-0">인기</span>
                <button
                  type="button"
                  onClick={() => { setSearchQuery('1++ No.9 한우'); onSelectSearchKeyword('1++ No.9 한우'); }}
                  className="cursor-pointer hover:underline"
                >
                  1++ No.9 한우
                </button>
                <span className="text-outline-variant">·</span>
                <button
                  type="button"
                  onClick={() => { setSearchQuery('제주 햇당근'); onSelectSearchKeyword('제주 햇당근'); }}
                  className="cursor-pointer hover:underline"
                >
                  제주 햇당근
                </button>
                <span className="text-outline-variant">·</span>
                <button
                  type="button"
                  onClick={() => { setSearchQuery('오로라 생연어'); onSelectSearchKeyword('오로라 생연어'); }}
                  className="cursor-pointer hover:underline"
                >
                  오로라 생연어
                </button>
                <span className="text-outline-variant">·</span>
                <button
                  type="button"
                  onClick={() => { setSearchQuery('천연발효 사워도우'); onSelectSearchKeyword('천연발효 사워도우'); }}
                  className="cursor-pointer hover:underline"
                >
                  천연발효 사워도우
                </button>
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

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={onOpenWishlist}
                aria-label="관심상품"
                className="p-2 text-on-surface-variant hover:text-primary transition-colors relative"
              >
                <span className="material-symbols-outlined text-2xl">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-error text-on-error text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={onOpenCart}
                id="cart-indicator-btn"
                aria-label="장바구니"
                className="relative flex items-center gap-2 bg-primary-container text-on-primary px-3.5 py-2 rounded-full hover:bg-secondary transition-all active:scale-95 shadow-sm"
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

          {/* Lower Tier: Categories & Navigation Links */}
          <nav className="border-t border-outline-variant/60 py-2.5 flex items-center justify-between overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6 flex-shrink-0">
              {/* Category Drawer Trigger */}
              <button
                type="button"
                onClick={onOpenCategory}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors pr-2"
              >
                <span className="material-symbols-outlined">menu</span>
                <span className="text-sm">카테고리</span>
              </button>

              {/* Navigation Links */}
              <div className="flex items-center gap-5 lg:gap-8">
                <a href="#best-section" className="text-primary border-b-2 border-primary pb-1 text-sm whitespace-nowrap font-bold">
                  베스트
                </a>
                <a href="#best-section" className="text-on-surface-variant hover:text-primary pb-1 text-sm transition-colors whitespace-nowrap">
                  신상품
                </a>
                <a href="#best-section" className="text-on-surface-variant hover:text-primary pb-1 text-sm transition-colors whitespace-nowrap">
                  일일 특가
                </a>
                <a href="#recipe-section" className="text-on-surface-variant hover:text-primary pb-1 text-sm transition-colors whitespace-nowrap">
                  셰프의 레시피
                </a>
                <a href="#coldchain-inspection" className="text-on-surface-variant hover:text-primary pb-1 text-sm transition-colors whitespace-nowrap flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-sm">ac_unit</span>
                  골든 콜드체인
                </a>
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

      {/* QUICK CATEGORY PILLS BAR */}
      <div className="bg-surface-container-low border-b border-outline-variant py-2.5">
        <div className="max-w-7xl mx-auto px-4 lg:px-12 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPills.map((pill) => {
            const isActive = selectedPill === pill.name;
            return (
              <button
                key={pill.name}
                type="button"
                onClick={() => onSelectPill(pill.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex-shrink-0 flex items-center gap-1 transition-all ${ isActive ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant border border-outline-variant' }`}
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
