'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenLevelTest: () => void;
  onScrollToLibrary: () => void;
}

export function HeroSection({ onOpenLevelTest, onScrollToLibrary }: HeroSectionProps) {
  return (
    <section id="hero" className="relative pt-20 pb-20 lg:pt-28 lg:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>AMERICAN CURRICULUM &amp; LEXILE BOOK CLUB</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-serif font-extrabold text-[#0F2942] tracking-tight leading-tight mb-6">
            단순 암기를 넘어<br />
            <span className="text-blue-700">원서로 생각하고 토론하는</span><br />
            영미 명문 주니어 리터러시
          </h1>

          <p className="text-sm lg:text-base text-slate-600 leading-relaxed mb-10">
            유치부 파닉스부터 초등 렉사일 1100L 아카데믹 디베이트까지.<br className="hidden lg:inline" />
            미국 사립학교 정규 원서 도서관과 AI 음성 스피킹 정밀 진단 시스템으로 글로벌 인재의 언어적 직관을 완성합니다.
          </p>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-16">
            <button
              onClick={onScrollToLibrary}
              className="px-6 py-4 rounded-xl bg-[#0F2942] hover:bg-blue-900 text-white font-bold text-sm shadow-xl shadow-blue-950/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>📚</span>
              <span>렉사일 인터랙티브 가상 서재 둘러보기</span>
            </button>
            <button
              onClick={onOpenLevelTest}
              className="px-6 py-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-[#0F2942] font-bold text-sm active:scale-95 transition-all flex items-center justify-center cursor-pointer min-h-[44px] shadow-sm"
            >
              1:1 원어민 인터뷰 레벨테스트 신청
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#0F2942]">200L~1100L</p>
              <p className="text-xs text-slate-500 mt-1">렉사일 지수 맞춤 도서관</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-blue-700">소수정예</p>
              <p className="text-xs text-slate-500 mt-1">정원 6인 이하 원어민 담임</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#0F2942]">AI 음성 랩</p>
              <p className="text-xs text-slate-500 mt-1">발음·유창성 정밀 진단</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-blue-700">원서 중심</p>
              <p className="text-xs text-slate-500 mt-1">연간 100권 독서 클럽 (예시)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
