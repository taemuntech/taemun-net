'use client';

// 헤더·히어로의 「시공 상담」 버튼이 여는 모달.
// 샘플이라 상담을 받지 않는다 — 가짜 접수 완료 화면 대신 공용 안내(SampleNotice)만 연다.
// Esc·배경 클릭·배경 스크롤 잠금·포커스 가둠은 샘플 공용 훅(use-sample-dialog)을 쓴다.
// 위에 안내가 떠 있으면 Esc 는 그 안내만 닫는다(두 모달이 한꺼번에 닫히지 않게).

import React, { useRef, useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STUDIO_TYPES = [
  '1:1 프라이빗 필라테스',
  '그룹 기구 필라테스',
  '명상 & 요가 라운지',
  '에스테틱 & 호텔 스파',
] as const;

const AREA_SIZES = ['30평 이하 (1인샵)', '40~60평 (부티크)', '70~100평 (대형)', '사옥 전체 (복합)'] as const;

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  // 예전 기본값(「1:1 프라이빗 리포머 레슨」·「한남 본점」)은 select 의 option 에 없는 값이라
  // 화면에는 첫 항목이 보이는데 상태에는 딴 값이 들어 있었다 — 목록의 첫 값으로 맞춘다.
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    studioType: STUDIO_TYPES[0] as string,
    areaSize: AREA_SIZES[0] as string,
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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
    <>
      <div
        className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/60 p-0 backdrop-blur-md animate-fade-in text-[#3d322a] lg:items-center lg:p-4"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="arche-trial-title"
          tabIndex={-1}
          className="relative flex max-h-[88svh] w-full max-w-lg flex-col rounded-t-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl outline-none lg:max-h-[86svh] lg:rounded-3xl"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="시공 상담 닫기"
            className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-[#f5efe6] hover:bg-[#ebdcd0] text-[#5a483c] flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>

          <div className="flex-1 overflow-y-auto">
            <div className="mb-6 pr-12">
              <span className="text-[10px] font-mono text-[#b8613d] uppercase tracking-widest block mb-1">
                STUDIO CONSULTATION INQUIRY
              </span>
              <h3 id="arche-trial-title" className="text-xl lg:text-2xl font-bold text-[#2d221b] mb-2">
                필라테스 & 웰니스 스튜디오 시공 상담
              </h3>
              <p className="text-xs text-[#6e5d50] font-light leading-relaxed">
                필라테스, 요가, 에스테틱 스파 공간의 아키텍처와 시공 상담을 신청하실 수 있습니다.
              </p>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="arche-trial-name"
                  className="block text-xs font-mono text-[#5a483c] mb-1.5"
                >
                  성함 / 원장님 성함
                </label>
                <input
                  id="arche-trial-name"
                  type="text"
                  placeholder="예: 이서연 원장"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full min-h-11 px-4 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#d27952] text-[#2d221b] text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="arche-trial-phone"
                  className="block text-xs font-mono text-[#5a483c] mb-1.5"
                >
                  연락처
                </label>
                <input
                  id="arche-trial-phone"
                  type="tel"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full min-h-11 px-4 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#d27952] text-[#2d221b] text-xs outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="arche-trial-type"
                    className="block text-xs font-mono text-[#5a483c] mb-1.5"
                  >
                    스튜디오 종류
                  </label>
                  <select
                    id="arche-trial-type"
                    value={formData.studioType}
                    onChange={(e) => setFormData({ ...formData, studioType: e.target.value })}
                    className="w-full min-h-11 px-3 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#d27952] text-[#2d221b] text-xs outline-none transition-colors"
                  >
                    {STUDIO_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="arche-trial-area"
                    className="block text-xs font-mono text-[#5a483c] mb-1.5"
                  >
                    예상 실평수
                  </label>
                  <select
                    id="arche-trial-area"
                    value={formData.areaSize}
                    onChange={(e) => setFormData({ ...formData, areaSize: e.target.value })}
                    className="w-full min-h-11 px-3 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#d27952] text-[#2d221b] text-xs outline-none transition-colors"
                  >
                    {AREA_SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-[10px] text-center text-[#9c8b7d] pt-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
              </p>

              <button
                type="submit"
                className="w-full min-h-11 py-3.5 rounded-xl bg-[#d27952] hover:bg-[#b8613d] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
              >
                시공 상담 신청하기
              </button>
            </form>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-4 shrink-0 w-full min-h-11 py-2.5 rounded-xl bg-[#f5efe6] hover:bg-[#ebdcd0] text-[#5a483c] text-xs font-medium transition-all cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="arche-wellness"
        industry="interior"
        featureName="필라테스 & 웰니스 스튜디오 시공 상담"
      />
    </>
  );
};
