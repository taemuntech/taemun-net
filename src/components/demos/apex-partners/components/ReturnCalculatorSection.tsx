import { useState } from 'react';
import { Calculator, Download } from 'lucide-react';

interface ReturnCalculatorSectionProps {
  onOpenVdr: () => void;
}

export default function ReturnCalculatorSection({ onOpenVdr }: ReturnCalculatorSectionProps) {
  const [capital, setCapital] = useState(300); // ₩300억
  const [years, setYears] = useState(7); // 7 years
  const [moic, setMoic] = useState(2.8); // 2.8x

  // Calculations
  const totalDistribution = capital * moic;
  const netGain = totalDistribution - capital;
  const grossIrr = (Math.pow(moic, 1 / years) - 1) * 100;
  const dpi = moic.toFixed(2);

  // 현금흐름 단계 — 운용 기간에 맞춰 연차를 같이 움직인다(막대만 있고 숫자가 안 바뀌면 죽은 그림이다).
  const callEndYear = Math.max(1, Math.round(years * 0.25));
  const valueEndYear = Math.max(callEndYear + 1, Math.round(years * 0.6));

  return (
    <section
      className="py-20 bg-[#090e17] border-t border-[#4d4635]/20 relative scroll-mt-24"
      id="performance"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <span className="font-mono-metric text-[11px] text-[#f2ca50] tracking-widest uppercase">
              QUANTITATIVE MODELING &amp; LIQUIDITY
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif-display text-[#dee2ef] mt-2">
              LP 기대 수익률 &amp; 분배금 시뮬레이터 (IRR &amp; DPI)
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#161c24] border border-[#f2ca50]/30 rounded font-mono-metric text-[11px] text-[#f2ca50] mt-4 lg:mt-0 w-fit">
            <Calculator className="w-3.5 h-3.5" />
            <span>REAL-TIME ACTUARIAL SIMULATION ENGINE</span>
          </div>
        </div>

        {/* Interactive Calculator Dashboard Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#161c24] border border-[#4d4635]/40 rounded-xl p-6 lg:p-12">
          {/* Slider Controls Column */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            {/* Slider 1: Capital Commitment */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="slider-capital"
                  className="font-mono-metric text-[11px] text-[#dee2ef] font-semibold uppercase"
                >
                  출자 약정액 (Commitment Amount)
                </label>
                <span className="font-mono-metric text-lg text-[#f2ca50] font-bold">
                  ₩{capital.toLocaleString()}억 원
                </span>
              </div>
              <input
                id="slider-capital"
                type="range"
                min="100"
                max="1000"
                step="50"
                value={capital}
                onChange={(e) => setCapital(parseFloat(e.target.value))}
                className="custom-slider w-full h-11 -my-3 bg-transparent appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded [&::-webkit-slider-runnable-track]:bg-[#30353e] [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded [&::-moz-range-track]:bg-[#30353e] [&::-webkit-slider-thumb]:-mt-[5px]"
              />
              <div className="flex justify-between gap-2 font-mono-metric text-[11px] text-[#d0c5af]/70 mt-1.5">
                <span>₩100억</span>
                <span className="hidden sm:inline">₩500억</span>
                <span>₩1,000억 원</span>
              </div>
            </div>

            {/* Slider 2: Horizon Duration */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="slider-years"
                  className="font-mono-metric text-[11px] text-[#dee2ef] font-semibold uppercase"
                >
                  펀드 운용 만기 (Horizon Duration)
                </label>
                <span className="font-mono-metric text-lg text-[#f2ca50] font-bold">
                  {years} 년
                </span>
              </div>
              <input
                id="slider-years"
                type="range"
                min="4"
                max="10"
                step="1"
                value={years}
                onChange={(e) => setYears(parseFloat(e.target.value))}
                className="custom-slider w-full h-11 -my-3 bg-transparent appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded [&::-webkit-slider-runnable-track]:bg-[#30353e] [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded [&::-moz-range-track]:bg-[#30353e] [&::-webkit-slider-thumb]:-mt-[5px]"
              />
              <div className="flex justify-between gap-2 font-mono-metric text-[11px] text-[#d0c5af]/70 mt-1.5">
                <span>4년 (Fast Turnaround)</span>
                <span className="hidden sm:inline">7년 (Standard Vintage)</span>
                <span>10년 (Long-Term Infra)</span>
              </div>
            </div>

            {/* Slider 3: Target MoIC */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="slider-moic"
                  className="font-mono-metric text-[11px] text-[#dee2ef] font-semibold uppercase"
                >
                  목표 실현 배수 (Target MoIC)
                </label>
                <span className="font-mono-metric text-lg text-[#4edea3] font-bold">
                  {moic.toFixed(1)}x
                </span>
              </div>
              <input
                id="slider-moic"
                type="range"
                min="1.5"
                max="4.5"
                step="0.1"
                value={moic}
                onChange={(e) => setMoic(parseFloat(e.target.value))}
                className="custom-slider w-full h-11 -my-3 bg-transparent appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded [&::-webkit-slider-runnable-track]:bg-[#30353e] [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded [&::-moz-range-track]:bg-[#30353e] [&::-webkit-slider-thumb]:-mt-[5px]"
              />
              <div className="flex justify-between gap-2 font-mono-metric text-[11px] text-[#d0c5af]/70 mt-1.5">
                <span>1.5x (Defensive Core)</span>
                <span className="hidden sm:inline">2.8x (Standard Case)</span>
                <span>4.5x (Deep-Tech Outlier)</span>
              </div>
            </div>

            {/* Compliance Disclaimer */}
            <div className="p-4 bg-[#1a2029] border border-[#4d4635]/30 rounded text-xs text-[#d0c5af]/80 leading-relaxed">
              * 가상 브랜드 샘플의 계산기입니다. 목표 배수만으로 환산한 예시 값이라 운용보수·기준수익률·성과보수는 반영하지 않았고, 실제 펀드 실적이나 수익률 제시가 아닙니다.
            </div>
          </div>

          {/* Calculated Output Dashboard Column */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#090e17] p-6 rounded-xl border border-[#4d4635]/40">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase">
                  SIMULATED LP RETURN PROJECTION
                </span>
                <span className="px-2 py-0.5 rounded bg-[#f2ca50]/15 border border-[#f2ca50]/30 font-mono-metric text-[11px] text-[#f2ca50]">
                  예시 계산
                </span>
              </div>

              {/* 2-Column Main Distribution Totals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#4d4635]/30">
                <div>
                  <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block">
                    예상 총 분배금 (Total Return)
                  </span>
                  <div className="font-mono-metric text-2xl lg:text-3xl text-[#f2ca50] font-bold mt-1 tracking-tight">
                    ₩{totalDistribution.toFixed(1)}억 원
                  </div>
                </div>
                <div>
                  <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block">
                    기대 순 수익금 (Net Gain)
                  </span>
                  <div className="font-mono-metric text-2xl lg:text-3xl text-[#4edea3] font-bold mt-1 tracking-tight">
                    ₩{netGain.toFixed(1)}억 원
                  </div>
                </div>
              </div>

              {/* 2-Column Rates */}
              <div className="grid grid-cols-2 gap-6 py-6 border-b border-[#4d4635]/30">
                <div>
                  <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block">
                    연평균 수익률 (IRR 환산 · 보수 차감 전)
                  </span>
                  <div className="text-xl lg:text-2xl font-mono-metric text-[#dee2ef] font-semibold mt-1">
                    {grossIrr.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block">
                    DPI (납입 대비 현금 분배율)
                  </span>
                  <div className="text-xl lg:text-2xl font-mono-metric text-[#dee2ef] font-semibold mt-1">
                    {dpi}x
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Cash Flow Timeline Milestone Bar */}
            <div className="mt-6">
              <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block mb-2">
                자본 호출 및 현금 회수 사이클 (Liquidity Milestone)
              </span>
              <div className="w-full h-3 bg-[#252a33] rounded flex overflow-hidden">
                <div
                  className="h-full bg-[#99907c]"
                  style={{ width: '25%' }}
                  title={`Phase I: 자본 납입 집행 (~${callEndYear}년차)`}
                />
                <div
                  className="h-full bg-[#f2ca50]"
                  style={{ width: '35%' }}
                  title={`Phase II: 밸류업 가속 (${callEndYear + 1}~${valueEndYear}년차)`}
                />
                <div
                  className="h-full bg-[#4edea3]"
                  style={{ width: '40%' }}
                  title={`Phase III: 원금 + 초과수익 분배 (${valueEndYear + 1}~${years}년차)`}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between font-mono-metric text-[11px] text-[#d0c5af]/80 mt-2 gap-1">
                <span>Phase I: 투자 집행 (~{callEndYear}년차)</span>
                <span>Phase II: 밸류업 ({callEndYear + 1}~{valueEndYear}년차)</span>
                <span className="text-[#4edea3] font-medium">
                  Phase III: 분배 ({valueEndYear + 1}~{years}년차)
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <a
                href="#vdr"
                onClick={onOpenVdr}
                className="w-full flex items-center justify-center gap-2 min-h-12 px-4 py-3 bg-[#f2ca50] hover:bg-[#e9c349] text-[#3c2f00] rounded text-xs font-semibold text-center transition-all shadow-md"
              >
                <span>공식 기관용 팩트시트 (Detailed Factsheet) 다운로드 신청</span>
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
