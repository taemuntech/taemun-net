'use client';

import React from 'react';
import { MASTERCLASS_COURSES } from '../data/chopinData';

interface MasterclassSectionProps {
  onOpenReservation: (courseId?: string) => void;
}

export function MasterclassSection({ onOpenReservation }: MasterclassSectionProps) {
  return (
    <section id="courses-section" className="py-20 lg:py-28 bg-[#151311] border-b border-[#2d2926] text-[#f5f0eb]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] block mb-2">
            Curriculum & Programs
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-[#f5f0eb] mb-4">
            목표에 맞춘 1:1 도제식 마스터클래스
          </h2>
          <p className="text-sm lg:text-base text-[#a89f95] leading-relaxed">
            단순 암기식 테크닉을 넘어, 악보 이면의 화성적 호흡과 작곡가의 의도를 읽어내는 정통 유럽식 음악 교육 시스템을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MASTERCLASS_COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-[#1c1917] border border-[#38322c] rounded-2xl p-6 lg:p-8 flex flex-col justify-between hover:border-[#d4af37]/60 transition-all duration-300 group shadow-lg"
            >
              <div>
                <div className="inline-block px-3 py-1 rounded bg-[#2a241e] border border-[#524434] text-[11px] font-semibold text-[#d4af37] mb-4">
                  {course.capacity}
                </div>
                <h3 className="text-xl font-serif font-bold text-[#f5f0eb] group-hover:text-[#f7e2a9] transition-colors mb-2">
                  {course.title}
                </h3>
                <p className="text-xs text-[#a89f95] mb-4">{course.target}</p>
                <div className="p-3 bg-[#121110] rounded-xl border border-[#2d2926] mb-6">
                  <p className="text-xs text-[#c5a880] font-medium">수업 기간: {course.duration}</p>
                </div>

                <div className="space-y-2.5 mb-8">
                  <p className="text-xs font-semibold text-[#8c8276] uppercase tracking-wider">핵심 커리큘럼</p>
                  {course.curriculum.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#b8b0a7]">
                      <span className="text-[#d4af37] mt-0.5">✦</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="pt-4 border-t border-[#2d2926] flex items-center justify-between mb-4">
                  <span className="text-xs text-[#8c8276]">수강료 및 정원</span>
                  <span className="text-xs text-[#e0c298] font-medium">{course.price}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenReservation(course.title)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89528] text-[#121110] font-semibold text-xs hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow"
                >
                  과정 상담 및 실기 심사 신청
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
