import React from 'react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-[#111827] border-l border-[#424754] h-full shadow-2xl flex flex-col justify-between p-4 lg:p-6 animate-slideLeft"
        style={{ animationDuration: '0.25s' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#424754] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-xl">shopping_cart</span>
            <h3 className="text-base font-headline font-bold text-[#dfe2ee]">
              장바구니 ({items.reduce((acc, i) => acc + i.quantity, 0)}개)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#1c2028] text-[#8c909f] hover:text-[#dfe2ee] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8c909f]">
              <span className="material-symbols-outlined text-5xl mb-2 text-[#424754]">remove_shopping_cart</span>
              <p className="text-xs">장바구니가 비어 있습니다.</p>
              <p className="text-[11px] text-[#8c909f] mt-1">테크노바 정밀 하드웨어를 선택하여 추가해 보세요.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-[#181c24] border border-[#424754] rounded-lg p-3 flex gap-3 relative spec-hairline"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-contain bg-[#0a0e16] rounded border border-[#424754]/60 p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-bold text-[#dfe2ee] truncate">{item.name}</h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#8c909f] hover:text-[#ffb4ab] transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                  <span className="text-[10px] text-[#8c909f] block mt-0.5">SKU: {item.sku}</span>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-headline font-bold text-[#4cd7f6]">
                      ₩{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1.5 bg-[#0a0e16] border border-[#424754] rounded px-1.5 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-xs text-[#8c909f] hover:text-[#dfe2ee] font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-label text-[#dfe2ee] px-1 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-xs text-[#8c909f] hover:text-[#dfe2ee] font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Action */}
        {items.length > 0 && (
          <div className="border-t border-[#424754] pt-3 space-y-3">
            <div className="bg-[#0a0e16] p-2.5 rounded border border-[#424754] space-y-1 text-xs">
              <div className="flex justify-between text-[#8c909f]">
                <span>상품 합계</span>
                <span>₩{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#4cd7f6]">
                <span>로켓디지털 새벽배송비</span>
                <span className="font-bold">무료 (새벽 7시 도착)</span>
              </div>
              <div className="flex justify-between text-sm font-headline font-bold text-[#dfe2ee] pt-1 border-t border-[#424754]/60">
                <span>총 결제금액</span>
                <span className="text-[#ec6a06]">₩{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              id="btn-drawer-checkout"
              onClick={onProceedCheckout}
              className="w-full h-11 bg-[#ec6a06] hover:bg-[#ff7a1a] text-[#4a1c00] font-label text-xs font-bold uppercase rounded flex items-center justify-center gap-1.5 transition-all orange-glow active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">bolt</span> 바로 주문하기 (내일 새벽 도착)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
