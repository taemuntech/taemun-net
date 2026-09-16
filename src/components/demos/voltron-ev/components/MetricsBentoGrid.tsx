import React from 'react';
import { Zap, BatteryCharging, Wind, Scale } from 'lucide-react';

export const MetricsBentoGrid: React.FC = () => {
  return (
    <div className="max-w-[1720px] mx-auto px-6 lg:px-12 -mt-6 mb-16 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Box 1 */}
        <div
          id="metric-card-01"
          className="hud-bracket p-6 rounded bg-[#191c21] border border-[#3b494c]/30 hover:border-[#00e5ff]/50 transition-all group shadow-lg"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="font-code text-[11px] text-[#849396] group-hover:text-[#c3f5ff] transition-colors">
              // METRIC 01: CONVERSION
            </span>
            <Zap className="w-5 h-5 text-[#00e5ff]" />
          </div>
          <div className="font-display text-4xl lg:text-[44px] leading-tight text-[#00e5ff] font-bold tracking-tight mb-1">
            99.2%
          </div>
          <div className="font-display text-lg text-[#e1e2ea] font-semibold mb-1">
            Inverter Efficiency
          </div>
          <p className="font-body text-xs text-[#bac9cc] leading-relaxed">
            SiC conversion rate minimizing parasitic thermal loss via planar busbar integration. (예시 수치)
          </p>
        </div>

        {/* Box 2 */}
        <div
          id="metric-card-02"
          className="hud-bracket p-6 rounded bg-[#191c21] border border-[#3b494c]/30 hover:border-[#5be9ad]/50 transition-all group shadow-lg"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="font-code text-[11px] text-[#849396] group-hover:text-[#c3f5ff] transition-colors">
              // METRIC 02: HIGH VOLTAGE
            </span>
            <BatteryCharging className="w-5 h-5 text-[#5be9ad]" />
          </div>
          <div className="font-display text-4xl lg:text-[44px] leading-tight text-[#a8ffd2] font-bold tracking-tight mb-1">
            15-Min
          </div>
          <div className="font-display text-lg text-[#e1e2ea] font-semibold mb-1">
            Megawatt Charge
          </div>
          <p className="font-body text-xs text-[#bac9cc] leading-relaxed">
            10% to 80% State of Charge (SoC) replenishment utilizing native 800V DC bus continuous absorption. (예시 수치)
          </p>
        </div>

        {/* Box 3 */}
        <div
          id="metric-card-03"
          className="hud-bracket p-6 rounded bg-[#191c21] border border-[#3b494c]/30 hover:border-[#b4c5ff]/50 transition-all group shadow-lg"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="font-code text-[11px] text-[#849396] group-hover:text-[#c3f5ff] transition-colors">
              // METRIC 03: POWER DENSITY
            </span>
            <Wind className="w-5 h-5 text-[#b4c5ff]" />
          </div>
          <div className="font-display text-4xl lg:text-[44px] leading-tight text-[#b4c5ff] font-bold tracking-tight mb-1">
            450 kW
          </div>
          <div className="font-display text-lg text-[#e1e2ea] font-semibold mb-1">
            Dual-Motor Output
          </div>
          <p className="font-body text-xs text-[#bac9cc] leading-relaxed">
            612 PS with 920 Nm instantaneous torque density, validated across continuous high-speed circuit hot-laps. (예시 수치)
          </p>
        </div>

        {/* Box 4 */}
        <div
          id="metric-card-04"
          className="hud-bracket p-6 rounded bg-[#191c21] border border-[#3b494c]/30 hover:border-[#c3f5ff]/50 transition-all group shadow-lg"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="font-code text-[11px] text-[#849396] group-hover:text-[#c3f5ff] transition-colors">
              // METRIC 04: MASS OPTIMIZATION
            </span>
            <Scale className="w-5 h-5 text-[#c3f5ff]" />
          </div>
          <div className="font-display text-4xl lg:text-[44px] leading-tight text-[#c3f5ff] font-bold tracking-tight mb-1">
            -38%
          </div>
          <div className="font-display text-lg text-[#e1e2ea] font-semibold mb-1">
            Weight Reduction
          </div>
          <p className="font-body text-xs text-[#bac9cc] leading-relaxed">
            Co-axial 3-in-1 e-Axle structural integration discarding external HV harness copper weight. (예시 수치)
          </p>
        </div>
      </div>
    </div>
  );
};
