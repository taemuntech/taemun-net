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
    institutionType: '프리미엄 영어 유치원',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#3b2e1e]">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#fcf9f2] hover:bg-[#ebdcd0] text-[#6e5840] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-mono text-[#c98330] uppercase tracking-widest block mb-1">
            KIDS ATELIER CONSULTATION
          </span>
          <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#3b2e1e] mb-2">
            키즈 공간 & 에듀 라운지 시공 상담
          </h3>
          <p className="text-xs text-[#6e5840] font-light leading-relaxed">
            프리미엄 영유아 교육기관, 미술·음악 창의 아틀리에, 키즈 복합문화 라운지의 친환경 시공 상담을 신청하실 수 있습니다.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-mono text-[#6e5840] mb-1.5">
              성함 / 대표자명
            </label>
            <input
              type="text"
              placeholder="예: 이라온 원장"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#fcf9f2] border border-[#ebdcd0] focus:border-[#e39c44] text-[#3b2e1e] text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#6e5840] mb-1.5">연락처</label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#fcf9f2] border border-[#ebdcd0] focus:border-[#e39c44] text-[#3b2e1e] text-xs outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-[#6e5840] mb-1.5">기관 유형</label>
              <select
                value={formData.institutionType}
                onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-[#fcf9f2] border border-[#ebdcd0] focus:border-[#e39c44] text-[#3b2e1e] text-xs outline-none transition-colors"
              >
                <option>프리미엄 영어 유치원</option>
                <option>창의 미술 & 아트 아틀리에</option>
                <option>어린이 복합 놀이 라운지</option>
                <option>키즈 에듀테크 체험관</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#6e5840] mb-1.5">예상 실평수</label>
              <select
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-[#fcf9f2] border border-[#ebdcd0] focus:border-[#e39c44] text-[#3b2e1e] text-xs outline-none transition-colors"
              >
                <option>40평 이하 (교습소)</option>
                <option>50~80평 (아카데미)</option>
                <option>80~150평 (대형)</option>
                <option>사옥 전체 (복합 라운지)</option>
              </select>
            </div>
          </div>

          <p className="text-[10px] text-center text-[#8c7456] pt-2">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#e39c44] hover:bg-[#c98330] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
          >
            시공 상담 신청하기
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-[#fcf9f2] hover:bg-[#ebdcd0] text-[#6e5840] text-xs font-medium transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="raon-kids"
        industry="interior"
        featureName="키즈 공간 & 에듀 라운지 시공 상담"
      />
    </div>
  );
};
