import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, selectedColor: string) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onOpenProductDetail
}) => {
  // Track selected color per product
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    sofa: '바닐라 크림',
    'dining-table': '화이트 오크',
    table: '로마노 트래버틴',
    lamp: '새틴 솔리드 브라스'
  });

  const handleColorSelect = (e: React.MouseEvent, productId: string, colorName: string) => {
    e.stopPropagation();
    setSelectedColors((prev) => ({ ...prev, [productId]: colorName }));
  };

  return (
    <section id="furniture" className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
        <div>
          <span className="text-[11px] font-semibold text-[#944931] uppercase tracking-widest">
            Masterpiece Collection
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl text-[#100e0d] font-light mt-1 tracking-tight">
            공간의 밀도를 완성하는 마스터피스
          </h2>
        </div>
        <p className="text-xs text-[#4d4542] mt-2 lg:mt-0 max-w-md leading-relaxed">
          미니멀한 조형미와 지속 가능한 자연 소재의 촉각적 교감. 전문 기사 2인 1조 무료 지정일
          배송으로 완성되는 안전한 배송 경험을 선사합니다.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-[#f6ece5] rounded-2xl border border-[#d0c4c0]/50">
          <p className="text-sm font-medium text-[#100e0d]">선택한 조건에 해당하는 가구가 없습니다.</p>
          <p className="text-xs text-[#7f7571] mt-1">카테고리 또는 소재 필터를 초기화해 보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const isWished = wishlistIds.includes(product.id);
            const currentColor = selectedColors[product.id] || product.colors[0]?.name || '';

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#fff8f4] rounded-xl overflow-hidden border border-[#d0c4c0]/50 hover:border-[#7f7571] hover:shadow-lg transition-all duration-300"
              >
                {/* Visual Image Plate */}
                <div
                  className="relative aspect-[4/5] bg-[#f6ece5] overflow-hidden cursor-pointer"
                  onClick={() => onOpenProductDetail(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 backdrop-blur-sm text-[10px] font-medium tracking-wide rounded-xs ${
                          badge.type === 'dark'
                            ? 'bg-[#100e0d]/85 text-[#fff8f4]'
                            : badge.type === 'terracotta'
                            ? 'bg-[#944931]/90 text-[#fff8f4]'
                            : 'bg-[#f0e7df]/90 text-[#100e0d]'
                        }`}
                      >
                        {badge.text}
                      </span>
                    ))}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#fff8f4]/85 backdrop-blur-sm flex items-center justify-center text-[#100e0d] hover:text-[#944931] hover:bg-[#fff8f4] transition-all shadow-xs z-10 active:scale-90"
                    aria-label="Wishlist Toggle"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWished ? 'fill-[#944931] text-[#944931]' : ''
                      }`}
                    />
                  </button>

                  {/* Bottom Spec Badge Bar */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#fff8f4]/90 backdrop-blur-sm py-1.5 px-3 rounded-lg flex items-center justify-between text-[11px] text-[#4d4542] border border-[#d0c4c0]/30">
                    <span>치수: {product.dimensions}</span>
                    <span className="font-semibold text-[#100e0d]">{product.highlight}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                  <div>
                    {/* Swatches */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      {product.colors.map((color) => {
                        const active = currentColor === color.name;
                        return (
                          <button
                            key={color.name}
                            onClick={(e) => handleColorSelect(e, product.id, color.name)}
                            title={color.name}
                            className={`w-4 h-4 rounded-full border transition-all ${
                              active
                                ? 'ring-2 ring-[#100e0d] ring-offset-1 scale-110'
                                : 'border-[#d0c4c0] hover:scale-105'
                            }`}
                            style={{ backgroundColor: color.hex }}
                          />
                        );
                      })}
                      <span className="text-[11px] text-[#7f7571] ml-1">
                        {product.colors.length}옵션 ({currentColor})
                      </span>
                    </div>

                    <h3
                      onClick={() => onOpenProductDetail(product)}
                      className="font-sans text-sm font-semibold text-[#100e0d] group-hover:text-[#944931] transition-colors cursor-pointer leading-snug"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#7f7571] mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#d0c4c0]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#944931] font-semibold block">
                        {product.deliveryBadge}
                      </span>
                      <p className="text-sm font-bold text-[#100e0d] mt-0.5">
                        {product.formattedPrice}
                      </p>
                    </div>
                    <button
                      onClick={() => onAddToCart(product, currentColor)}
                      className="px-3.5 py-2 bg-[#262322] text-[#fff8f4] hover:bg-[#100e0d] rounded-lg text-xs font-semibold tracking-wide transition-all active:scale-95 shadow-2xs"
                    >
                      담기
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
