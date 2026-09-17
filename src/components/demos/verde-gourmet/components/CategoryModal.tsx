import React, { useId, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  all: 'storefront',
  meat: 'restaurant',
  seafood: 'set_meal',
  vegetable: 'eco',
  bakery: 'bakery_dining'
};

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc·배경 스크롤 잠금·포커스 순환 — 조건부 호출이 되지 않게 early return 위에서 부른다
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  // 예전에는 「완도 활전복」·「담양 딸기」처럼 이 샘플에 **없는** 품목이 적혀 있어, 눌러 보면
  // 목록에 그 물건이 없었다. 지금은 실제로 담긴 상품에서 뽑는다.
  const groups = CATEGORIES.filter((c) => c.id !== 'all').map((cat) => ({
    ...cat,
    items: PRODUCTS.filter((p: Product) => p.category === cat.id)
  }));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-start justify-center p-4 pt-10 lg:pt-16">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="relative w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant overflow-hidden p-5 lg:p-6 space-y-4 outline-none"
        >
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-outline-variant">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-primary text-2xl shrink-0">menu_book</span>
              <h3 id={titleId} className="text-lg font-bold text-primary truncate">전체 카테고리</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="카테고리 닫기"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {groups.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id);
                  onClose();
                }}
                className="p-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-surface-container hover:border-secondary/50 cursor-pointer transition-all space-y-2 group text-left"
              >
                <div className="flex items-center justify-between gap-2 text-primary font-bold text-sm group-hover:text-secondary">
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-lg shrink-0">
                      {CATEGORY_ICONS[cat.id] ?? 'storefront'}
                    </span>
                    <span className="truncate">{cat.name}</span>
                  </span>
                  <span className="text-[11px] font-mono text-outline shrink-0">{cat.items.length}종</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <React.Fragment key={item.id}>
                      <span className="max-w-full truncate text-[11px] bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/60 text-on-surface-variant">
                        {item.name}
                      </span>
                      <span className="text-[11px] bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/60 text-secondary font-mono">
                        {item.tempBadge}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                onSelectCategory('all');
                onClose();
              }}
              className="inline-flex min-h-11 items-center px-3 text-xs text-secondary font-bold hover:underline"
            >
              전체 상품 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
