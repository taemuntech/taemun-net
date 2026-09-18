'use client';

import React, { useId, useRef, useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLINIC_TYPES = [
  '피부과 & 안티에이징',
  '성형외과 & 웰니스',
  '프리미엄 치과 & 턱관절',
  '한방병원 & 에스테틱',
] as const;

const AREA_RANGES = [
  '40평 이하 (소형)',
  '40~70평 (중형)',
  '70~120평 (대형)',
  '150평 이상 (병원급)',
] as const;

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  // 초기값은 반드시 아래 <option> 중 하나여야 한다 — 예전 초기값('피부과 & 안티에이징 센터'·'60~100평형')은
  // 목록에 없는 값이라, 열자마자 화면에 보이는 선택지와 실제 상태가 어긋나 있었다.
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    clinicType: string;
    area: string;
  }>({
    name: '',
    phone: '',
    clinicType: CLINIC_TYPES[0],
    area: AREA_RANGES[1],
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const nameId = useId();
  const phoneId = useId();
  const clinicId = useId();
  const areaId = useId();

  // Esc · 배경 스크롤 잠금 · 포커스 가둠 — 샘플 공용 훅. 훅은 항상 부르고 open 으로만 갈린다.
  // 위에 샘플 안내가 떠 있으면 Esc 는 그 안내만 닫는다(두 모달이 한꺼번에 닫히지 않게).
  useSampleDialog({
    open: isOpen,
    onClose: () => {
      if (!isNoticeOpen) onClose();
    },
    dialogRef,
    initialFocusRef: closeRef,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#2d241e]"
      onMouseDown={(e) => {
        if (!isNoticeOpen && e.target === e.currentTarget) onClose();
      }}
    >
      {/* 모바일에서는 시트형(아래 붙임) · lg 이상에서는 가운데 카드 */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-lg max-h-[92vh] lg:max-h-[90vh] overflow-y-auto rounded-t-3xl lg:rounded-3xl bg-white border border-[#ebdcd0] p-6 pb-8 lg:p-8 shadow-2xl outline-none"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="시공 상담 신청 닫기"
          className="absolute top-4 right-4 lg:top-6 lg:right-6 w-11 h-11 rounded-full bg-[#faf7f2] hover:bg-[#ebdcd0] text-[#6e5849] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6 pr-14">
          <span className="text-[10px] font-mono text-[#a38068] uppercase tracking-widest block mb-1">
            MEDICAL CLINIC CONSULTATION
          </span>
          <h3
            id={titleId}
            className="font-serif text-xl lg:text-2xl font-bold text-[#2d241e] mb-2 [word-break:keep-all]"
          >
            메디컬 클리닉 인테리어 시공 상담
          </h3>
          <p className="text-xs text-[#6e5849] font-light leading-relaxed [word-break:keep-all]">
            피부과, 성형외과, 하이엔드 치과, 안티에이징 센터의 차음 및 브랜딩 시공 상담을 신청하실 수 있습니다.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor={nameId} className="block text-xs font-mono text-[#6e5849] mb-1.5">
              성함 / 원장님 성함
            </label>
            <input
              id={nameId}
              type="text"
              required
              placeholder="예: 김에테르 원장"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 min-h-11 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#a38068] text-[#2d241e] text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor={phoneId} className="block text-xs font-mono text-[#6e5849] mb-1.5">
              연락처
            </label>
            <input
              id={phoneId}
              type="tel"
              required
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 min-h-11 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#a38068] text-[#2d241e] text-xs outline-none transition-colors"
            />
          </div>

          {/* 375px 에서 두 칸이 나란히 서면 선택지 글자가 잘린다 — 좁은 폭에서는 한 줄씩 */}
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
            <div>
              <label htmlFor={clinicId} className="block text-xs font-mono text-[#6e5849] mb-1.5">
                진료 과목
              </label>
              <select
                id={clinicId}
                value={formData.clinicType}
                onChange={(e) => setFormData({ ...formData, clinicType: e.target.value })}
                className="w-full px-3 py-3 min-h-11 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#a38068] text-[#2d241e] text-xs outline-none transition-colors"
              >
                {CLINIC_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={areaId} className="block text-xs font-mono text-[#6e5849] mb-1.5">
                예상 실평수
              </label>
              <select
                id={areaId}
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3 py-3 min-h-11 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#a38068] text-[#2d241e] text-xs outline-none transition-colors"
              >
                {AREA_RANGES.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 고른 값을 그대로 되비춘다 — 무엇을 골라도 같은 화면이 되지 않게 */}
          <p className="text-[11px] text-[#7a6252] bg-[#faf7f2] border border-[#ebdcd0] rounded-xl px-3 py-2.5 [word-break:keep-all]">
            신청 내용: <span className="font-medium text-[#2d241e]">{formData.clinicType}</span> ·{' '}
            <span className="font-medium text-[#2d241e]">{formData.area}</span>
          </p>

          <p className="text-[10px] text-center text-[#9c8473] pt-2 [word-break:keep-all]">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full py-3.5 min-h-11 rounded-full bg-[#524135] hover:bg-[#3d2f26] text-white font-medium text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
          >
            시공 상담 신청하기
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 min-h-11 rounded-full bg-[#faf7f2] hover:bg-[#ebdcd0] text-[#6e5849] text-xs font-medium transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="aether-medical"
        industry="interior"
        featureName="메디컬 클리닉 인테리어 시공 상담"
      />
    </div>
  );
};
