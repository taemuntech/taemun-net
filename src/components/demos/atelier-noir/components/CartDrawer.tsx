import React from 'react';
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
  if (!isOpen) return null;

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose}>
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0d0e0f] hairline-l p-6 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
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
              className="text-[#e3e2e3] hover:text-[#caf300] p-1 cursor-pointer"
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
                          className="px-2 py-0.5 text-xs text-[#e3e2e3] hover:text-[#caf300]"
                          aria-label="수량 감소"
                        >
                          -
                        </button>
                        <span className="px-2 font-label-sm text-xs text-[#ffffff]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-[#e3e2e3] hover:text-[#caf300]"
                          aria-label="수량 증가"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[#caf300] font-label-md text-xs font-bold">
                          ₩{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#8f9378] hover:text-[#ffb4ab] text-[11px] font-label-sm cursor-pointer"
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
                <span>₩{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#8f9378]">
                <span>배송비 (전상품 무료배송)</span>
                <span className="text-[#caf300]">₩0 (FREE)</span>
              </div>
              <div className="flex justify-between text-[#ffffff] font-bold text-sm pt-2 hairline-t">
                <span>최종 결제 예상금액</span>
                <span className="text-[#caf300]">₩{subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-[#caf300] text-[#171e00] py-3.5 font-label-lg text-xs font-extrabold uppercase tracking-wider hover:bg-[#ffffff] transition-colors text-center cursor-pointer active:scale-98 shadow-lg"
            >
              ₩{subtotal.toLocaleString()} 안전 결제 진행하기
            </button>

            <div className="mt-2 text-center text-[10px] text-[#8f9378] font-label-sm">
              🔒 토스페이먼츠 구매안전(에스크로) 보증 서비스 적용
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
