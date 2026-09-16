import React from 'react';
import { HardwareProduct } from '../types';

interface ProductBentoRackProps {
  products: HardwareProduct[];
  comparedIds: string[];
  onToggleCompare: (id: string) => void;
  onAddToCart: (product: HardwareProduct) => void;
  onViewProduct: (product: HardwareProduct) => void;
}

export const ProductBentoRack: React.FC<ProductBentoRackProps> = ({
  products,
  comparedIds,
  onToggleCompare,
  onAddToCart,
  onViewProduct,
}) => {
  return (
    <section id="curated-hardware-rack" className="flex flex-col gap-3">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#424754] pb-2">
        <div>
          <span className="text-[#ec6a06] font-label text-xs font-bold block uppercase tracking-widest">
            ENGINEERED HARDWARE LINEUP
          </span>
          <h2 className="text-lg lg:text-xl font-headline font-bold text-[#dfe2ee]">
            테크노바 정밀 큐레이션 하이테크 기어
          </h2>
        </div>
        <button
          onClick={() => alert('전체 2,840건의 엔지니어링 카탈로그 필터링 준비 완료')}
          className="text-xs font-label text-[#4cd7f6] hover:underline flex items-center gap-1 cursor-pointer"
        >
          전체 하드웨어 카탈로그 보기 (2,840건){' '}
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* 4-Column Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product) => {
          const isCompared = comparedIds.includes(product.id);

          return (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="bg-[#181c24] border border-[#424754] rounded-lg flex flex-col justify-between overflow-hidden hover:border-[#4cd7f6] transition-all spec-hairline group shadow-md"
            >
              <div className="p-4 pb-0">
                {/* Header Badges */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-1.5 py-0.5 rounded font-label text-[10px] font-bold border ${ product.tagColor === 'primary' ? 'bg-[#4d8eff]/20 text-[#adc6ff] border-[#adc6ff]/40' : product.tagColor === 'tertiary' ? 'bg-[#ec6a06]/20 text-[#ffb690] border-[#ffb690]/40' : 'bg-[#03b5d3]/15 text-[#4cd7f6] border-[#4cd7f6]/40' }`}
                  >
                    {product.tag}
                  </span>

                  <label className="flex items-center gap-1 text-[11px] text-[#8c909f] cursor-pointer hover:text-[#dfe2ee]">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => onToggleCompare(product.id)}
                      className="rounded-xs bg-[#1c2028] border-[#424754] text-[#4cd7f6] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                    />
                    비교
                  </label>
                </div>

                {/* Product Visual */}
                <div
                  onClick={() => onViewProduct(product)}
                  className="h-44 bg-[#0a0e16] rounded border border-[#424754]/60 flex items-center justify-center p-2 relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-radial from-[#4cd7f6]/10 to-transparent pointer-events-none"></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-2 font-label text-[10px] text-[#8c909f]">
                    SKU #{product.sku}
                  </span>
                </div>

                {/* Spec Data Stack */}
                <div className="mt-3">
                  <span
                    className={`text-[11px] font-label block uppercase font-semibold ${ product.tagColor === 'primary' ? 'text-[#adc6ff]' : product.tagColor === 'tertiary' ? 'text-[#ffb690]' : 'text-[#4cd7f6]' }`}
                  >
                    {product.categoryName}
                  </span>
                  <h3
                    onClick={() => onViewProduct(product)}
                    className="text-sm font-headline font-bold text-[#dfe2ee] line-clamp-1 mt-0.5 group-hover:text-[#adc6ff] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-[#8c909f] mt-1 line-clamp-1">{product.subtitle}</p>

                  {/* Micro Specs Chips */}
                  <div className="flex flex-wrap gap-1 mt-2 text-[10px] font-label">
                    {product.chips.map((chip, idx) => {
                      const isHighlight = chip === '당일출고' || chip === '무결점 보증' || chip === '블루투스 5.3' || chip === 'AI 노이즈캔슬';
                      return (
                        <span
                          key={idx}
                          className={`px-1.5 py-0.5 rounded border ${ isHighlight ? 'bg-[#1c2028] text-[#4cd7f6] border-[#4cd7f6]/40 font-bold' : 'bg-[#1c2028] text-[#c2c6d6] border-[#424754]/60' }`}
                        >
                          {chip}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Price & Buy Action */}
              <div className="p-4 border-t border-[#424754]/70 mt-3 bg-[#1c2028]/50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[#ec6a06] text-xs font-bold mr-1 font-label">
                      {product.discountRate}%
                    </span>
                    <span className="text-[#8c909f] text-[11px] line-through">
                      ₩{product.originalPrice.toLocaleString()}
                    </span>
                    <div className="text-sm font-headline font-bold text-[#dfe2ee]">
                      ₩{product.discountPrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center text-[#4cd7f6] text-xs font-label">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-bold ml-0.5">{product.rating.toFixed(1)}</span>
                    <span className="text-[#8c909f] text-[10px] ml-0.5">({product.reviewCount})</span>
                  </div>
                </div>

                <button
                  id={`btn-add-cart-${product.id}`}
                  onClick={() => onAddToCart(product)}
                  className="w-full py-2 bg-[#31353e] hover:bg-[#ec6a06] hover:text-[#4a1c00] text-[#dfe2ee] rounded font-label text-xs font-bold border border-[#424754] transition-all flex items-center justify-center gap-1 active:scale-[0.98] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_cart</span> 장바구니 담기
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
