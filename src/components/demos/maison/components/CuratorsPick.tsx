"use client";

import React from 'react';
import { FEATURED_SPECIMEN } from '../data/antiqueData';
import { Product } from '../types';

interface CuratorsPickProps {
  onSelectProduct: (product: Product) => void;
  onInquire: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const CuratorsPick: React.FC<CuratorsPickProps> = ({
  onSelectProduct,
  onInquire,
  onToggleWishlist,
  isWishlisted,
}) => {
  return (
    <section
      id="curation"
      className="py-16 lg:py-20 bg-[#fff8f5] border-b border-[#d6c2c2] scroll-mt-[calc(var(--sample-bar-h,0px)_+_88px)]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        {/* Section Monograph Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
          <span className="text-[10px] text-[#735b24] uppercase tracking-[0.25em] font-bold">
            Specimen Curatorial Raisonné
          </span>
          <h2 className="font-serif text-[28px] lg:text-[36px] text-[#300a10] mt-2">
            이달의 대표 아카이브 셀렉션
            <span className="ml-3 inline-block border border-[#735b24]/60 px-2 py-0.5 align-middle text-[10px] font-sans font-bold uppercase tracking-wider text-[#735b24]">
              예시 데이터
            </span>
          </h2>
          <p className="font-serif text-[16px] text-[#514344] mt-2">
            300년의 세월을 간직한 프로방스 귀족 가문의 마스터피스, 프랑스 로코코 양식의 정수를 전시합니다.
          </p>
        </div>

        {/* Featured Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#f5ece7] p-6 lg:p-10 border border-[#d6c2c2]">
          {/* Featured Image (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div
              className="relative bg-[#fff8f5] p-3 rag-border overflow-hidden group cursor-pointer"
              onClick={() => onSelectProduct(FEATURED_SPECIMEN)}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#efe6e2] flex items-center justify-center">
                <img
                  id="curators-pick-image"
                  alt={FEATURED_SPECIMEN.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={FEATURED_SPECIMEN.image}
                />
              </div>
              <div className="absolute top-6 left-6 bg-[#4a1e23]/95 text-[#fff8f5] text-[11px] uppercase tracking-wider px-3 py-1 font-semibold">
                Curator's Masterpiece · One-of-a-Kind
              </div>
            </div>

            <div className="flex justify-between items-center text-[#514344] text-[11px] px-1 font-semibold">
              <span>CATALOG REF: {FEATURED_SPECIMEN.refCode}</span>
              <span className="text-[#735b24] italic">
                Exhibited at Salon Hannam Main Gallery
              </span>
            </div>
          </div>

          {/* Product Details Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[#735b24] text-[11px] uppercase tracking-widest font-bold">
                {FEATURED_SPECIMEN.period}
              </span>
              <h3
                className="font-serif text-[24px] lg:text-[28px] text-[#300a10] cursor-pointer hover:text-[#735b24] transition-colors"
                onClick={() => onSelectProduct(FEATURED_SPECIMEN)}
              >
                {FEATURED_SPECIMEN.name}
              </h3>
              <p className="text-[13px] text-[#514344] italic font-serif">
                {FEATURED_SPECIMEN.enName}
              </p>
            </div>

            {/* Specifications Matrix */}
            <div className="py-4 border-y border-[#d6c2c2]/70 space-y-3 font-serif text-[15px]">
              <div className="flex justify-between gap-4">
                <span className="text-[#514344] shrink-0">원산지 &amp; 시대</span>
                <span className="text-[#1e1b18] font-medium text-right">
                  {FEATURED_SPECIMEN.originEra}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#514344] shrink-0">주요 소재</span>
                <span className="text-[#1e1b18] font-medium text-right">
                  {FEATURED_SPECIMEN.materials}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#514344] shrink-0">상판 대리석</span>
                <span className="text-[#1e1b18] font-medium text-right">
                  {FEATURED_SPECIMEN.marble}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#514344] shrink-0">규격</span>
                <span className="text-[#1e1b18] font-medium text-right">
                  {FEATURED_SPECIMEN.dimensions}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#514344] shrink-0">복원 상태</span>
                <span className="text-[#735b24] font-semibold text-right">
                  {FEATURED_SPECIMEN.restorationStatus}
                </span>
              </div>
            </div>

            {/* Provenance Ledger Seal Box */}
            <div className="bg-[#fbf2ed] p-4 border border-[#d6c2c2] flex items-start space-x-3.5">
              <span className="material-symbols-outlined text-[#735b24] text-2xl mt-0.5 shrink-0">
                verified
              </span>
              <div className="text-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#735b24] font-bold block">
                  Archival Provenance Deed · 샘플 기록
                </span>
                <p className="font-serif text-[#514344] text-[13px] leading-relaxed">
                  {FEATURED_SPECIMEN.provenanceDeed}
                </p>
              </div>
            </div>

            {/* Price and CTAs */}
            <div className="pt-2 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase text-[#514344] block font-semibold">
                  Acquisition Value
                </span>
                <span className="font-serif text-[24px] lg:text-[28px] text-[#300a10] font-bold">
                  {FEATURED_SPECIMEN.formattedPrice}
                </span>
              </div>

              <div className="flex space-x-3 w-full lg:w-auto">
                <button
                  id="btn-curators-pick-inquire"
                  type="button"
                  onClick={() => onInquire(FEATURED_SPECIMEN)}
                  className="flex-1 lg:flex-initial inline-flex min-h-11 items-center justify-center bg-[#4a1e23] text-[#fff8f5] hover:bg-[#300a10] px-6 text-[12px] uppercase tracking-wider font-semibold transition-colors duration-200 cursor-pointer shadow-sm"
                >
                  작품 소장 문의
                </button>
                <button
                  id="btn-curators-pick-wishlist"
                  aria-label="Add to Wishlist"
                  type="button"
                  onClick={() => onToggleWishlist(FEATURED_SPECIMEN)}
                  className={`border border-[#1e1b18] min-h-11 min-w-11 transition-colors duration-200 cursor-pointer flex items-center justify-center ${
                    isWishlisted
                      ? 'bg-[#4a1e23] text-[#fff8f5] border-[#4a1e23]'
                      : 'text-[#1e1b18] hover:bg-[#f5ece7]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-xl ${
                      isWishlisted ? 'material-symbols-fill text-[#fff8f5]' : ''
                    }`}
                  >
                    favorite
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
