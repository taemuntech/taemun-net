import React, { useMemo, useState } from 'react';
import { Gift, Heart, Search, Star, X } from 'lucide-react';
import { CATEGORY_FILTERS, PRODUCTS, SORT_OPTIONS } from '../data';
import { CategoryKey, Product, SortKey } from '../types';

interface ProductCollectionProps {
  /** 헤더 카테고리 메뉴와 공유하는 필터 — 메뉴를 누르면 여기 목록이 실제로 바뀐다 */
  activeCategory: CategoryKey;
  onChangeCategory: (category: CategoryKey) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onOrderProduct: (product: Product, selectedPackagingId: string) => void;
  onGiftLink: (product: Product, selectedPackagingId: string) => void;
  /** 머리말 하트와 공유하는 「찜한 작품만」 필터 — 머리말에서 켜면 여기 목록이 실제로 걸러진다 */
  onlyFavorites: boolean;
  onChangeOnlyFavorites: (value: boolean) => void;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({
  activeCategory,
  onChangeCategory,
  favorites,
  onToggleFavorite,
  onOrderProduct,
  onGiftLink,
  onlyFavorites,
  onChangeOnlyFavorites,
}) => {
  // Map of productId -> selectedPackagingId
  const [selectedPackaging, setSelectedPackaging] = useState<Record<string, string>>({
    'product-1': 'pack-1-1',
    'product-2': 'pack-2-1',
    'product-3': 'pack-3-1',
    'product-4': 'pack-4-1',
  });
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('recommended');

  const handlePackagingChange = (productId: string, packagingId: string) => {
    setSelectedPackaging((prev) => ({
      ...prev,
      [productId]: packagingId,
    }));
  };

  const calculateDisplayPrice = (product: Product) => {
    const chosenPackagingId = selectedPackaging[product.id];
    const packaging = product.packagingOptions.find((opt) => opt.id === chosenPackagingId);
    const packagingFee = packaging ? packaging.price : 0;
    return product.price + packagingFee;
  };

  // 필터·검색·정렬은 실제로 목록을 바꾼다(결과 0개도 그대로 보여 준다)
  const visibleProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const filtered = PRODUCTS.filter((product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) return false;
      if (onlyFavorites && !favorites.includes(product.id)) return false;
      if (!keyword) return true;
      return (
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        product.badge.toLowerCase().includes(keyword)
      );
    });

    const sorted = [...filtered];
    if (sort === 'priceAsc') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'priceDesc') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [activeCategory, favorites, onlyFavorites, query, sort]);

  const resetFilters = () => {
    onChangeCategory('all');
    setQuery('');
    setSort('recommended');
    onChangeOnlyFavorites(false);
  };

  return (
    <section id="collection" className="max-w-7xl mx-auto px-4 lg:px-12 py-12 lg:py-20 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-6 pb-4 border-b border-[#d6c3ba]/40">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#C84B31] uppercase">
            Masterpiece Collection
          </span>
          <h2 className="text-2xl lg:text-3xl font-serif text-[#3e1c06] mt-1.5">
            장인의 손길로 빚은 비스포크 공예 선물
          </h2>
        </div>
        <p className="text-xs lg:text-sm text-[#51443d] mt-2 lg:mt-0">
          모든 작품은 주문 즉시 해당 장인의 아틀리에에서 1:1 수작업으로 제작됩니다.
        </p>
      </div>

      {/* Filter · Search · Sort Toolbar */}
      <div className="mb-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => onChangeCategory(cat.key)}
              aria-pressed={activeCategory === cat.key}
              className={`min-h-11 lg:min-h-0 px-3.5 py-2 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat.key
                  ? 'bg-[#583119] text-[#FAF7F2] border border-[#583119]'
                  : 'bg-[#f6f3ee] text-[#51443d] border border-[#d6c3ba]/60 hover:border-[#583119]'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChangeOnlyFavorites(!onlyFavorites)}
            aria-pressed={onlyFavorites}
            className={`min-h-11 lg:min-h-0 px-3.5 py-2 rounded-full text-xs font-medium transition-colors inline-flex items-center gap-1.5 ${
              onlyFavorites
                ? 'bg-[#C84B31] text-white border border-[#C84B31]'
                : 'bg-[#f6f3ee] text-[#51443d] border border-[#d6c3ba]/60 hover:border-[#C84B31]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-white' : ''}`} />
            찜한 작품 {favorites.length}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#83746c] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="collection-search"
              type="text"
              inputMode="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="작품 이름·소재로 검색 (예: 지갑, 보자기, 황동)"
              aria-label="컬렉션 작품 검색"
              className="w-full min-h-11 bg-[#fcf9f4] border border-[#d6c3ba] rounded pl-9 pr-11 py-2.5 text-sm text-[#3e1c06] placeholder:text-[#a2948b] focus:border-[#583119] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="검색어 지우기"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-[#83746c] hover:text-[#3e1c06] rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="collection-sort" className="text-xs text-[#51443d] shrink-0">
              정렬
            </label>
            <select
              id="collection-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="flex-1 lg:flex-none min-h-11 bg-[#fcf9f4] border border-[#d6c3ba] rounded px-3 py-2 text-xs text-[#3e1c06] focus:border-[#583119] outline-none transition-colors"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#83746c]">
          <span className="px-1.5 py-0.5 rounded bg-[#ebe8e3] font-semibold text-[#51443d] border border-[#d6c3ba]/60">
            예시 수치
          </span>
          <span>평점·리뷰 수는 화면 예시이며 실제 판매 실적이 아닙니다.</span>
          <span className="text-[#d6c3ba]">|</span>
          <span aria-live="polite" className="text-[#51443d] font-medium">
            {visibleProducts.length}개 작품 표시 중
          </span>
        </div>
      </div>

      {/* 작품 그리드 — 태블릿(768)에서 한 열로 늘어지던 자리라 그리드 칸 수만 2열로 나눈다(UI 모드 경계는 lg 그대로) */}
      {visibleProducts.length === 0 ? (
        <div className="border border-dashed border-[#d6c3ba] rounded-lg py-16 px-6 text-center space-y-3 bg-[#fcf9f4]">
          <p className="text-sm text-[#3e1c06] font-medium">조건에 맞는 작품이 없습니다.</p>
          <p className="text-xs text-[#51443d]">
            검색어나 카테고리를 바꿔 보시거나, 아래 버튼으로 전체 컬렉션을 다시 보실 수 있습니다.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="min-h-11 inline-flex items-center justify-center px-5 py-2.5 bg-[#583119] text-[#FAF7F2] text-xs font-medium rounded hover:bg-[#422310] transition-colors"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => {
            const isFavorited = favorites.includes(product.id);
            const currentPackagingId = selectedPackaging[product.id] || product.packagingOptions[0].id;
            const displayPrice = calculateDisplayPrice(product);

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-[#F1EBE1] border border-[#583119]/15 rounded overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Product Thumbnail Container */}
                  <div className="relative aspect-square overflow-hidden bg-[#ebe8e3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    <span
                      className={`absolute top-3 left-3 text-[11px] font-medium px-2 py-1 rounded shadow-xs ${
                        product.badgeColor || 'bg-[#3e1c06] text-white'
                      }`}
                    >
                      {product.badge}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(product.id)}
                      aria-pressed={isFavorited}
                      aria-label={`${product.name} 찜하기`}
                      className="absolute top-2 right-2 w-11 h-11 lg:w-9 lg:h-9 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-[#3e1c06] hover:text-[#C84B31] transition-colors shadow-xs"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isFavorited ? 'fill-[#C84B31] text-[#C84B31]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Details Section */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#51443d]">
                      <span className="flex items-center text-[#C84B31] font-bold">
                        <Star className="w-3.5 h-3.5 fill-[#C84B31] text-[#C84B31] inline mr-0.5" />
                        {product.rating.toFixed(1)}
                      </span>
                      <span>({product.reviewCount}개 리뷰)</span>
                      <span className="text-[#d6c3ba]">·</span>
                      <span className="text-[#83746c]">{product.category}</span>
                    </div>

                    <h3 className="text-sm font-semibold text-[#3e1c06] line-clamp-2 leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#51443d] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Bojagi Packaging Selector */}
                    <div className="pt-2">
                      <label
                        htmlFor={`bojagi-select-${product.id}`}
                        className="block text-[11px] font-medium text-[#3e1c06] mb-1"
                      >
                        보자기 포장 선택
                      </label>
                      <select
                        id={`bojagi-select-${product.id}`}
                        value={currentPackagingId}
                        onChange={(e) => handlePackagingChange(product.id, e.target.value)}
                        className="w-full min-h-11 lg:min-h-0 bg-[#FAF7F2] border border-[#d6c3ba]/60 rounded px-2.5 py-2.5 lg:py-1.5 text-xs text-[#1c1c19] focus:outline-none focus:border-[#583119] transition-colors"
                      >
                        {product.packagingOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Price & Action Cluster */}
                <div className="p-4 pt-0">
                  <div className="flex items-baseline justify-between py-2 border-t border-[#d6c3ba]/40">
                    <span className="text-base font-bold text-[#3e1c06]">
                      ₩{displayPrice.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-[#83746c] font-medium">
                      {product.shippingText}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {/* 예전에는 실존 서비스(카카오톡 선물하기) 상호와 그 브랜드 노란색이 그대로 박혀 있었다 —
                        제휴가 없는 가상 브랜드라 자체 기능 표기 「선물 링크」로 바꿨다. */}
                    <button
                      type="button"
                      onClick={() => onGiftLink(product, currentPackagingId)}
                      className="w-full min-h-11 py-2.5 bg-[#C84B31] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 hover:bg-[#a83b23] transition-colors shadow-xs"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      선물 링크
                    </button>

                    <button
                      type="button"
                      onClick={() => onOrderProduct(product, currentPackagingId)}
                      className="w-full min-h-11 py-2.5 bg-[#583119] text-white text-xs font-medium rounded hover:bg-[#422310] transition-colors shadow-xs"
                    >
                      장바구니 담기
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
