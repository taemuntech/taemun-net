import { useState } from 'react';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { STRATEGY_PILLARS } from '../data/investmentData';

interface StrategiesSectionProps {
  onOpenVdr: () => void;
}

export default function StrategiesSection({ onOpenVdr }: StrategiesSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = STRATEGY_PILLARS[activeIdx];

  return (
    <section className="py-20 bg-[#090e17] border-t border-[#4d4635]/20 relative" id="strategies">
      <div className="max-w-[1680px] mx-auto px-6 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <span className="font-mono-metric text-[11px] text-[#f2ca50] tracking-widest uppercase">
              DISCIPLINED CAPITAL ALLOCATION
            </span>
            <h2 className="text-2xl lg:text-4xl font-serif-display text-[#dee2ef] mt-2">
              4대 핵심 투자 전략 (Investment Pillars)
            </h2>
          </div>
          <p className="text-sm text-[#d0c5af] max-w-lg mt-4 lg:mt-0 leading-relaxed">
            철저한 하방 안정성과 비대칭적 상방 이익(Asymmetric Upside)을 실현하는 구조화된 투자 방법론
          </p>
        </div>

        {/* Strategy Pill Tabs */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[#4d4635]/30 mb-8">
          {STRATEGY_PILLARS.map((pillar, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-5 py-3 rounded text-[11px] font-mono-metric transition-all ${ isActive ? 'border border-[#f2ca50] bg-[#f2ca50] text-[#3c2f00] font-semibold shadow-sm' : 'border border-[#4d4635]/40 bg-[#161c24] text-[#d0c5af] hover:text-[#dee2ef] hover:border-[#f2ca50]/50' }`}
              >
                {pillar.pillarNumber}: {pillar.tag}
              </button>
            );
          })}
        </div>

        {/* Dynamic Strategy Card */}
        <div className="bg-[#161c24] border border-[#4d4635]/40 rounded-xl p-6 lg:p-12 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="font-mono-metric text-[11px] text-[#f2ca50] tracking-wider uppercase block mb-2">
                  INVESTMENT THESIS &amp; PLAYBOOK
                </span>
                <h3 className="text-xl lg:text-2xl font-serif-display text-[#dee2ef] mb-4">
                  {current.title}
                </h3>
                <p className="text-sm lg:text-base text-[#d0c5af]/90 leading-relaxed mb-8">
                  {current.thesis}
                </p>
              </div>

              <div>
                <span className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-3">
                  핵심 가치 제고 레버리지 (VALUE CREATION LEVERS)
                </span>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                  {current.levers.map((lever, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 bg-[#090e17] border border-[#4d4635]/30 rounded text-xs text-[#dee2ef]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#4edea3] flex-shrink-0" />
                      <span>{lever}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Mandate Telemetry Card */}
            <div className="lg:col-span-5 bg-[#090e17] border border-[#4d4635]/40 rounded-xl p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block mb-4">
                  MANDATE TELEMETRY SPECIFICATIONS
                </span>

                <div className="space-y-4">
                  <div className="p-4 bg-[#161c24] border border-[#4d4635]/30 rounded">
                    <span className="font-mono-metric text-[11px] text-[#d0c5af] block">
                      표준 투자 티켓 (Ticket Size)
                    </span>
                    <span className="font-mono-metric text-lg text-[#dee2ef] font-semibold mt-0.5 block">
                      {current.ticket}
                    </span>
                  </div>

                  <div className="p-4 bg-[#161c24] border border-[#4d4635]/30 rounded">
                    <span className="font-mono-metric text-[11px] text-[#d0c5af] block">
                      목표 순 내부수익률 (Target Net IRR)
                    </span>
                    <span className="font-mono-metric text-lg text-[#f2ca50] font-semibold mt-0.5 block">
                      {current.targetIrr}
                    </span>
                  </div>

                  <div className="p-4 bg-[#161c24] border border-[#4d4635]/30 rounded">
                    <span className="font-mono-metric text-[11px] text-[#d0c5af] block">
                      기대 회수 배수 (Historical Realized MoIC)
                    </span>
                    <span className="font-mono-metric text-lg text-[#4edea3] font-semibold mt-0.5 block">
                      {current.moic}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#4d4635]/20">
                <a
                  href="#vdr"
                  onClick={onOpenVdr}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#252a33] hover:bg-[#30353e] border border-[#f2ca50]/40 text-[#f2ca50] rounded text-xs font-semibold transition-all"
                >
                  <span>전략별 포트폴리오 트랙레코드 요청</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
