import React, { useEffect, useRef, useState } from 'react';
import { X, Heart, ShoppingBag, Truck, ShieldCheck, Ruler } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  // ⚠️ 훅은 조건보다 **위에** 온다. 예전엔 `if (!isOpen) return null` 뒤에 useState 가 있어서
  //    모달을 처음 열 때 훅 개수가 0 → 1 로 늘어 React 가 렌더를 통째로 던졌다.
  const dialogRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState('');

  // 컴포넌트가 계속 붙어 있어서 상품을 바꿔 열면 앞 상품의 색이 남는다 — 열 때마다 첫 색으로 맞춘다.
  useEffect(() => {
    if (isOpen && product) setSelectedColor(product.colors[0]?.name ?? '');
  }, [isOpen, product]);

  useSampleDialog({ open: isOpen && Boolean(product), onClose, dialogRef });

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#100e0d]/60 backdrop-blur-xs flex items-end lg:items-center justify-center p-0 lg:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        tabIndex={-1}
        className="bg-[#fff8f4] max-w-3xl w-full rounded-t-2xl lg:rounded-2xl shadow-2xl border border-[#d0c4c0]/60 overflow-hidden flex flex-col lg:flex-row relative animate-in slide-in-from-bottom-4 lg:slide-in-from-bottom-0 lg:zoom-in-95 duration-200 max-h-[92vh] lg:max-h-[90vh] outline-none"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-[#fff8f4]/90 text-[#100e0d] hover:bg-[#f6ece5] transition-colors shadow-xs"
          aria-label="상세 닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images Side */}
        <div className="lg:w-1/2 bg-[#f6ece5] relative flex flex-col justify-between overflow-hidden shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover max-h-52 lg:max-h-none min-h-[160px] lg:min-h-[420px]"
          referrerPolicy="no-referrer" />
          {product.detailImage && (
            <div className="absolute bottom-3 left-3 p-1.5 bg-[#fff8f4]/90 backdrop-blur-sm rounded-lg flex items-center gap-2 border border-[#d0c4c0]/50 text-[10px] text-[#4d4542]">
              <img
                src={product.detailImage}
                alt="Material Texture Detail"
                className="w-8 h-8 rounded object-cover"
              referrerPolicy="no-referrer" />
              <span>천연 질감 디테일</span>
            </div>
          )}
        </div>

        {/* Product Info Side */}
        <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-2 pr-10">
              <span className="text-[10px] font-bold text-[#944931] uppercase tracking-wider">
                {product.categoryLabel}
              </span>
              <span className="text-[10px] text-[#7f7571]">•</span>
              <span className="text-[10px] text-[#7f7571]">{product.deliveryBadge}</span>
            </div>

            <h2 className="font-serif text-xl lg:text-2xl text-[#100e0d] leading-snug pr-10">
              {product.name}
            </h2>

            <p className="font-serif text-2xl font-bold text-[#100e0d] mt-2">
              {product.formattedPrice}
            </p>

            <p className="text-xs text-[#4d4542] mt-4 leading-relaxed">{product.description}</p>

            {/* Spec Highlights — 인증 「획득」이 아니라 표기 자리임을 명시한다 */}
            <div className="mt-5 space-y-2 pt-4 border-t border-[#d0c4c0]/30 text-xs">
              <div className="flex items-start gap-2 text-[#4d4542]">
                <Ruler className="w-4 h-4 text-[#7f7571] shrink-0 mt-0.5" />
                <span>규격 치수: {product.dimensions}</span>
              </div>
              <div className="flex items-start gap-2 text-[#4d4542]">
                <ShieldCheck className="w-4 h-4 text-[#7f7571] shrink-0 mt-0.5" />
                <span>소재 표기: 친환경 패브릭 등급 · 저포름알데히드 골조 (예시 표기)</span>
              </div>
              <div className="flex items-start gap-2 text-[#4d4542]">
                <Truck className="w-4 h-4 text-[#7f7571] shrink-0 mt-0.5" />
                <span>배송 안내: 전문 기사 2인 1조 설치 지원</span>
              </div>
            </div>

            {/* Color Swatch Options */}
            <div className="mt-5 pt-4 border-t border-[#d0c4c0]/30">
              <p className="text-xs font-semibold text-[#100e0d] mb-2">
                마감 색상 선택: <span className="text-[#944931]">{selectedColor}</span>
              </p>
              <div className="flex items-center flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    aria-pressed={selectedColor === c.name}
                    className={`flex items-center gap-1.5 px-3 min-h-11 rounded-lg border text-xs transition-all ${
                      selectedColor === c.name
                        ? 'border-[#100e0d] bg-[#f6ece5] font-semibold text-[#100e0d]'
                        : 'border-[#d0c4c0] text-[#4d4542] hover:bg-[#fbf2eb]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-[#d0c4c0]/30 flex gap-3">
            <button
              onClick={() => onToggleWishlist(product.id)}
              aria-pressed={isWishlisted}
              className={`flex items-center justify-center w-13 min-h-12 shrink-0 rounded-lg border transition-colors ${
                isWishlisted
                  ? 'border-[#944931] bg-[#ffdbd0]/30 text-[#944931]'
                  : 'border-[#d0c4c0] text-[#7f7571] hover:text-[#100e0d] hover:border-[#100e0d]'
              }`}
              aria-label={isWishlisted ? '위시리스트에서 빼기' : '위시리스트에 담기'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#944931]' : ''}`} />
            </button>

            <button
              onClick={() => {
                onAddToCart(product, selectedColor);
                onClose();
              }}
              className="grow min-h-12 px-4 rounded-lg bg-[#100e0d] hover:bg-[#262322] text-[#fff8f4] text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>장바구니 담기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
