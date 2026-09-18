'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface TrialClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAgeGroup?: string;
}

export function TrialClassModal({ isOpen, onClose, defaultAgeGroup }: TrialClassModalProps) {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState(defaultAgeGroup || '6~7세 (취학 전)');
  const [parentPhone, setParentPhone] = useState('');
  const [hopeDay, setHopeDay] = useState('');
  const [notes, setNotes] = useState('');
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
        slug="atelier-kids"
        industry="corporate"
        featureName="1회 무료 원데이 감각 체험 수업 신청"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-[#E8E2D9] rounded-3xl p-6 lg:p-8 text-[#2D2A26] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[#7A7369] hover:text-[#2D2A26] flex items-center justify-center min-h-[44px] min-w-[44px]"
          aria-label="닫기"
        >
          ✕
        </button>

        <div>
          <div className="mb-6">
            <span className="text-[11px] font-bold text-[#E07A5F] uppercase tracking-wider block mb-1">
              One-day Sensory Workshop
            </span>
            <h3 className="text-xl lg:text-2xl font-serif font-bold text-[#2D2A26]">
              1회 무료 원데이 감각 체험 수업 신청
            </h3>
            <p className="text-xs text-[#7A7369] mt-1">
              아이가 스스로 색채와 질감을 느끼며 즐길 수 있는 4인 소수정예 원탁 클래스를 경험해 보세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#4A453E] mb-1">
                아이 이름 <span className="text-[#E07A5F]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 김민준 어린이"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-sm text-[#2D2A26] placeholder-[#A8A29E] focus:outline-none focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A453E] mb-1">
                아이 연령 단계 <span className="text-[#E07A5F]">*</span>
              </label>
              <select
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-sm text-[#2D2A26] focus:outline-none focus:border-[#E07A5F]"
              >
                <option value="4~5세 (유아)">4~5세 (유아 감각 탐색 꼴라주)</option>
                <option value="6~7세 (취학 전)">6~7세 (스토리텔링 & 입체 조형)</option>
                <option value="8~10세 (초등 저학년)">8~10세 (명화 탐구 & 복합 매체)</option>
                <option value="11~13세 (초등 고학년)">11~13세 (주니어 아티스트 포트폴리오)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A453E] mb-1">
                학부모님 연락처 <span className="text-[#E07A5F]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-sm text-[#2D2A26] placeholder-[#A8A29E] focus:outline-none focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A453E] mb-1">
                희망 요일 및 시간대
              </label>
              <input
                type="text"
                placeholder="예: 수요일 오후 3시 또는 토요일 오전"
                value={hopeDay}
                onChange={(e) => setHopeDay(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-sm text-[#2D2A26] placeholder-[#A8A29E] focus:outline-none focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A453E] mb-1">
                아이의 미술 성향 또는 특이사항
              </label>
              <textarea
                rows={3}
                placeholder="물감이나 찰흙 촉감에 민감한 편인지, 좋아하는 동물이나 관심 주제가 있는지 적어주시면 수업 준비에 큰 도움이 됩니다."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-sm text-[#2D2A26] placeholder-[#A8A29E] focus:outline-none focus:border-[#E07A5F] resize-none"
              />
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-[#7A7369] text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#E07A5F] text-white font-semibold text-sm hover:bg-[#c9684f] active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-md"
              >
                체험 수업 신청서 제출하기
              </button>
            </div>

            <p className="text-[11px] text-[#7A7369] text-center">
              ※ 신청하신 개인정보는 체험 수업 예약 및 아동 성향 상담 용도 외에 절대 이용되지 않습니다.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
