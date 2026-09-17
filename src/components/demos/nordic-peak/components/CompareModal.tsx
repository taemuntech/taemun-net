import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import React, { useId, useRef } from 'react';
import { Product } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center lg:p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-surface-container-lowest border-t-2 lg:border-2 border-outline-variant p-5 lg:p-6 rounded-t-xl lg:rounded-sm shadow-2xl text-on-surface outline-none"
      >
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3 mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-primary shrink-0">compare_arrows</span>
            <h3 id={titleId} className="font-headline-sm text-headline-sm font-bold [word-break:keep-all]">
              익스페디션 기어 스펙 비교
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="비교표 닫기"
            className="h-11 w-11 shrink-0 flex items-center justify-center text-outline hover:text-on-surface rounded cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <p className="font-label-mono-sm text-label-mono-sm text-outline mb-3">
          표의 사양·가격은 모두 예시입니다. 표는 좌우로 밀어서 보실 수 있습니다.
        </p>

        {/* 표는 자기 상자 안에서만 가로로 움직인다 — 지면 전체가 밀리지 않게 */}
        <div className="overflow-x-auto border border-outline-variant rounded-sm">
          <table className="w-full text-left text-sm font-mono border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-outline bg-surface-container-low">
                <th scope="col" className="p-3 w-32 min-w-32">
                  항목
                </th>
                {products.map((p) => (
                  <th scope="col" key={p.id} className="p-3 min-w-[200px] text-on-surface">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-24 h-16 object-cover rounded mb-2 border border-outline-variant"
                      referrerPolicy="no-referrer"
                    />
                    <span className="block font-bold text-xs line-clamp-2">{p.title}</span>
                    <span className="block text-[11px] text-primary">{p.weightTag}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-xs">
              <tr>
                <th scope="row" className="p-3 font-bold text-outline text-left">
                  SKU
                </th>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.sku}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-bold text-outline text-left">
                  가격 (예시)
                </th>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-bold text-primary">
                    ₩{p.price.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-bold text-outline text-left">
                  소재 및 규격
                </th>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.specs[0]?.label} {p.specs[0]?.value}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-bold text-outline text-left">
                  구조 특징
                </th>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.specs[1]?.label} {p.specs[1]?.value}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-bold text-outline text-left">
                  휴대/수납
                </th>
                {products.map((p) => (
                  <td key={p.id} className="p-3 text-secondary">
                    {p.specs[3]?.value}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-bold text-outline text-left">
                  담기
                </th>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    <button
                      onClick={() => onAddToCart(p)}
                      className="min-h-11 px-3 inline-flex items-center bg-primary-container hover:bg-surface-container-highest text-on-primary-container rounded text-xs font-bold transition-colors cursor-pointer"
                    >
                      장바구니 담기
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
