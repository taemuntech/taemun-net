'use client';

import React, { useState } from 'react';
import { SENSORY_METRICS_BY_STAGE, AGE_CURRICULUMS } from '../data/kidsData';

export function SensoryHudSection() {
  const [selectedStage, setSelectedStage] = useState<string>('curri-1');
  const metrics = SENSORY_METRICS_BY_STAGE[selectedStage] || [];
  const currentCurri = AGE_CURRICULUMS.find((c) => c.id === selectedStage);

  return (
    <section id="hud-section" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#2D2A26]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E07A5F] block mb-2">
            Sensory Development HUD
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-[#2D2A26] mb-4">
            연령별 4대 감각 발달 지표
          </h2>
          <p className="text-sm lg:text-base text-[#5C554D] leading-relaxed">
            나이마다 아이들의 뇌와 손이 반응하는 자극은 완전히 다릅니다. 아틀리에 키즈의 발달 단계별 감각 훈련 포인트를 실시간으로 확인해 보세요.
          </p>
        </div>

        {/* Stage Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {AGE_CURRICULUMS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedStage(c.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-semibold transition-all min-h-[44px] ${
                selectedStage === c.id
                  ? 'bg-[#E07A5F] text-white shadow-md'
                  : 'bg-white border border-[#E8E2D9] text-[#5C554D] hover:bg-[#F4F0E8]'
              }`}
            >
              {c.ageGroup} · {c.stageName.split(': ')[1]}
            </button>
          ))}
        </div>

        {/* Metric Cards Grid */}
        <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 lg:p-10 shadow-sm">
          <div className="mb-8 pb-6 border-b border-[#E8E2D9] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#81B29A] uppercase tracking-wider block mb-1">
                {currentCurri?.ageGroup} 핵심 발달 테마
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2D2A26]">
                {currentCurri?.theme}
              </h3>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-[#FDF0EC] text-[#E07A5F] text-xs font-semibold">
              감각 지표 분석 완료 (예시)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {metrics.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-bold text-[#2D2A26]">{m.name}</h4>
                  <span className="text-sm font-bold font-mono text-[#E07A5F]">{m.score}점</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-3 rounded-full bg-[#E8E2D9] overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#F4A261] to-[#E07A5F] transition-all duration-700"
                    style={{ width: `${m.score}%` }}
                  />
                </div>
                <p className="text-xs text-[#7A7369] leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#E8E2D9] flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[#7A7369]">
            <p>※ 모든 감각 발달 수치는 아동 미술 심리 전문 연구원의 표준 임상 가이드라인을 기반으로 한 가상 예시입니다.</p>
            <span className="font-semibold text-[#81B29A]">Atelier Kids Sensory Standard (예시)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
