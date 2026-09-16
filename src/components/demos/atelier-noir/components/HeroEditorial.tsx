import React, { useState } from 'react';
import { HERO_RUNWAY_IMG, LOOKBOOK_PIECES } from '../data/mockData';
import { Product } from '../types';

interface HeroEditorialProps {
  onOpenProductSpec: (product: Partial<Product>) => void;
  onAddLookSetToCart: () => void;
  onScrollToCatalog: () => void;
}

export const HeroEditorial: React.FC<HeroEditorialProps> = ({
  onOpenProductSpec,
  onAddLookSetToCart,
  onScrollToCatalog,
}) => {
  const [activePin, setActivePin] = useState<string | null>(null);

  const togglePin = (pinId: string) => {
    setActivePin((prev) => (prev === pinId ? null : pinId));
  };

  return (
    <section className="relative bg-[#0d0e0f] hairline-b overflow-hidden">
      <div className="max-w-[1920px] mx-auto grid grid-cols-12">
        {/* Asymmetric Left Span: Editorial Photography with SHOP THE LOOK Pulse Pins */}
        <div className="col-span-12 lg:col-span-8 relative aspect-[16/11] lg:aspect-[1.79/1] hairline-r overflow-hidden group">
          <img
            src={HERO_RUNWAY_IMG}
            alt="High-fashion editorial photography of a stylish model posing in an oversized minimalist black tailored blazer and wide pleated wool trousers"
            className="w-full h-full object-cover object-center filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-102"
          referrerPolicy="no-referrer" />
          {/* High Contrast Monochromatic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e0f]/90 via-transparent to-[#0d0e0f]/20 pointer-events-none"></div>

          {/* Pulse Pin 1: Blazer Top */}
          <div className="absolute top-[32%] left-[46%] z-20">
            <button
              onClick={() => togglePin('pin-1')}
              className="pulse-pin relative w-7 h-7 bg-[#caf300] text-[#171e00] rounded-none flex items-center justify-center font-label-sm font-extrabold shadow-lg cursor-pointer hover:scale-125 transition-transform"
              aria-label="01 자켓 아이템 상세 보기"
            >
              <span className="material-symbols-outlined text-[16px]">
                {activePin === 'pin-1' ? 'close' : 'add'}
              </span>
            </button>

            {/* Interactive Popover Card */}
            {activePin === 'pin-1' && (
              <div className="absolute top-9 left-0 w-64 bg-[#292a2b] hairline-all p-3.5 z-30 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[#caf300] font-label-sm text-[10px] uppercase mb-1 tracking-wider">
                  01 / LOOK PIECE
                </div>
                <div className="font-headline-sm text-sm text-[#ffffff] font-bold">
                  오버사이즈 울 테일러드 자켓
                </div>
                <div className="text-xs text-[#8f9378] mt-0.5">
                  BRAND B (예시) · Virgin Wool 100%
                </div>
                <div className="flex items-center justify-between mt-2.5 pt-2 hairline-t">
                  <span className="font-label-md text-xs text-[#ffffff] font-bold">
                    ₩348,000
                  </span>
                  <button
                    onClick={() =>
                      onOpenProductSpec({
                        id: 1,
                        brand: 'BRAND A (예시)',
                        name: '오버사이즈 울 테일러드 자켓',
                        price: 348000,
                        discountRate: '32% OFF',
                        image: LOOKBOOK_PIECES[0].image,
                      })
                    }
                    className="text-[10px] font-label-sm bg-[#caf300] text-[#171e00] px-2.5 py-1 font-bold hover:bg-[#ffffff] transition-colors"
                  >
                    VIEW SPEC
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pulse Pin 2: Pleated Trousers */}
          <div className="absolute top-[68%] left-[49%] z-20">
            <button
              onClick={() => togglePin('pin-2')}
              className="pulse-pin relative w-7 h-7 bg-[#ffffff] text-[#0c0d0e] rounded-none flex items-center justify-center font-label-sm font-extrabold shadow-lg cursor-pointer hover:scale-125 transition-transform"
              aria-label="02 슬랙스 아이템 상세 보기"
            >
              <span className="material-symbols-outlined text-[16px]">
                {activePin === 'pin-2' ? 'close' : 'add'}
              </span>
            </button>

            {/* Interactive Popover Card */}
            {activePin === 'pin-2' && (
              <div className="absolute bottom-9 left-0 w-64 bg-[#292a2b] hairline-all p-3.5 z-30 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[#ffffff] font-label-sm text-[10px] uppercase mb-1 tracking-wider">
                  02 / LOOK PIECE
                </div>
                <div className="font-headline-sm text-sm text-[#ffffff] font-bold">
                  플루이드 딥 플리츠 와이드 슬랙스
                </div>
                <div className="text-xs text-[#8f9378] mt-0.5">
                  BRAND C (예시) · Tencel Wool
                </div>
                <div className="flex items-center justify-between mt-2.5 pt-2 hairline-t">
                  <span className="font-label-md text-xs text-[#ffffff] font-bold">
                    ₩178,000
                  </span>
                  <button
                    onClick={() =>
                      onOpenProductSpec({
                        id: 2,
                        brand: 'BRAND C (예시)',
                        name: '플루이드 딥 플리츠 와이드 슬랙스',
                        price: 178000,
                        discountRate: '15% OFF',
                        image: LOOKBOOK_PIECES[1].image,
                      })
                    }
                    className="text-[10px] font-label-sm bg-[#ffffff] text-[#0c0d0e] px-2.5 py-1 font-bold hover:bg-[#caf300] transition-colors"
                  >
                    VIEW SPEC
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Floating Badge: Editorial Issue */}
          <div className="absolute bottom-5 left-5 z-10">
            <span className="bg-[#0d0e0f]/90 hairline-all text-[#ffffff] font-label-sm text-[11px] px-3.5 py-1.5 uppercase tracking-widest backdrop-blur-md">
              VOL. 26 · SEOUL STUDIO CAMPAIGN
            </span>
          </div>
        </div>

        {/* Asymmetric Right Span: Avant-Garde Typography & Catalog Index */}
        <div className="col-span-12 lg:col-span-4 p-6 lg:p-10 flex flex-col justify-between bg-[#0d0e0f]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#caf300]"></span>
              <span className="font-label-sm text-xs text-[#caf300] tracking-widest uppercase font-medium">
                SEASON EDITORIAL 2026 S/S
              </span>
            </div>

            <h1 className="font-display-hero text-4xl lg:text-[68px] uppercase tracking-tighter text-[#ffffff] leading-[0.95] mb-4">
              METROPOLITAN<br />
              <span className="text-[#8f9378] italic font-normal">SILENCE</span>
            </h1>

            <p className="font-body-md text-xs lg:text-sm text-[#c5c9ac] leading-relaxed mb-6">
              도시의 침묵 속에서 발현되는 극단적 미니멀리즘과 구조적 테일러링의 해체. 컨템포러리 디자이너 8인(예시)이 제안하는 2026 봄/여름 아틀리에 누아르 캡슐 컬렉션을 공개합니다. (예시 화면용 가상 컬렉션입니다)
            </p>

            {/* Complete Set Curation Line-Items */}
            <div className="hairline-all bg-[#1b1c1d] p-4 lg:p-5 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-sm text-[11px] text-[#8f9378] tracking-wider uppercase">
                  CURATED TOTAL LOOK SET
                </span>
                <span className="text-[#caf300] font-label-sm text-xs font-bold">
                  SET 15% EXTRA OFF
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center hairline-b pb-2">
                  <span className="text-[#e3e2e3]">1. 테일러드 오버 블레이저</span>
                  <span className="font-label-sm text-[#ffffff]">₩348,000</span>
                </div>
                <div className="flex justify-between items-center hairline-b pb-2">
                  <span className="text-[#e3e2e3]">2. 딥 플리츠 와이드 슬랙스</span>
                  <span className="font-label-sm text-[#ffffff]">₩178,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#e3e2e3]">3. 스퀘어토 카프 더비슈즈</span>
                  <span className="font-label-sm text-[#ffffff]">₩258,000</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mt-4 pt-3 hairline-t">
                <span className="font-label-sm text-[11px] text-[#8f9378] uppercase">
                  TOTAL 3-PIECE SET
                </span>
                <div>
                  <span className="line-through text-[#8f9378] font-label-sm text-xs mr-2">
                    ₩784,000
                  </span>
                  <span className="font-headline-sm text-lg text-[#caf300] font-bold">
                    ₩666,400
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={onAddLookSetToCart}
              className="w-full bg-[#caf300] text-[#171e00] py-3.5 px-4 font-label-lg text-xs font-extrabold uppercase tracking-wider hover:bg-[#ffffff] transition-all text-center cursor-pointer shadow-lg active:scale-[0.99]"
            >
              3-PIECE 세트 일괄 장바구니 담기
            </button>
            <button
              onClick={onScrollToCatalog}
              className="w-full bg-transparent hairline-all text-[#ffffff] py-3 px-4 font-label-lg text-xs tracking-wider uppercase hover:bg-[#1f2021] transition-all text-center cursor-pointer"
            >
              2026 S/S 전체 룩북 카탈로그 열람
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
