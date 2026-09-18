'use client';

import React from 'react';
import { MATH_COURSES } from '../data/eulerData';
import { MathCourse } from '../types';

interface CurriculumSectionProps {
  onOpenDiagnostic: (courseTitle?: string) => void;
}

export function CurriculumSection({ onOpenDiagnostic }: CurriculumSectionProps) {
  return (
    <section id="curriculum" className="py-20 lg:py-28 bg-[#0F1420] border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">
            ACADEMIC CURRICULUM
          </span>
          <h2 className="text-2xl lg:text-4xl font-mono font-extrabold text-white tracking-tight">
            올림피아드 &amp; 영재원 전문 커리큘럼
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 mt-2">
            단순 선행을 지양하고 본질적 수학 개념의 유도와 엄밀한 증명에 집중합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MATH_COURSES.map((course: MathCourse) => (
            <div
              key={course.id}
              className={`p-6 lg:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                course.recommended
                  ? 'bg-gradient-to-b from-[#162032] to-[#101724] border-cyan-500/50 shadow-xl shadow-cyan-500/10'
                  : 'bg-[#121824] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {course.recommended && (
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider mb-4">
                    MOST RECOMMENDED
                  </span>
                )}
                <h3 className="text-lg lg:text-xl font-mono font-bold text-white mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-cyan-400 font-semibold mb-3">
                  대상: {course.target}
                </p>

                <div className="p-3 bg-[#0A0D14] rounded-xl border border-slate-800 mb-5">
                  <span className="text-xs text-slate-400 font-mono block">
                    ⏱️ 수업 시수: {course.schedule}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800 mb-8">
                  {course.curriculum.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold shrink-0">&bull;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenDiagnostic(course.title)}
                className={`w-full py-3.5 rounded-xl text-xs font-mono font-bold transition-all active:scale-95 cursor-pointer min-h-[44px] flex items-center justify-center ${
                  course.recommended
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/20'
                    : 'bg-[#1C2538] text-slate-200 hover:text-white hover:bg-[#26334D]'
                }`}
              >
                1:1 입학 진단평가 신청
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
