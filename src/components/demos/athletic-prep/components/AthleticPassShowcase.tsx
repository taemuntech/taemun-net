'use client';

import React from 'react';
import { ATHLETIC_CASES } from '../data/athleticData';

export function AthleticPassShowcase() {
  return (
    <section id="cases-showcase" className="py-16 lg:py-24 bg-[#06090E] border-b border-lime-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono text-lime-400 uppercase tracking-widest block mb-2">
            PROVEN TRACK RECORD
          </span>
          <h2 className="text-2xl lg:text-4xl font-mono font-bold text-white mb-4">
            최상위 체육교육과 및 엘리트 스포츠 합격 아카이브
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            수능 성적과 실기 기록의 황금 배합으로 목표 대학을 정복한 아펙스 수강생들의 실제 합격 데이터입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ATHLETIC_CASES.map((item) => (
            <div
              key={item.id}
              className="p-6 lg:p-8 rounded-3xl bg-[#0D1526] border border-zinc-800 hover:border-lime-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-lime-500/10 text-lime-400 border border-lime-500/30">
                    ADMITTED
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    VERIFIED
                  </span>
                </div>

                <h3 className="text-lg font-mono font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                  {item.title}
                </h3>

                <div className="text-xs text-zinc-400 font-mono mb-4">
                  {item.university}
                </div>

                <div className="p-3 rounded-2xl bg-black/50 border border-zinc-800/80 text-xs font-mono text-zinc-300 space-y-1 mb-4">
                  <div>{item.suneungScore}</div>
                  <div className="text-lime-300 font-bold">{item.practicalDeduction}</div>
                  <div className="text-teal-300">{item.keyEvent}</div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-800 mt-6 text-right">
                <span className="text-xs font-mono text-lime-400 group-hover:translate-x-1 transition-transform inline-block">
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
