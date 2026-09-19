import React, { useEffect, useState } from 'react';

export const TelemetryRibbon: React.FC = () => {
  const [telemetry, setTelemetry] = useState({
    lat: "37°33'59.18\"N",
    lon: "126°58'41.04\"E",
    temp: 38.4,
    link: 99.8,
    accuracy: 1.5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        temp: Number((38.2 + Math.random() * 0.5).toFixed(1)),
        link: Number((99.5 + Math.random() * 0.4).toFixed(1)),
        accuracy: Number((1.4 + Math.random() * 0.2).toFixed(1)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-zinc-100 text-zinc-900 px-4 lg:px-12 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white text-sky-700 font-mono text-[11px] font-semibold shadow-xs border border-zinc-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping"></span>
          GNSS RTK // LOCKED
        </span>
        <span className="font-mono text-[11px] text-zinc-500 hidden lg:inline">
          BASE ID: KR-DGN-04
        </span>
        <span className="font-mono text-[11px] text-zinc-600">
          LAT: {telemetry.lat}
        </span>
        <span className="font-mono text-[11px] text-zinc-600">
          LON: {telemetry.lon}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 font-mono text-[11px] text-zinc-600">
          <span className="material-symbols-outlined text-sm text-sky-600">wifi_tethering</span>
          <span>ENCRYPTED C2 LINK: {telemetry.link}%</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] text-zinc-600">
          <span className="material-symbols-outlined text-sm text-amber-600">thermostat</span>
          <span>SENSOR CORE: {telemetry.temp}°C</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-zinc-950 text-white font-mono text-[10px] uppercase tracking-wider font-semibold">
          DEFENSE READY
        </span>
      </div>
    </div>
  );
};
