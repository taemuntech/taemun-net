import React, { useState } from 'react';
import { ChevronRight, Layers } from 'lucide-react';
import { LAYERS } from '../data/packagingData';

export const LayerExplorer: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<number>(1);
  const currentLayer = LAYERS.find((l) => l.id === selectedLayerId) || LAYERS[0];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#c4c5d5]/30" id="layer-explorer">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold text-[#00288e] uppercase tracking-widest mb-2 font-mono">
            Structural Micro-Architecture
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-[#0b1c30] mb-4 tracking-tight">
            이종 집적(Heterogeneous Integration) 4계층 분해도 탐색
          </h2>
          <p className="text-base text-[#444653] leading-relaxed">
            상단 로직 칩셋의 고밀도 연산에서부터 바닥면 24층 FC-BGA 및 글래스 코어까지, 각 패키징
            인터커넥트 레이어를 직접 선택하여 세부 나노 물성과 열 분산 경로를 검증하십시오.
          </p>
        </div>

        {/* Layer Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Layer Navigation Selector (lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {LAYERS.map((layer) => {
              const isSelected = layer.id === selectedLayerId;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`text-left p-4 rounded-xl transition-all duration-150 flex items-start justify-between group cursor-pointer ${ isSelected ? 'border-2 border-[#00288e] bg-[#eff4ff] shadow-xs' : 'border border-[#c4c5d5]/40 bg-white hover:bg-[#eff4ff]/60' }`}
                  type="button"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg font-mono font-bold flex items-center justify-center text-sm shrink-0 transition-colors ${ isSelected ? 'bg-[#00288e] text-white' : 'bg-[#dce9ff] text-[#0b1c30] group-hover:bg-[#b8c4ff]' }`}
                    >
                      {layer.label}
                    </div>
                    <div>
                      <div
                        className={`text-[15px] font-bold transition-colors ${ isSelected ? 'text-[#00288e]' : 'text-[#0b1c30] group-hover:text-[#00288e]' }`}
                      >
                        {layer.title}
                      </div>
                      <div className="text-xs text-[#444653] mt-0.5 leading-snug">
                        {layer.subtitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 shrink-0 mt-1 transition-colors ${ isSelected ? 'text-[#00288e]' : 'text-[#757684] group-hover:text-[#00288e]' }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Layer Telemetry Card Screen (lg: 7 cols) */}
          <div className="lg:col-span-7 bg-[#eff4ff] p-6 lg:p-8 rounded-2xl border border-[#c4c5d5]/50 relative shadow-xs">
            <div className="flex items-center justify-between border-b border-[#c4c5d5]/30 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#00288e]" />
                <span className="font-mono text-xs text-[#00288e] font-bold uppercase tracking-wider">
                  {currentLayer.tag}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#757684]">
                NANOMETER TOLERANCE: ±0.15µm
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#0b1c30] mb-3">
              {currentLayer.title}
            </h3>

            <p className="text-sm text-[#444653] mb-6 leading-relaxed">
              {currentLayer.desc}
            </p>

            {/* Real-time dynamic telemetry gauges */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
              {/* Thermal Resistance */}
              <div className="bg-white p-4 rounded-xl border border-[#c4c5d5]/40 shadow-xs">
                <div className="text-[11px] font-bold text-[#757684] uppercase mb-1">
                  열저항 (Thermal Resistance)
                </div>
                <div className="text-xl font-bold text-[#00288e]">
                  {currentLayer.thermal}
                </div>
                <div className="w-full bg-[#dce9ff] h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="bg-[#00288e] h-full rounded-full transition-all duration-300"
                    style={{ width: `${currentLayer.thermalPercent}%` }}
                  />
                </div>
              </div>

              {/* Bandwidth */}
              <div className="bg-white p-4 rounded-xl border border-[#c4c5d5]/40 shadow-xs">
                <div className="text-[11px] font-bold text-[#757684] uppercase mb-1">
                  신호 전송 대역폭
                </div>
                <div className="text-xl font-bold text-[#00687a]">
                  {currentLayer.bandwidth}
                </div>
                <div className="w-full bg-[#dce9ff] h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="bg-[#00687a] h-full rounded-full transition-all duration-300"
                    style={{ width: `${currentLayer.bandwidthPercent}%` }}
                  />
                </div>
              </div>

              {/* Warpage Spec */}
              <div className="bg-white p-4 rounded-xl border border-[#c4c5d5]/40 shadow-xs">
                <div className="text-[11px] font-bold text-[#757684] uppercase mb-1">
                  기판 휨 (Warpage Spec)
                </div>
                <div className="text-xl font-bold text-[#00563a]">
                  {currentLayer.warpage}
                </div>
                <div className="w-full bg-[#dce9ff] h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="bg-[#4edea3] h-full rounded-full transition-all duration-300"
                    style={{ width: `${currentLayer.warpagePercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Detailed Specifications List */}
            <div className="bg-white p-4 rounded-xl border border-[#c4c5d5]/30 font-mono text-[12px] space-y-2 text-[#444653]">
              <div className="flex justify-between py-1 border-b border-[#c4c5d5]/20">
                <span className="text-[#757684]">Process Lithography Node:</span>
                <span className="text-[#0b1c30] font-semibold">{currentLayer.node}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#c4c5d5]/20">
                <span className="text-[#757684]">Underfill Capillary Flow Rate:</span>
                <span className="text-[#0b1c30] font-semibold">{currentLayer.underfill}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#757684]">Max Interconnect Capacitance:</span>
                <span className="text-[#0b1c30] font-semibold">{currentLayer.cap}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
