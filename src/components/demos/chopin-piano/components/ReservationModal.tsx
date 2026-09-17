'use client';

import React, { useState } from 'react';

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
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#1a1715] border border-[#38322c] rounded-2xl p-6 lg:p-8 text-[#f5f0eb] shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#2a241e] border border-[#38322c] text-[#a89f95] hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px]"
          aria-label="닫기"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#2a241e] border border-[#d4af37] text-[#d4af37] text-3xl flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#f5f0eb] mb-2">
              신청이 정상 접수되었습니다
            </h3>
            <p className="text-xs text-[#a89f95] leading-relaxed mb-6">
              남겨주신 연락처로 전임 실기 디렉터가 1:1 일정 조율 및 세부 준비곡 안내 연락을 드리겠습니다. (본 화면은 가상 샘플 데모로 실제 전송되지 않습니다)
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89528] text-[#121110] font-semibold text-xs hover:brightness-110 min-h-[44px]"
            >
              확인
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider block mb-1">
                Audition & Masterclass Admission
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
                <label className="block text-xs text-[#c5a880] font-medium mb-1">
                  학생/신청자 성함 <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-[#38322c] text-sm text-[#f5f0eb] placeholder-[#635c54] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#c5a880] font-medium mb-1">
                  연락처 <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-[#38322c] text-sm text-[#f5f0eb] placeholder-[#635c54] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#c5a880] font-medium mb-1">
                  희망 프로그램 / 클래스
                </label>
                <input
                  type="text"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-[#38322c] text-sm text-[#f5f0eb] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#c5a880] font-medium mb-1">
                  희망 일정 (요일 및 시간대)
                </label>
                <input
                  type="text"
                  placeholder="예: 평일 오후 4시 이후 또는 주말 오전"
                  value={hopeDate}
                  onChange={(e) => setHopeDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-[#38322c] text-sm text-[#f5f0eb] placeholder-[#635c54] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#c5a880] font-medium mb-1">
                  현재 연습곡 또는 문의 내용
                </label>
                <textarea
                  rows={3}
                  placeholder="현재 준비 중인 곡목(예: 쇼팽 에튀드, 베토벤 소나타 등)이나 목표 음대를 기재해 주십시오."
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-[#38322c] text-sm text-[#f5f0eb] placeholder-[#635c54] focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89528] text-[#121110] font-semibold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg"
                >
                  상담 신청서 제출하기
                </button>
              </div>

              <p className="text-[11px] text-[#70685e] text-center">
                ※ 개인정보는 진단 상담 및 레슨 일정 조율 용도 외에 사용되지 않습니다.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
