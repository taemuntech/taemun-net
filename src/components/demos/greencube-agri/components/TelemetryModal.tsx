import React, { useState, useEffect, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { FACILITY_TELEMETRY } from '../data/smartfarmData';
import { FacilityTelemetry } from '../types';

interface TelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelemetryModal: React.FC<TelemetryModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<FacilityTelemetry['id']>('towerA');
  const [ticks, setTicks] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅(SampleNotice 와 같은 동작)
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTicks((t) => t + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const facility = FACILITY_TELEMETRY.find((f) => f.id === activeTab) ?? FACILITY_TELEMETRY[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="greencube-telemetry-title"
        tabIndex={-1}
        className="bg-white rounded-2xl border border-[#bccac0] shadow-2xl max-w-3xl w-full max-h-[88vh] overflow-y-auto outline-none"
      >
        {/* Modal Header */}
        <div className="p-4 lg:p-6 border-b border-[#bccac0]/30 flex items-start justify-between gap-3 bg-[#faf8ff]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-[#006948]/10 text-[#006948] flex items-center justify-center">
              <span className="material-symbols-outlined">vital_signs</span>
            </div>
            <div className="min-w-0">
              <h3
                id="greencube-telemetry-title"
                className="font-headline text-base lg:text-xl font-bold text-[#131b2e] [word-break:keep-all]"
              >
                실시간 바이오스피어 SCADA 텔레메트리
              </h3>
              <p className="font-mono text-[10px] lg:text-xs text-[#006948] font-semibold">
                SCADA CORE ENGINE v8.4 // LIVE GRID STREAMING
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="관제 창 닫기"
            className="shrink-0 flex items-center justify-center min-w-11 min-h-11 rounded-lg text-[#6d7a72] hover:text-[#131b2e] hover:bg-gray-100 transition cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab Buttons — 좁은 화면에서는 가로로 밀어서 본다(줄이 깨지지 않게) */}
        <div
          role="tablist"
          aria-label="관제 시설 선택"
          className="flex border-b border-[#bccac0]/20 px-4 lg:px-6 pt-3 gap-2 bg-[#f2f3ff] overflow-x-auto"
        >
          {FACILITY_TELEMETRY.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`font-mono text-[11px] lg:text-xs py-2.5 px-3 rounded-t-lg transition cursor-pointer shrink-0 whitespace-nowrap ${ isActive ? 'bg-white text-[#006948] font-bold border-t-2 border-[#006948]' : 'text-[#3d4a42] hover:text-[#131b2e]' }`}
              >
                <span className="lg:hidden">{tab.shortLabel}</span>
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content — 탭을 바꾸면 아래 지표·서브시스템이 통째로 바뀐다 */}
        <div className="p-4 lg:p-6 space-y-5">
          <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between font-mono text-[11px]">
            <span className="text-[#131b2e] font-bold [word-break:keep-all]">{facility.caption}</span>
            <span className="text-[#006948] shrink-0">재배 라인: {facility.cropLine}</span>
          </div>

          {/* Diagnostic Status Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#bccac0]/40">
              <span className="text-[10px] text-[#6d7a72] block">클린룸 양압 차압</span>
              <span className="text-lg font-bold text-[#006948]">
                {(facility.pressurePa + (ticks % 3) * 0.1).toFixed(1)} Pa
              </span>
              <span className="text-[10px] text-[#006948] block">정상 유지 (기준 &gt; 15Pa)</span>
            </div>

            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#bccac0]/40">
              <span className="text-[10px] text-[#6d7a72] block">공기 순환 횟수</span>
              <span className="text-lg font-bold text-[#00687a]">{facility.airChanges}</span>
              <span className="text-[10px] text-[#00687a] block">Class 1000급 클린룸 (예시 수치)</span>
            </div>

            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#bccac0]/40">
              <span className="text-[10px] text-[#6d7a72] block">양액 pH 밸런스</span>
              <span className="text-lg font-bold text-[#131b2e]">
                {(facility.phBase + ((ticks % 4) - 2) * 0.01).toFixed(2)}
              </span>
              <span className="text-[10px] text-[#006948] block">최적 흡수 범위</span>
            </div>

            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#bccac0]/40">
              <span className="text-[10px] text-[#6d7a72] block">용존산소량 (DO)</span>
              <span className="text-lg font-bold text-[#00855b]">
                {(facility.doBase + (ticks % 2) * 0.1).toFixed(1)} mg/L
              </span>
              <span className="text-[10px] text-[#00855b] block">초포화 에어로포닉스</span>
            </div>
          </div>

          {/* Subsystem health details */}
          <div className="p-4 rounded-xl border border-[#bccac0]/40 bg-white space-y-3 font-mono text-xs">
            <h4 className="font-headline font-bold text-sm text-[#131b2e]">
              서브시스템 자율 관제 상태 (Autonomous Diagnostics)
            </h4>
            <div className="space-y-2">
              {facility.subsystems.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between p-2.5 bg-[#f2f3ff] rounded-lg"
                >
                  <span className="flex items-start gap-2 [word-break:keep-all]">
                    <span
                      className={`w-2 h-2 mt-1 shrink-0 rounded-full ${ row.tone === 'primary' ? 'bg-[#006948]' : 'bg-[#00687a]' }`}
                    ></span>
                    {row.label}
                  </span>
                  <span
                    className={`font-bold shrink-0 pl-4 lg:pl-0 ${ row.tone === 'primary' ? 'text-[#006948]' : 'text-[#00687a]' }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f2f3ff] border-t border-[#bccac0]/30 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <span className="font-mono text-[10px] lg:text-[11px] text-[#6d7a72] [word-break:keep-all]">
            가상 시설의 예시 수치이며 실제 설비에서 읽어 온 값이 아닙니다.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-3 min-h-11 bg-[#006948] text-white font-mono text-xs rounded-lg hover:bg-[#00855d] transition cursor-pointer shrink-0"
          >
            모니터링 창 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
