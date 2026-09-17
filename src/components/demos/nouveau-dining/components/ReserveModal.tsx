'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    concept: '카페 & 브런치 베이커리',
    area: '50~80평형',
    message: '',
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-stone-900 border border-stone-800 p-6 lg:p-8 shadow-2xl text-stone-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
            F&B CONSULTATION INQUIRY
          </span>
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
            F&B 공간 인테리어 시공 상담
          </h3>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            카페, 레스토랑, 베이커리 등 외식업 공간의 브랜딩과 시공 상담을 신청하실 수 있습니다.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-mono text-stone-300 mb-1.5">
              성함 / 대표자명
            </label>
            <input
              type="text"
              placeholder="예: 김태문 대표"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-stone-300 mb-1.5">연락처</label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 text-xs outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-stone-300 mb-1.5">업종 분야</label>
              <select
                value={formData.concept}
                onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 text-xs outline-none transition-colors"
              >
                <option>카페 & 브런치</option>
                <option>파인다이닝 & 비스트로</option>
                <option>베이커리 & 디저트</option>
                <option>와인바 & 펍 라운지</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-300 mb-1.5">예상 실평수</label>
              <select
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 text-xs outline-none transition-colors"
              >
                <option>30평 이하</option>
                <option>30~50평</option>
                <option>50~80평</option>
                <option>100평 이상 대형</option>
              </select>
            </div>
          </div>

          <p className="text-[10px] text-center text-stone-500 pt-2">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
          >
            시공 상담 신청하기
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 text-xs font-medium transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="nouveau-dining"
        industry="interior"
        featureName="F&B 공간 인테리어 시공 상담"
      />
    </div>
  );
};
