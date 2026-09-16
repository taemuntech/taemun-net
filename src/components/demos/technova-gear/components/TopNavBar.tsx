import React from 'react';
import { BRAND_LOGO_URL } from '../data/hardwareData';

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
}) => {
  const popularKeywords = ['#RTX 4080', '#OLED 240Hz', '#타이탄16', '#썬더볼트4'];

  const categories = [
    { id: 'laptop', label: 'PC/노트북', icon: 'laptop_mac' },
    { id: 'display', label: '디스플레이', icon: 'desktop_windows' },
    { id: 'gear', label: '게이밍기어', icon: 'sports_esports' },
    { id: 'mobility', label: '스마트모빌리티', icon: 'electric_scooter' },
    { id: 'audio', label: '오디오/음향', icon: 'headphones' },
    { id: 'cooling', label: '부품/수랭', icon: 'memory' },
  ];

  return (
    <>
      {/* Live Logistics & Stock Ticker */}
      <div id="live-ticker" className="bg-[#0a0e16] border-b border-[#424754] py-1 px-4 text-[#c2c6d6] font-label text-[10px] tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[#ec6a06] flex items-center gap-1 font-bold animate-pulse">
              <span className="material-symbols-outlined text-[14px]">bolt</span> 실시간 배송 현황
            </span>
            <span className="text-[#dfe2ee]">⚡ 로켓디지털 익일 새벽 7시 도착 예정</span>
            <span className="text-[#8c909f]">|</span>
            <span>주요 카드사 최대 24개월 무이자 할부 (예시)</span>
            <span className="text-[#8c909f]">|</span>
            <span className="text-[#4cd7f6]">정품 등록 시 무상 A/S 2년 연장 프로모션 가동 중</span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-[#8c909f]">
            <span className="flex items-center gap-1 text-[#4cd7f6]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping"></span> 서울 물류센터 풀필먼트 정상 가동률 99.8%
            </span>
            <button
              onClick={() => alert('샘플 사이트입니다 — 기업 대량구매 문의는 접수되지 않습니다. (고객센터 표기 자리: 1588-0000)')}
              className="hover:text-[#adc6ff] transition-colors cursor-pointer"
            >
              기업 대량구매 문의
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Header */}
      <header id="main-header" className="bg-[#0f131c] border-b border-[#424754] sticky top-0 z-40 backdrop-blur-md">
        <div className="w-full px-4 lg:px-6 mx-auto max-w-7xl flex flex-col">
          {/* Upper Action Deck */}
          <div className="flex items-center justify-between py-3.5 gap-4 lg:gap-6">
            {/* Brand Identification */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectCategory('laptop')}>
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
            </div>

            {/* Spec Search Interface */}
            <div className="flex-1 max-w-xl hidden lg:block">
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#8c909f] text-lg">search</span>
                <input
                  id="spec-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="스펙 검색: RTX 4080 노트북, 4K OLED 240Hz, 커스텀 수랭, 마그네틱 축..."
                  className="w-full h-10 pl-10 pr-24 bg-[#0a0e16] border border-[#424754] rounded text-xs text-[#dfe2ee] focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] focus:outline-none transition-all placeholder:text-[#8c909f]"
                />
                <button
                  id="spec-search-button"
                  onClick={() => {}}
                  className="absolute right-1 px-3 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#4cd7f6] text-[11px] font-label rounded border border-[#424754] transition-colors"
                >
                  스펙 탐색
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[11px] font-label text-[#8c909f]">
                <span className="text-[#c2c6d6] font-bold">인기 키워드:</span>
                {popularKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => onSearchChange(kw.replace('#', ''))}
                    className="hover:text-[#4cd7f6] cursor-pointer transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Trailing System Actions */}
            <div className="flex items-center gap-3">
              <button
                id="btn-compare-tray"
                onClick={onOpenCompare}
                title="실시간 대조 매트릭스"
                className="relative p-2 rounded bg-[#181c24] border border-[#424754] text-[#dfe2ee] hover:text-[#4cd7f6] hover:border-[#4cd7f6] transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-lg">compare_arrows</span>
                <span className="absolute -top-1.5 -right-1.5 bg-[#adc6ff] text-[#002e6a] font-label text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {compareCount}
                </span>
              </button>

              <button
                id="btn-cart-tray"
                onClick={onOpenCart}
                className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#181c24] border border-[#424754] text-[#dfe2ee] hover:text-[#4cd7f6] hover:border-[#4cd7f6] transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-lg">shopping_cart</span>
                <span className="font-label text-xs hidden lg:inline">장바구니</span>
                <span className="bg-[#ec6a06] text-[#4a1c00] font-label text-[10px] px-1.5 py-0.5 rounded font-bold ml-0.5">
                  {cartCount}
                </span>
              </button>

              <button
                id="btn-mypage"
                onClick={() => alert('샘플 사이트입니다 — 회원 계정 기능은 동작하지 않습니다. (예시 계정: member@example.com)')}
                className="flex items-center gap-1 px-3 py-2 rounded bg-[#1c2028] border border-[#424754] text-[#c2c6d6] hover:text-[#adc6ff] hover:border-[#adc6ff] transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-lg">person</span>
                <span className="font-label text-xs hidden lg:inline">마이페이지</span>
              </button>
            </div>
          </div>

          {/* Category Navigation Hierarchy */}
          <nav id="category-nav" className="flex items-center justify-between border-t border-[#424754] overflow-x-auto py-2">
            <div className="flex items-center gap-6 lg:gap-8">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`font-label text-xs pb-1 whitespace-nowrap flex items-center gap-1.5 transition-all ${ isActive ? 'text-[#4cd7f6] border-b-2 border-[#4cd7f6] font-bold' : 'text-[#c2c6d6] hover:text-[#dfe2ee]' }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-label text-[#8c909f]">
              <button
                id="btn-nav-3d-sim"
                onClick={onOpen3DModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181c24] border border-[#4cd7f6]/40 text-[#4cd7f6] hover:bg-[#4cd7f6]/10 transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                3D 시뮬레이터 가동
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
