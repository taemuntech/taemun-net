'use client';

// 관심상품(하트) 목록 — 헤더의 하트 배지 숫자가 실제로 가리키는 화면.
// 배지 숫자만 있고 볼 곳이 없으면 「담기는 척」이 되므로 목록·삭제·담기를 실제로 돌린다.

import React, { useRef } from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

/** 랭킹 상품과 히어로 기획세트를 함께 담으므로 목록에 꼭 필요한 값만 받는다 */
export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
};

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: WishlistItem[];
  onRemove: (productId: string) => void;
  onAddToCart: (product: WishlistItem) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  products,
  onRemove,
  onAddToCart,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useSampleDialog({ open: isOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end lg:items-center justify-center lg:p-4 animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="관심상품 목록"
        tabIndex={-1}
        className="bg-white w-full lg:max-w-md rounded-t-3xl lg:rounded-3xl p-6 shadow-2xl border border-white space-y-4 outline-none animate-in slide-in-from-bottom lg:zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#ae2f34] fill-[#ae2f34]" />
            <h3 className="text-base font-bold text-[#141b2b]">
              관심상품 ({products.length})
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="관심상품 닫기"
            className="w-11 h-11 -mr-2 shrink-0 flex items-center justify-center text-gray-400 hover:text-[#141b2b] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {products.length === 0 ? (
          <div className="py-10 flex flex-col items-center justify-center text-center gap-2">
            <Heart className="w-10 h-10 text-gray-300" />
            <p className="text-sm font-semibold text-[#3d4a42]">관심상품이 비어 있습니다.</p>
            <p className="text-xs text-[#6d7a72]">
              상품 카드의 하트를 누르면 이 목록에 담깁니다.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {products.map((product) => (
              <li
                key={product.id}
                className="p-3 rounded-xl border border-gray-200 flex gap-3 items-center"
              >
                <img
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  className="w-16 h-16 rounded-lg object-cover bg-gray-50 shrink-0 border border-gray-100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xs font-bold text-[#141b2b] line-clamp-2 leading-snug">
                    {product.name}
                  </p>
                  <p className="text-xs font-extrabold text-[#006948]">
                    ₩{product.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    aria-label={`${product.name} 장바구니 담기`}
                    className="w-11 h-11 rounded-full bg-[#e9edff] hover:bg-[#006948] hover:text-white text-[#141b2b] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(product.id)}
                    aria-label={`${product.name} 관심상품 삭제`}
                    className="w-11 h-11 rounded-full text-gray-400 hover:text-[#ae2f34] hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs rounded-full flex items-center justify-center cursor-pointer transition-colors"
        >
          계속 둘러보기
        </button>
      </div>
    </div>
  );
};
