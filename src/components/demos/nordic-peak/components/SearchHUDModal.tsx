import React, { useState } from 'react';
import { Product } from '../types';

interface SearchHUDModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchHUDModal: React.FC<SearchHUDModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.categoryTag.toLowerCase().includes(q) ||
      p.specs.some((s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal box */}
      <div className="relative w-full max-w-xl bg-surface-container-low border border-outline-variant rounded-sm shadow-2xl overflow-hidden">
        {/* Input bar */}
        <div className="p-4 border-b border-outline-variant bg-surface flex items-center gap-3">
          <span className="material-symbols-outlined text-outline">travel_explore</span>
          <input
            type="text"
            placeholder="장비명, SKU (예: NP-V42), 내수압, 티타늄, DAC 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-on-surface placeholder:text-outline outline-none font-body-md"
          />
          <kbd className="font-label-mono-sm text-label-mono-sm bg-surface-container px-2 py-0.5 rounded text-outline border border-outline-variant">
            ESC
          </kbd>
        </div>

        {/* Quick Tag suggestions */}
        <div className="px-4 py-2.5 bg-surface-container-lowest border-b border-outline-variant flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-mono">
          <span className="text-outline">추천:</span>
          {['지오데식', '5000mm', '티타늄', '7075', '실타프', '코듀라'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 bg-surface-container hover:bg-surface-container-high rounded text-primary border border-outline-variant cursor-pointer whitespace-nowrap"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-outline">
              <span className="material-symbols-outlined text-3xl mb-1">search_off</span>
              <p className="font-body-md">일치하는 익스페디션 기어가 없습니다.</p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 rounded hover:bg-surface-container flex items-center gap-3 cursor-pointer transition-colors border border-transparent hover:border-outline-variant"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-12 h-12 object-cover rounded border border-outline-variant" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono-sm text-outline text-[11px]">
                      SKU: {product.sku}
                    </span>
                    <span className="font-label-mono-sm text-primary text-[11px] font-bold">
                      {product.weightTag}
                    </span>
                  </div>
                  <h4 className="font-body-md font-semibold text-on-surface truncate">
                    {product.title}
                  </h4>
                </div>
                <div className="font-label-mono-sm text-on-surface font-bold text-sm">
                  ₩{product.price.toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
