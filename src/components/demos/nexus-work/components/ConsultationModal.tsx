'use client';

import React, { useState, useEffect, useId, useRef } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

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
  const [officeScale, setOfficeScale] = useState('중형 오피스 (50평 ~ 150평형)');
  const [message, setMessage] = useState('');
  const [noticeOpen, setNoticeOpen] = useState(false);

  // 열릴 때마다 다시 심는다. initialNote 만 보면 같은 회의실을 두 번째로 열었을 때
  // (문자열이 동일 → 이펙트 미실행) 닫으면서 비운 message 가 그대로 남아, 고른 회의실이 본문에 안 내려간다.
  useEffect(() => {
    if (isOpen) {
      setMessage(initialNote);
    }
  }, [isOpen, initialNote]);

  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Esc·배경 스크롤 잠금(원래 값 복원)·포커스 가둠·복귀 — 샘플 공용 훅.
  // SampleNotice 가 열려 있는 동안에는 이 모달이 포커스를 뺏지 않게 open 을 내린다.
  useSampleDialog({ open: isOpen && !noticeOpen, onClose, dialogRef });

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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleCloseAll();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="bg-[#14161f] border border-zinc-700 rounded-3xl max-w-lg w-full my-auto p-6 lg:p-8 text-zinc-100 space-y-6 shadow-2xl relative outline-none"
          >
            <button
              type="button"
              onClick={handleCloseAll}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="닫기"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="pr-14">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  ENTERPRISE WORKSPACE CONSULTING
                </span>
                <h3 id={titleId} className="text-xl font-bold text-white">
                  스마트 오피스 설계 및 시공 실측 신청
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-light leading-relaxed">
                  성수·강남 테크 기업 사옥 인테리어, 하이브리드 워크스페이스 공간 컨설팅을 신청하실 수 있습니다.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-300 mb-1">
                    담당자 성함 / 기업명
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 홍길동 (주식회사 가상테크)"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-300 mb-1">
                    연락처 (휴대전화)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-300 mb-1">
                    사옥 및 오피스 규모
                  </label>
                  <select
                    value={officeScale}
                    onChange={(e) => setOfficeScale(e.target.value)}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="소형 스타트업 (30평 ~ 50평형)">소형 스타트업 (30평 ~ 50평형)</option>
                    <option value="중형 오피스 (50평 ~ 150평형)">중형 오피스 (50평 ~ 150평형)</option>
                    <option value="대형 사옥 전체 리노베이션 (200평 이상)">대형 사옥 전체 리노베이션 (200평 이상)</option>
                    <option value="스마트 회의실 & 포커스 부스 부분 리뉴얼">스마트 회의실 & 포커스 부스 부분 리뉴얼</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-300 mb-1">
                    프로젝트 세부 내용 및 희망 일정
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="현재 근무 인원, 입주 예정일, 선호하시는 공간 콘셉트(소음 차음, 스마트 회의실 등)를 자유롭게 남겨주세요."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:border-cyan-400 focus:outline-none resize-none font-light"
                  />
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[11px] text-zinc-400 mb-2 font-light">
                  샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
                </p>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-zinc-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/20"
                >
                  1:1 현장 실측 및 견적 상담 신청하기
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
        slug="nexus-work"
        industry="interior"
        featureName="스마트 오피스 설계/시공 실측 상담"
      />
    </>
  );
};
