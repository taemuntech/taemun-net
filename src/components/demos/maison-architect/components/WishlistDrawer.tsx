import React, { useRef } from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (product: Product, color: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

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
        aria-label="위시리스트"
        tabIndex={-1}
        className="relative max-w-md w-full bg-[#fff8f4] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-[#d0c4c0]/50 animate-in slide-in-from-right duration-300 outline-none"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#d0c4c0]/30">
            <div className="flex items-center gap-2 min-w-0">
              <Heart className="w-5 h-5 text-[#944931] fill-[#944931] shrink-0" />
              <h3 className="font-serif text-xl text-[#100e0d]">위시리스트</h3>
              <span className="text-xs font-bold text-[#7f7571]">
                ({wishlistProducts.length}개)
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-11 h-11 -mr-2 shrink-0 text-[#7f7571] hover:text-[#100e0d] rounded-lg transition-colors"
              aria-label="위시리스트 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="py-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 text-[#7f7571]">
                <Heart className="w-12 h-12 mx-auto mb-3 stroke-[1.5] text-[#d0c4c0]" />
                <p className="text-sm font-medium text-[#100e0d]">저장된 관심 상품이 없습니다.</p>
                <p className="text-xs mt-1">하트 아이콘을 눌러 관심 상품을 모아보세요.</p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3.5 bg-[#fbf2eb] rounded-xl border border-[#d0c4c0]/40"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-[#f6ece5] shrink-0"
                  referrerPolicy="no-referrer" />
                  <div className="grow min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-[#100e0d] leading-snug min-w-0">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="flex items-center justify-center w-10 h-10 -mt-2 -mr-2 shrink-0 text-[#7f7571] hover:text-[#944931] transition-colors"
                          aria-label={`${product.name} 위시리스트에서 빼기`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#7f7571] mt-0.5">{product.dimensions}</p>
                    </div>

                    <div className="flex justify-between items-center gap-2 mt-2 pt-2 border-t border-[#d0c4c0]/20">
                      <span className="text-xs font-bold text-[#100e0d] whitespace-nowrap">
                        {product.formattedPrice}
                      </span>
                      <button
                        onClick={() => onAddToCart(product, product.colors[0]?.name || '')}
                        aria-label={`${product.name} 장바구니에 담기`}
                        className="flex items-center shrink-0 px-3 min-h-10 bg-[#100e0d] text-[#fff8f4] hover:bg-[#262322] rounded-md text-[11px] font-semibold gap-1 transition-all"
                      >
                        <ShoppingBag className="w-3 h-3 shrink-0" />
                        <span>담기</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-[#d0c4c0]/30">
          <button
            onClick={onClose}
            className="w-full min-h-12 px-4 rounded-lg border border-[#100e0d] text-[#100e0d] hover:bg-[#f6ece5] text-xs font-semibold transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
