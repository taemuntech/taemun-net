import React from 'react';
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
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-surface-container-lowest border-2 border-outline-variant rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-surface-container/80 text-outline hover:text-on-surface p-1.5 rounded cursor-pointer border border-outline-variant"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Left: Image Container */}
        <div className="relative bg-surface-container-low min-h-[280px] flex items-center justify-center border-b border-outline-variant">
          <img
            src={product.imageUrl}
            alt={product.imageAlt}
            className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-tertiary-container text-on-tertiary font-label-mono-sm text-label-mono-sm px-2.5 py-1 rounded font-bold">
              {product.badge}
            </span>
          )}
        </div>

        {/* Right: Spec Info */}
        <div className="p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 font-label-mono-sm text-label-mono-sm text-outline mb-1">
              <span>SKU: {product.sku}</span>
              <span>•</span>
              <span className="text-primary font-bold">{product.weightTag}</span>
            </div>

            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">
              {product.title}
            </h2>

            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">
              {product.description}
            </p>

            {/* Spec Matrix */}
            <div className="space-y-2 font-label-mono-sm text-label-mono-sm border-t border-b border-outline-variant py-3 my-4">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between py-0.5">
                  <span className="text-outline">{spec.label}</span>
                  <span className="text-on-surface font-semibold">{spec.value}</span>
                </div>
              ))}
              <div className="flex justify-between py-0.5">
                <span className="text-outline">MIL-SPEC 테스트:</span>
                <span className="text-primary font-semibold">MIL-STD-810G 적합 판정</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2">
            <div className="flex items-baseline justify-between mb-4">
              <span className="font-label-mono-sm text-label-mono-sm text-outline">
                익스페디션 공급가
              </span>
              <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                ₩{product.price.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant rounded-sm font-label-mono-sm text-label-mono-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  add_shopping_cart
                </span>
                장바구니 담기
              </button>
              <button
                onClick={() => {
                  onOrderNow(product);
                  onClose();
                }}
                className="py-3 bg-tertiary-container hover:bg-tertiary hover:text-on-tertiary text-on-tertiary rounded-sm font-label-mono-sm text-label-mono-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-tertiary-container/30"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  local_shipping
                </span>
                즉시 주문
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
