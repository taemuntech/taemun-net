'use client';
import React from 'react';
import { SHOWROOM_BRAND } from '../data/showroomData';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  return (
    <footer className="bg-[#0b0c0e] text-stone-400 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-stone-200 text-[#121316] flex items-center justify-center font-serif font-black text-base">
                AM
              </div>
              <span className="font-serif tracking-widest text-base font-bold text-white uppercase">
                {SHOWROOM_BRAND.name}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              {SHOWROOM_BRAND.tagline}
            </p>
            <p className="text-xs text-stone-500 font-mono">
              © 2025 {SHOWROOM_BRAND.name}. All rights reserved.
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs font-mono">
            <div className="space-y-2">
              <span className="text-amber-400 uppercase tracking-wider block text-[11px]">
                STUDIO & SHOWROOM
              </span>
              <p className="text-stone-300">{SHOWROOM_BRAND.address}</p>
              <p className="text-stone-400">{SHOWROOM_BRAND.workingHours}</p>
            </div>

            <div className="space-y-2">
              <span className="text-amber-400 uppercase tracking-wider block text-[11px]">
                CONTACT & INQUIRY
              </span>
              <p className="text-stone-300">TEL: {SHOWROOM_BRAND.phone}</p>
              <p className="text-stone-300">MAIL: {SHOWROOM_BRAND.email}</p>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="text-amber-400 hover:text-amber-300 underline pt-1 inline-flex items-center max-lg:min-h-11"
              >
                1:1 프로젝트 상담 예약하기 →
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between text-[11px] text-stone-400 font-light">
          <p><SampleFooterNote /></p>
          <span className="mt-2 lg:mt-0 font-mono">TAEMUN.NET · VIRTUAL SHOWCASE</span>
        </div>
      </div>
    </footer>
  );
};
