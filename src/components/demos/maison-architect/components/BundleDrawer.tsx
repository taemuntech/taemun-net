import React, { useRef } from 'react';
import { X, Tag, ShoppingBag } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { PRODUCTS, BUNDLE_DISCOUNT, BUNDLE_SALE_PRICE, BUNDLE_ORIGINAL_PRICE } from '../data/products';

interface BundleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBundleToCart: () => void;
}

/**
 * 3종 묶음 전용 드로어. **상품 하나짜리 화면이 아니다.**
 *
 * 예전에는 히어로의 핀 3개(소파·조명·테이블)가 전부 이 드로어를 열었고 제목 한 줄과 테두리만 달랐다 —
 * 유일한 단추가 「번들 세트 장바구니」라 조명 핀을 눌렀는데 소파·테이블까지 담기고, 금액도 그 상품 값이
 * 아니라 번들 합계였다. 지금 핀은 ProductDetailModal(그 상품만 담기는 화면)을 연다.
 */
export const BundleDrawer: React.FC<BundleDrawerProps> = ({
  isOpen,
  onClose,
  onAddBundleToCart
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const title = '공간 번들 패키지 [소파 + 조명 + 테이블]';

  const sofaProduct = PRODUCTS.find((p) => p.id === 'sofa')!;
  const tableProduct = PRODUCTS.find((p) => p.id === 'table')!;
  const lampProduct = PRODUCTS.find((p) => p.id === 'lamp')!;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#100e0d]/50 backdrop-blur-xs transition-opacity duration-300 flex justify-end"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative max-w-lg w-full bg-[#fff8f4] shadow-2xl p-6 lg:p-8 flex flex-col justify-between overflow-y-auto border-l border-[#d0c4c0]/50 animate-in slide-in-from-right duration-300 outline-none"
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-2 pb-4 border-b border-[#d0c4c0]/30">
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-[#944931] uppercase tracking-widest">
                Selected Item Details
              </span>
              <h3 className="font-serif text-xl text-[#100e0d] mt-0.5">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-11 h-11 -mr-2 -mt-1 shrink-0 text-[#7f7571] hover:text-[#100e0d] rounded-lg transition-colors"
              aria-label="상세 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bundle Items List */}
          <div className="py-6 space-y-4">
            {/* Item 1: Sofa */}
            <div
              className="flex gap-4 p-3.5 bg-[#fbf2eb] rounded-xl border border-[#d0c4c0]/40 transition-all"
            >
              <div className="w-20 h-20 bg-[#f6ece5] rounded-lg overflow-hidden shrink-0">
                <img
                  src={sofaProduct.detailImage || sofaProduct.image}
                  alt={sofaProduct.name}
                  className="w-full h-full object-cover"
                referrerPolicy="no-referrer" />
              </div>
              <div className="grow min-w-0">
                <span className="text-[10px] text-[#944931] font-semibold">메인 모듈</span>
                <h4 className="text-xs font-bold text-[#100e0d] mt-0.5">{sofaProduct.name}</h4>
                <p className="text-[11px] text-[#7f7571]">바닐라 크림 · 발수 이지클린 · W2900</p>
                <span className="text-xs font-bold text-[#100e0d] mt-1 block">
                  {sofaProduct.formattedPrice}
                </span>
              </div>
            </div>

            {/* Item 2: Table */}
            <div
              className="flex gap-4 p-3.5 bg-[#fbf2eb] rounded-xl border border-[#d0c4c0]/40 transition-all"
            >
              <div className="w-20 h-20 bg-[#f6ece5] rounded-lg overflow-hidden shrink-0">
                <img
                  src={tableProduct.detailImage || tableProduct.image}
                  alt={tableProduct.name}
                  className="w-full h-full object-cover"
                referrerPolicy="no-referrer" />
              </div>
              <div className="grow min-w-0">
                <span className="text-[10px] text-[#7f7571] font-semibold">매칭 테이블</span>
                <h4 className="text-xs font-bold text-[#100e0d] mt-0.5">{tableProduct.name}</h4>
                <p className="text-[11px] text-[#7f7571]">내추럴 베이지 · 혼드 마감 · W1200</p>
                <span className="text-xs font-bold text-[#100e0d] mt-1 block">
                  {tableProduct.formattedPrice}
                </span>
              </div>
            </div>

            {/* Item 3: Lamp */}
            <div
              className="flex gap-4 p-3.5 bg-[#fbf2eb] rounded-xl border border-[#d0c4c0]/40 transition-all"
            >
              <div className="w-20 h-20 bg-[#f6ece5] rounded-lg overflow-hidden shrink-0">
                <img
                  src={lampProduct.detailImage || lampProduct.image}
                  alt={lampProduct.name}
                  className="w-full h-full object-cover"
                referrerPolicy="no-referrer" />
              </div>
              <div className="grow min-w-0">
                <span className="text-[10px] text-[#7f7571] font-semibold">공간 조명</span>
                <h4 className="text-xs font-bold text-[#100e0d] mt-0.5">{lampProduct.name}</h4>
                <p className="text-[11px] text-[#7f7571]">핸드크래프트 솔리드 브라스 · 3000K 웜라이트</p>
                <span className="text-xs font-bold text-[#100e0d] mt-1 block">
                  {lampProduct.formattedPrice}
                </span>
              </div>
            </div>

            {/* Bundle Promotion Notice */}
            <div className="p-3.5 bg-[#ffdbd0]/30 rounded-xl border border-[#944931]/20 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <Tag className="w-4 h-4 text-[#944931] shrink-0" />
                <span className="text-[#77331d] font-semibold">
                  3D 공간 룸투어 번들 12% 특별 할인
                </span>
              </div>
              <span className="text-[#944931] font-bold whitespace-nowrap shrink-0">
                -₩{BUNDLE_DISCOUNT.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer / Action */}
        <div className="pt-4 border-t border-[#d0c4c0]/30 space-y-3">
          <div className="flex justify-between items-end gap-3">
            <div className="min-w-0">
              <span className="text-xs text-[#7f7571]">번들 패키지 합계 (배송비 포함)</span>
              <p className="text-xs text-[#7f7571] line-through">
                ₩{BUNDLE_ORIGINAL_PRICE.toLocaleString()}
              </p>
            </div>
            <p className="font-serif text-2xl font-bold text-[#100e0d]">
              ₩{BUNDLE_SALE_PRICE.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              className="min-h-12 px-4 rounded-lg border border-[#100e0d] text-[#100e0d] hover:bg-[#f6ece5] text-xs font-semibold transition-colors"
            >
              계속 둘러보기
            </button>
            <button
              onClick={() => {
                onAddBundleToCart();
                onClose();
              }}
              className="min-h-12 px-4 rounded-lg bg-[#100e0d] text-[#fff8f4] hover:bg-[#262322] text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>번들 세트 장바구니</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
