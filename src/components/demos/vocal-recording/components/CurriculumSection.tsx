'use client';

import React from 'react';
import { VOCAL_COURSES } from '../data/vocalData';
import { VocalCourse } from '../types';

interface CurriculumSectionProps {
  onOpenBooking: (courseTitle?: string) => void;
}

export function CurriculumSection({ onOpenBooking }: CurriculumSectionProps) {
  return (
    <section id="curriculum" className="py-20 lg:py-28 bg-[#0B0C10]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest block mb-2">
            SPECIALIZED MASTER TRACKS
          </span>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight">
            목표별 맞춤 보컬 &amp; 프로덕션 커리큘럼
          </h2>
          <p className="text-xs lg:text-sm text-zinc-400 mt-2">
            단순 취미 가창을 넘어 오디션 현장과 입시 실기장에서 통하는 차별화된 보컬 테크닉을 전수합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {VOCAL_COURSES.map((course: VocalCourse) => (
            <div
              key={course.id}
              className={`p-6 lg:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                course.recommended
                  ? 'bg-gradient-to-b from-[#181D29] to-[#121620] border-pink-500/50 shadow-xl shadow-pink-500/10'
                  : 'bg-[#121620] border-[#222B3A] hover:border-[#323E54]'
              }`}
            >
              <div>
                {course.recommended && (
                  <span className="inline-block px-3 py-1 rounded-full bg-pink-500 text-white text-[10px] font-bold uppercase tracking-wider mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-xs text-pink-400 font-medium mb-4">
                  대상: {course.target}
                </p>
                <div className="p-3 bg-[#0B0D13] rounded-xl border border-[#202736] mb-6">
                  <span className="text-xs text-zinc-400 block font-mono">
                    {course.duration}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#202736] mb-8">
                  {course.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                      <span className="text-pink-400 font-bold shrink-0">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenBooking(course.title)}
                className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer min-h-[44px] flex items-center justify-center ${
                  course.recommended
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 hover:brightness-110'
                    : 'bg-[#1E2534] text-zinc-200 hover:text-white hover:bg-[#283246]'
                }`}
              >
                1:1 실기 심사 및 상담 신청
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
