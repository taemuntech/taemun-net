'use client';

import React from 'react';
import { LEET_CPA_COURSES } from '../data/leetData';

interface CurriculumSectionProps {
  onOpenConsult: (courseTitle?: string) => void;
}

export function CurriculumSection({ onOpenConsult }: CurriculumSectionProps) {
  return (
    <section id="curriculum" className="py-16 lg:py-24 bg-[#070B13] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-serif text-amber-400 uppercase tracking-widest block mb-2">
            SPARTAN PROGRAMS
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-4">
            전문직 합격을 위한 단계별 스파르타 트랙
          </h2>
          <p className="text-sm text-zinc-400 font-sans">
            논리학 기초부터 기출 전 문항 심층 해체, 1:1 서면 첨삭까지 완벽한 순환 관리 시스템을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {LEET_CPA_COURSES.map((course) => (
            <div
              key={course.id}
              className={`p-6 lg:p-8 rounded-3xl flex flex-col justify-between relative transition-all font-serif ${
                course.recommended
                  ? 'bg-[#101A30] border-2 border-amber-500 shadow-2xl shadow-amber-950/40'
                  : 'bg-[#0D1526] border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {course.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-[10px] shadow-md">
                  고득점 완성 대표반 (추천)
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-amber-400 block mb-1">
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
                    주요 커리큘럼 모듈:
                  </span>
                  {course.curriculum.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                      <span className="text-amber-400 shrink-0">✓</span>
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
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-lg'
                    : 'bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800'
                }`}
              >
                {course.title} 상담 신청하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
