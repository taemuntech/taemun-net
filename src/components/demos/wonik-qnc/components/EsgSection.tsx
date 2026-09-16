"use client";

import React, { useState } from 'react';
import { ChevronRight, Leaf, Users, Scale, Handshake, CheckCircle2, X, Download } from 'lucide-react';
import { ESG_PILLARS } from '../data';
import { EsgPillar } from '../types';

export const EsgSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<EsgPillar | null>(null);
  const [esgReportOpen, setEsgReportOpen] = useState(false);

  const getPillarIcon = (type: EsgPillar['iconName']) => {
    switch (type) {
      case 'eco':
        return <Leaf className="w-5 h-5 text-[#003d9b]" />;
      case 'diversity':
        return <Users className="w-5 h-5 text-[#003d9b]" />;
      case 'gavel':
        return <Scale className="w-5 h-5 text-[#003d9b]" />;
      case 'handshake':
        return <Handshake className="w-5 h-5 text-[#003d9b]" />;
      default:
        return <Leaf className="w-5 h-5 text-[#003d9b]" />;
    }
  };

  return (
    <section className="py-24 bg-[#f2f3ff] border-y border-[#c3c6d6]/30" id="esg">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs text-[#003d9b] uppercase tracking-wider block mb-2 font-bold">
              Sustainable Future
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#131b2e] tracking-tight">
              지속가능한 미래를 향한 원익큐앤씨의 약속
            </h2>
            <p className="text-base text-[#434654] mt-2 max-w-2xl leading-relaxed">
              체계적인 ESG 활동을 통해 환경을 생각하고, 사회적 책임을 다하며, 투명하고 선진적인 지배구조를 실천합니다.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEsgReportOpen(true)}
            className="mt-4 lg:mt-0 inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#003d9b] hover:underline cursor-pointer"
          >
            <span>ESG 보고서 및 데이터 센터</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Pillars Framework (With / Worth / Will / Wave) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {ESG_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              onClick={() => setSelectedPillar(pillar)}
              className="bg-white p-6 rounded-xl border border-[#c3c6d6]/40 hover:border-[#003d9b] transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs px-2.5 py-0.5 bg-[#dae2fd] text-[#003d9b] rounded font-bold">
                    {pillar.number} {pillar.name}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#f2f3ff] group-hover:bg-[#dae2fd] flex items-center justify-center transition-colors">
                    {getPillarIcon(pillar.iconName)}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#131b2e] mb-2 group-hover:text-[#003d9b] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#434654] leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#c3c6d6]/20 font-mono text-xs text-[#003d9b] font-bold flex items-center justify-between">
                <span>{pillar.badge}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#003d9b] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ESG Detail Modal */}
      {selectedPillar && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPillar(null)}
        >
          <div
            className="bg-white max-w-lg w-full rounded-xl p-6 shadow-2xl border border-[#c3c6d6]/50 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2.5 py-0.5 bg-[#003d9b] text-white rounded font-bold">
                  {selectedPillar.number} {selectedPillar.name}
                </span>
                <h3 className="text-xl font-bold text-[#131b2e]">
                  {selectedPillar.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPillar(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {selectedPillar.description}
              </p>

              <div className="bg-[#f2f3ff] p-4 rounded-lg border border-[#dae2fd]">
                <span className="font-mono text-xs text-[#003d9b] font-bold block mb-1">
                  CORE COMMITMENT
                </span>
                <p className="text-sm font-semibold text-[#131b2e]">
                  {selectedPillar.badge}
                </p>
              </div>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#003d9b]" />
                  <span>글로벌 반도체 고객사 공급망 ESG 실사 100% 적합 판정</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#003d9b]" />
                  <span>폐수 및 화학물질 안전관리 모니터링 시스템 24/7 가동</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#003d9b]" />
                  <span>지배구조 투명성 제고를 위한 사외이사 중심 감사기구 독립성 보장</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedPillar(null)}
                className="px-4 py-2 bg-[#0052cc] hover:bg-[#003d9b] text-white text-xs font-semibold rounded-md"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ESG Report Center Modal */}
      {esgReportOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEsgReportOpen(false)}
        >
          <div
            className="bg-white max-w-xl w-full rounded-xl p-6 shadow-2xl border border-[#c3c6d6]/50 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="font-mono text-xs text-[#003d9b] font-bold uppercase">
                  SUSTAINABILITY DATA CENTER
                </span>
                <h3 className="text-xl font-bold text-[#131b2e]">
                  원익큐앤씨 ESG 지속가능경영 보고서
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEsgReportOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                원익큐앤씨는 GRI Standards 및 SASB 가이드라인에 따라 연간 ESG 성과와 탄소중립 로드맵을 투명하게 공개하고 있습니다.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-[#131b2e] block">
                      2025/2026 원익큐앤씨 지속가능경영보고서 (PDF)
                    </span>
                    <span className="font-mono text-xs text-gray-500">
                      발행일: 2026.06 | 용량: 14.2 MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('ESG 보고서 다운로드가 시작되었습니다.')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0052cc] text-white text-xs font-medium rounded hover:bg-[#003d9b]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    다운로드
                  </button>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-[#131b2e] block">
                      온실가스 배출량 및 에너지 사용량 제3자 검증 성명서
                    </span>
                    <span className="font-mono text-xs text-gray-500">
                      Scope 1, 2 제3자 공인 검증 완료
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('검증 성명서 다운로드가 시작되었습니다.')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0052cc] text-white text-xs font-medium rounded hover:bg-[#003d9b]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    다운로드
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setEsgReportOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#131b2e] text-xs font-semibold rounded-md"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
