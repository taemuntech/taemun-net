import React, { useState } from 'react';
import { X, Heart, ShoppingBag, CheckCircle2, Truck, ShieldCheck, Ruler } from 'lucide-react';
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
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');

  return (
    <div className="fixed inset-0 z-50 bg-[#100e0d]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fff8f4] max-w-3xl w-full rounded-2xl shadow-2xl border border-[#d0c4c0]/60 overflow-hidden flex flex-col lg:flex-row relative animate-in zoom-in-95 duration-200 max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#fff8f4]/80 text-[#100e0d] hover:bg-[#f6ece5] transition-colors shadow-xs"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images Side */}
        <div className="lg:w-1/2 bg-[#f6ece5] relative flex flex-col justify-between overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover min-h-[280px] lg:min-h-[420px]"
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
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-[#944931] uppercase tracking-wider">
                {product.categoryLabel}
              </span>
              <span className="text-[10px] text-[#7f7571]">•</span>
              <span className="text-[10px] text-[#7f7571]">{product.deliveryBadge}</span>
            </div>

            <h2 className="font-serif text-xl lg:text-2xl text-[#100e0d] leading-snug">
              {product.name}
            </h2>

            <p className="font-serif text-2xl font-bold text-[#100e0d] mt-2">
              {product.formattedPrice}
            </p>

            <p className="text-xs text-[#4d4542] mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Spec Highlights */}
            <div className="mt-5 space-y-2 pt-4 border-t border-[#d0c4c0]/30 text-xs">
              <div className="flex items-center gap-2 text-[#4d4542]">
                <Ruler className="w-4 h-4 text-[#7f7571] shrink-0" />
                <span>규격 치수: {product.dimensions}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4d4542]">
                <ShieldCheck className="w-4 h-4 text-[#7f7571] shrink-0" />
                <span>친환경 인증: 오코텍스 1등급 & E0 골조</span>
              </div>
              <div className="flex items-center gap-2 text-[#4d4542]">
                <Truck className="w-4 h-4 text-[#7f7571] shrink-0" />
                <span>배송 안내: 전문 기사 2인 1조 무료 설치</span>
              </div>
            </div>

            {/* Color Swatch Options */}
            <div className="mt-5 pt-4 border-t border-[#d0c4c0]/30">
              <label className="text-xs font-semibold text-[#100e0d] block mb-2">
                마감 색상 선택: <span className="text-[#944931]">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      selectedColor === c.name
                        ? 'border-[#100e0d] bg-[#f6ece5] font-semibold text-[#100e0d]'
                        : 'border-[#d0c4c0] text-[#4d4542] hover:bg-[#fbf2eb]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10"
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
              className={`p-3 rounded-lg border transition-colors ${
                isWishlisted
                  ? 'border-[#944931] bg-[#ffdbd0]/30 text-[#944931]'
                  : 'border-[#d0c4c0] text-[#7f7571] hover:text-[#100e0d] hover:border-[#100e0d]'
              }`}
              title="위시리스트"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#944931]' : ''}`} />
            </button>

            <button
              onClick={() => {
                onAddToCart(product, selectedColor);
                onClose();
              }}
              className="flex-grow py-3.5 px-4 rounded-lg bg-[#100e0d] hover:bg-[#262322] text-[#fff8f4] text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>장바구니 담기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
