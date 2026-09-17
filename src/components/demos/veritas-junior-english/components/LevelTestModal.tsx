'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface LevelTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export function LevelTestModal({ isOpen, onClose, defaultCourse }: LevelTestModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ageGrade, setAgeGrade] = useState('초등 2학년');
  const [course, setCourse] = useState(defaultCourse || 'Junior Scholar (챕터북 리딩 & 스피치반)');
  const [englishExp, setEnglishExp] = useState('영유 2년 졸업 후 일반초 진학');
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
        slug="veritas-junior-english"
        industry="corporate"
        featureName="1:1 원어민 레벨테스트 신청"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 text-slate-800 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        <div>
          <div className="mb-6">
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
              DIAGNOSTIC ADMISSION TEST
            </span>
            <h3 className="text-xl lg:text-2xl font-serif font-bold text-[#0F2942]">
              1:1 원어민 인터뷰 &amp; 렉사일 진단 예약
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              원어민과의 20분 1:1 구두 인터뷰 및 컴퓨터 렉사일(Lexile) 독해 평가를 신청하십시오.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                학생 성함 <span className="text-blue-700">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 이서윤"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                학부모 연락처 <span className="text-blue-700">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-700"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  연령 및 학년
                </label>
                <select
                  value={ageGrade}
                  onChange={(e) => setAgeGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-700"
                >
                  <option value="7세 (예비초)">7세 (예비초)</option>
                  <option value="초등 1학년">초등 1학년</option>
                  <option value="초등 2학년">초등 2학년</option>
                  <option value="초등 3학년">초등 3학년</option>
                  <option value="초등 4학년">초등 4학년</option>
                  <option value="초등 5학년 이상">초등 5학년 이상</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  영어 학습 이력
                </label>
                <select
                  value={englishExp}
                  onChange={(e) => setEnglishExp(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-700"
                >
                  <option value="영유 2년 이상">영유 2년 이상</option>
                  <option value="영유 1년 이하">영유 1년 이하</option>
                  <option value="일반유치원 + 파닉스">일반유치원 + 파닉스</option>
                  <option value="해외 거주 1년 이상">해외 거주 1년 이상</option>
                  <option value="초등 어학원 1년 이상">초등 어학원 1년 이상</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                희망 커리큘럼
              </label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-slate-500 text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0F2942] hover:bg-blue-900 text-white font-bold text-sm shadow-md active:scale-95 transition-all min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                1:1 레벨테스트 신청서 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
