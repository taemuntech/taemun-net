'use client';

import React from 'react';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-cyan-400 to-blue-600 font-mono text-xs font-black text-slate-950">
                GF
              </span>
              <span className="font-mono text-sm font-black tracking-widest text-white">
                GEO FOUNDATION CO.
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              지오파운데이션 · 대심도 흙막이 · 지하연속벽(D-Wall) · RCD 특수기초 · 초고압 지반개량
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs text-slate-500">
            <span>보링그라우팅 전문건설 면허(예시)</span>
            <span>·</span>
            <span>토공사업 전문건설 면허(예시)</span>
            <span>·</span>
            <span>대한토질및기초기술사회 기업회원(예시)</span>
            <span>·</span>
            <span>3D 지반변위 자동화 계측(예시)</span>
          </div>
        </div>

        {/* 감사 표준 고지문 (필수 100% 일치) */}
        <div className="mt-8 border-t border-slate-800/80 pt-6 text-center">
          <p className="text-xs text-slate-500"><SampleFooterNote /></p>
          <p className="mt-1 font-mono text-[11px] text-slate-600">
            © 2026 GEO FOUNDATION CO. ALL RIGHTS RESERVED. (SAMPLE DEMO)
          </p>
        </div>
      </div>
    </footer>
  );
}
