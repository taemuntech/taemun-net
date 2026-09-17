import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Product } from '../types';
import { colorNameOf } from '../data/mockData';
import { useCurrency } from '../currency';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedSize: string, selectedColor: string) => void;
  onInstantBuy: (product: Product, selectedSize: string, selectedColor: string) => void;
  onGiftItem: (product: Product) => void;
}

// 상세는 상품마다 다른 값을 보여 준다 — 예전에는 어떤 상품을 열어도
// 블레이저 한 벌의 어깨/가슴/소매 치수표와 M·L·XL 버튼이 똑같이 나왔다(가방·슈즈까지).
export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onInstantBuy,
  onGiftItem,
}) => {
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('#0C0D0E');
  const dialogRef = useRef<HTMLDivElement>(null);
  const { price } = useCurrency();

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅과 같은 동작
  useSampleDialog({ open: isOpen && product !== null, onClose, dialogRef });

  const sizeOptions = useMemo(() => {
    if (!product) return [];
    if (product.measurements && product.measurements.length > 0) {
      return product.measurements.map((row) => row.size);
    }
    return product.sizeOptions ?? ['ONE SIZE'];
  }, [product]);

  const defaultSize = useMemo(() => {
    if (!product) return '';
    const recommended = product.measurements?.find((row) => row.isModelSize)?.size;
    return recommended ?? sizeOptions[0] ?? 'ONE SIZE';
  }, [product, sizeOptions]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.thumbnails?.[0] || product.image);
      setSelectedSize(defaultSize);
      setSelectedColor(product.colors[0] || '#0C0D0E');
    }
  }, [product, defaultSize]);

  if (!isOpen || !product) return null;

  const defaultThumbnails = [
    product.image,
    '/demo-media/atelier-noir/atelier-noir-14.jpg',
    '/demo-media/atelier-noir/atelier-noir-19.jpg',
    '/demo-media/atelier-noir/atelier-noir-04.jpg',
    '/demo-media/atelier-noir/atelier-noir-17.jpg',
  ];

  const galleryImages =
    product.thumbnails && product.thumbnails.length > 0 ? product.thumbnails : defaultThumbnails;

  const measurements = product.measurements ?? [];
  const isExclusive = Boolean(
    product.badge?.includes('EXCLUSIVE') || product.badge?.includes('단독')
  );
  const stockOfSelected = measurements.find((row) => row.size === selectedSize)?.stock;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end lg:items-center justify-center lg:p-4 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="atelier-noir-product-title"
        tabIndex={-1}
        className="bg-[#1b1c1d] hairline-all max-w-4xl w-full max-h-[92vh] overflow-y-auto relative p-5 lg:p-8 outline-none animate-in fade-in slide-in-from-bottom-4 lg:zoom-in-95 lg:slide-in-from-bottom-0 duration-150"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center text-[#e3e2e3] hover:text-[#caf300] transition-colors z-20 cursor-pointer"
          aria-label="닫기"
        >
          <span className="material-symbols-outlined text-[28px]">close</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Multi-Angle Gallery Preview (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="aspect-[3/4] hairline-all overflow-hidden bg-[#121314]">
              <img
                src={activeImage || product.image}
                alt={product.altText}
                className="w-full h-full object-cover transition-transform duration-300"
              referrerPolicy="no-referrer" />
            </div>

            {/* Thumbnail Matrix */}
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.slice(0, 4).map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(thumb)}
                  aria-label={`상세 사진 ${idx + 1} 보기`}
                  aria-pressed={activeImage === thumb}
                  className={`aspect-square hairline-all overflow-hidden transition-all cursor-pointer ${ activeImage === thumb ? 'border-[#caf300] opacity-100 ring-1 ring-[#caf300]' : 'opacity-60 hover:opacity-100 border-[#27272a]' }`}
                >
                  <img
                    src={thumb}
                    alt=""
                    className="w-full h-full object-cover"
                  referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Spec, Fit Guide & Purchasing Controls (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 pr-12">
                {isExclusive && (
                  <span className="bg-[#caf300] text-[#171e00] font-label-sm text-[10px] font-bold px-2 py-0.5">
                    EXCLUSIVE ARCHIVE
                  </span>
                )}
                <span className="text-[#ffb4ab] font-label-sm text-xs font-bold">
                  {product.discountRate}
                </span>
                <span className="text-[#8f9378] font-label-sm text-[10px] uppercase">
                  {product.brand}
                </span>
                <span className="text-[#8f9378] font-label-sm text-[10px]">
                  {product.category} · {product.subCategory}
                </span>
              </div>

              <h2
                id="atelier-noir-product-title"
                className="font-headline-lg text-lg lg:text-xl text-[#ffffff] font-bold mb-1"
              >
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <div className="font-display-hero text-2xl font-bold text-[#caf300]">
                  {price(product.price)}
                </div>
                <div className="text-xs text-[#8f9378] line-through font-label-sm">
                  {price(product.originalPrice)}
                </div>
              </div>

              {/* Model Spec Highlight */}
              <div className="bg-[#1f2021] p-3 hairline-all mb-4 text-xs">
                <div className="text-[#caf300] font-label-sm text-[10px] uppercase mb-1">
                  MODEL FITTING SPEC
                </div>
                <p className="text-[#e3e2e3]">
                  {product.modelSpec ?? '착용 스펙은 상품마다 따로 적습니다. (예시 데이터)'}
                </p>
                <p className="text-[#8f9378] mt-1 text-[11px]">
                  소재: {product.fabric} · 실루엣: {product.fit}
                </p>
              </div>

              {/* Precision Measurement Table */}
              {measurements.length > 0 ? (
                <div className="mb-4">
                  <div className="font-label-sm text-[11px] text-[#8f9378] uppercase mb-2">
                    실측 정밀 치수표 (CM · 예시 데이터)
                  </div>
                  {/* 좁은 화면에서 표가 지면을 밀지 않게 표만 따로 가로로 굴린다 */}
                  <div className="overflow-x-auto hairline-all">
                    <table className="w-full min-w-[26rem] text-left font-label-sm text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#121314] hairline-b text-[#8f9378]">
                          <th className="p-2 font-medium whitespace-nowrap">사이즈</th>
                          <th className="p-2 font-medium whitespace-nowrap">어깨너비</th>
                          <th className="p-2 font-medium whitespace-nowrap">가슴단면</th>
                          <th className="p-2 font-medium whitespace-nowrap">소매길이</th>
                          <th className="p-2 font-medium whitespace-nowrap">총장</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272A] text-[#e3e2e3]">
                        {measurements.map((row) => {
                          const highlight = row.size === selectedSize;
                          const cell = highlight ? 'p-2 font-bold text-[#caf300]' : 'p-2';
                          return (
                            <tr key={row.size} className={highlight ? 'bg-[#1f2021]/60' : ''}>
                              <td className={`p-2 font-bold whitespace-nowrap ${ highlight ? 'text-[#caf300]' : 'text-[#ffffff]' }`}>
                                {row.size}
                                {row.isModelSize && <span className="ml-1 text-[10px]">*착용</span>}
                              </td>
                              <td className={cell}>{row.shoulder}</td>
                              <td className={cell}>{row.chest}</td>
                              <td className={cell}>{row.sleeve}</td>
                              <td className={cell}>{row.length}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="mb-4 hairline-all bg-[#121314] p-3 text-[11px] text-[#8f9378]">
                  이 품목은 의류 실측표 대신 위의 규격 안내를 씁니다. (예시 데이터)
                </div>
              )}

              {/* Verified Fit Review Summary */}
              <div className="hairline-all bg-[#1f2021] p-3 mb-4 text-xs">
                <div className="text-[#8f9378] font-label-sm text-[10px] uppercase mb-1">
                  체형별 핏 리뷰 요약 (예시 데이터 — 실제 구매 후기가 아닙니다)
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#c5c9ac]">
                  <span>실루엣: <strong className="text-[#ffffff]">{product.fit}</strong></span>
                  <span>소재: <strong className="text-[#ffffff]">{product.fabric}</strong></span>
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-4">
                <label className="font-label-sm text-[11px] text-[#8f9378] block mb-2">
                  COLOR SELECT: <span className="text-[#ffffff]">{colorNameOf(selectedColor)}</span>
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {product.colors.map((hex) => {
                    const isSelected = selectedColor === hex;
                    return (
                      <button
                        key={hex}
                        onClick={() => setSelectedColor(hex)}
                        aria-pressed={isSelected}
                        aria-label={`컬러 ${colorNameOf(hex)}`}
                        title={colorNameOf(hex)}
                        className="group flex items-center justify-center w-11 h-11 cursor-pointer"
                      >
                        <span
                          className={`block w-6 h-6 transition-transform ${ isSelected ? 'border-2 border-[#caf300] scale-110' : 'border border-[#8f9378] group-hover:scale-105' }`}
                          style={{ backgroundColor: hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-4">
                <label className="font-label-sm text-[11px] text-[#8f9378] block mb-2">
                  SIZE SELECT:
                  {stockOfSelected && <span className="text-[#c5c9ac] ml-1">{stockOfSelected}</span>}
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {sizeOptions.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        aria-pressed={isSelected}
                        className={`min-h-11 px-2 hairline-all text-center font-label-sm text-xs cursor-pointer transition-all ${ isSelected ? 'bg-[#caf300] text-[#171e00] font-bold border-[#caf300]' : 'bg-[#121314] text-[#e3e2e3] hover:border-[#ffffff]' }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Purchasing Commitment Actions */}
            <div className="flex flex-col gap-2 pt-4 hairline-t">
              <p className="text-[11px] text-[#8f9378] font-label-sm">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않고 주문·결제도 접수되지 않습니다.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onInstantBuy(product, selectedSize, selectedColor)}
                  className="bg-[#caf300] text-[#171e00] min-h-11 py-3.5 px-4 font-label-lg text-xs font-bold uppercase tracking-wider hover:bg-[#ffffff] transition-colors text-center cursor-pointer active:scale-98"
                >
                  바로 구매하기
                </button>
                <button
                  onClick={() => onAddToCart(product, selectedSize, selectedColor)}
                  className="bg-[#292a2b] text-[#ffffff] hairline-all min-h-11 py-3.5 px-4 font-label-lg text-xs font-bold uppercase tracking-wider hover:bg-[#343536] transition-colors text-center cursor-pointer active:scale-98"
                >
                  장바구니 담기
                </button>
              </div>

              <button
                onClick={() => onGiftItem(product)}
                className="w-full bg-transparent hairline-all min-h-11 py-2.5 text-[#e3e2e3] hover:text-[#ffffff] hover:bg-[#1f2021] font-label-sm text-xs uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#caf300]">
                  featured_seasonal_and_gifts
                </span>
                <span>선물하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
