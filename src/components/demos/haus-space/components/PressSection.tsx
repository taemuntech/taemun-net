'use client';

import React from 'react';
import { PRESS_ACCOLADES } from '../data/portfolioData';

export const PressSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#0d0e10] border-t border-white/10" id="press-recognition">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-16">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold">
            Press &amp; Architectural Accolades
          </span>
          <span className="text-[11px] text-[#998f83] tracking-widest uppercase">
            CURATORIAL MONOGRAPHS
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 text-center lg:text-left">
          {PRESS_ACCOLADES.map((item) => (
            <div key={item.press} className="border-l border-white/15 pl-4">
              <p className="text-base font-serif text-[#f4efea] tracking-wider">
                {item.press}
              </p>
              <p className="text-xs text-[#998f83] mt-1.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
