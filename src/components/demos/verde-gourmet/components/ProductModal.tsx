import React, { useState } from 'react';
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

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors border border-outline-variant"
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
              <div className="absolute top-3 left-3 flex flex-col gap-1">
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
                <h2 className="text-lg font-bold text-primary mt-1">
                  {product.name}
                </h2>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  {product.description}
                </p>

                {/* Provenance specs */}
                <div className="mt-4 p-3 bg-surface-container-low rounded-xl border border-outline-variant space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-outline">축산/농수산 이력번호</span>
                    <span className="font-mono font-bold text-primary">
                      {product.traceabilityNumber || '000000000000 (예시)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">생산자</span>
                    <span className="text-primary font-medium">{product.producer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">보관 방식</span>
                    <span className="text-primary">{product.storageType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">포장</span>
                    <span className="text-secondary font-medium">{product.packaging}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-4 pt-3 border-t border-outline-variant/60 flex items-baseline gap-2">
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
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3 py-1 text-sm font-mono hover:bg-surface-container"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-xs font-mono font-bold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-3 py-1 text-sm font-mono hover:bg-surface-container"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3 rounded-xl border border-outline-variant transition-colors flex items-center justify-center ${ isWishlisted ? 'bg-error-container text-error border-error/30' : 'bg-surface-container text-on-surface-variant hover:text-error' }`}
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
                    className="flex-1 bg-primary hover:bg-secondary text-on-primary py-3 px-4 rounded-xl text-xs font-mono font-bold transition-all active:scale-98 shadow-sm flex items-center justify-center gap-2"
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
