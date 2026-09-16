import React, { useEffect, useState } from 'react';
import { Zap, Thermometer } from 'lucide-react';

export const TopTicker: React.FC = () => {
  const [busVoltage, setBusVoltage] = useState(804.2);
  const [junctionTemp, setJunctionTemp] = useState(45.3);

  // 화면용 예시 수치 — 실제 계측기에서 오는 값이 아니라 브라우저 안에서 흔들어 보이는 숫자다.
  useEffect(() => {
    const interval = setInterval(() => {
      setBusVoltage(() => +(804.0 + (Math.random() * 0.4)).toFixed(1));
      setJunctionTemp(() => +(45.1 + (Math.random() * 0.5)).toFixed(1));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="top-telemetry-ticker"
      className="w-full bg-[#101319] border-b border-[#3b494c]/40 px-4 py-1.5 overflow-hidden flex items-center justify-between text-[#bac9cc] font-code text-[11px] z-50 relative select-none"
    >
      <div className="flex items-center gap-3 shrink-0">
        <span className="inline-flex items-center gap-1.5 text-[#00e5ff]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
          </span>
          <span className="font-bold tracking-wider">TELEMETRY NODE (SAMPLE DATA)</span>
        </span>
        <span className="hidden lg:inline text-[#3b494c]">|</span>
        <span className="hidden lg:inline text-[#bac9cc] tracking-wider">
          NODE: STUTTGART-PANGYO-800V-ACTIVE
        </span>
      </div>

      <div className="overflow-hidden whitespace-nowrap ml-4 flex-1">
        <div className="animate-marquee tracking-wider text-[#bac9cc]">
          <span>
            SiC 150mm/200mm Wafer Fab: Optimal 99.8% Yield • 800V High-Voltage Bus Nominal • 1,200V MOSFET ASIL-D Validated • Global Tier-1 Node Active • Torque Vectoring Cycle: 0.12ms Latency • Megawatt DC Fast Boost 500kW Ready • Cryogenic Gate Dielectric Passivation OK • Pin-Fin Heat Flux Dissipation: 185 W/cm² • All figures are sample data (예시 수치) • Sub-millisecond Scram Disconnect Verified •&nbsp;
          </span>
          <span>
            SiC 150mm/200mm Wafer Fab: Optimal 99.8% Yield • 800V High-Voltage Bus Nominal • 1,200V MOSFET ASIL-D Validated • Global Tier-1 Node Active • Torque Vectoring Cycle: 0.12ms Latency • Megawatt DC Fast Boost 500kW Ready • Cryogenic Gate Dielectric Passivation OK • Pin-Fin Heat Flux Dissipation: 185 W/cm² • All figures are sample data (예시 수치) • Sub-millisecond Scram Disconnect Verified •&nbsp;
          </span>
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-4 pl-4 text-[#c3f5ff]">
        <span className="hidden lg:flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-[#00e5ff]" />
          <span>BUS: {busVoltage} V</span>
        </span>
        <span className="hidden lg:flex items-center gap-1 text-[#a8ffd2]">
          <Thermometer className="w-3.5 h-3.5 text-[#5be9ad]" />
          <span>SiC JUNCTION: {junctionTemp}°C</span>
        </span>
      </div>
    </div>
  );
};
