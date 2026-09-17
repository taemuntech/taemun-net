'use client';

import React, { useState, useEffect } from 'react';
import { MMI_SCENARIOS } from '../data/mmiData';
import { MmiScenario } from '../types';

export function MmiScenarioLab() {
  const [selectedStation, setSelectedStation] = useState<MmiScenario>(MMI_SCENARIOS[0]);
  const [timerSeconds, setTimerSeconds] = useState<number>(480); // 8 minutes
  const [timerActive, setTimerActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const resetTimer = () => {
    setTimerActive(false);
    setTimerSeconds(480);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section id="mmi-lab" className="py-20 lg:py-28 bg-[#12141A]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block mb-2">
            MEDICAL MMI SIMULATION LAB
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-extrabold text-white tracking-tight">
            의대 MMI 다면 심층면접 실전 시뮬레이션
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 mt-2">
            8분의 제한 시간 동안 꼬리질문에 당황하지 않고 윤리적 중심을 지키는 훈련을 진행합니다.
          </p>
        </div>

        {/* Station Selectors */}
        <div className="flex justify-center gap-3 mb-8">
          {MMI_SCENARIOS.map((st) => (
            <button
              key={st.id}
              onClick={() => {
                setSelectedStation(st);
                resetTimer();
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] flex items-center ${
                selectedStation.id === st.id
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'bg-[#1C212E] text-slate-400 hover:text-white'
              }`}
            >
              {st.roomName}
            </button>
          ))}
        </div>

        {/* Station Chamber Box */}
        <div className="max-w-4xl mx-auto bg-[#171B26] border border-[#262E40] rounded-3xl p-6 lg:p-10 shadow-2xl">
          {/* Top Timer Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <div>
                <h3 className="text-base lg:text-lg font-bold text-white">
                  {selectedStation.roomName}
                </h3>
                <span className="text-xs text-rose-400">
                  평가 영역: {selectedStation.stationType}
                </span>
              </div>
            </div>

            {/* Timer Dial */}
            <div className="flex items-center gap-4 bg-[#0F1219] px-4 py-2 rounded-2xl border border-slate-800">
              <span className="text-xl lg:text-2xl font-mono font-bold text-amber-400">
                ⏱️ {formatTimer(timerSeconds)}
              </span>
              <button
                onClick={() => setTimerActive(!timerActive)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  timerActive
                    ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                    : 'bg-rose-600 text-white hover:bg-rose-700'
                }`}
              >
                {timerActive ? '일시정지' : '8분 타이머 시작'}
              </button>
              <button
                onClick={resetTimer}
                className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                리셋
              </button>
            </div>
          </div>

          {/* Dilemma Prompt */}
          <div className="p-6 rounded-2xl bg-[#0F1219] border border-slate-800 mb-6">
            <span className="text-[11px] font-mono text-rose-400 uppercase tracking-widest block mb-2">
              면접관 제시문 (Dilemma Prompt)
            </span>
            <p className="font-serif text-sm lg:text-base text-slate-200 leading-relaxed mb-4">
              &ldquo;{selectedStation.scenario}&rdquo;
            </p>
            <div className="p-3 rounded-xl bg-[#1A1822] border border-rose-500/20 text-xs text-rose-300">
              <strong>충돌 가치:</strong> {selectedStation.ethicalDilemma}
            </div>
          </div>

          {/* Follow-up Questions Accordion */}
          <div className="mb-6">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
              실전 압박 꼬리질문 (Interviewer Follow-ups)
            </h4>
            <div className="space-y-3">
              {selectedStation.followUpQuestions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#12151E] border border-slate-800/80 text-xs text-slate-300 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center shrink-0">
                    Q{idx + 1}
                  </span>
                  <p className="leading-relaxed font-serif text-white">
                    {q}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rubric Points */}
          <div className="p-5 rounded-2xl bg-[#131A26] border border-blue-500/20">
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">
              의과대학 평가위원 채점 핵심 루브릭 (Evaluation Rubric)
            </h4>
            <div className="space-y-2">
              {selectedStation.evaluationRubric.map((r, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
