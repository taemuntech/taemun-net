import SampleNotice from '@/components/demo-kit/SampleNotice';
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onToggleSubscription: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onToggleSubscription,
  onRemoveItem,
  onClearCart,
}) => {
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);

  if (!isOpen) return null;

  const rawTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const subscriptionDiscount = items.reduce((sum, item) => {
    if (item.isSubscription) {
      return sum + Math.round(item.product.price * 0.15 * item.quantity);
    }
    return sum;
  }, 0);

  const finalTotal = rawTotal - subscriptionDiscount;
  const shippingFee = finalTotal >= 30000 || items.length === 0 ? 0 : 3000;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-[var(--sample-bar-h,0px)] bottom-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#bfc9c1]/60 flex items-center justify-between bg-[#f8f9ff]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0f5238] text-xl">shopping_bag</span>
              <h2 className="text-base font-bold text-[#121c2a]">장바구니 ({items.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-200 text-[#404943] transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#404943]">
                <span className="material-symbols-outlined text-4xl text-[#bfc9c1] mb-2">
                  shopping_cart
                </span>
                <p className="font-bold text-sm text-[#121c2a]">장바구니가 비어 있습니다</p>
                <p className="text-xs text-[#707973] mt-1">
                  임상 검증 식단과 맞춤 처방식을 담아보세요.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#bfc9c1]/50 text-xs text-[#0f5238] flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">local_shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong>무료배송 혜택 적용 중</strong>
                    ) : (
                      `30,000원 이상 주문 시 무료배송 (₩${(30000 - finalTotal).toLocaleString()}원 추가 시 무료)`
                    )}
                  </span>
                </div>

                {items.map((item) => {
                  const itemDiscount = item.isSubscription
                    ? Math.round(item.product.price * 0.15)
                    : 0;
                  const itemFinalPrice = (item.product.price - itemDiscount) * item.quantity;

                  return (
                    <div
                      key={item.product.id}
                      className="p-4 rounded-xl border border-[#bfc9c1]/60 bg-white shadow-sm space-y-3"
                    >
                      <div className="flex gap-3">
                        <img src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover bg-[#eff4ff] border border-slate-100 shrink-0"
                         referrerPolicy="no-referrer"/>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="text-xs font-bold text-[#121c2a] line-clamp-2">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-[#707973] hover:text-[#ba1a1a] p-0.5"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                          <span className="inline-block mt-1 text-[10px] bg-[#dee9fc] text-[#0f5238] px-1.5 py-0.5 rounded font-semibold">
                            {item.product.kibbleBadge}
                          </span>
                        </div>
                      </div>

                      {/* Subscription toggle checkbox */}
                      <div className="bg-[#f8f9ff] p-2.5 rounded-lg border border-[#bfc9c1]/40 flex items-center justify-between text-xs">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.isSubscription}
                            onChange={() => onToggleSubscription(item.product.id)}
                            className="rounded text-[#0f5238] focus:ring-[#0f5238] h-3.5 w-3.5"
                          />
                          <span className="font-bold text-[#0f5238]">
                            정기구독 신청 (평생 15% 추가할인)
                          </span>
                        </label>
                        {item.isSubscription && (
                          <span className="text-[10px] bg-[#fdbd77] text-[#784a0d] px-1.5 py-0.5 rounded font-bold">
                            -15% OFF
                          </span>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-[#bfc9c1] rounded-lg overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="px-2.5 py-1 text-xs hover:bg-slate-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-semibold text-[#121c2a]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="px-2.5 py-1 text-xs hover:bg-slate-100 font-bold"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-bold text-[#121c2a]">
                            ₩{itemFinalPrice.toLocaleString()}
                          </div>
                          {item.isSubscription && (
                            <div className="text-[10px] text-[#ba1a1a] line-through">
                              ₩{(item.product.price * item.quantity).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#bfc9c1]/60 bg-[#f8f9ff] space-y-3">
              <div className="space-y-1.5 text-xs text-[#404943]">
                <div className="flex justify-between">
                  <span>상품 주문 금액</span>
                  <span className="font-semibold text-[#121c2a]">
                    ₩{rawTotal.toLocaleString()}
                  </span>
                </div>
                {subscriptionDiscount > 0 && (
                  <div className="flex justify-between text-[#0f5238]">
                    <span>정기구독 15% 할인 혜택</span>
                    <span className="font-bold">-₩{subscriptionDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span className="font-semibold text-[#121c2a]">
                    {shippingFee === 0 ? '무료' : `₩${shippingFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#121c2a] pt-2 border-t border-[#bfc9c1]/40">
                  <span>최종 결제 예상액</span>
                  <span className="text-base text-[#0f5238]">
                    ₩{(finalTotal + shippingFee).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSampleNoticeOpen(true)}
                className="w-full py-3.5 rounded-full bg-[#0f5238] text-white text-sm font-bold hover:bg-[#2d6a4f] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">lock</span>
                <span>주문 결제하기 (토스페이먼츠 안심 결제 (샘플))</span>
              </button>
              <SampleNotice
                open={sampleNoticeOpen}
                onClose={() => {
                  setSampleNoticeOpen(false);
                  onClearCart();
                  onClose();
                }}
                slug="paws-tail"
                featureName="주문 결제 및 정기구독 신청"
                kind="sample"
                industry="commerce"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
