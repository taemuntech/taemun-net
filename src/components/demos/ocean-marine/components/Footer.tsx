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
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 font-mono text-xs font-black text-slate-950">
                OM
              </span>
              <span className="font-mono text-sm font-black tracking-widest text-white">
                OCEAN MARINE CIVIL E&amp;C CO.
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              오션마린건설 · 24,000 TEU 스마트 안벽 부두 · 12,000톤 케이슨 방파제 · 해상 준설 매립 종합 해양 토목 솔루션
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs text-slate-500">
            <span>토목공사업 종합건설 면허(예시)</span>
            <span>·</span>
            <span>항만및해안토목 전문건설 면허(예시)</span>
            <span>·</span>
            <span>한국항만협회 기업회원(예시)</span>
            <span>·</span>
            <span>해양 파랑 수치해석 전담 연구소(예시)</span>
          </div>
        </div>

        {/* 감사 표준 고지문 (필수 100% 일치) */}
        <div className="mt-8 border-t border-slate-800/80 pt-6 text-center">
          <p className="text-xs text-slate-500"><SampleFooterNote /></p>
          <p className="mt-1 font-mono text-[11px] text-slate-600">
            © 2026 OCEAN MARINE CIVIL E&amp;C CO. ALL RIGHTS RESERVED. (SAMPLE DEMO)
          </p>
        </div>
      </div>
    </footer>
  );
}
