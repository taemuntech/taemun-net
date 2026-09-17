import React from 'react';
import { Product } from '../types';
import { CATEGORIES, matchesQuery } from '../data/mockData';

interface ProductSectionProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  /** 헤더 검색창·빠른 선택 칩이 건 검색어 */
  searchTerm: string;
  onClearSearch: () => void;
  /** 헤더 하트로 켜는 「찜한 상품만」 필터 */
  isWishlistOnly: boolean;
  onClearWishlistOnly: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
  searchTerm,
  onClearSearch,
  isWishlistOnly,
  onClearWishlistOnly
}) => {
  const filteredProducts = products.filter((p) => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (isWishlistOnly && !wishlist.includes(p.id)) return false;
    return matchesQuery(p, searchTerm);
  });

  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString('ko-KR')}`;
  };

  const resetAll = () => {
    onSelectCategory('all');
    onClearSearch();
    if (isWishlistOnly) onClearWishlistOnly();
  };

  return (
    // 붙박이 헤더가 제목을 가리지 않게 — 「베스트」 메뉴·칩이 이 구역으로 스크롤한다
    <section id="best-section" className="space-y-4 scroll-mt-[calc(var(--sample-bar-h,0px)_+_140px)]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-outline-variant pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl lg:text-2xl font-bold text-primary">실시간 베스트 &amp; 타임 특가</h2>
            <span className="bg-error text-on-error text-xs font-mono px-2 py-0.5 rounded-full font-bold">
              25% OFF
            </span>
          </div>
          <p className="text-[13px] text-on-surface-variant mt-0.5">
            베르데 고메 미식가들이 가장 많이 선택한 오늘의 엄선 식재료 (가격·별점·후기 수는 예시)
          </p>
        </div>

        {/* Filter Sub-Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 max-lg:min-h-11 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${ isActive ? 'bg-primary-container text-on-primary font-bold shadow-xs' : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant border border-outline-variant' }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 지금 걸린 필터 — 무엇 때문에 목록이 줄었는지 보이고, 그 자리에서 풀 수 있다 */}
      {(searchTerm.trim().length > 0 || isWishlistOnly) && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-on-surface-variant">{filteredProducts.length}개 상품</span>
          {searchTerm.trim().length > 0 && (
            <button
              type="button"
              onClick={onClearSearch}
              className="inline-flex min-h-9 max-w-full items-center gap-1 rounded-full bg-primary-container px-3 py-1 font-semibold text-on-primary"
            >
              <span className="truncate">검색: {searchTerm}</span>
              <span className="material-symbols-outlined text-sm shrink-0">close</span>
            </button>
          )}
          {isWishlistOnly && (
            <button
              type="button"
              onClick={onClearWishlistOnly}
              className="inline-flex min-h-9 items-center gap-1 rounded-full bg-error-container px-3 py-1 font-semibold text-error"
            >
              찜한 상품만 ({wishlist.length})
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-6 py-14 text-center">
          <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
          <p className="text-base font-bold text-primary">조건에 맞는 상품이 없습니다.</p>
          <p className="text-xs text-on-surface-variant">
            이 샘플에는 정육 · 수산 · 채소 · 베이커리 네 가지 식재료가 담겨 있습니다.
          </p>
          <button
            type="button"
            onClick={resetAll}
            className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-xs font-mono font-bold text-on-primary"
          >
            전체 상품 다시 보기
          </button>
        </div>
      ) : (
        /* 4-COLUMN PRODUCT GRID */
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <article
                key={product.id}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col group hover:shadow-md transition-all duration-200"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[1/1] overflow-hidden bg-surface-container">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    aria-label={`${product.name} 상세 보기`}
                    className="absolute inset-0 h-full w-full cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
                    {product.badge && (
                      <span className="bg-primary-container text-on-primary px-2 py-0.5 rounded text-[10px] font-mono font-bold shadow-sm w-fit">
                        {product.badge}
                      </span>
                    )}
                    <span className="bg-surface-container-lowest/90 backdrop-blur text-secondary px-2 py-0.5 rounded text-[10px] font-mono font-semibold border border-outline-variant w-fit">
                      {product.tempBadge}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    aria-label={isWishlisted ? `${product.name} 찜 해제` : `${product.name} 찜하기`}
                    aria-pressed={isWishlisted}
                    onClick={() => onToggleWishlist(product.id)}
                    className={`absolute top-1.5 right-1.5 h-11 w-11 lg:top-2.5 lg:right-2.5 lg:h-8 lg:w-8 rounded-full backdrop-blur flex items-center justify-center transition-all ${ isWishlisted ? 'bg-surface-container-lowest text-error shadow-sm' : 'bg-surface-container-lowest/80 text-on-surface-variant hover:text-error' }`}
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-secondary font-medium mb-1">
                      {product.origin}
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="text-left text-base font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 cursor-pointer"
                    >
                      {product.name}
                    </button>
                    <p className="text-[12px] text-on-surface-variant mt-1 line-clamp-2">
                      {product.tag}
                    </p>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mt-2 text-xs text-on-surface-variant">
                      <span className="text-on-tertiary-container font-bold flex items-center">
                        <span className="material-symbols-outlined text-base text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span className="ml-0.5">{product.rating}</span>
                      </span>
                      <span>({product.reviewCount.toLocaleString()}개 후기)</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="mt-4 pt-3 border-t border-outline-variant/50">
                    <div className="flex items-baseline gap-x-2 gap-y-0.5 flex-wrap">
                      {product.discountPercent && (
                        <span className="text-error text-lg font-bold">
                          {product.discountPercent}%
                        </span>
                      )}
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs font-mono text-outline line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      {!product.discountPercent && (
                        <span className="text-xs font-mono text-secondary font-bold">
                          새벽한정
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-outline mt-0.5">
                      {product.unitPrice}
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="w-full mt-3 min-h-11 bg-surface-container hover:bg-primary hover:text-on-primary text-primary py-2.5 px-3 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-1.5 border border-outline-variant active:scale-98"
                    >
                      <span className="material-symbols-outlined text-lg">shopping_cart</span>
                      담기
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
