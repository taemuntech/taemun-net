'use client';

import React, { useState, useRef } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** 문의 목적 — 고른 값이 제출 뒤 안내에도 그대로 실린다(고른 게 결과를 안 바꾸면 가짜 선택이다) */
const INQUIRY_PURPOSES = [
  '독채 전체 대관 (프라이빗 휴식)',
  '브랜드 팝업 / 화보 촬영 대관',
  '스테이 건축 & 공간 인테리어 설계 상담',
  '웰니스 다도 & 명상 세션',
] as const;

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [stayType, setStayType] = useState<string>(INQUIRY_PURPOSES[0]);
  const [message, setMessage] = useState('');
  // 개인정보 수집 동의는 **반드시 꺼진 채로** 열린다.
  const [agreed, setAgreed] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  // 제출 시점의 선택을 얼려 둔다 — 안내 모달이 뜬 뒤 폼을 비워도 안내 문구는 고른 값을 유지해야 한다.
  const [submittedPurpose, setSubmittedPurpose] = useState<string>(INQUIRY_PURPOSES[0]);

  const handleCloseAll = React.useCallback(() => {
    setName('');
    setPhone('');
    setMessage('');
    setAgreed(false);
    onClose();
  }, [onClose]);

  const dialogRef = useRef<HTMLDivElement>(null);
  // Esc·배경 스크롤 잠금(원래 값 복원)·포커스 가둠·복귀 — 샘플 공용 훅.
  // SampleNotice 가 열려 있는 동안에는 이 모달이 포커스를 뺏지 않게 open 을 내린다.
  useSampleDialog({ open: isOpen && !noticeOpen, onClose: handleCloseAll, dialogRef });

  if (!isOpen && !noticeOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedPurpose(stayType);
    setNoticeOpen(true);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleCloseAll();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="stay-jeju-consultation-title"
            tabIndex={-1}
            className="bg-[#17191f] border border-stone-700 rounded-t-3xl lg:rounded-3xl max-w-lg w-full max-h-[90vh] lg:max-h-[88vh] overflow-y-auto overscroll-contain p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:p-8 text-stone-100 space-y-6 shadow-2xl relative outline-none"
          >
            <button
              type="button"
              onClick={handleCloseAll}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 w-11 h-11 rounded-full bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="닫기"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="pr-12">
                <span className="text-xs font-mono text-amber-500 uppercase tracking-wider block mb-1">
                  PRIVATE INQUIRY & STAY RESERVATION
                </span>
                <h3 id="stay-jeju-consultation-title" className="font-serif text-xl font-medium text-stone-100">
                  소소재 제주 숙박 및 공간 컨설팅 신청
                </h3>
                <p className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                  하루 한 팀만 받는 프라이빗 독채 스테이 예약 및 공간 건축 설계를 문의하실 수 있습니다.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label htmlFor="stay-jeju-name" className="block text-[11px] font-mono text-stone-300 mb-1">
                    예약자 / 고객 성함
                  </label>
                  <input
                    id="stay-jeju-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="성함을 입력해 주세요"
                    className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="stay-jeju-phone" className="block text-[11px] font-mono text-stone-300 mb-1">
                    연락처 (휴대전화)
                  </label>
                  <input
                    id="stay-jeju-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="stay-jeju-purpose" className="block text-[11px] font-mono text-stone-300 mb-1">
                    문의 목적
                  </label>
                  <select
                    id="stay-jeju-purpose"
                    value={stayType}
                    onChange={(e) => setStayType(e.target.value)}
                    className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:border-amber-500 focus:outline-none"
                  >
                    {INQUIRY_PURPOSES.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="stay-jeju-message" className="block text-[11px] font-mono text-stone-300 mb-1">
                    희망 일정 및 요청 사항
                  </label>
                  <textarea
                    id="stay-jeju-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="희망하시는 방문 날짜, 인원수, 혹은 공간 기획 관련 문의를 자유롭게 남겨주세요."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:border-amber-500 focus:outline-none resize-none font-light"
                  />
                </div>

                <label
                  htmlFor="stay-jeju-agree"
                  className="flex items-start gap-3 min-h-[44px] py-2 cursor-pointer text-[11px] text-stone-400 font-light leading-relaxed"
                >
                  <input
                    id="stay-jeju-agree"
                    type="checkbox"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-5 h-5 shrink-0 accent-amber-500"
                  />
                  <span>
                    예약 상담 회신을 위한 성함·연락처 수집에 동의합니다. (샘플 화면이라 실제로 수집·저장하지
                    않습니다)
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <p className="text-[11px] text-stone-400 mb-2 font-light">
                  샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
                </p>
                <button
                  type="submit"
                  className="w-full py-3.5 min-h-[44px] rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-900/30"
                >
                  상담 신청하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SampleNotice
        open={noticeOpen}
        onClose={() => {
          setNoticeOpen(false);
          handleCloseAll();
        }}
        slug="stay-jeju"
        industry="interior"
        featureName={`「${submittedPurpose}」 문의 접수 흐름을`}
      />
    </>
  );
};
