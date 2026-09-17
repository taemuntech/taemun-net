import React from 'react';
import { Product } from '../types';

interface GearShowcaseProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const GearShowcase: React.FC<GearShowcaseProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>
          <div className="font-label-mono-sm text-label-mono-sm text-primary tracking-widest uppercase mb-1">
            FIELD MISSION READY SELECTION
          </div>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
            노르딕 피크 익스페디션 라인업
          </h2>
        </div>
        <div className="flex items-center gap-3 font-label-mono-sm text-label-mono-sm text-outline">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span> 당일 즉시 출고
            가능
          </span>
          <span className="text-outline-variant">|</span>
          <span>전 품목 군용 방수팩 패킹 지원</span>
        </div>
      </div>

      {/* 4-Card Hardware Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-surface-container border border-outline-variant hover:border-primary transition-all duration-200 rounded-sm flex flex-col group shadow-lg"
          >
            {/* Card Header SKU Bar */}
            <div className="p-3 border-b border-outline-variant flex items-center justify-between font-label-mono-sm text-label-mono-sm bg-surface-container-low">
              <span className="text-outline">SKU: {product.sku}</span>
              <span className="text-primary font-bold">{product.weightTag}</span>
            </div>

            {/* Recessed Hardware Visual Canvas */}
            <div
              className="relative h-56 bg-surface-container-lowest overflow-hidden border-b border-outline-variant cursor-pointer"
              onClick={() => onSelectProduct(product)}
            >
              <img
                src={product.imageUrl}
                alt={product.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
              {product.badge && (
                <span
                  className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm font-label-mono-sm text-label-mono-sm font-bold ${
                    product.badge === 'BEST SELLER'
                      ? 'bg-tertiary-container text-on-tertiary'
                      : product.badge.includes('티타늄')
                      ? 'bg-primary-container border border-primary text-on-primary-container'
                      : 'bg-surface-container-high border border-outline text-on-surface'
                  }`}
                >
                  {product.badge}
                </span>
              )}
              {product.specHighlight && (
                <span className="absolute bottom-2.5 right-2.5 bg-surface-container/90 text-on-surface font-label-mono-sm text-label-mono-sm px-2 py-0.5 rounded border border-outline-variant backdrop-blur-xs">
                  {product.specHighlight}
                </span>
              )}
            </div>

            {/* Spec Body */}
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <div className="font-label-mono-sm text-label-mono-sm text-outline mb-1">
                  {product.categoryTag}
                </div>
                <h3
                  onClick={() => onSelectProduct(product)}
                  className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2 hover:text-primary transition-colors cursor-pointer"
                >
                  {product.title}
                </h3>

                {/* Spec Metrics List */}
                <div className="space-y-1.5 font-label-mono-sm text-label-mono-sm text-on-surface-variant border-y border-outline-variant py-2.5 my-3">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-outline">{spec.label}</span>
                      <span
                        className={
                          spec.highlight
                            ? 'text-primary font-medium'
                            : 'text-on-surface font-medium'
                        }
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Button */}
              <div className="pt-2">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-label-mono-sm text-label-mono-sm text-outline">
                    {product.id === 'varg-42-dome' ? '회원 특별 혜택가' : '정찰가'}
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    ₩{product.price.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className={`w-full py-2.5 rounded-sm font-bold font-label-mono-sm text-label-mono-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    product.id === 'varg-42-dome'
                      ? 'bg-tertiary-container hover:bg-tertiary hover:text-on-tertiary text-on-tertiary'
                      : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant'
                  }`}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                    {product.id === 'varg-42-dome' ? 'add_shopping_cart' : 'add_shopping_cart'}
                  </span>{' '}
                  장바구니 담기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
