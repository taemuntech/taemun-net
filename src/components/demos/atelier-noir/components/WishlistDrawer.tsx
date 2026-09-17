import React, { useRef } from 'react';
import { Product } from '../types';
import { useCurrency } from '../currency';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemoveWishlist: (productId: number) => void;
  onAddToCart: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveWishlist,
  onAddToCart,
  onOpenProductModal,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { price } = useCurrency();

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기
  useSampleDialog({ open: isOpen, onClose, dialogRef: panelRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="위시리스트"
        tabIndex={-1}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0d0e0f] hairline-l p-6 flex flex-col justify-between overflow-y-auto outline-none"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between hairline-b pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-lg font-bold text-[#ffffff]">
                MY WISHLIST
              </span>
              <span className="bg-[#1f2021] text-[#caf300] border border-[#444932] font-label-sm font-bold text-xs px-2 py-0.5">
                {wishlistedProducts.length} ITEMS
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[#e3e2e3] hover:text-[#caf300] w-11 h-11 -mr-2 flex items-center justify-center cursor-pointer"
              aria-label="위시리스트 닫기"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* List */}
          {wishlistedProducts.length === 0 ? (
            <div className="py-20 text-center text-[#8f9378]">
              <span className="material-symbols-outlined text-4xl mb-2 text-[#444932]">
                favorite_border
              </span>
              <p className="text-sm font-medium">위시리스트에 담긴 상품이 없습니다.</p>
              <p className="text-xs text-[#8f9378] mt-1">마음에 드는 상품의 하트를 눌러보세요.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="hairline-all bg-[#1b1c1d] p-3 flex gap-3 hover:border-[#444932] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenProductModal(product);
                    }}
                    aria-label={`${product.name} 상세 보기`}
                    className="w-16 h-20 bg-[#121314] shrink-0 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer" />
                  </button>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[#8f9378] font-label-sm text-[10px] uppercase">
                          {product.brand}
                        </span>
                        <button
                          onClick={() => onRemoveWishlist(product.id)}
                          className="text-[#8f9378] hover:text-[#ffb4ab] text-xs w-11 h-11 -mt-3 -mr-3 flex items-center justify-center cursor-pointer"
                          aria-label={`${product.name} 위시리스트에서 빼기`}
                        >
                          ✕
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenProductModal(product);
                        }}
                        className="text-left text-[#ffffff] font-bold text-xs line-clamp-2 cursor-pointer hover:text-[#caf300]"
                      >
                        {product.name}
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-1">
                      <span className="text-[#caf300] font-label-md text-xs font-bold">
                        {price(product.price)}
                      </span>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-[#caf300] text-[#171e00] px-3 min-h-11 text-[11px] font-bold uppercase hover:bg-[#ffffff] cursor-pointer"
                        aria-label={`${product.name} 장바구니에 담기`}
                      >
                        담기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 hairline-t">
          <button
            onClick={onClose}
            className="w-full min-h-11 py-3 bg-[#1f2021] hover:bg-[#292a2b] text-[#ffffff] font-label-sm text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            쇼핑 계속하기
          </button>
        </div>
      </div>
    </div>
  );
};
