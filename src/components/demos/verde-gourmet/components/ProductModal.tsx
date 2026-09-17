import React, { useEffect, useId, useRef, useState } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [quantity, setQuantity] = useState(1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc·배경 스크롤 잠금·포커스 순환 — 샘플 공용 훅(조건부 호출 금지라 early return 위에 둔다)
  useSampleDialog({ open: product !== null, onClose, dialogRef });

  // 이 컴포넌트는 닫혀도 마운트된 채라 수량이 남는다 — 다른 상품을 열면 1로 되돌린다
  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant overflow-hidden outline-none"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="상품 상세 닫기"
            className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-surface-container-lowest/90 backdrop-blur flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors border border-outline-variant"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Box */}
            <div className="relative aspect-square lg:aspect-auto lg:h-full bg-surface-container">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              referrerPolicy="no-referrer" />
              <div className="absolute top-3 left-3 flex flex-col items-start gap-1">
                {product.badge && (
                  <span className="bg-primary-container text-on-primary px-2.5 py-0.5 rounded text-xs font-mono font-bold">
                    {product.badge}
                  </span>
                )}
                <span className="bg-surface-container-lowest/90 backdrop-blur text-secondary px-2.5 py-0.5 rounded text-xs font-mono font-semibold border border-outline-variant">
                  {product.tempBadge}
                </span>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-mono text-secondary font-medium">
                  {product.origin}
                </div>
                <h2 id={titleId} className="text-lg font-bold text-primary mt-1 pr-12">
                  {product.name}
                </h2>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  {product.description}
                </p>

                {/* Provenance specs — 번호·생산자는 전부 자리표시(예시)다 */}
                <div className="mt-4 p-3 bg-surface-container-low rounded-xl border border-outline-variant space-y-1.5 text-xs">
                  <div className="flex justify-between gap-3">
                    <span className="text-outline shrink-0">축산/농수산 이력번호</span>
                    <span className="font-mono font-bold text-primary text-right">
                      {product.traceabilityNumber || '000000000000 (예시)'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-outline shrink-0">생산자</span>
                    <span className="text-primary font-medium text-right">{product.producer}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-outline shrink-0">보관 방식</span>
                    <span className="text-primary text-right">{product.storageType}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-outline shrink-0">포장</span>
                    <span className="text-secondary font-medium text-right">{product.packaging}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-4 pt-3 border-t border-outline-variant/60 flex items-baseline gap-x-2 gap-y-1 flex-wrap">
                  {product.discountPercent && (
                    <span className="text-error font-bold text-xl">
                      {product.discountPercent}%
                    </span>
                  )}
                  <span className="text-2xl font-bold text-primary font-mono">
                    ₩{product.price.toLocaleString('ko-KR')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs font-mono text-outline line-through">
                      ₩{product.originalPrice.toLocaleString('ko-KR')}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-on-surface-variant">수량 선택</span>
                  <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-low">
                    <button
                      type="button"
                      aria-label="수량 줄이기"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="flex h-11 w-11 items-center justify-center text-sm font-mono hover:bg-surface-container rounded-l-lg"
                    >
                      -
                    </button>
                    <span aria-live="polite" className="px-4 text-xs font-mono font-bold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="수량 늘리기"
                      onClick={() => setQuantity(q => q + 1)}
                      className="flex h-11 w-11 items-center justify-center text-sm font-mono hover:bg-surface-container rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    aria-label={isWishlisted ? '찜 해제' : '찜하기'}
                    aria-pressed={isWishlisted}
                    onClick={() => onToggleWishlist(product.id)}
                    className={`flex min-h-11 w-12 shrink-0 items-center justify-center rounded-xl border border-outline-variant transition-colors ${ isWishlisted ? 'bg-error-container text-error border-error/30' : 'bg-surface-container text-on-surface-variant hover:text-error' }`}
                  >
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onClose();
                    }}
                    className="flex-1 min-h-11 bg-primary hover:bg-secondary text-on-primary py-3 px-4 rounded-xl text-xs font-mono font-bold transition-all active:scale-98 shadow-sm flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">shopping_bag</span>
                    <span>₩{(product.price * quantity).toLocaleString('ko-KR')} 담기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
