import React, { useRef } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

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
        aria-label="장바구니"
        tabIndex={-1}
        className="relative max-w-md w-full bg-[#fff8f4] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-[#d0c4c0]/50 animate-in slide-in-from-right duration-300 outline-none"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#d0c4c0]/30">
            <div className="flex items-center gap-2 min-w-0">
              <ShoppingBag className="w-5 h-5 text-[#944931] shrink-0" />
              <h3 className="font-serif text-xl text-[#100e0d]">장바구니</h3>
              <span className="text-xs font-bold text-[#7f7571]">
                ({cartItems.reduce((acc, i) => acc + i.quantity, 0)}개)
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-11 h-11 -mr-2 shrink-0 text-[#7f7571] hover:text-[#100e0d] rounded-lg transition-colors"
              aria-label="장바구니 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="py-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-[#7f7571]">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 stroke-[1.5] text-[#d0c4c0]" />
                <p className="text-sm font-medium text-[#100e0d]">장바구니가 비어 있습니다.</p>
                <p className="text-xs mt-1">엄선된 마스터피스 컬렉션을 담아보세요.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 bg-[#fbf2eb] rounded-xl border border-[#d0c4c0]/40"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-[#f6ece5] shrink-0"
                  referrerPolicy="no-referrer" />
                  <div className="grow min-w-0 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#100e0d] leading-snug">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#7f7571] mt-0.5">
                          옵션: {item.selectedColor}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="flex items-center justify-center w-10 h-10 -mt-1.5 -mr-1.5 shrink-0 text-[#7f7571] hover:text-[#944931] transition-colors"
                        title="삭제"
                        aria-label={`${item.product.name} 장바구니에서 빼기`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#d0c4c0] rounded-md bg-[#fff8f4]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="flex items-center justify-center w-10 h-10 text-[#100e0d] hover:bg-[#f6ece5] rounded-l-md"
                          aria-label={`${item.product.name} 수량 줄이기`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1 text-xs font-semibold min-w-6 text-center" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="flex items-center justify-center w-10 h-10 text-[#100e0d] hover:bg-[#f6ece5] rounded-r-md"
                          aria-label={`${item.product.name} 수량 늘리기`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#100e0d] whitespace-nowrap">
                        ₩{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Checkout Footer */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-[#d0c4c0]/30 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between gap-3 text-[#7f7571]">
                <span>상품 금액</span>
                <span>₩{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between gap-3 text-[#7f7571]">
                <span>전문 기사 2인 배송 및 설치</span>
                <span className="text-[#944931] font-semibold whitespace-nowrap">수도권 지원</span>
              </div>
              <div className="flex justify-between items-baseline gap-3 pt-2 border-t border-[#d0c4c0]/20 font-bold">
                <span className="text-sm text-[#100e0d]">총 결제 예정 금액</span>
                <span className="font-serif text-xl text-[#100e0d]">
                  ₩{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* 결제 버튼 바로 위 고지 — 이 샘플은 주문을 받지 않는다 */}
            <p className="text-[11px] text-[#7f7571] text-center leading-relaxed">
              샘플 사이트입니다 — 주문·결제는 접수되지 않고 입력하신 내용은 어디에도 전송되지 않습니다.
            </p>

            <button
              onClick={onCheckout}
              className="w-full min-h-12 px-4 rounded-lg bg-[#100e0d] hover:bg-[#262322] text-[#fff8f4] text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span>주문서 작성 및 결제하기</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
