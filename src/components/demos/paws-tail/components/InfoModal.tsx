import React, { useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

export interface InfoModalSection {
  heading: string;
  body: string;
}

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  /** 머리말 아래 한 줄 — 무엇이 예시인지 먼저 밝힌다 */
  lead?: string;
  sections: InfoModalSection[];
}

/**
 * 푸터 고지·구독 혜택처럼 «읽을 내용»만 있는 창.
 *
 * 왜 만들었나: 이 자리는 원래 브라우저 기본 경고창(저장소 규칙 위반)과 빈 앵커 주소 죽은 링크 5개였다.
 * 「준비 중」 빈 창을 띄우지 않으려고, 각 항목의 본문을 실제로 채워서 연다.
 * Esc·배경 클릭 닫힘·배경 스크롤 잠금·포커스 가둠은 demo-kit 공용 훅이 맡는다.
 */
export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  eyebrow,
  title,
  lead,
  sections,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useSampleDialog({ open: isOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm lg:items-center lg:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="paws-info-modal-title"
        tabIndex={-1}
        className="relative flex max-h-[88vh] w-full max-w-lg flex-col overflow-y-auto rounded-t-2xl border border-[#bfc9c1]/60 bg-white p-6 text-[#121c2a] shadow-2xl outline-none lg:max-h-[86vh] lg:rounded-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-[#707973] transition-colors hover:bg-slate-100 hover:text-[#121c2a]"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="pr-12">
          <div className="mb-1 flex items-center gap-2 text-sm font-bold text-[#0f5238]">
            <span className="material-symbols-outlined text-base">description</span>
            <span>{eyebrow}</span>
          </div>
          <h3 id="paws-info-modal-title" className="text-lg font-bold text-[#121c2a]">
            {title}
          </h3>
          {lead && <p className="mt-1.5 text-xs leading-relaxed text-[#404943]">{lead}</p>}
        </div>

        <div className="mt-5 space-y-4">
          {sections.map((section) => (
            <div
              key={section.heading}
              className="rounded-xl border border-[#bfc9c1]/60 bg-[#f8f9ff] p-4"
            >
              <h4 className="text-xs font-bold text-[#0f5238]">{section.heading}</h4>
              <p className="mt-1 text-xs leading-relaxed text-[#404943]">{section.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-[#707973]">
          가상 브랜드 샘플 사이트입니다. 실제 업체가 아니며 위 내용은 화면 구성을 보여 주기 위한 예시
          문안입니다.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 min-h-11 w-full rounded-full bg-[#0f5238] py-3 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#2d6a4f]"
        >
          확인
        </button>
      </div>
    </div>
  );
};
