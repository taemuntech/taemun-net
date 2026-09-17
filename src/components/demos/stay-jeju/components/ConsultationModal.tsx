'use client';

import React, { useState, useEffect } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface ConsultationModalProps {
  isOpen: boolean;
  initialNote?: string;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  initialNote = '',
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [stayType, setStayType] = useState('독채 전체 대관 (프라이빗 휴식)');
  const [message, setMessage] = useState('');
  const [noticeOpen, setNoticeOpen] = useState(false);

  useEffect(() => {
    if (initialNote) {
      setMessage(initialNote);
    }
  }, [initialNote]);

  if (!isOpen && !noticeOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNoticeOpen(true);
  };

  const handleCloseAll = () => {
    setName('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#17191f] border border-stone-700 rounded-3xl max-w-lg w-full p-6 lg:p-8 text-stone-100 space-y-6 shadow-2xl relative">
            <button
              onClick={handleCloseAll}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="닫기"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-xs font-mono text-amber-500 uppercase tracking-wider block mb-1">
                  PRIVATE INQUIRY & STAY RESERVATION
                </span>
                <h3 className="font-serif text-xl font-medium text-stone-100">
                  소소재 제주 숙박 및 공간 컨설팅 신청
                </h3>
                <p className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                  하루 한 팀만을 위한 프라이빗 독채 스테이 예약 및 공간 건축 설계를 문의하실 수 있습니다.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-mono text-stone-300 mb-1">
                    예약자 / 고객 성함
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="성함을 입력해 주세요"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 mb-1">
                    연락처 (휴대전화)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 mb-1">
                    문의 목적
                  </label>
                  <select
                    value={stayType}
                    onChange={(e) => setStayType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:border-amber-500 focus:outline-none"
                  >
                    <option value="독채 전체 대관 (프라이빗 휴식)">독채 전체 대관 (프라이빗 휴식)</option>
                    <option value="브랜드 팝업 / 상업 화보 촬영">브랜드 팝업 / 화보 촬영 대관</option>
                    <option value="스테이 건축 & 인테리어 설계 상담">스테이 건축 & 공간 인테리어 설계 상담</option>
                    <option value="웰니스 다도 세션 예약">웰니스 다도 & 명상 세션</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 mb-1">
                    희망 일정 및 요청 사항
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="희망하시는 방문 날짜, 인원수, 혹은 공간 기획 관련 문의를 자유롭게 남겨주세요."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:border-amber-500 focus:outline-none resize-none font-light"
                  />
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[11px] text-stone-400 mb-2 font-light">
                  샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
                </p>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-900/30"
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
        featureName="독채 스테이 프라이빗 예약/공간 상담"
      />
    </>
  );
};
