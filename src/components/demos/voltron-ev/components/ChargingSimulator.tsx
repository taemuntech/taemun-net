import React, { useState, useMemo } from 'react';
import { Sliders, Gauge, Activity, RefreshCw } from 'lucide-react';
import { SimulationParams, SimulationResults } from '../types';

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
              실시간 800V 초급속 충전 프로파일 및 액체 냉각 루프 발열 시뮬레이션
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
            <div className="flex items-center justify-between border-b border-[#3b494c]/30 pb-3">
              <span className="font-display text-base text-[#c3f5ff] font-semibold flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#00e5ff]" />
                INPUT PARAMETERS
              </span>
              <button
                id="reset-sim-btn"
                onClick={handleReset}
                className="text-xs font-code text-[#849396] hover:text-[#00e5ff] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                [DEFAULT VALUES]
              </button>
            </div>

            {/* Parameter 1: Battery Capacity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-code">
                <span className="text-[#bac9cc] uppercase tracking-wider">Battery Pack Capacity</span>
                <span id="battery-capacity-val" className="text-[#00e5ff] font-bold text-sm">
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
                className="w-full h-1.5 bg-[#272a30] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-code text-[#849396]">
                <span>75 kWh (Standard)</span>
                <span>95 kWh (GT)</span>
                <span>120 kWh (Endurance)</span>
              </div>
            </div>

            {/* Parameter 2: Ambient Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-code">
                <span className="text-[#bac9cc] uppercase tracking-wider">
                  Ambient Environmental Temp
                </span>
                <span id="ambient-temp-val" className="text-[#a8ffd2] font-bold text-sm">
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
                className="w-full h-1.5 bg-[#272a30] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-code text-[#849396]">
                <span>-20°C (Cold Start)</span>
                <span>25°C (Ideal Lab)</span>
                <span>+45°C (Desert Thermal)</span>
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
            <div className="p-3 rounded bg-[#101319] border border-[#3b494c]/40 flex items-center justify-between font-code text-xs">
              <span className="text-[#849396]">SiC PRE-CONDITIONING:</span>
              <span
                id="preconditioning-status-pill"
                className={`flex items-center gap-1.5 font-bold ${ results.preconditioningType === 'optimal' ? 'text-[#5be9ad]' : results.preconditioningType === 'heating' ? 'text-[#b4c5ff]' : 'text-[#00e5ff]' }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${ results.preconditioningType === 'optimal' ? 'bg-[#5be9ad]' : results.preconditioningType === 'heating' ? 'bg-[#b4c5ff]' : 'bg-[#00e5ff] animate-pulse' }`}
                />
                {results.preconditioningLabel}
              </span>
            </div>
          </div>

          {/* Right Column: Computed Telemetry Dashboard */}
          <div className="lg:col-span-7 bg-[#1d2025] p-6 lg:p-8 rounded-lg border border-[#00e5ff]/30 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-[#3b494c]/30 pb-4 mb-6">
              <span className="font-display text-base text-[#c3f5ff] font-semibold flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#00e5ff]" />
                SIMULATED PERFORMANCE MATRIX (10% → 80% SoC)
              </span>
              <span className="text-xs font-code text-[#5be9ad] flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5be9ad] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5be9ad]"></span>
                </span>
                SYNCED REAL-TIME
              </span>
            </div>

            {/* Dynamic Output Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
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
                  WLTP Certified equivalent
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
              <div className="flex justify-between items-center text-[#849396] mb-2">
                <span>VOLTAGE BUS RECTIFICATION</span>
                <span id="current-draw-status" className="text-[#00e5ff] font-bold">
                  CURRENT: {results.currentAmps} A @ 804.2V DC
                </span>
              </div>
              <div className="h-2 w-full bg-[#32353b] rounded overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-pulse opacity-75" />
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#849396] mt-2">
                <span>CHARGER STACK {params.chargerPower}kW</span>
                <span className="text-[#c3f5ff] font-semibold">SiC DIRECT INVERTER</span>
                <span className="text-[#5be9ad] font-semibold">CELL ARRAY (NMC 811)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
