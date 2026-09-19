import React, { useState } from 'react';
import { INITIAL_DEFECTS } from '../data/mockData';
import { DefectItem } from '../types';

interface SolutionsSectionProps {
  onOpenReportModal: (defect?: DefectItem) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onOpenReportModal }) => {
  const [selectedDefect, setSelectedDefect] = useState<DefectItem>(INITIAL_DEFECTS[0]);
  const [cutFillVolume, setCutFillVolume] = useState<number>(14250);
  const [showInteractiveDefect, setShowInteractiveDefect] = useState<boolean>(false);

  return (
    <section id="solutions-section" className="w-full bg-surface-container-lowest py-16 border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-telemetry-code text-telemetry-code text-secondary font-semibold uppercase">
              INTELLIGENT DIAGNOSTIC PIPELINE
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              AERO-CLOUD : 지능형 비행 관제 &amp; 진단 플랫폼
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-telemetry-code text-telemetry-code font-bold">
              AI INFERENCE v3.4
            </span>
            <span className="px-3 py-1 rounded bg-surface-container font-telemetry-code text-telemetry-code text-on-surface-variant">
              BIM 3D COMPLIANT (예시)
            </span>
          </div>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: AI Crack & Defect Detection */}
          <div className="p-6 rounded-2xl bg-surface-container-low flex flex-col justify-between gap-6 shadow-sm border border-outline-variant/30">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-2xl">troubleshoot</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-telemetry-code text-telemetry-code text-on-surface-variant uppercase">
                  DEEP LEARNING VISION ENGINE
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  AI 자동 결함 판독 및 등급 분류
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                교량 및 댐 콘크리트의 0.1mm 단위 미세 크랙, 철근 노출, 박리/박락 현상을 딥러닝 알고리즘으로 자동 추출하여 공인 시설물안전 평가 기준(A~E등급) 결함도를 자동 채점합니다.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-surface-container-lowest flex flex-col gap-2 border border-outline-variant/30">
                <div className="flex justify-between items-center font-telemetry-code text-telemetry-code">
                  <span className="text-on-surface-variant">DEFECT IDENTIFICATION PRECISION</span>
                  <span className="font-bold text-secondary">99.2%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full transition-all duration-1000" style={{ width: '99.2%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] font-telemetry-code text-on-surface-variant">
                  <span>CRACK RESOLUTION: 0.10mm</span>
                  <span>INFERENCE: 14ms/Frame</span>
                </div>
              </div>

              {/* Interactive Inspector Button */}
              <button
                onClick={() => setShowInteractiveDefect(!showInteractiveDefect)}
                className="w-full py-2.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-telemetry-label flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-secondary">analytics</span>
                <span>{showInteractiveDefect ? '결함 로그 닫기' : '실시간 AI 검측 로그 시뮬레이터'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: 3D Digital Twin & Volumetric Analytics */}
          <div className="p-6 rounded-2xl bg-surface-container-low flex flex-col justify-between gap-6 shadow-sm border border-outline-variant/30">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-2xl">layers</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-telemetry-code text-telemetry-code text-on-surface-variant uppercase">
                  3D SPATIAL RECONSTRUCTION
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  3D 디지털 트윈 &amp; 토공량 산출
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                라이다 점군(Point Cloud)과 초고해상도 메쉬를 융합하여 센티미터급 수치표고모델(DEM)을 생성합니다. 현장 절성토량(Cut &amp; Fill, m³)을 수 분 내 자동 계산하여 공사 진행률을 직관화합니다.
              </p>
            </div>

            {/* Interactive Mini Bar Chart & Slider */}
            <div className="p-4 rounded-xl bg-surface-container-lowest flex flex-col gap-3 border border-outline-variant/30">
              <div className="flex justify-between items-center font-telemetry-code text-telemetry-code">
                <span className="text-on-surface-variant">VOLUMETRIC ERROR MARGIN</span>
                <span className="font-bold text-emerald-600">&lt; 0.8%</span>
              </div>

              {/* Dynamic volume bars based on slider */}
              <div className="flex items-end gap-2 h-12 pt-2">
                <div
                  className="flex-1 bg-surface-container rounded-t transition-all duration-300"
                  style={{ height: `${Math.min(95, 30 + (cutFillVolume / 25000) * 40)}%` }}
                  title="DEM Mesh Layer 1"
                ></div>
                <div
                  className="flex-1 bg-surface-container rounded-t transition-all duration-300"
                  style={{ height: `${Math.min(95, 45 + (cutFillVolume / 25000) * 35)}%` }}
                  title="DEM Mesh Layer 2"
                ></div>
                <div
                  className="flex-1 bg-secondary-fixed-dim rounded-t transition-all duration-300"
                  style={{ height: `${Math.min(95, 60 + (cutFillVolume / 25000) * 30)}%` }}
                  title="LiDAR Ground Points"
                ></div>
                <div
                  className="flex-1 bg-secondary rounded-t transition-all duration-300"
                  style={{ height: `${Math.min(100, 70 + (cutFillVolume / 25000) * 28)}%` }}
                  title="Total Volumetric Cut"
                ></div>
              </div>

              {/* Volume Slider control */}
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex justify-between text-[11px] font-telemetry-code text-on-surface-variant">
                  <span>산출 토공량 (Cut/Fill):</span>
                  <span className="font-bold text-on-surface">{cutFillVolume.toLocaleString()} m³</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="25000"
                  step="250"
                  value={cutFillVolume}
                  onChange={(e) => setCutFillVolume(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary"
                />
              </div>

              <div className="flex justify-between text-[11px] font-telemetry-code text-on-surface-variant pt-1 border-t border-outline-variant/20">
                <span>수치지형도 1:500 규격 충족</span>
                <span>TIFF / LAS / OBJ Export</span>
              </div>
            </div>
          </div>

          {/* Card 3: Instant Engineering Report Generation */}
          <div className="p-6 rounded-2xl bg-surface-container-low flex flex-col justify-between gap-6 shadow-sm border border-outline-variant/30">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-2xl">description</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-telemetry-code text-telemetry-code text-on-surface-variant uppercase">
                  COMPLIANCE REPORT ENGINE
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  원클릭 공학 정밀진단 보고서
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                시설물안전법 기준에 부합하는 외관조사망도 및 위치별 고유 ID가 부여된 결함 상세표를 자동 작성합니다. PDF와 한글(HWP) 포맷으로 즉시 출력하여 보고서 작성 시간을 90% 이상 감축합니다.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-surface-container-lowest flex flex-col gap-2 border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <span className="font-telemetry-code text-telemetry-code text-on-surface-variant">
                    REPORT CREATION TIME
                  </span>
                  <span className="font-bold text-on-surface font-telemetry-code text-emerald-600">
                    5 SECONDS
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-telemetry-code text-[11px]">
                    안전진단 표준 양식
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-telemetry-code text-[11px]">
                    PDF/HWP/DWG
                  </span>
                </div>
              </div>

              {/* Action trigger */}
              <button
                onClick={() => onOpenReportModal(selectedDefect)}
                className="w-full py-2.5 px-3 rounded-lg bg-primary text-on-primary hover:bg-surface-container-high hover:text-on-surface text-xs font-telemetry-label uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                <span>정밀진단 보고서 미리보기 &amp; 출력</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Defect Inspection Console (Toggled from Card 1) */}
        {showInteractiveDefect && (
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-secondary/30 shadow-md flex flex-col gap-4 transition-all">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                <h4 className="font-headline-sm text-headline-sm font-semibold">
                  인공지능 실시간 결함 식별 데이터베이스 (공인 시설진단 규격)
                </h4>
              </div>
              <span className="text-xs font-telemetry-code text-on-surface-variant">
                식별 대기 큐: 3건 정상 매핑
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {INITIAL_DEFECTS.map((defect) => {
                const isSelected = selectedDefect.id === defect.id;
                return (
                  <div
                    key={defect.id}
                    onClick={() => setSelectedDefect(defect)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-secondary-fixed/30 border-secondary shadow-xs'
                        : 'bg-surface-container-low border-outline-variant/40 hover:border-secondary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-telemetry-code text-[11px] font-bold text-secondary">
                        {defect.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-telemetry-code ${
                          defect.severity === 'D'
                            ? 'bg-red-100 text-red-800'
                            : defect.severity === 'C'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        등급 {defect.severity} ({defect.status})
                      </span>
                    </div>

                    <div className="font-semibold text-sm text-on-surface leading-snug">
                      {defect.type}
                    </div>

                    <div className="text-xs text-on-surface-variant font-telemetry-code">
                      위치: {defect.location}
                    </div>

                    <div className="grid grid-cols-2 gap-1 pt-2 border-t border-outline-variant/20 text-[11px] font-telemetry-code">
                      <span>폭: {defect.crackWidth}</span>
                      <span>신뢰도: {defect.confidence}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => onOpenReportModal(selectedDefect)}
                className="px-4 py-2 bg-secondary text-white rounded text-xs font-telemetry-label uppercase tracking-wider flex items-center gap-1.5 hover:bg-secondary/90 cursor-pointer"
              >
                <span>선택 결함 공식 보고서에 편철</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
