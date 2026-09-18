'use client';

import React, { useId, useRef, useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONCEPT_OPTIONS = [
  '카페 & 브런치',
  '파인다이닝 & 비스트로',
  '베이커리 & 디저트',
  '와인바 & 펍 라운지',
] as const;

const AREA_OPTIONS = ['30평 이하', '30~50평', '50~80평', '100평 이상 대형'] as const;

type ReserveForm = {
  name: string;
  phone: string;
  concept: string;
  area: string;
  message: string;
};

export const ReserveModal: React.FC<ReserveModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ReserveForm>({
    name: '',
    phone: '',
    // 초기값은 <option> 문자열과 글자까지 같아야 한다 — 다르면 화면엔 첫 항목이 보이는데
    // 상태에는 목록에 없는 값이 들어 있어, 고른 적 없는 값이 담긴 채로 제출된다.
    concept: CONCEPT_OPTIONS[0],
    area: AREA_OPTIONS[2],
    message: '',
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기·복귀 — 샘플 공용 훅
  // 안내(SampleNotice)가 열려 있는 동안에는 그쪽이 포커스를 가져가도록 이 훅을 쉬게 한다.
  useSampleDialog({ open: isOpen && !isNoticeOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in"
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
        className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-t-3xl lg:rounded-3xl bg-stone-900 border border-stone-800 p-6 lg:p-8 shadow-2xl text-stone-100 outline-none break-keep"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="상담 신청 닫기"
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6 pr-12">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
            F&B CONSULTATION INQUIRY
          </span>
          <h3 id={titleId} className="text-xl lg:text-2xl font-bold text-white mb-2">
            F&B 공간 인테리어 시공 상담
          </h3>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            카페, 레스토랑, 베이커리 등 외식업 공간의 브랜딩과 시공 상담을 신청하실 수 있습니다.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="nd-name" className="block text-xs font-mono text-stone-300 mb-1.5">
              성함 / 대표자명
            </label>
            <input
              id="nd-name"
              type="text"
              placeholder="예: 홍길동 대표"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="nd-phone" className="block text-xs font-mono text-stone-300 mb-1.5">
              연락처
            </label>
            <input
              id="nd-phone"
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 text-xs outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div>
              <label htmlFor="nd-concept" className="block text-xs font-mono text-stone-300 mb-1.5">
                업종 분야
              </label>
              <select
                id="nd-concept"
                value={formData.concept}
                onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                className="w-full min-h-11 px-3 py-3 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 text-xs outline-none transition-colors"
              >
                {CONCEPT_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="nd-area" className="block text-xs font-mono text-stone-300 mb-1.5">
                예상 실평수
              </label>
              <select
                id="nd-area"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full min-h-11 px-3 py-3 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 text-xs outline-none transition-colors"
              >
                {AREA_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="nd-message" className="block text-xs font-mono text-stone-300 mb-1.5">
              공간에 대해 알려 주실 내용 (선택)
            </label>
            <textarea
              id="nd-message"
              rows={3}
              placeholder="예: 1층 40평 카페, 오픈 주방과 테라스를 넣고 싶습니다."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 text-xs outline-none transition-colors resize-none"
            />
          </div>

          <p className="text-[10px] text-center text-stone-500 pt-2">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full min-h-11 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
          >
            시공 상담 신청하기
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-11 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 text-xs font-medium transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="nouveau-dining"
        industry="interior"
        featureName="F&B 공간 인테리어 시공 상담"
      />
    </div>
  );
};
