'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-950 py-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-cyan-500 to-blue-600 font-mono text-xs font-black text-neutral-950">
                LP
              </span>
              <span className="font-mono text-sm font-black tracking-widest text-white">
                LOGIS PARK CONSTRUCTION
              </span>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              로지스파크 건설 · 수도권 스마트 메가 물류센터 &amp; 초저온 콜드체인 플랜트 턴키 시공
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs text-neutral-500">
            <span>토목건축공사업 종합건설 면허(예시)</span>
            <span>·</span>
            <span>한국물류플랜트시공협회 회원(예시)</span>
            <span>·</span>
            <span>FM1 초평탄 시공 인증(예시)</span>
            <span>·</span>
            <span>친환경 저온 공조 특허(예시)</span>
          </div>
        </div>

        {/* 감사 표준 고지문 (필수 100% 일치) */}
        <div className="mt-8 border-t border-neutral-800/80 pt-6 text-center">
          <p className="text-xs text-neutral-500">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
          <p className="mt-1 font-mono text-[11px] text-neutral-600">
            © 2026 LOGIS PARK CONSTRUCTION CO. ALL RIGHTS RESERVED. (SAMPLE DEMO)
          </p>
        </div>
      </div>
    </footer>
  );
}
