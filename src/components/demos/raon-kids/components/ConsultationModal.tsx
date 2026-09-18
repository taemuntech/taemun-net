'use client';

import React, { useId, useRef, useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 예상 실평수 기본값은 아래 <option> 과 **글자가 똑같아야** 한다 —
// 예전 기본값('50~80평형')은 어떤 option 과도 맞지 않아 화면엔 「40평 이하」가 뜨는데
// 상태에는 '50~80평형' 이 들어 있었다(보이는 값과 담기는 값이 서로 달랐다).
const AREA_OPTIONS = ['40평 이하 (교습소)', '50~80평 (아카데미)', '80~150평 (대형)', '사옥 전체 (복합 라운지)'] as const;
const INSTITUTION_OPTIONS = [
  '프리미엄 영유아 교육기관',
  '창의 미술 & 아트 아틀리에',
  '어린이 복합 놀이 라운지',
  '키즈 에듀테크 체험관',
] as const;

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  // message 는 예전에 상태에만 있고 입력칸도 읽는 곳도 없던 죽은 값이라 뺐다(화면은 그대로다).
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    institutionType: string;
    area: string;
  }>({
    name: '',
    phone: '',
    institutionType: INSTITUTION_OPTIONS[0],
    area: AREA_OPTIONS[1],
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // 안내 모달이 열려 있는 동안에는 이 훅을 쉬게 한다 — 그러지 않으면 Esc 와 Tab 가두기가
  // 위에 뜬 SampleNotice 와 서로 싸운다(Esc 한 번에 두 겹이 같이 닫히고, 포커스가 뒤로 끌려간다).
  useSampleDialog({ open: isOpen && !isNoticeOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#3b2e1e]"
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
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl lg:rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="상담 신청 닫기"
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#fcf9f2] hover:bg-[#ebdcd0] text-[#6e5840] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6 pr-14">
          <span className="text-[10px] font-mono text-[#c98330] uppercase tracking-widest block mb-1">
            KIDS ATELIER CONSULTATION
          </span>
          <h3 id={titleId} className="font-serif text-xl lg:text-2xl font-bold text-[#3b2e1e] mb-2">
            키즈 공간 & 에듀 라운지 시공 상담
          </h3>
          <p className="text-xs text-[#6e5840] font-light leading-relaxed">
            프리미엄 영유아 교육기관, 미술·음악 창의 아틀리에, 키즈 복합문화 라운지의 친환경 시공 상담을 신청하실 수 있습니다.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor={`${titleId}-name`} className="block text-xs font-mono text-[#6e5840] mb-1.5">
              성함 / 대표자명
            </label>
            <input
              id={`${titleId}-name`}
              type="text"
              placeholder="예: 이라온 원장"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#fcf9f2] border border-[#ebdcd0] focus:border-[#e39c44] text-[#3b2e1e] text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor={`${titleId}-phone`} className="block text-xs font-mono text-[#6e5840] mb-1.5">
              연락처
            </label>
            <input
              id={`${titleId}-phone`}
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#fcf9f2] border border-[#ebdcd0] focus:border-[#e39c44] text-[#3b2e1e] text-xs outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${titleId}-inst`} className="block text-xs font-mono text-[#6e5840] mb-1.5">
                기관 유형
              </label>
              <select
                id={`${titleId}-inst`}
                value={formData.institutionType}
                onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                className="w-full min-h-[44px] px-3 py-3 rounded-xl bg-[#fcf9f2] border border-[#ebdcd0] focus:border-[#e39c44] text-[#3b2e1e] text-xs outline-none transition-colors"
              >
                {INSTITUTION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`${titleId}-area`} className="block text-xs font-mono text-[#6e5840] mb-1.5">
                예상 실평수
              </label>
              <select
                id={`${titleId}-area`}
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full min-h-[44px] px-3 py-3 rounded-xl bg-[#fcf9f2] border border-[#ebdcd0] focus:border-[#e39c44] text-[#3b2e1e] text-xs outline-none transition-colors"
              >
                {AREA_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-[10px] text-center text-[#8c7456] pt-2">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full min-h-[44px] py-3.5 rounded-full bg-[#e39c44] hover:bg-[#c98330] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
          >
            시공 상담 신청하기
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] py-2.5 rounded-full bg-[#fcf9f2] hover:bg-[#ebdcd0] text-[#6e5840] text-xs font-medium transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="raon-kids"
        industry="interior"
        featureName="키즈 공간 & 에듀 라운지 시공 상담"
      />
    </div>
  );
};
