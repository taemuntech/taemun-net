import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#100e0d]/50 backdrop-blur-xs transition-opacity duration-300 flex justify-end">
      <div className="relative max-w-md w-full bg-[#fff8f4] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-[#d0c4c0]/50 animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#d0c4c0]/30">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#944931] fill-[#944931]" />
              <h3 className="font-serif text-xl text-[#100e0d]">위시리스트</h3>
              <span className="text-xs font-bold text-[#7f7571]">
                ({wishlistProducts.length}개)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7f7571] hover:text-[#100e0d] rounded-lg transition-colors"
              aria-label="Close Wishlist"
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
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-[#100e0d] leading-snug">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-[#7f7571] hover:text-[#944931] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#7f7571] mt-0.5">{product.dimensions}</p>
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#d0c4c0]/20">
                      <span className="text-xs font-bold text-[#100e0d]">
                        {product.formattedPrice}
                      </span>
                      <button
                        onClick={() => {
                          onAddToCart(product, product.colors[0]?.name || '');
                        }}
                        className="px-2.5 py-1 bg-[#100e0d] text-[#fff8f4] hover:bg-[#262322] rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all"
                      >
                        <ShoppingBag className="w-3 h-3" />
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
            className="w-full py-3 px-4 rounded-lg border border-[#100e0d] text-[#100e0d] hover:bg-[#f6ece5] text-xs font-semibold transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
