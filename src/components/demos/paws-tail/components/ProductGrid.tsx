import React, { useState } from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  /** 전체 상품 수 — 「4종 중 2종」처럼 필터가 실제로 줄였다는 걸 보여 준다 */
  totalCount: number;
  isFilterActive: boolean;
  onResetFilters: () => void;
  onAddToCart: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  totalCount,
  isFilterActive,
  onResetFilters,
  onAddToCart,
  favorites,
  onToggleFavorite,
}) => {
  const [sortOrder, setSortOrder] = useState<'popular' | 'reviews' | 'allergy'>('popular');

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'reviews') return b.reviewCount - a.reviewCount;
    if (sortOrder === 'allergy') return (b.allergySafe ? 1 : 0) - (a.allergySafe ? 1 : 0);
    return b.rating - a.rating;
  });

  return (
    <section id="products" className="py-12 lg:py-20 bg-[#eff4ff] border-y border-[#bfc9c1]/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[#0f5238] text-xs font-bold mb-1">
              <span className="material-symbols-outlined text-base">award_star</span>
              <span>AAFCO &amp; FEDIAF 급여기준 참고 (예시 표기)</span>
              {/* 별점·리뷰 수는 지어낸 값이다 — 구역 머리에 한 번만 밝혀 둔다 */}
              <span className="rounded-full bg-[#ffdcbb] px-2 py-0.5 text-[10px] font-bold text-[#2b1700]">
                별점·리뷰 수는 예시
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#121c2a] tracking-tight">
              임상 검증 시그니처 처방식 &amp; 기능성 식단
            </h2>
            <p className="text-sm text-[#404943] mt-1">
              전문 수의사와 반려동물 영양학 박사 연구진이 개발한 원육 65% 이상의 신선 포뮬러
            </p>
            <p className="text-xs text-[#0f5238] font-semibold mt-2">
              {isFilterActive
                ? `필터 적용 — 전체 ${totalCount}종 중 ${products.length}종`
                : `전체 ${totalCount}종`}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSortOrder('popular')}
              className={`px-3.5 py-1.5 max-lg:min-h-11 inline-flex items-center rounded-full text-xs font-bold transition-colors ${
                sortOrder === 'popular'
                  ? 'bg-white border border-[#0f5238] text-[#0f5238] shadow-sm'
                  : 'bg-white border border-[#bfc9c1] text-[#404943] hover:border-[#0f5238]'
              }`}
            >
              인기순
            </button>
            <button
              onClick={() => setSortOrder('reviews')}
              className={`px-3.5 py-1.5 max-lg:min-h-11 inline-flex items-center rounded-full text-xs font-bold transition-colors ${
                sortOrder === 'reviews'
                  ? 'bg-white border border-[#0f5238] text-[#0f5238] shadow-sm'
                  : 'bg-white border border-[#bfc9c1] text-[#404943] hover:border-[#0f5238]'
              }`}
            >
              리뷰많은순
            </button>
            <button
              onClick={() => setSortOrder('allergy')}
              className={`px-3.5 py-1.5 max-lg:min-h-11 inline-flex items-center rounded-full text-xs font-bold transition-colors ${
                sortOrder === 'allergy'
                  ? 'bg-white border border-[#0f5238] text-[#0f5238] shadow-sm'
                  : 'bg-white border border-[#bfc9c1] text-[#404943] hover:border-[#0f5238]'
              }`}
            >
              알러지케어순
            </button>
          </div>
        </div>

        {sortedProducts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#bfc9c1] bg-white p-10 text-center">
            <span className="material-symbols-outlined text-4xl text-[#bfc9c1]">search_off</span>
            <p className="mt-2 text-sm font-bold text-[#121c2a]">
              조건에 맞는 상품이 없습니다
            </p>
            <p className="mt-1 text-xs text-[#404943]">
              선택한 카테고리·생애주기·임상 기능 조합에 해당하는 식단이 이 샘플에는 없습니다.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-4 min-h-11 rounded-full bg-[#0f5238] px-6 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#2d6a4f]"
            >
              필터 초기화하고 전체 보기
            </button>
          </div>
        )}

        {/* 4-Card Responsive Grid — 태블릿(768)은 2열, lg 이상 4열 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((prod) => {
            const isFav = favorites.includes(prod.id);

            // Badge styling
            let primaryBadgeBg = 'bg-[#0f5238] text-white';
            let secondaryBadgeBg = 'bg-[#fdbd77] text-[#784a0d]';

            if (prod.badgeType === 'barf') {
              primaryBadgeBg = 'bg-[#835418] text-white';
              secondaryBadgeBg = 'bg-[#b1f0ce] text-[#0f5238]';
            } else if (prod.badgeType === 'cat') {
              primaryBadgeBg = 'bg-[#934c00] text-white';
              secondaryBadgeBg = 'bg-[#d9e3f6] text-[#0f5238]';
            } else if (prod.badgeType === 'supplement') {
              primaryBadgeBg = 'bg-[#95d4b3] text-[#0f5238]';
              secondaryBadgeBg = 'bg-[#ffdcbb] text-[#2b1700]';
            }

            return (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-[#bfc9c1]/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-[#e6eeff] overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={prod.image}
                      alt={prod.name}
                     referrerPolicy="no-referrer"/>
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold shadow-sm ${primaryBadgeBg}`}
                      >
                        {prod.badge}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${secondaryBadgeBg}`}
                      >
                        {prod.subBadge}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(prod.id);
                      }}
                      className={`absolute top-3 right-3 w-11 h-11 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
                        isFav
                          ? 'bg-white text-[#ba1a1a] shadow'
                          : 'bg-white/80 text-[#404943] hover:text-[#ba1a1a]'
                      }`}
                      title={isFav ? '찜 해제' : '찜하기'}
                    >
                      <span
                        className={`material-symbols-outlined text-lg ${
                          isFav ? "font-variation-settings-'FILL'-1" : ''
                        }`}
                        style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>

                    <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-0.5 rounded text-[11px] text-[#121c2a] font-semibold border border-[#bfc9c1]/70">
                      {prod.kibbleBadge}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1 text-[#835418] text-xs mb-1">
                      <span className="material-symbols-outlined text-sm font-bold">star</span>
                      <strong className="font-bold">{prod.rating}</strong>
                      <span className="text-[#404943]">({prod.reviewCount.toLocaleString()}개 리뷰)</span>
                    </div>

                    <h3 className="text-base font-bold text-[#121c2a] group-hover:text-[#0f5238] transition-colors line-clamp-2 min-h-[44px]">
                      {prod.name}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                      {prod.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] bg-[#e6eeff] px-2 py-0.5 rounded text-[#404943]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#bfc9c1]/50">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-[#ba1a1a]">
                          {prod.discountRate}%
                        </span>
                        <span className="text-lg font-bold text-[#121c2a]">
                          ₩{prod.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-[#707973] line-through">
                          ₩{prod.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#404943] mt-0.5 truncate">{prod.unitPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onAddToCart(prod)}
                    className="w-full py-3 min-h-11 rounded-xl bg-[#0f5238] text-white text-xs font-bold hover:bg-[#2d6a4f] transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <span className="material-symbols-outlined text-base">shopping_cart</span>
                    <span>빠른 장바구니 담기</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
