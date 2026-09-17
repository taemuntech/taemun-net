import React, { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTriage: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenTriage,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const hotTags = [
    '#생연어 65%',
    '#슬개골 글루코사민',
    '#동결건조 치킨바프',
    '#그레인프리 퍼피',
    '#눈물자국 루테인',
  ];

  return (
    <>
      {/* VET EMERGENCY & ANNOUNCEMENT TICKER */}
      <div className="bg-[#0f5238] text-white py-2 px-4 lg:px-8 text-center border-b border-[#2d6a4f] relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden mx-auto">
            <span className="material-symbols-outlined text-[#fdbd77] text-base animate-pulse">
              medical_services
            </span>
            <p className="text-xs lg:text-sm truncate">
              <strong className="font-bold text-[#fdbd77]">[전문의 1:1 진료 연계]</strong>{' '}
              슬개골·식이알러지 케어 전담 수의사 실시간 무료 문진 진행 중{' '}
              <span className="hidden lg:inline">| 정기구독 시 평생 15% 추가할인 + 무료배송</span>
            </p>
          </div>
          <button
            onClick={onOpenTriage}
            className="hidden lg:inline-flex items-center gap-1 text-xs text-[#fdbd77] hover:underline whitespace-nowrap font-medium"
          >
            <span>온라인 문진 접수하기</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* TOP NAV BAR */}
      <header className="bg-[#f8f9ff] sticky top-[var(--sample-bar-h,0px)] z-40 shadow-sm border-b border-[#bfc9c1]/50">
        <div className="flex justify-between items-center w-full px-4 lg:px-8 max-w-7xl mx-auto h-20 gap-4">
          {/* Logo Brand Section */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2.5">
              <img alt="PAWS & TAIL VET Brand Logo"
                className="w-10 h-10 object-contain rounded-lg shadow-sm"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WkzvjWwX0HVi4Nv4amqCwWMB_UunDRpLacMQSCnkkv1IW8iW4SPvU2CiSHqIhah5jK11lWDSFY_eE-a95r09gJ-NJL5yGU8MTX925n_P_4-f0tm3vCa4uhcMZktnHTpRCL45aAuu_4XeH34grRQCW2W6jSiGE61Pj52G5h0zCK_lcfJ276ft2zsGb-HPeUnAgid9cf_ETDpoDQWyEp7ChByNBFgQKyKnwrO-2gzlk129KDMCVy7hxrKtM"
               referrerPolicy="no-referrer"/>
              <div className="flex flex-col text-left">
                <span className="text-xl lg:text-2xl font-bold text-[#0f5238] tracking-tight leading-none">
                  PAWS &amp; TAIL VET
                </span>
                <span className="text-[11px] text-[#404943] font-medium mt-0.5">
                  포우즈 앤 테일 임상영양연구소
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar with Hot Tags */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-6 flex-col">
            <div className="relative w-full">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#eff4ff] border border-[#bfc9c1] rounded-full py-2 pl-10 pr-10 text-sm focus:outline-none focus:border-[#0f5238] focus:ring-1 focus:ring-[#0f5238] placeholder:text-[#404943]/70 text-[#121c2a]"
                placeholder="품종, 증상(슬개골, 눈물), 단백질원 검색"
              />
              <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#404943] text-lg">
                search
              </span>
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-[#707973] hover:text-[#121c2a]"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              ) : (
                <button className="absolute right-3 top-2.5 text-[#0f5238]">
                  <span className="material-symbols-outlined text-lg">tune</span>
                </button>
              )}
            </div>

            {/* Hot Tags */}
            <div className="flex items-center gap-2 mt-1.5 overflow-hidden text-xs">
              <span className="text-[10px] font-bold text-[#835418] shrink-0">인기태그</span>
              <div className="flex gap-2.5 text-[#404943] truncate text-xs">
                {hotTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onSearchChange(tag.replace('#', ''))}
                    className="hover:text-[#0f5238] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trailing Action Icons */}
          <div className="flex items-center gap-3 lg:gap-4 shrink-0">
            <button
              onClick={onOpenTriage}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#dee9fc] text-[#0f5238] hover:bg-[#0f5238] hover:text-white transition-colors text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-base">medical_services</span>
              <span>수의사 긴급상담</span>
            </button>

            {/* Notifications toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full text-[#404943] hover:text-[#0f5238] relative transition-colors"
                title="알림"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#bfc9c1] p-3 z-50 text-xs">
                  <div className="font-bold text-[#121c2a] pb-2 border-b border-slate-100 flex justify-between items-center">
                    <span>최신 알림</span>
                    <span className="text-[10px] text-[#0f5238] font-normal">모두 읽음</span>
                  </div>
                  <div className="py-2 space-y-2">
                    <div className="p-2 rounded-lg bg-[#eff4ff]">
                      <p className="font-semibold text-[#0f5238]">수의사 1:1 문진 배정</p>
                      <p className="text-[#404943] text-[11px] mt-0.5">
                        김민준 수의사님이 온라인 처방 리포트를 검토 중입니다.
                      </p>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-slate-50">
                      <p className="font-semibold text-[#121c2a]">정기구독 15% 갱신 혜택</p>
                      <p className="text-[#404943] text-[11px] mt-0.5">
                        이번 달 정기배송 배송 주기 변경 및 사료 추가가 가능합니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="p-2 rounded-full text-[#404943] hover:text-[#0f5238] relative transition-colors"
              title="장바구니"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0f5238] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="hidden lg:block w-px h-6 bg-[#bfc9c1]/60"></div>

            {/* Profile Avatar */}
            <button
              className="flex items-center gap-2 pl-1 group"
              title="마이페이지 (보호자 김민지 님)"
            >
              <div className="w-8 h-8 rounded-full bg-[#b1f0ce] flex items-center justify-center text-[#0f5238] font-bold text-xs border border-[#95d4b3] group-hover:scale-105 transition-transform">
                김
              </div>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-[#404943]"
            >
              <span className="material-symbols-outlined text-2xl">
                {showMobileMenu ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Category Nav (TopNavBar Items) */}
        <nav className="border-t border-[#bfc9c1]/60 bg-white overflow-x-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-6 min-w-max h-12">
            <div className="flex items-center gap-6 lg:gap-8 text-sm">
              <button
                onClick={() => onSelectCategory('all')}
                className={`pb-1 font-semibold flex items-center gap-1.5 transition-colors ${
                  activeCategory === 'all'
                    ? 'text-[#0f5238] font-bold border-b-2 border-[#0f5238]'
                    : 'text-[#404943] hover:text-[#0f5238]'
                }`}
              >
                <span className="material-symbols-outlined text-base">apps</span>
                <span>전체 상품</span>
              </button>

              <button
                onClick={() => onSelectCategory('dog')}
                className={`pb-1 font-semibold flex items-center gap-1.5 transition-colors ${
                  activeCategory === 'dog'
                    ? 'text-[#0f5238] font-bold border-b-2 border-[#0f5238]'
                    : 'text-[#404943] hover:text-[#0f5238]'
                }`}
              >
                <span className="material-symbols-outlined text-base">pets</span>
                <span>반려견 사료</span>
              </button>

              <button
                onClick={() => onSelectCategory('cat')}
                className={`pb-1 font-semibold flex items-center gap-1.5 transition-colors ${
                  activeCategory === 'cat'
                    ? 'text-[#0f5238] font-bold border-b-2 border-[#0f5238]'
                    : 'text-[#404943] hover:text-[#0f5238]'
                }`}
              >
                <span className="material-symbols-outlined text-base">cruelty_free</span>
                <span>반려묘 사료</span>
              </button>

              <button
                onClick={() => onSelectCategory('supplement')}
                className={`pb-1 font-semibold flex items-center gap-1.5 transition-colors ${
                  activeCategory === 'supplement'
                    ? 'text-[#0f5238] font-bold border-b-2 border-[#0f5238]'
                    : 'text-[#404943] hover:text-[#0f5238]'
                }`}
              >
                <span className="material-symbols-outlined text-base">vaccines</span>
                <span>처방식/영양제</span>
              </button>

              <button
                onClick={() => onSelectCategory('barf')}
                className={`pb-1 font-semibold flex items-center gap-1.5 transition-colors ${
                  activeCategory === 'barf'
                    ? 'text-[#0f5238] font-bold border-b-2 border-[#0f5238]'
                    : 'text-[#404943] hover:text-[#0f5238]'
                }`}
              >
                <span className="material-symbols-outlined text-base">set_meal</span>
                <span>수제간식/화식</span>
              </button>

              <a
                href="#profiler"
                className="text-[#835418] font-bold hover:text-[#703800] transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>AI 영양설계</span>
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-xs text-[#404943]">
              <span className="flex items-center gap-1 text-[#0f5238] font-medium">
                <span className="material-symbols-outlined text-sm">verified</span> AAFCO 인증 완료
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-sm">local_shipping</span> 오늘 오후 4시 전 당일발송
              </span>
            </div>
          </div>
        </nav>

        {/* Mobile Search and Menu Drawer */}
        {showMobileMenu && (
          <div className="lg:hidden p-4 bg-white border-t border-slate-200 shadow-md">
            <div className="relative w-full mb-3">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#eff4ff] border border-[#bfc9c1] rounded-full py-2 pl-10 pr-4 text-sm"
                placeholder="품종, 증상 검색"
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#404943] text-lg">
                search
              </span>
            </div>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                onOpenTriage();
              }}
              className="w-full py-2.5 rounded-lg bg-[#0f5238] text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">medical_services</span>
              <span>수의사 긴급상담 접수</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};
