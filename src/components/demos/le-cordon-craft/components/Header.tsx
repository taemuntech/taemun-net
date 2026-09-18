'use client';

import React from 'react';
import { Sparkles, UtensilsCrossed, Flower2, PhoneCall, Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
  activeDiscipline: 'patisserie' | 'floral';
  setActiveDiscipline: (d: 'patisserie' | 'floral') => void;
}

export function Header({
  onOpenConsultation,
  activeDiscipline,
  setActiveDiscipline,
}: HeaderProps) {
  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-stone-900/95 backdrop-blur-md border-b border-amber-900/30 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* 브랜딩 로고 */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-400 p-[1.5px] shadow-lg shadow-amber-900/40">
            <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg lg:text-xl font-serif font-bold tracking-wider text-stone-50">
                LE CORDON CRAFT
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-sans">
                ACADEMY (예시)
              </span>
            </div>
            <p className="text-[11px] text-stone-400 font-sans tracking-wide">
              프렌치 하이엔드 파티시에 & 오뜨 꾸뛰르 플라워 아카데미
            </p>
          </div>
        </div>

        {/* 전공 전환 탭 (데스크톱) */}
        <div className="hidden lg:flex items-center bg-stone-950/80 p-1.5 rounded-full border border-stone-800">
          <button
            type="button"
            onClick={() => setActiveDiscipline('patisserie')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium transition-all ${
              activeDiscipline === 'patisserie'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            파티스리 정밀 랩
          </button>
          <button
            type="button"
            onClick={() => setActiveDiscipline('floral')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium transition-all ${
              activeDiscipline === 'floral'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Flower2 className="w-3.5 h-3.5" />
            오뜨 플로랄 아틀리에
          </button>
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center gap-3">
          <a
            href="tel:02-0000-0000"
            className="hidden lg:flex items-center gap-1.5 text-xs text-stone-300 hover:text-amber-400 transition-colors px-3 py-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
            <span>02-0000-0000 (예시)</span>
          </a>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-semibold shadow-md shadow-amber-900/30 transition-all active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>1:1 참관 예약 (예시)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
