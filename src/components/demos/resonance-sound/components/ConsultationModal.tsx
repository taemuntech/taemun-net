'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    roomType: '프라이빗 하이파이 청음실',
    area: '20~35평형',
    message: '',
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#2e2319]">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#faf6f0] hover:bg-[#ebdcd0] text-[#6b523e] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-mono text-[#8c6544] uppercase tracking-widest block mb-1">
            ACOUSTIC STUDIO CONSULTATION
          </span>
          <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#2e2319] mb-2">
            청음실 & 음향 스튜디오 시공 상담
          </h3>
          <p className="text-xs text-[#6b523e] font-light leading-relaxed">
            프라이빗 하이파이 리스닝 룸, 바이닐 카페 라운지, 홈 시네마의 방음 차음 및 룸 어쿠스틱 시공 상담을 신청하실 수 있습니다.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-mono text-[#6b523e] mb-1.5">
              성함 / 대표자명
            </label>
            <input
              type="text"
              placeholder="예: 최공명 대표"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] focus:border-[#8c6544] text-[#2e2319] text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#6b523e] mb-1.5">연락처</label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] focus:border-[#8c6544] text-[#2e2319] text-xs outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-[#6b523e] mb-1.5">공간 유형</label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] focus:border-[#8c6544] text-[#2e2319] text-xs outline-none transition-colors"
              >
                <option>프라이빗 하이파이 청음실</option>
                <option>상업 바이닐 레코드 라운지</option>
                <option>홈 시네마 & 멀티 리스닝 룸</option>
                <option>전문 레코딩 마스터링 스튜디오</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#6b523e] mb-1.5">예상 실평수</label>
              <select
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] focus:border-[#8c6544] text-[#2e2319] text-xs outline-none transition-colors"
              >
                <option>15평 이하 (전용 룸)</option>
                <option>20~35평형 (표준 스위트)</option>
                <option>40~70평 (복합 라운지)</option>
                <option>80평 이상 대형 홀</option>
              </select>
            </div>
          </div>

          <p className="text-[10px] text-center text-[#856b54] pt-2">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#5c422c] hover:bg-[#473220] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
          >
            시공 상담 신청하기
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-[#faf6f0] hover:bg-[#ebdcd0] text-[#6b523e] text-xs font-medium transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="resonance-sound"
        industry="interior"
        featureName="청음실 & 음향 스튜디오 시공 상담"
      />
    </div>
  );
};
