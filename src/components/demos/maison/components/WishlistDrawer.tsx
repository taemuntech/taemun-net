"use client";

import React from 'react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="wishlist-drawer-backdrop"
      className="fixed inset-0 z-50 bg-[#14190e]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <aside
        id="wishlist-drawer"
        aria-label="Saved Wishlist"
        className="bg-[#fff8f5] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#d6c2c2] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#d6c2c2] flex justify-between items-center bg-[#fbf2ed]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#735b24] font-bold block">
              Curated Registry
            </span>
            <h3 className="font-serif text-[20px] text-[#300a10]">
              관심 아카이브 ({items.length})
            </h3>
          </div>
          <button
            id="btn-close-wishlist-drawer"
            type="button"
            onClick={onClose}
            className="p-1 text-[#514344] hover:text-[#300a10] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-[#514344]">
              <span className="material-symbols-outlined text-4xl text-[#d6c2c2]">
                favorite_border
              </span>
              <p className="font-serif text-[17px]">
                보관함에 담긴 작품이 없습니다.
              </p>
              <p className="text-xs text-[#514344]/80 max-w-xs">
                하트 아이콘을 눌러 관심 있는 오리지널 앤틱을 모아보세요.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-[#f5ece7] p-3 border border-[#d6c2c2] flex flex-col gap-3"
              >
                <div className="flex gap-3 items-center">
                  <div
                    className="w-16 h-16 bg-[#efe6e2] overflow-hidden shrink-0 border border-[#d6c2c2] cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectProduct(item);
                    }}
                  >
                    <img
                      alt={item.imageAlt}
                      src={item.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#735b24] font-semibold block">
                      {item.period}
                    </span>
                    <h4
                      className="font-serif text-[14px] text-[#300a10] font-bold truncate cursor-pointer hover:text-[#735b24]"
                      onClick={() => {
                        onClose();
                        onSelectProduct(item);
                      }}
                    >
                      {item.name}
                    </h4>
                    <p className="font-serif text-[14px] text-[#735b24] font-medium">
                      {item.formattedPrice}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#847374] hover:text-[#300a10] p-1.5 cursor-pointer"
                    title="보관함에서 삭제"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </div>

                <div className="flex gap-2 pt-1 border-t border-[#d6c2c2]/50">
                  <button
                    type="button"
                    onClick={() => onAddToCart(item)}
                    className="flex-1 bg-[#300a10] hover:bg-[#4a1e23] text-[#fff8f5] py-1.5 text-[11px] uppercase tracking-wider font-semibold cursor-pointer text-center"
                  >
                    소장 의뢰서에 추가
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectProduct(item);
                    }}
                    className="border border-[#300a10] text-[#300a10] hover:bg-[#fff8f5] px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    상세보기
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
};
