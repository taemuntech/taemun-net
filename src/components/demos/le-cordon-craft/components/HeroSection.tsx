'use client';

import React from 'react';
import { Award, Sparkles, ChefHat, Flower, Compass, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onScrollToStudio: () => void;
}

export function HeroSection({ onOpenConsultation, onScrollToStudio }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-stone-950 text-stone-100 py-16 lg:py-24 border-b border-stone-800">
      {/* 배경 장식 그라데이션 */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-600/30 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-emerald-700/25 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 좌측: 타이포그래피 & 소개 */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-900/40 border border-amber-700/40 text-amber-300 text-xs font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>프랑스 정통 제과 & 오뜨 꾸뛰르 플로리스트 디렉터 양성 (예시)</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-serif font-bold text-stone-50 leading-[1.25] tracking-tight">
              미식의 미학과 식물의 생명력,
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                프렌치 하이엔드 아틀리에의 품격
              </span>
            </h1>

            <p className="text-stone-300 text-sm lg:text-base leading-relaxed max-w-2xl font-light">
              발로나 그랑 크뤼 카카오의 1°C 정밀 템퍼링부터,
              프랑스 남부 정원의 바람을 담아낸 스파이럴 플로랄 아키텍처까지.
              풍부한 현장 실무 경험을 지닌 마스터 셰프 및 수석 플로리스트와 함께 당신만의 예술적 시그니처를 완성하십시오.
            </p>

            {/* 3대 핵심 지표 (예시 표기) */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-800/80">
              <div className="bg-stone-900/70 p-4 rounded-xl border border-stone-800">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <ChefHat className="w-4 h-4" />
                  <span className="text-[11px] text-stone-400 font-sans">실습 비율 (예시)</span>
                </div>
                <div className="text-xl lg:text-2xl font-serif font-bold text-stone-100">
                  92% <span className="text-xs text-amber-400/80 font-sans">(예시)</span>
                </div>
                <p className="text-[10px] text-stone-400 mt-1">1인 1실습 독립 워크스테이션</p>
              </div>

              <div className="bg-stone-900/70 p-4 rounded-xl border border-stone-800">
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <Flower className="w-4 h-4" />
                  <span className="text-[11px] text-stone-400 font-sans">클래스 정원 (예시)</span>
                </div>
                <div className="text-xl lg:text-2xl font-serif font-bold text-stone-100">
                  최대 6인 <span className="text-xs text-emerald-400/80 font-sans">(예시)</span>
                </div>
                <p className="text-[10px] text-stone-400 mt-1">소수정예 밀착 도제식 테크닉 코칭</p>
              </div>

              <div className="bg-stone-900/70 p-4 rounded-xl border border-stone-800">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[11px] text-stone-400 font-sans">수료 후 창업·취업 (예시)</span>
                </div>
                <div className="text-xl lg:text-2xl font-serif font-bold text-stone-100">
                  88.4% <span className="text-xs text-amber-400/80 font-sans">(예시)</span>
                </div>
                <p className="text-[10px] text-stone-400 mt-1">디플로마 취득 및 메뉴 컨설팅</p>
              </div>
            </div>

            {/* CTA 버튼 그룹 */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onScrollToStudio}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-medium text-sm shadow-xl shadow-amber-950/50 transition-all active:scale-[0.98]"
              >
                <span>인터랙티브 스튜디오 체험</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenConsultation}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-medium text-sm transition-all"
              >
                <span>1:1 프라이빗 입학 상담 신청 (예시)</span>
              </button>
            </div>
          </div>

          {/* 우측: 시그니처 비주얼 쇼케이스 카드 */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-800/40 bg-gradient-to-b from-stone-900 to-stone-950 shadow-2xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-mono text-amber-300">STUDIO TELEMETRY LAB (예시)</span>
                </div>
                <span className="text-[11px] text-stone-400">파리 본원 커리큘럼 라이선스 (예시)</span>
              </div>

              {/* 시그니처 프렌치 무드 이미지 & 오버레이 */}
              <div className="relative h-64 rounded-xl overflow-hidden border border-stone-800 group">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&auto=format&fit=crop&q=80"
                  alt="프렌치 파티시에 아틀리에 (예시)"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-stone-100">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-600/80 text-white">
                    Master Class (예시)
                  </span>
                  <h4 className="text-base font-serif font-bold text-stone-100 mt-1">
                    정통 쇼콜라 템퍼링 & 미러 글라사주
                  </h4>
                  <p className="text-xs text-stone-300 font-light mt-0.5">
                    온도 편차 ±0.5°C 이내 항온 정밀 제어 시스템
                  </p>
                </div>
              </div>

              {/* 하단 미니 상태 바 */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>쇼콜라 결정화 안정성 (Type V) (예시)</span>
                  <span className="text-amber-400 font-mono">99.8% (예시)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full w-[99%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
