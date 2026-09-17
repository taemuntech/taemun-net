'use client';

import React, { useState } from 'react';
import { RUGGED_SENSORS } from '../data/strataData';
import { RuggedSensor } from '../types';

export default function RuggedSiteHUD() {
  const [selectedSensor, setSelectedSensor] = useState<RuggedSensor>(RUGGED_SENSORS[0]);

  return (
    <section id="hud" className="relative w-full border-t border-slate-800 bg-slate-900/60 py-16 text-white lg:py-24">
      {/* 테크니컬 배경 음영 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* 섹션 헤더 */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MIL-SPEC RUGGED FIELD TELEMETRY</span>
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white lg:text-4xl">
              러기드 감리 패드 — 현장 정밀 계측 텔레메트리
            </h2>
            <p className="mt-2 text-sm text-slate-400 lg:text-base">
              60MPa 초고강도 콘크리트 수화열부터 180m 상공 타워크레인 풍속까지, 오차 없는 시공 품질을 실시간으로 감리합니다.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="rounded bg-slate-800 px-2.5 py-1 text-slate-300">DEVICE: STRATA-PAD-X8</span>
            <span className="rounded bg-emerald-500/20 px-2.5 py-1 text-emerald-400 border border-emerald-500/30">SYNC: 100Hz</span>
          </div>
        </div>

        {/* 메인 러기드 콘솔 프레임 */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 좌측: 4대 센서 계측 카드 리스트 (7열) */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-7 lg:grid-cols-2">
            {RUGGED_SENSORS.map((sensor) => {
              const isSelected = selectedSensor.id === sensor.id;
              return (
                <button
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor)}
                  className={`group relative flex flex-col justify-between rounded-lg border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-slate-950/90 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                      : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-950/80'
                  }`}
                >
                  <div>
                    {/* 상단 센서 코드 및 상태 배지 */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-slate-500">{sensor.code}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold ${
                          sensor.status === 'STABLE'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {sensor.status}
                      </span>
                    </div>

                    {/* 센서 이름 및 위치 */}
                    <h3 className="mt-2 text-sm font-bold text-white group-hover:text-amber-300">
                      {sensor.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-slate-400">{sensor.location}</p>
                  </div>

                  {/* 하단 실측치 & 단위 */}
                  <div className="mt-4 flex items-baseline justify-between border-t border-slate-800/80 pt-2">
                    <span className="font-mono text-[10px] text-slate-500">CURRENT VALUE</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-2xl font-black text-amber-400">{sensor.value}</span>
                      <span className="font-mono text-xs text-slate-300">{sensor.unit}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 우측: 선택된 센서 상세 진단 패널 (5열) */}
          <div className="flex flex-col justify-between rounded-lg border border-amber-500/40 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-xl lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="font-mono text-xs text-amber-400">SENSOR DIAGNOSTICS</span>
                  <h3 className="mt-1 text-lg font-bold text-white">{selectedSensor.name}</h3>
                </div>
                <div className="text-right font-mono text-[11px] text-slate-400">
                  REF: {selectedSensor.code}
                  <div className="text-emerald-400 font-bold">NORMAL STABLE</div>
                </div>
              </div>

              {/* 실측치 대형 디스플레이 */}
              <div className="my-6 rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-center">
                <span className="font-mono text-[10px] text-slate-400">ACTIVE REAL-TIME MEASUREMENT</span>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <span className="font-mono text-4xl font-black tracking-tight text-amber-400 lg:text-5xl">
                    {selectedSensor.value}
                  </span>
                  <span className="font-mono text-xl font-bold text-slate-300">
                    {selectedSensor.unit}
                  </span>
                </div>
                <p className="mt-2 text-xs font-mono text-slate-400">
                  {selectedSensor.threshold}
                </p>
              </div>

              {/* 센서 상세 감리 분석 설명 */}
              <div className="space-y-3">
                <div className="text-xs leading-relaxed text-slate-300">
                  <strong className="text-amber-300">감리 분석 리포트: </strong>
                  {selectedSensor.description}
                </div>

                {/* 최근 계측 이력 히스토그램 시각화 */}
                <div className="rounded border border-slate-800/80 bg-slate-900/40 p-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                    <span>RECENT LOG (최근 6개 측정 주기)</span>
                    <span className="text-amber-400">±0.2% DRIFT</span>
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-1.5 h-14">
                    {selectedSensor.history.map((val, idx) => {
                      const max = Math.max(...selectedSensor.history);
                      const heightPct = Math.max(20, Math.round((val / (max || 1)) * 100));
                      return (
                        <div key={idx} className="flex flex-1 flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t bg-amber-500/60 transition-all hover:bg-amber-400"
                            style={{ height: `${heightPct}%` }}
                          />
                          <span className="font-mono text-[9px] text-slate-500">{val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 패널 인증 바 */}
            <div className="mt-6 border-t border-slate-800 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>INSPECTOR: 책임감리원 기술사회</span>
              <span className="text-amber-400">VERIFIED ✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
