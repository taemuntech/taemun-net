import React, { useState, useEffect } from 'react';

interface HeaderTickerProps {
  onOpenTelemetry?: () => void;
}

export const HeaderTicker: React.FC<HeaderTickerProps> = ({ onOpenTelemetry }) => {
  const [seconds, setSeconds] = useState(12);
  const [pulseCount, setPulseCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setPulseCount((c) => c + 1);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#131b2e] text-[#faf8ff] py-1.5 px-4 overflow-x-auto border-b border-[#6d7a72]/30 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] lg:text-[11px] font-mono tracking-wider">
        <div className="flex items-center space-x-4 shrink-0">
          <button 
            onClick={onOpenTelemetry}
            className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer text-left"
            title="실시간 클린룸 텔레메트리 상세 보기"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#6ffbbe] animate-pulse-slow"></span>
            <span className="text-[#85f8c4] font-medium">CLEANROOM: CLASS 1000 GRADE (0.3µm HEPA Active)</span>
          </button>
          
          <span className="text-[#bccac0]/60">•</span>
          
          <div className="flex items-center gap-1.5 text-[#e2e7ff]">
            <span className="material-symbols-outlined text-[#4cd7f6] text-sm">vital_signs</span>
            <span>CROP HEALTH INDEX: 99.8% NOMINAL</span>
          </div>

          <span className="text-[#bccac0]/60 hidden">•</span>

          <div className="hidden lg:flex items-center gap-1.5 text-[#faf8ff]">
            <span className="material-symbols-outlined text-[#6ffbbe] text-sm">sensors</span>
            <span>FACILITY: JINCHEON GIGA-BIOSPHERE 1 &amp; SEJONG R&amp;D</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-[#bccac0]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#57dffe] animate-ping"></span>
            <span className="text-[#57dffe]">AEROPONIC CYCLE: T-{seconds}s (#{pulseCount})</span>
          </div>
          <span>•</span>
          <span className="text-[#6ffbbe] font-semibold">RENEWABLE ENERGY 100% TARGET (예시 수치)</span>
        </div>
      </div>
    </div>
  );
};
