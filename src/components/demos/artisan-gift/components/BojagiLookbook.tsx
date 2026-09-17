import React, { useRef, useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { BOJAGI_LOOKBOOK } from '../data';
import { BojagiLookbookItem } from '../types';

export const BojagiLookbook: React.FC = () => {
  const [activePreview, setActivePreview] = useState<BojagiLookbookItem | null>(null);
  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 공용 훅(SampleNotice 와 같은 것)
  const previewRef = useRef<HTMLDivElement>(null);
  useSampleDialog({
    open: activePreview !== null,
    onClose: () => setActivePreview(null),
    dialogRef: previewRef,
  });

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
        {/* 태블릿(768)에서 한 열로 늘어지던 자리라 그리드 칸 수만 2열로 나눈다(UI 모드 경계는 lg 그대로) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOJAGI_LOOKBOOK.map((item) => (
            <div
              key={item.id}
              id={`bojagi-card-${item.id}`}
              className="bg-[#fcf9f4] rounded p-5 border border-[#d6c3ba]/50 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <button
                  type="button"
                  onClick={() => setActivePreview(item)}
                  aria-label={`${item.title} 확대 보기`}
                  className="w-full aspect-[4/3] rounded overflow-hidden bg-[#f6f3ee] mb-4 relative cursor-pointer block"
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
                </button>

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
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end lg:items-center justify-center p-0 lg:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActivePreview(null);
          }}
        >
          <div
            ref={previewRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bojagi-preview-title"
            tabIndex={-1}
            className="bg-[#fcf9f4] border border-[#d6c3ba] rounded-t-2xl lg:rounded-lg max-w-xl w-full p-5 lg:p-6 relative shadow-xl space-y-4 outline-none max-h-[88vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setActivePreview(null)}
              className="absolute top-3 right-3 w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center text-[#51443d] hover:text-black rounded"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-[#C84B31]">{activePreview.styleNum}</span>
            <h3 id="bojagi-preview-title" className="text-xl font-serif text-[#3e1c06] pr-10">
              {activePreview.title}
            </h3>

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
