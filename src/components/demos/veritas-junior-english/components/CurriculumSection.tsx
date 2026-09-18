'use client';

import React from 'react';
import { ENGLISH_COURSES } from '../data/veritasData';
import { EnglishCourse } from '../types';

interface CurriculumSectionProps {
  onOpenLevelTest: (courseTitle?: string) => void;
}

export function CurriculumSection({ onOpenLevelTest }: CurriculumSectionProps) {
  return (
    <section id="curriculum" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
            IMMERSION ROADMAP
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-extrabold text-[#0F2942] tracking-tight">
            연령·역량별 3단계 몰입 커리큘럼
          </h2>
          <p className="text-xs lg:text-sm text-slate-600 mt-2">
            기초 리터러시부터 국제학교 수준의 아카데믹 디베이트까지 체계적인 성장을 이끕니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ENGLISH_COURSES.map((course: EnglishCourse) => (
            <div
              key={course.id}
              className={`p-6 lg:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                course.badge
                  ? 'bg-blue-50/40 border-blue-600 shadow-lg ring-1 ring-blue-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                {course.badge && (
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider mb-4">
                    {course.badge}
                  </span>
                )}
                <h3 className="text-lg lg:text-xl font-serif font-bold text-[#0F2942] mb-1">
                  {course.levelName}
                </h3>
                <p className="text-xs text-blue-700 font-semibold mb-3">
                  {course.targetGrade} · {course.lexileRange}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-5">
                  <span className="text-xs text-slate-600 font-mono block">
                    ⏱️ 수업 시수: {course.weeklySchedule}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                  {course.keyOutcomes.map((out, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <span className="text-blue-700 font-bold shrink-0">✓</span>
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenLevelTest(course.levelName)}
                className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer min-h-[44px] flex items-center justify-center ${
                  course.badge
                    ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-md'
                    : 'bg-slate-100 text-[#0F2942] hover:bg-slate-200'
                }`}
              >
                1:1 입학 진단 레벨테스트 신청
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
