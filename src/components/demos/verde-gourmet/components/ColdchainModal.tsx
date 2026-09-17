import React, { useId, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { TELEMETRY_STEPS } from '../data/mockData';

interface ColdchainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ColdchainModal: React.FC<ColdchainModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc·배경 스크롤 잠금·포커스 순환 — 조건부 호출이 되지 않게 early return 위에서 부른다
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant overflow-hidden outline-none"
        >
          {/* Header */}
          <div className="p-5 lg:p-6 bg-primary-container text-on-primary flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="material-symbols-outlined text-secondary-fixed text-3xl shrink-0">
                ac_unit
              </span>
              <div className="min-w-0">
                <h3 id={titleId} className="text-base lg:text-lg font-bold">골든 콜드체인(0~2℃) 검증서 예시</h3>
                <p className="text-[11px] lg:text-xs text-on-primary-container font-mono">
                  VERDE GOURMET TEMPERATURE REPORT — SAMPLE DATA
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="검증서 예시 닫기"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-on-primary/80 hover:text-on-primary hover:bg-black/20"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <div className="p-5 lg:p-6 space-y-6">
            {/* Overview Summary — 세 값 모두 이 「한 건」의 예시 기록이다 */}
            <div className="grid grid-cols-3 gap-2 lg:gap-3 p-3 lg:p-4 bg-surface-container-low rounded-xl border border-outline-variant text-center">
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-outline">평균 유지온도 (예시)</div>
                <div className="text-base font-bold text-secondary font-mono mt-0.5">
                  0.88℃
                </div>
              </div>
              <div className="min-w-0 border-x border-outline-variant">
                <div className="text-[11px] font-mono text-outline">이 건 온도 이탈 (예시)</div>
                <div className="text-base font-bold text-primary font-mono mt-0.5">
                  0건
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-outline">기록 번호 (예시)</div>
                <div className="text-xs font-bold text-primary font-mono mt-1 break-all">
                  VG-COLD-0000
                </div>
              </div>
            </div>

            {/* Step-by-Step Telemetry */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-base">route</span>
                전 구간 단계별 센서 기록
              </h4>

              <div className="space-y-2.5">
                {TELEMETRY_STEPS.map((step, idx) => (
                  <div
                    key={step.step}
                    className="p-3.5 rounded-xl border border-outline-variant bg-surface-container/40 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-secondary/15 text-secondary font-mono font-bold text-xs flex items-center justify-center">
                        0{idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-primary flex flex-wrap items-center gap-x-2">
                          {step.title}
                          <span className="text-[11px] font-mono text-outline font-normal">
                            ({step.location})
                          </span>
                        </div>
                        <div className="text-[11px] text-on-surface-variant mt-0.5">
                          {step.description} · <span className="font-mono">{step.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded whitespace-nowrap">
                        {step.temp}
                      </div>
                      <span className="text-[10px] text-outline font-mono block mt-0.5">
                        정상 범위
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification Footer */}
            <div className="p-4 bg-surface-container rounded-xl border border-outline-variant flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2 text-primary font-medium">
                <span className="material-symbols-outlined text-secondary shrink-0">verified</span>
                <span>식품안전 인증기관(예시) 데이터 연동을 보여 주는 화면입니다 — 실제 조회 결과가 아닙니다</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 shrink-0 items-center justify-center bg-primary text-on-primary px-4 rounded-lg text-xs font-mono font-bold"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
