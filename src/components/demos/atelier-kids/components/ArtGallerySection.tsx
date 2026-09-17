'use client';

import React, { useState } from 'react';
import { ARTWORK_PIECES } from '../data/kidsData';

export function ArtGallerySection() {
  const [filter, setFilter] = useState<'all' | 'collage' | 'clay' | 'watercolor' | 'mixed'>('all');

  const filtered =
    filter === 'all' ? ARTWORK_PIECES : ARTWORK_PIECES.filter((p) => p.category === filter);

  return (
    <section id="gallery-section" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#2D2A26]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E07A5F] block mb-2">
            Little Artist Exhibition
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-[#2D2A26] mb-4">
            어린이 정기 전시회 & 갤러리 아카이브
          </h2>
          <p className="text-sm lg:text-base text-[#5C554D] leading-relaxed">
            아이들의 손끝에서 탄생한 따뜻하고 독창적인 작품들입니다. 매 학기마다 학부모님과 함께하는 프라이빗 전시회를 열어 아이에게 작가로서의 자긍심을 심어줍니다.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', label: '전체 작품' },
            { id: 'collage', label: '✂️ 꼴라주' },
            { id: 'clay', label: '🏺 점토 조형' },
            { id: 'watercolor', label: '🖌️ 수채 번짐' },
            { id: 'mixed', label: '🎨 복합 매체' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
                filter === tab.id
                  ? 'bg-[#E07A5F] text-white shadow-md'
                  : 'bg-white border border-[#E8E2D9] text-[#5C554D] hover:bg-[#F4F0E8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filtered.map((piece) => (
            <div
              key={piece.id}
              className="bg-white border border-[#E8E2D9] rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#E07A5F] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Artwork Visual Simulated Canvas Frame */}
                <div className="w-full h-52 rounded-2xl bg-gradient-to-tr from-[#F4F0E8] to-[#FAF8F5] border border-[#E8E2D9] flex flex-col items-center justify-center p-6 mb-6 group-hover:scale-[1.02] transition-transform relative overflow-hidden">
                  <div className="text-5xl mb-3">
                    {piece.category === 'collage' && '✂️'}
                    {piece.category === 'clay' && '🏺'}
                    {piece.category === 'watercolor' && '🖌️'}
                    {piece.category === 'mixed' && '🎨'}
                  </div>
                  <div className="flex gap-2">
                    {piece.palette.map((c, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 rounded-full shadow-inner border border-white"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-serif font-bold text-[#2D2A26] group-hover:text-[#E07A5F] transition-colors">
                    {piece.title}
                  </h3>
                </div>
                <p className="text-xs font-medium text-[#81B29A] mb-3">{piece.artistAge}</p>
                <p className="text-xs text-[#5C554D] leading-relaxed mb-6">
                  {piece.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between text-[11px] text-[#7A7369]">
                <span>전시 카탈로그 수록작 (예시)</span>
                <span className="font-semibold text-[#E07A5F]">Atelier Kids Collection</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
