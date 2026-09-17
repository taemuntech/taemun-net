'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export function ConsultationModal({ isOpen, onClose, defaultCourse }: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('고3 / 수험생');
  const [targetMajor, setTargetMajor] = useState('의예과 / 치의예과 (예시)');
  const [course, setCourse] = useState(defaultCourse || '최상위 의예과 MMI 심층면접 파이널');
  const [memo, setMemo] = useState('');
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!isOpen) return null;

  if (isNoticeOpen) {
    return (
      <SampleNotice
        open
        onClose={() => {
          setIsNoticeOpen(false);
          onClose();
        }}
        slug="mmi-essay"
        industry="corporate"
        featureName="1:1 논술 진단 & MMI 모의면접 신청"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#141822] border border-[#262E40] rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#1C2332] border border-[#262E40] text-slate-400 hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        <div>
          <div className="mb-6">
            <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
              DIAGNOSTIC CRITIQUE ADMISSION
            </span>
            <h3 className="text-xl lg:text-2xl font-serif font-bold text-white">
              1:1 서면 첨삭 &amp; MMI 모의면접 신청
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              목표 대학별 채점 기준에 맞춘 답안 정밀 진단과 면접 태도 클리닉을 예약하십시오.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                수험생 성함 <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 강하늘"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0D1017] border border-[#262E40] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                학부모 연락처 <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0D1017] border border-[#262E40] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  수험생 학년
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0D1017] border border-[#262E40] text-sm text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="고3 / 수험생">고3 / 수험생</option>
                  <option value="N수 / 재수">N수 / 재수</option>
                  <option value="고2 (조기대비)">고2 (조기대비)</option>
                  <option value="고1">고1</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  목표 지망 계열
                </label>
                <select
                  value={targetMajor}
                  onChange={(e) => setTargetMajor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0D1017] border border-[#262E40] text-sm text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="의예과 / 치의예과 (예시)">의예과 / 치의예과 (예시)</option>
                  <option value="약학과 / 수의예과 (예시)">약학과 / 수의예과 (예시)</option>
                  <option value="인문·사회 상위권 논술">인문·사회 상위권 논술</option>
                  <option value="자연계열 수리논술">자연계열 수리논술</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                희망 커리큘럼
              </label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0D1017] border border-[#262E40] text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                현재 고민 및 지망 대학 (선택)
              </label>
              <textarea
                rows={3}
                placeholder="예: MMI 면접 시 당황하면 말이 빨라지는 문제, 인문논술 분량 조절 애로 등"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0D1017] border border-[#262E40] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 resize-none"
              />
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-slate-400 text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg shadow-rose-600/20 cursor-pointer"
              >
                1:1 진단 상담 신청서 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
