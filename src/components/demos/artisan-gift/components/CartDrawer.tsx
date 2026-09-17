import React, { useRef } from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
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
  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 훅은 early return 앞에서 부른다(조건부 호출 금지)
  const panelRef = useRef<HTMLDivElement>(null);
  useSampleDialog({ open: isOpen, onClose, dialogRef: panelRef });

  if (!isOpen) return null;

  const totalProductPrice = items.reduce(
    (sum, item) => sum + (item.unitPrice + item.packagingPrice) * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-[var(--sample-bar-h,0px)] bottom-0 right-0 max-w-full flex pl-6 lg:pl-10">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
          tabIndex={-1}
          className="w-screen max-w-md bg-[#fcf9f4] border-l border-[#d6c3ba] shadow-2xl flex flex-col justify-between outline-none"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#d6c3ba]/40 flex items-center justify-between bg-[#f6f3ee]">
            <div>
              <h2 id="cart-drawer-title" className="text-base font-serif font-bold text-[#3e1c06]">
                장바구니 &amp; 비스포크 주문함
              </h2>
              <p className="text-xs text-[#83746c]">
                총 {items.reduce((acc, i) => acc + i.quantity, 0)}개의 작품
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="장바구니 닫기"
              className="w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center text-[#51443d] hover:text-[#3e1c06] rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-sm text-[#83746c]">장바구니가 비어 있습니다.</p>
                <p className="text-xs text-[#51443d]">
                  아르티장 컬렉션에서 단 하나뿐인 공예 작품을 담아보세요.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-white border border-[#d6c3ba]/60 rounded-sm shadow-xs space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded bg-[#f6f3ee] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold text-[#3e1c06] line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-[#815439] mt-0.5">
                        {item.packagingName} {item.packagingPrice > 0 ? `(+₩${item.packagingPrice.toLocaleString()})` : ''}
                      </p>
                      {item.engraving && (
                        <p className="text-[11px] text-[#83746c] mt-0.5">
                          각인: <strong className="text-[#3e1c06] font-medium">{item.engraving.text}</strong> ({item.engraving.method})
                        </p>
                      )}
                      <p className="text-xs font-bold text-[#3e1c06] mt-1">
                        ₩{((item.unitPrice + item.packagingPrice) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <div className="flex items-center border border-[#d6c3ba] rounded">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label="수량 줄이기"
                        className="w-11 h-11 lg:w-8 lg:h-8 flex items-center justify-center hover:bg-[#f6f3ee] text-[#51443d] disabled:opacity-40"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="수량 늘리기"
                        className="w-11 h-11 lg:w-8 lg:h-8 flex items-center justify-center hover:bg-[#f6f3ee] text-[#51443d]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center text-[#83746c] hover:text-[#C84B31]"
                      aria-label="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#d6c3ba]/50 bg-[#f6f3ee] space-y-3">
              <div className="space-y-1.5 text-xs text-[#51443d]">
                <div className="flex justify-between">
                  <span>작품 금액 합계</span>
                  <span>₩{totalProductPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>보자기 &amp; 손글씨 카드 포장</span>
                  <span className="text-[#C84B31] font-medium">전 상품 무료 이벤트</span>
                </div>
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span className="text-[#3e1c06] font-medium">무료 (안심 특송)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#3e1c06] pt-2 border-t border-[#d6c3ba]/40">
                  <span>최종 결제 예정 금액</span>
                  <span className="text-base text-[#C84B31]">₩{totalProductPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[#83746c] justify-center text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#815439] shrink-0" />
                1:1 장인 검수를 거쳐 제작 이력 카드와 함께 발송됩니다.
              </div>

              <p className="text-[11px] text-[#51443d] text-center leading-relaxed">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
              </p>

              <button
                type="button"
                onClick={onCheckout}
                className="w-full min-h-11 py-3.5 bg-[#583119] text-[#FAF7F2] text-xs font-semibold rounded hover:bg-[#422310] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                주문서 작성 및 결제하기
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
