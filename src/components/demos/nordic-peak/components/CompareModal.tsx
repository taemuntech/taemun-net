import React from 'react';
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-surface-container-lowest border-2 border-outline-variant p-6 rounded-sm shadow-2xl text-on-surface overflow-x-auto">
        <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">compare_arrows</span>
            <h3 className="font-headline-sm text-headline-sm font-bold">
              익스페디션 기어 스펙 매트릭스 비교
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-outline">
                <th className="p-3 w-36">항목</th>
                {products.map((p) => (
                  <th key={p.id} className="p-3 min-w-[200px] text-on-surface">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-24 h-16 object-cover rounded mb-2 border border-outline-variant" referrerPolicy="no-referrer" />
                    <div className="font-bold text-xs line-clamp-1">{p.title}</div>
                    <div className="text-[11px] text-primary">{p.weightTag}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-xs">
              <tr>
                <td className="p-3 font-bold text-outline">SKU</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">{p.sku}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-outline">가격</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-bold text-primary">
                    ₩{p.price.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-outline">소재 및 규격</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.specs[0]?.label} {p.specs[0]?.value}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-outline">구조 특징</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.specs[1]?.label} {p.specs[1]?.value}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-outline">휴대/수납</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 text-secondary">
                    {p.specs[3]?.value}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-outline">주문</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    <button
                      onClick={() => onAddToCart(p)}
                      className="px-3 py-1.5 bg-primary-container hover:bg-surface-container-highest text-on-primary-container rounded text-xs font-bold transition-colors cursor-pointer"
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
