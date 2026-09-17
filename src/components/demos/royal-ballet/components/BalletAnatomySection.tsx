'use client';

import React, { useState } from 'react';
import { BALLET_POSITIONS } from '../data/balletData';
import { BalletPosition } from '../types';

export function BalletAnatomySection() {
  const [selectedPos, setSelectedPos] = useState<BalletPosition>(BALLET_POSITIONS[0]);
  const [turnoutAngle, setTurnoutAngle] = useState<number>(180);

  const getLoadStatus = (angle: number) => {
    if (angle >= 170) return { label: '프로페셔널 완벽 외회전', color: 'text-[#F4ACB7]', bg: 'bg-[#F4ACB7]/10' };
    if (angle >= 140) return { label: '중급 전공자 안정 회전', color: 'text-emerald-400', bg: 'bg-emerald-400/10' };
    return { label: '기초 골반 적응 단계', color: 'text-amber-400', bg: 'bg-amber-400/10' };
  };

  const status = getLoadStatus(turnoutAngle);

  return (
    <section id="anatomy-section" className="py-20 lg:py-28 bg-[#131117] border-b border-[#252229] text-[#F7F3F5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F4ACB7] block mb-2">
            Ballet Biomechanics & Turnout Simulator
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-4">
            발레 5대 기본 포지션 & 해부학적 턴아웃 Lab
          </h2>
          <p className="text-sm lg:text-base text-[#BDB5BC] leading-relaxed">
            클래식 발레의 모든 회전과 도약은 5가지 발 포지션에서 출발합니다. 각 자세를 클릭하고 턴아웃 각도를 조절하며 활성화되는 심부 근육과 중심축을 실시간으로 확인해 보십시오.
          </p>
        </div>

        {/* 5 Position Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {BALLET_POSITIONS.map((pos) => (
            <button
              key={pos.id}
              type="button"
              onClick={() => setSelectedPos(pos)}
              className={`px-5 py-3 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
                selectedPos.id === pos.id
                  ? 'bg-gradient-to-r from-[#D8829D] to-[#F4ACB7] text-[#0F0E11] shadow-lg ring-2 ring-[#F4ACB7]'
                  : 'bg-[#1C1822] border border-[#2D2636] text-[#BDB5BC] hover:text-white'
              }`}
            >
              {pos.name} ({pos.frenchName})
            </button>
          ))}
        </div>

        {/* Interactive Anatomy Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Visual Foot Position & Turnout Angle Controller (lg: 6 cols) */}
          <div className="lg:col-span-6 bg-[#18151F] border border-[#2D2636] rounded-3xl p-6 lg:p-8">
            <div className="flex justify-between items-center pb-4 border-b border-[#2D2636] mb-6">
              <div>
                <span className="text-[11px] text-[#F4ACB7] uppercase tracking-wider block font-semibold">
                  Foot Diagram & Angle
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  {selectedPos.name} · {selectedPos.frenchName}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}>
                {status.label}
              </span>
            </div>

            {/* Turnout Angle Interactive Slider */}
            <div className="p-4 rounded-2xl bg-[#0F0E11] border border-[#252229] mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-[#BDB5BC]">턴아웃 외회전 각도 조절:</span>
                <span className="text-sm font-serif font-bold text-[#F4ACB7]">{turnoutAngle}°</span>
              </div>
              <input
                type="range"
                min="110"
                max="180"
                step="5"
                value={turnoutAngle}
                onChange={(e) => setTurnoutAngle(parseInt(e.target.value, 10))}
                className="w-full accent-[#F4ACB7] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#786E77] mt-1">
                <span>110° (비기너)</span>
                <span>145° (중급 바레)</span>
                <span>180° (프로페셔널 풀 턴아웃)</span>
              </div>
            </div>

            {/* SVG Visual Representation of Feet */}
            <div className="relative w-full h-64 rounded-2xl bg-[#0F0E11] border border-[#252229] flex flex-col items-center justify-center p-6 shadow-inner">
              {/* Center Plumb Line */}
              <div className="absolute top-0 bottom-0 w-px border-r border-dashed border-[#F4ACB7]/40" />

              <div className="relative flex items-center justify-center">
                {/* Left Foot Mock */}
                <div
                  className="w-10 h-28 rounded-full bg-gradient-to-t from-[#D8829D] to-[#F4ACB7] shadow-lg transition-transform duration-300 flex items-center justify-center text-[10px] font-bold text-[#0F0E11]"
                  style={{
                    transform: `rotate(-${turnoutAngle / 2}deg) translateY(${
                      selectedPos.id === 4 ? '-20px' : '0px'
                    })`,
                  }}
                >
                  L
                </div>
                {/* Right Foot Mock */}
                <div
                  className="w-10 h-28 rounded-full bg-gradient-to-t from-[#F4ACB7] to-[#D8829D] shadow-lg transition-transform duration-300 flex items-center justify-center text-[10px] font-bold text-[#0F0E11]"
                  style={{
                    transform: `rotate(${turnoutAngle / 2}deg) translateY(${
                      selectedPos.id === 4 ? '20px' : '0px'
                    })`,
                    marginLeft: selectedPos.id === 2 ? '50px' : selectedPos.id === 5 ? '-20px' : '6px',
                  }}
                >
                  R
                </div>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[11px] text-[#786E77]">
                <span>수직 중심축: {selectedPos.centerOfGravity}</span>
                <span className="text-[#F4ACB7]">골반 외회전 연동</span>
              </div>
            </div>
          </div>

          {/* Right: Muscle Anatomy Breakdown (lg: 6 cols) */}
          <div className="lg:col-span-6 bg-[#18151F] border border-[#2D2636] rounded-3xl p-6 lg:p-8">
            <span className="text-xs font-semibold text-[#F4ACB7] uppercase tracking-wider block mb-2">
              Musculoskeletal Engagement
            </span>
            <h3 className="text-xl font-serif font-bold text-white mb-2">
              주요 근육 활성화 및 정렬 기준
            </h3>
            <p className="text-xs text-[#BDB5BC] leading-relaxed mb-6">
              {selectedPos.description}
            </p>

            <div className="space-y-4 mb-6">
              <span className="text-xs font-bold text-[#E2DCE0] block">
                해당 자세에서 집중 훈련되는 심부 근육군
              </span>
              {selectedPos.muscleEngagement.map((muscle, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#0F0E11] border border-[#252229] flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-[#F4ACB7]/20 text-[#F4ACB7] flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{muscle}</h4>
                    <p className="text-[11px] text-[#9E939D] mt-0.5">
                      관절의 과신전을 방지하고 척추 기립선을 안정적으로 지탱합니다.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#251E28] border border-[#3E2E42] text-[11px] text-[#BDB5BC]">
              <p className="leading-relaxed">
                ※ 로열 발레 아카데미는 모든 수강생의 입학 전 1:1 골반 및 발목 가동 범위를 실측 진단하여 무리 없는 맞춤형 턴아웃 교정을 시행합니다. (예시)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
