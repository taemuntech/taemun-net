import React, { useState } from 'react';
import { CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { PIPELINE_DATA } from '../data/mockData';
import { PipelineCategory, PipelineItem } from '../types';

interface PipelineMatrixProps {
  onSelectProtocol: (item: PipelineItem) => void;
}

export const PipelineMatrix: React.FC<PipelineMatrixProps> = ({ onSelectProtocol }) => {
  const [activeCategory, setActiveCategory] = useState<PipelineCategory>('all');

  const filteredItems = PIPELINE_DATA.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section className="py-24 bg-[#eff4ff]/60 border-y border-[#c4c5d5]/30" id="pipeline">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <div className="text-[11px] font-code-mono text-[#00288e] font-bold uppercase tracking-wider mb-2">
              Precision Oncology Portfolio
            </div>
            <h2 className="text-[32px] lg:text-[40px] font-bold text-[#0b1c30] tracking-tight">
              R&D 임상 파이프라인 매트릭스
            </h2>
            <p className="text-[15px] text-[#444653] mt-2 max-w-2xl leading-relaxed">
              표적 단백질 분해제(TPD) 및 차세대 항체-약물 접합체(ADC)를 중심으로 난치성 고형암을 타깃하는 혁신 신약 개발 현황입니다.
            </p>
          </div>
          <div className="mt-6 lg:mt-0 flex items-center space-x-2">
            <span className="inline-flex items-center px-3.5 py-1.5 bg-white border border-[#c4c5d5]/40 rounded-lg text-[12px] font-code-mono text-[#444653] shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#00563a] mr-1.5" />
              FDA / MFDS 실시간 IND 동기화
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8" id="pipelineTabs">
          <button
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#1e40af] text-white shadow-xs'
                : 'bg-white border border-[#c4c5d5]/50 text-[#0b1c30] hover:bg-[#eff4ff]'
            }`}
            onClick={() => setActiveCategory('all')}
          >
            전체 파이프라인 (All)
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
              activeCategory === 'tpd'
                ? 'bg-[#1e40af] text-white shadow-xs font-semibold'
                : 'bg-white border border-[#c4c5d5]/50 text-[#0b1c30] hover:bg-[#eff4ff]'
            }`}
            onClick={() => setActiveCategory('tpd')}
          >
            TPD-PROTAC 분해제
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
              activeCategory === 'adc'
                ? 'bg-[#1e40af] text-white shadow-xs font-semibold'
                : 'bg-white border border-[#c4c5d5]/50 text-[#0b1c30] hover:bg-[#eff4ff]'
            }`}
            onClick={() => setActiveCategory('adc')}
          >
            Next-Gen ADC 접합체
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
              activeCategory === 'bispecific'
                ? 'bg-[#1e40af] text-white shadow-xs font-semibold'
                : 'bg-white border border-[#c4c5d5]/50 text-[#0b1c30] hover:bg-[#eff4ff]'
            }`}
            onClick={() => setActiveCategory('bispecific')}
          >
            면역항암 이중항체
          </button>
        </div>

        {/* Pipeline Matrix Container */}
        <div className="bg-white rounded-xl border border-[#c4c5d5]/40 shadow-xs overflow-hidden divide-y divide-[#c4c5d5]/30">
          {/* Header Row (Desktop) */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#eff4ff] text-[11px] font-code-mono text-[#757684] uppercase font-semibold">
            <div className="col-span-3">프로그램 ID / 타깃 & 적응증</div>
            <div className="col-span-2">작용 기전 (MoA) & 특성</div>
            <div className="col-span-5">개발 단계 (Development Phase Status)</div>
            <div className="col-span-2 text-right">파트너십 / 데이터</div>
          </div>

          {/* Rows */}
          {filteredItems.map(item => {
            const phases = ['Discovery', 'Preclinical', 'Phase 1', item.code === 'CB-101' ? 'Phase 2a' : (item.code === 'CB-204' ? 'Phase 1b' : 'Phase 2'), 'Phase 3'];
            
            return (
              <div
                key={item.id}
                className="p-6 lg:px-6 lg:py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center hover:bg-[#f8f9ff] transition-colors"
              >
                {/* Col 1: Code & Indication */}
                <div className="lg:col-span-3 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[14px] font-code-mono font-bold text-[#00288e]">
                      {item.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${item.phaseBadgeColor}`}>
                      {item.phaseBadge}
                    </span>
                  </div>
                  <div className="text-[15px] font-semibold text-[#0b1c30]">
                    {item.target}
                  </div>
                  <div className="text-[13px] text-[#444653]">
                    {item.indication}
                  </div>
                </div>

                {/* Col 2: MoA & Characteristics */}
                <div className="lg:col-span-2 space-y-1">
                  <div className="text-[13px] font-medium text-[#0b1c30]">
                    {item.moa}
                  </div>
                  <div className="text-[11px] font-code-mono text-[#00687a]">
                    {item.characteristic}
                  </div>
                </div>

                {/* Col 3: Development Phase Status Bar */}
                <div className="lg:col-span-5">
                  <div className="space-y-1.5">
                    {/* Phase Labels */}
                    <div className="grid grid-cols-5 gap-1 text-[11px] font-code-mono text-center">
                      {phases.map((p, idx) => {
                        const isCurrent = idx === item.activePhaseIndex;
                        return (
                          <span
                            key={idx}
                            className={`${isCurrent ? 'text-[#00288e] font-bold' : 'text-[#757684]'}`}
                          >
                            {p}
                          </span>
                        );
                      })}
                    </div>

                    {/* Progress Bar Segments */}
                    <div className="grid grid-cols-5 gap-1 h-3 bg-[#dce9ff] rounded-full p-0.5 overflow-hidden">
                      {phases.map((_, idx) => {
                        const isCompleted = idx < item.activePhaseIndex;
                        const isCurrent = idx === item.activePhaseIndex;

                        if (isCompleted) {
                          return (
                            <div
                              key={idx}
                              className={`h-full ${
                                item.category === 'adc' ? 'bg-[#00687a]' : (item.category === 'bispecific' ? 'bg-[#00563a]' : 'bg-[#1e40af]')
                              } ${idx === 0 ? 'rounded-l-full' : ''}`}
                            />
                          );
                        }
                        if (isCurrent) {
                          return (
                            <div
                              key={idx}
                              className="bg-[#57dffe] relative h-full flex items-center justify-center"
                            >
                              <span className="w-2 h-2 rounded-full bg-[#00687a] animate-ping" />
                            </div>
                          );
                        }
                        return (
                          <div
                            key={idx}
                            className={`bg-[#d3e4fe] h-full ${idx === 4 ? 'rounded-r-full' : ''}`}
                          />
                        );
                      })}
                    </div>

                    {/* Phase Highlights Text */}
                    <div className="flex justify-between items-center text-[11px] font-code-mono text-[#757684]">
                      <span className="text-[#00563a] font-semibold">{item.highlightStatus}</span>
                      <span>{item.subStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Col 4: Action & Partnership */}
                <div className="lg:col-span-2 flex lg:justify-end items-center space-x-2">
                  <button
                    onClick={() => onSelectProtocol(item)}
                    className="px-3 py-1.5 rounded-lg border border-[#c4c5d5]/60 text-[12px] font-semibold text-[#00288e] hover:bg-[#eff4ff] transition flex items-center space-x-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Protocol</span>
                  </button>

                  <span
                    className={`px-2.5 py-1 rounded text-[11px] font-code-mono font-medium ${
                      item.partnershipStatus === 'L/O Open'
                        ? 'bg-[#eff4ff] text-[#1e40af]'
                        : item.partnershipStatus === 'Co-Dev'
                        ? 'bg-[#4edea3]/20 text-[#005236]'
                        : 'bg-[#e5eeff] text-[#00687a]'
                    }`}
                  >
                    {item.partnershipStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
