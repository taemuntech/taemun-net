'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-[#14100e] text-[#a89888] border-t border-[#382f29]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#3d2f25] border border-[#6b5545] flex items-center justify-center text-[#f4ede2] font-serif font-bold text-sm">
                靜
              </div>
              <span className="font-serif text-lg font-bold text-[#f4ede2] tracking-widest">
                정림다원 (靜林茶院)
              </span>
            </div>
            <p className="text-xs text-[#a89888] leading-relaxed max-w-md font-light mb-4 break-keep">
              정림다원은 북촌·서촌의 전통 고택 건축 미학과 현대적 다도 문화를 결합한 한옥 공간 디자인 아틀리에의 가상 포트폴리오 웹사이트입니다.
            </p>
            <div className="text-[11px] font-mono text-[#8a7566] space-y-1">
              <p>주소: 서울특별시 종로구 북촌로 (가상 스튜디오)</p>
              <p>문의: 02-0000-0000 · contact@example.com</p>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <span className="text-xs font-mono text-[#d8b896] font-bold uppercase block mb-4">
              HANOK ATELIER
            </span>
            {/* 손가락으로 누르는 링크라 44px 높이를 확보한다(글자 크기는 그대로) */}
            <ul className="text-xs">
              <li>
                <a
                  href="#zones"
                  className="inline-flex items-center min-h-11 hover:text-[#f4ede2] transition-colors break-keep"
                >
                  한옥 3대 다도 공간
                </a>
              </li>
              <li>
                <a
                  href="#pairing"
                  className="inline-flex items-center min-h-11 hover:text-[#f4ede2] transition-colors break-keep"
                >
                  날씨 &amp; 차 앰비언스 HUD
                </a>
              </li>
              <li>
                <a
                  href="#materials"
                  className="inline-flex items-center min-h-11 hover:text-[#f4ede2] transition-colors break-keep"
                >
                  전통 고재 자재 아카이브
                </a>
              </li>
            </ul>
          </div>

          {/* Agency Link */}
          <div className="lg:col-span-3">
            <span className="text-xs font-mono text-[#d8b896] font-bold uppercase block mb-4">
              PRODUCED BY
            </span>
            <p className="text-xs text-[#a89888] mb-3 leading-relaxed break-keep">
              본 포트폴리오 사이트와 동일한 수준의 한옥·다도 문화 맞춤형 웹사이트 제작을 원하시면 문의해 주세요.
            </p>
            <Link
              href="/inquiry?from=jeonglim-tea"
              className="inline-flex items-center min-h-11 px-4 py-2 rounded-lg bg-[#6b5545]/20 hover:bg-[#6b5545]/30 text-[#d8b896] border border-[#6b5545]/40 text-xs font-semibold transition-all break-keep"
            >
              태문 DEV STUDIO에 제작 의뢰 ↗
            </Link>
          </div>
        </div>

        {/* Standard Disclaimer Notice */}
        <div className="pt-8 border-t border-[#261f1a] text-center">
          <p className="text-xs text-[#8a7566] font-medium break-keep">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
          <p className="text-[11px] text-[#5e4f44] font-mono mt-1">
            © 2026 JEONGLIM TEA HOUSE SPATIAL ATELIER. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
