import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, SearchX, Flame, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface RankingAwardsProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  /** 위쪽 필터가 하나라도 걸려 있는가 — 결과가 0건일 때 안내 문구를 가른다 */
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

// 탭은 예시 상품이 실제로 존재하는 분류만 둔다 — 눌러도 목록이 그대로인 「죽은 탭」을 만들지 않는다.
const TABS = ['실시간 통합 베스트', '스킨/앰플', '수분크림', '선케어'] as const;

export const RankingAwards: React.FC<RankingAwardsProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  hasActiveFilters,
  onResetFilters,
}) => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);

  // Filter products by ranking tab if selected
  const displayedProducts = products.filter((prod) => {
    if (activeTab === '실시간 통합 베스트') return true;
    if (activeTab === '스킨/앰플') return prod.category.includes('앰플') || prod.category.includes('스킨');
    if (activeTab === '수분크림') return prod.category.includes('크림');
    if (activeTab === '선케어') return prod.category.includes('선케어');
    return true;
  });

  const getRankBadgeColor = (rank?: number) => {
    if (rank === 1) return 'bg-[#EAB308] text-white'; // Gold
    if (rank === 2) return 'bg-[#94A3B8] text-white'; // Silver
    if (rank === 3) return 'bg-[#B45309] text-white'; // Bronze
    return 'bg-[#475569] text-white';
  };

  return (
    <section id="ranking-section" className="py-12 bg-[#f9f9ff]">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 space-y-6">
        {/* Header with Live Ranking Timer */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 border-b border-[#bccac0]/30 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#ae2f34] text-white text-[11px] font-bold shadow-xs">
                <Flame className="w-3 h-3 fill-white" />
                실시간 HOT
              </span>
              <span className="text-xs text-[#6d7a72] font-medium">10분 간격 집계 화면 (예시 데이터)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#141b2b] mt-1 tracking-tight">
              루미너스 랩 실시간 랭킹 AWARDS
            </h2>
          </div>

          {/* Interactive Ranking Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={isActive}
                  className={`px-4 min-h-11 lg:min-h-0 lg:py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${ isActive ? 'bg-[#141b2b] text-white shadow-sm' : 'bg-[#e9edff] text-[#3d4a42] hover:text-[#141b2b]' }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* 조건에 맞는 예시 상품이 없을 때 — 목록을 몰래 되돌리지 않고 0건을 그대로 보여 준다 */}
        {displayedProducts.length === 0 && (
          <div className="py-14 flex flex-col items-center justify-center text-center gap-3 rounded-2xl border border-dashed border-[#bccac0]/60 bg-white/70">
            <SearchX className="w-10 h-10 text-[#bccac0]" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-[#141b2b]">조건에 맞는 상품이 없습니다.</p>
              <p className="text-xs text-[#6d7a72] px-6 leading-relaxed">
                {hasActiveFilters
                  ? '위의 더마 필터 또는 랭킹 탭 조건을 줄이면 다시 목록이 나타납니다. (샘플이라 예시 상품 4종만 들어 있습니다)'
                  : '이 랭킹 탭에는 예시 상품이 없습니다. 다른 탭을 눌러 보세요.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab(TABS[0])}
                className="px-4 min-h-11 rounded-full bg-[#e9edff] text-[#141b2b] text-xs font-bold cursor-pointer hover:bg-[#dfe6ff] transition-colors"
              >
                통합 베스트 보기
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="px-4 min-h-11 rounded-full bg-[#006948] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer hover:bg-[#00855d] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  필터 초기화
                </button>
              )}
            </div>
          </div>
        )}

        {/* 4 Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => {
            const isWished = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group relative dew-glass-tier1 rounded-2xl overflow-hidden flex flex-col justify-between border border-[#bccac0]/40 hover:shadow-xl transition-all duration-300 bg-white"
              >
                {/* Top Badges & Media Container (3:4 ratio) */}
                <div className="relative w-full aspect-[3/4] bg-[#f1f3ff] overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer" />

                  {/* Rank Ribbon */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span
                      className={`w-8 h-8 rounded-full font-bold flex items-center justify-center shadow-md text-sm ${getRankBadgeColor( product.rank )}`}
                    >
                      {product.rank}
                    </span>
                    {product.rankBadge && (
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                        {product.rankBadge}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Toggle */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    aria-label={`${product.name} ${isWished ? '관심상품 해제' : '관심상품 등록'}`}
                    aria-pressed={isWished}
                    className="absolute top-3 right-3 w-11 h-11 lg:w-9 lg:h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center transition-all z-10 cursor-pointer shadow-xs hover:scale-110 active:scale-95"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${ isWished ? 'fill-[#ae2f34] text-[#ae2f34]' : 'text-[#6d7a72] hover:text-[#ae2f34]' }`}
                    />
                  </button>

                  {/* Hydration / Efficacy Meter Bar */}
                  {product.clinicalHighlight && (
                    <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md px-3 py-1.5 border-t border-[#bccac0]/30 flex items-center justify-between text-[11px]">
                      <span className="text-[#3d4a42] font-medium truncate">
                        {product.clinicalHighlight.label}
                      </span>
                      <div className="flex-1 mx-2 max-w-24 h-2 bg-[#e1e8fd] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#006948] rounded-full transition-all duration-700"
                          style={{ width: `${product.clinicalHighlight.percent}%` }}
                        />
                      </div>
                      <span className="font-bold text-[#006948] shrink-0">
                        {product.clinicalHighlight.value}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1 text-[10px] font-bold text-[#006948] mb-1">
                      {product.badges.map((badge, bIdx) => (
                        <span key={bIdx} className="px-1.5 py-0.5 rounded bg-[#006948]/10">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-sm font-bold text-[#141b2b] line-clamp-2 leading-snug group-hover:text-[#006948] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[12px] text-[#3d4a42]">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="font-bold text-[#141b2b]">{product.rating}</span>
                      <span className="text-[#6d7a72]">
                        ({product.reviewCount.toLocaleString()}개 리뷰)
                      </span>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-lg font-extrabold text-[#ae2f34]">
                        {product.discountRate}%
                      </span>
                      <span className="text-lg font-extrabold text-[#141b2b]">
                        ₩{product.price.toLocaleString()}
                      </span>
                      <span className="text-xs line-through text-[#6d7a72]">
                        ₩{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Quick Cart Button */}
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full h-11 rounded-full bg-[#e9edff] hover:bg-[#006948] hover:text-white text-[#141b2b] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    장바구니 담기
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
