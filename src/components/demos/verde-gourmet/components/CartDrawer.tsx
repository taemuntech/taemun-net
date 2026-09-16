import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 40000;
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 3000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const total = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl border-l border-outline-variant flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
              <h2 className="text-lg font-bold text-primary">장바구니</h2>
              <span className="bg-primary text-on-primary text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-5 py-3 bg-surface-container border-b border-outline-variant">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span className="text-primary font-medium">
                  <strong className="text-secondary font-bold">
                    ₩{remainingForFreeShipping.toLocaleString('ko-KR')}
                  </strong> 더 담으면 무료 샛별배송!
                </span>
              ) : (
                <span className="text-secondary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  무료 샛별배송 혜택 적용 완료!
                </span>
              )}
              <span className="text-outline font-mono text-[11px]">
                {subtotal.toLocaleString('ko-KR')} / 40,000원
              </span>
            </div>
            <div className="w-full h-1.5 bg-outline-variant/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl text-outline mb-3">
                  remove_shopping_cart
                </span>
                <p className="font-bold text-base text-primary">장바구니가 비어 있습니다.</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  새벽을 여는 신선한 미식 상품들을 담아보세요.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 bg-primary text-on-primary px-5 py-2.5 rounded-lg text-xs font-mono font-bold"
                >
                  상품 둘러보기
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3.5 bg-surface-container-low/60 rounded-xl border border-outline-variant flex gap-3 relative"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg shrink-0 border border-outline-variant bg-surface-container"
                  referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-secondary font-semibold">
                        {product.tempBadge}
                      </div>
                      <h4 className="text-xs font-bold text-primary truncate mt-0.5">
                        {product.name}
                      </h4>
                      <div className="text-xs font-bold text-primary font-mono mt-1">
                        ₩{(product.price * quantity).toLocaleString('ko-KR')}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/60">
                      <div className="flex items-center border border-outline-variant rounded bg-surface-container-lowest">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="px-2 py-0.5 text-xs hover:bg-surface-container font-mono"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="px-2 py-0.5 text-xs hover:bg-surface-container font-mono"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(product.id)}
                        className="text-[11px] text-outline hover:text-error transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-outline-variant bg-surface-container-low space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-on-surface-variant">
                  <span>상품금액</span>
                  <span className="font-mono">₩{subtotal.toLocaleString('ko-KR')}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>배송비 (샛별배송)</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? (
                      <span className="text-secondary font-bold">무료</span>
                    ) : (
                      `₩${shippingFee.toLocaleString('ko-KR')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-primary pt-2 border-t border-outline-variant/60">
                  <span>결제예정금액</span>
                  <span className="font-mono text-secondary text-lg">
                    ₩{total.toLocaleString('ko-KR')}
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-surface-container rounded-lg border border-outline-variant text-[11px] text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">local_shipping</span>
                <span>밤 11시 전 결제 시 <strong>내일 아침 7시</strong> 문 앞 도착!</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-primary hover:bg-secondary text-on-primary py-3.5 rounded-xl font-mono font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <span>₩{total.toLocaleString('ko-KR')} 주문하기</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
