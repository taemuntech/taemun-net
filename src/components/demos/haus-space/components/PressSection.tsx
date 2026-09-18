'use client';

import React from 'react';
import { PRESS_ACCOLADES } from '../data/portfolioData';

export const PressSection: React.FC = () => {
  return (
    <section
      className="py-16 bg-[#0d0e10] border-t border-white/10 scroll-mt-[calc(var(--sample-bar-h,0px)_+_80px)]"
      id="press-recognition"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 pb-6 border-b border-white/10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold break-keep [word-break:keep-all]">
            Press &amp; Architectural Accolades
          </span>
          <span className="text-[11px] text-[#998f83] tracking-widest uppercase">
            CURATORIAL MONOGRAPHS
          </span>
        </div>

        {/* 매체명·수상은 전부 「(예시)」 표기 자리다 — 실존 매체·어워드 이름을 쓰지 않는다 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 pt-8 text-left">
          {PRESS_ACCOLADES.map((item) => (
            <div key={item.press} className="border-l border-white/15 pl-4">
              <p className="text-base font-serif text-[#f4efea] tracking-wider break-keep [word-break:keep-all]">
                {item.press}
              </p>
              <p className="text-xs text-[#998f83] mt-1.5 leading-relaxed [word-break:keep-all]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
