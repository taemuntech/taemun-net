"use client";

import React from 'react';
import { CATEGORIES, PRODUCTS } from '../data/antiqueData';

interface CuratedCategoriesProps {
  onSelectCategory: (categoryKey: string) => void;
}

// 카드에 적히던 「42 Specimens」류는 실제 목록(총 9점)과 맞지 않는 재고 수치였다.
// 필터를 눌렀을 때 실제로 나오는 개수를 그대로 센다 — 카드의 숫자와 아래 목록이 어긋나지 않게.
// 세는 대상은 PRODUCTS 뿐이다 — 대표작(FEATURED_SPECIMEN)은 위 큐레이션 구역에만 있고
// 입고 목록 필터에는 안 잡히므로, 같이 세면 카드 숫자가 필터 결과보다 한 점 많아진다.
const countFor = (filterKey: string) =>
  PRODUCTS.filter((item) => item.category === filterKey).length;

export const CuratedCategories: React.FC<CuratedCategoriesProps> = ({
  onSelectCategory,
}) => {
  return (
    <section
      id="furniture"
      className="py-16 lg:py-20 bg-[#fbf2ed] border-b border-[#d6c2c2] scroll-mt-[calc(var(--sample-bar-h,0px)_+_88px)]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12">
          <div>
            <span className="text-[10px] text-[#735b24] uppercase tracking-[0.2em] font-bold">
              Catalog Division
            </span>
            <h2 className="font-serif text-[28px] lg:text-[36px] text-[#300a10] mt-1">
              헤리티지 아카이브 카테고리
              <span className="ml-3 inline-block border border-[#735b24]/60 px-2 py-0.5 align-middle text-[10px] font-sans font-bold uppercase tracking-wider text-[#735b24]">
                예시 데이터
              </span>
            </h2>
          </div>
          <p className="font-serif text-[15px] text-[#514344] max-w-md mt-3 lg:mt-0 leading-relaxed">
            유럽 전역의 유서 깊은 살롱과 마노아(Manoir)에서 공수된 4대 핵심 큐레이션 라인업입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              id={`cat-card-${cat.id}`}
              className="group relative bg-[#fff8f5] p-4 rag-border hover:border-[#735b24] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <button
                  type="button"
                  aria-label={`${cat.title} 컬렉션 열람`}
                  onClick={() => onSelectCategory(cat.filterKey)}
                  className="block w-full aspect-[3/4] overflow-hidden bg-[#f5ece7] mb-4 relative cursor-pointer"
                >
                  <img
                    alt={cat.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={cat.image}
                  />
                  <span className="absolute inset-0 block bg-gradient-to-t from-[#300a10]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none"></span>
                  <span className="absolute bottom-3 left-3 text-[#fff8f5] text-[10px] tracking-widest uppercase font-semibold">
                    {countFor(cat.filterKey)} Specimens
                  </span>
                </button>

                <h3 className="font-serif text-[19px] text-[#300a10] group-hover:text-[#735b24] transition-colors">
                  {cat.title}
                </h3>
                <p className="font-serif text-[#514344] text-[13px] mt-1 italic">
                  {cat.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectCategory(cat.filterKey)}
                className="mt-3 inline-flex min-h-11 items-center text-[11px] uppercase tracking-wider text-[#735b24] group-hover:text-[#300a10] font-bold cursor-pointer"
              >
                컬렉션 열람{' '}
                <span className="material-symbols-outlined text-[16px] ml-1 transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
