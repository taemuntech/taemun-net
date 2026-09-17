'use client';

import React from 'react';
import { PROCESS_STEPS } from '../data/archeData';

export default function ProcessRoadmap() {
  return (
    <section id="process" className="w-full bg-white py-16 text-stone-900 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-serif text-xs font-semibold tracking-widest text-amber-800 uppercase">
            Architectural Journey
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-stone-900 lg:text-4xl">
            첫 만남부터 입주까지 — 4단계 건축 프로세스
          </h2>
          <p className="mt-3 text-sm text-stone-600 lg:text-base">
            대지 현장 답사부터 모형 검토, 인허가, 정밀 시공 감리까지 투명하고 체계적으로 함께합니다.
          </p>
        </div>

        {/* 4단계 스텝 그리드 */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {PROCESS_STEPS.map((st, idx) => (
            <div
              key={idx}
              className="relative rounded-sm border border-stone-200 bg-stone-50/50 p-6 transition-all hover:bg-white hover:shadow-md"
            >
              {/* 스텝 번호 */}
              <div className="font-serif text-2xl font-black text-stone-300">
                {st.step}
              </div>

              {/* 제목 및 기간 */}
              <h3 className="mt-2 font-serif text-base font-bold text-stone-900">
                {st.title}
              </h3>
              <span className="mt-1 inline-block rounded bg-stone-200/60 px-2 py-0.5 text-[10px] font-mono text-stone-600">
                예상 소요 기간: {st.period}
              </span>

              {/* 설명 */}
              <p className="mt-3 text-xs leading-relaxed text-stone-600">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
