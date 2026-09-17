import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import React, { useId, useRef } from 'react';
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/70 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed top-[var(--sample-bar-h,0px)] bottom-0 right-0 max-w-full flex pl-8 lg:pl-10">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="w-screen max-w-md bg-surface-container-low border-l border-outline-variant shadow-2xl flex flex-col outline-none"
        >
          <div className="p-4 border-b border-outline-variant bg-surface flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-primary shrink-0">shopping_bag</span>
              <span
                id={titleId}
                className="font-headline-sm text-headline-sm font-bold text-on-surface whitespace-nowrap"
              >
                익스페디션 기어백
              </span>
              <span className="bg-tertiary-container text-on-tertiary font-label-mono-sm text-label-mono-sm px-1.5 py-0.5 rounded-sm font-bold shrink-0">
                {totalCount}건
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="기어백 닫기"
              className="h-11 w-11 shrink-0 flex items-center justify-center text-outline hover:text-on-surface rounded-sm cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="bg-surface-container px-4 py-2 border-b border-outline-variant text-[11px] font-mono text-primary flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
            전 품목 방수팩 패킹 (예시 정책)
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-outline">
                <span className="material-symbols-outlined" style={{ fontSize: 40 }}>
                  production_quantity_limits
                </span>
                <p className="font-body-md text-body-md mt-2">기어백에 담긴 장비가 없습니다.</p>
                <button
                  onClick={onClose}
                  className="mt-4 min-h-11 px-4 inline-flex items-center rounded-sm bg-primary-container text-on-primary-container font-label-mono-md text-label-mono-md font-bold cursor-pointer hover:bg-surface-container-highest"
                >
                  기어 목록으로 돌아가기
                </button>
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
                    className="w-20 h-20 object-cover rounded-sm border border-outline-variant shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-label-mono-sm text-label-mono-sm text-outline truncate">
                          SKU: {item.product.sku}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          aria-label={`${item.product.title} 빼기`}
                          className="h-11 w-11 -mt-2 -mr-2 shrink-0 flex items-center justify-center text-outline hover:text-tertiary transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                            delete
                          </span>
                        </button>
                      </div>
                      <h4 className="font-body-md text-body-md font-semibold text-on-surface line-clamp-2">
                        {item.product.title}
                      </h4>
                      <div className="font-label-mono-sm text-label-mono-sm text-primary font-bold mt-1">
                        ₩{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        aria-label="수량 줄이기"
                        disabled={item.quantity <= 1}
                        className="h-11 w-11 lg:h-8 lg:w-8 bg-surface-container-high border border-outline-variant text-on-surface rounded flex items-center justify-center hover:bg-surface-container-highest cursor-pointer font-mono disabled:opacity-40 disabled:cursor-default"
                      >
                        −
                      </button>
                      <span className="font-mono text-sm px-3 min-w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="수량 늘리기"
                        className="h-11 w-11 lg:h-8 lg:w-8 bg-surface-container-high border border-outline-variant text-on-surface rounded flex items-center justify-center hover:bg-surface-container-highest cursor-pointer font-mono"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t border-outline-variant bg-surface space-y-3">
              <div className="space-y-1.5 font-label-mono-sm text-label-mono-sm">
                <div className="flex justify-between gap-2 text-outline">
                  <span>장비 합계</span>
                  <span>₩{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-2 text-outline">
                  <span>방수 패킹 배송비</span>
                  <span className="text-primary font-bold">0원 (예시 정책)</span>
                </div>
                <div className="flex justify-between gap-2 text-on-surface font-headline-sm text-headline-sm pt-2 border-t border-outline-variant">
                  <span>결제 예정 금액</span>
                  <span className="text-primary font-bold">₩{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full min-h-11 bg-tertiary-container hover:bg-tertiary text-on-tertiary py-3 rounded-sm font-bold font-label-mono-md text-label-mono-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">local_shipping</span>
                <span>주문 신청서 열기</span>
              </button>
              <p className="font-label-mono-sm text-label-mono-sm text-outline text-center [word-break:keep-all]">
                샘플 사이트라 결제·주문은 접수되지 않습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
