import React, { useState } from 'react';
import { HERO_RUNWAY_IMG, LOOKBOOK_PIECES } from '../data/mockData';
import { Product } from '../types';
import { useCurrency } from '../currency';

interface HeroEditorialProps {
  /** 룩북 핀의 VIEW SPEC — 상품 id 로 상세를 연다 */
  onOpenProductSpec: (productId: number) => void;
  onAddLookSetToCart: () => void;
  onScrollToCatalog: () => void;
  /** 3-PIECE 세트에 실제로 담기는 상품들 — 목록과 합계를 이 값으로 그린다 */
  lookSetProducts: Product[];
}

const LOOK_SET_DISCOUNT = 0.15;

export const HeroEditorial: React.FC<HeroEditorialProps> = ({
  onOpenProductSpec,
  onAddLookSetToCart,
  onScrollToCatalog,
  lookSetProducts,
}) => {
  const [activePin, setActivePin] = useState<string | null>(null);
  const { price } = useCurrency();

  const togglePin = (pinId: string) => {
    setActivePin((prev) => (prev === pinId ? null : pinId));
  };

  const lookSetTotal = lookSetProducts.reduce((sum, item) => sum + item.price, 0);
  const lookSetDiscounted = Math.round(lookSetTotal * (1 - LOOK_SET_DISCOUNT));

  return (
    <section id="lookbook" className="relative bg-[#0d0e0f] hairline-b overflow-hidden scroll-mt-[calc(var(--sample-bar-h,0px)_+_72px)]">
      <div className="max-w-7xl mx-auto grid grid-cols-12">
        {/* Asymmetric Left Span: Editorial Runway Video with SHOP THE LOOK Pulse Pins */}
        <div className="col-span-12 lg:col-span-8 relative aspect-[16/11] lg:aspect-[1.79/1] hairline-r overflow-hidden group bg-[#0d0e0f]">
          <video
            autoPlay
            loop
            muted
            playsInline
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            poster={HERO_RUNWAY_IMG}
            className="w-full h-full object-cover object-center scale-[1.05] origin-top-left transition-transform duration-700 ease-out"
            src="/portfolio/atelier-noir/high-fashion-runway.mp4"
          />
          {/* High Contrast Monochromatic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e0f]/90 via-transparent to-[#0d0e0f]/20 pointer-events-none"></div>

          {/* Pulse Pin 1: Blazer Top */}
          <div className="absolute top-[32%] left-[46%] z-20">
            <button
              onClick={() => togglePin('pin-1')}
              className="pulse-pin relative w-11 h-11 bg-[#caf300] text-[#171e00] rounded-none flex items-center justify-center font-label-sm font-extrabold shadow-lg cursor-pointer hover:scale-110 transition-transform"
              aria-expanded={activePin === 'pin-1'}
              aria-label="01 자켓 아이템 상세 보기"
            >
              <span className="material-symbols-outlined text-[16px]">
                {activePin === 'pin-1' ? 'close' : 'add'}
              </span>
            </button>

            {/* Interactive Popover Card */}
            {activePin === 'pin-1' && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[min(16rem,calc(100vw-3rem))] bg-[#292a2b] hairline-all p-3.5 z-30 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[#caf300] font-label-sm text-[10px] uppercase mb-1 tracking-wider">
                  01 / LOOK PIECE
                </div>
                <div className="font-headline-sm text-sm text-[#ffffff] font-bold">
                  {LOOKBOOK_PIECES[0].name}
                </div>
                <div className="text-xs text-[#8f9378] mt-0.5">
                  {LOOKBOOK_PIECES[0].brandDetails}
                </div>
                <div className="flex items-center justify-between mt-2.5 pt-2 hairline-t gap-2">
                  <span className="font-label-md text-xs text-[#ffffff] font-bold">
                    {price(LOOKBOOK_PIECES[0].price)}
                  </span>
                  <button
                    onClick={() => onOpenProductSpec(LOOKBOOK_PIECES[0].productId)}
                    className="text-[10px] font-label-sm bg-[#caf300] text-[#171e00] px-2.5 min-h-11 font-bold hover:bg-[#ffffff] transition-colors"
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
              className="pulse-pin relative w-11 h-11 bg-[#ffffff] text-[#0c0d0e] rounded-none flex items-center justify-center font-label-sm font-extrabold shadow-lg cursor-pointer hover:scale-110 transition-transform"
              aria-expanded={activePin === 'pin-2'}
              aria-label="02 슬랙스 아이템 상세 보기"
            >
              <span className="material-symbols-outlined text-[16px]">
                {activePin === 'pin-2' ? 'close' : 'add'}
              </span>
            </button>

            {/* Interactive Popover Card */}
            {activePin === 'pin-2' && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[min(16rem,calc(100vw-3rem))] bg-[#292a2b] hairline-all p-3.5 z-30 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[#ffffff] font-label-sm text-[10px] uppercase mb-1 tracking-wider">
                  02 / LOOK PIECE
                </div>
                <div className="font-headline-sm text-sm text-[#ffffff] font-bold">
                  {LOOKBOOK_PIECES[1].name}
                </div>
                <div className="text-xs text-[#8f9378] mt-0.5">
                  {LOOKBOOK_PIECES[1].brandDetails}
                </div>
                <div className="flex items-center justify-between mt-2.5 pt-2 hairline-t gap-2">
                  <span className="font-label-md text-xs text-[#ffffff] font-bold">
                    {price(LOOKBOOK_PIECES[1].price)}
                  </span>
                  <button
                    onClick={() => onOpenProductSpec(LOOKBOOK_PIECES[1].productId)}
                    className="text-[10px] font-label-sm bg-[#ffffff] text-[#0c0d0e] px-2.5 min-h-11 font-bold hover:bg-[#caf300] transition-colors"
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
                {lookSetProducts.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex justify-between items-center gap-3 ${ idx < lookSetProducts.length - 1 ? 'hairline-b pb-2' : '' }`}
                  >
                    <span className="text-[#e3e2e3]">
                      {idx + 1}. {item.name}
                    </span>
                    <span className="font-label-sm text-[#ffffff] shrink-0">{price(item.price)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-baseline mt-4 pt-3 hairline-t gap-3">
                <span className="font-label-sm text-[11px] text-[#8f9378] uppercase">
                  TOTAL 3-PIECE SET
                </span>
                <div className="text-right">
                  <span className="line-through text-[#8f9378] font-label-sm text-xs mr-2">
                    {price(lookSetTotal)}
                  </span>
                  <span className="font-headline-sm text-lg text-[#caf300] font-bold">
                    {price(lookSetDiscounted)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={onAddLookSetToCart}
              className="w-full bg-[#caf300] text-[#171e00] min-h-11 py-3.5 px-4 font-label-lg text-xs font-extrabold uppercase tracking-wider hover:bg-[#ffffff] transition-all text-center cursor-pointer shadow-lg active:scale-[0.99]"
            >
              3-PIECE 세트 일괄 장바구니 담기
            </button>
            <button
              onClick={onScrollToCatalog}
              className="w-full bg-transparent hairline-all text-[#ffffff] min-h-11 py-3 px-4 font-label-lg text-xs tracking-wider uppercase hover:bg-[#1f2021] transition-all text-center cursor-pointer"
            >
              2026 S/S 전체 룩북 카탈로그 열람
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
