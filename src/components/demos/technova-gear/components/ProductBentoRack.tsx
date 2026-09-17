'use client';

import React from 'react';
import { HardwareProduct } from '../types';

interface ProductBentoRackProps {
  products: HardwareProduct[];
  totalCount: number;
  /** 지금 걸려 있는 분류 이름 (없으면 null) */
  categoryLabel: string | null;
  searchQuery: string;
  onResetBrowse: () => void;
  comparedIds: string[];
  onToggleCompare: (id: string) => void;
  onAddToCart: (product: HardwareProduct) => void;
  onViewProduct: (product: HardwareProduct) => void;
}

// 강조 칩 — 데이터의 칩 이름을 바꾸면 여기도 같이 바꿔야 한다(이름이 안 맞으면 조용히 강조가 사라진다).
const HIGHLIGHT_CHIPS = new Set(['당일출고', '10bit 컬러', '블루투스 5.3', 'ANC 노이즈캔슬']);

export const ProductBentoRack: React.FC<ProductBentoRackProps> = ({
  products,
  totalCount,
  categoryLabel,
  searchQuery,
  onResetBrowse,
  comparedIds,
  onToggleCompare,
  onAddToCart,
  onViewProduct,
}) => {
  const query = searchQuery.trim();
  const isFiltered = Boolean(categoryLabel) || query.length > 0;

  return (
    <section id="curated-hardware-rack" className="flex flex-col gap-3">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[#424754] pb-2">
        <div>
          <span className="text-[#ec6a06] font-label text-xs font-bold block uppercase tracking-widest">
            ENGINEERED HARDWARE LINEUP
          </span>
          <h2 className="text-lg lg:text-xl font-headline font-bold text-[#dfe2ee]">
            테크노바 정밀 큐레이션 하이테크 기어
          </h2>
        </div>
        {/* 예전에는 「전체 카탈로그 보기 (2,840건)」 버튼이 alert 한 줄만 띄웠다 — 없는 수치를 지우고 실제로 보이는 개수를 적는다. */}
        <div className="text-right">
          <span className="block text-xs font-label text-[#4cd7f6]">
            {products.length}종 표시 중 {products.length !== totalCount ? `/ 전체 ${totalCount}종` : ''}
          </span>
          <span className="block text-[11px] text-[#8c909f]">별점·후기 수는 예시 표기입니다</span>
        </div>
      </div>

      {/* 지금 걸린 조건 — 무엇 때문에 목록이 줄었는지 보이지 않으면 필터가 죽은 것처럼 읽힌다 */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-label">
          {categoryLabel && (
            <span className="px-2 py-1 rounded bg-[#1c2028] border border-[#424754] text-[#c2c6d6]">
              분류: {categoryLabel}
            </span>
          )}
          {query && (
            <span className="px-2 py-1 rounded bg-[#1c2028] border border-[#424754] text-[#c2c6d6]">
              검색어: {query}
            </span>
          )}
          <button
            type="button"
            onClick={onResetBrowse}
            className="min-h-11 px-3 rounded border border-[#424754] text-[#8c909f] hover:text-[#ec6a06] hover:border-[#ec6a06] transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">close</span> 조건 지우기
          </button>
        </div>
      )}

      {products.length === 0 ? (
        <div className="bg-[#181c24] border border-[#424754] rounded-lg p-8 text-center spec-hairline">
          <span className="material-symbols-outlined text-4xl text-[#424754] block mb-2">search_off</span>
          <p className="text-sm text-[#dfe2ee] font-bold">조건에 맞는 예시 상품이 없습니다.</p>
          <p className="text-xs text-[#8c909f] mt-1">
            이 샘플에는 {totalCount}종만 등록해 두었습니다. 조건을 지우면 전체 목록이 다시 나옵니다.
          </p>
          <button
            type="button"
            onClick={onResetBrowse}
            className="mt-4 min-h-11 px-5 rounded bg-[#262a33] hover:bg-[#31353e] text-[#4cd7f6] border border-[#4cd7f6] font-label text-xs font-bold transition-colors cursor-pointer"
          >
            전체 목록 보기
          </button>
        </div>
      ) : (
        /* 2-Column (모바일·태블릿) / 4-Column (데스크톱) Responsive Grid */
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
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-2">
                    <span
                      className={`px-1.5 py-0.5 rounded font-label text-[10px] font-bold border ${ product.tagColor === 'primary' ? 'bg-[#4d8eff]/20 text-[#adc6ff] border-[#adc6ff]/40' : product.tagColor === 'tertiary' ? 'bg-[#ec6a06]/20 text-[#ffb690] border-[#ffb690]/40' : 'bg-[#03b5d3]/15 text-[#4cd7f6] border-[#4cd7f6]/40' }`}
                    >
                      {product.tag}
                    </span>

                    {/* 체크박스 자체는 14px 이라 손가락으로 못 누른다 — 누르는 것은 44px 버튼으로 둔다 */}
                    <button
                      type="button"
                      onClick={() => onToggleCompare(product.id)}
                      aria-pressed={isCompared}
                      className={`min-h-11 -my-2 flex items-center gap-1 text-[11px] transition-colors cursor-pointer ${ isCompared ? 'text-[#4cd7f6] font-bold' : 'text-[#8c909f] hover:text-[#dfe2ee]' }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isCompared ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                      비교
                    </button>
                  </div>

                  {/* Product Visual */}
                  <button
                    type="button"
                    onClick={() => onViewProduct(product)}
                    aria-label={`${product.name} 상세 데이터시트 열기`}
                    className="w-full h-44 bg-[#0a0e16] rounded border border-[#424754]/60 flex items-center justify-center p-2 relative overflow-hidden cursor-pointer"
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
                  </button>

                  {/* Spec Data Stack */}
                  <div className="mt-3">
                    <span
                      className={`text-[11px] font-label block uppercase font-semibold ${ product.tagColor === 'primary' ? 'text-[#adc6ff]' : product.tagColor === 'tertiary' ? 'text-[#ffb690]' : 'text-[#4cd7f6]' }`}
                    >
                      {product.categoryName}
                    </span>
                    <h3 className="mt-0.5">
                      <button
                        type="button"
                        onClick={() => onViewProduct(product)}
                        className="text-left text-sm font-headline font-bold text-[#dfe2ee] line-clamp-2 min-h-11 group-hover:text-[#adc6ff] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </button>
                    </h3>
                    <p className="text-[11px] text-[#8c909f] mt-1 line-clamp-2">{product.subtitle}</p>

                    {/* Micro Specs Chips */}
                    <div className="flex flex-wrap gap-1 mt-2 text-[10px] font-label">
                      {product.chips.map((chip) => (
                        <span
                          key={chip}
                          className={`px-1.5 py-0.5 rounded border ${ HIGHLIGHT_CHIPS.has(chip) ? 'bg-[#1c2028] text-[#4cd7f6] border-[#4cd7f6]/40 font-bold' : 'bg-[#1c2028] text-[#c2c6d6] border-[#424754]/60' }`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Price & Buy Action */}
                <div className="p-4 border-t border-[#424754]/70 mt-3 bg-[#1c2028]/50">
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-2">
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
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="w-full min-h-11 bg-[#31353e] hover:bg-[#ec6a06] hover:text-[#4a1c00] text-[#dfe2ee] rounded font-label text-xs font-bold border border-[#424754] transition-all flex items-center justify-center gap-1 active:scale-[0.98] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_cart</span> 장바구니 담기
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
