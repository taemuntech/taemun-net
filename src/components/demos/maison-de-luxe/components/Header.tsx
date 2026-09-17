import React, { useEffect, useRef, useState } from 'react';
import { BRAND_LOGO_URL, SECTION_LINKS } from '../data/luxuryData';
import { ShieldCheck, Heart, ShoppingBag, Search, Headphones, User } from 'lucide-react';

interface HeaderProps {
  onOpenSerialModal: () => void;
  onOpenConcierge: () => void;
  onToggleCart: () => void;
  cartCount: number;
  wishlistCount: number;
  wishlistOnly: boolean;
  onToggleWishlistOnly: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

/** 아이콘 버튼 — 모바일에서 44px 탭 대상을 보장한다(lg 미만에서 min-h/min-w 11) */
const ICON_BUTTON =
  'relative flex items-center justify-center text-[#e5e2e1] transition-colors hover:text-[#f2ca50] cursor-pointer h-11 w-11 lg:h-9 lg:w-9';

export const Header: React.FC<HeaderProps> = ({
  onOpenSerialModal,
  onOpenConcierge,
  onToggleCart,
  cartCount,
  wishlistCount,
  wishlistOnly,
  onToggleWishlistOnly,
  searchQuery,
  onSearchChange,
}) => {
  // 예전에는 alert() 로 회원 등급을 띄웠다 — 이 저장소는 네이티브 다이얼로그를 쓰지 않는다.
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isStatusOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsStatusOpen(false);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) setIsStatusOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [isStatusOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 검색 폼은 접수가 아니라 화면 조작이다 — role="search" 로 표시하고 제출은 막는다.
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="w-full px-4 lg:px-16 py-2 border-b border-[#4d4635] flex flex-col gap-2 bg-[#0e0e0e] relative z-40">
      {/* Top Row: VIP Notice & Global Ticker */}
      <div className="flex items-center justify-between text-[#99907c] border-b border-[#4d4635] pb-2 text-xs gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse shrink-0"></span>
          <span className="text-[10px] tracking-widest text-[#d0c5af] font-medium [word-break:keep-all]">
            ARCHIVAL BOUTIQUE &amp; CONCIERGE SALON — 가상 브랜드 샘플 사이트입니다
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-[10px] tracking-wider font-medium shrink-0">
          <button
            type="button"
            className="text-[#f2ca50] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
            onClick={onOpenSerialModal}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            디지털 감정 이력 조회
          </button>
          <span className="text-[#99907c]">|</span>
          <span className="text-[#d0c5af]">관·부가세 포함 표시가</span>
          <span className="text-[#99907c]">|</span>
          <span className="text-[#f2ca50] font-semibold">수령 후 7일 검수 반품 (예시 정책)</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between py-1 gap-3">
        {/* Brand Logo Cluster */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer text-left min-h-11"
            aria-label="맨 위로"
          >
            <img
              alt="MAISON DE LUXE 로고 (가상 브랜드)"
              className="w-10 h-10 object-contain rounded-full border border-[#d4af37]/40 group-hover:border-[#f2ca50] transition-colors shrink-0"
              src={BRAND_LOGO_URL}
              referrerPolicy="no-referrer"
            />
            <span className="flex flex-col min-w-0">
              <span className="font-serif text-lg lg:text-xl tracking-wider uppercase text-[#f2ca50] leading-tight font-medium">
                MAISON DE LUXE
              </span>
              <span className="text-[10px] text-[#99907c] tracking-widest -mt-0.5">PARIS · SEOUL · MILANO</span>
            </span>
          </button>
        </div>

        {/* Center Section Navigation (Desktop) — 이 페이지에 실제로 있는 구역만 가리킨다 */}
        <nav className="hidden lg:flex items-center gap-7">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.id}
              className="text-[#d0c5af] hover:text-[#f2ca50] tracking-widest uppercase transition-colors text-[11px] whitespace-nowrap"
              href={`#${link.id}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Trailing Actions & Search */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center bg-[#1c1b1b] border border-[#d4af37]/30 px-3 py-1.5 rounded"
          >
            <input
              className="bg-transparent border-none focus:outline-none text-[#e5e2e1] text-xs w-40 xl:w-48 placeholder-[#99907c]"
              placeholder="메종·상품명·로트번호 검색"
              type="search"
              aria-label="컬렉션 검색"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button type="submit" className="text-[#f2ca50] hover:text-[#ffe088] transition-colors" aria-label="검색">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-1 lg:gap-2 text-[#e5e2e1]">
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
              className={`${ICON_BUTTON} ${wishlistOnly ? 'text-[#f2ca50]' : ''}`}
              onClick={onToggleWishlistOnly}
              aria-pressed={wishlistOnly}
              title={wishlistOnly ? '전체 컬렉션 보기' : '위시리스트만 보기'}
              aria-label={wishlistOnly ? '전체 컬렉션 보기' : `위시리스트만 보기 (${wishlistCount}개)`}
            >
              <Heart className={`w-5 h-5 ${wishlistOnly ? 'fill-[#f2ca50]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#f2ca50] text-[#0e0e0e] text-[10px] flex items-center justify-center font-bold rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              id="cart-toggle-btn"
              className={ICON_BUTTON}
              onClick={onToggleCart}
              title="장바구니 열기"
              aria-label={`장바구니 열기 (${cartCount}개)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#f2ca50] text-[#0e0e0e] text-[10px] flex items-center justify-center font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative" ref={statusRef}>
              <button
                type="button"
                className={`${ICON_BUTTON} text-[#f2ca50]`}
                title="회원 등급 보기"
                aria-label="회원 등급 보기"
                aria-expanded={isStatusOpen}
                onClick={() => setIsStatusOpen((v) => !v)}
              >
                <span className="flex items-center justify-center w-8 h-8 border border-[#d4af37]/40 rounded-full">
                  <User className="w-5 h-5 p-0.5" />
                </span>
              </button>

              {isStatusOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-2rem)] bg-[#0e0e0e] border border-[#d4af37]/40 p-4 shadow-2xl z-50 text-left">
                  <p className="text-[10px] tracking-widest text-[#99907c] uppercase">Collector Status (예시)</p>
                  <p className="font-serif text-base text-[#f2ca50] mt-0.5 font-medium">NOIR LEVEL</p>
                  <p className="text-[11px] text-[#d0c5af] mt-2 leading-relaxed [word-break:keep-all]">
                    프라이빗 살롱 우선 입장과 전담 컨시어지 상담이 열리는 예시 등급입니다. 샘플 사이트라 실제 회원
                    정보는 없습니다.
                  </p>
                  <button
                    type="button"
                    className="mt-3 w-full min-h-11 lg:min-h-9 border border-[#d4af37]/40 text-[#d0c5af] text-[11px] tracking-wider uppercase hover:text-[#f2ca50] hover:border-[#f2ca50] transition-colors cursor-pointer"
                    onClick={() => setIsStatusOpen(false)}
                  >
                    닫기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile · Tablet (lg 미만) 검색 + 구역 이동 — 예전에는 이 구간에 내비도 검색도 없었다 */}
      <div className="lg:hidden flex flex-col gap-2 pb-1">
        <form
          role="search"
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-[#1c1b1b] border border-[#d4af37]/30 px-3 rounded"
        >
          <input
            className="flex-1 min-w-0 min-h-11 bg-transparent border-none focus:outline-none text-[#e5e2e1] text-xs placeholder-[#99907c]"
            placeholder="메종·상품명·로트번호 검색"
            type="search"
            aria-label="컬렉션 검색"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center h-11 w-11 -mr-2 text-[#f2ca50] hover:text-[#ffe088] transition-colors"
            aria-label="검색"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="shrink-0 whitespace-nowrap border border-[#d4af37]/40 px-3 min-h-11 flex items-center text-[10px] tracking-widest uppercase text-[#d0c5af] hover:text-[#f2ca50] hover:border-[#f2ca50] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenConcierge}
            className="shrink-0 whitespace-nowrap border border-[#f2ca50] text-[#f2ca50] px-3 min-h-11 flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-semibold hover:bg-[#d4af37] hover:text-[#0e0e0e] transition-colors cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5" />
            Concierge
          </button>
        </div>
      </div>
    </header>
  );
};
