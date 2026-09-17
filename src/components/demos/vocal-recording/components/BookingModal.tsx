'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export function BookingModal({ isOpen, onClose, defaultCourse }: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(defaultCourse || 'K-POP 기획사 오디션 & 비주얼 레코딩반');
  const [part, setPart] = useState('보컬 (Vocal)');
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
        slug="vocal-recording"
        industry="corporate"
        featureName="1:1 보컬 진단 및 레코딩 예약"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#151922] border border-[#2B3444] rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#1F2533] border border-[#2B3444] text-zinc-400 hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        <div>
          <div className="mb-6">
            <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider block mb-1">
              PRO RECORDING DIAGNOSTIC
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-white">
              1:1 보컬 진단 &amp; 마이크 테스트 신청
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              전문 보컬 부스에서 진행되는 실시간 피치 분석 및 음색 맞춤 레코딩 진단을 예약하십시오.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                신청자 성함 <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 이민호"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0C0E14] border border-[#262F3E] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                연락처 <span className="text-pink-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0C0E14] border border-[#262F3E] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  희망 커리큘럼
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0C0E14] border border-[#262F3E] text-sm text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="K-POP 기획사 오디션 & 비주얼 레코딩반">K-POP 기획사 오디션반</option>
                  <option value="명문 실용음악과 수시·정시 입시 마스터반">실용음악 입시 마스터반</option>
                  <option value="싱어송라이터 자작곡 음원 발매 프로덕션반">싱어송라이터 앨범반</option>
                  <option value="1:1 맞춤 보컬 발성 교정 클리닉">1:1 발성 교정 클리닉</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  지원 파트
                </label>
                <select
                  value={part}
                  onChange={(e) => setPart(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0C0E14] border border-[#262F3E] text-sm text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="보컬 (Vocal)">보컬 (Vocal)</option>
                  <option value="랩 & 보컬 (Rap/Vocal)">랩 &amp; 보컬 (Rap/Vocal)</option>
                  <option value="싱어송라이터 (피아노/기타)">싱어송라이터 (악기)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                현재 고민 및 연습곡 (선택)
              </label>
              <textarea
                rows={3}
                placeholder="예: 고음에서의 목 긁힘 현상, 오디션 준비 지정곡 음역대 상담 등"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0C0E14] border border-[#262F3E] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 resize-none"
              />
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-zinc-400 text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg shadow-pink-500/20 cursor-pointer"
              >
                1:1 보컬 진단 신청서 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
