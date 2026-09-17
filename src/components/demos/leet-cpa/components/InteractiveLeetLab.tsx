'use client';

import React, { useState } from 'react';
import { LEET_QUESTIONS } from '../data/leetData';
import { LeetQuestionAnalysis } from '../types';

export function InteractiveLeetLab() {
  const [selectedQuestion, setSelectedQuestion] = useState<LeetQuestionAnalysis>(LEET_QUESTIONS[0]);

  // Score Simulator States
  const [targetTier, setTargetTier] = useState<'sky' | 'seoul' | 'metro'>('sky');
  const [gpaPercentile, setGpaPercentile] = useState<number>(96);
  const [toeicScore, setToeicScore] = useState<number>(970);

  // Requirements logic
  const tierConfigs = {
    sky: {
      name: 'S·K·Y 최상위 로스쿨 (예시)',
      targetLeet: 142.5,
      avgGPA: '97.5 이상 (예시)',
      reqLanguage: '토익 980+ / 텝스 500+ (예시)',
    },
    seoul: {
      name: '인서울 대형 로스쿨 (예시)',
      targetLeet: 133.0,
      avgGPA: '95.0 이상 (예시)',
      reqLanguage: '토익 950+ (예시)',
    },
    metro: {
      name: '수도권 및 거점국립 로스쿨 (예시)',
      targetLeet: 124.5,
      avgGPA: '92.0 이상 (예시)',
      reqLanguage: '토익 900+ (예시)',
    },
  };

  const currentConfig = tierConfigs[targetTier];

  // Calculated required LEET based on GPA and Language adjustments
  const gpaDeficit = (98 - gpaPercentile) * 0.4;
  const toeicDeficit = (990 - toeicScore) * 0.02;
  const calculatedLeetReq = (currentConfig.targetLeet + gpaDeficit + toeicDeficit).toFixed(1);

  return (
    <section id="leet-lab" className="py-16 lg:py-24 bg-[#070B13] border-b border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-serif text-amber-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Rigorous Logic &amp; Score Diagnostics Lab
          </div>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-4">
            기출 킬러 문항 핀셋 해체 &amp; 합격 표준점수 시뮬레이터
          </h2>
          <p className="text-sm text-zinc-400 font-sans">
            출제위원이 파놓은 매력적 오답 함정(Trap)의 논리적 메커니즘을 규명하고,
            자신의 학점·공인영어 성적에 필요한 목표 LEET 표준점수를 실시간으로 산출하십시오.
          </p>
        </div>

        {/* Part 1: Question Dissection Lab */}
        <div className="mb-14 bg-[#0D1526] border border-amber-500/20 rounded-3xl p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-zinc-800 mb-6 gap-4">
            <span className="text-xs font-serif text-amber-400 font-bold uppercase tracking-wider">
              KILLER QUESTION PINSET CRITIQUE
            </span>

            {/* Question Selector Chips */}
            <div className="flex flex-wrap gap-2">
              {LEET_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setSelectedQuestion(q)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-all cursor-pointer ${
                    selectedQuestion.id === q.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {q.category.split('·')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Question summary */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-xs text-amber-400/80 font-serif block mb-1">
                  {selectedQuestion.category}
                </span>
                <h3 className="text-lg font-serif font-bold text-white">
                  {selectedQuestion.title}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-sans">
                <span className="font-bold text-zinc-400 font-serif block mb-1">지문 및 쟁점 요약:</span>
                {selectedQuestion.passageSummary}
              </div>

              <div className="p-4 rounded-2xl bg-red-950/30 border border-red-900/40 text-xs text-rose-200 leading-relaxed font-sans">
                <span className="font-bold text-rose-400 font-serif block mb-1">
                  ⚠️ 오답 함정(Trap) 분석: {selectedQuestion.trapOption}
                </span>
                {selectedQuestion.keyLogic}
              </div>
            </div>

            {/* Right: Telemetry breakdown */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#090F1C] border border-zinc-800 space-y-4">
              <span className="text-xs font-serif text-zinc-400 font-bold block mb-2">
                출제 통계 및 오답 분포 텔레메트리 (예시)
              </span>

              {/* Correct Rate Bar */}
              <div>
                <div className="flex justify-between text-xs font-serif mb-1">
                  <span className="text-zinc-300">정답률 (정답 선지)</span>
                  <span className="text-emerald-400 font-bold">{selectedQuestion.correctRate}</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              {/* Trap Option Rate Bar */}
              <div>
                <div className="flex justify-between text-xs font-serif mb-1">
                  <span className="text-zinc-300">매력적 오답 함정 선택률</span>
                  <span className="text-rose-400 font-bold">{selectedQuestion.trapRate}</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 font-sans leading-relaxed mt-4">
                💡 <strong>렉스 아카데미 해법:</strong> 기호논리학 조건식 매핑 훈련을 통해 
                함정 선지의 부정형 진술을 3초 만에 소거하고, 확정 전제에만 집중하여 실전 시간을 40초 단축합니다.
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Target Score Simulator */}
        <div id="score-simulator" className="p-6 lg:p-8 rounded-3xl bg-[#0F172A] border border-amber-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-serif text-amber-400 font-bold block mb-1">
                LEET TARGET SCORE SIMULATOR
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                목표 로스쿨 군별 요구 LEET 표준점수 정밀 환산기 (예시)
              </h3>
            </div>

            {/* Tier Buttons */}
            <div className="flex gap-2">
              {(['sky', 'seoul', 'metro'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTargetTier(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
                    targetTier === t
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {t === 'sky' ? 'S·K·Y(예시)' : t === 'seoul' ? '인서울(예시)' : '수도권/지방(예시)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Input Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-serif mb-1">
                  <span className="text-zinc-300">학점 백분위 (GPA):</span>
                  <span className="text-amber-400 font-bold">{gpaPercentile}점 / 100</span>
                </div>
                <input
                  type="range"
                  min="85"
                  max="100"
                  step="0.5"
                  value={gpaPercentile}
                  onChange={(e) => setGpaPercentile(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-serif mb-1">
                  <span className="text-zinc-300">공인영어 (토익 기준):</span>
                  <span className="text-amber-400 font-bold">{toeicScore}점 / 990</span>
                </div>
                <input
                  type="range"
                  min="850"
                  max="990"
                  step="5"
                  value={toeicScore}
                  onChange={(e) => setToeicScore(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Leet Score */}
            <div className="p-4 rounded-2xl bg-black/50 border border-zinc-800 text-center">
              <span className="text-xs text-zinc-400 font-serif block mb-1">
                요구되는 LEET 목표 표준점수 (추정)
              </span>
              <span className="text-3xl lg:text-4xl font-serif font-black text-amber-400">
                {calculatedLeetReq}
              </span>
              <span className="text-xs text-zinc-500 block mt-1">
                (언어이해 + 추리논증 합산, 예시)
              </span>
            </div>

            {/* Target Details */}
            <div className="p-4 rounded-2xl bg-[#090F1C] border border-amber-500/20 text-xs font-serif space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">목표 군:</span>
                <span className="text-white font-bold">{currentConfig.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">평균 합격선 GPA:</span>
                <span className="text-zinc-200">{currentConfig.avgGPA}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">권장 공인영어:</span>
                <span className="text-zinc-200">{currentConfig.reqLanguage}</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 text-amber-300 font-sans">
                {Number(calculatedLeetReq) > 140
                  ? '★ 상위 3% 이내 초고득점 필요 — 추리논증 고난도 특화 필수'
                  : '✓ 안정권 진입 가능 — 실전 모의고사 10회 안정화 전략 권장'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
