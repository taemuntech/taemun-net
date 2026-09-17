import React, { useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { SAFETY_PILLARS } from '../data/clinicData';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
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
        aria-labelledby="onsaemiro-safety-modal-title"
        tabIndex={-1}
        className="bg-[#fdf9f5] rounded-t-3xl lg:rounded-3xl max-w-2xl w-full max-h-[88vh] lg:max-h-[90vh] overflow-y-auto p-6 lg:p-8 shadow-2xl relative flex flex-col gap-6 border border-[#c5a880]/30 outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#f1ede9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#725b38]/10 text-[#725b38] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#725b38] font-bold">
                PATIENT CHARTER
              </span>
              <h3 id="onsaemiro-safety-modal-title" className="font-serif text-[20px] lg:text-[22px] font-semibold text-[#1c1c19]">
                온새미로 5대 안심선언 서약서 전문
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

        {/* Content */}
        <div className="space-y-4 text-[13px] text-[#4d463c] leading-relaxed break-keep">
          <p className="font-semibold text-[#1c1c19] text-[14px]">
            온새미로 성형외과는 환자의 생명과 인격을 최우선 가치로 여기며, 아래 5개 조항을 진료 원칙으로 지킬 것을 서약합니다.
          </p>

          {SAFETY_PILLARS.map((pillar, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#f7f3ef] border border-[#d1c5b8]/30 flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <span className="font-serif font-bold text-[#1c1c19] text-[14px]">
                  {pillar.pillarNumber}. {pillar.title}
                </span>
                <span className="text-[11px] font-semibold text-[#725b38]">
                  {pillar.guarantee}
                </span>
              </div>
              <p className="text-[12px] text-[#4d463c]">{pillar.desc}</p>
            </div>
          ))}

          <div className="p-4 rounded-xl bg-[#1A1817] text-[#fdf9f5] text-[12px] leading-relaxed flex items-start gap-3 mt-4">
            <span className="material-symbols-outlined text-[#fedeb2] text-[20px] shrink-0">verified</span>
            <div>
              <span className="font-semibold text-[#fedeb2] block mb-0.5">실명 집도 원칙:</span>
              상담한 의사와 집도의가 달라지는 경우 수술을 진행하지 않으며, 환자가 요청하면 집도의와 수술 참여 인력을 서면으로 안내합니다. 수술의 결과와 회복 경과는 개인차가 커서 특정한 결과를 약속드릴 수 없습니다.
            </div>
          </div>

          <p className="text-[11px] text-[#4d463c] text-center pt-1">
            ※ 본 화면은 가상 브랜드 샘플이며 실제 의료기관의 서약서가 아닙니다.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-4 border-t border-[#f1ede9]">
          <button
            onClick={onClose}
            className="px-6 min-h-[44px] rounded-full bg-[#1A1817] text-[#fdf9f5] text-[13px] font-semibold hover:bg-[#2E2A27] transition-all cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
