'use client';

import React, { useId, useRef, useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface TeaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 기본값은 아래 <option> 과 **글자가 똑같아야** 한다 — 예전 기본값('전통 한옥 복원 & 리모델링',
// '서울 종로·은평 등 수도권')은 어떤 option 과도 맞지 않아, 화면엔 첫 항목이 뜨는데
// 상태에는 엉뚱한 값이 담겨 있었다(게다가 '실평수' 칸에 지역 문자열이 들어 있었다).
const WORK_TYPE_OPTIONS = [
  '전통 고택 리모델링',
  '현대식 신축 한옥',
  '상업 티하우스 인테리어',
  '문화 갤러리 복합공간',
] as const;
const AREA_OPTIONS = [
  '30평 이하 (단독채)',
  '40~70평 (중형 한옥)',
  '80~150평 (대형 고택)',
  '200평 이상 (마을/단지)',
] as const;

export const TeaModal: React.FC<TeaModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    workType: string;
    area: string;
  }>({
    name: '',
    phone: '',
    workType: WORK_TYPE_OPTIONS[0],
    area: AREA_OPTIONS[0],
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // 안내 모달이 열려 있는 동안에는 이 훅을 쉬게 한다 — 그러지 않으면 Esc 와 Tab 가두기가
  // 위에 뜬 SampleNotice 와 서로 싸운다(Esc 한 번에 두 겹이 같이 닫힌다).
  useSampleDialog({ open: isOpen && !isNoticeOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/80 backdrop-blur-md animate-fade-in text-[#f4ede2]"
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
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain rounded-t-3xl lg:rounded-3xl bg-[#1c1714] border border-[#382f29] p-6 lg:p-8 shadow-2xl outline-none break-keep"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="시공 상담 닫기"
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#261f1a] hover:bg-[#382f29] text-[#a89888] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6 pr-14">
          <span className="text-[10px] font-mono text-[#d8b896] uppercase tracking-widest block mb-1">
            HANOK ATELIER INQUIRY
          </span>
          <h3 id={titleId} className="text-xl lg:text-2xl font-bold text-white mb-2">
            한옥 다도 문화 공간 시공 상담
          </h3>
          <p className="text-xs text-[#a89888] font-light leading-relaxed">
            전통 한옥 신축 및 고택 리모델링, 다도 문화 복합 공간의 기획과 시공 상담을 신청하실 수
            있습니다.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label
              htmlFor={`${titleId}-name`}
              className="block text-xs font-mono text-[#c4b5a5] mb-1.5"
            >
              성함 / 건축주 성함
            </label>
            <input
              id={`${titleId}-name`}
              type="text"
              placeholder="예: 박정림 대표"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-[#14100e] border border-[#382f29] focus:border-[#8c715c] text-[#f4ede2] text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor={`${titleId}-phone`}
              className="block text-xs font-mono text-[#c4b5a5] mb-1.5"
            >
              연락처
            </label>
            <input
              id={`${titleId}-phone`}
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-[#14100e] border border-[#382f29] focus:border-[#8c715c] text-[#f4ede2] text-xs outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor={`${titleId}-worktype`}
                className="block text-xs font-mono text-[#c4b5a5] mb-1.5"
              >
                공사 유형
              </label>
              <select
                id={`${titleId}-worktype`}
                value={formData.workType}
                onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                className="w-full min-h-11 px-3 py-3 rounded-xl bg-[#14100e] border border-[#382f29] focus:border-[#8c715c] text-[#f4ede2] text-xs outline-none transition-colors"
              >
                {WORK_TYPE_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`${titleId}-area`}
                className="block text-xs font-mono text-[#c4b5a5] mb-1.5"
              >
                예상 실평수
              </label>
              <select
                id={`${titleId}-area`}
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full min-h-11 px-3 py-3 rounded-xl bg-[#14100e] border border-[#382f29] focus:border-[#8c715c] text-[#f4ede2] text-xs outline-none transition-colors"
              >
                {AREA_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-[10px] text-center text-[#8c7868] pt-2">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full min-h-11 py-3.5 rounded-xl bg-[#6b5545] hover:bg-[#856b57] text-[#f4ede2] font-bold text-xs tracking-wider uppercase transition-all active:scale-95 border border-[#8c715c] cursor-pointer"
          >
            시공 상담 신청하기
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-11 py-2.5 rounded-xl bg-[#261f1a] hover:bg-[#382f29] text-[#a89888] text-xs font-medium transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="jeonglim-tea"
        industry="interior"
        featureName="한옥 다도 문화 공간 시공 상담"
      />
    </div>
  );
};
