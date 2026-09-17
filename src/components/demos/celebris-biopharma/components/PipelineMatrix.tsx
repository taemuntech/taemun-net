import React, { useState } from 'react';
import { CheckCircle2, FileText } from 'lucide-react';
import { PIPELINE_DATA } from '../data/mockData';
import { PipelineCategory, PipelineItem } from '../types';

interface PipelineMatrixProps {
  onSelectProtocol: (item: PipelineItem) => void;
}

/** 거르개 탭 — 눌렀을 때 몇 건이 남는지 라벨에 같이 적는다(걸렀는데 화면이 안 변한 것처럼 보이지 않게) */
const CATEGORY_TABS: Array<{ id: PipelineCategory; label: string }> = [
  { id: 'all', label: '전체 파이프라인 (All)' },
  { id: 'tpd', label: 'TPD-PROTAC 분해제' },
  { id: 'adc', label: 'Next-Gen ADC 접합체' },
  { id: 'bispecific', label: '면역항암 이중항체' },
];

const countFor = (category: PipelineCategory) =>
  category === 'all' ? PIPELINE_DATA.length : PIPELINE_DATA.filter(item => item.category === category).length;

export const PipelineMatrix: React.FC<PipelineMatrixProps> = ({ onSelectProtocol }) => {
  const [activeCategory, setActiveCategory] = useState<PipelineCategory>('all');

  const filteredItems = PIPELINE_DATA.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section className="scroll-mt-[calc(5rem+var(--sample-bar-h,0px))] py-24 bg-[#eff4ff]/60 border-y border-[#c4c5d5]/30" id="pipeline">
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
            <p className="mt-3 inline-flex items-center rounded-md bg-white border border-[#c4c5d5]/50 px-3 py-1.5 text-[12px] text-[#444653]">
              아래 임상 단계·환자 수·기관 수는 화면 구성용 예시 수치입니다.
            </p>
          </div>
          <div className="mt-6 lg:mt-0 flex items-center space-x-2">
            <span className="inline-flex items-center px-3.5 py-1.5 bg-white border border-[#c4c5d5]/40 rounded-lg text-[12px] font-code-mono text-[#444653] shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#00563a] mr-1.5" />
              규제기관 IND 현황 표시 (예시)
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8" id="pipelineTabs" role="tablist" aria-label="파이프라인 분류">
          {CATEGORY_TABS.map(tab => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab.id)}
                /* 탭이 38px 이라 손가락으로 누르기 작았다 — 44px 로 올린다 */
                className={`min-h-11 px-4 py-2 rounded-lg text-[13px] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1e40af] text-white shadow-xs font-semibold'
                    : 'bg-white border border-[#c4c5d5]/50 text-[#0b1c30] hover:bg-[#eff4ff] font-medium'
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 font-code-mono text-[11px] ${isActive ? 'text-white/80' : 'text-[#757684]'}`}>
                  {countFor(tab.id)}
                </span>
              </button>
            );
          })}
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
                    <div className="grid grid-cols-5 gap-1 text-[10px] lg:text-[11px] font-code-mono text-center leading-tight [word-break:keep-all]">
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
                    {/* 두 문구가 한 줄에 맞부딪혀 잘리던 자리 — 좁으면 줄을 바꾸고 낱말 단위로만 끊는다 */}
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[11px] font-code-mono text-[#757684] [word-break:keep-all]">
                      <span className="text-[#00563a] font-semibold">{item.highlightStatus}</span>
                      <span>{item.subStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Col 4: Action & Partnership */}
                <div className="lg:col-span-2 flex lg:justify-end items-center space-x-2">
                  <button
                    onClick={() => onSelectProtocol(item)}
                    aria-label={`${item.code} 임상 프로토콜 요약 열기`}
                    className="min-h-11 px-3.5 py-1.5 rounded-lg border border-[#c4c5d5]/60 text-[12px] font-semibold text-[#00288e] hover:bg-[#eff4ff] transition flex items-center space-x-1 cursor-pointer"
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
