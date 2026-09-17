import React from 'react';
import { Product } from '../types';

interface GearShowcaseProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onResetFilters: () => void;
}

const BADGE_TONE: Record<string, string> = {
  accent: 'bg-tertiary-container text-on-tertiary',
  primary: 'bg-primary-container border border-primary text-on-primary-container',
  neutral: 'bg-surface-container-high border border-outline text-on-surface',
};

export const GearShowcase: React.FC<GearShowcaseProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
  onResetFilters,
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
          {/* 이 구역의 가격·사양·배지는 전부 지어낸 예시라는 표시 */}
          <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-sm border border-outline-variant bg-surface-container text-outline font-label-mono-sm text-label-mono-sm">
            가격·사양·배지는 예시입니다
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-label-mono-sm text-label-mono-sm text-outline">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full"></span> 당일 출고 기준 안내 (예시)
          </span>
          <span className="text-outline-variant hidden lg:inline">|</span>
          <span>전 품목 방수팩 패킹 (예시 정책)</span>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="border border-outline-variant bg-surface-container rounded-sm p-10 text-center">
          <span className="material-symbols-outlined text-outline" style={{ fontSize: 32 }}>
            filter_alt_off
          </span>
          <p className="font-body-md text-body-md text-on-surface mt-2">
            고르신 조건에 맞는 장비가 없습니다.
          </p>
          <p className="font-label-mono-sm text-label-mono-sm text-outline mt-1">
            조건을 하나 풀거나 전체 기어로 돌아가 보세요.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-4 min-h-11 px-4 inline-flex items-center gap-1.5 rounded-sm bg-primary-container text-on-primary-container font-label-mono-md text-label-mono-md font-bold hover:bg-surface-container-highest transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              restart_alt
            </span>
            필터 초기화
          </button>
        </div>
      ) : (
        /* sm:2열 은 모바일/웹 경계가 아니라 카드 밀도 조정이다 — 태블릿 세로에서 1열이면 너무 성기다 */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-surface-container border border-outline-variant hover:border-primary transition-all duration-200 rounded-sm flex flex-col group shadow-lg"
            >
              {/* SKU 바 */}
              <div className="p-3 border-b border-outline-variant flex items-center justify-between gap-2 font-label-mono-sm text-label-mono-sm bg-surface-container-low">
                <span className="text-outline whitespace-nowrap">SKU: {product.sku}</span>
                <span className="text-primary font-bold text-right">{product.weightTag}</span>
              </div>

              {/* 이미지 — 누르면 상세가 열린다 */}
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                aria-label={`${product.title} 상세 보기`}
                className="relative h-56 w-full bg-surface-container-lowest overflow-hidden border-b border-outline-variant cursor-pointer block text-left"
              >
                <img
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <span
                    className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm font-label-mono-sm text-label-mono-sm font-bold ${
                      BADGE_TONE[product.badgeTone ?? 'neutral']
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
                {product.specHighlight && (
                  <span className="absolute bottom-2.5 right-2.5 bg-surface-container/90 text-on-surface font-label-mono-sm text-label-mono-sm px-2 py-0.5 rounded border border-outline-variant">
                    {product.specHighlight}
                  </span>
                )}
              </button>

              {/* 사양 */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="font-label-mono-sm text-label-mono-sm text-outline mb-1">
                    {product.categoryTag}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="text-left hover:text-primary transition-colors cursor-pointer"
                    >
                      {product.title}
                    </button>
                  </h3>

                  <div className="space-y-1.5 font-label-mono-sm text-label-mono-sm text-on-surface-variant border-y border-outline-variant py-2.5 my-3">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between gap-2">
                        <span className="text-outline whitespace-nowrap">{spec.label}</span>
                        <span
                          className={`text-right ${
                            spec.highlight ? 'text-primary font-medium' : 'text-on-surface font-medium'
                          }`}
                        >
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 가격·담기 */}
                <div className="pt-2">
                  <div className="flex items-baseline justify-between gap-2 mb-3">
                    <span className="font-label-mono-sm text-label-mono-sm text-outline whitespace-nowrap">
                      {product.originalPrice ? '회원 특별 혜택가' : '정찰가'}
                    </span>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      ₩{product.price.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className={`w-full min-h-11 py-2.5 rounded-sm font-bold font-label-mono-sm text-label-mono-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      product.badgeTone === 'accent'
                        ? 'bg-tertiary-container hover:bg-tertiary text-on-tertiary'
                        : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                      add_shopping_cart
                    </span>{' '}
                    장바구니 담기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
