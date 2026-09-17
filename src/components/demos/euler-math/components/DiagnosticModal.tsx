'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export function DiagnosticModal({ isOpen, onClose, defaultCourse }: DiagnosticModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('초등 5학년');
  const [course, setCourse] = useState(defaultCourse || 'KMO 올림피아드 1차·2차 입상 대비반');
  const [mathBackground, setMathBackground] = useState('');
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
        slug="euler-math"
        industry="corporate"
        featureName="1:1 영재성 정밀 진단평가 신청"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#111724] border border-[#232F46] rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#182132] border border-[#232F46] text-slate-400 hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        <div>
          <div className="mb-6">
            <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              GIFTED MATHEMATICAL DIAGNOSIS
            </span>
            <h3 className="text-xl lg:text-2xl font-mono font-bold text-white">
              1:1 영재성 정밀 진단평가 신청
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              KMO 4대 영역(정수·기하·대수·조합) 심층 역량 진단 및 구술 면접을 예약하십시오.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                학생 성함 <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 최도윤"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D14] border border-[#232F46] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                학부모 연락처 <span className="text-cyan-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D14] border border-[#232F46] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  현재 학년
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D14] border border-[#232F46] text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="초등 3~4학년">초등 3~4학년</option>
                  <option value="초등 5학년">초등 5학년</option>
                  <option value="초등 6학년">초등 6학년</option>
                  <option value="중학교 1학년">중학교 1학년</option>
                  <option value="중학교 2학년">중학교 2학년</option>
                  <option value="중학교 3학년">중학교 3학년</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  희망 프로그램
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D14] border border-[#232F46] text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="KMO 올림피아드 1차·2차 입상 대비반">KMO 입상 대비반</option>
                  <option value="영재학교·과학고 3단계 심층 구술면접반">영재교 구술면접반</option>
                  <option value="초등 심화사고력 & 수학적 모델링 Lab">초등 사고력 Lab</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                선행 진도 및 올림피아드 응시 이력 (선택)
              </label>
              <textarea
                rows={3}
                placeholder="예: 중등 기하 A급 수학 완료, KMO 1차 장려상 수상 이력 등"
                value={mathBackground}
                onChange={(e) => setMathBackground(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D14] border border-[#232F46] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-slate-400 text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                1:1 영재성 진단평가 신청서 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
