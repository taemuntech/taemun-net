'use client';

import React from 'react';
import { CRAFT_CURRICULUM } from '../data/leCordonData';
import { CheckCircle, Clock, Users, Award, ArrowRight } from 'lucide-react';

interface CurriculumSectionProps {
  onOpenConsultation: () => void;
}

export function CurriculumSection({ onOpenConsultation }: CurriculumSectionProps) {
  return (
    <section className="py-20 bg-stone-950 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            PROFESSIONAL DIPLOMA & MASTER TRACK
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-stone-50">
            정규 디플로마 & 창업 마스터 과정
          </h2>
          <p className="text-stone-300 text-xs lg:text-sm font-light">
            세계적 기준의 파티스리 테크닉과 럭셔리 플로랄 연출 기법을
            체계적인 단계별 실습을 통해 마스터합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CRAFT_CURRICULUM.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl bg-stone-900/90 border border-stone-800 p-6 flex flex-col justify-between space-y-6 hover:border-amber-700/60 transition-all hover:shadow-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-amber-950/70 text-amber-300 border border-amber-700/40 text-[11px] font-medium">
                    {course.badge}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {course.discipline === 'patisserie' ? 'PATISSERIE' : 'FLORAL'}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-100 leading-snug">
                  {course.title}
                </h3>

                <div className="space-y-2 text-xs text-stone-300 pt-2 border-t border-stone-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{course.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{course.capacity}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-2">
                  {course.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-800 space-y-3">
                <p className="text-[11px] text-stone-400">
                  <span className="text-stone-300 font-medium">수강 대상: </span>
                  {course.target}
                </p>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full py-2.5 rounded-lg bg-stone-800 hover:bg-amber-600 text-stone-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>과정 상세 문의 (예시)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
