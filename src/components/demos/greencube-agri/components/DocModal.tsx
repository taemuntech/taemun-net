import React, { useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { DOC_ENTRIES } from '../data/smartfarmData';

interface DocModalProps {
  title: string | null;
  onClose: () => void;
}

export const DocModal: React.FC<DocModalProps> = ({ title, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  useSampleDialog({ open: title !== null, onClose, dialogRef });

  if (!title) return null;

  // 푸터 6개 링크와 Investor Portal 은 모두 DOC_ENTRIES 에 자기 내용이 있다.
  // 그래도 못 찾으면 빈 모달 대신 「준비 중」이 아닌 실제 안내를 띄운다.
  const info = DOC_ENTRIES[title] ?? {
    subtitle: '샘플 화면 안내',
    content: ['이 자료는 가상 브랜드 샘플의 예시 화면입니다. 실제 문서가 아닙니다.'],
  };

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
        aria-labelledby="greencube-doc-title"
        tabIndex={-1}
        className="bg-white rounded-2xl border border-[#bccac0] shadow-2xl max-w-lg w-full max-h-[88vh] overflow-y-auto outline-none"
      >
        <div className="p-4 lg:p-6 border-b border-[#bccac0]/30 flex items-start justify-between gap-3 bg-[#faf8ff]">
          <div className="min-w-0">
            <h3
              id="greencube-doc-title"
              className="font-headline text-base lg:text-lg font-bold text-[#131b2e] [word-break:keep-all]"
            >
              {title}
            </h3>
            <p className="font-mono text-[11px] lg:text-xs text-[#006948] mt-0.5 [word-break:keep-all]">
              {info.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="자료 창 닫기"
            className="shrink-0 flex items-center justify-center min-w-11 min-h-11 rounded-lg text-[#6d7a72] hover:text-[#131b2e] hover:bg-gray-100 transition cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-4 lg:p-6 space-y-3 font-body text-sm text-[#3d4a42]">
          {info.content.map((point, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#f2f3ff] border border-[#bccac0]/20">
              <span className="material-symbols-outlined text-[#006948] text-base shrink-0 mt-0.5">
                verified
              </span>
              <span className="leading-relaxed [word-break:keep-all]">{point}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#faf8ff] border-t border-[#bccac0]/30 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <span className="font-mono text-[10px] lg:text-[11px] text-[#6d7a72] [word-break:keep-all]">
            가상 브랜드 샘플의 예시 표기입니다 — 실제 인증서·성적서가 아닙니다.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-3 min-h-11 bg-[#006948] text-white font-mono text-xs rounded-lg hover:bg-[#00855d] transition cursor-pointer shrink-0"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
