'use client';

import React from 'react';
import { AGE_CURRICULUMS } from '../data/kidsData';

interface KidsCurriculumSectionProps {
  onOpenTrialModal: (ageGroup?: string) => void;
}

export function KidsCurriculumSection({ onOpenTrialModal }: KidsCurriculumSectionProps) {
  return (
    <section id="curriculum-section" className="py-20 lg:py-28 bg-[#F4F0E8] border-b border-[#E8E2D9] text-[#2D2A26]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E07A5F] block mb-2">
            Curriculum Roadmap
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-[#2D2A26] mb-4">
            4세부터 13세까지 이어지는 조형 성장 로드맵
          </h2>
          <p className="text-sm lg:text-base text-[#5C554D] leading-relaxed">
            나이와 신체 발달에 맞춰 단계별로 확장되는 프랑스식 순수 예술 커리큘럼입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {AGE_CURRICULUMS.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-[#E8E2D9] rounded-3xl p-6 lg:p-8 flex flex-col justify-between hover:border-[#E07A5F] transition-all duration-300 shadow-sm group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#FDF0EC] text-[#E07A5F] text-xs font-bold">
                    {c.ageGroup}
                  </span>
                  <span className="text-xs font-medium text-[#81B29A]">정원 4인 마감제</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2D2A26] group-hover:text-[#E07A5F] transition-colors mb-2">
                  {c.stageName}
                </h3>
                <p className="text-sm font-medium text-[#E07A5F] mb-3">{c.theme}</p>
                <p className="text-xs text-[#5C554D] leading-relaxed mb-6">
                  {c.description}
                </p>

                <div className="space-y-3 mb-6 p-4 rounded-2xl bg-[#FAF8F5]">
                  <div>
                    <span className="text-[11px] font-bold text-[#7A7369] block mb-1">
                      핵심 감각 향상 목표
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {c.keySkills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E2D9] text-[11px] text-[#2D2A26]"
                        >
                          ✦ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#E8E2D9]">
                    <span className="text-[11px] font-bold text-[#7A7369] block mb-1">
                      주요 활용 매체 & 재료
                    </span>
                    <p className="text-xs text-[#5C554D]">
                      {c.materials.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenTrialModal(c.ageGroup)}
                className="w-full py-3.5 rounded-2xl bg-[#2D2A26] text-white text-xs font-semibold hover:bg-[#E07A5F] active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow"
              >
                {c.ageGroup} 1회 체험 클래스 신청
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
