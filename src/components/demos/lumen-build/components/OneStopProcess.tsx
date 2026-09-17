'use client';

import React from 'react';
import { PROCESS_STEPS } from '../data/lumenData';

export default function OneStopProcess() {
  return (
    <section id="process" className="w-full bg-neutral-950 py-16 text-white lg:py-24 border-t border-neutral-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
            ONE-STOP DEVELOPMENT WORKFLOW
          </p>
          <h2 className="mt-2 font-mono text-2xl font-black tracking-tight text-white lg:text-4xl">
            부지 매입부터 임대 세팅까지 — 원스톱 5단계 신축 솔루션
          </h2>
          <p className="mt-3 text-xs text-neutral-400 lg:text-sm">
            복잡한 건축 인허가, 철거 민원, 시공 품질 관리, 공실 해결까지 루멘 빌드가 원스톱으로 책임집니다.
          </p>
        </div>

        {/* 5단계 카드 그리드 */}
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-5">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-lg border border-neutral-800 bg-neutral-900/60 p-5 transition-all hover:border-amber-500/50 hover:bg-neutral-900"
            >
              {/* 스텝 번호 */}
              <div className="font-mono text-2xl font-black text-amber-500/60">
                {step.step}
              </div>

              {/* 제목 및 기간 */}
              <h3 className="mt-2 font-mono text-sm font-bold text-white">
                {step.title}
              </h3>
              <span className="mt-1 inline-block rounded bg-neutral-800 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                소요 기간: {step.period}
              </span>

              {/* 설명 */}
              <p className="mt-3 text-xs leading-relaxed text-neutral-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
