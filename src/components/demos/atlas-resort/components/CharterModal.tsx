'use client';

// 푸터 「차터」 링크가 여는 모달. 예전에는 빈 앵커라 눌러도 아무 일이 없었다.
// Esc·배경 클릭·배경 스크롤 잠금·포커스 가둠은 샘플 공용 훅(use-sample-dialog)을 그대로 쓴다.
// 모바일에서는 아래에서 올라오는 시트, lg 이상에서는 가운데 카드.

import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import type { Charter } from '../types';

interface CharterModalProps {
  charter: Charter | null;
  onClose: () => void;
}

export const CharterModal: React.FC<CharterModalProps> = ({ charter, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useSampleDialog({ open: charter !== null, onClose, dialogRef, initialFocusRef: closeRef });

  if (!charter) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-[#030402]/60 p-0 backdrop-blur-md lg:items-center lg:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`charter-title-${charter.id}`}
        tabIndex={-1}
        className="relative flex max-h-[88svh] w-full max-w-2xl flex-col rounded-t-xl border border-[#c6c7c0]/40 bg-[#fcf9f3] shadow-2xl outline-none lg:max-h-[86svh] lg:rounded"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#c6c7c0]/30 px-6 py-5 lg:px-8">
          <div className="min-w-0">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#725b38]">
              Atlas Charter
            </span>
            <h2
              id={`charter-title-${charter.id}`}
              className="font-editorial text-xl leading-tight text-[#030402] lg:text-2xl"
            >
              {charter.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="차터 닫기"
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded text-[#767872] transition-colors hover:bg-[#f0eee8] hover:text-[#030402]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 lg:px-8">
          <p className="mb-6 text-xs font-light leading-relaxed text-[#454742] lg:text-sm">{charter.lead}</p>
          <dl className="space-y-5">
            {charter.clauses.map((clause) => (
              <div key={clause.heading} className="border-t border-[#c6c7c0]/25 pt-4">
                <dt className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#030402]">
                  {clause.heading}
                </dt>
                <dd className="text-xs font-light leading-relaxed text-[#454742] lg:text-sm">{clause.body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 rounded border border-[#c6c7c0]/40 px-4 py-3 text-[11px] leading-relaxed text-[#767872]">
            이 문서는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플의 예시 문안입니다. 실제 약관이 아니며 법적 효력이 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
};
