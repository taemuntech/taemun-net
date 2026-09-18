import React, { useState, useEffect } from 'react';
import { Sliders, Radio } from 'lucide-react';

export const TelemetryHudBar: React.FC = () => {
  const [clockTime, setClockTime] = useState('00:09.842');
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [activeNodes, setActiveNodes] = useState(32);

  useEffect(() => {
    let t = 9.842;
    const interval = setInterval(() => {
      t += 0.004;
      if (t > 16.0) t = 9.842;
      setClockTime(`00:${t.toFixed(3)}`);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleRecalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setActiveNodes(32);
      setIsCalibrating(false);
    }, 800);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 bg-[#1c1b1b] border border-[#2a2a2a] shadow-[2px_2px_0px_#000000] mb-8">
      {/* Left items */}
      <div className="flex items-center gap-3 lg:gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-1.5 border border-[#353534]">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff5625] animate-ping"></span>
          <span className="font-telemetry text-[11px] text-[#ffb5a0] uppercase font-bold tracking-wider">
            LIVE TELEMETRY FEED
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-telemetry text-[11px] text-[#9e9b9a] uppercase">
            MASTER CLOCK:
          </span>
          <span className="font-telemetry text-[20px] text-[#c3f400] tabular-nums font-bold tracking-wider">
            [{clockTime} SEC]
          </span>
        </div>

        <div className="h-6 w-px bg-[#2a2a2a] hidden lg:block"></div>

        <div className="flex items-center gap-2">
          <span className="font-telemetry text-[11px] text-[#9e9b9a]">CAPTURE RIG:</span>
          <span className="font-telemetry text-[12px] text-[#ffffff] font-bold">
            1,000 FPS PHANTOM 4K
          </span>
        </div>
      </div>

      {/* Right items */}
      <div className="flex items-center gap-3 lg:gap-4 flex-wrap">
        <button
          onClick={handleRecalibrate}
          className="flex items-center gap-1.5 bg-[#2a2a2a] hover:bg-[#353534] px-3 py-1.5 border border-[#353534] transition-colors cursor-pointer"
          title="장비 센서 재보정 캘리브레이션"
        >
          <Sliders className="w-3.5 h-3.5 text-[#c3f400]" />
          <span className="font-telemetry text-[11px] text-[#ffffff]">
            CALIB LATENCY:{' '}
            <span className="text-[#c3f400] font-bold">
              {isCalibrating ? 'SYNCING...' : '0.001 ms'}
            </span>
          </span>
        </button>

        <div className="flex items-center gap-1.5 bg-[#2a2a2a] px-3 py-1.5 border border-[#353534]">
          <Radio className="w-3.5 h-3.5 text-[#ff5625]" />
          <span className="font-telemetry text-[11px] text-[#ffffff]">
            OPTOTRAK:{' '}
            <span className="text-[#ff5625] font-bold">
              {activeNodes} NODES LOCKED
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
