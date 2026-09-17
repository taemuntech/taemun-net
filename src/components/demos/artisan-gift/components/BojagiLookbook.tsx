import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import { BOJAGI_LOOKBOOK } from '../data';
import { BojagiLookbookItem } from '../types';

export const BojagiLookbook: React.FC = () => {
  const [activePreview, setActivePreview] = useState<BojagiLookbookItem | null>(null);

  return (
    <section
      id="lookbook"
      className="bg-[#ebe8e3] py-12 lg:py-20 border-t border-[#d6c3ba]/40 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div className="max-w-xl">
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider bg-[#583119] text-white rounded">
              HERITAGE PACKAGING
            </span>
            <h2 className="text-2xl lg:text-3xl font-serif text-[#3e1c06] mt-2.5">
              정성을 묶는 네 가지 전통 보자기 매듭 룩북
            </h2>
            <p className="text-sm text-[#51443d] mt-2.5 leading-relaxed">
              보자기는 단순한 포장재가 아닌, 복(福)을 싸서 선물하는 한국 고유의 환대 정신입니다. 아르티장의
              전문 보자기 아티스트가 정갈한 손길로 매듭짓습니다.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 text-xs text-[#83746c] font-medium">
            * 전 상품 무료 손글씨 캘리그라피 편지 카드 동봉
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {BOJAGI_LOOKBOOK.map((item) => (
            <div
              key={item.id}
              id={`bojagi-card-${item.id}`}
              className="bg-[#fcf9f4] rounded p-5 border border-[#d6c3ba]/50 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div
                  className="aspect-[4/3] rounded overflow-hidden bg-[#f6f3ee] mb-4 relative cursor-pointer"
                  onClick={() => setActivePreview(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-[#3e1c06] text-xs px-2.5 py-1 rounded flex items-center gap-1 shadow-sm font-medium">
                      <ZoomIn className="w-3.5 h-3.5" /> 확대 보기
                    </span>
                  </div>
                </div>

                <span className="text-xs font-semibold text-[#C84B31]">{item.styleNum}</span>
                <h3 className="text-base font-serif font-bold text-[#3e1c06] mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#51443d] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#d6c3ba]/30 flex items-center justify-between text-xs">
                <span className="text-[#83746c]">추천 용도: {item.recommendedUse}</span>
                <span
                  className={`font-semibold ${
                    item.isPremium ? 'text-[#C84B31]' : 'text-[#3e1c06]'
                  }`}
                >
                  {item.priceTag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lookbook Zoom Modal */}
      {activePreview && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActivePreview(null)}
        >
          <div
            className="bg-[#fcf9f4] border border-[#d6c3ba] rounded-lg max-w-xl w-full p-6 relative shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePreview(null)}
              className="absolute top-4 right-4 text-[#51443d] hover:text-black p-1"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-[#C84B31]">{activePreview.styleNum}</span>
            <h3 className="text-xl font-serif text-[#3e1c06]">{activePreview.title}</h3>

            <div className="aspect-[4/3] rounded overflow-hidden bg-stone-100">
              <img
                src={activePreview.image}
                alt={activePreview.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#51443d] leading-relaxed">
              {activePreview.description}
            </p>

            <div className="pt-3 border-t border-[#d6c3ba]/40 flex items-center justify-between text-xs">
              <span className="text-[#83746c]">추천 용도: {activePreview.recommendedUse}</span>
              <span className="font-bold text-[#3e1c06]">{activePreview.priceTag}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
