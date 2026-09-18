'use client';

import React from 'react';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-950 py-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-500 font-mono text-xs font-black text-neutral-950">
                LM
              </span>
              <span className="font-mono text-sm font-black tracking-widest text-white">
                LUMEN COMMERCIAL BUILD
              </span>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              루멘 빌드 · 성수·한남·연남·도산 도심 꼬마빌딩 신축 &amp; 상업 근린생활시설 건축 솔루션
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs text-neutral-500">
            <span>건축사사무소 개설 등록</span>
            <span>·</span>
            <span>종합건설업 면허 보유</span>
            <span>·</span>
            <span>한국상업건축협회 회원(예시)</span>
            <span>·</span>
            <span>Pre-Leasing 전문팀</span>
          </div>
        </div>

        {/* 감사 표준 고지문 (필수 100% 일치) */}
        <div className="mt-8 border-t border-neutral-800/80 pt-6 text-center">
          <p className="text-xs text-neutral-500"><SampleFooterNote /></p>
          <p className="mt-1 font-mono text-[11px] text-neutral-600">
            © 2026 LUMEN COMMERCIAL BUILD &amp; ARCHITECTS. ALL RIGHTS RESERVED. (SAMPLE DEMO)
          </p>
        </div>
      </div>
    </footer>
  );
}
