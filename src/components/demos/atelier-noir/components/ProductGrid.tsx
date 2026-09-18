import React from 'react';
import { Product } from '../types';
import { useCurrency } from '../currency';

export type GridTab = 'realtime' | 'md' | 'timedeal' | 'exclusive';

interface ProductGridProps {
  products: Product[];
  // 탭은 상단 내비(SALE·EXCLUSIVE 등)도 바꾸므로 상태를 위에서 들고 있는다.
  activeTab: GridTab;
  onChangeTab: (tab: GridTab) => void;
  onOpenProductModal: (product: Product) => void;
  onToggleWishlist: (productId: number) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

const TABS: { id: GridTab; label: string }[] = [
  { id: 'realtime', label: '01. 인기 랭킹' },
  { id: 'md', label: '02. MD 큐레이션' },
  { id: 'timedeal', label: '03. 24H 타임딜 특가' },
  { id: 'exclusive', label: '04. 신규 익스클루시브 브랜드' },
];

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeTab,
  onChangeTab,
  onOpenProductModal,
  onToggleWishlist,
  onLoadMore,
  hasMore,
  hasActiveFilters,
  onResetFilters,
}) => {
  const { price } = useCurrency();

  // Filter or sort items based on active tab
  const getDisplayProducts = () => {
    switch (activeTab) {
      case 'md':
        // Curated spotlight order
        return [...products].sort((a, b) => b.price - a.price);
      case 'timedeal':
        // High discount first
        return [...products].sort((a, b) => {
          const discountA = parseInt(a.discountRate) || 0;
          const discountB = parseInt(b.discountRate) || 0;
          return discountB - discountA;
        });
      case 'exclusive':
        // 익스클루시브·단독 배지가 붙은 상품만 — 예전엔 홀수 id 까지 섞여 탭 이름과 목록이 달랐다.
        return products.filter((p) => p.badge?.includes('EXCLUSIVE') || p.badge?.includes('단독'));
      case 'realtime':
      default:
        return products;
    }
  };

  const displayList = getDisplayProducts();

  return (
    <section
      className="py-12 lg:py-16 bg-[#0d0e0f] scroll-mt-[calc(var(--sample-bar-h,0px)_+_72px)]"
      id="ranking"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header with Real-Time Timestamp */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 hairline-b pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2 h-2 bg-[#caf300] animate-pulse"></span>
              <span className="font-label-sm text-[11px] text-[#caf300] tracking-wider uppercase font-medium">
                CURATION ENGINE (예시 데이터)
              </span>
            </div>
            <h2 className="font-display-hero text-2xl lg:text-4xl font-extrabold tracking-tight text-[#ffffff] uppercase">
              COLLECTION RANKING &amp; PICKS
            </h2>
          </div>

          {/* 4-Tab Switcher Navigation */}
          <div className="flex items-center gap-1 font-label-sm text-xs uppercase flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`px-4 py-2 min-h-11 hairline-all transition-all cursor-pointer ${ activeTab === tab.id ? 'bg-[#caf300] text-[#171e00] font-bold shadow-[0_0_12px_rgba(202,243,0,0.2)]' : 'bg-[#1f2021] text-[#e3e2e3] hover:text-[#ffffff]' }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 결과가 0개면 빈 칸을 두지 않고 왜 비었는지 말해 준다 */}
        {displayList.length === 0 && (
          <div className="hairline-all bg-[#1b1c1d] py-16 px-6 text-center">
            <span className="material-symbols-outlined text-4xl text-[#444932] mb-2">search_off</span>
            <p className="text-sm text-[#ffffff] font-semibold">조건에 맞는 상품이 없습니다.</p>
            <p className="text-xs text-[#8f9378] mt-1">
              고른 카테고리·세부분류·컬러·핏·패브릭을 모두 만족하는 상품이 없습니다.
            </p>
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="mt-4 inline-flex items-center min-h-11 px-5 hairline-all bg-[#1f2021] hover:bg-[#292a2b] text-[#caf300] font-label-sm text-xs uppercase tracking-wider cursor-pointer"
              >
                필터 해제하고 전체 보기
              </button>
            )}
          </div>
        )}

        {/* Product Cards Grid Matrix */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" id="product-grid">
          {displayList.map((product, idx) => {
            const rankLabel = product.rank || String(idx + 1).padStart(2, '0');
            const isFirst = idx === 0 && activeTab === 'realtime';

            return (
              <div
                key={product.id}
                className="group hairline-all bg-[#1b1c1d] flex flex-col justify-between transition-all duration-200 hover:border-[#caf300]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#121314]">
                  {/* Rank Badge */}
                  <span
                    className={`absolute top-0 left-0 z-10 font-label-lg font-extrabold px-3 py-1.5 tracking-tighter text-sm ${ isFirst ? 'bg-[#caf300] text-[#171e00]' : 'bg-[#121314] text-[#ffffff] hairline-r hairline-b' }`}
                  >
                    {rankLabel}
                  </span>

                  {/* Wishlist Heart Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 z-10 w-11 h-11 flex items-center justify-center bg-[#0d0e0f]/80 hairline-all text-[#e3e2e3] hover:text-[#caf300] transition-colors cursor-pointer"
                    aria-pressed={Boolean(product.isWishlisted)}
                    aria-label={`${product.name} 위시리스트 ${product.isWishlisted ? '빼기' : '담기'}`}
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] transition-transform ${ product.isWishlisted ? 'text-[#ffb4ab] scale-110' : '' }`}
                      style={{
                        fontVariationSettings: product.isWishlisted
                          ? "'FILL' 1, 'wght' 600"
                          : "'FILL' 0, 'wght' 400",
                      }}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Product Photograph */}
                  <img
                    src={product.image}
                    alt={product.altText}
                    onClick={() => onOpenProductModal(product)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  referrerPolicy="no-referrer" />

                  {/* Delivery / Special Tag */}
                  {product.badge && (
                    <div
                      className={`absolute bottom-2 left-2 z-10 px-2 py-0.5 hairline-all font-label-sm text-[10px] ${ product.badgeType === 'primary' ? 'bg-[#0d0e0f]/90 text-[#caf300]' : 'bg-[#0d0e0f]/90 text-[#8f9378]' }`}
                    >
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Card Info Footer */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-label-sm text-xs font-bold text-[#8f9378] tracking-wider uppercase">
                        {product.brand}
                      </span>
                      <span className="font-label-sm text-xs text-[#ffb4ab] font-bold">
                        {product.discountRate}
                      </span>
                    </div>

                    {/* truncate 로 한 줄에 자르면 모바일에서 상품명이 절반 넘게 잘렸다 — 두 줄까지 보여 준다 */}
                    <button
                      type="button"
                      onClick={() => onOpenProductModal(product)}
                      className="text-left w-full font-headline-sm text-sm text-[#ffffff] font-semibold line-clamp-2 hover:text-[#caf300] transition-colors cursor-pointer"
                      title={product.name}
                    >
                      {product.name}
                    </button>
                    <div className="mt-1 font-label-sm text-[10px] text-[#8f9378] uppercase tracking-wider">
                      {product.subCategory}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 hairline-t flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#8f9378] line-through font-label-sm">
                        {price(product.originalPrice)}
                      </div>
                      <div className="font-label-lg text-sm font-bold text-[#ffffff]">
                        {price(product.price)}
                      </div>
                    </div>

                    {/* Swatch Dots */}
                    <div className="flex items-center gap-1">
                      {product.colors.map((color, cIdx) => (
                        <span
                          key={cIdx}
                          className={`w-3 h-3 inline-block ${ cIdx === 0 ? 'border border-[#caf300]' : '' }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Action — 더 불러올 게 없으면 누를 수 없는 버튼 대신 안내만 남긴다 */}
        <div className="text-center mt-10 lg:mt-12">
          {hasMore ? (
            <button
              onClick={onLoadMore}
              className="inline-flex items-center gap-2 px-8 min-h-11 py-3.5 hairline-all bg-[#1f2021] hover:bg-[#292a2b] transition-colors font-label-lg text-xs uppercase tracking-wider text-[#ffffff] cursor-pointer active:scale-98"
            >
              <span>RANKING 더보기 (VIEW MORE CURATION)</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
          ) : (
            <p className="font-label-sm text-xs text-[#8f9378] uppercase tracking-wider">
              예시로 준비한 컬렉션을 모두 불러왔습니다
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
