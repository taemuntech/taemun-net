import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';

interface TickerBarProps {
  onOpenRadar: (portId?: string) => void;
}

export const TickerBar: React.FC<TickerBarProps> = ({ onOpenRadar }) => {
  const [latency, setLatency] = useState(48);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(65, Math.max(38, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside id="top-radar-ticker" className="w-full bg-[#020e21] border-b border-[#434655]/30 py-1.5 px-4 text-[#c3c6d7] font-mono text-xs overflow-x-auto no-scrollbar">
      <div className="flex items-center space-x-6 min-w-max">
        {/* Radar Indicator */}
        <button
          onClick={() => onOpenRadar()}
          className="flex items-center space-x-1.5 text-[#fe6b00] font-semibold hover:brightness-125 transition-all text-left"
          title="Open Port Congestion Radar"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#fe6b00] animate-ping" />
          <span className="material-symbols-outlined text-[16px]">sensors</span>
          <span>PORT CONGESTION RADAR (AIS LIVE {latency}ms)</span>
        </button>

        {/* Busan */}
        <button
          onClick={() => onOpenRadar('krpus')}
          className="flex items-center space-x-1.5 hover:text-white transition-colors text-left"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[#d6e3fe] font-medium">Busan Port (T4):</span>
          <span className="text-emerald-400">Normal (Turnaround 14.2h / Wait 0.4d)</span>
        </button>

        <div className="text-[#434655]">|</div>

        {/* Rotterdam */}
        <button
          onClick={() => onOpenRadar('nlrtm')}
          className="flex items-center space-x-1.5 hover:text-white transition-colors text-left"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-[#d6e3fe] font-medium">Rotterdam Gateway:</span>
          <span className="text-amber-400">Moderate (Turnaround 26.8h / Wait 1.1d)</span>
        </button>

        <div className="text-[#434655]">|</div>

        {/* Singapore */}
        <button
          onClick={() => onOpenRadar('sgsin')}
          className="flex items-center space-x-1.5 hover:text-white transition-colors text-left"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[#d6e3fe] font-medium">Singapore Hub:</span>
          <span className="text-emerald-400">Fluid (Turnaround 18.5h / Wait 0.6d)</span>
        </button>

        <div className="text-[#434655]">|</div>

        {/* Los Angeles */}
        <button
          onClick={() => onOpenRadar('uslax')}
          className="flex items-center space-x-1.5 hover:text-white transition-colors text-left"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#fe6b00]" />
          <span className="text-[#d6e3fe] font-medium">Los Angeles / Long Beach:</span>
          <span className="text-[#fe6b00]">Heavy (Turnaround 38.4h / Wait 2.4d)</span>
        </button>

        <div className="text-[#434655]">|</div>

        <div className="text-[#8d90a0] flex items-center space-x-2">
          <span>IMO License #8930421 • FMC #028491 • ANSI X12 Live</span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-[#132033] text-[#b4c5ff] border border-[#2563eb]/40">
            STARLINK MESH ONLINE
          </span>
        </div>
      </div>
    </aside>
  );
};
