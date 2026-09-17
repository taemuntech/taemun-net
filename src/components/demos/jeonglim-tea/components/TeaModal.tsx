'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface TeaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeaModal: React.FC<TeaModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    scale: '전통 한옥 복원 & 리모델링',
    location: '서울 종로·은평 등 수도권',
    message: '',
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-[#f4ede2]">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#1c1714] border border-[#382f29] p-6 lg:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#261f1a] hover:bg-[#382f29] text-[#a89888] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-mono text-[#d8b896] uppercase tracking-widest block mb-1">
            HANOK ATELIER INQUIRY
          </span>
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
            한옥 다도 문화 공간 시공 상담
          </h3>
          <p className="text-xs text-[#a89888] font-light leading-relaxed">
            전통 한옥 신축 및 고택 리모델링, 다도 문화 복합 공간의 기획과 시공 상담을 신청하실 수 있습니다.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-mono text-[#c4b5a5] mb-1.5">
              성함 / 건축주 성함
            </label>
            <input
              type="text"
              placeholder="예: 박정림 대표"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#14100e] border border-[#382f29] focus:border-[#8c715c] text-[#f4ede2] text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#c4b5a5] mb-1.5">연락처</label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#14100e] border border-[#382f29] focus:border-[#8c715c] text-[#f4ede2] text-xs outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-[#c4b5a5] mb-1.5">공사 유형</label>
              <select
                value={formData.scale}
                onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-[#14100e] border border-[#382f29] focus:border-[#8c715c] text-[#f4ede2] text-xs outline-none transition-colors"
              >
                <option>전통 고택 리모델링</option>
                <option>현대식 신축 한옥</option>
                <option>상업 티하우스 인테리어</option>
                <option>문화 갤러리 복합공간</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#c4b5a5] mb-1.5">예상 실평수</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-[#14100e] border border-[#382f29] focus:border-[#8c715c] text-[#f4ede2] text-xs outline-none transition-colors"
              >
                <option>30평 이하 (단독채)</option>
                <option>40~70평 (중형 한옥)</option>
                <option>80~150평 (대형 고택)</option>
                <option>200평 이상 (마을/단지)</option>
              </select>
            </div>
          </div>

          <p className="text-[10px] text-center text-[#8c7868] pt-2">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#6b5545] hover:bg-[#856b57] text-[#f4ede2] font-bold text-xs tracking-wider uppercase transition-all active:scale-95 border border-[#8c715c] cursor-pointer"
          >
            시공 상담 신청하기
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#261f1a] hover:bg-[#382f29] text-[#a89888] text-xs font-medium transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="jeonglim-tea"
        industry="interior"
        featureName="한옥 다도 문화 공간 시공 상담"
      />
    </div>
  );
};
