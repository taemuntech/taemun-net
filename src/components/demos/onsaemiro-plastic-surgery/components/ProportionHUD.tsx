import React, { useState, useMemo } from 'react';
import { HUDParameters } from '../types';

interface ProportionHUDProps {
  onOpenReportModal: (params: HUDParameters, score: number, status: string, summary: string) => void;
}

export const ProportionHUD: React.FC<ProportionHUDProps> = ({ onOpenReportModal }) => {
  const [params, setParams] = useState<HUDParameters>({
    upper: 1.00,
    mid: 1.00,
    lower: 0.82,
    angle: 98,
    projection: 1.5
  });

  const { score, status, statusClass, upperPct, midPct, lowerPct, summary } = useMemo(() => {
    const diffU = Math.abs(params.upper - 1.00);
    const diffM = Math.abs(params.mid - 1.00);
    const diffL = Math.abs(params.lower - 0.82);
    const diffA = Math.abs(params.angle - 98) / 10;
    const diffP = Math.abs(params.projection - 1.5) / 2;

    const penalty = (diffU * 45) + (diffM * 45) + (diffL * 50) + (diffA * 3) + (diffP * 2);
    let calculatedScore = Math.round(100 - penalty);
    if (calculatedScore > 100) calculatedScore = 100;
    if (calculatedScore < 68) calculatedScore = 68;

    const uPct = Math.max(60, Math.round(100 - (diffU * 100)));
    const mPct = Math.max(60, Math.round(100 - (diffM * 100)));
    const lPct = Math.max(60, Math.round(100 - (diffL * 110)));

    let statusText = '';
    let statusBadgeClass = '';
    let summaryText = '';

    if (calculatedScore >= 95) {
      statusText = '최상급 골든 하모니 (Golden Harmony)';
      statusBadgeClass = 'bg-[#c5a880] text-[#513d1d]';
      summaryText = '상·중·하안부의 밸런스가 매우 이상적입니다. 턱끝의 완만한 전진과 자연스러운 비순각을 유지하며 온새미로 특유의 무보형물 직반버선 라인 설계가 최적입니다.';
    } else if (calculatedScore >= 85) {
      statusText = '안정적 균형 하모니 (Natural Balance)';
      statusBadgeClass = 'bg-[#e4dedc] text-[#1d1b1a]';
      summaryText = '전반적 밸런스가 양호하나 하안부 또는 비순각의 미세 0.5~1.0mm 조정 시 더욱 세련되고 입체감 넘치는 동안 인상을 구현할 수 있습니다.';
    } else {
      statusText = '정밀 밸런스 조정 권장 (Refinement Needed)';
      statusBadgeClass = 'bg-[#cea481] text-[#573a1f]';
      summaryText = '비순각 혹은 중·하안부 비율의 편차가 다소 확인됩니다. 무리한 뼈 절제 없이 미세 지방재배치와 자가연골 지지대 보강을 통한 맞춤형 밸런싱이 권장됩니다.';
    }

    return {
      score: calculatedScore,
      status: statusText,
      statusClass: statusBadgeClass,
      upperPct: uPct,
      midPct: mPct,
      lowerPct: lPct,
      summary: summaryText
    };
  }, [params]);

  const resetToGolden = () => {
    setParams({
      upper: 1.00,
      mid: 1.00,
      lower: 0.82,
      angle: 98,
      projection: 1.5
    });
  };

  const applyPreset = (type: 'golden' | 'youth' | 'refined') => {
    if (type === 'golden') {
      resetToGolden();
    } else if (type === 'youth') {
      setParams({
        upper: 0.95,
        mid: 0.96,
        lower: 0.78,
        angle: 100,
        projection: 2.0
      });
    } else if (type === 'refined') {
      setParams({
        upper: 1.02,
        mid: 1.00,
        lower: 0.85,
        angle: 96,
        projection: 1.0
      });
    }
  };

  return (
    <section className="w-full py-20 bg-[#fdf9f5] relative" id="proportion-hud">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#725b38] font-bold">
            INTERACTIVE AESTHETIC SIMULATOR
          </span>
          <h2 className="font-serif text-[28px] lg:text-[34px] text-[#1c1c19]">
            1 : 1 : 0.8 안면 황금비율 HUD
          </h2>
          <p className="text-[14px] leading-relaxed text-[#4d463c]">
            상안부·중안부·하안부의 이상적 수치와 비순각을 직접 조절하여 당신의 얼굴선에 가장 부합하는 온새미로 조화 지수를 실시간으로 확인해보세요.
          </p>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-[12px] text-[#4d463c] mr-1">추천 프리셋:</span>
            <button
              onClick={() => applyPreset('golden')}
              className="px-3 py-1 rounded-full text-[12px] bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#c5a880]/30 transition-colors font-medium cursor-pointer"
            >
              온새미로 골든 스탠다드 (1:1:0.82)
            </button>
            <button
              onClick={() => applyPreset('youth')}
              className="px-3 py-1 rounded-full text-[12px] bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#c5a880]/30 transition-colors font-medium cursor-pointer"
            >
              트렌디 큐트 동안 라인
            </button>
            <button
              onClick={() => applyPreset('refined')}
              className="px-3 py-1 rounded-full text-[12px] bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#c5a880]/30 transition-colors font-medium cursor-pointer"
            >
              우아한 모던 에스테틱 라인
            </button>
          </div>
        </div>

        {/* Main HUD Panel Container */}
        <div className="p-6 lg:p-10 rounded-3xl bg-[#f1ede9] shadow-[0_16px_48px_rgba(114,91,56,0.08)] border border-[#d1c5b8]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Sliders Controller (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6 p-6 lg:p-8 rounded-2xl bg-[#ffffff] shadow-sm border border-[#d1c5b8]/30">
              <div className="flex items-center justify-between pb-3 border-b border-[#f1ede9]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#725b38] text-[22px]">tune</span>
                  <span className="text-[16px] font-semibold text-[#1c1c19]">안면 비율 파라미터 조절</span>
                </div>
                <button
                  onClick={resetToGolden}
                  className="text-[12px] text-[#725b38] hover:text-[#1c1c19] flex items-center gap-1 cursor-pointer transition-colors font-medium"
                >
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                  <span>골든 표준값 초기화</span>
                </button>
              </div>

              {/* Slider 1: 상안부 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#1c1c19]">상안부 (이마 상단 ~ 미간)</span>
                  <span className="font-mono text-[#725b38] font-bold text-[14px]">
                    {params.upper.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.80"
                  max="1.20"
                  step="0.01"
                  value={params.upper}
                  onChange={(e) => setParams(prev => ({ ...prev, upper: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-[#ebe7e4] rounded-lg appearance-none cursor-pointer accent-[#725b38]"
                />
                <div className="flex justify-between text-[11px] text-[#4d463c]">
                  <span>0.80 (좁은 이마)</span>
                  <span className="text-[#725b38] font-semibold">표준: 1.00</span>
                  <span>1.20 (넓은 이마)</span>
                </div>
              </div>

              {/* Slider 2: 중안부 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#1c1c19]">중안부 (미간 ~ 코끝)</span>
                  <span className="font-mono text-[#725b38] font-bold text-[14px]">
                    {params.mid.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.80"
                  max="1.20"
                  step="0.01"
                  value={params.mid}
                  onChange={(e) => setParams(prev => ({ ...prev, mid: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-[#ebe7e4] rounded-lg appearance-none cursor-pointer accent-[#725b38]"
                />
                <div className="flex justify-between text-[11px] text-[#4d463c]">
                  <span>0.80 (짧은 코)</span>
                  <span className="text-[#725b38] font-semibold">표준: 1.00</span>
                  <span>1.20 (긴 중안부)</span>
                </div>
              </div>

              {/* Slider 3: 하안부 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#1c1c19]">하안부 (코끝 ~ 턱끝, 트렌디 동안비율)</span>
                  <span className="font-mono text-[#725b38] font-bold text-[14px]">
                    {params.lower.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.70"
                  max="1.10"
                  step="0.01"
                  value={params.lower}
                  onChange={(e) => setParams(prev => ({ ...prev, lower: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-[#ebe7e4] rounded-lg appearance-none cursor-pointer accent-[#725b38]"
                />
                <div className="flex justify-between text-[11px] text-[#4d463c]">
                  <span>0.70 (짧은 턱)</span>
                  <span className="text-[#725b38] font-semibold">온새미로 골든: 0.80 ~ 0.85</span>
                  <span>1.10 (긴 하안부)</span>
                </div>
              </div>

              {/* Slider 4: 비순각 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#1c1c19]">비순각 (코기둥과 인중 각도)</span>
                  <span className="font-mono text-[#725b38] font-bold text-[14px]">
                    {params.angle}°
                  </span>
                </div>
                <input
                  type="range"
                  min="88"
                  max="112"
                  step="1"
                  value={params.angle}
                  onChange={(e) => setParams(prev => ({ ...prev, angle: parseInt(e.target.value, 10) }))}
                  className="w-full h-2 bg-[#ebe7e4] rounded-lg appearance-none cursor-pointer accent-[#725b38]"
                />
                <div className="flex justify-between text-[11px] text-[#4d463c]">
                  <span>88° (처진 코)</span>
                  <span className="text-[#725b38] font-semibold">이상적 직반버선: 95° ~ 100°</span>
                  <span>112° (들창코)</span>
                </div>
              </div>

              {/* Slider 5: 턱끝 프로젝션 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#1c1c19]">턱끝 전진/후퇴 볼륨 프로젝션</span>
                  <span className="font-mono text-[#725b38] font-bold text-[14px]">
                    {params.projection >= 0 ? `+${params.projection.toFixed(1)}` : params.projection.toFixed(1)} mm
                  </span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={params.projection}
                  onChange={(e) => setParams(prev => ({ ...prev, projection: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-[#ebe7e4] rounded-lg appearance-none cursor-pointer accent-[#725b38]"
                />
                <div className="flex justify-between text-[11px] text-[#4d463c]">
                  <span>-5.0mm (무턱 성향)</span>
                  <span className="text-[#725b38] font-semibold">이상적 전진: +1.0 ~ +2.0mm</span>
                  <span>+5.0mm (주걱턱 성향)</span>
                </div>
              </div>
            </div>

            {/* Right Analysis HUD & Diagnostic Gauge (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 lg:p-8 rounded-2xl bg-[#1A1817] text-[#fdf9f5] shadow-xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#725b38]/25 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-[#fedeb2] font-semibold">
                    Realtime Golden HUD
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-[#fedeb2] font-mono text-[11px]">
                    CALC v4.2
                  </span>
                </div>

                {/* Big Score Display */}
                <div className="flex flex-col gap-1 items-center justify-center py-5 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-[#ddd9d6] uppercase tracking-wider">
                    안면 하모니 지수
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-[52px] font-bold text-[#fedeb2] leading-none">
                      {score}
                    </span>
                    <span className="text-[15px] text-[#ddd9d6]">/ 100</span>
                  </div>
                  <span className={`text-[12px] px-3.5 py-1 mt-1 rounded-full font-semibold ${statusClass}`}>
                    {status}
                  </span>
                </div>

                {/* Visual Proportion Bars */}
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] text-[#ddd9d6] tracking-wider uppercase">
                    비율 분포 게이지
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-[#ddd9d6]">상안부 매칭</span>
                      <span className="text-[#fedeb2] font-mono font-semibold">{upperPct}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#c5a880] h-full transition-all duration-300 rounded-full"
                        style={{ width: `${upperPct}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-[#ddd9d6]">중안부 매칭</span>
                      <span className="text-[#fedeb2] font-mono font-semibold">{midPct}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#c5a880] h-full transition-all duration-300 rounded-full"
                        style={{ width: `${midPct}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-[#ddd9d6]">하안부 동안비율 매칭</span>
                      <span className="text-[#fedeb2] font-mono font-semibold">{lowerPct}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#fedeb2] h-full transition-all duration-300 rounded-full"
                        style={{ width: `${lowerPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Recommendation Text */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[13px] leading-relaxed text-[#ddd9d6]">
                  <span className="text-[#fedeb2] font-semibold block mb-1">
                    집도의 AI 프리뷰:
                  </span>
                  <span>{summary}</span>
                </div>
              </div>

              {/* Modal Trigger Button */}
              <button
                onClick={() => onOpenReportModal(params, score, status, summary)}
                className="relative z-10 mt-6 w-full py-3.5 rounded-xl bg-[#725b38] text-white font-semibold text-[14px] hover:bg-[#c5a880] hover:text-[#513d1d] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">assignment</span>
                <span>3D 가상성형 정밀 진단서 리포트 열람</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
