'use client';

import React from 'react';
import { BOOTCAMP_COURSES } from '../data/codexData';

interface CurriculumSectionProps {
  onOpenApply: (courseTitle?: string) => void;
}

export function CurriculumSection({ onOpenApply }: CurriculumSectionProps) {
  return (
    <section id="curriculum" className="py-16 lg:py-24 bg-[#050811] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2">
            ENGINEERING CURRICULUM
          </span>
          <h2 className="text-2xl lg:text-4xl font-mono font-bold text-white mb-4">
            16주 몰입형 풀스택 &amp; AI 엔지니어링 로드맵
          </h2>
          <p className="text-sm text-zinc-400 font-mono">
            CS 핵심 기본기부터 대규모 분산 처리, 엔터프라이즈 생성형 AI RAG 시스템까지 실무 압축 교육을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BOOTCAMP_COURSES.map((course) => (
            <div
              key={course.id}
              className={`p-6 lg:p-8 rounded-3xl flex flex-col justify-between relative transition-all font-mono ${
                course.recommended
                  ? 'bg-[#0E1526] border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10'
                  : 'bg-[#0B0F17] border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {course.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] shadow-md">
                  빅테크 핵심 백엔드 과정 (추천)
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-emerald-400 block mb-1">
                  {course.phase}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {course.title}
                </h3>
                <div className="text-xs text-zinc-400 mb-4">
                  기간: {course.duration}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="space-y-2 mb-8 pt-4 border-t border-zinc-800">
                  <span className="text-[11px] font-bold text-zinc-400 block mb-2">
                    핵심 실전 프로젝트:
                  </span>
                  {course.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="text-emerald-400 shrink-0">✓</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenApply(course.title)}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all min-h-[44px] cursor-pointer ${
                  course.recommended
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110'
                    : 'bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800'
                }`}
              >
                {course.title} 커리큘럼 신청하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
