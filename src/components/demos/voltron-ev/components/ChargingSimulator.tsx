import React, { useState, useMemo } from 'react';
import { Sliders, Gauge, Activity, RefreshCw } from 'lucide-react';
import { SimulationParams, SimulationResults } from '../types';

// 슬라이더는 트랙이 6px 이라 탭 대상이 277×6 이었다(44px 기준 미달).
// 보이는 트랙 두께는 그대로 두고 input 자체를 44px 로 키워 손가락이 닿는 영역만 넓힌다.
// 손잡이 색은 브라우저 기본 파랑 대신 이 데모의 시안(#00e5ff)으로 맞춘다.
const RANGE_INPUT_CLASS = [
  'w-full h-11 bg-transparent appearance-none cursor-pointer',
  '[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-[#272a30]',
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:-mt-[5px]',
  '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00e5ff] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,229,255,0.6)]',
  '[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:bg-[#272a30]',
  '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#00e5ff]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#191c21] rounded',
].join(' ');

export const ChargingSimulator: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    batteryCapacity: 100,
    ambientTemp: 25,
    chargerPower: 500,
  });

  // Calculate results based on physics heuristic
  const results: SimulationResults = useMemo(() => {
    const { batteryCapacity, ambientTemp, chargerPower } = params;

    // Energy needed for 10% -> 80% is 70% of pack capacity
    const energyNeeded = batteryCapacity * 0.7;

    // Ambient temperature efficiency factor
    let tempEfficiency = 1.0;
    if (ambientTemp < 0) {
      tempEfficiency = 0.72 + (ambientTemp + 20) * 0.01;
    } else if (ambientTemp > 35) {
      tempEfficiency = 0.90 - (ambientTemp - 35) * 0.015;
    }

    // Effective continuous charging power
    const effectivePower = Math.min(chargerPower, 520) * tempEfficiency;

    // Time in minutes
    const timeMinutes = ((energyNeeded / effectivePower) * 60).toFixed(1);

    // Range added in 5 minutes (based on 18 kWh/100km consumption rate)
    const energy5Min = effectivePower * (5 / 60);
    const range5Min = Math.round(energy5Min / 0.18);

    // Peak heat rejection
    const lossRatio = chargerPower === 500 ? 0.018 : chargerPower === 350 ? 0.014 : 0.011;
    let thermalLoad = effectivePower * lossRatio + (ambientTemp > 30 ? (ambientTemp - 30) * 0.12 : 0);
    if (ambientTemp < 0) thermalLoad += 1.8;
    const peakHeat = thermalLoad.toFixed(1);

    // Preconditioning state
    let preconditioningLabel = 'THERMAL WINDOW OPTIMAL';
    let preconditioningType: 'optimal' | 'heating' | 'cooling' = 'optimal';
    let coolingLoopText = 'Direct Pin-Fin Glycol Loop Active';

    if (ambientTemp < 0) {
      preconditioningLabel = 'BATTERY PACK PRE-HEATING (GLYCOL)';
      preconditioningType = 'heating';
      coolingLoopText = 'Active PTC Heater Loop';
    } else if (ambientTemp > 35) {
      preconditioningLabel = 'CHILLER COMPRESSOR MAXIMUM';
      preconditioningType = 'cooling';
      coolingLoopText = 'High-Speed Glycol + Refrigerant Chiller';
    }

    // Bus current draw at 804.2 V
    const current = ((chargerPower * 1000) / 804.2).toFixed(1);

    // Normalized progress bar percentages
    const timeNum = parseFloat(timeMinutes);
    const timeProgress = Math.min(100, Math.max(20, (100 - (timeNum * 2.8))));
    const rangeProgress = Math.min(100, (range5Min / 250) * 100);
    const heatProgress = Math.min(100, (parseFloat(peakHeat) / 10.0) * 100);

    return {
      chargingTimeMinutes: timeMinutes,
      rangeAdded5Min: range5Min,
      peakHeatRejectionKw: peakHeat,
      preconditioningLabel,
      preconditioningType,
      coolingLoopText,
      currentAmps: current,
      timeProgressPercent: timeProgress,
      rangeProgressPercent: rangeProgress,
      heatProgressPercent: heatProgress,
    };
  }, [params]);

  const handleReset = () => {
    setParams({
      batteryCapacity: 100,
      ambientTemp: 25,
      chargerPower: 500,
    });
  };

  return (
    <section
      id="charging-sim"
      className="py-16 lg:py-24 bg-[#0b0e13] border-b border-[#3b494c]/30 relative"
    >
      <div className="max-w-[1720px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#3b494c]/20 pb-6">
          <div>
            <span className="font-code text-xs text-[#00e5ff] uppercase tracking-widest block mb-2">
              // TELEMETRY SIMULATION COCKPIT
            </span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#e1e2ea] tracking-tight uppercase">
              800V Ultra-Fast Charging &amp; Thermal Simulator
            </h2>
            <p className="font-body text-sm text-[#bac9cc] mt-1">
              800V 초급속 충전 프로파일 및 액체 냉각 루프 발열 시뮬레이션 — 브라우저 안에서 도는 예시 계산이며 실제 계측값이 아닙니다
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-code text-xs text-[#849396]">ENGINEERING MODEL:</span>
            <span className="px-3 py-1 rounded bg-[#272a30] text-[#00e5ff] font-code text-xs border border-[#00e5ff]/30">
              VOLTRON-NUMERICAL-v4.8
            </span>
          </div>
        </div>

        {/* Simulator Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sliders & Controls */}
          <div className="lg:col-span-5 bg-[#191c21] p-6 rounded-lg border border-[#3b494c]/40 space-y-6 shadow-xl">
            {/* gap 없이 붙어 375 에서 「INPUT PARAMETERS」·「[DEFAULT VALUES]」 가 둘 다 두 줄로 접혔다 */}
            <div className="flex items-center justify-between gap-3 border-b border-[#3b494c]/30 pb-3">
              <span className="font-display text-base text-[#c3f5ff] font-semibold flex items-center gap-2 whitespace-nowrap">
                <Sliders className="w-4 h-4 text-[#00e5ff] shrink-0" />
                INPUT PARAMETERS
              </span>
              <button
                id="reset-sim-btn"
                onClick={handleReset}
                className="text-xs font-code text-[#849396] hover:text-[#00e5ff] transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 min-h-11 lg:min-h-0 -my-2 lg:my-0 px-1"
              >
                <RefreshCw className="w-3 h-3 shrink-0" />
                [DEFAULT VALUES]
              </button>
            </div>

            {/* Parameter 1: Battery Capacity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center gap-3 text-xs font-code">
                <span className="text-[#bac9cc] uppercase tracking-wider">Battery Pack Capacity</span>
                <span id="battery-capacity-val" className="text-[#00e5ff] font-bold text-sm shrink-0">
                  {params.batteryCapacity} kWh
                </span>
              </div>
              <input
                id="battery-slider"
                type="range"
                min="75"
                max="120"
                step="5"
                value={params.batteryCapacity}
                onChange={e =>
                  setParams(p => ({ ...p, batteryCapacity: Number(e.target.value) }))
                }
                aria-label="Battery Pack Capacity (kWh)"
                className={RANGE_INPUT_CLASS}
              />
              {/* justify-between 3개가 375(폭 277px)에서 서로 맞닿았다 — 3열 격자로 자리를 고정하고
                  좁은 폰에서는 괄호 설명을 접는다 */}
              <div className="grid grid-cols-3 text-[10px] font-code text-[#849396]">
                <span className="text-left">75 kWh<span className="hidden sm:inline"> (Standard)</span></span>
                <span className="text-center">95 kWh<span className="hidden sm:inline"> (GT)</span></span>
                <span className="text-right">120 kWh<span className="hidden sm:inline"> (Endurance)</span></span>
              </div>
            </div>

            {/* Parameter 2: Ambient Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center gap-3 text-xs font-code">
                <span className="text-[#bac9cc] uppercase tracking-wider">
                  Ambient Environmental Temp
                </span>
                <span id="ambient-temp-val" className="text-[#a8ffd2] font-bold text-sm shrink-0">
                  {params.ambientTemp > 0 ? `+${params.ambientTemp}` : params.ambientTemp} °C
                </span>
              </div>
              <input
                id="temp-slider"
                type="range"
                min="-20"
                max="45"
                step="1"
                value={params.ambientTemp}
                onChange={e =>
                  setParams(p => ({ ...p, ambientTemp: Number(e.target.value) }))
                }
                aria-label="Ambient Environmental Temp (°C)"
                className={RANGE_INPUT_CLASS}
              />
              <div className="grid grid-cols-3 text-[10px] font-code text-[#849396]">
                <span className="text-left">-20°C<span className="hidden sm:inline"> (Cold Start)</span></span>
                <span className="text-center">25°C<span className="hidden sm:inline"> (Ideal Lab)</span></span>
                <span className="text-right">+45°C<span className="hidden sm:inline"> (Desert Thermal)</span></span>
              </div>
            </div>

            {/* Parameter 3: Charger Max Power */}
            <div className="space-y-2.5">
              <span className="text-xs font-code text-[#bac9cc] uppercase tracking-wider block">
                Charger Protocol &amp; Power Level
              </span>
              <div className="grid grid-cols-3 gap-2 font-code text-xs">
                <button
                  id="charger-btn-150"
                  onClick={() => setParams(p => ({ ...p, chargerPower: 150 }))}
                  className={`p-2.5 rounded transition-all text-center cursor-pointer ${ params.chargerPower === 150 ? 'bg-[#1d2025] border-2 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.3)]' : 'bg-[#1d2025] border border-[#3b494c]/50 text-[#e1e2ea] hover:border-[#00e5ff]' }`}
                >
                  <span className="block font-bold">150 kW</span>
                  <span
                    className={`text-[9px] block ${ params.chargerPower === 150 ? 'text-[#00e5ff]' : 'text-[#849396]' }`}
                  >
                    Legacy 400V
                  </span>
                </button>

                <button
                  id="charger-btn-350"
                  onClick={() => setParams(p => ({ ...p, chargerPower: 350 }))}
                  className={`p-2.5 rounded transition-all text-center cursor-pointer ${ params.chargerPower === 350 ? 'bg-[#1d2025] border-2 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.3)]' : 'bg-[#1d2025] border border-[#3b494c]/50 text-[#e1e2ea] hover:border-[#00e5ff]' }`}
                >
                  <span className="block font-bold">350 kW</span>
                  <span
                    className={`text-[9px] block ${ params.chargerPower === 350 ? 'text-[#00e5ff]' : 'text-[#849396]' }`}
                  >
                    Standard 800V
                  </span>
                </button>

                <button
                  id="charger-btn-500"
                  onClick={() => setParams(p => ({ ...p, chargerPower: 500 }))}
                  className={`p-2.5 rounded transition-all text-center cursor-pointer ${ params.chargerPower === 500 ? 'bg-[#1d2025] border-2 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.3)]' : 'bg-[#1d2025] border border-[#3b494c]/50 text-[#e1e2ea] hover:border-[#00e5ff]' }`}
                >
                  <span className="block font-bold">500 kW</span>
                  <span
                    className={`text-[9px] block ${ params.chargerPower === 500 ? 'text-[#00e5ff]' : 'text-[#849396]' }`}
                  >
                    Voltron Megawatt
                  </span>
                </button>
              </div>
            </div>

            {/* Active Conditioning Pill */}
            <div className="p-3 rounded bg-[#101319] border border-[#3b494c]/40 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-code text-xs">
              <span className="text-[#849396] whitespace-nowrap">SiC PRE-CONDITIONING:</span>
              <span
                id="preconditioning-status-pill"
                className={`flex items-center gap-1.5 font-bold text-right ${ results.preconditioningType === 'optimal' ? 'text-[#5be9ad]' : results.preconditioningType === 'heating' ? 'text-[#b4c5ff]' : 'text-[#00e5ff]' }`}
              >
                <span
                  className={`w-2 h-2 shrink-0 rounded-full ${ results.preconditioningType === 'optimal' ? 'bg-[#5be9ad]' : results.preconditioningType === 'heating' ? 'bg-[#b4c5ff]' : 'bg-[#00e5ff] animate-pulse' }`}
                />
                {results.preconditioningLabel}
              </span>
            </div>
          </div>

          {/* Right Column: Computed Telemetry Dashboard */}
          <div className="lg:col-span-7 bg-[#1d2025] p-6 lg:p-8 rounded-lg border border-[#00e5ff]/30 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />

            {/* 375 에서 제목이 4줄로 접히며 아이콘만 왼쪽에 따로 떨어져 보였다 — items-start 로 붙이고 줄바꿈을 허용 */}
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 border-b border-[#3b494c]/30 pb-4 mb-6">
              <span className="font-display text-sm lg:text-base text-[#c3f5ff] font-semibold flex items-start gap-2 min-w-0">
                <Gauge className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                SIMULATED PERFORMANCE MATRIX (10% → 80% SoC)
              </span>
              <span className="text-xs font-code text-[#5be9ad] flex items-center gap-1 whitespace-nowrap shrink-0">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5be9ad] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5be9ad]"></span>
                </span>
                SAMPLE CALCULATION
              </span>
            </div>

            {/* Dynamic Output Grid — 태블릿(768) 중간 단계. 모바일/웹 경계는 그대로 lg 이다 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Charging Time Card */}
              <div className="p-4 rounded bg-[#0b0e13] border border-[#3b494c]/30">
                <span className="font-code text-[10px] text-[#849396] uppercase block mb-1">
                  Time (10% to 80%)
                </span>
                <div
                  id="calc-time-display"
                  className="font-display text-3xl font-bold text-[#00e5ff] tracking-tight"
                >
                  {results.chargingTimeMinutes} Mins
                </div>
                <div className="w-full bg-[#272a30] h-1.5 rounded mt-3 overflow-hidden">
                  <div
                    className="bg-[#00e5ff] h-full transition-all duration-300"
                    style={{ width: `${results.timeProgressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-code text-[#5be9ad] mt-2 block">
                  Ultra-fast DC curve
                </span>
              </div>

              {/* Range Added Card */}
              <div className="p-4 rounded bg-[#0b0e13] border border-[#3b494c]/30">
                <span className="font-code text-[10px] text-[#849396] uppercase block mb-1">
                  Range Added / 5 Min
                </span>
                <div
                  id="calc-range-display"
                  className="font-display text-3xl font-bold text-[#a8ffd2] tracking-tight"
                >
                  +{results.rangeAdded5Min} km
                </div>
                <div className="w-full bg-[#272a30] h-1.5 rounded mt-3 overflow-hidden">
                  <div
                    className="bg-[#5be9ad] h-full transition-all duration-300"
                    style={{ width: `${results.rangeProgressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-code text-[#849396] mt-2 block">
                  주행거리 환산 — 예시 수치
                </span>
              </div>

              {/* Heat Dissipation Card */}
              <div className="p-4 rounded bg-[#0b0e13] border border-[#3b494c]/30">
                <span className="font-code text-[10px] text-[#849396] uppercase block mb-1">
                  Peak Heat Rejection
                </span>
                <div
                  id="calc-heat-display"
                  className="font-display text-3xl font-bold text-[#b4c5ff] tracking-tight"
                >
                  {results.peakHeatRejectionKw} kW
                </div>
                <div className="w-full bg-[#272a30] h-1.5 rounded mt-3 overflow-hidden">
                  <div
                    className="bg-[#b4c5ff] h-full transition-all duration-300"
                    style={{ width: `${results.heatProgressPercent}%` }}
                  />
                </div>
                <span
                  id="cooling-loop-desc"
                  className="text-[10px] font-code text-[#bac9cc] mt-2 block"
                >
                  {results.coolingLoopText}
                </span>
              </div>
            </div>

            {/* Dynamic Electrical Flow Diagram */}
            <div className="p-4 rounded bg-[#191c21] border border-[#3b494c]/40 font-code text-xs">
              <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1 text-[#849396] mb-2">
                <span className="whitespace-nowrap">VOLTAGE BUS RECTIFICATION</span>
                <span id="current-draw-status" className="text-[#00e5ff] font-bold whitespace-nowrap">
                  CURRENT: {results.currentAmps} A @ 804.2V DC
                </span>
              </div>
              <div className="h-2 w-full bg-[#32353b] rounded overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-pulse opacity-75" />
              </div>
              {/* 세 칸이 375 에서 서로 맞닿았다 — 3열 격자로 자리를 고정하고 줄바꿈을 허용 */}
              <div className="grid grid-cols-3 gap-2 items-start text-[10px] text-[#849396] mt-2">
                <span className="text-left">CHARGER STACK {params.chargerPower}kW</span>
                <span className="text-[#c3f5ff] font-semibold text-center">SiC DIRECT INVERTER</span>
                <span className="text-[#5be9ad] font-semibold text-right">CELL ARRAY (NMC 811)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
