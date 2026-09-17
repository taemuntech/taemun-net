'use client';

// 안내용 공용 모달 — 저장소 규칙상 alert() 를 쓸 수 없어 푸터·헤더의 안내 링크가 전부 이걸 연다.
// 「접수됐다」는 가짜 성공 화면이 아니라 무엇이 예시 표기인지 그대로 적는다.

import React, { useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

export type InfoModalContent = {
  title: string;
  lines: string[];
};

interface InfoModalProps {
  content: InfoModalContent | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ content, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Esc · 배경 스크롤 잠금 · 포커스 순환 — 샘플 공용 훅
  useSampleDialog({ open: Boolean(content), onClose, dialogRef, initialFocusRef: closeRef });

  if (!content) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 p-0 lg:p-4 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="technova-info-title"
        tabIndex={-1}
        className="w-full max-w-md max-h-[88vh] overflow-y-auto rounded-t-2xl lg:rounded-xl bg-[#111827] border border-[#4cd7f6] p-5 lg:p-6 shadow-2xl outline-none spec-hairline"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#424754] pb-3">
          <h3 id="technova-info-title" className="text-base font-headline font-bold text-[#dfe2ee]">
            {content.title}
          </h3>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="안내 닫기"
            className="min-h-11 min-w-11 flex items-center justify-center rounded text-[#8c909f] hover:bg-[#1c2028] hover:text-[#dfe2ee] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="py-4 space-y-2 text-xs leading-relaxed text-[#c2c6d6]">
          {content.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <p className="rounded border border-[#424754] bg-[#0a0e16] px-3 py-2 text-[11px] leading-relaxed text-[#8c909f]">
          샘플 사이트입니다 — 화면의 업체·상품·수치 정보는 모두 예시이고 어떤 신청도 접수되지 않습니다.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full min-h-11 rounded bg-[#262a33] hover:bg-[#31353e] text-[#4cd7f6] border border-[#4cd7f6] font-label text-xs font-bold transition-colors cursor-pointer"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
