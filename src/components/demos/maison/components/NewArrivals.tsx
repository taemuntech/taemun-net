"use client";

import React, { useState } from 'react';
import { PRODUCTS } from '../data/antiqueData';
import { Product } from '../types';

interface NewArrivalsProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

interface FilterOption {
  key: string;
  label: string;
}

const FILTERS: FilterOption[] = [
  { key: 'all', label: '전체보기' },
  { key: 'french', label: '프랑스 앤틱' },
  { key: 'british', label: '영국 빅토리아 & 조지안' },
  { key: 'lighting', label: '오르몰루 조명' },
  { key: 'mirrors', label: '길트 거울' },
  { key: 'objects', label: '장식 오브제' },
];

/** 칩에 붙는 수는 그 칩을 눌렀을 때 실제로 남는 작품 수와 같아야 한다 */
const countFor = (key: string) =>
  key === 'all' ? PRODUCTS.length : PRODUCTS.filter((item) => item.category === key).length;

const PAGE_SIZE = 6;

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  selectedFilter,
  onFilterChange,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [showAllItems, setShowAllItems] = useState(false);

  const filteredProducts = PRODUCTS.filter(
    (item) => selectedFilter === 'all' || item.category === selectedFilter,
  );

  const displayedProducts = showAllItems
    ? filteredProducts
    : filteredProducts.slice(0, PAGE_SIZE);
  const hasMore = filteredProducts.length > PAGE_SIZE;

  return (
    <section
      id="arrivals"
      className="py-16 lg:py-20 bg-[#fff8f5] border-b border-[#d6c2c2] scroll-mt-[calc(var(--sample-bar-h,0px)_+_88px)]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        {/* Header and Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-[#d6c2c2]">
          <div>
            <span className="text-[10px] text-[#735b24] uppercase tracking-[0.2em] font-bold">
              Acquisitions &amp; Registry
            </span>
            <h2 className="font-serif text-[28px] lg:text-[36px] text-[#300a10] mt-1">
              최근 입고된 앤틱 아카이브
              <span className="ml-3 inline-block border border-[#735b24]/60 px-2 py-0.5 align-middle text-[10px] font-sans font-bold uppercase tracking-wider text-[#735b24]">
                예시 데이터
              </span>
            </h2>
          </div>

          {/* Strict Rectangular Filter Tags */}
          <div
            id="arrivals-filter-tags"
            className="flex flex-wrap gap-2 mt-6 lg:mt-0"
          >
            {FILTERS.map((f) => {
              const isActive = selectedFilter === f.key;
              return (
                <button
                  key={f.key}
                  id={`filter-btn-${f.key}`}
                  type="button"
                  onClick={() => onFilterChange(f.key)}
                  className={`inline-flex min-h-11 items-center px-3.5 text-[11px] uppercase tracking-wider font-semibold border transition-colors cursor-pointer lg:min-h-0 lg:py-1.5 ${
                    isActive
                      ? 'bg-[#3E4436] text-[#fff8f5] border-[#3E4436]'
                      : 'bg-[#fff8f5] text-[#1e1b18] hover:bg-[#f5ece7] border-[#d6c2c2]'
                  }`}
                >
                  {f.label} ({countFor(f.key)})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid (Tonal Stratification & Curatorial Specimen Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <article
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-[#F4EFE6] border border-[#E4DDD0] p-4 flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div
                    className="aspect-[4/3] bg-[#fff8f5] overflow-hidden relative mb-4 border border-[#E3DCCF] cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img
                      alt={product.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={product.image}
                    />
                    <span className="absolute top-3 left-3 bg-[#fff8f5]/90 backdrop-blur-xs text-[#735b24] px-2.5 py-1 text-[10px] tracking-widest border border-[#d6c2c2] font-semibold">
                      {product.tag1}
                    </span>
                    {product.tag2 && (
                      <span className="absolute top-3 right-3 bg-[#300a10] text-[#fff8f5] px-2 py-0.5 text-[9px] tracking-wider uppercase font-semibold">
                        {product.tag2}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#735b24] uppercase tracking-widest text-[10px] font-semibold">
                      {product.period}
                    </span>
                    <h3
                      className="font-serif text-[19px] lg:text-[20px] text-[#300a10] group-hover:text-[#735b24] transition-colors cursor-pointer line-clamp-1"
                      onClick={() => onSelectProduct(product)}
                    >
                      {product.name}
                    </h3>
                    <p className="font-serif text-[13px] text-[#514344] italic line-clamp-1">
                      {product.enName}
                    </p>
                    <p className="font-serif text-[12px] text-[#514344]/80">
                      {product.dimensions}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[#d6c2c2]/60 flex items-center justify-between">
                  <span className="font-serif text-[18px] lg:text-[19px] font-bold text-[#300a10]">
                    {product.formattedPrice}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      id={`btn-wishlist-${product.id}`}
                      aria-label="Add to Wishlist"
                      type="button"
                      onClick={() => onToggleWishlist(product)}
                      className={`flex min-h-11 min-w-11 items-center justify-center transition-colors cursor-pointer ${
                        isWishlisted
                          ? 'text-[#735b24]'
                          : 'text-[#514344] hover:text-[#300a10]'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          isWishlisted ? 'material-symbols-fill' : ''
                        }`}
                      >
                        favorite
                      </span>
                    </button>
                    <button
                      id={`btn-view-${product.id}`}
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="inline-flex min-h-11 items-center bg-[#300a10] text-[#fff8f5] hover:bg-[#4a1e23] px-3.5 text-[11px] uppercase tracking-wider font-semibold cursor-pointer transition-colors lg:min-h-0 lg:py-1.5"
                    >
                      상세보기
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <p className="py-16 text-center font-serif text-[16px] text-[#514344]">
            이 분류에 지금 입고된 작품이 없습니다. 다른 분류를 골라 보세요.
          </p>
        )}

        {/* Archival Index Pagination / Expand Button */}
        {hasMore && (
        <div className="mt-14 text-center">
          <button
            id="btn-load-more-specimens"
            type="button"
            onClick={() => setShowAllItems(!showAllItems)}
            className="inline-flex items-center space-x-2 bg-[#fff8f5] hover:bg-[#f5ece7] border border-[#300a10] px-8 py-3.5 text-[#300a10] text-[13px] uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <span>
              {showAllItems
                ? '아카이브 축소하여 보기'
                : `아카이브 ${filteredProducts.length}개 작품 모두 보기`}
            </span>
            <span
              className={`material-symbols-outlined text-[18px] transition-transform ${
                showAllItems ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
        </div>
        )}
      </div>
    </section>
  );
};
