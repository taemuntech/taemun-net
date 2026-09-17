import React, { useState } from 'react';
import { Sun, Filter, Droplet, Zap, Activity, Eye } from 'lucide-react';
import { SPECTRUM_LIST } from '../data/clinicData';
import { SpectrumMode } from '../types';

// 4광원 피부 영상 분석 쇼케이스.
// 원래는 실존 장비의 상표를 그대로 제목에 걸고 있었다 — 지어낸 의원이 쓸 이유가 없어 일반 명칭으로
// 바꿨고, 화면에 뜨는 계측 수치는 모두 예시라는 표시를 같은 화면에 붙였다.
export const SkinSpectrumShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SpectrumMode>('normal');
  const [selectedDepth, setSelectedDepth] = useState<'epidermis' | 'dermis' | 'smas'>('epidermis');

  const currentSpectrum = SPECTRUM_LIST.find((s) => s.id === activeTab) || SPECTRUM_LIST[0];

  const getTabIcon = (mode: SpectrumMode) => {
    switch (mode) {
      case 'normal':
        return <Sun className="w-5 h-5 text-[#745a2a]" />;
      case 'polarized':
        return <Filter className="w-5 h-5 text-[#745a2a]" />;
      case 'crosspol':
        return <Droplet className="w-5 h-5 text-[#745a2a]" />;
      case 'uv':
        return <Zap className="w-5 h-5 text-[#745a2a]" />;
    }
  };

  const depthLabel =
    selectedDepth === 'epidermis'
      ? '0.1mm (Epidermis)'
      : selectedDepth === 'dermis'
      ? '1.5mm ~ 3.0mm (Dermis)'
      : '4.5mm (SMAS Fascia)';

  return (
    <section id="skin-spectrum" className="w-full py-16 lg:py-20 bg-[#f5f3f0] border-b border-[#eae8e5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eae8e5] text-[#745a2a] text-xs font-semibold tracking-wider uppercase mb-2 border border-[#e4e2df]">
              4-Light Skin Spectrum Diagnostic
            </div>
            <h2 className="font-serif text-2xl lg:text-3xl lg:text-[32px] text-[#00110b] tracking-tight leading-snug break-keep">
              겉으로 드러나지 않는 피부 상태까지 살피는
              <br />
              4광원 영상 정밀 분석
            </h2>
          </div>
          <p className="text-sm lg:text-base text-[#424845] max-w-md leading-relaxed break-keep">
            피부 겉만 보고 샷수를 정하지 않습니다. 4가지 특수 광원으로 피부 두께와 멜라닌, 혈관, 피지선 상태를
            확인한 뒤 시술 범위를 설계합니다.
          </p>
        </div>

        {/* Interactive 4-Tab / Light Mode Switcher Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Tab Navigator */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {SPECTRUM_LIST.map((spec) => {
              const isActive = activeTab === spec.id;
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setActiveTab(spec.id)}
                  aria-pressed={isActive}
                  className={`text-left p-4 lg:p-5 rounded-xl transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#ffffff] shadow-md border-[#745a2a]/30 lg:translate-x-1'
                      : 'bg-[#ffffff]/60 hover:bg-[#ffffff] border-transparent hover:border-[#eae8e5]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="font-serif text-base lg:text-lg text-[#00110b] flex items-center gap-2 font-medium">
                      {getTabIcon(spec.id)}
                      {spec.number}. {spec.nameKr} ({spec.nameEn})
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded shrink-0 ${
                        isActive ? 'bg-[#fedb9e] text-[#745a2a]' : 'bg-[#efeeeb] text-[#727975]'
                      }`}
                    >
                      {spec.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#424845] leading-relaxed lg:pl-7">{spec.desc.slice(0, 52)}...</p>
                </button>
              );
            })}

            {/* Depth Filter Pill Selector */}
            <div className="mt-2 p-3.5 rounded-xl bg-[#ffffff] border border-[#eae8e5] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[#727975] font-medium flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#745a2a]" /> 진단 투과 심도:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(
                  [
                    { id: 'epidermis', label: '표피층 (0.1mm)' },
                    { id: 'dermis', label: '진피층 (1.5mm)' },
                    { id: 'smas', label: '근막층 SMAS (4.5mm)' },
                  ] as const
                ).map((depth) => (
                  <button
                    key={depth.id}
                    type="button"
                    onClick={() => setSelectedDepth(depth.id)}
                    aria-pressed={selectedDepth === depth.id}
                    className={`px-2.5 min-h-11 flex items-center rounded transition-colors ${
                      selectedDepth === depth.id
                        ? 'bg-[#00110b] text-[#ffffff] font-semibold'
                        : 'bg-[#efeeeb] text-[#424845] hover:bg-[#e4e2df]'
                    }`}
                  >
                    {depth.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Diagnostic Simulator Display Screen */}
          <div className="lg:col-span-7 flex">
            <div className="w-full rounded-xl bg-[#ffffff] p-4 lg:p-6 shadow-xl border border-[#eae8e5] flex flex-col justify-between overflow-hidden">
              <div>
                <div className="flex flex-wrap items-start gap-3 justify-between pb-4 mb-4 border-b border-[#efeeeb]">
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-[#745a2a] uppercase tracking-widest block">
                      Clinical Multi-Spectrum Analysis
                    </span>
                    <h4 className="font-serif text-base lg:text-xl font-medium text-[#00110b] break-keep">
                      {currentSpectrum.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#745a2a] animate-ping" />
                    <span className="font-mono text-xs text-[#00110b] font-semibold">화면 예시</span>
                  </div>
                </div>

                {/* Visualization Canvas Simulation with Dynamic Spectral Filter */}
                <div className="relative h-72 lg:h-80 rounded-lg overflow-hidden bg-[#00110b] mb-4 flex items-center justify-center group">
                  <img
                    src="/demo-media/the-noble-dermatology/the-noble-dermatology-02.jpg"
                    alt="4광원 피부 영상 분석 화면 예시"
                    style={{ filter: currentSpectrum.filterStyle }}
                    className="w-full h-full object-cover opacity-90 transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  {/* Medical Telemetry Overlay Grid */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00110b]/85 via-transparent to-[#00110b]/40 pointer-events-none p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2 text-[#ffffff]/90 font-mono text-[11px]">
                      <div>
                        SCAN ID: SAMPLE-9082
                        <br />
                        DEPTH: {depthLabel}
                      </div>
                      <div className="text-right">
                        표시 수치는 예시입니다
                        <br />
                        진단 결과가 아닙니다
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="inline-block px-2 py-0.5 rounded bg-[#0d2820]/80 backdrop-blur text-[#fedb9e] text-[10px] font-mono border border-[#fedb9e]/30">
                        {currentSpectrum.highlightZone}
                      </div>

                      <div className="flex flex-wrap justify-between items-end text-[#ffffff] font-mono text-[11px] gap-2">
                        <div className="bg-[#00110b]/75 backdrop-blur px-2.5 py-1.5 rounded border border-white/10">
                          <span>{currentSpectrum.param1}</span>
                        </div>
                        <div className="bg-[#00110b]/75 backdrop-blur px-2.5 py-1.5 rounded text-[#ffdea7] border border-[#ffdea7]/20">
                          <span>{currentSpectrum.param2}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnostic Insight Footer */}
              <div className="bg-[#f5f3f0] p-4 rounded-lg flex items-start gap-3 border border-[#eae8e5]">
                <Activity className="w-5 h-5 text-[#745a2a] shrink-0 mt-0.5" />
                <p className="text-xs lg:text-sm text-[#424845] leading-relaxed break-keep">{currentSpectrum.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
