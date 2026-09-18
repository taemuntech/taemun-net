'use client';

import React from 'react';
import { EXAM_PASS_CASES } from '../data/leetData';

export function CaseStudySection() {
  return (
    <section id="pass-cases" className="py-16 lg:py-24 bg-[#090E17] border-b border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-serif text-amber-400 uppercase tracking-widest block mb-2">
            PROVEN TRACK RECORD
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-4">
            최상위 로스쿨 및 CPA 최종 합격 수기 아카이브
          </h2>
          <p className="text-sm text-zinc-400 font-sans">
            철저한 데이터 분석과 실전형 기출 해체로 한계를 돌파한 수강생들의 합격 지표입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {EXAM_PASS_CASES.map((item) => (
            <div
              key={item.id}
              className="p-6 lg:p-8 rounded-3xl bg-[#0D1526] border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {item.track}
                  </span>
                  <span className="text-xs text-zinc-500 font-serif">
                    VERIFIED
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>

                <div className="p-3 rounded-2xl bg-black/40 border border-zinc-800 text-xs font-mono text-zinc-300 space-y-1 mb-4">
                  <div>{item.gpa}</div>
                  <div className="text-amber-300 font-bold">{item.leetScore}</div>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-4">
                  {item.summary}
                </p>

                <div className="text-[11px] text-zinc-400 font-sans border-t border-zinc-800/80 pt-3">
                  <span className="text-amber-400 font-serif font-bold block mb-0.5">서면·구술 포인트:</span>
                  {item.interviewNote}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 mt-6 text-right">
                <span className="text-xs font-serif text-amber-400 group-hover:translate-x-1 transition-transform inline-block">
                  합격 전략 분석 ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
