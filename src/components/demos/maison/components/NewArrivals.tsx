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
  count?: number;
}

const FILTERS: FilterOption[] = [
  { key: 'all', label: '전체보기', count: 24 },
  { key: 'french', label: '프랑스 앤틱' },
  { key: 'british', label: '영국 빅토리아 & 조지안' },
  { key: 'lighting', label: '오르몰루 조명' },
  { key: 'objects', label: '장식 오브제' },
];

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  selectedFilter,
  onFilterChange,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [showAllItems, setShowAllItems] = useState(false);

  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'french') return item.category === 'french';
    if (selectedFilter === 'british') return item.category === 'british';
    if (selectedFilter === 'lighting') return item.category === 'lighting';
    if (selectedFilter === 'objects') return item.category === 'objects';
    return true;
  });

  const displayedProducts = showAllItems
    ? filteredProducts
    : filteredProducts.slice(0, 6);

  return (
    <section
      id="arrivals"
      className="py-16 lg:py-20 bg-[#fff8f5] border-b border-[#d6c2c2]"
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
                  className={`px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#3E4436] text-[#fff8f5] border-[#3E4436]'
                      : 'bg-[#fff8f5] text-[#1e1b18] hover:bg-[#f5ece7] border-[#d6c2c2]'
                  }`}
                >
                  {f.label}
                  {f.count ? ` (${f.count})` : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid (Tonal Stratification & Curatorial Specimen Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                      className={`p-2 transition-colors cursor-pointer ${
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
                      className="bg-[#300a10] text-[#fff8f5] hover:bg-[#4a1e23] px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-semibold cursor-pointer transition-colors"
                    >
                      상세보기
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Archival Index Pagination / Expand Button */}
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
                : '아카이브 전체 84개 작품 더보기'}
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
      </div>
    </section>
  );
};
