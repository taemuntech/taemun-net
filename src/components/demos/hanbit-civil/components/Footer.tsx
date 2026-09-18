'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-950 py-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-amber-500 to-orange-600 font-mono text-xs font-black text-neutral-950">
                HB
              </span>
              <span className="font-mono text-sm font-black tracking-widest text-white">
                HANBIT CIVIL E&amp;C
              </span>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              한빛토목이앤씨 · 고속도로 · 해상 장대교량 · 대심도 철도 터널 종합 토목 솔루션
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs text-neutral-500">
            <span>토목공사업 종합건설 면허(예시)</span>
            <span>·</span>
            <span>한국도로공사 우수시공사 표창(예시)</span>
            <span>·</span>
            <span>대한토목학회 기업회원(예시)</span>
            <span>·</span>
            <span>스마트 인프라 안전 계측(예시)</span>
          </div>
        </div>

        {/* 감사 표준 고지문 (필수 100% 일치) */}
        <div className="mt-8 border-t border-neutral-800/80 pt-6 text-center">
          <p className="text-xs text-neutral-500">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
          <p className="mt-1 font-mono text-[11px] text-neutral-600">
            © 2026 HANBIT CIVIL E&amp;C CO. ALL RIGHTS RESERVED. (SAMPLE DEMO)
          </p>
        </div>
      </div>
    </footer>
  );
}
