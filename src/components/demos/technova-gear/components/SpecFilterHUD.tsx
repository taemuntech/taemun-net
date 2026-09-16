import React from 'react';

export interface SpecFilterState {
  segment: string;
  gpu: string;
  cpu: string;
  display: string;
  ram: string;
}

interface SpecFilterHUDProps {
  filters: SpecFilterState;
  onChangeFilter: <K extends keyof SpecFilterState>(key: K, value: SpecFilterState[K]) => void;
  onReset: () => void;
}

export const SpecFilterHUD: React.FC<SpecFilterHUDProps> = ({
  filters,
  onChangeFilter,
  onReset,
}) => {
  const segments = [
    '울트라북',
    'AI 워크스테이션',
    '게이밍 랩탑',
    '미니PC 익스트림',
    '커스텀 수랭 섀시',
  ];

  const gpus = ['RTX 4090', 'RTX 4080', '4070 Ti', 'RX 7900'];
  const cpus = ['Ultra 9 185H', 'Ryzen 9 7945HX'];
  const displays = ['OLED 240Hz', '4K Mini-LED 165Hz', 'QHD 360Hz'];
  const rams = ['16GB', '32GB DDR5', '64GB'];

  return (
    <section id="spec-filter-hud" className="bg-[#0a0e16] border-b border-[#424754] py-2">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col gap-2">
        {/* Deep Segment Row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 text-xs font-label">
          <span className="text-[#8c909f] uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">tune</span> 하드웨어 분류
          </span>
          {segments.map((seg) => {
            const isSelected = filters.segment === seg;
            return (
              <button
                key={seg}
                onClick={() => onChangeFilter('segment', seg)}
                className={`px-3 py-1 rounded whitespace-nowrap border transition-all text-xs ${ isSelected ? 'bg-[#03b5d3] text-[#001f26] font-bold border-[#4cd7f6] active-glow flex items-center gap-1' : 'bg-[#262a33] text-[#c2c6d6] hover:text-[#dfe2ee] border-[#424754]' }`}
              >
                {isSelected && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0a0e16]"></span>}
                {seg} {isSelected ? '[선택]' : ''}
              </button>
            );
          })}
        </div>

        {/* Spec Filter Chips Matrix */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-1 border-t border-[#424754]/40 text-xs font-label">
          {/* GPU Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#8c909f] uppercase text-[10px] w-12 shrink-0">GPU</span>
            <div className="flex gap-1 overflow-x-auto">
              {gpus.map((gpu) => {
                const isSelected = filters.gpu === gpu;
                return (
                  <button
                    key={gpu}
                    onClick={() => onChangeFilter('gpu', gpu)}
                    className={`px-2 py-0.5 rounded text-[11px] border transition-colors whitespace-nowrap ${ isSelected ? 'bg-[#31353e] text-[#4cd7f6] border-[#4cd7f6] font-bold flex items-center gap-1' : 'bg-[#1c2028] text-[#8c909f] border-[#424754]/60 hover:border-[#8c909f]' }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>}
                    {gpu}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CPU Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#8c909f] uppercase text-[10px] w-12 shrink-0">CPU</span>
            <div className="flex gap-1 overflow-x-auto">
              {cpus.map((cpu) => {
                const isSelected = filters.cpu === cpu;
                return (
                  <button
                    key={cpu}
                    onClick={() => onChangeFilter('cpu', cpu)}
                    className={`px-2 py-0.5 rounded text-[11px] border transition-colors whitespace-nowrap ${ isSelected ? 'bg-[#31353e] text-[#adc6ff] border-[#adc6ff] font-bold flex items-center gap-1' : 'bg-[#1c2028] text-[#8c909f] border-[#424754]/60 hover:border-[#8c909f]' }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff]"></span>}
                    {cpu}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Display Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#8c909f] uppercase text-[10px] w-14 shrink-0">패널/주사율</span>
            <div className="flex gap-1 overflow-x-auto">
              {displays.map((disp) => {
                const isSelected = filters.display === disp;
                return (
                  <button
                    key={disp}
                    onClick={() => onChangeFilter('display', disp)}
                    className={`px-2 py-0.5 rounded text-[11px] border transition-colors whitespace-nowrap ${ isSelected ? 'bg-[#31353e] text-[#4cd7f6] border-[#4cd7f6] font-bold' : 'bg-[#1c2028] text-[#8c909f] border-[#424754]/60 hover:border-[#8c909f]' }`}
                  >
                    {disp}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Memory / Reset */}
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1 overflow-x-auto">
              <span className="text-[#8c909f] uppercase text-[10px] w-8 shrink-0">RAM</span>
              {rams.map((ram) => {
                const isSelected = filters.ram === ram;
                return (
                  <button
                    key={ram}
                    onClick={() => onChangeFilter('ram', ram)}
                    className={`px-2 py-0.5 rounded text-[11px] border transition-colors whitespace-nowrap ${ isSelected ? 'bg-[#31353e] text-[#dfe2ee] border-[#8c909f] font-bold' : 'bg-[#1c2028] text-[#8c909f] border-[#424754]/60 hover:border-[#8c909f]' }`}
                  >
                    {ram}
                  </button>
                );
              })}
            </div>
            <button
              id="btn-reset-filters"
              onClick={onReset}
              className="text-[#8c909f] hover:text-[#ec6a06] flex items-center gap-0.5 text-[11px] transition-colors shrink-0"
              title="필터 기본값 초기화"
            >
              <span className="material-symbols-outlined text-[13px]">refresh</span> 초기화
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
