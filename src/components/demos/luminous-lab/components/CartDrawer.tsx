'use client';

import React, { useRef } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Zap, CheckCircle2 } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Esc·포커스 가둠·배경 스크롤 잠금 (배경 클릭 닫기는 아래 onMouseDown)
  useSampleDialog({ open: isOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 30000;
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalOriginal = items.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const discountTotal = totalOriginal - subtotal;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 3000;
  const grandTotal = subtotal + shippingFee;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-gray-200 animate-in slide-in-from-right duration-300 outline-none"
        role="dialog"
        aria-modal="true"
        aria-label="장바구니"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#006948]" />
            <h3 className="text-base font-bold text-[#141b2b]">
              장바구니 ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="장바구니 닫기"
            className="w-11 h-11 -mr-2 flex items-center justify-center text-gray-500 hover:text-[#141b2b] rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[#f1f3ff] p-3.5 border-b border-gray-100">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-[#141b2b]">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <span className="text-[#006948] flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#006948]" /> 무료배송 혜택 적용 완료!
                </span>
              ) : (
                <span>
                  <strong className="text-[#006948]">₩{remainingForFreeShipping.toLocaleString()}</strong> 더 담으면 <strong>무료배송</strong>
                </span>
              )}
            </span>
            <span className="text-[11px] text-[#6d7a72] font-medium">기준: 30,000원</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#006948] rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <ShoppingBag className="w-12 h-12 text-gray-300 mb-2" />
              <p className="text-sm font-semibold text-gray-600">장바구니가 비어 있습니다.</p>
              <p className="text-xs text-gray-400 mt-1">
                베스트 앰플과 기획 세트를 담아보세요.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-5 min-h-11 bg-[#006948] text-white text-xs font-bold rounded-full cursor-pointer hover:bg-[#00855d] transition-colors"
              >
                베스트 상품 둘러보기
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white rounded-xl border border-gray-200 flex gap-3 shadow-2xs hover:border-[#006948]/40 transition-colors"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-18 h-18 rounded-lg object-cover bg-gray-50 shrink-0 border border-gray-100"
                referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#141b2b] line-clamp-1 leading-snug">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`${item.name} 삭제`}
                        className="text-gray-400 hover:text-[#ae2f34] w-11 h-11 -mt-2 -mr-2 shrink-0 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#6d7a72] mt-0.5 truncate">
                      {item.optionText}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-50">
                    <div className="flex items-center border border-gray-200 rounded-md bg-gray-50 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        aria-label="수량 줄이기"
                        className="w-11 h-11 lg:w-8 lg:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-bold text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label="수량 늘리기"
                        className="w-11 h-11 lg:w-8 lg:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-[#141b2b]">
                        ₩{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-[#f9f9ff] space-y-3">
            <div className="space-y-1.5 text-xs text-[#3d4a42]">
              <div className="flex justify-between">
                <span>총 상품금액</span>
                <span className="font-semibold text-[#141b2b]">₩{subtotal.toLocaleString()}</span>
              </div>
              {discountTotal > 0 && (
                <div className="flex justify-between text-[#ae2f34]">
                  <span>기획 할인혜택</span>
                  <span className="font-semibold">-₩{discountTotal.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>배송비 (당일배송 · 예시)</span>
                <span className="font-semibold text-[#141b2b]">
                  {shippingFee === 0 ? (
                    <span className="text-[#006948] font-bold">무료 (3만원 이상)</span>
                  ) : (
                    `₩${shippingFee.toLocaleString()}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#141b2b] pt-2 border-t border-gray-200">
                <span>최종 결제 예상금액</span>
                <span className="text-base text-[#006948]">₩{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#6d7a72] text-center leading-relaxed">
              샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
            </p>

            <button
              onClick={onCheckout}
              className="w-full h-12 bg-[#006948] hover:bg-[#00855d] active:scale-[0.98] text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#006948]/20 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              총 {items.reduce((acc, i) => acc + i.quantity, 0)}개 상품 주문하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
