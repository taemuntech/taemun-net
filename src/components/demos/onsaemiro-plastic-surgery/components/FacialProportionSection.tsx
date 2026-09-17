import React, { useState } from 'react';
import { Sliders, Sparkles, Check, RotateCcw, FileText, ChevronRight } from 'lucide-react';

interface FacialProportionSectionProps {
  onOpenAnalysisModal: (data: {
    upperRatio: number;
    midRatio: number;
    lowerRatio: number;
    nasolabialAngle: number;
    chinProjection: number;
    harmonyScore: number;
    presetName: string;
  }) => void;
}

export const FacialProportionSection: React.FC<FacialProportionSectionProps> = ({
  onOpenAnalysisModal,
}) => {
  // State for Face Ratios
  const [upperRatio, setUpperRatio] = useState<number>(1.0);
  const [midRatio, setMidRatio] = useState<number>(1.0);
  const [lowerRatio, setLowerRatio] = useState<number>(0.85);

  // Profile Angles
  const [nasolabialAngle, setNasolabialAngle] = useState<number>(100);
  const [chinProjection, setChinProjection] = useState<number>(0);

  const [activePreset, setActivePreset] = useState<string>('natural');

  const applyPreset = (preset: 'natural' | 'baby' | 'chic') => {
    setActivePreset(preset);
    if (preset === 'natural') {
      setUpperRatio(1.0);
      setMidRatio(1.0);
      setLowerRatio(0.85);
      setNasolabialAngle(100);
      setChinProjection(0);
    } else if (preset === 'baby') {
      setUpperRatio(1.05);
      setMidRatio(0.95);
      setLowerRatio(0.8);
      setNasolabialAngle(105);
      setChinProjection(1);
    } else if (preset === 'chic') {
      setUpperRatio(1.0);
      setMidRatio(1.02);
      setLowerRatio(0.9);
      setNasolabialAngle(96);
      setChinProjection(2);
    }
  };

  const resetValues = () => {
    applyPreset('natural');
  };

  // Compute harmony score based on proximity to 1 : 1 : 0.85 and angle 98~102
  const ratioDiff =
    Math.abs(upperRatio - 1.0) * 15 +
    Math.abs(midRatio - 1.0) * 15 +
    Math.abs(lowerRatio - 0.85) * 20;
  const angleDiff = Math.abs(nasolabialAngle - 100) * 0.5;
  const harmonyScore = Math.max(78, Math.min(99, Math.round(98 - ratioDiff - angleDiff)));

  const getHarmonyEvaluation = () => {
    if (harmonyScore >= 95) return '안정적이고 기품 있는 이상적인 황금 균형';
    if (harmonyScore >= 90) return '자연스럽고 부드러운 동안 페이셜 라인';
    return '1:1 맞춤 라인 조율 시 더욱 세련된 조화 기대';
  };

  const handleOpenReport = () => {
    let pName = '자연스러운 클래식형';
    if (activePreset === 'baby') pName = '화사한 동안 볼륨형';
    if (activePreset === 'chic') pName = '입체적인 세련 도회형';

    onOpenAnalysisModal({
      upperRatio,
      midRatio,
      lowerRatio,
      nasolabialAngle,
      chinProjection,
      harmonyScore,
      presetName: pName,
    });
  };

  return (
    <section id="proportion" className="py-20 lg:py-28 bg-[#1A1817] text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-[#C5A880]/15 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/30 text-[#E8DDD4] text-[12px] font-medium mb-3">
            <Sliders className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>온새미로 3D 안면 비율 분석기</span>
          </div>
          <h2 className="text-[28px] lg:text-[40px] font-serif font-bold text-white leading-tight mb-4">
            나에게 가장 자연스러운<br />
            <span className="bg-gradient-to-r from-[#FFF] via-[#E8DDD4] to-[#C5A880] bg-clip-text text-transparent">
              1:1:0.8 안면 황금비율 시뮬레이터
            </span>
          </h2>
          <p className="text-[15px] text-[#A69F97] leading-relaxed">
            이마(상안), 코(중안), 턱끝(하안)의 삼등분 비율과 비순각을 직접 조절해보며<br className="hidden lg:block" />
            내 얼굴에 어울리는 최적의 자연스러운 밸런스를 탐색해보세요.
          </p>
        </div>

        {/* Simulator Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.03] border border-white/10 rounded-3xl p-6 lg:p-10 shadow-2xl backdrop-blur-sm">
          {/* Left Controls: Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Preset Selector */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-[13px] font-medium text-[#C5A880]">추천 황금 밸런스 프리셋:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => applyPreset('natural')}
                  className={`px-3 py-1 rounded-full text-[12px] transition-all ${
                    activePreset === 'natural'
                      ? 'bg-[#C5A880] text-[#1A1817] font-bold'
                      : 'bg-white/5 text-[#D3CBC3] hover:bg-white/10'
                  }`}
                >
                  자연미 클래식
                </button>
                <button
                  onClick={() => applyPreset('baby')}
                  className={`px-3 py-1 rounded-full text-[12px] transition-all ${
                    activePreset === 'baby'
                      ? 'bg-[#C5A880] text-[#1A1817] font-bold'
                      : 'bg-white/5 text-[#D3CBC3] hover:bg-white/10'
                  }`}
                >
                  동안 볼륨형
                </button>
                <button
                  onClick={() => applyPreset('chic')}
                  className={`px-3 py-1 rounded-full text-[12px] transition-all ${
                    activePreset === 'chic'
                      ? 'bg-[#C5A880] text-[#1A1817] font-bold'
                      : 'bg-white/5 text-[#D3CBC3] hover:bg-white/10'
                  }`}
                >
                  세련 도회형
                </button>
                <button
                  onClick={resetValues}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#A69F97] hover:text-white transition-colors"
                  title="기본값 초기화"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Slider 1: Upper (상안) */}
            <div className="space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#D3CBC3] font-medium">상안부 (이마 헤어라인 ~ 눈썹)</span>
                <span className="text-[#C5A880] font-mono font-bold">{upperRatio.toFixed(2)} 비율</span>
              </div>
              <input
                type="range"
                min="0.80"
                max="1.20"
                step="0.01"
                value={upperRatio}
                onChange={(e) => {
                  setUpperRatio(parseFloat(e.target.value));
                  setActivePreset('custom');
                }}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
              />
              <div className="flex justify-between text-[11px] text-[#8C857D]">
                <span>이마 좁음 (0.80)</span>
                <span>한국 표준 기준 (1.00)</span>
                <span>이마 넓음 (1.20)</span>
              </div>
            </div>

            {/* Slider 2: Mid (중안) */}
            <div className="space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#D3CBC3] font-medium">중안부 (눈썹 ~ 코끝/비하점)</span>
                <span className="text-[#C5A880] font-mono font-bold">{midRatio.toFixed(2)} 비율</span>
              </div>
              <input
                type="range"
                min="0.80"
                max="1.20"
                step="0.01"
                value={midRatio}
                onChange={(e) => {
                  setMidRatio(parseFloat(e.target.value));
                  setActivePreset('custom');
                }}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
              />
              <div className="flex justify-between text-[11px] text-[#8C857D]">
                <span>중안부 짧음 (0.80)</span>
                <span>균형 중심 (1.00)</span>
                <span>중안부 김 (1.20)</span>
              </div>
            </div>

            {/* Slider 3: Lower (하안) */}
            <div className="space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#D3CBC3] font-medium">하안부 (코끝 ~ 턱끝) [이상치: 0.80~0.85]</span>
                <span className="text-[#C5A880] font-mono font-bold">{lowerRatio.toFixed(2)} 비율</span>
              </div>
              <input
                type="range"
                min="0.70"
                max="1.10"
                step="0.01"
                value={lowerRatio}
                onChange={(e) => {
                  setLowerRatio(parseFloat(e.target.value));
                  setActivePreset('custom');
                }}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
              />
              <div className="flex justify-between text-[11px] text-[#8C857D]">
                <span>짧은 동안형 턱 (0.70)</span>
                <span>이상적 황금비 (0.85)</span>
                <span>긴 턱 라인 (1.10)</span>
              </div>
            </div>

            {/* Slider 4: Nasolabial Angle (비순각) */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#D3CBC3] font-medium">비순각 각도 (코기둥과 인중 각도)</span>
                <span className="text-[#C5A880] font-mono font-bold">{nasolabialAngle}°</span>
              </div>
              <input
                type="range"
                min="88"
                max="112"
                step="1"
                value={nasolabialAngle}
                onChange={(e) => {
                  setNasolabialAngle(parseInt(e.target.value, 10));
                  setActivePreset('custom');
                }}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
              />
              <div className="flex justify-between text-[11px] text-[#8C857D]">
                <span>화살코·처진 코끝 (88°)</span>
                <span>자연스러운 여성 이상각 (98°~102°)</span>
                <span>들창코 경향 (112°)</span>
              </div>
            </div>

            {/* Slider 5: Chin Projection (턱끝 입체감) */}
            <div className="space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#D3CBC3] font-medium">턱끝 프로젝션 (무턱/주걱턱 조율)</span>
                <span className="text-[#C5A880] font-mono font-bold">{chinProjection > 0 ? `+${chinProjection}` : chinProjection} mm</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={chinProjection}
                onChange={(e) => {
                  setChinProjection(parseInt(e.target.value, 10));
                  setActivePreset('custom');
                }}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
              />
              <div className="flex justify-between text-[11px] text-[#8C857D]">
                <span>후퇴 무턱 (-5mm)</span>
                <span>이상적인 입체 라인 (0mm)</span>
                <span>전진 턱끝 (+5mm)</span>
              </div>
            </div>
          </div>

          {/* Right Visual HUD: Face Ratio Canvas & Score (5 cols) */}
          <div className="lg:col-span-5 bg-[#252220] rounded-2xl p-6 border border-[#C5A880]/20 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] uppercase tracking-wider text-[#A69F97] font-semibold">
                  3D Ratio Analysis HUD
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#C5A880]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  실시간 계산 중
                </span>
              </div>

              {/* Dynamic Face Ratio Bar Visualizer */}
              <div className="space-y-3 bg-[#1A1817] p-4 rounded-xl border border-white/5">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#A69F97]">
                    <span>상안부 (Upper)</span>
                    <span className="font-mono text-white">{upperRatio.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#C5A880] to-[#E8DDD4] h-full rounded-full transition-all duration-200"
                      style={{ width: `${(upperRatio / 1.3) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#A69F97]">
                    <span>중안부 (Middle)</span>
                    <span className="font-mono text-white">{midRatio.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#C5A880] to-[#E8DDD4] h-full rounded-full transition-all duration-200"
                      style={{ width: `${(midRatio / 1.3) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#A69F97]">
                    <span>하안부 (Lower)</span>
                    <span className="font-mono text-white">{lowerRatio.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#C5A880] to-[#E8DDD4] h-full rounded-full transition-all duration-200"
                      style={{ width: `${(lowerRatio / 1.3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Angle & Profile Metric Badges */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-[#1A1817] p-2.5 rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] text-[#8C857D]">비순각 각도</div>
                  <div className="text-[16px] font-bold text-[#E8DDD4] font-mono">{nasolabialAngle}°</div>
                </div>
                <div className="bg-[#1A1817] p-2.5 rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] text-[#8C857D]">턱끝 볼륨 편차</div>
                  <div className="text-[16px] font-bold text-[#E8DDD4] font-mono">
                    {chinProjection >= 0 ? `+${chinProjection}` : chinProjection}mm
                  </div>
                </div>
              </div>

              {/* Harmony Score Box */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#C5A880]/15 to-white/5 border border-[#C5A880]/30 text-center">
                <div className="text-[11px] text-[#C5A880] font-semibold tracking-wider uppercase mb-1">
                  안면 조화도 지수 (Facial Harmony)
                </div>
                <div className="text-[34px] font-bold font-serif text-white tracking-tight">
                  {harmonyScore} <span className="text-[16px] font-sans font-normal text-[#C5A880]">/ 100</span>
                </div>
                <div className="text-[12px] text-[#E8DDD4] mt-1 font-medium">
                  {getHarmonyEvaluation()}
                </div>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={handleOpenReport}
              className="w-full py-3.5 rounded-xl text-[14px] font-bold text-[#1A1817] bg-gradient-to-r from-[#E8DDD4] to-[#C5A880] hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <FileText className="w-4 h-4" />
              <span>정밀 3D 가상 분석 진단서 확인</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
