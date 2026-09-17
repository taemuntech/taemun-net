'use client';

import React, { useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { HERO_IMAGE_URL } from '../data/mockData';
import { PlayCircle, Close } from './Icons';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Esc 로 닫기 · 배경 스크롤 잠금 · Tab 순환 · 이전 포커스 복귀 — 다른 샘플 모달과 같은 훅
  useSampleDialog({ open: isOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      id="videoModal"
      className="fixed inset-0 z-[8000] flex items-center justify-center bg-[#213145]/70 p-4 backdrop-blur-sm [word-break:keep-all]"
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
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-2xl border border-[#bcc9c6]/40 bg-white p-4 shadow-2xl outline-none lg:p-6"
      >
        {/* Modal Header */}
        <div className="mb-4 flex items-start justify-between gap-3 border-b border-[#e5eeff] pb-3">
          <div className="flex min-w-0 items-start gap-2">
            <PlayCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#006398]" />
            <h3 id={titleId} className="text-base font-bold leading-snug text-[#0b1c30] lg:text-lg">
              서남해 1.2GW 해상풍력 실증 단지 현장 아카이브
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="-mr-1 flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#3d4947] transition-colors hover:bg-[#eff4ff] hover:text-[#0b1c30]"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        {/* Video Canvas Preview */}
        <div className="relative mb-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-[#bcc9c6]/30 bg-[#0b1c30] shadow-inner">
          <video
            autoPlay
            controls
            playsInline
            className="h-full w-full object-cover"
            src="/portfolio/h2-next/offshore-wind.mp4"
            poster={HERO_IMAGE_URL}
          >
            <source src="/portfolio/h2-next/offshore-wind.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col items-stretch gap-3 pt-2 lg:flex-row lg:items-center lg:justify-between">
          <span className="font-mono text-[11px] text-[#6d7a77]">
            가상 브랜드 샘플의 예시 영상입니다 — 실제 현장 촬영본이 아닙니다
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 w-full cursor-pointer rounded-lg bg-[#eff4ff] px-5 text-sm font-semibold text-[#0b1c30] transition-colors hover:bg-[#e5eeff] lg:w-auto"
          >
            닫기
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
