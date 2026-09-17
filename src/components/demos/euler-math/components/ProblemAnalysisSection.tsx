'use client';

import React, { useState } from 'react';
import { SAMPLE_PROBLEMS } from '../data/eulerData';
import { EulerProblem } from '../types';

export function ProblemAnalysisSection() {
  const [selectedProb, setSelectedProb] = useState<EulerProblem>(SAMPLE_PROBLEMS[0]);

  return (
    <section id="problem-analysis" className="py-20 lg:py-28 bg-[#0A0D14]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">
            RIGOROUS PROOF &amp; DISSECTION
          </span>
          <h2 className="text-2xl lg:text-4xl font-mono font-extrabold text-white tracking-tight">
            KMO &amp; 영재학교 기출 논증 핀셋 해체
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 mt-2">
            단순 수식 전개가 아닌, 핵심 통찰(Key Insight)과 논리적 단계 구성을 한눈에 파악합니다.
          </p>
        </div>

        {/* Problem Selector Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {SAMPLE_PROBLEMS.map((prob) => (
            <button
              key={prob.id}
              onClick={() => setSelectedProb(prob)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer min-h-[44px] flex items-center ${
                selectedProb.id === prob.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-[#151D2C] text-slate-300 hover:text-white'
              }`}
            >
              [{prob.category}] {prob.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Problem Card Box */}
        <div className="max-w-4xl mx-auto bg-[#111724] border border-[#1E293B] rounded-3xl p-6 lg:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 pb-4 border-b border-slate-800 mb-6">
            <div>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mr-2">
                {selectedProb.category}학
              </span>
              <span className="text-xs text-slate-400 font-mono">
                난이도: {selectedProb.difficulty}
              </span>
            </div>
            <h3 className="text-base lg:text-lg font-mono font-bold text-white">
              {selectedProb.title}
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0D14] border border-slate-800 mb-6">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
              문제 발문 (Problem Formulation)
            </span>
            <p className="text-xs lg:text-sm text-slate-200 leading-relaxed font-serif">
              {selectedProb.question}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 mb-6">
            <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider block mb-1">
              핵심 통찰 (Key Mathematical Insight)
            </span>
            <p className="text-xs text-cyan-200 leading-relaxed">
              {selectedProb.keyInsight}
            </p>
          </div>

          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
              단계별 엄밀 논증 과정 (Rigorous Step-by-Step Proof)
            </span>
            <div className="space-y-3">
              {selectedProb.steps.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#0F1420] border border-slate-800 text-xs text-slate-300 font-mono flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
