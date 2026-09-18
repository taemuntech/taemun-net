'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-[#f5efe6] text-[#6e5d50] border-t border-[#ebdcd0]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#d27952] flex items-center justify-center text-white font-serif font-bold text-sm">
                A
              </div>
              <span className="font-serif text-lg font-bold text-[#2d221b] tracking-widest uppercase">
                ARCHE WELLNESS
              </span>
            </div>
            <p className="text-xs text-[#6e5d50] leading-relaxed max-w-md font-light mb-4">
              아르케 웰니스는 한남·청담의 1:1 VIP 필라테스 & 스파 인테리어 디자인 스튜디오의 가상 포트폴리오 웹사이트입니다.
            </p>
            <div className="text-[11px] font-mono text-[#8a7566] space-y-1">
              <p>주소: 서울특별시 용산구 한남대로 (가상 스튜디오)</p>
              <p>문의: 02-0000-0000 · contact@example.com</p>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <span className="text-xs font-mono text-[#b8613d] font-bold uppercase block mb-4">
              STUDIO ATELIER
            </span>
            {/* 링크마다 min-h-11 — 모바일에서 손가락이 닿는 면을 44px 로 맞춘다. */}
            <ul className="text-xs">
              <li>
                <a
                  href="#zones"
                  className="inline-flex min-h-11 items-center hover:text-[#d27952] transition-colors"
                >
                  스튜디오 3대 룸
                </a>
              </li>
              <li>
                <a
                  href="#telemetry"
                  className="inline-flex min-h-11 items-center hover:text-[#d27952] transition-colors"
                >
                  클린 에어 텔레메트리 HUD
                </a>
              </li>
              <li>
                <a
                  href="#materials"
                  className="inline-flex min-h-11 items-center hover:text-[#d27952] transition-colors"
                >
                  친환경 자재 아카이브
                </a>
              </li>
            </ul>
          </div>

          {/* Agency Link */}
          <div className="lg:col-span-3">
            <span className="text-xs font-mono text-[#b8613d] font-bold uppercase block mb-4">
              PRODUCED BY
            </span>
            <p className="text-xs text-[#6e5d50] mb-3 leading-relaxed">
              본 포트폴리오 사이트와 동일한 수준의 필라테스·웰니스 맞춤형 웹사이트 제작을 원하시면 문의해 주세요.
            </p>
            <Link
              href="/inquiry?from=arche-wellness"
              className="inline-flex min-h-11 items-center px-4 py-2 rounded-lg bg-[#d27952]/10 hover:bg-[#d27952]/20 text-[#b8613d] border border-[#d27952]/30 text-xs font-semibold transition-all"
            >
              태문 DEV STUDIO에 제작 의뢰 ↗
            </Link>
          </div>
        </div>

        {/* Standard Disclaimer Notice */}
        <div className="pt-8 border-t border-[#ebdcd0] text-center">
          <p className="text-xs text-[#8a7566] font-medium">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
          <p className="text-[11px] text-[#a49182] font-mono mt-1">
            © 2026 ARCHE WELLNESS SPATIAL STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
