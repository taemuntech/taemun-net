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
              <span className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-cyan-500 to-blue-600 font-mono text-xs font-black text-neutral-950">
                RT
              </span>
              <span className="font-mono text-sm font-black tracking-widest text-white">
                RENEWAL TECH
              </span>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              리뉴얼테크 · 도심 노후 빌딩 대수선 &amp; 탄소섬유 내진 보강 및 에너지 세이빙 밸류애드 솔루션
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs text-neutral-500">
            <span>건축사사무소 개설 등록</span>
            <span>·</span>
            <span>시설물유지관리업 및 대수선 전문건설업(예시)</span>
            <span>·</span>
            <span>구조안전기술사 자격 협력(예시)</span>
            <span>·</span>
            <span>친환경 BEMS 인증(예시)</span>
          </div>
        </div>

        {/* 감사 표준 고지문 (필수 100% 일치) */}
        <div className="mt-8 border-t border-neutral-800/80 pt-6 text-center">
          <p className="text-xs text-neutral-500"><SampleFooterNote /></p>
          <p className="mt-1 font-mono text-[11px] text-neutral-600">
            © 2026 RENEWAL TECH BUILDING RETROFIT &amp; VALUE-ADD. ALL RIGHTS RESERVED. (SAMPLE DEMO)
          </p>
        </div>
      </div>
    </footer>
  );
}
