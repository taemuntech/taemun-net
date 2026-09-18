'use client';

import React from 'react';
import { ESSAY_COURSES } from '../data/mmiData';
import { EssayCourse } from '../types';

interface CurriculumSectionProps {
  onOpenConsultation: (courseTitle?: string) => void;
}

export function CurriculumSection({ onOpenConsultation }: CurriculumSectionProps) {
  return (
    <section id="curriculum" className="py-20 lg:py-28 bg-[#161922] border-t border-[#242A38]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block mb-2">
            PREMIUM TRACKS
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-extrabold text-white tracking-tight">
            합격을 완성하는 논술 &amp; MMI 전문 트랙
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 mt-2">
            대학별 기출 분석과 1:1 대면 첨삭으로 실전 합격선을 뛰어넘는 논증력을 구축합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ESSAY_COURSES.map((course: EssayCourse) => (
            <div
              key={course.id}
              className={`p-6 lg:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                course.recommended
                  ? 'bg-gradient-to-b from-[#1E2332] to-[#141722] border-rose-500/50 shadow-xl shadow-rose-600/10'
                  : 'bg-[#12141A] border-[#222938] hover:border-slate-700'
              }`}
            >
              <div>
                {course.recommended && (
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-lg lg:text-xl font-serif font-bold text-white mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-rose-400 font-semibold mb-3">
                  대상: {course.target}
                </p>

                <div className="p-3 bg-[#0E1015] rounded-xl border border-slate-800 mb-5">
                  <span className="text-xs text-slate-400 font-mono block">
                    ⏱️ 수업 시수: {course.schedule}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800 mb-8">
                  {course.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-rose-400 font-bold shrink-0">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation(course.title)}
                className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer min-h-[44px] flex items-center justify-center ${
                  course.recommended
                    ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white hover:brightness-110 shadow-lg shadow-rose-600/20'
                    : 'bg-[#1D2332] text-slate-200 hover:text-white hover:bg-[#252D40]'
                }`}
              >
                1:1 진단 및 모의평가 신청
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
