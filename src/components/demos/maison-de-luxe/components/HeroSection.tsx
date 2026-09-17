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
            <div className="absolute top-4 left-4 bg-[#0e0e0e]/90 border border-[#d4af37]/40 backdrop-blur px-3 py-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping"></span>
              <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold uppercase">
                {HERO_ITEM.lotNumber}
              </span>
            </div>

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#0e0e0e]/95 border border-[#4d4635] p-4 backdrop-blur flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <p className="text-[10px] tracking-wider text-[#99907c] uppercase">ATELIER DESTINATION</p>
                <h3 className="font-serif text-base lg:text-lg text-[#e5e2e1] font-medium leading-snug">
                  {HERO_ITEM.name}
                </h3>
              </div>
              <div className="flex items-center lg:flex-col lg:items-end justify-between gap-1">
                <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold">
                  {HERO_ITEM.grade}
                </span>
                <p className="text-sm lg:text-base text-[#f2ca50] font-bold">
                  {formatPrice(HERO_ITEM.price)}
                </p>
                <button
                  type="button"
                  onClick={onAddToCartHero}
                  className="mt-1 px-3 py-1 bg-[#d4af37]/20 border border-[#f2ca50] text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#0e0e0e] text-[10px] tracking-wider font-bold transition-all cursor-pointer"
                >
                  컬렉션 담기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 5 Cols High-End Appraisal & Direct Vault Action */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7e2e34]/40 border border-[#d4af37]/40 w-max">
            <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
            <span className="text-[11px] text-[#e5e2e1] tracking-widest font-semibold uppercase">
              PARIS BOUTIQUE DIRECT ARCHIVE
            </span>
          </div>

          <div>
            <h1 className="font-serif text-2xl lg:text-[38px] lg:leading-[46px] text-[#e5e2e1] font-normal">
              신뢰할 수 없는 명품의 시대,<br />
              <span className="italic text-[#f2ca50] font-medium">200% 진품 보증</span>의 유일한 성소
            </h1>
            <p className="text-[#d0c5af] text-sm lg:text-base mt-3 font-light leading-relaxed">
              메종 드 럭스는 기존 온라인 플랫폼을 초월하는 독자적인 3중 극세 정밀 감정 체계와 스위스·파리 직송 보안 특수 안심 물류를 지원합니다.
            </p>
          </div>

          {/* 3-Pillar Micro Trust Strip */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#4d4635]">
            <div className="text-center p-2.5 bg-[#1c1b1b] border border-[#4d4635]">
              <span className="text-[10px] text-[#99907c] block mb-0.5">관·부가세</span>
              <span className="text-xs lg:text-sm text-[#f2ca50] font-semibold">100% 면제포함</span>
            </div>
            <div className="text-center p-2.5 bg-[#1c1b1b] border border-[#4d4635]">
              <span className="text-[10px] text-[#99907c] block mb-0.5">보안 배송</span>
              <span className="text-xs lg:text-sm text-[#e5e2e1] font-semibold">발렛 특수 보안</span>
            </div>
            <div className="text-center p-2.5 bg-[#1c1b1b] border border-[#4d4635]">
              <span className="text-[10px] text-[#99907c] block mb-0.5">위조품 보상</span>
              <span className="text-xs lg:text-sm text-[#ffb4ab] font-semibold">200% 보상환불</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-1">
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 bg-[#f2ca50] text-[#0e0e0e] text-[11px] tracking-widest py-4 px-6 font-bold hover:bg-[#ffe088] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
                onClick={onOpenSerialModal}
              >
                <ShieldCheck className="w-4 h-4" />
                디지털 실시간 감정서 조회
              </button>
              <button
                type="button"
                className="px-5 border border-[#f2ca50] text-[#f2ca50] hover:bg-[#7e2e34] hover:text-[#e5e2e1] transition-all flex items-center justify-center cursor-pointer"
                onClick={onOpenConcierge}
                title="1:1 VIP 살롱 상담"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-[#99907c] text-center">
              * 누적 18,490건 정품 출고 승인 완료 (예시 수치)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
