'use client';

import React from 'react';
import { BRAND_LOGO_URL, INITIAL_PRODUCTS } from '../data/hardwareData';
import type { InfoModalContent } from './Modals/InfoModal';

interface TopNavBarProps {
  cartCount: number;
  compareCount: number;
  onOpenCart: () => void;
  onOpenCompare: () => void;
  onOpen3DModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onShowInfo: (content: InfoModalContent) => void;
  /** 검색 실행 — 결과 목록으로 스크롤한다(검색어 자체는 입력과 동시에 이미 반영된다) */
  onSubmitSearch: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  cartCount,
  compareCount,
  onOpenCart,
  onOpenCompare,
  onOpen3DModal,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  onShowInfo,
  onSubmitSearch,
}) => {
  // 실제로 결과가 나오는 말만 인기 키워드로 둔다 — 예전 「#타이탄16」 은 상품명 「타이탄 16」 과 띄어쓰기가 달라
  // 눌러도 아무 것도 걸리지 않았다.
  const popularKeywords = ['#GPU 16GB', '#OLED 240Hz', '#타이탄', '#USB4'];

  // 분류 탭은 **실제 상품이 있는 것만** 둔다. 예전에는 「스마트모빌리티」·「부품/수랭」 칩이 있었는데
  // 그 분류의 상품이 0종이라 누르면 언제나 빈 랙과 「조건에 맞는 예시 상품이 없습니다」가 떴고,
  // 기본 선택인 「PC/노트북」은 사실 「전체」로 동작해 켜진 채로 모니터·키보드·헤드셋까지 같이 보였다.
  // 개수를 칩에 붙여 두면 0종 칩이 다시 생겨도 지면에서 바로 보인다(nordic-peak/FilterBar 와 같은 장치).
  const countOf = (id: string) =>
    id === 'all' ? INITIAL_PRODUCTS.length : INITIAL_PRODUCTS.filter((p) => p.category === id).length;

  const categories = [
    { id: 'all', label: '전체', icon: 'apps' },
    { id: 'laptop', label: 'PC/노트북', icon: 'laptop_mac' },
    { id: 'display', label: '디스플레이', icon: 'desktop_windows' },
    { id: 'gear', label: '게이밍기어', icon: 'sports_esports' },
    { id: 'audio', label: '오디오/음향', icon: 'headphones' },
  ].filter((cat) => countOf(cat.id) > 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSearch();
  };

  const searchField = (
    <div className="relative flex items-center">
      <span className="material-symbols-outlined absolute left-3 text-[#8c909f] text-lg pointer-events-none">search</span>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="하드웨어 스펙 검색"
        placeholder="스펙 검색: GPU 16GB, OLED 240Hz, 키보드, 헤드셋..."
        className="w-full h-11 pl-10 pr-24 bg-[#0a0e16] border border-[#424754] rounded text-xs text-[#dfe2ee] focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] focus:outline-none transition-all placeholder:text-[#8c909f]"
      />
      <button
        type="submit"
        className="absolute right-1 h-9 px-3 bg-[#262a33] hover:bg-[#31353e] text-[#4cd7f6] text-[11px] font-label rounded border border-[#424754] transition-colors cursor-pointer"
      >
        스펙 탐색
      </button>
    </div>
  );

  return (
    <>
      {/* Live Logistics & Stock Ticker */}
      <div id="live-ticker" className="bg-[#0a0e16] border-b border-[#424754] py-1 px-4 text-[#c2c6d6] font-label text-[10px] tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[#ec6a06] flex items-center gap-1 font-bold animate-pulse">
              <span className="material-symbols-outlined text-[14px]">bolt</span> 배송 안내 (예시)
            </span>
            <span className="text-[#dfe2ee]">⚡ 테크노바 새벽배송 · 익일 오전 도착 예정 (예시)</span>
            <span className="text-[#8c909f]">|</span>
            <span>주요 카드사 최대 24개월 무이자 할부 (예시)</span>
            <span className="text-[#8c909f]">|</span>
            <span className="text-[#4cd7f6]">제품 등록 시 A/S 연장 프로모션 (예시 표기)</span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-[#8c909f]">
            <span className="flex items-center gap-1 text-[#4cd7f6]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping"></span> 서울 물류센터 정상 가동 (예시 상태 표기)
            </span>
            <button
              type="button"
              onClick={() =>
                onShowInfo({
                  title: '기업 대량구매 문의',
                  lines: [
                    '샘플 사이트라 문의가 접수되지 않습니다. 화면의 고객센터 번호(1588-0000)도 예시 표기입니다.',
                    '실제 운영 시에는 수량·납기·세금계산서 발행 조건을 받는 대량구매 폼과 담당자 배정 흐름을 이 자리에 붙입니다.',
                  ],
                })
              }
              className="hover:text-[#adc6ff] transition-colors cursor-pointer"
            >
              기업 대량구매 문의
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Header — 공용 샘플 바에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다(바가 없으면 0px) */}
      <header id="main-header" className="bg-[#0f131c] border-b border-[#424754] sticky top-[var(--sample-bar-h,0px)] z-40 backdrop-blur-md">
        <div className="w-full px-4 lg:px-6 mx-auto max-w-7xl flex flex-col">
          {/* Upper Action Deck */}
          <div className="flex items-center justify-between py-3.5 gap-4 lg:gap-6">
            {/* Brand Identification */}
            <button
              type="button"
              onClick={() => onSelectCategory('all')}
              className="flex items-center gap-3 text-left cursor-pointer min-h-11"
              aria-label="테크노바 기어 홈 — 전체 분류로"
            >
              <img
                src={BRAND_LOGO_URL}
                alt="TECHNOVA GEAR Logo"
                className="w-10 h-10 object-contain rounded border border-[#424754] bg-[#0a0e16] p-1 shadow-sm"
              referrerPolicy="no-referrer" />
              <div>
                <span className="text-xl lg:text-2xl font-headline font-bold tracking-tight text-[#adc6ff] uppercase block leading-tight">
                  TECHNOVA GEAR
                </span>
                <span className="text-[10px] font-label text-[#8c909f] tracking-widest block font-semibold">
                  HIGH-PERFORMANCE HARDWARE ENGINE
                </span>
              </div>
            </button>

            {/* Spec Search Interface (데스크톱) */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl hidden lg:block" role="search">
              {searchField}
              <div className="flex items-center gap-2 mt-1 text-[11px] font-label text-[#8c909f]">
                <span className="text-[#c2c6d6] font-bold">인기 키워드:</span>
                {popularKeywords.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => onSearchChange(kw.replace('#', ''))}
                    className="hover:text-[#4cd7f6] cursor-pointer transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </form>

            {/* Trailing System Actions */}
            <div className="flex items-center gap-3">
              <button
                id="btn-compare-tray"
                type="button"
                onClick={onOpenCompare}
                title="선택 하드웨어 대조 매트릭스"
                aria-label={`대조 매트릭스 열기 (${compareCount}개 담김)`}
                className="relative min-h-11 min-w-11 flex items-center justify-center rounded bg-[#181c24] border border-[#424754] text-[#dfe2ee] hover:text-[#4cd7f6] hover:border-[#4cd7f6] transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">compare_arrows</span>
                <span className="absolute -top-1.5 -right-1.5 bg-[#adc6ff] text-[#002e6a] font-label text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {compareCount}
                </span>
              </button>

              <button
                id="btn-cart-tray"
                type="button"
                onClick={onOpenCart}
                aria-label={`장바구니 열기 (${cartCount}개 담김)`}
                className="flex items-center gap-1.5 px-3 min-h-11 rounded bg-[#181c24] border border-[#424754] text-[#dfe2ee] hover:text-[#4cd7f6] hover:border-[#4cd7f6] transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">shopping_cart</span>
                <span className="font-label text-xs hidden lg:inline">장바구니</span>
                <span className="bg-[#ec6a06] text-[#4a1c00] font-label text-[10px] px-1.5 py-0.5 rounded font-bold ml-0.5">
                  {cartCount}
                </span>
              </button>

              <button
                id="btn-mypage"
                type="button"
                onClick={() =>
                  onShowInfo({
                    title: '마이페이지',
                    lines: [
                      '샘플 사이트라 회원 가입·로그인·주문 조회가 동작하지 않습니다. 계정 정보를 입력받는 화면도 없습니다.',
                      '실제 운영 시에는 주문 내역·A/S 접수·배송 조회·적립금을 이 자리에 붙입니다.',
                    ],
                  })
                }
                aria-label="마이페이지 안내 열기"
                className="flex items-center gap-1 px-3 min-h-11 rounded bg-[#1c2028] border border-[#424754] text-[#c2c6d6] hover:text-[#adc6ff] hover:border-[#adc6ff] transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">person</span>
                <span className="font-label text-xs hidden lg:inline">마이페이지</span>
              </button>
            </div>
          </div>

          {/* Spec Search Interface (모바일·태블릿 — lg 미만). 예전에는 lg 미만에 검색창이 아예 없었다. */}
          <form onSubmit={handleSearchSubmit} className="lg:hidden pb-3" role="search">
            {searchField}
          </form>

          {/* Category Navigation Hierarchy */}
          <nav id="category-nav" aria-label="하드웨어 분류" className="flex items-center justify-between border-t border-[#424754] overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6 lg:gap-8">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`font-label text-xs min-h-11 whitespace-nowrap flex items-center gap-1.5 transition-all border-b-2 ${ isActive ? 'text-[#4cd7f6] border-[#4cd7f6] font-bold' : 'text-[#c2c6d6] hover:text-[#dfe2ee] border-transparent' }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                    {cat.label}
                    <span className={`text-[10px] font-normal ${isActive ? 'text-[#4cd7f6]' : 'text-[#8c909f]'}`}>{countOf(cat.id)}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-label text-[#8c909f]">
              <button
                id="btn-nav-3d-sim"
                type="button"
                onClick={onOpen3DModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181c24] border border-[#4cd7f6]/40 text-[#4cd7f6] hover:bg-[#4cd7f6]/10 transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                3D 시뮬레이터 열기
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
