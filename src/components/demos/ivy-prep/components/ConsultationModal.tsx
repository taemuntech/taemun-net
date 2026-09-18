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
  const [grade, setGrade] = useState('10학년 (G10)');
  const [program, setProgram] = useState(defaultCourse || 'Ivy & Top 20 보딩스쿨 올인원 입시 컨설팅');
  const [targetUniv, setTargetUniv] = useState('아이비리그 (H-Univ, Y-Univ 등)');
  const [currentSat, setCurrentSat] = useState('');
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
        slug="ivy-prep"
        industry="corporate"
        featureName="1:1 프라이빗 입시 로드맵 진단 상담"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-serif">
      <div className="relative w-full max-w-lg bg-[#1A030A] border border-amber-500/40 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-rose-950 border border-rose-800 text-rose-300 hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        <div>
          <div className="mb-6">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
              CONFIDENTIAL CONSULTATION
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-white">
              1:1 프라이빗 입시 진단 신청
            </h3>
            <p className="text-xs text-rose-200/70 mt-1 font-sans">
              학생의 학업 성취도(GPA/SAT)와 과외활동(EC)을 종합 분석하여 최적의 지원 전략을 수립해 드립니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1 font-serif">
                학생 또는 학부모 성함 <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 박서준"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-rose-900/60 text-sm text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1 font-serif">
                학부모 연락처 <span className="text-amber-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-rose-900/60 text-sm text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-200 mb-1 font-serif">
                  현재 학년
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-rose-900/60 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="7~8학년 (Middle School)">7~8학년 (보딩스쿨 준비)</option>
                  <option value="9학년 (G9 Freshman)">9학년 (Freshman)</option>
                  <option value="10학년 (G10 Sophomore)">10학년 (Sophomore)</option>
                  <option value="11학년 (G11 Junior)">11학년 (Junior)</option>
                  <option value="12학년 (G12 Senior)">12학년 (Senior 출원반)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 mb-1 font-serif">
                  목표 대학 군
                </label>
                <select
                  value={targetUniv}
                  onChange={(e) => setTargetUniv(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-rose-900/60 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="아이비리그 (H-Univ, Y-Univ 등)">아이비리그 (HYPSM)</option>
                  <option value="미국 Top 20 명문 사립대">미국 Top 20 사립대</option>
                  <option value="미국 Top 10 보딩스쿨">미국 Top 10 보딩스쿨</option>
                  <option value="UC계열 및 주립대">UC 버클리 / UCLA 등</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1 font-serif">
                희망 프로그램
              </label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-rose-900/60 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Ivy & Top 20 보딩스쿨 올인원 입시 컨설팅">올인원 입시 컨설팅</option>
                <option value="Digital SAT 1550+ 단기 완성 프레스티지반">Digital SAT 완성반</option>
                <option value="AP 전과목 5점 완성 & 명문대 리서치 멘토링">AP 5점 & 리서치 멘토링</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1 font-serif">
                현재 공인 시험 점수 및 GPA (선택)
              </label>
              <input
                type="text"
                placeholder="예: GPA 3.95, PSAT 1420점, AP Calc 5점 등"
                value={currentSat}
                onChange={(e) => setCurrentSat(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-rose-900/60 text-xs text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-rose-300/60 text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-amber-50 font-bold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg shadow-rose-950/40 cursor-pointer font-serif border border-amber-400/30"
              >
                1:1 프라이빗 입시 상담 신청서 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
