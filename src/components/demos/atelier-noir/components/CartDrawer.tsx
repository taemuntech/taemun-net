import React, { useRef } from 'react';
import { CartItem } from '../types';
import { useCurrency } from '../currency';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

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
  const panelRef = useRef<HTMLDivElement>(null);
  const { price } = useCurrency();

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기
  useSampleDialog({ open: isOpen, onClose, dialogRef: panelRef });

  if (!isOpen) return null;

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="장바구니"
        tabIndex={-1}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0d0e0f] hairline-l p-6 flex flex-col justify-between overflow-y-auto outline-none"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between hairline-b pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-lg font-bold text-[#ffffff]">
                SHOPPING BAG
              </span>
              <span className="bg-[#caf300] text-[#171e00] font-label-sm font-bold text-xs px-2 py-0.5">
                {totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[#e3e2e3] hover:text-[#caf300] w-11 h-11 -mr-2 flex items-center justify-center cursor-pointer"
              aria-label="장바구니 닫기"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Cart Items List */}
          {items.length === 0 ? (
            <div className="py-16 text-center text-[#8f9378]">
              <span className="material-symbols-outlined text-4xl mb-2 text-[#444932]">
                shopping_bag
              </span>
              <p className="text-sm font-medium">장바구니가 비어 있습니다.</p>
              <p className="text-xs text-[#8f9378] mt-1">2026 S/S 셀렉션을 둘러보세요.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="hairline-all bg-[#1b1c1d] p-3 flex gap-3 transition-colors hover:border-[#444932]"
                >
                  <div className="w-16 h-20 bg-[#121314] shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    referrerPolicy="no-referrer" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[#8f9378] font-label-sm text-[10px] uppercase">
                        {item.brand}
                      </div>
                      <div className="text-[#ffffff] font-bold text-xs line-clamp-1">
                        {item.name}
                      </div>
                      <div className="text-[#c5c9ac] font-label-sm text-[10px] mt-0.5">
                        {item.selectedColor} / {item.selectedSize}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-[#27272a] bg-[#121314]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-10 h-10 flex items-center justify-center text-sm text-[#e3e2e3] hover:text-[#caf300] cursor-pointer"
                          aria-label={`${item.name} 수량 줄이기`}
                        >
                          -
                        </button>
                        <span className="px-1 font-label-sm text-xs text-[#ffffff] min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-10 h-10 flex items-center justify-center text-sm text-[#e3e2e3] hover:text-[#caf300] cursor-pointer"
                          aria-label={`${item.name} 수량 늘리기`}
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[#caf300] font-label-md text-xs font-bold">
                          {price(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#8f9378] hover:text-[#ffb4ab] text-[11px] font-label-sm cursor-pointer min-h-11 px-1.5 flex items-center"
                          aria-label={`${item.name} 장바구니에서 삭제`}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Calculation */}
        {items.length > 0 && (
          <div className="pt-4 hairline-t mt-4">
            <div className="space-y-2 text-xs mb-4 font-label-sm">
              <div className="flex justify-between text-[#8f9378]">
                <span>상품금액 합계</span>
                <span>{price(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#8f9378] gap-3">
                <span>배송비 (예시 정책 — 전상품 무료배송)</span>
                <span className="text-[#caf300] shrink-0">{price(0)}</span>
              </div>
              <div className="flex justify-between text-[#ffffff] font-bold text-sm pt-2 hairline-t">
                <span>최종 결제 예상금액</span>
                <span className="text-[#caf300]">{price(subtotal)}</span>
              </div>
            </div>

            <div className="mb-2 text-center text-[10px] text-[#8f9378] font-label-sm">
              샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-[#caf300] text-[#171e00] min-h-11 py-3.5 font-label-lg text-xs font-extrabold uppercase tracking-wider hover:bg-[#ffffff] transition-colors text-center cursor-pointer active:scale-98 shadow-lg"
            >
              {price(subtotal)} 결제 진행하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
