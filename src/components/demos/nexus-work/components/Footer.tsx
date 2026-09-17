'use client';

import React from 'react';
import { WORK_BRAND } from '../data/workData';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  return (
    <footer className="bg-[#08090d] text-zinc-400 py-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-mono font-black text-sm">
                NW
              </div>
              <span className="font-mono tracking-wider text-base font-bold text-white uppercase">
                {WORK_BRAND.name}
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              {WORK_BRAND.tagline}
            </p>
            <p className="text-xs text-zinc-500 font-mono">
              © 2026 {WORK_BRAND.name}. All rights reserved.
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs font-mono">
            <div className="space-y-2">
              <span className="text-cyan-400 uppercase tracking-wider block text-[11px]">
                STUDIO LOCATION
              </span>
              <p className="text-zinc-300 font-light">{WORK_BRAND.address}</p>
              <p className="text-zinc-400 font-light">{WORK_BRAND.businessHours}</p>
            </div>

            <div className="space-y-2">
              <span className="text-cyan-400 uppercase tracking-wider block text-[11px]">
                PROJECT CONSULTING
              </span>
              <p className="text-zinc-300 font-light">TEL: {WORK_BRAND.phone}</p>
              <p className="text-zinc-300 font-light">MAIL: {WORK_BRAND.email}</p>
              <button
                onClick={onOpenConsultation}
                className="text-cyan-400 hover:text-cyan-300 underline pt-1 block text-left"
              >
                1:1 오피스 시공 실측 신청하기 →
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/80 flex flex-col lg:flex-row items-center justify-between text-[11px] text-zinc-500 font-light">
          <p>
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
          <span className="mt-2 lg:mt-0 font-mono text-zinc-500">
            TAEMUN DEV STUDIO · VIRTUAL SHOWCASE
          </span>
        </div>
      </div>
    </footer>
  );
};
