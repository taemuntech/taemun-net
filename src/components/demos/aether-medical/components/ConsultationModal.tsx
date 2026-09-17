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
    clinicType: '피부과 & 안티에이징 센터',
    area: '60~100평형',
    message: '',
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#2d241e]">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#faf7f2] hover:bg-[#ebdcd0] text-[#6e5849] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-mono text-[#a38068] uppercase tracking-widest block mb-1">
            MEDICAL CLINIC CONSULTATION
          </span>
          <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#2d241e] mb-2">
            메디컬 클리닉 인테리어 시공 상담
          </h3>
          <p className="text-xs text-[#6e5849] font-light leading-relaxed">
            피부과, 성형외과, 하이엔드 치과, 안티에이징 센터의 차음 및 브랜딩 시공 상담을 신청하실 수 있습니다.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-mono text-[#6e5849] mb-1.5">
              성함 / 원장님 성함
            </label>
            <input
              type="text"
              placeholder="예: 김에테르 원장"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#a38068] text-[#2d241e] text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#6e5849] mb-1.5">연락처</label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#a38068] text-[#2d241e] text-xs outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-[#6e5849] mb-1.5">진료 과목</label>
              <select
                value={formData.clinicType}
                onChange={(e) => setFormData({ ...formData, clinicType: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#a38068] text-[#2d241e] text-xs outline-none transition-colors"
              >
                <option>피부과 & 안티에이징</option>
                <option>성형외과 & 웰니스</option>
                <option>프리미엄 치과 & 턱관절</option>
                <option>한방병원 & 에스테틱</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#6e5849] mb-1.5">예상 실평수</label>
              <select
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-[#faf7f2] border border-[#ebdcd0] focus:border-[#a38068] text-[#2d241e] text-xs outline-none transition-colors"
              >
                <option>40평 이하 (소형)</option>
                <option>40~70평 (중형)</option>
                <option>70~120평 (대형)</option>
                <option>150평 이상 (병원급)</option>
              </select>
            </div>
          </div>

          <p className="text-[10px] text-center text-[#9c8473] pt-2">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#524135] hover:bg-[#3d2f26] text-white font-medium text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
          >
            시공 상담 신청하기
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-[#faf7f2] hover:bg-[#ebdcd0] text-[#6e5849] text-xs font-medium transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="aether-medical"
        industry="interior"
        featureName="메디컬 클리닉 인테리어 시공 상담"
      />
    </div>
  );
};
