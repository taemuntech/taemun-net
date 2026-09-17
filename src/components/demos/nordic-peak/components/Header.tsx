import React from 'react';
import { BRAND_LOGO_URL } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenWeather: () => void;
  onOpenSearch: () => void;
  activeNav: string;
  onSelectNav: (category: string) => void;
  onTagClick: (tag: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenWeather,
  onOpenSearch,
  activeNav,
  onSelectNav,
  onTagClick,
}) => {
  return (
    <>
      {/* 1. Top Urgent Operational Notification Bar */}
      <aside className="bg-tertiary-container text-on-tertiary-container px-4 py-2 border-b border-outline-variant font-label-mono-sm text-label-mono-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-tertiary-fixed animate-ping"></span>
            <span className="font-bold text-on-tertiary tracking-wide">
              [익스페디션 기어 특급 출고]
            </span>
            <span className="truncate">
              오후 3시 이전 결제 시 당일 군용 규격 방수 패킹 발송 | 강원·경기 동계 캠핑장 직배송 제휴
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-on-surface font-label-mono-sm text-label-mono-sm">
            <span className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                verified_user
              </span>{' '}
              MIL-SPEC 810G 인증
            </span>
            <span className="text-outline-variant">|</span>
            <button
              onClick={() => {
                const el = document.getElementById('field-service');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer text-on-surface"
            >
              현장 출동 정비소 리스트
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Global Tactical Navigation Header */}
      <header className="bg-surface sticky top-[var(--sample-bar-h,0px)] z-40 border-b border-outline-variant backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Left: Brand ID */}
          <div className="flex items-center gap-3">
            <a
              className="flex items-center gap-3 group cursor-pointer"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                alt="NORDIC PEAK Brand Logo"
                className="w-10 h-10 object-contain rounded-sm border border-outline-variant group-hover:border-primary transition-colors"
                src={BRAND_LOGO_URL} referrerPolicy="no-referrer" />
              <div>
                <div className="font-headline-sm text-headline-sm font-bold tracking-widest text-on-surface uppercase leading-none">
                  NORDIC PEAK
                </div>
                <div className="font-label-mono-sm text-label-mono-sm text-outline tracking-wider mt-0.5">
                  TACTICAL OUTDOOR SPEC
                </div>
              </div>
            </a>
          </div>

          {/* Navigation Links (Desktop lg: Only) */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => onSelectNav('shelter')}
              className={`font-label-mono-md text-label-mono-md uppercase pb-1 flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                activeNav === 'shelter'
                  ? 'border-b-2 border-tertiary-container text-on-surface font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {activeNav === 'shelter' && (
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
              )}
              텐트/쉘터
            </button>
            <button
              onClick={() => onSelectNav('tarp')}
              className={`font-label-mono-md text-label-mono-md uppercase pb-1 flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                activeNav === 'tarp'
                  ? 'border-b-2 border-tertiary-container text-on-surface font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {activeNav === 'tarp' && (
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
              )}
              타프/익스텐션
            </button>
            <button
              onClick={() => onSelectNav('furniture')}
              className={`font-label-mono-md text-label-mono-md uppercase pb-1 flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                activeNav === 'furniture'
                  ? 'border-b-2 border-tertiary-container text-on-surface font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {activeNav === 'furniture' && (
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
              )}
              퍼니처/체어
            </button>
            <button
              onClick={() => onSelectNav('sleeping')}
              className={`font-label-mono-md text-label-mono-md uppercase pb-1 flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                activeNav === 'sleeping'
                  ? 'border-b-2 border-tertiary-container text-on-surface font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              슬리핑/침낭
            </button>
            <button
              onClick={() => onSelectNav('cookware')}
              className={`font-label-mono-md text-label-mono-md uppercase pb-1 flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                activeNav === 'cookware'
                  ? 'border-b-2 border-tertiary-container text-on-surface font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {activeNav === 'cookware' && (
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
              )}
              쿡웨어/스토브
            </button>
            <button
              onClick={() => onSelectNav('lighting')}
              className={`font-label-mono-md text-label-mono-md uppercase pb-1 flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                activeNav === 'lighting'
                  ? 'border-b-2 border-tertiary-container text-on-surface font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              조명/랜턴
            </button>
            <button
              onClick={() => onSelectNav('backpacking')}
              className={`font-label-mono-md text-label-mono-md uppercase pb-1 flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                activeNav === 'backpacking'
                  ? 'border-b-2 border-tertiary-container text-on-surface font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              백패킹 기어
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Search HUD Trigger (Desktop) */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center bg-surface-container border border-outline-variant px-3 py-1.5 rounded-sm gap-2 w-64 hover:border-outline transition-colors text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-outline" style={{ fontSize: 16 }}>
                travel_explore
              </span>
              <span className="font-label-mono-sm text-label-mono-sm text-outline truncate">
                #지오데식 돔 #내수압 5000mm
              </span>
              <span className="ml-auto font-label-mono-sm text-label-mono-sm bg-surface-container-high px-1 py-0.5 rounded text-primary">
                ⌘K
              </span>
            </button>

            {/* Mobile Search button */}
            <button
              onClick={onOpenSearch}
              className="lg:hidden p-2 bg-surface-container border border-outline-variant rounded-sm text-outline hover:text-on-surface"
              title="검색"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                search
              </span>
            </button>

            {/* Telemetry / Dispatch Indicator */}
            <button
              onClick={onOpenWeather}
              className="flex items-center gap-1.5 bg-surface-container border border-outline-variant px-2.5 py-1.5 rounded-sm hover:bg-surface-container-high transition-colors cursor-pointer"
              title="필드 텔레메트리 관제"
            >
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
                radar
              </span>
              <span className="hidden lg:inline font-label-mono-sm text-label-mono-sm text-on-surface">
                기상 관측 HUD
              </span>
            </button>

            {/* Cart Action with Count Badge */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-primary-container text-on-primary-container px-3 py-1.5 rounded-sm hover:bg-surface-container-highest transition-colors active:scale-95 duration-150 cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
                shopping_bag
              </span>
              <span className="font-label-mono-md text-label-mono-md font-semibold">기어백</span>
              <span className="bg-tertiary-container text-on-tertiary font-label-mono-sm text-label-mono-sm font-bold px-1.5 py-0.2 rounded-sm">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Live Tactical Hashtag Ticker Bar (Mobile & Desktop) */}
        <div className="bg-surface-container-lowest border-t border-outline-variant px-4 lg:px-6 py-1.5 flex items-center overflow-x-auto no-scrollbar gap-3 font-label-mono-sm text-label-mono-sm">
          <span className="text-primary font-bold whitespace-nowrap flex items-center gap-1">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 13 }}>
              bolt
            </span>{' '}
            실시간 검색 트렌드:
          </span>
          <div className="flex items-center gap-3 text-outline">
            <button
              onClick={() => onTagClick('바르그 4.2')}
              className="hover:text-on-surface whitespace-nowrap cursor-pointer"
            >
              #바르그 4.2 지오데식
            </button>
            <span className="text-outline-variant">·</span>
            <button
              onClick={() => onTagClick('내수압 5000mm')}
              className="hover:text-on-surface whitespace-nowrap cursor-pointer"
            >
              #내수압 5000mm 립스탑
            </button>
            <span className="text-outline-variant">·</span>
            <button
              onClick={() => onTagClick('DAC 페더라이트')}
              className="hover:text-on-surface whitespace-nowrap cursor-pointer"
            >
              #DAC 페더라이트 NSL
            </button>
            <span className="text-outline-variant">·</span>
            <button
              onClick={() => onTagClick('동계')}
              className="hover:text-on-surface whitespace-nowrap cursor-pointer"
            >
              #동계 솔로 돔
            </button>
            <span className="text-outline-variant">·</span>
            <button
              onClick={() => onTagClick('티타늄')}
              className="hover:text-on-surface whitespace-nowrap cursor-pointer"
            >
              #티타늄 스토브 1200ml
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
