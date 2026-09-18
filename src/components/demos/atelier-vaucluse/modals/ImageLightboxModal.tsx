'use client';

import React, { useId, useRef } from 'react';
import { X } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface ImageLightboxModalProps {
  image: {
    url: string;
    label: string;
    description: string;
    alt: string;
  } | null;
  onClose: () => void;
  onRequestConsultation: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  image,
  onClose,
  onRequestConsultation,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  useSampleDialog({ open: image !== null, onClose, dialogRef });

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
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
        className="bg-[#faf9f7] rounded max-w-4xl w-full max-h-[92vh] flex flex-col border border-[#c8c7bf]/40 shadow-2xl relative my-auto overflow-hidden outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-[#c8c7bf]/30 bg-[#faf9f7]">
          <div className="min-w-0">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#904b35] font-sans block">
              Atelier Spatial Perspective
            </span>
            <h3
              id={titleId}
              className="text-lg lg:text-xl font-serif text-[#161714] break-keep [word-break:keep-all]"
            >
              {image.label}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-[#474741] hover:text-[#161714] w-11 h-11 -mr-2 shrink-0 flex items-center justify-center rounded hover:bg-[#efeeec] cursor-pointer transition-colors"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image Preview */}
        <div className="overflow-y-auto p-4 lg:p-6 space-y-4">
          <div className="max-h-[60vh] overflow-hidden rounded bg-[#efeeec] flex items-center justify-center border border-[#c8c7bf]/30">
            <img
              referrerPolicy="no-referrer"
              src={image.url}
              alt={image.alt}
              className="w-full h-full max-h-[60vh] object-contain"
            />
          </div>

          <div className="bg-[#f4f3f1] p-5 rounded border border-[#c8c7bf]/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-[#161714] font-sans mb-1">
                공간 미학 및 디테일 노트
              </h4>
              <p className="text-xs text-[#474741] font-sans font-light leading-relaxed">
                {image.description}
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onRequestConsultation();
              }}
              className="bg-[#2b2b28] text-[#faf9f7] hover:bg-[#904b35] px-5 min-h-11 rounded text-xs uppercase tracking-wider font-semibold font-sans whitespace-nowrap transition-colors cursor-pointer w-full lg:w-auto"
            >
              1:1 컨설팅 문의
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
