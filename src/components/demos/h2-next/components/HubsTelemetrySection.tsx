import React, { useState, useEffect } from 'react';
import { HUBS_DATA } from '../data/mockData';
import { Radio, Activity, Calendar } from './Icons';

interface HubsTelemetrySectionProps {
  onOpenConsultation?: () => void;
}

export const HubsTelemetrySection: React.FC<HubsTelemetrySectionProps> = ({ onOpenConsultation }) => {
  const [selectedHubIndex, setSelectedHubIndex] = useState(0);
  const [ping, setPing] = useState(14);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Subtle live SCADA heartbeat simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(12 + Math.floor(Math.random() * 5));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSelectHub = (idx: number) => {
    if (idx === selectedHubIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedHubIndex(idx);
      setIsTransitioning(false);
    }, 120);
  };

  const hub = HUBS_DATA[selectedHubIndex];

  return (
    <section id="nodes" className="py-16 bg-white border-b border-[#bcc9c6]/30">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#006398] font-mono text-xs uppercase tracking-wider mb-2">
              <Radio className="w-4 h-4" />
              <span>Live Infrastructure &amp; Telemetry Network</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#0b1c30]">
              실시간 청정에너지 발전·터미널 거점
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-3 lg:mt-0 font-mono text-xs text-[#3d4947] bg-[#eff4ff] px-3 py-1.5 rounded-lg border border-[#bcc9c6]/40">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00685f] animate-pulse"></span>
            <span>전 거점 SCADA 텔레메트리 1.0초 단위 동기화 중</span>
          </div>
        </div>

        {/* Hubs Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Hub Buttons Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between" id="hubButtonsContainer">
            {HUBS_DATA.map((item, index) => {
              const isSelected = selectedHubIndex === index;
              return (
                <button
                  key={item.id}
                  id={`hubBtn${index}`}
                  onClick={() => handleSelectHub(index)}
                  className={`text-left w-full p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-2 border-[#00685f] bg-[#00685f]/5 shadow-xs'
                      : 'border border-[#bcc9c6]/40 hover:border-[#006398] bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-[#00685f]/15 text-[#00685f]'
                          : index === 1
                          ? 'bg-[#006398]/10 text-[#006398]'
                          : index === 3
                          ? 'bg-[#825100]/10 text-[#825100]'
                          : 'bg-slate-100 text-[#6d7a77]'
                      }`}
                    >
                      {item.hubNum}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold ${
                        isSelected
                          ? 'text-[#00685f]'
                          : index === 1
                          ? 'text-[#006398]'
                          : index === 3
                          ? 'text-[#825100]'
                          : 'text-[#00685f]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-base lg:text-lg font-bold text-[#0b1c30] mt-1">{item.name}</h4>
                  <p className="text-xs lg:text-sm text-[#3d4947] mt-1">{item.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Right Dynamic Telemetry Screen Display (7 cols) */}
          <div
            id="hubDetailDisplay"
            className={`lg:col-span-7 bg-[#eff4ff] rounded-2xl border border-[#bcc9c6]/50 p-6 shadow-xs flex flex-col justify-between transition-opacity duration-150 ${
              isTransitioning ? 'opacity-50' : 'opacity-100'
            }`}
          >
            <div>
              {/* Header Bar of Telemetry Card */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-[#bcc9c6]/30 gap-2">
                <div>
                  <span
                    id="displayBadge"
                    className="font-mono text-xs text-[#00685f] uppercase tracking-wider font-semibold"
                  >
                    {hub.badge}
                  </span>
                  <h3 id="displayTitle" className="text-xl lg:text-2xl font-bold text-[#0b1c30]">
                    {hub.title}
                  </h3>
                  <p id="displaySub" className="text-xs lg:text-sm text-[#3d4947]">
                    {hub.sub}
                  </p>
                </div>
                <div className="text-left lg:text-right flex-shrink-0">
                  <span className="font-mono text-[10px] text-[#6d7a77] block">SCADA PING</span>
                  <span className="font-mono text-xs text-[#00685f] font-bold">
                    {ping}ms • LATENCY OPTIMAL
                  </span>
                </div>
              </div>

              {/* Metric Gauges (6 Grid Cards) */}
              <div id="displayMetricsGrid" className="grid grid-cols-2 lg:grid-cols-3 gap-3 my-6">
                {hub.metrics.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className="bg-white p-3.5 rounded-xl border border-[#bcc9c6]/40 shadow-2xs"
                  >
                    <span className="font-mono text-[11px] text-[#6d7a77] block mb-1">
                      {metric.label}
                    </span>
                    <span
                      className={`font-mono text-lg font-bold block ${
                        metric.isPrimary ? 'text-[#00685f]' : 'text-[#0b1c30]'
                      }`}
                    >
                      {metric.val}
                    </span>
                    <span
                      className={`font-mono text-[11px] block mt-1 ${
                        metric.isPrimary ? 'text-[#00685f]' : 'text-[#006398]'
                      }`}
                    >
                      {metric.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* Schematic Status Bar */}
              <div className="p-4 rounded-xl bg-white border border-[#bcc9c6]/40">
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className="text-[#0b1c30] font-semibold flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-[#00685f]" />
                    PEM Electrolyzer Dynamic Load Distribution
                  </span>
                  <span id="loadPercentage" className="text-[#00685f] font-bold">
                    {hub.loadText}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-[#e5eeff] rounded-full overflow-hidden flex">
                  <div
                    id="loadBarWind"
                    className="h-full bg-[#00685f] transition-all duration-300"
                    style={{ width: hub.barWind }}
                    title="Offshore Wind Direct"
                  ></div>
                  <div
                    id="loadBarH2"
                    className="h-full bg-[#006398] transition-all duration-300"
                    style={{ width: hub.barH2 }}
                    title="PEM Electrolysis"
                  ></div>
                  <div
                    id="loadBarReserve"
                    className="h-full bg-[#bcc9c6] transition-all duration-300"
                    style={{ width: hub.barReserve }}
                    title="Reserve Cushion"
                  ></div>
                </div>
                <div className="flex flex-wrap justify-between font-mono text-[11px] text-[#6d7a77] mt-2 gap-2">
                  <span>해상 직결 발전: {hub.barWind}</span>
                  <span>그린수소 수전해 흡수: {hub.barH2}</span>
                  <span>계통 완충 예비력: {hub.barReserve}</span>
                </div>
              </div>
            </div>

            {/* Footer Action within Hub Screen */}
            <div className="mt-4 pt-3 border-t border-[#bcc9c6]/30 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
              <span className="font-mono text-xs text-[#6d7a77]">
                K-ETS 탄소 감축 등록번호: KOR-VER-2025-0442
              </span>
              <a
                href="#consultation"
                onClick={onOpenConsultation}
                className="text-sm text-[#00685f] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>거점 현장 기술 실사 신청</span>
                <Calendar className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
