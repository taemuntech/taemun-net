'use client';

import React from 'react';
import { STAY_BRAND } from '../data/stayData';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  return (
    <footer className="bg-[#0b0c0e] text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-600/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-serif text-sm">
                소
              </div>
              <span className="font-serif tracking-widest text-base font-medium text-stone-100 uppercase">
                {STAY_BRAND.name}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              {STAY_BRAND.tagline}
            </p>
            <p className="text-xs text-stone-400 font-mono">
              © 2025 {STAY_BRAND.name}. All rights reserved.
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs font-mono">
            <div className="space-y-2">
              <span className="text-amber-400 uppercase tracking-wider block text-[11px]">
                LOCATION & STAY
              </span>
              <p className="text-stone-300 font-light">{STAY_BRAND.address}</p>
              <p className="text-stone-400 font-light">{STAY_BRAND.checkIn}</p>
              <p className="text-stone-500 font-light">{STAY_BRAND.bizNumber}</p>
            </div>

            <div className="space-y-2">
              <span className="text-amber-400 uppercase tracking-wider block text-[11px]">
                RESERVATION & ARCHITECTURE
              </span>
              <p className="text-stone-300 font-light">TEL: {STAY_BRAND.phone}</p>
              <p className="text-stone-300 font-light">MAIL: {STAY_BRAND.email}</p>
              <button
                onClick={onOpenConsultation}
                className="text-amber-400 hover:text-amber-300 underline min-h-[44px] inline-flex items-center text-left"
              >
                프라이빗 예약 및 건축 상담 신청하기 →
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800/80 flex flex-col lg:flex-row items-center justify-between text-[11px] text-stone-400 font-light">
          <p><SampleFooterNote /></p>
          <span className="mt-2 lg:mt-0 font-mono text-stone-400">
            TAEMUN DEV STUDIO · VIRTUAL SHOWCASE
          </span>
        </div>
      </div>
    </footer>
  );
};
