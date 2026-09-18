'use client';

// 샘플이라 실기 심사·청강 신청을 받지 않는다 — 가짜 접수 완료 화면 대신 공용 안내(SampleNotice)만 연다.
// Esc·배경 클릭·배경 스크롤 잠금·포커스 가둠은 샘플 공용 훅(use-sample-dialog)을 쓴다.
// 위에 안내가 떠 있으면 Esc 는 그 안내만 닫는다(두 모달이 한꺼번에 닫히지 않게).

import React, { useRef, useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
}

export function ReservationModal({ isOpen, onClose, defaultProgram }: ReservationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(defaultProgram || '마스터클래스 실기 진단 청강');
  const [hopeDate, setHopeDate] = useState('');
  const [memo, setMemo] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="1:1 실기 심사 및 청강 신청"
          tabIndex={-1}
          className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto bg-[#1a1715] border border-[#38322c] rounded-2xl p-6 lg:p-8 text-[#f5f0eb] shadow-2xl outline-none"
        >
          {/* Close Button */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#2a241e] border border-[#38322c] text-[#a89f95] hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px]"
            aria-label="닫기"
          >
            ✕
          </button>

          <div>
            <div className="mb-6 pr-12">
              <span className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider block mb-1">
                Audition &amp; Masterclass Admission
              </span>
              <h3 className="text-xl lg:text-2xl font-serif font-bold text-[#f5f0eb]">
                1:1 실기 심사 및 청강 신청
              </h3>
              <p className="text-xs text-[#a89f95] mt-1">
                스타인웨이 콘서트 살롱에서 교수진과의 1:1 맞춤형 진단 세션을 예약하십시오.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#c5a880] font-medium mb-1" htmlFor="chopin-name">
                  학생/신청자 성함 <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  id="chopin-name"
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-[#38322c] text-sm text-[#f5f0eb] placeholder-[#635c54] focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#c5a880] font-medium mb-1" htmlFor="chopin-phone">
                  연락처 <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  id="chopin-phone"
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-[#38322c] text-sm text-[#f5f0eb] placeholder-[#635c54] focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#c5a880] font-medium mb-1" htmlFor="chopin-program">
                  희망 프로그램 / 클래스
                </label>
                <input
                  id="chopin-program"
                  type="text"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-[#38322c] text-sm text-[#f5f0eb] focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#c5a880] font-medium mb-1" htmlFor="chopin-date">
                  희망 일정 (요일 및 시간대)
                </label>
                <input
                  id="chopin-date"
                  type="text"
                  placeholder="예: 평일 오후 4시 이후 또는 주말 오전"
                  value={hopeDate}
                  onChange={(e) => setHopeDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-[#38322c] text-sm text-[#f5f0eb] placeholder-[#635c54] focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#c5a880] font-medium mb-1" htmlFor="chopin-memo">
                  현재 연습곡 또는 문의 내용
                </label>
                <textarea
                  id="chopin-memo"
                  rows={3}
                  placeholder="현재 준비 중인 곡목(예: 쇼팽 에튀드, 베토벤 소나타 등)이나 목표 음대를 기재해 주십시오."
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-[#38322c] text-sm text-[#f5f0eb] placeholder-[#635c54] focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              <label
                htmlFor="chopin-privacy"
                className="flex items-start gap-3 min-h-[44px] py-2 cursor-pointer text-[11px] text-[#70685e] leading-relaxed"
              >
                <input
                  id="chopin-privacy"
                  type="checkbox"
                  required
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="mt-0.5 w-5 h-5 shrink-0 accent-[#d4af37]"
                />
                <span>
                  개인정보 수집·이용에 동의합니다. (성함·연락처 — 진단 상담 및 레슨 일정 조율 목적, 상담 종료 후 파기)
                </span>
              </label>

              <div className="pt-2">
                <p className="text-[11px] text-[#70685e] text-center mb-3">
                  샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
                </p>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89528] text-[#121110] font-semibold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg"
                >
                  상담 신청서 제출하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="chopin-piano"
        industry="corporate"
        featureName="1:1 실기 심사 및 청강 신청"
      />
    </>
  );
}
