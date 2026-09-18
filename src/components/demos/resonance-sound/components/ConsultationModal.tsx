'use client';

import React, { useId, useRef, useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROOM_TYPES = [
  '프라이빗 하이파이 청음실',
  '상업 바이닐 레코드 라운지',
  '홈 시네마 & 멀티 리스닝 룸',
  '전문 레코딩 마스터링 스튜디오',
] as const;

const AREA_RANGES = [
  '15평 이하 (전용 룸)',
  '20~35평형 (표준 스위트)',
  '40~70평 (복합 라운지)',
  '80평 이상 대형 홀',
] as const;

type ConsultationForm = {
  name: string;
  phone: string;
  roomType: string;
  area: string;
};

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ConsultationForm>({
    name: '',
    phone: '',
    // 초깃값은 반드시 option 문구와 글자까지 같아야 한다 — 다르면 select 가 첫 항목을 보여주면서
    // 상태에는 다른 값이 들어 있는 어긋남이 생긴다(전에 '20~35평형' 이라 표시와 값이 달랐다).
    roomType: ROOM_TYPES[0],
    area: AREA_RANGES[1],
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc · 배경 스크롤 잠금 · 포커스 가두기 — 안내 모달이 뜬 동안에는 그쪽이 맡는다(Esc 한 번에 둘 다 닫히지 않게)
  useSampleDialog({ open: isOpen && !isNoticeOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#2e2319]"
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
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 lg:top-6 lg:right-6 w-11 h-11 rounded-full bg-[#faf6f0] hover:bg-[#ebdcd0] text-[#6b523e] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6 pr-14">
          <span className="text-[10px] font-mono text-[#8c6544] uppercase tracking-widest block mb-1">
            ACOUSTIC STUDIO CONSULTATION
          </span>
          <h3 id={titleId} className="font-serif text-xl lg:text-2xl font-bold text-[#2e2319] mb-2 [word-break:keep-all]">
            청음실 & 음향 스튜디오 시공 상담
          </h3>
          <p className="text-xs text-[#6b523e] font-light leading-relaxed [word-break:keep-all]">
            프라이빗 하이파이 리스닝 룸, 바이닐 카페 라운지, 홈 시네마의 방음 차음 및 룸 어쿠스틱 시공 상담을 신청하실 수 있습니다.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="resonance-name" className="block text-xs font-mono text-[#6b523e] mb-1.5">
              성함 / 대표자명
            </label>
            <input
              id="resonance-name"
              type="text"
              placeholder="예: 최공명 대표"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] focus:border-[#8c6544] text-[#2e2319] text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="resonance-phone" className="block text-xs font-mono text-[#6b523e] mb-1.5">
              연락처
            </label>
            <input
              id="resonance-phone"
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] focus:border-[#8c6544] text-[#2e2319] text-xs outline-none transition-colors"
            />
          </div>

          {/* 모바일 구간(lg 미만)에서는 한 열 — 두 열이면 select 의 긴 항목 글자가 잘려 읽히지 않는다 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div>
              <label htmlFor="resonance-room-type" className="block text-xs font-mono text-[#6b523e] mb-1.5">
                공간 유형
              </label>
              <select
                id="resonance-room-type"
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                className="w-full min-h-[44px] px-3 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] focus:border-[#8c6544] text-[#2e2319] text-xs outline-none transition-colors"
              >
                {ROOM_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="resonance-area" className="block text-xs font-mono text-[#6b523e] mb-1.5">
                예상 실평수
              </label>
              <select
                id="resonance-area"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full min-h-[44px] px-3 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] focus:border-[#8c6544] text-[#2e2319] text-xs outline-none transition-colors"
              >
                {AREA_RANGES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-[10px] text-center text-[#856b54] pt-2 [word-break:keep-all]">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full min-h-[44px] py-3.5 rounded-full bg-[#5c422c] hover:bg-[#473220] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
          >
            시공 상담 신청하기
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] py-2.5 rounded-full bg-[#faf6f0] hover:bg-[#ebdcd0] text-[#6b523e] text-xs font-medium transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="resonance-sound"
        industry="interior"
        featureName="청음실 & 음향 스튜디오 시공 상담"
      />
    </div>
  );
};
