import { useState } from 'react';
import { Calculator, Download, CheckCircle2 } from 'lucide-react';

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
  const netIrr = (Math.pow(moic, 1 / years) - 1) * 100;
  const dpi = moic.toFixed(2);

  return (
    <section
      className="py-20 bg-[#090e17] border-t border-[#4d4635]/20 relative"
      id="performance"
    >
      <div className="max-w-[1680px] mx-auto px-6 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <span className="font-mono-metric text-[11px] text-[#f2ca50] tracking-widest uppercase">
              QUANTITATIVE MODELING &amp; LIQUIDITY
            </span>
            <h2 className="text-2xl lg:text-4xl font-serif-display text-[#dee2ef] mt-2">
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
                className="w-full h-2 bg-[#30353e] rounded appearance-none cursor-pointer custom-slider"
              />
              <div className="flex justify-between font-mono-metric text-[11px] text-[#d0c5af]/70 mt-1.5">
                <span>₩100억</span>
                <span>₩500억</span>
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
                className="w-full h-2 bg-[#30353e] rounded appearance-none cursor-pointer custom-slider"
              />
              <div className="flex justify-between font-mono-metric text-[11px] text-[#d0c5af]/70 mt-1.5">
                <span>4년 (Fast Turnaround)</span>
                <span>7년 (Standard Vintage)</span>
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
                className="w-full h-2 bg-[#30353e] rounded appearance-none cursor-pointer custom-slider"
              />
              <div className="flex justify-between font-mono-metric text-[11px] text-[#d0c5af]/70 mt-1.5">
                <span>1.5x (Defensive Core)</span>
                <span>2.8x (Standard Case)</span>
                <span>4.5x (Deep-Tech Outlier)</span>
              </div>
            </div>

            {/* Compliance Disclaimer */}
            <div className="p-4 bg-[#1a2029] border border-[#4d4635]/30 rounded text-xs text-[#d0c5af]/80 leading-relaxed">
              * 가상 브랜드 샘플의 계산기입니다. 운용보수(2.0%)·기준수익률(Hurdle 7%)·성과보수(20%)는 모두 가상 설정의 예시 수치이며, 실제 펀드 실적이나 수익률 제시가 아닙니다.
            </div>
          </div>

          {/* Calculated Output Dashboard Column */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#090e17] p-6 rounded-xl border border-[#4d4635]/40">
            <div>
              <span className="font-mono-metric text-[11px] text-[#d0c5af] block mb-4 uppercase">
                SIMULATED LP RETURN PROJECTION
              </span>

              {/* 2-Column Main Distribution Totals */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6 border-b border-[#4d4635]/30">
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
                    연평균 내부수익률 (Net IRR)
                  </span>
                  <div className="text-xl lg:text-2xl font-mono-metric text-[#dee2ef] font-semibold mt-1">
                    {netIrr.toFixed(1)}%
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
                  title="Phase I: 자본 납입 집행 (25%)"
                />
                <div
                  className="h-full bg-[#f2ca50]"
                  style={{ width: '35%' }}
                  title="Phase II: 밸류업 가속 (35%)"
                />
                <div
                  className="h-full bg-[#4edea3]"
                  style={{ width: '40%' }}
                  title="Phase III: 원금 + 초과수익 전액 분배 (40%)"
                />
              </div>
              <div className="flex flex-col lg:flex-row justify-between font-mono-metric text-[11px] text-[#d0c5af]/80 mt-2 gap-1">
                <span>Phase I: 투자 집행 (Call)</span>
                <span>Phase II: 밸류업 가속</span>
                <span className="text-[#4edea3] font-medium">
                  Phase III: 원금 + 초과수익 전액 분배
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <a
                href="#vdr"
                onClick={onOpenVdr}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#f2ca50] hover:bg-[#e9c349] text-[#3c2f00] rounded text-xs font-semibold transition-all shadow-md"
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
