"use client";

import React, { useState } from 'react';
import { PRODUCTS, FEATURED_SPECIMEN } from '../data/antiqueData';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const ALL_ITEMS = [FEATURED_SPECIMEN, ...PRODUCTS];
const QUICK_TAGS = [
  '루이 15세',
  '월넛',
  '빅토리안',
  '오르몰루',
  '수은 거울',
  '마이센',
  '샹들리에',
  '마호가니',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const results = ALL_ITEMS.filter((item) => {
    if (!searchTerm.trim()) return false;
    const query = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.enName.toLowerCase().includes(query) ||
      item.period.toLowerCase().includes(query) ||
      item.materials.toLowerCase().includes(query) ||
      item.originEra.toLowerCase().includes(query)
    );
  });

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#14190e]/75 backdrop-blur-xs flex items-start justify-center pt-16 lg:pt-24 px-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        className="bg-[#fff8f5] border border-[#735b24] max-w-2xl w-full shadow-2xl p-6 lg:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-[#d6c2c2] pb-4">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[#735b24] text-2xl">
              search
            </span>
            <span className="font-serif text-[20px] text-[#300a10]">
              아카이브 작품 검색
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#514344] hover:text-[#300a10] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Input */}
        <div>
          <input
            type="text"
            autoFocus
            placeholder="작품명, 시대(루이 15세, 빅토리안), 소재(월넛, 황동) 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#fbf2ed] border border-[#d6c2c2] p-3 text-[15px] text-[#1e1b18] focus:border-[#735b24] focus:outline-none transition-colors font-serif"
          />
        </div>

        {/* Quick Tag Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[11px] uppercase tracking-wider text-[#735b24] font-semibold">
            추천 키워드 :
          </span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchTerm(tag)}
              className="bg-[#f5ece7] hover:bg-[#300a10] hover:text-[#fff8f5] border border-[#d6c2c2] text-[#514344] px-2.5 py-1 text-xs font-serif transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-72 overflow-y-auto space-y-3">
          {searchTerm.trim() && results.length === 0 && (
            <p className="font-serif text-center text-[#514344] py-8 text-[15px]">
              "{searchTerm}"에 해당하는 아카이브 작품을 찾지 못했습니다.
            </p>
          )}

          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onClose();
                onSelectProduct(item);
              }}
              className="bg-[#f5ece7] hover:bg-[#fbf2ed] p-3 border border-[#d6c2c2] flex gap-4 items-center cursor-pointer transition-colors"
            >
              <div className="w-14 h-14 bg-[#efe6e2] shrink-0 border border-[#d6c2c2]">
                <img
                  alt={item.imageAlt}
                  src={item.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase text-[#735b24] font-semibold block">
                  {item.period} · {item.refCode}
                </span>
                <h4 className="font-serif text-[15px] text-[#300a10] font-medium truncate">
                  {item.name}
                </h4>
                <p className="text-xs text-[#514344] truncate">{item.materials}</p>
              </div>
              <div className="text-right">
                <span className="font-serif font-bold text-[#300a10] text-[15px]">
                  {item.formattedPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
