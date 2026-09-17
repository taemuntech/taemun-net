import React, { useState } from 'react';
import { CheckCircle2, FileText } from 'lucide-react';
import { SimSettings } from '../types';

interface ThermalWarpageSimulatorProps {
  onGenerateReport: (settings: SimSettings, results: { bandwidth: string; warpage: string; solution: string }) => void;
}

export const ThermalWarpageSimulator: React.FC<ThermalWarpageSimulatorProps> = ({
  onGenerateReport,
}) => {
  const [pkgDim, setPkgDim] = useState<number>(100);
  const [hbmCount, setHbmCount] = useState<number>(8);
  const [tdp, setTdp] = useState<number>(850);

  // Calculations
  const bandwidthVal = (hbmCount * 1.2).toFixed(1);
  const bandwidthStr = `${bandwidthVal} TB/s`;

  // Calculated warpage based on dimension and TDP
  const baseWarpage = pkgDim * 0.12 + tdp * 0.005;
  const warpageEst = Math.min(28.5, Math.max(7.2, baseWarpage)).toFixed(1);
  const warpageStr = `< ${warpageEst} µm`;

  // Recommended Solution
  let recommendedSolution = 'Glass Core 10-Layer Hybrid Interposer Architecture';
  if (pkgDim >= 120 || tdp >= 1100) {
    recommendedSolution = 'Next-Gen 120mm Glass Core + 3D Direct Cu-Cu Hybrid Stack';
  } else if (pkgDim <= 50 && tdp <= 500) {
    recommendedSolution = 'Standard 5µm Silicon Interposer on High-Density FC-BGA';
  } else if (hbmCount >= 12) {
    recommendedSolution = 'Glass Core Ultra-Flat Multi-Die Stitched Hybrid Interposer';
  }

  const handleOpenPdfModal = () => {
    onGenerateReport(
      { pkgDim, hbmCount, tdp },
      { bandwidth: bandwidthStr, warpage: warpageStr, solution: recommendedSolution }
    );
  };

  return (
    <section className="scroll-mt-20 py-16 lg:py-24 bg-white border-b border-[#c4c5d5]/30" id="interposer-spec">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-[#eff4ff] rounded-2xl border border-[#c4c5d5]/50 p-6 lg:p-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 border-b border-[#c4c5d5]/30 pb-8">
            <div>
              <div className="text-xs font-bold text-[#00288e] uppercase tracking-wider font-mono mb-2">
                Online Architecture Simulator
              </div>
              <h2 className="text-2xl font-bold text-[#0b1c30]">
                AI 칩셋 패키지 발열 &amp; 휨(Warpage) 실시간 시뮬레이터
              </h2>
              <p className="text-sm text-[#444653] mt-1.5 leading-relaxed">
                목표 가속기 칩셋의 크기, HBM 적재 스택, TDP 소비전력을 설정하면 추천 패키징 공법과
                예상 변형량을 화면에서 바로 계산해 보여 줍니다. 산출값은 모두 예시 수치입니다.
              </p>
            </div>

            {/* 실존 해석 소프트웨어(ANSYS) 이름을 탑재했다고 적지 않는다 — 화면에서 도는 건 근사식이다(2026-09-17) */}
            <div className="bg-white px-3 py-2 rounded-lg border border-[#c4c5d5]/40 flex items-center gap-2 font-mono text-xs text-[#0b1c30] shadow-xs lg:shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#00288e] animate-pulse shrink-0"></span>
              <span className="break-words">CALCULATOR ENGINE: 근사식 기반 예시 산출</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls Form (lg: 6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Control 1: Package Size */}
              <div>
                <label className="block text-sm font-semibold text-[#0b1c30] mb-2">
                  패키지 기판 사이즈 (Package Size Dimension)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { label: '50×50mm', val: 50 },
                    { label: '75×75mm', val: 75 },
                    { label: '100×100mm', val: 100 },
                    { label: '120×120mm', val: 120 },
                  ].map((dim) => {
                    const isSelected = pkgDim === dim.val;
                    return (
                      <button
                        key={dim.val}
                        onClick={() => setPkgDim(dim.val)}
                        type="button"
                        className={`flex min-h-11 items-center justify-center p-3 text-center rounded-lg font-mono text-sm font-semibold active:scale-[0.98] transition-all cursor-pointer ${ isSelected ? 'border-2 border-[#00288e] bg-[#00288e] text-white shadow-xs' : 'border border-[#c4c5d5]/60 bg-white hover:bg-[#eff4ff] text-[#0b1c30]' }`}
                      >
                        {dim.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control 2: HBM Stack Count */}
              <div>
                <label className="block text-sm font-semibold text-[#0b1c30] mb-2">
                  HBM 메모리 통합 적재 구성 (HBM Integration)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { label: '4-Hi (4개)', count: 4 },
                    { label: '8-Hi (8개)', count: 8 },
                    { label: '12-Hi (12개)', count: 12 },
                    { label: '16-Hi (16개)', count: 16 },
                  ].map((hbm) => {
                    const isSelected = hbmCount === hbm.count;
                    return (
                      <button
                        key={hbm.count}
                        onClick={() => setHbmCount(hbm.count)}
                        type="button"
                        className={`flex min-h-11 items-center justify-center p-3 text-center rounded-lg font-mono text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer ${ isSelected ? 'border-2 border-[#00288e] bg-[#00288e] text-white shadow-xs' : 'border border-[#c4c5d5]/60 bg-white hover:bg-[#eff4ff] text-[#0b1c30]' }`}
                      >
                        {hbm.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control 3: TDP Slider */}
              <div>
                <div className="flex flex-wrap justify-between items-center gap-x-3 gap-y-1 mb-2">
                  <label htmlFor="tdpSlider" className="text-sm font-semibold text-[#0b1c30]">
                    총 칩셋 소비전력 TDP (Thermal Design Power)
                  </label>
                  <span className="font-mono text-xl font-bold text-[#00288e]">
                    {tdp} W
                  </span>
                </div>
                {/* box-content + 세로 패딩으로 트랙 모양은 그대로 두고 손가락 표적만 44px 로 키운다 */}
                <input
                  id="tdpSlider"
                  type="range"
                  min="300"
                  max="1500"
                  step="50"
                  value={tdp}
                  aria-label="총 칩셋 소비전력 TDP (W)"
                  onChange={(e) => setTdp(parseInt(e.target.value, 10))}
                  className="w-full h-11 -my-[18px] bg-transparent bg-[linear-gradient(to_right,rgba(196,197,213,0.55),rgba(196,197,213,0.55))] bg-[length:100%_8px] bg-center bg-no-repeat appearance-none cursor-pointer accent-[#00288e]"
                />
                <div className="flex justify-between gap-2 font-mono text-[11px] text-[#757684] mt-1.5">
                  <span>300W (Edge HPC)</span>
                  <span className="hidden md:inline">900W (Datacenter)</span>
                  <span className="text-right">1500W (Ultra Supercluster)</span>
                </div>
              </div>
            </div>

            {/* Calculated Output Telemetry Panel (lg: 6 cols) */}
            <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#c4c5d5]/50 shadow-xs">
              <div className="font-mono text-xs text-[#757684] uppercase tracking-wider mb-4 pb-2 border-b border-[#c4c5d5]/20 flex justify-between items-center">
                <span>SIMULATION PREDICTION RESULTS</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  FEASIBILITY: HIGH
                </span>
              </div>

              <div className="space-y-5">
                {/* Bandwidth output */}
                <div>
                  <div className="text-xs text-[#444653]">
                    총 패키지 인터커넥트 신호 대역폭
                  </div>
                  <div className="text-2xl font-extrabold text-[#00288e]">
                    {bandwidthStr}
                  </div>
                  <div className="text-[12px] text-[#757684] mt-0.5">
                    HBM4 채널당 1.2 TB/s 고주파 저손실 라우팅 기준 (예시 산출)
                  </div>
                </div>

                {/* Warpage output */}
                <div className="pt-4 border-t border-[#c4c5d5]/20">
                  <div className="text-xs text-[#444653]">
                    예상 열 팽창 변형 휨 (Substrate Warpage)
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mt-0.5">
                    <div className="text-2xl font-extrabold text-[#0b1c30]">
                      {warpageStr}
                    </div>
                    <span className="text-emerald-600 font-mono text-xs font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      사내 관리 기준 (&lt;30µm) 이내 · 예시
                    </span>
                  </div>
                  <div className="text-[12px] text-[#757684] mt-0.5">
                    유리기판 코어 적층 시 유기 기판 대비 휨 58% 감소 가정 (예시 산출)
                  </div>
                </div>

                {/* Recommended Packaging */}
                <div className="pt-4 border-t border-[#c4c5d5]/20">
                  <div className="text-xs text-[#444653] mb-1.5 font-medium">
                    추천 최적 기판 솔루션 (Recommended Packaging)
                  </div>
                  <div className="bg-[#eff4ff] px-4 py-3 rounded-lg border border-[#c4c5d5]/40 text-sm font-bold text-[#00288e] flex items-center justify-between gap-2">
                    <span className="leading-snug break-words">{recommendedSolution}</span>
                    <CheckCircle2 className="w-5 h-5 text-[#00288e] shrink-0" />
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleOpenPdfModal}
                    className="w-full bg-[#00288e] hover:bg-[#1e40af] text-white py-3.5 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.98] shadow-xs cursor-pointer"
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>우리 칩 맞춤형 패키징 설계안 요약 보기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
