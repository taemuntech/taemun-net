"use client";

import React, { useRef } from 'react';
import { Product } from '../types';
import { useOverlay } from '../use-overlay';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  isInCart: boolean;
  onReserveViewing: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  isInCart,
  onReserveViewing,
}) => {
  // ESC 닫기·배경 스크롤 잠금. 훅이라 `if (!product) return null` 보다 먼저 불러야 한다.
  const dialogRef = useRef<HTMLDivElement>(null);
  // ESC 닫기 · 배경 스크롤 잠금 · 포커스 가두기·복귀
  useOverlay(product !== null, onClose, dialogRef);

  if (!product) return null;

  return (
    <div
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#14190e]/75 backdrop-blur-xs flex items-end justify-center p-0 lg:items-center lg:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="product-detail-modal-container"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="작품 상세"
        tabIndex={-1}
        className="bg-[#fff8f5] border border-[#735b24] max-w-4xl w-full max-h-[88vh] overflow-y-auto shadow-2xl relative rounded-t-2xl lg:max-h-[92vh] lg:rounded-none animate-in slide-in-from-bottom-6 duration-300 lg:animate-none outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close */}
        <div className="sticky top-0 bg-[#fff8f5]/95 backdrop-blur-sm px-4 py-3 lg:px-6 lg:py-4 border-b border-[#d6c2c2] flex justify-between items-center z-10">
          <span aria-hidden="true" className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-[#d6c2c2] lg:hidden"></span>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#735b24]"></span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#735b24] font-bold">
              Archival Specimen Dossier · {product.refCode}
            </span>
          </div>
          <button
            id="btn-close-product-modal"
            type="button"
            onClick={onClose}
            aria-label="작품 상세 닫기"
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center text-[#514344] hover:text-[#300a10] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="p-6 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Image Preview (6 cols) */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative bg-[#f5ece7] p-3 border border-[#d6c2c2]">
                <div className="aspect-[4/3] bg-[#efe6e2] overflow-hidden">
                  <img
                    alt={product.imageAlt}
                    className="w-full h-full object-cover"
                    src={product.image}
                  />
                </div>
                <div className="absolute top-5 left-5 bg-[#300a10] text-[#fff8f5] text-[10px] uppercase tracking-wider px-2.5 py-1 font-semibold">
                  {product.tag1}
                </div>
              </div>

              <div className="bg-[#fbf2ed] p-3 border border-[#d6c2c2] text-xs font-serif text-[#514344] flex items-center justify-between">
                <span>한남 살롱 메인 갤러리 실물 보관 중</span>
                <span className="text-[#735b24] font-semibold">원형 보존 완료</span>
              </div>
            </div>

            {/* Specimen Info (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-[11px] text-[#735b24] uppercase tracking-widest font-bold">
                  {product.period}
                </span>
                <h3 className="font-serif text-[24px] lg:text-[26px] text-[#300a10] mt-1 leading-snug">
                  {product.name}
                </h3>
                <p className="font-serif text-[14px] text-[#514344] italic mt-0.5">
                  {product.enName}
                </p>
              </div>

              <p className="font-serif text-[15px] text-[#514344] leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specifications Table */}
              <div className="border-y border-[#d6c2c2] py-3 space-y-2.5 font-serif text-[14px] [&>div]:gap-4 [&_span:first-child]:shrink-0">
                <div className="flex justify-between">
                  <span className="text-[#514344]">시대 및 산지</span>
                  <span className="font-medium text-[#1e1b18] text-right">
                    {product.originEra}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#514344]">주요 소재</span>
                  <span className="font-medium text-[#1e1b18] text-right">
                    {product.materials}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#514344]">규격 (Dimensions)</span>
                  <span className="font-medium text-[#1e1b18] text-right">
                    {product.dimensions}
                  </span>
                </div>
                {product.marble && (
                  <div className="flex justify-between">
                    <span className="text-[#514344]">상판 대리석</span>
                    <span className="font-medium text-[#1e1b18] text-right">
                      {product.marble}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#514344]">보존 등급</span>
                  <span className="font-semibold text-[#735b24] text-right">
                    {product.restorationStatus || '뮤지엄 급 보존 상태'}
                  </span>
                </div>
              </div>

              {/* Provenance Box */}
              <div className="bg-[#fbf2ed] p-3.5 border border-[#d6c2c2] space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#735b24] font-bold block">
                  출처 및 내력 기록 (Provenance Deed)
                </span>
                <p className="font-serif text-[13px] text-[#514344] leading-relaxed">
                  {product.provenanceDeed}
                </p>
              </div>

              {/* Price and Actions */}
              <div className="pt-3 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase text-[#514344] font-semibold">
                    소장 가액 (Acquisition Value)
                  </span>
                  <span className="font-serif text-[26px] font-bold text-[#300a10]">
                    {product.formattedPrice}
                  </span>
                </div>

                <div className="flex flex-col lg:flex-row gap-3">
                  <button
                    id="btn-modal-add-to-cart"
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="flex-1 bg-[#4a1e23] text-[#fff8f5] hover:bg-[#300a10] py-3 text-[12px] uppercase tracking-wider font-semibold transition-colors cursor-pointer text-center"
                  >
                    {isInCart ? '소장 의뢰서에 담김 ✓' : '소장 의뢰서에 담기'}
                  </button>

                  <button
                    id="btn-modal-viewing"
                    type="button"
                    onClick={() => {
                      onClose();
                      onReserveViewing();
                    }}
                    className="flex-1 border border-[#300a10] text-[#300a10] hover:bg-[#f5ece7] py-3 text-[12px] uppercase tracking-wider font-semibold transition-colors cursor-pointer text-center"
                  >
                    살롱 실물 뷰잉 예약
                  </button>

                  <button
                    id="btn-modal-toggle-wishlist"
                    aria-label="Wishlist toggle"
                    type="button"
                    onClick={() => onToggleWishlist(product)}
                    className={`border border-[#1e1b18] p-3 transition-colors flex items-center justify-center cursor-pointer ${
                      isWishlisted
                        ? 'bg-[#4a1e23] text-[#fff8f5] border-[#4a1e23]'
                        : 'text-[#1e1b18] hover:bg-[#f5ece7]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isWishlisted ? 'material-symbols-fill' : ''
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
      </div>
    </div>
  );
};
