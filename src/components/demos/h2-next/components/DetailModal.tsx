'use client';

// H2 NEXT 샘플의 공용 상세 모달 — 기술 카드의 「상세 스펙 시트」와 푸터의 정책 지면이 같이 쓴다.
// 「자세히 보기」가 빈 모달을 열거나 아무 데도 가지 않는 앵커로 끝나지 않게, 본문은 호출부가 반드시 채워 넣는다.
//
// 동작은 demo-kit 의 useSampleDialog 에 맡긴다 — Esc 로 닫기 · 배경 스크롤 잠금 · Tab 순환 · 이전 포커스 복귀.
// 배경 클릭 닫기와 모바일 시트(아래에서 올라오는 전체 화면)만 여기서 맡는다.

import React, { useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { Close } from './Icons';

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  /** 제목 위 작은 분류 꼬리표 */
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  /** 바닥 고정 영역 — 닫기 버튼 옆에 둘 행동 */
  footer?: React.ReactNode;
}

export const DetailModal: React.FC<DetailModalProps> = ({ open, onClose, eyebrow, title, children, footer }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useSampleDialog({ open, onClose, dialogRef, initialFocusRef: closeRef });

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[8000] flex items-end justify-center bg-[#213145]/70 backdrop-blur-sm lg:items-center lg:p-4 [word-break:keep-all]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 모바일은 아래에서 올라오는 시트, lg 이상은 가운데 카드 */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white text-left text-[#0b1c30] shadow-2xl outline-none lg:max-h-[86vh] lg:max-w-2xl lg:rounded-2xl"
      >
        {/* 머리 */}
        <div className="flex items-start justify-between gap-3 border-b border-[#e5eeff] px-5 py-4 lg:px-6">
          <div className="min-w-0">
            {eyebrow && (
              <span className="mb-1 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#00685f]">
                {eyebrow}
              </span>
            )}
            <h3 id={titleId} className="text-base font-bold leading-snug text-[#0b1c30] lg:text-lg">
              {title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="-mr-1 flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#3d4947] transition-colors hover:bg-[#eff4ff] hover:text-[#0b1c30]"
          >
            <Close className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* 본문 — 길면 여기만 스크롤한다 */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 lg:px-6">{children}</div>

        {/* 바닥 */}
        <div className="flex flex-col-reverse gap-2 border-t border-[#e5eeff] bg-[#f8f9ff] px-5 py-4 lg:flex-row lg:items-center lg:justify-end lg:px-6">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 w-full cursor-pointer rounded-lg bg-[#eff4ff] px-5 text-sm font-semibold text-[#0b1c30] transition-colors hover:bg-[#e5eeff] lg:w-auto"
          >
            닫기
          </button>
          {footer}
        </div>
      </div>
    </div>,
    document.body,
  );
};
