import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Sparkles, Flame } from 'lucide-react';
import { Product } from '../types';

interface RankingAwardsProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const RankingAwards: React.FC<RankingAwardsProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState('실시간 통합 1위~10위');

  const tabs = ['실시간 통합 1위~10위', '스킨/앰플', '수분크림', '선케어', '마스크팩'];

  // Filter products by ranking tab if selected
  const displayedProducts = products.filter((prod) => {
    if (activeTab === '실시간 통합 1위~10위') return true;
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
              <span className="text-xs text-[#6d7a72] font-medium">10분 간격 집계 기준</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#141b2b] mt-1 tracking-tight">
              루미너스 랩 실시간 랭킹 AWARDS
            </h2>
          </div>

          {/* Interactive Ranking Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${ isActive ? 'bg-[#141b2b] text-white shadow-sm' : 'bg-[#e9edff] text-[#3d4a42] hover:text-[#141b2b]' }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

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
                    aria-label="관심상품 등록"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center transition-all z-10 cursor-pointer shadow-xs hover:scale-110 active:scale-95"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${ isWished ? 'fill-[#ae2f34] text-[#ae2f34]' : 'text-[#6d7a72] hover:text-[#ae2f34]' }`}
                    />
                  </button>

                  {/* Hydration / Efficacy Meter Bar */}
                  {product.clinicalHighlight && (
                    <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md px-3 py-1.5 border-t border-[#bccac0]/30 flex items-center justify-between text-[11px]">
                      <span className="text-[#3d4a42] font-medium">
                        {product.clinicalHighlight.label}
                      </span>
                      <div className="w-24 h-2 bg-[#e1e8fd] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#006948] rounded-full transition-all duration-700"
                          style={{ width: `${product.clinicalHighlight.percent}%` }}
                        />
                      </div>
                      <span className="font-bold text-[#006948]">
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
                    <div className="flex items-baseline gap-2">
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
                    className="w-full h-10 rounded-full bg-[#e9edff] hover:bg-[#006948] hover:text-white text-[#141b2b] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
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
