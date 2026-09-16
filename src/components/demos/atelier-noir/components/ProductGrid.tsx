import React, { useState } from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onOpenProductModal: (product: Product) => void;
  onToggleWishlist: (productId: number) => void;
  onLoadMore: () => void;
  hasMore: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onOpenProductModal,
  onToggleWishlist,
  onLoadMore,
  hasMore,
}) => {
  const [activeTab, setActiveTab] = useState<'realtime' | 'md' | 'timedeal' | 'exclusive'>('realtime');

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
        return products.filter((p) => p.badge?.includes('EXCLUSIVE') || p.badge?.includes('단독') || p.id % 2 === 1);
      case 'realtime':
      default:
        return products;
    }
  };

  const displayList = getDisplayProducts();

  return (
    <section className="py-12 lg:py-16 bg-[#0d0e0f]" id="ranking">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-6">
        {/* Section Header with Real-Time Timestamp */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 hairline-b pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2 h-2 bg-[#caf300] animate-pulse"></span>
              <span className="font-label-sm text-[11px] text-[#caf300] tracking-wider uppercase font-medium">
                LIVE CURATION ENGINE
              </span>
            </div>
            <h2 className="font-display-hero text-2xl lg:text-4xl font-extrabold tracking-tight text-[#ffffff] uppercase">
              COLLECTION RANKING &amp; PICKS
            </h2>
          </div>

          {/* 4-Tab Switcher Navigation */}
          <div className="flex items-center gap-1 font-label-sm text-xs uppercase flex-wrap">
            <button
              onClick={() => setActiveTab('realtime')}
              className={`px-4 py-2 hairline-all transition-all cursor-pointer ${ activeTab === 'realtime' ? 'bg-[#caf300] text-[#171e00] font-bold shadow-[0_0_12px_rgba(202,243,0,0.2)]' : 'bg-[#1f2021] text-[#e3e2e3] hover:text-[#ffffff]' }`}
            >
              01. 실시간 랭킹
            </button>
            <button
              onClick={() => setActiveTab('md')}
              className={`px-4 py-2 hairline-all transition-all cursor-pointer ${ activeTab === 'md' ? 'bg-[#caf300] text-[#171e00] font-bold shadow-[0_0_12px_rgba(202,243,0,0.2)]' : 'bg-[#1f2021] text-[#e3e2e3] hover:text-[#ffffff]' }`}
            >
              02. MD 큐레이션
            </button>
            <button
              onClick={() => setActiveTab('timedeal')}
              className={`px-4 py-2 hairline-all transition-all cursor-pointer ${ activeTab === 'timedeal' ? 'bg-[#caf300] text-[#171e00] font-bold shadow-[0_0_12px_rgba(202,243,0,0.2)]' : 'bg-[#1f2021] text-[#e3e2e3] hover:text-[#ffffff]' }`}
            >
              03. 24H 타임딜 특가
            </button>
            <button
              onClick={() => setActiveTab('exclusive')}
              className={`px-4 py-2 hairline-all transition-all cursor-pointer ${ activeTab === 'exclusive' ? 'bg-[#caf300] text-[#171e00] font-bold shadow-[0_0_12px_rgba(202,243,0,0.2)]' : 'bg-[#1f2021] text-[#e3e2e3] hover:text-[#ffffff]' }`}
            >
              04. 신규 익스클루시브 브랜드
            </button>
          </div>
        </div>

        {/* Product Cards Grid Matrix (8 Distinct Luxury Items) */}
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
                    className="absolute top-2.5 right-2.5 z-10 w-8 h-8 flex items-center justify-center bg-[#0d0e0f]/80 hairline-all text-[#e3e2e3] hover:text-[#caf300] transition-colors cursor-pointer"
                    aria-label="위시리스트 저장"
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

                    <h3
                      onClick={() => onOpenProductModal(product)}
                      className="font-headline-sm text-sm text-[#ffffff] font-semibold truncate hover:text-[#caf300] transition-colors cursor-pointer"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 pt-3 hairline-t flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#8f9378] line-through font-label-sm">
                        ₩{product.originalPrice.toLocaleString()}
                      </div>
                      <div className="font-label-lg text-sm font-bold text-[#ffffff]">
                        ₩{product.price.toLocaleString()}
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

        {/* Load More Action */}
        <div className="text-center mt-10 lg:mt-12">
          <button
            onClick={onLoadMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 hairline-all bg-[#1f2021] hover:bg-[#292a2b] transition-colors font-label-lg text-xs uppercase tracking-wider text-[#ffffff] cursor-pointer active:scale-98"
          >
            <span>
              {hasMore
                ? 'RANKING +24 더보기 (VIEW MORE CURATION)'
                : '모든 실시간 랭킹 컬렉션을 확인했습니다'}
            </span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>
      </div>
    </section>
  );
};
