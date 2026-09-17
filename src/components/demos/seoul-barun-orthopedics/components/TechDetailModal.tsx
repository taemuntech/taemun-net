import React, { useId, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { TechnologyItem } from '../types';

interface TechDetailModalProps {
  technology: TechnologyItem | null;
  onClose: () => void;
  onBookTech: (title: string) => void;
}

export const TechDetailModal: React.FC<TechDetailModalProps> = ({
  technology,
  onClose,
  onBookTech,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅(훅은 항상 부르고, 렌더만 아래에서 끊는다)
  useSampleDialog({ open: technology !== null, onClose, dialogRef });

  if (!technology) return null;

  const detail = technology.fullDetail;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-2xl bg-white rounded-t-2xl lg:rounded-2xl shadow-2xl border border-[#E9E8E5] overflow-hidden max-h-[90vh] flex flex-col outline-none"
      >
        {/* Header */}
        <div className="p-5 lg:p-6 border-b border-[#EFEEEB] flex items-start justify-between bg-[#FAF9F6]">
          <div>
            <span className="text-xs font-mono font-bold text-[#00652C]">
              {technology.techNum}
            </span>
            <h3 id={titleId} className="text-lg lg:text-xl font-bold text-[#1A1C1A] mt-1">
              {technology.title}
            </h3>
            <span className={`inline-block mt-2 px-2.5 py-0.5 rounded text-xs font-bold ${technology.badgeClass}`}>
              {technology.badge}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="w-11 h-11 shrink-0 rounded-full bg-white border border-[#E9E8E5] flex items-center justify-center text-[#545F73] hover:text-[#1A1C1A] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 lg:p-6 overflow-y-auto space-y-5 text-sm text-[#3F493F]">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00652C] mb-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">info</span>
              <span>치료 개요 및 원리</span>
            </h4>
            <p className="leading-relaxed bg-[#F4F3F1] p-3.5 rounded-xl text-[#1A1C1A]">
              {detail?.overview || technology.description}
            </p>
          </div>

          {/* Biological Mechanism */}
          {detail?.mechanism && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#007D73] mb-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">biotech</span>
                <span>생체 역학적 작용 기전</span>
              </h4>
              <p className="leading-relaxed">{detail.mechanism}</p>
            </div>
          )}

          {/* Target Patients */}
          {detail?.targetPatients && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1C1A] mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">person_search</span>
                <span>주요 추천 대상</span>
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {detail.targetPatients.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF9F6] border border-[#EFEEEB] text-xs font-medium text-[#1A1C1A]"
                  >
                    <span className="material-symbols-outlined text-[#00652C] text-[16px]">check</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Procedure Steps */}
          {detail?.procedureSteps && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1C1A] mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">format_list_numbered</span>
                <span>표준 시술 절차</span>
              </h4>
              <div className="space-y-2">
                {detail.procedureSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-[#00652C] text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-[#3F493F] leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Precautions */}
          {detail?.precautions && (
            <div className="p-3 rounded-xl bg-[#D5E0F8]/40 border border-[#D5E0F8] text-xs text-[#586377]">
              <strong>※ 시술 후 주의사항:</strong> {detail.precautions}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 lg:p-5 border-t border-[#EFEEEB] bg-[#FAF9F6] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-4 py-2.5 rounded-xl border border-[#E9E8E5] text-xs font-bold text-[#545F73] hover:bg-white cursor-pointer"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookTech(technology.title);
            }}
            className="min-h-11 px-5 py-2.5 rounded-xl bg-[#00652C] hover:bg-[#15803D] text-white text-xs lg:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>이 치료로 당일 예약하기</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
