import React from 'react';
import { X, Tag, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS, BUNDLE_DISCOUNT, BUNDLE_SALE_PRICE, BUNDLE_ORIGINAL_PRICE } from '../data/products';

interface BundleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeItemType?: string;
  onAddBundleToCart: () => void;
}

export const BundleDrawer: React.FC<BundleDrawerProps> = ({
  isOpen,
  onClose,
  activeItemType,
  onAddBundleToCart
}) => {
  if (!isOpen) return null;

  const getTitle = () => {
    if (activeItemType === 'sofa') return '아틀리에 라운드 부클레 소파 사양';
    if (activeItemType === 'table') return '트래버틴 오가닉 테이블 상세';
    if (activeItemType === 'lamp') return '황동 페탈 아크 조명 상세';
    return '공간 번들 패키지 [소파 + 조명 + 테이블]';
  };

  const sofaProduct = PRODUCTS.find((p) => p.id === 'sofa')!;
  const tableProduct = PRODUCTS.find((p) => p.id === 'table')!;
  const lampProduct = PRODUCTS.find((p) => p.id === 'lamp')!;

  return (
    <div className="fixed inset-0 z-50 bg-[#100e0d]/50 backdrop-blur-xs transition-opacity duration-300 flex justify-end">
      <div
        className="relative max-w-lg w-full bg-[#fff8f4] shadow-2xl p-6 lg:p-8 flex flex-col justify-between overflow-y-auto border-l border-[#d0c4c0]/50 animate-in slide-in-from-right duration-300"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#d0c4c0]/30">
            <div>
              <span className="text-[10px] font-bold text-[#944931] uppercase tracking-widest">
                Selected Item Details
              </span>
              <h3 className="font-serif text-xl text-[#100e0d] mt-0.5">{getTitle()}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7f7571] hover:text-[#100e0d] rounded-lg transition-colors"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bundle Items List */}
          <div className="py-6 space-y-4">
            {/* Item 1: Sofa */}
            <div
              className={`flex gap-4 p-3.5 bg-[#fbf2eb] rounded-xl border transition-all ${
                activeItemType === 'sofa' ? 'border-[#100e0d] ring-1 ring-[#100e0d]' : 'border-[#d0c4c0]/40'
              }`}
            >
              <div className="w-20 h-20 bg-[#f6ece5] rounded-lg overflow-hidden shrink-0">
                <img
                  src={sofaProduct.detailImage || sofaProduct.image}
                  alt={sofaProduct.name}
                  className="w-full h-full object-cover"
                referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow">
                <span className="text-[10px] text-[#944931] font-semibold">메인 모듈</span>
                <h4 className="text-xs font-bold text-[#100e0d] mt-0.5">{sofaProduct.name}</h4>
                <p className="text-[11px] text-[#7f7571]">바닐라 크림 / 발수 이지클린 / W2900</p>
                <span className="text-xs font-bold text-[#100e0d] mt-1 block">
                  {sofaProduct.formattedPrice}
                </span>
              </div>
            </div>

            {/* Item 2: Table */}
            <div
              className={`flex gap-4 p-3.5 bg-[#fbf2eb] rounded-xl border transition-all ${
                activeItemType === 'table' ? 'border-[#100e0d] ring-1 ring-[#100e0d]' : 'border-[#d0c4c0]/40'
              }`}
            >
              <div className="w-20 h-20 bg-[#f6ece5] rounded-lg overflow-hidden shrink-0">
                <img
                  src={tableProduct.detailImage || tableProduct.image}
                  alt={tableProduct.name}
                  className="w-full h-full object-cover"
                referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow">
                <span className="text-[10px] text-[#7f7571] font-semibold">매칭 테이블</span>
                <h4 className="text-xs font-bold text-[#100e0d] mt-0.5">{tableProduct.name}</h4>
                <p className="text-[11px] text-[#7f7571]">내추럴 로마 베이지 / 혼드 마감 / W1200</p>
                <span className="text-xs font-bold text-[#100e0d] mt-1 block">
                  {tableProduct.formattedPrice}
                </span>
              </div>
            </div>

            {/* Item 3: Lamp */}
            <div
              className={`flex gap-4 p-3.5 bg-[#fbf2eb] rounded-xl border transition-all ${
                activeItemType === 'lamp' ? 'border-[#100e0d] ring-1 ring-[#100e0d]' : 'border-[#d0c4c0]/40'
              }`}
            >
              <div className="w-20 h-20 bg-[#f6ece5] rounded-lg overflow-hidden shrink-0">
                <img
                  src={lampProduct.detailImage || lampProduct.image}
                  alt={lampProduct.name}
                  className="w-full h-full object-cover"
                referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow">
                <span className="text-[10px] text-[#7f7571] font-semibold">공간 조명</span>
                <h4 className="text-xs font-bold text-[#100e0d] mt-0.5">{lampProduct.name}</h4>
                <p className="text-[11px] text-[#7f7571]">핸드크래프트 솔리드 브라스 / 3000K 웜라이트</p>
                <span className="text-xs font-bold text-[#100e0d] mt-1 block">
                  {lampProduct.formattedPrice}
                </span>
              </div>
            </div>

            {/* Bundle Promotion Notice */}
            <div className="p-3.5 bg-[#ffdbd0]/30 rounded-xl border border-[#944931]/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#944931]" />
                <span className="text-[#77331d] font-semibold">
                  3D 공간 룸투어 번들 12% 특별 할인
                </span>
              </div>
              <span className="text-[#944931] font-bold">-₩{BUNDLE_DISCOUNT.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer / Action */}
        <div className="pt-4 border-t border-[#d0c4c0]/30 space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs text-[#7f7571]">번들 패키지 합계 (배송비 무료)</span>
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
              className="py-3 px-4 rounded-lg border border-[#100e0d] text-[#100e0d] hover:bg-[#f6ece5] text-xs font-semibold transition-colors"
            >
              계속 둘러보기
            </button>
            <button
              onClick={() => {
                onAddBundleToCart();
                onClose();
              }}
              className="py-3 px-4 rounded-lg bg-[#100e0d] text-[#fff8f4] hover:bg-[#262322] text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>번들 세트 장바구니</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
