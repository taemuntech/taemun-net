'use client';

import React from 'react';
import { ATHLETIC_COURSES } from '../data/athleticData';

interface CurriculumSectionProps {
  onOpenConsult: (courseTitle?: string) => void;
}

export function CurriculumSection({ onOpenConsult }: CurriculumSectionProps) {
  return (
    <section id="curriculum" className="py-16 lg:py-24 bg-[#080D18] text-white font-mono">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs text-lime-400 uppercase tracking-widest block mb-2">
            ELITE TRAINING TRACKS
          </span>
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
            목표 대학별 스파르타 실기 훈련 프로그램
          </h2>
          <p className="text-sm text-zinc-400 font-sans">
            기초 체력 증진부터 고난도 전공 실기 종목, 수능 맞춤형 컨디셔닝까지 완벽한 합격 솔루션을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ATHLETIC_COURSES.map((course) => (
            <div
              key={course.id}
              className={`p-6 lg:p-8 rounded-3xl flex flex-col justify-between relative transition-all ${
                course.recommended
                  ? 'bg-[#101A30] border-2 border-lime-500 shadow-2xl shadow-lime-500/10'
                  : 'bg-[#0D1526] border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {course.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 font-bold text-[10px] shadow-md">
                  최상위권 대표 트랙 (추천)
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-lime-400 block mb-1">
                  {course.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {course.title}
                </h3>
                <div className="text-xs text-zinc-400 mb-4 font-sans">
                  대상: {course.target}
                </div>

                <div className="space-y-2 mb-8 pt-4 border-t border-zinc-800">
                  <span className="text-[11px] font-bold text-zinc-300 block mb-2">
                    주요 트레이닝 모듈:
                  </span>
                  {course.curriculum.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                      <span className="text-lime-400 shrink-0">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenConsult(course.title)}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all min-h-[44px] cursor-pointer ${
                  course.recommended
                    ? 'bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 hover:brightness-110 shadow-lg'
                    : 'bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800'
                }`}
              >
                {course.title} 훈련 상담 신청
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
