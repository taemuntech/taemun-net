'use client';

import React, { useState } from 'react';
import { EXAM_QUESTIONS } from '../data/beauxArtsData';

export function ExamAnalysisSection() {
  const [selectedQ, setSelectedQ] = useState(EXAM_QUESTIONS[0]);

  return (
    <section id="exam-lab-section" className="py-20 lg:py-28 bg-[#16191F] border-b border-[#2A303C] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#38BDF8] block mb-2">
            Exam Problem Dissection Lab
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-4">
            최상위권 미대 실기 기출 발문 핀셋 해체
          </h2>
          <p className="text-sm lg:text-base text-[#94A3B8] leading-relaxed">
            무엇을 그리고자 하는가보다 출제자가 무엇을 묻고 있는가를 먼저 파악해야 합니다. 2026학년도 대학별 모의 기출문제를 심층 분석합니다.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-3 mb-10">
          {EXAM_QUESTIONS.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => setSelectedQ(q)}
              className={`px-5 py-3 rounded-xl text-xs font-semibold transition-all min-h-[44px] ${
                selectedQ.id === q.id
                  ? 'bg-[#0284C7] text-white shadow-lg'
                  : 'bg-[#1E2229] border border-[#2A303C] text-[#94A3B8] hover:text-white'
              }`}
            >
              {q.university}
            </button>
          ))}
        </div>

        {/* Dissection Box */}
        <div className="bg-[#1A1D24] border border-[#2A303C] rounded-3xl p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#2A303C] mb-8">
            <div>
              <span className="text-xs text-[#38BDF8] font-bold block mb-1">{selectedQ.track}</span>
              <h3 className="text-xl font-serif font-bold text-white">{selectedQ.university}</h3>
            </div>
            <span className="px-3 py-1 rounded bg-[#1E293B] border border-[#334155] text-xs text-[#94A3B8] font-mono">
              {selectedQ.year}
            </span>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">출제 문제 발문</h4>
            <div className="p-5 rounded-2xl bg-[#12141A] border border-[#2A303C] text-sm text-[#E2E8F0] leading-relaxed font-serif">
              "{selectedQ.problemText}"
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Given Objects */}
            <div className="p-6 rounded-2xl bg-[#12141A] border border-[#2A303C]">
              <h4 className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-3">
                제시물 물성 및 조형 요소
              </h4>
              <div className="space-y-2">
                {selectedQ.givenObjects.map((obj, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#E2E8F0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Key Strategies */}
            <div className="p-6 rounded-2xl bg-[#12141A] border border-[#2A303C]">
              <h4 className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-3">
                아틀리에 합격 실기 솔루션
              </h4>
              <div className="space-y-2">
                {selectedQ.keyStrategies.map((strat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                    <span className="text-[#38BDF8] mt-0.5">✓</span>
                    <span className="leading-relaxed">{strat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
