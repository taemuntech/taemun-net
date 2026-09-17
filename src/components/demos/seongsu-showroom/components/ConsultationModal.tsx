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
  const [spaceType, setSpaceType] = useState('플래그십 쇼룸 / 팝업');
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#15161a] border border-white/15 rounded-sm max-w-lg w-full p-6 lg:p-8 text-white space-y-6 shadow-2xl relative">
            <button
              onClick={handleCloseAll}
              className="absolute top-6 right-6 text-stone-400 hover:text-white text-lg"
              aria-label="닫기"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                  COMMERCIAL INQUIRY
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  프로젝트 1:1 공간 컨설팅 신청
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  성수 플래그십 쇼룸 방문 예약 및 현장 실측을 요청하실 수 있습니다.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-mono text-stone-300 mb-1">
                    담당자 성함 / 브랜드명
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 홍길동 (브랜드명)"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-stone-900 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
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
                    className="w-full px-3.5 py-2.5 rounded-sm bg-stone-900 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 mb-1">
                    희망 공간 유형
                  </label>
                  <select
                    value={spaceType}
                    onChange={(e) => setSpaceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-stone-900 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                  >
                    <option value="플래그십 쇼룸 / 팝업">플래그십 쇼룸 / 팝업 스토어</option>
                    <option value="F&B 카페 및 파인다이닝">F&B 대형 카페 및 레스토랑</option>
                    <option value="VIP 프라이빗 라운지">VIP 프라이빗 웰니스 라운지</option>
                    <option value="부티크 오피스 & 사옥">부티크 오피스 & 크리에이티브 사옥</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 mb-1">
                    공간 기획 내용 및 사전 견적 정보
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="면적, 희망 오픈 일정, 선호하시는 스타일을 자유롭게 적어주세요."
                    className="w-full px-3.5 py-2.5 rounded-sm bg-stone-900 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[11px] text-stone-400 mb-2 font-light">
                  샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
                </p>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-widest uppercase transition-all shadow-md shadow-amber-500/20"
                >
                  1:1 상담 및 방문 예약 신청하기
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
        slug="seongsu-showroom"
        industry="interior"
        featureName="1:1 공간 상담 신청"
      />
    </>
  );
};
