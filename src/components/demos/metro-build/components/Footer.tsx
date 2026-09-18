'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-indigo-700 font-mono text-xs font-black text-white">
                MB
              </span>
              <span className="font-mono text-sm font-black tracking-widest text-white">
                METRO BUILD
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              메트로종합건설 · 도심 프라임 기업 본사 사옥 &amp; 첨단 지식산업센터 턴키 시공 솔루션
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs text-slate-500">
            <span>건축공사업 종합건설 면허(예시)</span>
            <span>·</span>
            <span>토목건축공사업 등록(예시)</span>
            <span>·</span>
            <span>품질·환경 경영인증(예시)</span>
            <span>·</span>
            <span>스마트 BIM 4D 관제 시스템(예시)</span>
          </div>
        </div>

        {/* 감사 표준 고지문 (필수 100% 일치) */}
        <div className="mt-8 border-t border-slate-800/80 pt-6 text-center">
          <p className="text-xs text-neutral-500">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
          <p className="mt-1 font-mono text-[11px] text-slate-600">
            © 2026 METRO BUILD GENERAL CONTRACTING CO. ALL RIGHTS RESERVED. (SAMPLE DEMO)
          </p>
        </div>
      </div>
    </footer>
  );
}
