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
  const [gender, setGender] = useState('남학생');
  const [grade, setGrade] = useState('고등학교 3학년');
  const [targetUniv, setTargetUniv] = useState('S대 사범대 체육교육과 (예시)');
  const [course, setCourse] = useState(defaultCourse || 'S·Y·K 체육교육과 및 최상위권 엘리트 집중반');
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
        slug="athletic-prep"
        industry="corporate"
        featureName="1:1 무료 전자기측기 실기 측정 신청"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono">
      <div className="relative w-full max-w-lg bg-[#0C1322] border border-lime-500/40 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        <div>
          <div className="mb-6">
            <span className="text-[11px] font-bold text-lime-400 uppercase tracking-wider block mb-1">
              PHYSICAL TESTING &amp; DIAGNOSIS
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-white">
              1:1 전자기측기 무료 실기 측정 신청
            </h3>
            <p className="text-xs text-zinc-400 mt-1 font-sans">
              실제 실기장 규격 전자기측기로 4대 기초실기를 정밀 측정하고 개인별 목표 대학 지원선을 진단해 드립니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1 font-mono">
                학생 성함 <span className="text-lime-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 강태양"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1 font-mono">
                연락처 <span className="text-lime-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-lime-400"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 font-mono">
                  성별 구분
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-lime-400"
                >
                  <option value="남학생">남학생</option>
                  <option value="여학생">여학생</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 font-mono">
                  현재 학년
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-lime-400"
                >
                  <option value="고등학교 1학년">고등학교 1학년</option>
                  <option value="고등학교 2학년">고등학교 2학년</option>
                  <option value="고등학교 3학년">고등학교 3학년</option>
                  <option value="N수생 / 재수생">N수생 / 재수생</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 font-mono">
                  희망 목표 대학
                </label>
                <select
                  value={targetUniv}
                  onChange={(e) => setTargetUniv(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-lime-400"
                >
                  <option value="S대 사범대 체육교육과 (예시)">S대 체교 (예시)</option>
                  <option value="Y대 스포츠응용산업학과 (예시)">Y대 스포츠 (예시)</option>
                  <option value="K대 사범대 체육교육과 (예시)">K대 체교 (예시)</option>
                  <option value="중앙대 / 한양대 체육대학 (예시)">인서울 주요 체대 (예시)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 font-mono">
                  희망 훈련 과정
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-lime-400"
                >
                  <option value="S·Y·K 체육교육과 및 최상위권 엘리트 집중반">S·Y·K 엘리트반</option>
                  <option value="기초실기 만점 완성반 (제멀·배근력·왕복달리기)">기초실기 만점반</option>
                  <option value="고1·고2 체대입시 조기 기초 체력 & 전공 탐색반">고1·2 조기집중반</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-zinc-400 text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg shadow-lime-500/25 cursor-pointer font-mono"
              >
                1:1 무료 전자기측기 실기 측정 신청서 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
