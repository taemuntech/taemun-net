'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    program: '1:1 프라이빗 리포머 레슨',
    branch: '한남 본점',
    message: '',
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#3d322a]">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#f5efe6] hover:bg-[#ebdcd0] text-[#5a483c] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-mono text-[#b8613d] uppercase tracking-widest block mb-1">
            STUDIO CONSULTATION INQUIRY
          </span>
          <h3 className="text-xl lg:text-2xl font-bold text-[#2d221b] mb-2">
            필라테스 & 웰니스 스튜디오 시공 상담
          </h3>
          <p className="text-xs text-[#6e5d50] font-light leading-relaxed">
            필라테스, 요가, 에스테틱 스파 공간의 아키텍처와 시공 상담을 신청하실 수 있습니다.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-mono text-[#5a483c] mb-1.5">
              성함 / 원장님 성함
            </label>
            <input
              type="text"
              placeholder="예: 이서연 원장"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#d27952] text-[#2d221b] text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#5a483c] mb-1.5">연락처</label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#d27952] text-[#2d221b] text-xs outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-[#5a483c] mb-1.5">스튜디오 종류</label>
              <select
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#d27952] text-[#2d221b] text-xs outline-none transition-colors"
              >
                <option>1:1 프라이빗 필라테스</option>
                <option>그룹 기구 필라테스</option>
                <option>명상 & 요가 라운지</option>
                <option>에스테틱 & 호텔 스파</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#5a483c] mb-1.5">예상 실평수</label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#d27952] text-[#2d221b] text-xs outline-none transition-colors"
              >
                <option>30평 이하 (1인샵)</option>
                <option>40~60평 (부티크)</option>
                <option>70~100평 (대형)</option>
                <option>사옥 전체 (복합)</option>
              </select>
            </div>
          </div>

          <p className="text-[10px] text-center text-[#9c8b7d] pt-2">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#d27952] hover:bg-[#b8613d] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
          >
            시공 상담 신청하기
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#f5efe6] hover:bg-[#ebdcd0] text-[#5a483c] text-xs font-medium transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="arche-wellness"
        industry="interior"
        featureName="필라테스 & 웰니스 스튜디오 시공 상담"
      />
    </div>
  );
};
