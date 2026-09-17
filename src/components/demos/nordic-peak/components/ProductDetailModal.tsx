import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import React, { useId, useRef } from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onOrderNow: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOrderNow,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useSampleDialog({ open: product !== null, onClose, dialogRef });

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center lg:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-3xl bg-surface-container-lowest border-t-2 lg:border-2 border-outline-variant rounded-t-xl lg:rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[92vh] outline-none"
      >
        <button
          onClick={onClose}
          aria-label="상세 닫기"
          className="absolute top-3 right-3 z-10 h-11 w-11 flex items-center justify-center bg-surface-container text-outline hover:text-on-surface rounded cursor-pointer border border-outline-variant"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="overflow-y-auto">
          <div className="relative bg-surface-container-low h-56 lg:h-72 flex items-center justify-center border-b border-outline-variant">
            <img
              src={product.imageUrl}
              alt={product.imageAlt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-tertiary-container text-on-tertiary font-label-mono-sm text-label-mono-sm px-2.5 py-1 rounded font-bold">
                {product.badge}
              </span>
            )}
          </div>

          <div className="p-5 lg:p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 font-label-mono-sm text-label-mono-sm text-outline mb-1">
                <span>SKU: {product.sku}</span>
                <span>•</span>
                <span className="text-primary font-bold">{product.weightTag}</span>
              </div>

              <h2
                id={titleId}
                className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2 pr-12 [word-break:keep-all]"
              >
                {product.title}
              </h2>

              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed [word-break:keep-all]">
                {product.description}
              </p>

              <div className="space-y-2 font-label-mono-sm text-label-mono-sm border-t border-b border-outline-variant py-3 my-4">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between gap-3 py-0.5">
                    <span className="text-outline whitespace-nowrap">{spec.label}</span>
                    <span className="text-on-surface font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
                <div className="flex justify-between gap-3 py-0.5">
                  <span className="text-outline whitespace-nowrap">내환경 시험:</span>
                  <span className="text-primary font-semibold text-right [word-break:keep-all]">
                    MIL-STD-810G 기준 참고 자체 시험 (예시 표기)
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <span className="font-label-mono-sm text-label-mono-sm text-outline">
                  익스페디션 공급가 (예시)
                </span>
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  ₩{product.price.toLocaleString()}
                </span>
              </div>

              {/* sm 2열 은 모바일/웹 경계가 아니라 좁은 폰에서 버튼 글자가 눌리지 않게 하는 밀도 조정이다 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="min-h-11 py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant rounded-sm font-label-mono-sm text-label-mono-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                    add_shopping_cart
                  </span>
                  장바구니 담기
                </button>
                <button
                  onClick={() => onOrderNow(product)}
                  className="min-h-11 py-3 bg-tertiary-container hover:bg-tertiary text-on-tertiary rounded-sm font-label-mono-sm text-label-mono-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                    local_shipping
                  </span>
                  주문 신청서 열기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
