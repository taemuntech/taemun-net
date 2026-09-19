import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/mockData';
import { CaseStudy } from '../types';

export const CaseStudiesSection: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section id="case-studies-section" className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-16 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="font-telemetry-code text-telemetry-code text-secondary font-semibold uppercase">
          SECTOR PROVEN APPLICATIONS
        </span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          산업 인프라별 특화 검측 솔루션
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
          수작업 육안 점검의 한계를 극복하고 현장 안전성 제고 및 점검 생산성 혁신을 달성한 실증 사례입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {CASE_STUDIES.map((study) => (
          <div
            key={study.id}
            onClick={() => setSelectedCase(study)}
            className="rounded-2xl bg-surface-container overflow-hidden flex flex-col shadow-sm group hover:shadow-md transition-all border border-outline-variant/30 cursor-pointer"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={study.title}
                src={study.image}
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur text-white font-telemetry-code text-[11px] border border-white/10">
                {study.category}
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-secondary/85 text-white font-telemetry-code text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <span>상세 분석 열기</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1 gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                  {study.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {study.summary}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between font-telemetry-code text-telemetry-code border border-outline-variant/20">
                <span className="text-on-surface-variant">
                  {study.id === 'civils' ? '측량 소요 기간' : study.id === 'energy' ? '발전 손실 예방' : '초동 대응 골든타임'}
                </span>
                <span
                  className={`font-bold ${
                    study.id === 'civils'
                      ? 'text-secondary'
                      : study.id === 'energy'
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {study.tag.replace(/^.*(?=(85%|연간|출동))/, '') || study.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl p-6 lg:p-8 flex flex-col gap-6 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-outline-variant">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="flex flex-col gap-2">
              <span className="px-2.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-telemetry-code text-xs font-semibold w-fit">
                {selectedCase.category} // CASE VERIFIED
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                {selectedCase.title}
              </h3>
              <p className="font-telemetry-code text-xs text-on-surface-variant">
                적용 기관 / 고객사: {selectedCase.client}
              </p>
            </div>

            <div className="rounded-xl overflow-hidden h-52 bg-surface-container">
              <img
                src={selectedCase.image}
                alt={selectedCase.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-4 text-sm text-on-surface">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1.5">
                <span className="font-telemetry-label font-bold text-xs text-secondary">
                  기존 현장 문제점 (CHALLENGE)
                </span>
                <p className="text-on-surface-variant leading-relaxed text-xs">
                  {selectedCase.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1.5">
                <span className="font-telemetry-label font-bold text-xs text-secondary">
                  에어로스펙트 자율 검측 솔루션 (SOLUTION)
                </span>
                <p className="text-on-surface-variant leading-relaxed text-xs">
                  {selectedCase.solution}
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <span className="font-telemetry-label text-xs uppercase text-on-surface font-bold">
                  정량적 도입 성과 (QUANTIFIABLE METRICS)
                </span>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                  {selectedCase.results.map((r, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border text-center flex flex-col gap-1 ${
                        r.highlight
                          ? 'bg-secondary-fixed/30 border-secondary text-secondary'
                          : 'bg-surface-container border-outline-variant/30 text-on-surface'
                      }`}
                    >
                      <span className="text-[11px] font-telemetry-code text-on-surface-variant">
                        {r.label}
                      </span>
                      <span className="font-bold font-telemetry-label text-xs">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-outline-variant/30">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-5 py-2.5 bg-primary text-on-primary rounded font-telemetry-label text-xs uppercase tracking-wider cursor-pointer"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
