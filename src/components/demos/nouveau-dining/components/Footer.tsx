'use client';

import React from 'react';
import Link from 'next/link';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-stone-950 text-stone-400 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center text-stone-950 font-serif font-bold text-sm">
                N
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-widest uppercase">
                NOUVEAU DINING
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md font-light mb-4 break-keep">
              누보 다이닝은 성수·청담의 미식과 공간을 결합한 하이엔드 F&B 인테리어 디자인 스튜디오의 가상 포트폴리오 웹사이트입니다.
            </p>
            <div className="text-[11px] font-mono text-stone-500 space-y-1">
              <p>주소: 서울특별시 성동구 성수이로 (가상 스튜디오)</p>
              <p>문의: 02-0000-0000 · contact@example.com</p>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase block mb-4">
              SPATIAL ATELIER
            </span>
            <ul className="text-xs">
              <li>
                <a
                  href="#zones"
                  className="flex min-h-11 items-center hover:text-amber-300 transition-colors"
                >
                  공간 조닝 3대 영역
                </a>
              </li>
              <li>
                <a
                  href="#lighting"
                  className="flex min-h-11 items-center hover:text-amber-300 transition-colors"
                >
                  조도 & 앰비언스 시뮬레이션
                </a>
              </li>
              <li>
                <a
                  href="#materials"
                  className="flex min-h-11 items-center hover:text-amber-300 transition-colors"
                >
                  프리미엄 마감재 아카이브
                </a>
              </li>
            </ul>
          </div>

          {/* Agency Link */}
          <div className="lg:col-span-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase block mb-4">
              PRODUCED BY
            </span>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              본 포트폴리오 사이트와 동일한 수준의 F&B 맞춤형 웹사이트 제작을 원하시면 문의해 주세요.
            </p>
            <Link
              href="/inquiry?from=nouveau-dining"
              className="inline-flex min-h-11 items-center px-4 py-2 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold transition-all"
            >
              태문 DEV STUDIO에 제작 의뢰 ↗
            </Link>
          </div>
        </div>

        {/* Standard Disclaimer Notice */}
        <div className="pt-8 border-t border-stone-900 text-center">
          <p className="text-xs text-stone-500 font-medium"><SampleFooterNote /></p>
          <p className="text-[11px] text-stone-600 font-mono mt-1">
            © 2026 NOUVEAU DINING SPATIAL STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
