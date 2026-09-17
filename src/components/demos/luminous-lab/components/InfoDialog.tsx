'use client';

// 이 샘플의 안내용 모달 — alert() 를 대신한다(저장소 규칙: 네이티브 다이얼로그 금지).
// Esc·배경 클릭으로 닫히고 배경 스크롤을 잠그는 동작은 공용 훅(use-sample-dialog)을 그대로 쓴다.

import React, { useRef } from 'react';
import { X, Info } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

export type InfoDialogContent = {
  title: string;
  lines: string[];
};

interface InfoDialogProps {
  content: InfoDialogContent | null;
  onClose: () => void;
}

export const InfoDialog: React.FC<InfoDialogProps> = ({ content, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useSampleDialog({ open: content !== null, onClose, dialogRef, initialFocusRef: closeRef });

  if (!content) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs flex items-end lg:items-center justify-center lg:p-4 animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
        tabIndex={-1}
        className="bg-white w-full lg:max-w-md rounded-t-3xl lg:rounded-3xl p-6 shadow-2xl border border-white space-y-4 outline-none animate-in slide-in-from-bottom lg:zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-[#006948]/10 text-[#006948] flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" aria-hidden="true" />
            </span>
            <h3 className="text-base font-bold text-[#141b2b] leading-snug">{content.title}</h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="안내 닫기"
            className="w-11 h-11 -mr-2 -mt-2 shrink-0 flex items-center justify-center text-gray-400 hover:text-[#141b2b] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 text-xs text-[#3d4a42] leading-relaxed">
          {content.lines.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        <p className="text-[11px] text-[#6d7a72] bg-[#f1f3ff] rounded-xl p-3 leading-relaxed">
          샘플 사이트의 예시 안내입니다. 실제 업체가 아니며 화면의 정책·혜택·수치는 모두 예시입니다.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs rounded-full flex items-center justify-center cursor-pointer transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};
