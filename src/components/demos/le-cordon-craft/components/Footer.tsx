'use client';

import React from 'react';
import { Sparkles, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800/80 text-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-stone-900">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-base font-serif font-bold text-stone-100 tracking-wider">
                LE CORDON CRAFT ACADEMY
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                샘플 포트폴리오 (예시)
              </span>
            </div>
            <p className="text-stone-400 text-xs">
              프렌치 정통 제과 기술과 오뜨 꾸뛰르 플로랄 디자인을 교육하는 전문 아카데미입니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-stone-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>서울특별시 강남구 아틀리에길 77 (예시)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>02-0000-0000 (예시)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>contact@example.com (예시)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>
            © {new Date().getFullYear()} Le Cordon Craft Academy. All rights reserved. 본 웹사이트는 데모용 가상 샘플 사이트입니다.
          </p>
          <div className="flex gap-4">
            <span>이용약관 (예시)</span>
            <span>개인정보처리방침 (예시)</span>
            <span>환불규정 안내 (예시)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
