import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
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

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-[var(--sample-bar-h,0px)] bottom-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-low border-l border-outline-variant shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-outline-variant bg-surface flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                익스페디션 기어백
              </span>
              <span className="bg-tertiary-container text-on-tertiary font-label-mono-sm text-label-mono-sm px-1.5 py-0.5 rounded-sm font-bold">
                {items.reduce((s, i) => s + i.quantity, 0)}건
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-outline hover:text-on-surface p-1 rounded-sm cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Notice */}
          <div className="bg-surface-container px-4 py-2 border-b border-outline-variant text-[11px] font-mono text-primary flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            전 품목 군용 규격 완전 방수팩 무상 패킹 적용 중
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-outline">
                <span className="material-symbols-outlined text-4xl mb-2">production_quantity_limits</span>
                <p className="font-body-md">기어백에 담긴 장비가 없습니다.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-surface-container border border-outline-variant p-3 rounded-sm flex gap-3"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-sm border border-outline-variant" referrerPolicy="no-referrer" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-label-mono-sm text-label-mono-sm text-outline">
                          SKU: {item.product.sku}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-outline hover:text-tertiary transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                            delete
                          </span>
                        </button>
                      </div>
                      <h4 className="font-body-md font-semibold text-on-surface line-clamp-1 mt-0.5">
                        {item.product.title}
                      </h4>
                      <div className="font-label-mono-sm text-primary font-bold mt-1">
                        ₩{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                        }
                        className="w-6 h-6 bg-surface-container-high border border-outline-variant text-on-surface rounded flex items-center justify-center hover:bg-surface-container-highest cursor-pointer font-mono"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm px-2">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 bg-surface-container-high border border-outline-variant text-on-surface rounded flex items-center justify-center hover:bg-surface-container-highest cursor-pointer font-mono"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Total */}
          {items.length > 0 && (
            <div className="p-4 border-t border-outline-variant bg-surface space-y-3">
              <div className="space-y-1.5 font-label-mono-sm text-label-mono-sm">
                <div className="flex justify-between text-outline">
                  <span>장비 합계</span>
                  <span>₩{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-outline">
                  <span>군용 방수 패킹 배송비</span>
                  <span className="text-primary font-bold">무료 (익스페디션 제휴)</span>
                </div>
                <div className="flex justify-between text-on-surface font-headline-sm pt-2 border-t border-outline-variant">
                  <span>최종 결제 금액</span>
                  <span className="text-primary font-bold">₩{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-tertiary-container hover:bg-tertiary hover:text-on-tertiary text-on-tertiary py-3 rounded-sm font-bold font-label-mono-md text-label-mono-md flex items-center justify-center gap-2 shadow-lg shadow-tertiary-container/30 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">local_shipping</span>
                <span>익스페디션 특급 주문 진행</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
