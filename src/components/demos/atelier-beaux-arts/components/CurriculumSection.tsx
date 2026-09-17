'use client';

import React from 'react';
import { ART_COURSES } from '../data/beauxArtsData';

interface CurriculumSectionProps {
  onOpenEvaluation: () => void;
}

export function CurriculumSection({ onOpenEvaluation }: CurriculumSectionProps) {
  return (
    <section id="courses-section" className="py-20 lg:py-28 bg-[#12141A] border-b border-[#2A303C] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#38BDF8] block mb-2">
            Target Admissions Program
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-4">
            목표 대학군별 맞춤 실기 커리큘럼
          </h2>
          <p className="text-sm lg:text-base text-[#94A3B8] leading-relaxed">
            대학별 출제 경향과 평가 배점 구조에 최적화된 1:1 도제식 실기 지도로 합격 가능성을 최고조로 끌어올립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ART_COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-[#1A1D24] border border-[#2A303C] rounded-3xl p-6 lg:p-8 flex flex-col justify-between hover:border-[#38BDF8]/60 transition-all duration-300 group shadow-lg"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 rounded bg-[#1E293B] border border-[#334155] text-xs font-semibold text-[#38BDF8]">
                    {course.target}
                  </span>
                  <span className="text-xs text-[#64748B] font-mono">{course.schedule}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#38BDF8] transition-colors mb-3">
                  {course.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="space-y-2 mb-8 p-4 rounded-2xl bg-[#12141A] border border-[#2A303C]">
                  {course.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                      <span className="text-[#38BDF8]">✦</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenEvaluation}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white font-semibold text-xs hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow"
              >
                1:1 맞춤 진단 및 실기 상담 예약
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
