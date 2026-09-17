import React, { useState } from 'react';
import { LUXURY_ITEMS, formatPrice } from '../data/luxuryData';
import { LuxuryItem } from '../types';
import { Heart, ShoppingBag } from 'lucide-react';

interface VaultCollectionProps {
  onOrderClick: (item: LuxuryItem) => void;
  onToggleWishlist: (id: string) => void;
  wishlistIds: Set<string>;
  searchQuery: string;
}

export const VaultCollection: React.FC<VaultCollectionProps> = ({
  onOrderClick,
  onToggleWishlist,
  wishlistIds,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = LUXURY_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory || (selectedCategory === 'chanel' && item.brand.toLowerCase().includes('chanel'));
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lotNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full px-4 lg:px-16 py-12 lg:py-16" id="womens-bags">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8">
        <div>
          <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold block uppercase">
            HAUTE ACQUISITIONS : WOMEN'S BAGS &amp; WATCHES
          </span>
          <h2 className="font-serif text-xl lg:text-3xl text-[#e5e2e1] mt-1 font-medium">
            이달의 프라이빗 살롱 아카이브 컬렉션
          </h2>
        </div>

        {/* Curatorial Filter Tabs */}
        <div className="flex items-center gap-2 mt-4 lg:mt-0 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            className={`px-4 py-1.5 text-[11px] font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#f2ca50] text-[#0e0e0e]'
                : 'border border-[#d4af37]/40 text-[#d0c5af] hover:text-[#f2ca50]'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            전체 보기
          </button>
          <button
            type="button"
            className={`px-4 py-1.5 text-[11px] font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'chanel'
                ? 'bg-[#f2ca50] text-[#0e0e0e]'
                : 'border border-[#d4af37]/40 text-[#d0c5af] hover:text-[#f2ca50]'
            }`}
            onClick={() => setSelectedCategory('chanel')}
          >
            샤넬 (CHANEL)
          </button>
          <button
            type="button"
            className={`px-4 py-1.5 text-[11px] font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'hermes'
                ? 'bg-[#f2ca50] text-[#0e0e0e]'
                : 'border border-[#d4af37]/40 text-[#d0c5af] hover:text-[#f2ca50]'
            }`}
            onClick={() => setSelectedCategory('hermes')}
          >
            에르메스 (HERMÈS)
          </button>
          <button
            type="button"
            className={`px-4 py-1.5 text-[11px] font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'rolex'
                ? 'bg-[#f2ca50] text-[#0e0e0e]'
                : 'border border-[#d4af37]/40 text-[#d0c5af] hover:text-[#f2ca50]'
            }`}
            onClick={() => setSelectedCategory('rolex')}
          >
            롤렉스 (ROLEX)
          </button>
          <button
            type="button"
            className={`px-4 py-1.5 text-[11px] font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'dior'
                ? 'bg-[#f2ca50] text-[#0e0e0e]'
                : 'border border-[#d4af37]/40 text-[#d0c5af] hover:text-[#f2ca50]'
            }`}
            onClick={() => setSelectedCategory('dior')}
          >
            디올 (DIOR)
          </button>
        </div>
      </div>

      {/* Product Grid: 4 items showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {filteredItems.map((item) => {
          const isWishlisted = wishlistIds.has(item.id);
          return (
            <div
              key={item.id}
              className="bg-[#0e0e0e] border border-[#d4af37]/40 p-4 group flex flex-col justify-between hover:border-[#f2ca50] transition-all"
            >
              <div>
                {/* Thumbnail Frame */}
                <div className="relative overflow-hidden bg-[#1c1b1b] aspect-[4/5] mb-4">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={item.imageAlt}
                    src={item.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-[#0e0e0e]/90 px-2 py-0.5 border border-[#4d4635] text-[10px] text-[#f2ca50] font-medium tracking-wide">
                    {item.locationTag}
                  </div>
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-[#0e0e0e]/80 text-[#e5e2e1] hover:text-[#f2ca50] transition-colors cursor-pointer"
                    onClick={() => onToggleWishlist(item.id)}
                    title="위시리스트 담기"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'text-[#f2ca50] fill-[#f2ca50]' : ''}`} />
                  </button>

                  <div className="absolute bottom-2 left-2 right-2 bg-[#0e0e0e]/90 px-2.5 py-1.5 flex items-center justify-between text-[#e5e2e1] text-[10px] border border-[#4d4635]">
                    <span className="text-[#d0c5af]">관·부가세 100% 포함</span>
                    <span className="text-[#f2ca50] font-bold">{item.customFeature}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#99907c] tracking-wider uppercase font-semibold">
                  {item.brand}
                </p>
                <h3 className="font-serif text-base text-[#e5e2e1] line-clamp-1 mt-0.5 font-medium">
                  {item.name}
                </h3>
                <p className="text-[10px] text-[#d0c5af] mt-1 font-light">
                  {item.lotNumber}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#4d4635] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#99907c] line-through block">
                    {formatPrice(item.originalPrice)}
                  </span>
                  <p className="text-sm font-bold text-[#f2ca50]">
                    {formatPrice(item.salePrice)}
                  </p>
                </div>
                <button
                  type="button"
                  className="px-3.5 py-1.5 bg-[#f2ca50] text-[#0e0e0e] text-[11px] font-bold tracking-wider hover:bg-[#ffe088] transition-colors cursor-pointer active:scale-95"
                  onClick={() => onOrderClick(item)}
                >
                  주문 신청
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
