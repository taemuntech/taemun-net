'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 font-mono text-xs font-black text-slate-950">
                AQ
              </span>
              <span className="font-mono text-sm font-black tracking-widest text-white">
                AQUA INFRA E&amp;C CO.
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              아쿠아인프라엔지니어링 · 대용량 상수도 · 지하화 복합 하수처리장 · 대심도 빗물 배수터널 종합 수자원 토목 솔루션
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs text-slate-500">
            <span>토목공사업 종합건설 면허(예시)</span>
            <span>·</span>
            <span>상하수도설비 전문건설 면허(예시)</span>
            <span>·</span>
            <span>환경부 녹색기술 인증(예시)</span>
            <span>·</span>
            <span>수질 텔레메트리 원격 관제(예시)</span>
          </div>
        </div>

        {/* 감사 표준 고지문 (필수 100% 일치) */}
        <div className="mt-8 border-t border-slate-800/80 pt-6 text-center">
          <p className="text-xs text-slate-500">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
          <p className="mt-1 font-mono text-[11px] text-slate-600">
            © 2026 AQUA INFRA E&amp;C CO. ALL RIGHTS RESERVED. (SAMPLE DEMO)
          </p>
        </div>
      </div>
    </footer>
  );
}
