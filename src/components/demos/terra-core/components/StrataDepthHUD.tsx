import React, { useState } from 'react';
import { Layers, Activity, Compass, AlertTriangle, CheckCircle2, Sliders } from 'lucide-react';

export const StrataDepthHUD: React.FC = () => {
  const [currentDepth, setCurrentDepth] = useState<number>(-45); // -0m to -80m

  // Calculate dynamic geotechnical telemetry metrics based on depth
  const depthValue = Math.abs(currentDepth);
  const hydrostaticPressure = (depthValue * 0.105).toFixed(2); // bar
  const rockStrength = (25 + depthValue * 1.8).toFixed(1); // MPa
  const permeability = (1.5 * Math.pow(10, -(2 + depthValue * 0.08))).toExponential(2); // cm/s
  const safetyFactor = (2.85 - (depthValue * 0.008)).toFixed(2);

  // Determine current strata geological layer name
  let strataName = '도심 매립·충적토층 (Alluvial Soil)';
  let layerColor = '#f4d03f';
  let recommendedMethod = '지하 연속벽(CIP) + 차수 그라우팅';
  if (depthValue > 15 && depthValue <= 35) {
    strataName = '풍화암층 (Weathered Rock Layer)';
    layerColor = '#ff8246';
    recommendedMethod = '자천공 마이크로파일 + 고압 JSP 분사 교반';
  } else if (depthValue > 35 && depthValue <= 60) {
    strataName = '연암층 쉴드 TBM 굴진 구간 (Soft Bedrock)';
    layerColor = '#ff6b2b';
    recommendedMethod = '14.2m 대구경 쉴드 TBM 복선 연속 굴진';
  } else if (depthValue > 60) {
    strataName = '대심도 단단한 화강암반 (Solid Granite Bedrock)';
    layerColor = '#00d26a';
    recommendedMethod = '고내구성 세그먼트 라이닝 + 10bar 영구 수밀 공법';
  }

  return (
    <section id="strata-hud" className="py-20 bg-[#0b0e14] text-white border-b border-[#30363d] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#ff6b2b]/15 text-[#ff6b2b] text-xs font-mono tracking-widest uppercase mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>SUBTERRANEAN STRATA TELEMETRY HUD</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-black font-mono tracking-tight text-white">
              수직 지층 심도 계측 및 압력 관제
            </h2>
            <p className="text-xs lg:text-sm text-[#8b949e] font-sans mt-2 max-w-2xl">
              지상 0m부터 지하 80m 대심도까지 심도 슬라이더를 이동하면, 해당 지층의 정수압(bar), 일축압축강도(MPa),
              투수계수 및 최적 굴착 공법이 실시간으로 동기화됩니다.
            </p>
          </div>

          {/* Quick Preset Depth Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 font-mono text-xs">
            <button
              onClick={() => setCurrentDepth(0)}
              className={`px-3 py-1.5 rounded border transition-all ${
                currentDepth === 0
                  ? 'bg-[#ff6b2b] text-black border-[#ff6b2b] font-bold'
                  : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-white'
              }`}
            >
              0m 지상
            </button>
            <button
              onClick={() => setCurrentDepth(-15)}
              className={`px-3 py-1.5 rounded border transition-all ${
                currentDepth === -15
                  ? 'bg-[#ff6b2b] text-black border-[#ff6b2b] font-bold'
                  : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-white'
              }`}
            >
              -15m 지하철
            </button>
            <button
              onClick={() => setCurrentDepth(-35)}
              className={`px-3 py-1.5 rounded border transition-all ${
                currentDepth === -35
                  ? 'bg-[#ff6b2b] text-black border-[#ff6b2b] font-bold'
                  : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-white'
              }`}
            >
              -35m 풍화암
            </button>
            <button
              onClick={() => setCurrentDepth(-55)}
              className={`px-3 py-1.5 rounded border transition-all ${
                currentDepth === -55
                  ? 'bg-[#ff6b2b] text-black border-[#ff6b2b] font-bold'
                  : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-white'
              }`}
            >
              -55m TBM 연암
            </button>
            <button
              onClick={() => setCurrentDepth(-80)}
              className={`px-3 py-1.5 rounded border transition-all ${
                currentDepth === -80
                  ? 'bg-[#ff6b2b] text-black border-[#ff6b2b] font-bold'
                  : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-white'
              }`}
            >
              -80m 대심도 경암
            </button>
          </div>
        </div>

        {/* Main HUD Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Depth Vertical Gauge & Slider (Left 5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-[#161b22] border border-[#30363d] font-mono">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#30363d]">
              <span className="text-xs text-[#8b949e] uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#ff6b2b]" />
                DEPTH CONTROL PROBE
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                SENSOR ONLINE
              </span>
            </div>

            {/* Huge Dynamic Depth Display */}
            <div className="my-4 text-center py-6 rounded-lg bg-[#0d1117] border border-[#30363d]/60">
              <span className="text-[11px] text-[#8b949e] uppercase tracking-widest block mb-1">
                CURRENT PROBE DEPTH
              </span>
              <div className="text-5xl lg:text-6xl font-black tracking-tight" style={{ color: layerColor }}>
                {currentDepth === 0 ? '±0.0' : `${currentDepth}.0`} <span className="text-lg text-white">m</span>
              </div>
              <span className="text-xs text-[#8b949e] mt-2 block">
                {strataName}
              </span>
            </div>

            {/* Depth Slider */}
            <div className="space-y-2 mt-6">
              <div className="flex justify-between text-[11px] text-[#8b949e]">
                <span>지상 (0m)</span>
                <span>대심도 (-80m)</span>
              </div>
              <input
                type="range"
                min="-80"
                max="0"
                step="1"
                value={currentDepth}
                onChange={(e) => setCurrentDepth(Number(e.target.value))}
                className="w-full h-3 bg-[#0d1117] rounded-lg appearance-none cursor-pointer accent-[#ff6b2b] border border-[#30363d]"
              />
            </div>

            {/* Stratum Layer Profile Stack */}
            <div className="mt-8 space-y-2">
              <span className="text-[11px] text-[#8b949e] uppercase tracking-wider block mb-2">
                GEOLOGICAL STRATA PROFILE
              </span>
              <div
                className={`p-2.5 rounded text-xs flex justify-between items-center transition-all ${
                  depthValue <= 15 ? 'bg-[#f4d03f]/20 border border-[#f4d03f]' : 'bg-[#0d1117] text-[#8b949e]'
                }`}
              >
                <span>01. 매립·충적토 (0 ~ -15m)</span>
                <span className="text-[10px]">연약지반</span>
              </div>
              <div
                className={`p-2.5 rounded text-xs flex justify-between items-center transition-all ${
                  depthValue > 15 && depthValue <= 35
                    ? 'bg-[#ff8246]/20 border border-[#ff8246]'
                    : 'bg-[#0d1117] text-[#8b949e]'
                }`}
              >
                <span>02. 풍화토·풍화암 (-15 ~ -35m)</span>
                <span className="text-[10px]">언더피닝</span>
              </div>
              <div
                className={`p-2.5 rounded text-xs flex justify-between items-center transition-all ${
                  depthValue > 35 && depthValue <= 60
                    ? 'bg-[#ff6b2b]/20 border border-[#ff6b2b]'
                    : 'bg-[#0d1117] text-[#8b949e]'
                }`}
              >
                <span>03. 연암층 쉴드 TBM (-35 ~ -60m)</span>
                <span className="text-[10px]">고속철도</span>
              </div>
              <div
                className={`p-2.5 rounded text-xs flex justify-between items-center transition-all ${
                  depthValue > 60 ? 'bg-emerald-500/20 border border-emerald-500' : 'bg-[#0d1117] text-[#8b949e]'
                }`}
              >
                <span>04. 대심도 화강암반 (-60 ~ -80m)</span>
                <span className="text-[10px]">영구수밀</span>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Readouts (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Telemetry Panel */}
            <div className="p-6 rounded-xl bg-[#161b22] border border-[#30363d] font-mono">
              <span className="text-xs text-[#8b949e] uppercase tracking-wider block mb-4">
                REAL-TIME GEOTECHNICAL TELEMETRY
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Hydrostatic Pressure */}
                <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d]">
                  <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block">
                    HYDROSTATIC WATER PRESSURE
                  </span>
                  <div className="text-3xl font-black text-[#ff6b2b] mt-1">
                    {hydrostaticPressure} <span className="text-sm text-[#8b949e]">bar (예시)</span>
                  </div>
                  <div className="w-full bg-[#21262d] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-[#ff6b2b] h-full transition-all duration-300"
                      style={{ width: `${(Number(hydrostaticPressure) / 8.4) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#8b949e] mt-2 block">
                    차수벽 설계 압력: {(Number(hydrostaticPressure) * 1.5).toFixed(2)} bar 대응
                  </span>
                </div>

                {/* Rock Strength */}
                <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d]">
                  <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block">
                    UNIAXIAL COMPRESSIVE STRENGTH (UCS)
                  </span>
                  <div className="text-3xl font-black text-emerald-400 mt-1">
                    {rockStrength} <span className="text-sm text-[#8b949e]">MPa (예시)</span>
                  </div>
                  <div className="w-full bg-[#21262d] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${(Number(rockStrength) / 170) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#8b949e] mt-2 block">
                    TBM 커터 디스크 마모율: 정상 범위 유지
                  </span>
                </div>

                {/* Permeability */}
                <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d]">
                  <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block">
                    COEFFICIENT OF PERMEABILITY
                  </span>
                  <div className="text-2xl font-black text-[#f4d03f] mt-1">
                    {permeability} <span className="text-xs text-[#8b949e]">cm/s (예시)</span>
                  </div>
                  <span className="text-[10px] text-[#8b949e] mt-3 block">
                    수밀 그라우트 주입압: {depthValue > 30 ? '고압 2.5MPa' : '표준 1.0MPa'}
                  </span>
                </div>

                {/* Safety Factor */}
                <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d]">
                  <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block">
                    GLOBAL STRUCTURAL SAFETY FACTOR
                  </span>
                  <div className="text-2xl font-black text-white mt-1 flex items-center gap-2">
                    {safetyFactor} <span className="text-xs text-emerald-400">(기준 1.50 초과)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 mt-3 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 안전 진단 A등급 기준 충족
                  </span>
                </div>
              </div>
            </div>

            {/* Recommended Method Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-[#ff6b2b]/15 via-[#ff6b2b]/5 to-transparent border border-[#ff6b2b]/40 font-mono">
              <div className="flex items-center gap-2 text-xs text-[#ff6b2b] uppercase tracking-wider mb-1">
                <Compass className="w-4 h-4" />
                <span>RECOMMENDED SUBTERRANEAN METHOD</span>
              </div>
              <div className="text-base lg:text-lg font-bold text-white">
                {recommendedMethod}
              </div>
              <p className="text-xs text-[#8b949e] font-sans mt-1">
                현재 심도 {currentDepth}m 기준 실시간 지압 및 암질 지수에 최적화된 설계 공법 시뮬레이션 결과입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
