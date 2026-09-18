'use client';

import React from 'react';
import { BALLET_COURSES } from '../data/balletData';

interface CurriculumSectionProps {
  onOpenAudition: () => void;
}

export function CurriculumSection({ onOpenAudition }: CurriculumSectionProps) {
  return (
    <section id="courses-section" className="py-20 lg:py-28 bg-[#0F0E11] border-b border-[#252229] text-[#F7F3F5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F4ACB7] block mb-2">
            Curriculum & Programs
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-4">
            정통 바가노바 & 영국 RAD 전문 클래스
          </h2>
          <p className="text-sm lg:text-base text-[#BDB5BC] leading-relaxed">
            탄탄한 기본기 바레 훈련부터 솔로 바리에이션 무대 완성까지, 목표 수준에 맞춘 정교한 무용 교육을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BALLET_COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-[#18151F] border border-[#2D2636] rounded-3xl p-6 lg:p-8 flex flex-col justify-between hover:border-[#F4ACB7]/60 transition-all duration-300 group shadow-lg"
            >
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#251E28] border border-[#3E2E42] text-[11px] font-semibold text-[#F4ACB7] mb-4">
                  {course.method}
                </div>
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#F4ACB7] transition-colors mb-2">
                  {course.title}
                </h3>
                <p className="text-xs text-[#F4ACB7] font-medium mb-3">{course.target}</p>
                <p className="text-xs text-[#BDB5BC] leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="space-y-2.5 mb-8 p-4 rounded-2xl bg-[#0F0E11] border border-[#252229]">
                  <p className="text-[11px] font-semibold text-[#786E77] uppercase tracking-wider">
                    핵심 수련 단계
                  </p>
                  {course.curriculum.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#D5CDD4]">
                      <span className="text-[#F4ACB7] mt-0.5">✦</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="pt-4 border-t border-[#252229] flex items-center justify-between mb-4 text-xs text-[#9E939D]">
                  <span>수업 일정</span>
                  <span className="text-[#F4ACB7] font-medium">{course.schedule}</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenAudition}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D8829D] to-[#F4ACB7] text-[#0F0E11] font-semibold text-xs hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow"
                >
                  과정 상담 및 체형 진단 신청
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
