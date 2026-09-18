'use client';

import React from 'react';
import { PERFORMANCE_ITEMS } from '../data/balletData';

export function PerformanceArchiveSection() {
  return (
    <section id="performance-section" className="py-20 lg:py-28 bg-[#131117] border-b border-[#252229] text-[#F7F3F5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F4ACB7] block mb-2">
            Stage Gala & Performance Archive
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-4">
            정기 갈라 무대 & 전국 콩쿠르 수상작 아카이브
          </h2>
          <p className="text-sm lg:text-base text-[#BDB5BC] leading-relaxed">
            원생들이 흘린 땀방울이 무대 위 찬란한 조명 아래서 예술로 승화되는 순간입니다. 연도별 주요 갈라 공연 및 콩쿠르 대상 수상작을 소개합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PERFORMANCE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-[#18151F] border border-[#2D2636] rounded-3xl p-6 lg:p-8 flex flex-col justify-between hover:border-[#3E2E42] transition-colors shadow-sm"
            >
              <div>
                <div className="w-full h-44 rounded-2xl bg-gradient-to-tr from-[#251E28] to-[#1E1824] border border-[#3E2E42] flex flex-col items-center justify-center mb-6">
                  <span className="text-5xl mb-2">🎭</span>
                  <span className="text-xs font-serif text-[#F4ACB7] font-semibold">{item.role}</span>
                </div>

                <span className="inline-block px-2.5 py-1 rounded-full bg-[#F4ACB7]/10 text-[#F4ACB7] text-[11px] font-bold mb-3">
                  {item.award}
                </span>
                <h3 className="text-lg font-serif font-bold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-[#9E939D] mb-4">작곡: {item.composer}</p>
                <div className="p-3.5 rounded-xl bg-[#0F0E11] border border-[#252229]">
                  <p className="text-xs text-[#C8BFC7]">
                    출연: <span className="font-semibold text-white">{item.dancer}</span> ({item.year}년)
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#252229] flex justify-between text-[11px] text-[#786E77]">
                <span>정기 갈라 리사이틀 (예시)</span>
                <span className="text-[#F4ACB7] font-semibold">Royal Ballet Stage</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
