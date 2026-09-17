import React from 'react';
import { HERO_ITEM, formatPrice } from '../data/luxuryData';
import { ShieldCheck, MessageCircle } from 'lucide-react';

interface HeroSectionProps {
  onOpenSerialModal: () => void;
  onOpenConcierge: () => void;
  onAddToCartHero: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSerialModal,
  onOpenConcierge,
  onAddToCartHero,
}) => {
  return (
    <section className="relative w-full border-b border-[#4d4635] bg-[#0e0e0e] overflow-hidden">
      <div className="w-full px-4 lg:px-16 py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: 7 Cols Museum Presentation Hero Shot */}
        <div className="lg:col-span-7 relative group">
          <div className="relative overflow-hidden border border-[#d4af37]/40 bg-[#1c1b1b]">
            {/* Hero Image */}
            <img
              alt={HERO_ITEM.alt}
              className="w-full h-[360px] lg:h-[580px] object-cover transition-transform duration-700 group-hover:scale-105"
              src={HERO_ITEM.image}
              referrerPolicy="no-referrer"
            />
            {/* Archival Pedestal Overlay Badge */}
            <div className="absolute top-4 left-4 bg-[#0e0e0e]/90 border border-[#d4af37]/40 backdrop-blur px-3 py-1.5 flex items-center gap-2 max-w-[calc(100%-2rem)]">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping shrink-0"></span>
              <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold uppercase">
                {HERO_ITEM.lotNumber}
              </span>
            </div>

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#0e0e0e]/95 border border-[#4d4635] p-4 backdrop-blur flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] tracking-wider text-[#99907c] uppercase">ATELIER DESTINATION</p>
                <h3 className="font-serif text-base lg:text-lg text-[#e5e2e1] font-medium leading-snug [word-break:keep-all]">
                  {HERO_ITEM.name}
                </h3>
              </div>
              <div className="flex items-center lg:flex-col lg:items-end justify-between gap-2 shrink-0">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold">{HERO_ITEM.grade}</span>
                  <p className="text-sm lg:text-base text-[#f2ca50] font-bold">{formatPrice(HERO_ITEM.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={onAddToCartHero}
                  className="lg:mt-1 px-4 min-h-11 lg:min-h-0 lg:py-1.5 bg-[#d4af37]/20 border border-[#f2ca50] text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#0e0e0e] text-[10px] tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  장바구니 담기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 5 Cols High-End Appraisal & Direct Vault Action */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7e2e34]/40 border border-[#d4af37]/40 w-max max-w-full">
            <ShieldCheck className="w-4 h-4 text-[#f2ca50] shrink-0" />
            <span className="text-[11px] text-[#e5e2e1] tracking-widest font-semibold uppercase">
              PRIVATE ARCHIVE SALON
            </span>
          </div>

          <div>
            {/* 「200% 진품 보증」·「유일한 성소」는 지킬 수 없는 약속이라 걷어냈다 — 하는 일만 적는다 */}
            <h1 className="font-serif text-2xl lg:text-[38px] lg:leading-[46px] text-[#e5e2e1] font-normal [word-break:keep-all]">
              한 점 한 점,<br />
              <span className="italic text-[#f2ca50] font-medium">검수 이력까지 공개</span>하는 아카이브 살롱
            </h1>
            <p className="text-[#d0c5af] text-sm lg:text-base mt-3 font-light leading-relaxed [word-break:keep-all]">
              메종 드 럭스는 3단계 검수 기록, 매입 경로, 출고 이력을 상품마다 함께 공개하는 하이엔드 아카이브
              부티크라는 설정의 샘플입니다.
            </p>
          </div>

          {/* 3-Pillar Micro Trust Strip */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#4d4635]">
            <div className="text-center p-2.5 bg-[#1c1b1b] border border-[#4d4635]">
              <span className="text-[10px] text-[#99907c] block mb-0.5">가격 표기</span>
              <span className="text-xs lg:text-sm text-[#f2ca50] font-semibold [word-break:keep-all]">
                관·부가세 포함
              </span>
            </div>
            <div className="text-center p-2.5 bg-[#1c1b1b] border border-[#4d4635]">
              <span className="text-[10px] text-[#99907c] block mb-0.5">배송</span>
              <span className="text-xs lg:text-sm text-[#e5e2e1] font-semibold [word-break:keep-all]">
                컨시어지 대면 인계
              </span>
            </div>
            <div className="text-center p-2.5 bg-[#1c1b1b] border border-[#4d4635]">
              <span className="text-[10px] text-[#99907c] block mb-0.5">반품</span>
              <span className="text-xs lg:text-sm text-[#ffb4ab] font-semibold [word-break:keep-all]">
                7일 검수 반품
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-1">
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 bg-[#f2ca50] text-[#0e0e0e] text-[11px] tracking-widest py-4 px-4 lg:px-6 font-bold hover:bg-[#ffe088] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] [word-break:keep-all]"
                onClick={onOpenSerialModal}
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                디지털 감정 이력 조회
              </button>
              <button
                type="button"
                className="px-5 min-w-11 border border-[#f2ca50] text-[#f2ca50] hover:bg-[#7e2e34] hover:text-[#e5e2e1] transition-all flex items-center justify-center cursor-pointer"
                onClick={onOpenConcierge}
                aria-label="1:1 컨시어지 상담 열기"
                title="1:1 컨시어지 상담"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-[#99907c] text-center [word-break:keep-all]">
              * 화면의 메종·상품·시리얼·수치는 모두 지어낸 예시입니다 (누적 출고 18,490건 · 예시 수치)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
