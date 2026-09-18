'use client';

import React from 'react';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

export default function Footer() {
  return (
    <footer className="w-full border-t border-stone-200 bg-stone-100 py-12 text-stone-600">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-stone-900 font-serif text-xs font-bold text-white">
                A
              </span>
              <span className="font-serif text-sm font-bold tracking-widest text-stone-900">
                ARCHE HOUSE
              </span>
            </div>
            <p className="mt-2 text-xs text-stone-500">
              아르케 건축사사무소 · 하이엔드 주거 및 별서 건축 설계·시공 아틀리에
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-stone-500">
            <span>공인 건축사(KIRA)</span>
            <span>·</span>
            <span>대한건축사협회 정회원</span>
            <span>·</span>
            <span>패시브건축협회 회원(예시)</span>
            <span>·</span>
            <span>한국건축가협회 정회원</span>
          </div>
        </div>

        {/* 감사 표준 고지문 (필수 100% 일치) */}
        <div className="mt-8 border-t border-stone-200 pt-6 text-center">
          <p className="text-xs text-stone-500"><SampleFooterNote /></p>
          <p className="mt-1 font-mono text-[11px] text-stone-400">
            © 2026 ARCHE HOUSE ARCHITECTURAL ATELIER. ALL RIGHTS RESERVED. (SAMPLE DEMO)
          </p>
        </div>
      </div>
    </footer>
  );
}
