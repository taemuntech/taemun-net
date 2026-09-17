'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          {/* 로고 및 설명 */}
          <div>
            <div className="flex items-center gap-2 font-mono">
              <span className="flex h-7 w-7 items-center justify-center rounded border border-amber-500/40 bg-amber-500/10 text-xs font-black text-amber-400">
                ST
              </span>
              <span className="text-sm font-black tracking-widest text-white">STRATA MEGA-BUILD</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              초고층 메가 스트럭처 & 지하 대공간 복합 인프라 시공 엔지니어링 솔루션
            </p>
          </div>

          {/* 기술 규격 링크 */}
          <div className="flex flex-wrap gap-4 font-mono text-xs text-slate-500">
            <span>품질·환경 관리 규격(예시)</span>
            <span>·</span>
            <span>BIM 6D 패키지</span>
            <span>·</span>
            <span>KS D 3843 내진강재</span>
            <span>·</span>
            <span>AAMA 동적수밀</span>
          </div>
        </div>

        {/* 법적 및 감사 표준 고지문 */}
        <div className="mt-8 border-t border-slate-800/80 pt-6 text-center">
          <p className="text-xs text-slate-400">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
          <p className="mt-1 font-mono text-[11px] text-slate-600">
            © 2026 STRATA ENGINEERING & CONSTRUCTION. ALL RIGHTS RESERVED. (SAMPLE DEMO)
          </p>
        </div>
      </div>
    </footer>
  );
}
