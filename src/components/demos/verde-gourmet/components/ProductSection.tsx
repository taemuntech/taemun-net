import React from 'react';
import { Product } from '../types';

interface ProductSectionProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onSelectProduct,
  wishlist,
  onToggleWishlist
}) => {
  const categories = [
    { id: 'all', label: '전체 베스트' },
    { id: 'meat', label: '신선 정육/달걀' },
    { id: 'seafood', label: '산지 수산' },
    { id: 'vegetable', label: '친환경 채소' },
    { id: 'bakery', label: '베이커리/샤퀴테리' }
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString('ko-KR')}`;
  };

  return (
    <section id="best-section" className="space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-outline-variant pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl lg:text-2xl font-bold text-primary">실시간 베스트 &amp; 타임 특가</h2>
            <span className="bg-error text-on-error text-xs font-mono px-2 py-0.5 rounded-full font-bold">
              25% OFF
            </span>
          </div>
          <p className="text-[13px] text-on-surface-variant mt-0.5">
            베르데 고메 미식가들이 가장 많이 선택한 오늘의 엄선 식재료
          </p>
        </div>

        {/* Filter Sub-Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${ isActive ? 'bg-primary-container text-on-primary font-bold shadow-xs' : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant border border-outline-variant' }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4-COLUMN PRODUCT GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlist.includes(product.id);

          return (
            <article
              key={product.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col group hover:shadow-md transition-all duration-200"
            >
              {/* Image & Badges */}
              <div
                className="relative aspect-[1/1] overflow-hidden bg-surface-container cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer" />

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  {product.badge && (
                    <span className="bg-primary-container text-on-primary px-2 py-0.5 rounded text-[10px] font-mono font-bold shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  <span className="bg-surface-container-lowest/90 backdrop-blur text-secondary px-2 py-0.5 rounded text-[10px] font-mono font-semibold border border-outline-variant">
                    {product.tempBadge}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  aria-label="찜하기"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur flex items-center justify-center transition-all ${ isWishlisted ? 'bg-surface-container-lowest text-error scale-110 shadow-sm' : 'bg-surface-container-lowest/80 text-on-surface-variant hover:text-error' }`}
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
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="text-base font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-[12px] text-on-surface-variant mt-1 line-clamp-1">
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
                  <div className="flex items-baseline gap-2">
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
                        샛별한정
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-outline mt-0.5">
                    {product.unitPrice}
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="w-full mt-3 bg-surface-container hover:bg-primary hover:text-on-primary text-primary py-2.5 px-3 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-1.5 border border-outline-variant active:scale-98"
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
    </section>
  );
};
