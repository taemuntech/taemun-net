import React, { useState } from 'react';
import { EVENT_CONFIGS } from '../data/labData';
import { EventType } from '../types';

export const ScoreConverterSection: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<EventType>('long-jump');
  const currentConfig = EVENT_CONFIGS[selectedEventId];
  const [currentValue, setCurrentValue] = useState<number>(currentConfig.defaultValue);

  const handleEventChange = (eventId: EventType) => {
    setSelectedEventId(eventId);
    setCurrentValue(EVENT_CONFIGS[eventId].defaultValue);
  };

  // Calculate dynamic percentile estimation
  const getPercentile = (val: number, config: typeof currentConfig) => {
    const ratio = (val - config.min) / (config.max - config.min);
    const p = Math.min(99.9, Math.max(50.0, +(ratio * 50 + 50).toFixed(1)));
    return `+${p}% PERCENTILE`;
  };

  return (
    <section
      id="score-converter"
      className="w-full bg-[#201f1f] px-4 lg:px-12 py-10 lg:py-16 border-b border-[#2a2a2a]"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <span className="font-telemetry text-[12px] text-[#c3f400] font-bold uppercase tracking-widest">
            [ REAL-TIME ADMISSION SPEC MATRIX // 2024-2025 ]
          </span>
          <span className="h-px bg-[#2a2a2a] flex-1"></span>
        </div>

        <h2 className="font-sans text-[28px] lg:text-[36px] lg:text-[40px] font-bold text-[#ffffff] uppercase tracking-tight">
          대학·특채 실기 점수 정밀 환산기 (예시)
        </h2>

        <p className="font-sans text-[14px] lg:text-[15px] text-[#9e9b9a]">
          지망 대학 및 시험 기관의 실기 배점표를 1,000Hz 정밀 계측 수치와 즉시 동기화하여 목표 대학 환산점수 및 합격 티어를 산출합니다.
        </p>
      </div>

      {/* Event Switcher Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.values(EVENT_CONFIGS).map((item) => {
          const isActive = selectedEventId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleEventChange(item.id)}
              className={`px-4 py-2 font-telemetry text-[12px] uppercase font-bold transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#ff5625] text-[#541100] shadow-[2px_2px_0px_#000000]'
                  : 'bg-[#2a2a2a] hover:bg-[#353534] text-[#e5e2e1] border border-[#353534]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Interactive Tape-Measure Metric Slider Console */}
      <div className="w-full bg-[#1c1b1b] p-6 lg:p-8 border border-[#2a2a2a] shadow-[2px_2px_0px_#000000] mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 bg-[#0e0e0e] p-4 border border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#c3f400]"></div>
            <span className="font-sans text-[16px] lg:text-[18px] text-[#ffffff] font-bold uppercase tracking-tight">
              {currentConfig.englishLabel}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-telemetry text-[11px] text-[#9e9b9a]">
              CURRENT TEST RECORD:
            </span>
            <span className="font-telemetry text-[28px] lg:text-[34px] text-[#c3f400] font-bold tabular-nums">
              {currentValue} {currentConfig.unit}
            </span>
            <span className="font-telemetry text-[12px] text-[#ff5625] font-bold">
              [{getPercentile(currentValue, currentConfig)}]
            </span>
          </div>
        </div>

        {/* Tape-Measure Slider Strip */}
        <div className="relative w-full py-4 flex flex-col justify-center">
          {/* SVG Realistic Tape Ruler Gradations */}
          <div className="w-full h-12 bg-[#2a2a2a] border border-[#353534] relative overflow-hidden flex items-center px-4">
            <svg
              className="w-full h-10 text-[#9e9b9a]/40"
              preserveAspectRatio="none"
              viewBox="0 0 1000 40"
            >
              <line stroke="currentColor" strokeWidth="2.5" x1="0" x2="0" y1="0" y2="40" />
              <line stroke="currentColor" strokeWidth="1" x1="50" x2="50" y1="20" y2="40" />
              <line stroke="currentColor" strokeWidth="1.5" x1="100" x2="100" y1="15" y2="40" />
              <line stroke="currentColor" strokeWidth="1" x1="150" x2="150" y1="20" y2="40" />
              <line stroke="currentColor" strokeWidth="2" x1="200" x2="200" y1="10" y2="40" />
              <line stroke="currentColor" strokeWidth="1" x1="250" x2="250" y1="20" y2="40" />
              <line stroke="currentColor" strokeWidth="1.5" x1="300" x2="300" y1="15" y2="40" />
              <line stroke="currentColor" strokeWidth="1" x1="350" x2="350" y1="20" y2="40" />
              <line stroke="currentColor" strokeWidth="2" x1="400" x2="400" y1="10" y2="40" />
              <line stroke="currentColor" strokeWidth="1" x1="450" x2="450" y1="20" y2="40" />
              <line stroke="currentColor" strokeWidth="3" x1="500" x2="500" y1="0" y2="40" />
              <line stroke="currentColor" strokeWidth="1" x1="550" x2="550" y1="20" y2="40" />
              <line stroke="currentColor" strokeWidth="2" x1="600" x2="600" y1="10" y2="40" />
              <line stroke="currentColor" strokeWidth="1" x1="650" x2="650" y1="20" y2="40" />
              <line stroke="currentColor" strokeWidth="1.5" x1="700" x2="700" y1="15" y2="40" />
              <line stroke="currentColor" strokeWidth="1" x1="750" x2="750" y1="20" y2="40" />
              <line stroke="currentColor" strokeWidth="2" x1="800" x2="800" y1="10" y2="40" />
              <line stroke="currentColor" strokeWidth="1" x1="850" x2="850" y1="20" y2="40" />
              <line stroke="currentColor" strokeWidth="1.5" x1="900" x2="900" y1="15" y2="40" />
              <line stroke="currentColor" strokeWidth="1" x1="950" x2="950" y1="20" y2="40" />
              <line stroke="currentColor" strokeWidth="2.5" x1="1000" x2="1000" y1="0" y2="40" />
            </svg>
          </div>

          {/* Range Slider Input */}
          <input
            type="range"
            min={currentConfig.min}
            max={currentConfig.max}
            step={currentConfig.step}
            value={currentValue}
            onChange={(e) => setCurrentValue(parseFloat(e.target.value))}
            className="w-full h-3 appearance-none bg-transparent cursor-pointer relative z-10 -mt-6 accent-[#ff5625]"
          />

          {/* Metric Range Labels */}
          <div className="flex justify-between w-full mt-3 font-telemetry text-[11px] text-[#9e9b9a] font-bold overflow-x-auto gap-2">
            {currentConfig.rulerMarkers.map((m, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentValue(m.val)}
                className={`cursor-pointer hover:underline whitespace-nowrap ${
                  m.colorClass || ''
                }`}
              >
                {m.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Multi-Target Conversion Points Board (동시 만점 판정 매트릭스) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentConfig.targets.map((target) => {
          const result = target.calculateScore(currentValue);
          return (
            <div
              key={target.id}
              className="flex flex-col justify-between p-5 bg-[#1c1b1b] border border-[#2a2a2a] shadow-[2px_2px_0px_#000000]"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-telemetry text-[11px] text-[#ffb5a0] font-bold">
                    {target.sectionTag}
                  </span>
                  <span className="font-telemetry text-[10px] px-2 py-0.5 bg-[#2a2a2a] border border-[#353534] text-[#ffffff]">
                    {target.category}
                  </span>
                </div>

                <h4 className="font-sans text-[17px] font-bold text-[#ffffff]">
                  {target.institution}
                </h4>

                <span className="font-sans text-[12px] text-[#9e9b9a]">
                  {target.maxCriteria}
                </span>

                <div className="my-3 p-3 bg-[#0e0e0e] border border-[#2a2a2a]">
                  <div className="flex items-baseline justify-between">
                    <span className="font-telemetry text-[11px] text-[#9e9b9a]">
                      환산 배점
                    </span>
                    <span className="font-telemetry text-[22px] text-[#c3f400] font-bold">
                      {result.score} {target.scoreUnit}
                    </span>
                  </div>

                  <div className="w-full bg-[#2a2a2a] h-1.5 mt-2">
                    <div
                      className="bg-[#c3f400] h-full transition-all duration-200"
                      style={{ width: `${Math.min(100, Math.max(0, result.percentage))}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#2a2a2a]">
                <span className="font-telemetry text-[10px] text-[#9e9b9a]">
                  합격 가용 티어
                </span>
                <span className={`font-telemetry text-[12px] font-bold ${result.tierClass}`}>
                  {result.tier}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
