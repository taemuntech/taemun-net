import React, { useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { HUDParameters } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: HUDParameters;
  score: number;
  status: string;
  summary: string;
  onBookWithReport: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  params,
  score,
  status,
  summary,
  onBookWithReport
}) => {
  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useSampleDialog({ open: isOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/60 backdrop-blur-sm p-0 lg:p-4 animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="onsaemiro-report-modal-title"
        tabIndex={-1}
        className="bg-[#fdf9f5] rounded-t-3xl lg:rounded-3xl max-w-2xl w-full max-h-[88vh] lg:max-h-[90vh] overflow-y-auto p-6 lg:p-8 shadow-2xl relative flex flex-col gap-6 border border-[#c5a880]/30 outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#f1ede9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#725b38]/10 text-[#725b38] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">analytics</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#725b38] font-bold">
                AESTHETIC SIMULATION
              </span>
              <h3
                id="onsaemiro-report-modal-title"
                className="font-serif text-[20px] lg:text-[22px] font-semibold text-[#1c1c19]"
              >
                온새미로 안면 비율 시뮬레이션 요약
              </h3>
            </div>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="w-11 h-11 shrink-0 inline-flex items-center justify-center rounded-full hover:bg-[#ebe7e4] text-[#4d463c] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* 의학적 진단이 아니라는 고지 — 숫자보다 먼저 읽히도록 맨 위에 둔다 */}
        <div className="p-3.5 rounded-xl bg-[#f1ede9] border border-[#c5a880]/40 text-[12px] text-[#4d463c] leading-relaxed break-keep">
          <strong className="text-[#725b38] font-semibold">※ 본 요약은 의학적 진단이 아닙니다.</strong> 슬라이더로 입력한 값을 미적 비율 기준과 비교해 보여 주는 참고용 시뮬레이션이며, 실제 진단과 수술 계획은 의료진의 대면 진료와 검사로만 정해집니다.
        </div>

        {/* Score & Proportion Summary */}
        <div className="p-4 rounded-xl bg-[#f7f3ef] border border-[#d1c5b8]/30 flex flex-col gap-2.5">
          <div className="flex flex-wrap justify-between items-center gap-x-3 gap-y-1 text-[13px]">
            <span className="text-[#4d463c]">입력한 비율 값</span>
            <span className="font-mono font-semibold text-[#725b38]">
              Upper {params.upper.toFixed(2)} : Mid {params.mid.toFixed(2)} : Lower {params.lower.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-x-3 gap-y-1 text-[13px]">
            <span className="text-[#4d463c]">비순각 &amp; 턱끝 프로젝션</span>
            <span className="font-mono font-semibold text-[#1c1c19]">
              {params.angle}° / {params.projection >= 0 ? `+${params.projection.toFixed(1)}` : params.projection.toFixed(1)}mm
            </span>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-x-3 gap-y-1 text-[13px]">
            <span className="text-[#4d463c]">안면 하모니 지수 (시뮬레이션 값)</span>
            <span className="font-bold text-[#725b38]">
              {score}점 ({status})
            </span>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-x-3 gap-y-1 text-[13px]">
            <span className="text-[#4d463c]">회복 기간 안내</span>
            <span className="font-semibold text-[#1c1c19] lg:text-right">수술 종류에 따라 다르며 개인차가 큽니다</span>
          </div>
        </div>

        {/* Narrative Notes */}
        <div className="space-y-3 text-[13px] text-[#4d463c] leading-relaxed break-keep">
          <p className="font-semibold text-[#1c1c19]">시뮬레이션 해설:</p>
          <p>{summary}</p>
          <p>
            입력하신 값만 놓고 보면 비순각을 {params.angle}도 부근에 두고 턱끝 라인의 곡선을 함께 살피는 방향을 상담에서 검토해 볼 수 있습니다. 어떤 방법이 적합한지, 어떤 부작용이 따를 수 있는지는 대면 진료에서 설명드립니다.
          </p>
          <p>
            온새미로 성형외과는 불필요한 과잉 수술을 권하지 않으며, 실명 집도 원장과의 1:1 대면 상담에서 3D 계측 데이터를 함께 확인합니다.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#f1ede9]">
          <button
            onClick={onClose}
            className="px-5 min-h-[44px] rounded-full bg-[#ebe7e4] text-[#1c1c19] text-[13px] font-medium hover:bg-[#e5e2de] transition-colors cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={onBookWithReport}
            className="px-6 min-h-[44px] rounded-full bg-[#1A1817] text-[#fdf9f5] text-[13px] font-semibold hover:bg-[#2E2A27] transition-all cursor-pointer shadow-md flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px] text-[#fedeb2]">calendar_month</span>
            <span>이 값으로 1:1 상담 신청하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
