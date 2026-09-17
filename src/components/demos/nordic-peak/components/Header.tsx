import React from 'react';
import { BRAND_LOGO_URL, CATEGORIES, PRODUCTS } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenWeather: () => void;
  onOpenSearch: () => void;
  activeNav: string;
  onSelectNav: (category: string) => void;
  onTagClick: (tag: string) => void;
}

/** 인기 태그 — 누르면 검색 HUD 가 실제로 이 말로 검색한다(죽은 장식이 아니다) */
const TREND_TAGS = ['지오데식', '5,000mm', '알루미늄 11mm', '티타늄', '실타프'];

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenWeather,
  onOpenSearch,
  activeNav,
  onSelectNav,
  onTagClick,
}) => {
  const countOf = (key: string) => PRODUCTS.filter((p) => p.category === key).length;

  return (
    <>
      {/* 1. 상단 안내 바 — 배송 조건은 「보증」이 아니라 예시 안내로 적는다 */}
      <aside className="bg-tertiary-container text-on-tertiary-container px-4 py-2 border-b border-outline-variant font-label-mono-sm text-label-mono-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-tertiary-fixed shrink-0"></span>
            {/* 모바일에서는 짧은 문장을 쓴다 — 긴 문장을 truncate 하면 글자가 잘려 나간다 */}
            <span className="font-bold tracking-wide shrink-0 lg:hidden">[특급 출고]</span>
            <span className="font-bold tracking-wide shrink-0 hidden lg:inline">
              [익스페디션 기어 특급 출고]
            </span>
            <span className="lg:hidden">오후 3시 이전 결제분 당일 발송 (예시)</span>
            <span className="hidden lg:inline">
              오후 3시 이전 결제 시 당일 방수 패킹 발송 | 강원·경기 동계 캠핑장 직배송 (예시 안내)
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                verified_user
              </span>{' '}
              MIL-STD-810G 기준 자체 시험 (예시 표기)
            </span>
            <span className="opacity-50">|</span>
            <button
              onClick={() => {
                const el = document.getElementById('field-service');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer whitespace-nowrap"
            >
              현장 출동 정비소 안내
            </button>
          </div>
        </div>
      </aside>

      {/* 2. 전역 내비게이션 */}
      <header className="bg-surface sticky top-[var(--sample-bar-h,0px)] z-40 border-b border-outline-variant backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-3.5 flex items-center justify-between gap-3 lg:gap-4">
          {/* 브랜드 */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 lg:gap-3 group cursor-pointer text-left min-w-0 min-h-11"
          >
            <img
              alt="NORDIC PEAK 브랜드 로고 (가상 브랜드)"
              className="w-8 h-8 lg:w-10 lg:h-10 object-contain rounded-sm border border-outline-variant group-hover:border-primary transition-colors shrink-0"
              src={BRAND_LOGO_URL}
              referrerPolicy="no-referrer"
            />
            {/* 좁은 폰에서 로고 글자가 줄바꿈돼 헤더가 4줄이 됐다 — 줄바꿈 대신 줄여서 흘린다 */}
            <span className="block min-w-0">
              <span className="block font-headline-sm text-[14px] min-[420px]:text-[15px] lg:text-headline-sm font-bold tracking-wide lg:tracking-widest text-on-surface uppercase leading-none truncate">
                NORDIC PEAK
              </span>
              {/* min-[420px] 는 모바일/웹 경계가 아니라 좁은 폰에서만 부제를 접는 밀도 조정이다 */}
              <span className="hidden min-[420px]:block font-label-mono-sm text-label-mono-sm text-outline tracking-wider mt-0.5 whitespace-nowrap">
                TACTICAL OUTDOOR SPEC
              </span>
            </span>
          </button>

          {/* 분류 메뉴 (lg 이상) — 상품이 실제로 있는 분류만 둔다 */}
          <nav className="hidden lg:flex items-center gap-5 shrink-0">
            {CATEGORIES.map((c) => {
              const active = activeNav === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => onSelectNav(c.key)}
                  aria-pressed={active}
                  className={`font-label-mono-md text-label-mono-md pb-1 flex items-center gap-1.5 whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                    active
                      ? 'border-b-2 border-tertiary-container text-on-surface font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>}
                  {c.label}
                  <span className="text-outline">({countOf(c.key)})</span>
                </button>
              );
            })}
          </nav>

          {/* 우측 동작 묶음 */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* 검색 (lg) */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center bg-surface-container border border-outline-variant px-3 py-2 rounded-sm gap-2 w-56 hover:border-outline transition-colors text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-outline shrink-0" style={{ fontSize: 16 }}>
                travel_explore
              </span>
              <span className="font-label-mono-sm text-label-mono-sm text-outline whitespace-nowrap">
                기어 검색
              </span>
              <span className="ml-auto font-label-mono-sm text-label-mono-sm bg-surface-container-high px-1.5 py-0.5 rounded text-primary shrink-0">
                ⌘K
              </span>
            </button>

            {/* 검색 (모바일) */}
            <button
              onClick={onOpenSearch}
              aria-label="기어 검색 열기"
              className="lg:hidden h-11 w-11 flex items-center justify-center bg-surface-container border border-outline-variant rounded-sm text-outline hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                search
              </span>
            </button>

            {/* 기상 HUD */}
            <button
              onClick={onOpenWeather}
              aria-label="필드 기상 관측 HUD 열기"
              className="h-11 lg:h-auto min-w-11 lg:min-w-0 flex items-center justify-center gap-1.5 bg-surface-container border border-outline-variant px-2.5 lg:py-2 rounded-sm hover:bg-surface-container-high transition-colors cursor-pointer"
              title="필드 기상 관측 HUD"
            >
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>
                radar
              </span>
              <span className="hidden lg:inline font-label-mono-sm text-label-mono-sm text-on-surface whitespace-nowrap">
                기상 관측 HUD
              </span>
            </button>

            {/* 기어백 */}
            <button
              onClick={onOpenCart}
              aria-label={`기어백 열기 (담긴 장비 ${cartCount}개)`}
              className="h-11 lg:h-auto flex items-center gap-2 bg-primary-container text-on-primary-container px-3 lg:py-2 rounded-sm hover:bg-surface-container-highest transition-colors active:scale-95 duration-150 cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>
                shopping_bag
              </span>
              {/* sm 은 모바일/웹 경계가 아니라 좁은 폰에서만 글자를 접는 밀도 조정이다 */}
              <span className="hidden sm:inline font-label-mono-md text-label-mono-md font-semibold whitespace-nowrap">
                기어백
              </span>
              <span className="bg-tertiary-container text-on-tertiary font-label-mono-sm text-label-mono-sm font-bold px-1.5 rounded-sm">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* 인기 태그 — 「실시간」이라고 적지 않는다(실제로 집계하지 않는다) */}
        <div className="bg-surface-container-lowest border-t border-outline-variant px-4 lg:px-6 flex items-center overflow-x-auto no-scrollbar gap-3 font-label-mono-sm text-label-mono-sm">
          <span className="text-primary font-bold whitespace-nowrap flex items-center gap-1 shrink-0">
            <span className="material-symbols-outlined" style={{ fontSize: 13 }}>
              bolt
            </span>{' '}
            인기 검색 태그 (예시):
          </span>
          <div className="flex items-center gap-3 text-outline">
            {TREND_TAGS.map((tag, i) => (
              <React.Fragment key={tag}>
                {i > 0 && <span className="text-outline-variant shrink-0">·</span>}
                <button
                  onClick={() => onTagClick(tag)}
                  className="min-h-11 lg:min-h-0 lg:py-1.5 flex items-center hover:text-on-surface whitespace-nowrap cursor-pointer"
                >
                  #{tag}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};
