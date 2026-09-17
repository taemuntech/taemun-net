'use client';

import React, { useState } from 'react';
import { X, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    projectType: '도심 대심도 복선 철도 터널 (TBM)',
    estimatedDepth: '-50m 연암 구간',
    tunnelLength: '약 4.5km',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // audit-portfolio 규격: 폼 제출 시 실제 전송 대신 SampleNotice 모달 오픈
    setIsNoticeOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="relative w-full max-w-xl bg-[#161b22] border border-[#30363d] rounded-2xl p-6 lg:p-8 text-white font-mono shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#8b949e] hover:text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <span className="text-[10px] text-[#ff6b2b] uppercase tracking-widest font-bold block mb-1">
              TERRA-CORE TECHNICAL PROPOSAL
            </span>
            <h3 className="text-xl lg:text-2xl font-black text-white">
              대심도 지중 기술 제안 및 자문 의뢰
            </h3>
            {/* Standard Notice Required by Audit */}
            <p className="text-xs text-[#ff6b2b] font-sans mt-2 bg-[#ff6b2b]/10 p-2.5 rounded border border-[#ff6b2b]/30">
              샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8b949e] mb-1">발주처 / 소속 기관</label>
                <input
                  type="text"
                  required
                  placeholder="예: 서울도시철도건설본부 (예시)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded bg-[#0d1117] border border-[#30363d] text-white focus:outline-none focus:border-[#ff6b2b]"
                />
              </div>
              <div>
                <label className="block text-[#8b949e] mb-1">기술 담당자 연락처</label>
                <input
                  type="text"
                  required
                  placeholder="02-0000-0000 (예시)"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded bg-[#0d1117] border border-[#30363d] text-white focus:outline-none focus:border-[#ff6b2b]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8b949e] mb-1">토목 인프라 유형</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded bg-[#0d1117] border border-[#30363d] text-white focus:outline-none focus:border-[#ff6b2b]"
                >
                  <option value="도심 대심도 복선 철도 터널 (TBM)">도심 대심도 복선 철도 터널 (TBM)</option>
                  <option value="해저 침매터널 & 암반 연결 챔버">해저 침매터널 &amp; 암반 연결 챔버</option>
                  <option value="초고층 인접 지하 연속벽 및 언더피닝">초고층 인접 지하 연속벽 및 언더피닝</option>
                  <option value="대형 지하 복합 환승 인프라">대형 지하 복합 환승 인프라</option>
                </select>
              </div>
              <div>
                <label className="block text-[#8b949e] mb-1">예상 굴착 심도 / 연장</label>
                <input
                  type="text"
                  placeholder="지하 -60m / 연장 5.2km (예시)"
                  value={formData.estimatedDepth}
                  onChange={(e) => setFormData({ ...formData, estimatedDepth: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded bg-[#0d1117] border border-[#30363d] text-white focus:outline-none focus:border-[#ff6b2b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#8b949e] mb-1">지반 조건 및 기술 자문 요청 내용</label>
              <textarea
                rows={3}
                placeholder="지하수압 대책, 인접 구조물 침하 방지, TBM 굴진 속도 산정 등 문의 사항을 입력해 주세요."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded bg-[#0d1117] border border-[#30363d] text-white focus:outline-none focus:border-[#ff6b2b] font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded bg-[#ff6b2b] hover:bg-[#ff8246] text-black font-bold text-xs tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg hover:shadow-[#ff6b2b]/30 mt-4"
            >
              <Send className="w-4 h-4" />
              <span>대심도 기술 제안서 신청하기 (샘플)</span>
            </button>
          </form>
        </div>
      </div>

      {/* SampleNotice Modal */}
      <SampleNotice
        open={isNoticeOpen}
        onClose={() => {
          setIsNoticeOpen(false);
          onClose();
        }}
        slug="terra-core"
        industry="civil"
        featureName="대심도 지중 토목 기술 제안"
      />
    </>
  );
};
