'use client';

// 상품·모델 상세 데이터시트 모달.
// 예전에는 카드·매트릭스의 「상세보기」가 토스트 한 줄만 띄우고 끝나서 눌러도 아무 것도 열리지 않았다.
// 벤토 랙 카드와 대조 매트릭스의 모델이 같은 모양(SpecSheetData)으로 들어와 이 한 곳에서 열린다.

import React, { useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

export type SpecSheetRow = { label: string; value: string; detail?: string };

export type SpecSheetData = {
  id: string;
  title: string;
  badge?: string;
  subtitle?: string;
  image?: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  rating?: number;
  reviewCount?: number;
  chips?: string[];
  rows: SpecSheetRow[];
  /** 장바구니에 담을 수 있는 상품이면 true — 대조 매트릭스의 참고 모델은 false */
  purchasable: boolean;
};

interface SpecSheetModalProps {
  data: SpecSheetData | null;
  onClose: () => void;
  onAddToCart: (id: string) => void;
  onBuyNow: (id: string) => void;
}

export const SpecSheetModal: React.FC<SpecSheetModalProps> = ({ data, onClose, onAddToCart, onBuyNow }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useSampleDialog({ open: Boolean(data), onClose, dialogRef, initialFocusRef: closeRef });

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 p-0 lg:p-4 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="technova-specsheet-title"
        tabIndex={-1}
        className="w-full max-w-2xl max-h-[92vh] lg:max-h-[88vh] overflow-y-auto rounded-t-2xl lg:rounded-xl bg-[#111827] border border-[#4cd7f6] p-4 lg:p-6 shadow-2xl outline-none spec-hairline"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-[#424754] pb-3">
          <div className="min-w-0">
            {data.badge && (
              <span className="inline-block mb-1 px-1.5 py-0.5 rounded bg-[#03b5d3]/15 text-[#4cd7f6] border border-[#4cd7f6]/40 font-label text-[10px] font-bold">
                {data.badge}
              </span>
            )}
            <h3 id="technova-specsheet-title" className="text-base lg:text-lg font-headline font-bold text-[#dfe2ee] leading-snug">
              {data.title}
            </h3>
            {data.subtitle && <p className="text-[11px] text-[#8c909f] mt-1 leading-relaxed">{data.subtitle}</p>}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="상세 닫기"
            className="shrink-0 min-h-11 min-w-11 flex items-center justify-center rounded text-[#8c909f] hover:bg-[#1c2028] hover:text-[#dfe2ee] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="py-4 flex flex-col lg:flex-row gap-4 lg:gap-6">
          {data.image && (
            <div className="lg:w-56 shrink-0 bg-[#0a0e16] border border-[#424754] rounded-lg p-3 flex items-center justify-center">
              <img
                src={data.image}
                alt={data.title}
                referrerPolicy="no-referrer"
                className="max-h-40 w-auto object-contain"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            {data.chips && data.chips.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3 text-[10px] font-label">
                {data.chips.map((chip) => (
                  <span key={chip} className="px-1.5 py-0.5 rounded bg-[#1c2028] text-[#c2c6d6] border border-[#424754]/60">
                    {chip}
                  </span>
                ))}
              </div>
            )}

            <dl className="divide-y divide-[#424754]/50 border border-[#424754] rounded-lg overflow-hidden text-xs">
              {data.rows.map((row) => (
                <div key={row.label} className="flex gap-3 p-2.5 bg-[#181c24]">
                  <dt className="w-24 shrink-0 font-label text-[11px] text-[#8c909f]">{row.label}</dt>
                  <dd className="min-w-0 flex-1">
                    <span className="block text-[#dfe2ee] font-semibold break-words">{row.value}</span>
                    {row.detail && <span className="block text-[11px] text-[#8c909f] mt-0.5 break-words">{row.detail}</span>}
                  </dd>
                </div>
              ))}
            </dl>

            {typeof data.rating === 'number' && (
              <p className="mt-2 text-[11px] text-[#8c909f]">
                예시 평점 {data.rating.toFixed(1)}
                {typeof data.reviewCount === 'number' ? ` · 예시 후기 ${data.reviewCount}건` : ''} — 지어낸 표본이며 실제 구매 후기가 아닙니다.
              </p>
            )}
          </div>
        </div>

        {/* Price & actions */}
        <div className="border-t border-[#424754] pt-3">
          <div className="flex items-end justify-between gap-3 mb-3">
            <div>
              {typeof data.discountRate === 'number' && typeof data.originalPrice === 'number' && (
                <div className="flex items-center gap-2">
                  <span className="text-[#ec6a06] font-label text-xs font-bold">{data.discountRate}%</span>
                  <span className="text-[#8c909f] line-through text-[11px]">₩{data.originalPrice.toLocaleString()}</span>
                </div>
              )}
              <span className="text-xl font-headline font-bold text-[#dfe2ee]">₩{data.price.toLocaleString()}</span>
            </div>
            <span className="text-[11px] text-[#8c909f] text-right">가격·재고는 예시 표기입니다</span>
          </div>

          <p className="mb-2.5 rounded border border-[#4cd7f6]/60 bg-[#0a0e16] px-3 py-2 text-center text-[12px] leading-relaxed text-[#dfe2ee]">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {data.purchasable && (
              <button
                type="button"
                onClick={() => {
                  onAddToCart(data.id);
                  onClose();
                }}
                className="min-h-11 rounded bg-[#31353e] hover:bg-[#3c414b] text-[#dfe2ee] border border-[#424754] font-label text-xs font-bold transition-colors cursor-pointer"
              >
                장바구니 담기
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                onBuyNow(data.id);
                onClose();
              }}
              className={`min-h-11 rounded bg-[#ec6a06] hover:bg-[#ff7a1a] text-[#4a1c00] font-label text-xs font-bold uppercase transition-colors orange-glow cursor-pointer ${ data.purchasable ? '' : 'lg:col-span-2' }`}
            >
              주문서 열기 (샘플)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
