'use client';

import React, { useState } from 'react';
import { ATHLETIC_EVENTS } from '../data/athleticData';
import { AthleticEvent } from '../types';

export function InteractiveSportsTelemetry() {
  const [selectedEvent, setSelectedEvent] = useState<AthleticEvent>(ATHLETIC_EVENTS[0]);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [currentVal, setCurrentVal] = useState<number>(215);

  // Admission Matrix States
  const [targetUniv, setTargetUniv] = useState<'s-univ' | 'y-univ' | 'k-univ'>('s-univ');
  const [suneungPercentile, setSuneungPercentile] = useState<number>(95);
  const [practicalDeductions, setPracticalDeductions] = useState<number>(2);

  const univStandards = {
    's-univ': {
      name: 'S대 사범대 체육교육과 (예시)',
      minSuneung: 94.0,
      maxDeductionAllowed: 2,
      note: '수능 80% + 실기 20% (실기 만점 경쟁 심화, 예시)',
    },
    'y-univ': {
      name: 'Y대 스포츠응용산업학과 (예시)',
      minSuneung: 91.5,
      maxDeductionAllowed: 4,
      note: '실기 배점 격차가 커 턴 동작 및 제멀 만점 필수 (예시)',
    },
    'k-univ': {
      name: 'K대 사범대 체육교육과 (예시)',
      minSuneung: 93.0,
      maxDeductionAllowed: 3,
      note: '기초실기 3종목 및 전공실기 고른 고득점 필요 (예시)',
    },
  };

  const currentUniv = univStandards[targetUniv];
  const maxScore = gender === 'male' ? selectedEvent.maleMax : selectedEvent.femaleMax;

  // Percentage calculation
  let rate = 0;
  if (selectedEvent.id === 'event-shuttle') {
    // For shuttle run, lower is better. maleMax=8.4, min=11.0
    const worst = 11.0;
    rate = Math.max(0, Math.min(100, Math.round(((worst - currentVal) / (worst - maxScore)) * 100)));
  } else {
    rate = Math.max(0, Math.min(100, Math.round((currentVal / maxScore) * 100)));
  }

  // Handle event switch and adjust default value
  const handleSelectEvent = (ev: AthleticEvent) => {
    setSelectedEvent(ev);
    if (ev.id === 'event-back') setCurrentVal(gender === 'male' ? 215 : 140);
    else if (ev.id === 'event-jump') setCurrentVal(gender === 'male' ? 285 : 235);
    else if (ev.id === 'event-shuttle') setCurrentVal(gender === 'male' ? 8.65 : 9.8);
    else if (ev.id === 'event-reach') setCurrentVal(gender === 'male' ? 27.5 : 29.5);
  };

  return (
    <section id="telemetry-lab" className="py-16 lg:py-24 bg-[#080D18] border-b border-lime-500/20 text-white font-mono">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs text-lime-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
            Biometric Telemetry &amp; Sensor Calibration
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
            4대 기초실기 전자 센서 계측 HUD &amp; 합격 시뮬레이터
          </h2>
          <p className="text-sm text-zinc-400 font-sans">
            디지털 로드셀과 레이저 전자센서 계측 수치를 직접 조작하여 만점 기준을 체감하고,
            수능 백분위와 실기 감점을 결합한 대학별 합격 안정권을 실시간으로 진단하십시오.
          </p>
        </div>

        {/* Part 1: Event Sensor Telemetry Lab */}
        <div className="mb-14 bg-[#0C1322] border border-lime-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-zinc-800 mb-6 gap-4">
            {/* Event Selector Chips */}
            <div className="flex flex-wrap gap-2">
              {ATHLETIC_EVENTS.map((ev) => (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => handleSelectEvent(ev)}
                  className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                    selectedEvent.id === ev.id
                      ? 'bg-lime-500 text-slate-950 font-bold shadow-md shadow-lime-500/20'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {ev.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Gender Toggle */}
            <div className="flex p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start lg:self-auto">
              <button
                type="button"
                onClick={() => {
                  setGender('male');
                  if (selectedEvent.id === 'event-back') setCurrentVal(215);
                  else if (selectedEvent.id === 'event-jump') setCurrentVal(285);
                  else if (selectedEvent.id === 'event-shuttle') setCurrentVal(8.65);
                  else if (selectedEvent.id === 'event-reach') setCurrentVal(27.5);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  gender === 'male' ? 'bg-lime-500 text-slate-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                남학생 기준
              </button>
              <button
                type="button"
                onClick={() => {
                  setGender('female');
                  if (selectedEvent.id === 'event-back') setCurrentVal(140);
                  else if (selectedEvent.id === 'event-jump') setCurrentVal(235);
                  else if (selectedEvent.id === 'event-shuttle') setCurrentVal(9.8);
                  else if (selectedEvent.id === 'event-reach') setCurrentVal(29.5);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  gender === 'female' ? 'bg-lime-500 text-slate-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                여학생 기준
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Measurement Gauge */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-lime-400 block mb-1">
                    {selectedEvent.category} · {selectedEvent.sensorType}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {selectedEvent.name}
                  </h3>
                </div>
                <span className="text-xs text-zinc-500">
                  만점 기준: {maxScore}{selectedEvent.unit} (예시)
                </span>
              </div>

              {/* Slider Control */}
              <div className="p-6 rounded-2xl bg-black/60 border border-zinc-800 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-zinc-400">현재 계측 기록 시뮬레이션:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-lime-400">{currentVal}</span>
                    <span className="text-sm text-zinc-400">{selectedEvent.unit}</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={selectedEvent.id === 'event-shuttle' ? 7.5 : 0}
                  max={selectedEvent.id === 'event-shuttle' ? 11.5 : selectedEvent.id === 'event-back' ? 300 : selectedEvent.id === 'event-jump' ? 320 : 40}
                  step={selectedEvent.step}
                  value={currentVal}
                  onChange={(e) => setCurrentVal(Number(e.target.value))}
                  className="w-full accent-lime-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-zinc-500">
                  <span>{selectedEvent.id === 'event-shuttle' ? '7.5초 (초고속)' : '0' + selectedEvent.unit}</span>
                  <span>{selectedEvent.id === 'event-shuttle' ? '11.5초' : (selectedEvent.id === 'event-back' ? '300kg' : selectedEvent.id === 'event-jump' ? '320cm' : '40cm')}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#070B14] border border-zinc-800 text-xs text-zinc-300 font-sans leading-relaxed">
                <span className="font-bold text-lime-400 font-mono block mb-1">💡 아펙스 바이오메카닉스 코칭:</span>
                {selectedEvent.coachingPoint}
              </div>
            </div>

            {/* Right: Telemetry Gauge HUD */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#06090E] border border-zinc-800 space-y-5">
              <span className="text-xs text-zinc-400 font-bold block mb-1">
                SENSOR METRICS &amp; SCORE CONVERSION
              </span>

              {/* Progress Rate Ring/Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-zinc-300">만점 대비 달성률</span>
                  <span className={`font-bold ${rate >= 100 ? 'text-lime-400' : rate >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {rate}% {rate >= 100 ? '(만점 기준 충족)' : ''}
                  </span>
                </div>
                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      rate >= 100 ? 'bg-gradient-to-r from-lime-500 to-emerald-400' : 'bg-lime-500'
                    }`}
                    style={{ width: `${rate}%` }}
                  />
                </div>
              </div>

              {/* Score breakdown telemetry */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800/80">
                  <span className="text-zinc-500 block mb-1">S대(예시) 실기 배점</span>
                  <span className="text-white font-bold text-base">
                    {rate >= 100 ? '100점 (만점)' : rate >= 90 ? '97점 (-1감)' : rate >= 80 ? '94점 (-2감)' : '90점 이하'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800/80">
                  <span className="text-zinc-500 block mb-1">Y대(예시) 실기 배점</span>
                  <span className="text-white font-bold text-base">
                    {rate >= 100 ? '100점 (만점)' : rate >= 90 ? '96점 (-1감)' : rate >= 80 ? '92점 (-2감)' : '88점 이하'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-lime-500/10 border border-lime-500/20 text-xs text-lime-300 leading-normal font-sans">
                ✓ <strong>센서 오차율 0.00%:</strong> 아펙스는 실제 실기장에서 사용되는 공인 전자 계측기와 
                동일한 센서 감도를 적용하여 시험 당일 감점 리스크를 완벽히 통제합니다.
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Suneung & Practical Admission Matrix */}
        <div id="admission-matrix" className="p-6 lg:p-8 rounded-3xl bg-[#0D1526] border border-lime-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs text-lime-400 font-bold block mb-1">
                ADMISSION VIABILITY MATRIX
              </span>
              <h3 className="text-xl font-bold text-white">
                수능 백분위 + 실기 감점 합산 합격선 예측 계산기 (예시)
              </h3>
            </div>

            {/* University Selector */}
            <div className="flex gap-2">
              {(['s-univ', 'y-univ', 'k-univ'] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setTargetUniv(u)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    targetUniv === u
                      ? 'bg-lime-500 text-slate-950 shadow-md shadow-lime-500/20'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {u === 's-univ' ? 'S대 체교(예시)' : u === 'y-univ' ? 'Y대 스포츠(예시)' : 'K대 체교(예시)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Input Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-300">수능 국·수·탐 평균 백분위:</span>
                  <span className="text-lime-400 font-bold">{suneungPercentile}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="99"
                  step="0.5"
                  value={suneungPercentile}
                  onChange={(e) => setSuneungPercentile(Number(e.target.value))}
                  className="w-full accent-lime-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-300">실기 총 감점 예상치:</span>
                  <span className="text-rose-400 font-bold">-{practicalDeductions}감점</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={practicalDeductions}
                  onChange={(e) => setPracticalDeductions(Number(e.target.value))}
                  className="w-full accent-lime-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Viability Status */}
            <div className="p-5 rounded-2xl bg-black/60 border border-zinc-800 text-center space-y-2">
              <span className="text-xs text-zinc-400 block">
                {currentUniv.name} 지원 진단 (예시)
              </span>
              <div className={`text-2xl font-black ${
                suneungPercentile >= currentUniv.minSuneung && practicalDeductions <= currentUniv.maxDeductionAllowed
                  ? 'text-lime-400'
                  : suneungPercentile >= currentUniv.minSuneung - 2.0 && practicalDeductions <= currentUniv.maxDeductionAllowed + 1
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}>
                {suneungPercentile >= currentUniv.minSuneung && practicalDeductions <= currentUniv.maxDeductionAllowed
                  ? '★ 최초합격 안정권'
                  : suneungPercentile >= currentUniv.minSuneung - 2.0 && practicalDeductions <= currentUniv.maxDeductionAllowed + 1
                  ? '▲ 실기 역전 가능권'
                  : '✕ 실기 대폭 향상 필요'}
              </div>
              <p className="text-[11px] text-zinc-500 font-sans">
                {currentUniv.note}
              </p>
            </div>

            {/* Target Criteria Info */}
            <div className="p-4 rounded-2xl bg-[#090F1C] border border-lime-500/20 text-xs space-y-2 font-sans">
              <div className="flex justify-between">
                <span className="text-zinc-400">목표 대학:</span>
                <span className="text-white font-bold">{currentUniv.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">수능 권장선:</span>
                <span className="text-zinc-200">백분위 {currentUniv.minSuneung}% 이상 (예시)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">허용 감점 마지노선:</span>
                <span className="text-lime-400 font-bold">최대 {currentUniv.maxDeductionAllowed}감 이내</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
                * 실제 지원 시 수능 변환표준점수와 대학별 실기 급간 배점이 엄밀히 적용됩니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
