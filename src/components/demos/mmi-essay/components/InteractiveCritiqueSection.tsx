'use client';

import React, { useState } from 'react';
import { CRITIQUES } from '../data/mmiData';
import { EssayCritique } from '../types';

export function InteractiveCritiqueSection() {
  const [selectedCritique, setSelectedCritique] = useState<EssayCritique>(CRITIQUES[0]);
  const [activeTab, setActiveTab] = useState<'after' | 'before' | 'diff'>('diff');

  return (
    <section id="critique-lab" className="py-20 lg:py-28 bg-[#161922] border-y border-[#242A38]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block mb-2">
            INTERACTIVE RED-PEN CRITIQUE
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-extrabold text-white tracking-tight">
            빨간펜 정밀 첨삭 전후(Before / After) 비교
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 mt-2">
            모호한 주장이 어떻게 평가위원을 사로잡는 엄밀한 학술 논거로 진화하는지 직접 비교해 보십시오.
          </p>
        </div>

        {/* Category Switcher */}
        <div className="flex justify-center gap-3 mb-8">
          {CRITIQUES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCritique(c)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] flex items-center ${
                selectedCritique.id === c.id
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'bg-[#1F2533] text-slate-400 hover:text-white'
              }`}
            >
              [{c.category}] {c.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Main Comparison Container */}
        <div className="bg-[#12141A] border border-[#232938] rounded-3xl p-6 lg:p-10 shadow-2xl">
          {/* Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#242A38] mb-8">
            <div>
              <span className="text-xs font-mono text-rose-400 block mb-1">
                목표 전형: {selectedCritique.targetUniv}
              </span>
              <h3 className="text-lg lg:text-xl font-serif font-bold text-white">
                {selectedCritique.title}
              </h3>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-[#1A1F2C] rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('before')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] cursor-pointer ${
                  activeTab === 'before'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                초안 (Before)
              </button>
              <button
                onClick={() => setActiveTab('after')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] cursor-pointer ${
                  activeTab === 'after'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                최종 첨삭본 (After)
              </button>
              <button
                onClick={() => setActiveTab('diff')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] cursor-pointer ${
                  activeTab === 'diff'
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1:1 동시 비교
              </button>
            </div>
          </div>

          {/* Texts Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Before Card */}
            {(activeTab === 'before' || activeTab === 'diff') && (
              <div className="p-6 rounded-2xl bg-[#181B24] border border-red-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      학생 작성 초안
                    </span>
                    <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg">
                      진단 평점: {selectedCritique.scoreBefore}점
                    </span>
                  </div>
                  <p className="font-serif text-sm text-slate-300 leading-relaxed whitespace-pre-line p-4 rounded-xl bg-[#0F1117] border border-slate-800/80 mb-4">
                    {selectedCritique.beforeText}
                  </p>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  ※ 단순 주장 나열 및 논리적 비약 지적
                </span>
              </div>
            )}

            {/* After Card */}
            {(activeTab === 'after' || activeTab === 'diff') && (
              <div className="p-6 rounded-2xl bg-[#181C26] border border-emerald-500/30 flex flex-col justify-between shadow-lg shadow-emerald-500/5">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      빨간펜 1:1 대면 첨삭 후 완성본
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                      합격 안정권: {selectedCritique.scoreAfter}점
                    </span>
                  </div>
                  <p className="font-serif text-sm text-slate-100 leading-relaxed whitespace-pre-line p-4 rounded-xl bg-[#0E131C] border border-emerald-500/20 mb-4">
                    {selectedCritique.afterText}
                  </p>
                </div>
                <span className="text-[11px] text-emerald-400/80 font-mono">
                  ✓ 헌법적 가치·법리 인용 및 대안 제시 완성
                </span>
              </div>
            )}
          </div>

          {/* Red Pen Teacher Notes Box */}
          <div className="p-6 rounded-2xl bg-[#1A1822] border border-rose-500/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">
                ✍️
              </span>
              <h4 className="text-sm font-bold text-rose-300">
                전임 평가위원 빨간펜 핀셋 첨삭 포인트 (Teacher&apos;s Review Notes)
              </h4>
            </div>

            <div className="space-y-2.5">
              {selectedCritique.critiqueNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="text-rose-400 font-bold shrink-0">Point {idx + 1}.</span>
                  <span className="leading-relaxed">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
