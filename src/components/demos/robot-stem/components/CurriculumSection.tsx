'use client';

import React from 'react';
import { ROBOT_COURSES } from '../data/robotData';

interface CurriculumSectionProps {
  onOpenTrial: (courseTitle?: string) => void;
}

export function CurriculumSection({ onOpenTrial }: CurriculumSectionProps) {
  return (
    <section id="curriculum" className="py-16 lg:py-24 bg-[#0A0E1A] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono text-orange-400 uppercase tracking-widest block mb-2">
            ENGINEERING CURRICULUM
          </span>
          <h2 className="text-2xl lg:text-4xl font-mono font-bold text-white mb-4">
            단계별 영재 로보틱스 &amp; 피지컬 컴퓨팅 커리큘럼
          </h2>
          <p className="text-sm text-zinc-400">
            기초 전자기학부터 고급 ROS 2 자율주행까지, 학생의 성향과 수준에 맞춘 최적의 공학 로드맵을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ROBOT_COURSES.map((course) => (
            <div
              key={course.id}
              className={`p-6 lg:p-8 rounded-3xl flex flex-col justify-between relative transition-all ${
                course.recommended
                  ? 'bg-[#111A30] border-2 border-orange-500 shadow-2xl shadow-orange-500/10'
                  : 'bg-[#0E1526] border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {course.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-slate-950 font-bold text-[10px] font-mono shadow-md">
                  대회 입상 집중반 (추천)
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold font-mono text-white mb-2">
                  {course.title}
                </h3>
                <div className="text-xs text-orange-400 font-mono mb-2">
                  대상: {course.target}
                </div>
                <div className="text-xs text-zinc-400 font-mono mb-4">
                  수업: {course.duration}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="space-y-2 mb-8 pt-4 border-t border-zinc-800">
                  <span className="text-[11px] font-mono font-bold text-zinc-400 block mb-2">
                    주요 커리큘럼 모듈:
                  </span>
                  {course.curriculum.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="text-orange-400 shrink-0">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenTrial(course.title)}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all min-h-[44px] cursor-pointer ${
                  course.recommended
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 hover:brightness-110'
                    : 'bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800'
                }`}
              >
                {course.title} 체험 및 입학 상담 신청
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
