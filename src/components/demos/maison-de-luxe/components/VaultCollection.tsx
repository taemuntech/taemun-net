import React, { useState } from 'react';
import { LUXURY_ITEMS, MAISON_FILTERS, formatPrice } from '../data/luxuryData';
import { LuxuryItem, MaisonKey } from '../types';
import { Heart, SearchX } from 'lucide-react';

interface VaultCollectionProps {
  onOrderClick: (item: LuxuryItem) => void;
  onToggleWishlist: (id: string) => void;
  wishlistIds: Set<string>;
  wishlistOnly: boolean;
  onClearWishlistOnly: () => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export const VaultCollection: React.FC<VaultCollectionProps> = ({
  onOrderClick,
  onToggleWishlist,
  wishlistIds,
  wishlistOnly,
  onClearWishlistOnly,
  searchQuery,
  onClearSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MaisonKey>('all');

  const query = searchQuery.trim().toLowerCase();
  const filteredItems = LUXURY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesWishlist = !wishlistOnly || wishlistIds.has(item.id);
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query) ||
      item.brandKo.includes(query) ||
      item.lotNumber.toLowerCase().includes(query);
    return matchesCategory && matchesWishlist && matchesSearch;
  });

  const resetFilters = () => {
    setSelectedCategory('all');
    onClearSearch();
    if (wishlistOnly) onClearWishlistOnly();
  };

  return (
    <section className="w-full px-4 lg:px-16 py-12 lg:py-16" id="collection">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold block uppercase">
            HAUTE ACQUISITIONS — ARCHIVE COLLECTION
          </span>
          <h2 className="font-serif text-xl lg:text-3xl text-[#e5e2e1] mt-1 font-medium [word-break:keep-all]">
            이달의 프라이빗 살롱 아카이브 컬렉션
          </h2>
          {/* 규칙 4: 실적처럼 읽히는 정보에는 「예시」 표시 — 구역 머리에 배지 한 개 */}
          <p className="mt-2 inline-flex items-center gap-1.5 border border-[#d4af37]/40 bg-[#1c1b1b] px-2.5 py-1 text-[10px] text-[#d0c5af] tracking-wide [word-break:keep-all]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>
            메종 이름·상품·가격·로트번호는 모두 지어낸 예시입니다
          </p>
        </div>

        {/* Curatorial Filter Tabs — 지어낸 메종 기준(예전엔 실존 브랜드 이름이었다) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
          {MAISON_FILTERS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              aria-pressed={selectedCategory === tab.key}
              className={`px-4 min-h-11 lg:min-h-0 lg:py-1.5 flex items-center text-[11px] font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === tab.key
                  ? 'bg-[#f2ca50] text-[#0e0e0e]'
                  : 'border border-[#d4af37]/40 text-[#d0c5af] hover:text-[#f2ca50]'
              }`}
              onClick={() => setSelectedCategory(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 지금 걸린 조건 — 필터·검색·위시리스트가 실제로 결과를 바꾼다는 게 눈에 보이게 */}
      <div className="mb-5 flex flex-wrap items-center gap-2 text-[11px] text-[#99907c]">
        <span>
          {filteredItems.length}점 / 전체 {LUXURY_ITEMS.length}점
        </span>
        {wishlistOnly && (
          <button
            type="button"
            onClick={onClearWishlistOnly}
            className="inline-flex items-center gap-1 border border-[#f2ca50] text-[#f2ca50] px-3 min-h-11 lg:min-h-0 lg:py-1 hover:bg-[#f2ca50] hover:text-[#0e0e0e] transition-colors cursor-pointer"
          >
            위시리스트만 보기 해제
          </button>
        )}
        {query && (
          <button
            type="button"
            onClick={onClearSearch}
            className="inline-flex items-center gap-1 border border-[#d4af37]/40 px-3 min-h-11 lg:min-h-0 lg:py-1 hover:text-[#f2ca50] hover:border-[#f2ca50] transition-colors cursor-pointer"
          >
            검색어 「{searchQuery.trim()}」 지우기
          </button>
        )}
      </div>

      {/* Product Grid — 태블릿(768)에서 1열로 늘어져 있었다: md 부터 2열 */}
      {filteredItems.length === 0 ? (
        <div className="border border-[#d4af37]/40 bg-[#0e0e0e] py-16 px-6 text-center space-y-3">
          <SearchX className="w-10 h-10 mx-auto text-[#4d4635]" />
          <p className="text-sm text-[#d0c5af] [word-break:keep-all]">조건에 맞는 아카이브 피스가 없습니다.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center min-h-11 px-5 border border-[#f2ca50] text-[#f2ca50] text-[11px] tracking-wider font-semibold hover:bg-[#f2ca50] hover:text-[#0e0e0e] transition-colors cursor-pointer"
          >
            조건 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
                    <div className="absolute top-2 left-2 bg-[#0e0e0e]/90 px-2 py-0.5 border border-[#4d4635] text-[10px] text-[#f2ca50] font-medium tracking-wide max-w-[70%] truncate">
                      {item.locationTag}
                    </div>
                    <button
                      type="button"
                      className="absolute top-1 right-1 flex items-center justify-center h-11 w-11 rounded-full text-[#e5e2e1] hover:text-[#f2ca50] transition-colors cursor-pointer"
                      onClick={() => onToggleWishlist(item.id)}
                      aria-pressed={isWishlisted}
                      aria-label={isWishlisted ? `${item.name} 위시리스트에서 빼기` : `${item.name} 위시리스트에 담기`}
                      title={isWishlisted ? '위시리스트에서 빼기' : '위시리스트에 담기'}
                    >
                      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#0e0e0e]/80">
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'text-[#f2ca50] fill-[#f2ca50]' : ''}`} />
                      </span>
                    </button>

                    <div className="absolute bottom-2 left-2 right-2 bg-[#0e0e0e]/90 px-2.5 py-1.5 flex items-center justify-between gap-2 text-[#e5e2e1] text-[10px] border border-[#4d4635]">
                      <span className="text-[#d0c5af] whitespace-nowrap">관·부가세 포함</span>
                      <span className="text-[#f2ca50] font-bold truncate">{item.customFeature}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#99907c] tracking-wider uppercase font-semibold">{item.brand}</p>
                  <h3 className="font-serif text-base text-[#e5e2e1] mt-0.5 font-medium leading-snug [word-break:keep-all]">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-[#d0c5af] mt-1 font-light [word-break:keep-all]">{item.lotNumber}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#4d4635] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-[#99907c] line-through block">
                      {formatPrice(item.originalPrice)}
                    </span>
                    <p className="text-sm font-bold text-[#f2ca50]">{formatPrice(item.salePrice)}</p>
                  </div>
                  <button
                    type="button"
                    className="px-3.5 min-h-11 lg:min-h-0 lg:py-1.5 flex items-center bg-[#f2ca50] text-[#0e0e0e] text-[11px] font-bold tracking-wider hover:bg-[#ffe088] transition-colors cursor-pointer active:scale-95 whitespace-nowrap"
                    onClick={() => onOrderClick(item)}
                  >
                    장바구니 담기
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
