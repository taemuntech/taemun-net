import React, { useState } from 'react';
import { SPECTRUM_MODES } from '../data/smartfarmData';
import { SpectrumMode } from '../types';

export const SpectrumMatrix: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const activeMode: SpectrumMode =
    SPECTRUM_MODES.find((m) => m.id === selectedId) || SPECTRUM_MODES[0];

  return (
    <section className="py-16 lg:py-24 bg-[#faf8ff] border-b border-[#bccac0]/30" id="technology">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006948]/10 border border-[#006948]/20 mb-3">
            <span className="material-symbols-outlined text-sm text-[#006948]">light_mode</span>
            <span className="font-mono text-[11px] text-[#006948] font-semibold">
              CUSTOM PHOTONIC SYNTHESIS
            </span>
          </div>
          <h2 className="font-headline text-2xl lg:text-[32px] text-[#131b2e] font-semibold tracking-tight">
            Spectral AI Growth Matrix: 파장별 바이오매스 제어
          </h2>
          <p className="font-body text-base lg:text-lg text-[#3d4a42] mt-2">
            작물의 생육 단계와 상업적 목적(식감, 비타민 강화, 폴리페놀 강화)에 맞춰 LED 광 스펙트럼을 나노미터(nm) 단위로 변조합니다. 아래 지표는 모두 예시 수치입니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Spectrum Controls & Tabs (Left) */}
          <div className="lg:col-span-6 space-y-4">
            {SPECTRUM_MODES.map((mode) => {
              const isSelected = selectedId === mode.id;

              // Border and ring styling based on mode
              let borderClass = 'border-[#bccac0] hover:border-[#006948]';
              let ringColor = 'bg-[#00687a] ring-[#00687a]/20';

              if (mode.id === 1) {
                ringColor = 'bg-[#57dffe] ring-[#00687a]/20';
                if (isSelected) borderClass = 'border-2 border-[#00687a] shadow-sm';
              } else if (mode.id === 2) {
                ringColor = 'bg-[#ba1a1a] ring-[#ba1a1a]/20';
                if (isSelected) borderClass = 'border-2 border-[#ba1a1a] shadow-sm';
              } else if (mode.id === 3) {
                ringColor = 'bg-[#006947] ring-[#006947]/20';
                if (isSelected) borderClass = 'border-2 border-[#006948] shadow-sm';
              }

              return (
                <div
                  key={mode.id}
                  onClick={() => setSelectedId(mode.id)}
                  className={`cursor-pointer p-6 rounded-xl bg-white transition-all duration-200 ${borderClass}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ring-4 ${ringColor}`}></span>
                      <span
                        className="font-mono text-[12px] font-bold"
                        style={{ color: mode.colorHex }}
                      >
                        SPECTRUM 0{mode.id} // {mode.peakNm}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-[11px] px-2 py-0.5 rounded font-bold ${ isSelected ? 'bg-[#006948]/10 text-[#006948]' : 'bg-[#eaedff] text-[#3d4a42]' }`}
                    >
                      {mode.badge}
                    </span>
                  </div>
                  <h3 className="font-headline text-base lg:text-lg font-semibold text-[#131b2e] mb-1">
                    {mode.title}
                  </h3>
                  <p className="font-body text-sm text-[#3d4a42] leading-relaxed">
                    {mode.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Dynamic Real-time Agronomic Telemetry Canvas (Right) */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-[#bccac0]/40 p-6 lg:p-8 flex flex-col justify-between shadow-xs">
            <div>
              {/* Header inside right panel */}
              <div className="flex items-center justify-between pb-4 border-b border-[#bccac0]/20 mb-6">
                <div>
                  <span className="font-mono text-[11px] text-[#6d7a72] block">
                    TARGET CANOPY SIMULATION
                  </span>
                  <span className="font-headline text-lg lg:text-xl font-bold text-[#131b2e]">
                    {activeMode.targetCanopyTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#006948] animate-pulse"></span>
                  <span className="font-mono text-[12px] text-[#006948] font-bold">
                    PPFD: {activeMode.ppfd} µmol/m²/s
                  </span>
                </div>
              </div>

              {/* Bar Telemetry Graphs */}
              <div className="space-y-6">
                {/* 1: Photosynthesis Rate */}
                <div>
                  <div className="flex justify-between items-center font-mono text-[12px] mb-2">
                    <span className="text-[#131b2e] flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-sm text-[#006948]">speed</span>{' '}
                      광합성 반응 속도 (Photosynthesis Rate)
                    </span>
                    <span className="text-[#006948] font-bold">
                      {activeMode.photosynthesisLabel}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#e2e7ff] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00687a] transition-all duration-500 rounded-full"
                      style={{ width: `${activeMode.photosynthesisRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* 2: Nutrient Density */}
                <div>
                  <div className="flex justify-between items-center font-mono text-[12px] mb-2">
                    <span className="text-[#131b2e] flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-sm text-[#00687a]">biotech</span>{' '}
                      영양 밀도 지수 (Nutrient Density Score)
                    </span>
                    <span className="text-[#00687a] font-bold">
                      {activeMode.nutrientLabel}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#e2e7ff] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#006948] transition-all duration-500 rounded-full"
                      style={{ width: `${activeMode.nutrientDensity}%` }}
                    ></div>
                  </div>
                </div>

                {/* 3: Crisp Texture Index */}
                <div>
                  <div className="flex justify-between items-center font-mono text-[12px] mb-2">
                    <span className="text-[#131b2e] flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-sm text-[#00855b]">nutrition</span>{' '}
                      식감 및 엽육 두께 (Crisp Texture Index)
                    </span>
                    <span className="text-[#00855b] font-bold">
                      {activeMode.crispLabel}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#e2e7ff] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00855b] transition-all duration-500 rounded-full"
                      style={{ width: `${activeMode.crispIndex}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Interactive Visual Spectra Slider Demo */}
              <div className="mt-8 p-4 rounded-lg bg-[#f2f3ff] border border-[#bccac0]/30">
                <span className="font-mono text-[11px] text-[#6d7a72] block mb-2 font-medium">
                  DYNAMIC SPECTRA GRADIENT (400nm - 750nm)
                </span>
                <div className="h-6 w-full rounded-md bg-gradient-to-r from-blue-600 via-emerald-500 via-amber-400 to-red-600 relative flex items-center shadow-inner">
                  <div
                    className="absolute w-4 h-8 bg-white rounded border-2 border-[#131b2e] shadow-md -top-1 transition-all duration-500 ease-out cursor-pointer"
                    style={{ left: activeMode.markerPercent }}
                    title={`현재 포커스 파장: ${activeMode.peakNm}`}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#6d7a72] mt-2">
                  <span>400nm (UV)</span>
                  <span>450nm (Blue)</span>
                  <span>520nm (Green)</span>
                  <span>660nm (Red)</span>
                  <span>730nm (Far-Red)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#bccac0]/20 flex items-center justify-between text-[11px] font-mono text-[#6d7a72]">
              <span>알고리즘: Bio-Adaptive Pulse Light (BAPL)</span>
              <span className="text-[#006948] font-bold">에너지 효율 38% 개선 (예시 수치)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
