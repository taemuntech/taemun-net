'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-stone-800 bg-stone-950 py-12 text-stone-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 font-mono text-xs font-black text-stone-950">
                ST
              </span>
              <span className="font-mono text-sm font-black tracking-widest text-white">
                SEJONG TERRA CIVIL E&amp;C CO.
              </span>
            </div>
            <p className="mt-2 text-xs text-stone-500">
              세종테라개발 · 100만평 스마트 산업단지 조성 · 3D 디지털 토공 · 4련 지하 공동구 종합 단지토목 솔루션
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs text-stone-500">
            <span>토목공사업 종합건설 면허(예시)</span>
            <span>·</span>
            <span>토공사업 전문건설 면허(예시)</span>
            <span>·</span>
            <span>스마트건설 머신가이던스 혁신기업(예시)</span>
            <span>·</span>
            <span>드론 3D 정밀 지형 측량(예시)</span>
          </div>
        </div>

        {/* 감사 표준 고지문 (필수 100% 일치) */}
        <div className="mt-8 border-t border-stone-800/80 pt-6 text-center">
          <p className="text-xs text-stone-500">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
          <p className="mt-1 font-mono text-[11px] text-stone-600">
            © 2026 SEJONG TERRA CIVIL E&amp;C CO. ALL RIGHTS RESERVED. (SAMPLE DEMO)
          </p>
        </div>
      </div>
    </footer>
  );
}
