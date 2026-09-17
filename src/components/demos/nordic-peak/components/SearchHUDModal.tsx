import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import React, { useEffect, useId, useRef, useState } from 'react';
import { Product } from '../types';

interface SearchHUDModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  /** 헤더의 인기 태그로 열렸을 때 미리 넣어 둘 검색어 */
  initialQuery?: string;
}

const SUGGESTIONS = ['지오데식', '5,000mm', '티타늄', '7075', '실타프', '나일론'];

export const SearchHUDModal: React.FC<SearchHUDModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  // 열릴 때마다 넘어온 검색어로 맞춘다 — 태그를 눌렀는데 빈 검색창이 뜨면 아무 일도 안 한 것처럼 보인다
  useEffect(() => {
    if (isOpen) setQuery(initialQuery);
  }, [isOpen, initialQuery]);

  useSampleDialog({ open: isOpen, onClose, dialogRef, initialFocusRef: inputRef });

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const filtered = q
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.categoryTag.toLowerCase().includes(q) ||
          (p.description ?? '').toLowerCase().includes(q) ||
          p.specs.some(
            (s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q),
          ),
      )
    : products;

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-start justify-center lg:pt-20 lg:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-xl max-h-[88vh] flex flex-col bg-surface-container-low border-t lg:border border-outline-variant rounded-t-xl lg:rounded-sm shadow-2xl overflow-hidden outline-none"
      >
        <h2 id={titleId} className="sr-only">
          기어 검색
        </h2>

        <div className="p-4 border-b border-outline-variant bg-surface flex items-center gap-3">
          <span className="material-symbols-outlined text-outline shrink-0">travel_explore</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="장비명, SKU (예: NP-V42), 내수압, 티타늄 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-0 min-h-11 bg-transparent text-on-surface placeholder:text-outline outline-none font-body-md text-body-md"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="검색어 지우기"
              className="h-11 w-11 shrink-0 flex items-center justify-center text-outline hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                close
              </span>
            </button>
          )}
          <kbd className="hidden lg:inline font-label-mono-sm text-label-mono-sm bg-surface-container px-2 py-0.5 rounded text-outline border border-outline-variant shrink-0">
            ESC
          </kbd>
        </div>

        <div className="px-4 py-2.5 bg-surface-container-lowest border-b border-outline-variant flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-mono">
          <span className="text-outline shrink-0">추천:</span>
          {SUGGESTIONS.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="min-h-11 lg:min-h-0 px-2 lg:py-0.5 inline-flex items-center bg-surface-container hover:bg-surface-container-high rounded text-primary border border-outline-variant cursor-pointer whitespace-nowrap shrink-0"
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="px-4 py-1.5 font-label-mono-sm text-label-mono-sm text-outline border-b border-outline-variant">
          검색 결과 {filtered.length}종
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-outline">
              <span className="material-symbols-outlined" style={{ fontSize: 32 }}>
                search_off
              </span>
              <p className="font-body-md text-body-md mt-2">
                「{query}」 와 맞는 익스페디션 기어가 없습니다.
              </p>
              <button
                onClick={() => setQuery('')}
                className="mt-3 min-h-11 px-4 inline-flex items-center rounded-sm border border-outline-variant bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm cursor-pointer hover:bg-surface-container-high"
              >
                전체 기어 보기
              </button>
            </div>
          ) : (
            filtered.map((product) => (
              <button
                type="button"
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="w-full text-left p-3 rounded hover:bg-surface-container flex items-center gap-3 cursor-pointer transition-colors border border-transparent hover:border-outline-variant"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-12 h-12 object-cover rounded border border-outline-variant shrink-0"
                  referrerPolicy="no-referrer"
                />
                <span className="flex-1 min-w-0 block">
                  <span className="flex items-center gap-2">
                    <span className="font-label-mono-sm text-label-mono-sm text-outline">
                      SKU: {product.sku}
                    </span>
                    <span className="font-label-mono-sm text-label-mono-sm text-primary font-bold">
                      {product.weightTag}
                    </span>
                  </span>
                  <span className="block font-body-md text-body-md font-semibold text-on-surface truncate">
                    {product.title}
                  </span>
                </span>
                <span className="font-label-mono-sm text-label-mono-sm text-on-surface font-bold shrink-0">
                  ₩{product.price.toLocaleString()}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
