'use client';

import React from 'react';
import { IVY_COURSES } from '../data/ivyData';

interface CurriculumSectionProps {
  onOpenConsult: (courseTitle?: string) => void;
}

export function CurriculumSection({ onOpenConsult }: CurriculumSectionProps) {
  return (
    <section id="curriculum" className="py-16 lg:py-24 bg-[#120207] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-serif text-amber-400 uppercase tracking-widest block mb-2">
            PRESTIGE PROGRAMS
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-4">
            목표 대학 및 전형별 맞춤 프레스티지 트랙
          </h2>
          <p className="text-sm text-rose-200/70 font-sans">
            보딩스쿨 지원부터 아이비리그 얼리(ED/EA) 및 레귤러(RD) 출원까지 체계적인 1:1 맞춤 로드맵을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {IVY_COURSES.map((course) => (
            <div
              key={course.id}
              className={`p-6 lg:p-8 rounded-3xl flex flex-col justify-between relative transition-all font-serif ${
                course.recommended
                  ? 'bg-[#22050F] border-2 border-amber-500/70 shadow-2xl shadow-rose-950/50'
                  : 'bg-[#1A030A] border border-rose-900/50 hover:border-rose-800'
              }`}
            >
              {course.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-bold text-[10px] shadow-md border border-amber-300">
                  대표 올인원 트랙 (추천)
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-amber-400 block mb-1">
                  {course.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {course.title}
                </h3>
                <div className="text-xs text-rose-300/70 mb-4 font-sans">
                  대상: {course.target}
                </div>

                <div className="space-y-2.5 mb-8 pt-4 border-t border-rose-900/40">
                  <span className="text-[11px] font-bold text-rose-200 block mb-2">
                    주요 관리 프로그램:
                  </span>
                  {course.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-rose-100/80 font-sans">
                      <span className="text-amber-400 shrink-0">✦</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenConsult(course.title)}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all min-h-[44px] cursor-pointer ${
                  course.recommended
                    ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-amber-50 hover:brightness-110 shadow-lg border border-amber-400/40'
                    : 'bg-rose-950 border border-rose-800 text-rose-100 hover:bg-rose-900'
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
