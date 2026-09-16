"use client";

import React, { useState } from 'react';
import { X, Shield, Send } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface PartnerProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerProposalModal: React.FC<PartnerProposalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: 'quartz',
    proposalTitle: '',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 제안용 시안 — 입력값을 어디에도 보내지 않고 공용 안내만 연다
    setNoticeOpen(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
      <div
        className="bg-white max-w-xl w-full rounded-xl overflow-hidden shadow-2xl border border-[#c3c6d6]/50 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#283044] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0052cc] flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#c6e7ff] tracking-wider uppercase block">
                SRM PARTNER PORTAL
              </span>
              <h3 className="text-lg font-bold">신규 협력 제안 접수</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
            <p className="text-xs text-gray-600 bg-[#f2f3ff] p-3 rounded-lg border border-[#dae2fd]">
              원익큐앤씨와 함께 성장할 반도체 원소재, 초정밀 가공, 화학약품, 분석 장비 분야의 우수 협력사를 모십니다.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  회사명 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="(주)소재테크"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  담당자 성명 및 직책 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="홍길동 팀장"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  이메일 *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  연락처 *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-xs outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                협력 제안 부문 *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#0052cc] text-xs outline-none bg-white"
              >
                <option value="quartz">쿼츠 소재 및 용접/가공</option>
                <option value="ceramics">파인 세라믹 분말 및 소결체</option>
                <option value="cleaning">정밀 세정 약품 및 코팅 타겟재</option>
                <option value="optics">광원 부품 및 광학 렌즈</option>
                <option value="other">기타 자동화 설비 및 소모품</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                제안 제목 *
              </label>
              <input
                type="text"
                required
                placeholder="고순도 세라믹 원소재 공급 및 가공 협력 제안의 건"
                value={formData.proposalTitle}
                onChange={(e) =>
                  setFormData({ ...formData, proposalTitle: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                제안 요약 및 주요 기술 사양 *
              </label>
              <textarea
                rows={3}
                required
                placeholder="보유 기술 특허, 생산 능력(CAPA), 품질 인증(ISO 등) 현황을 간략히 기술해 주세요."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-xs outline-none resize-none"
              />
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-3">
              <p className="text-xs font-semibold text-[#0052cc] text-center">
                제안용 시안 — 실제로 접수되지 않습니다
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#0052cc] hover:bg-[#003d9b] text-white rounded-md text-xs font-semibold shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  제안서 제출
                </button>
              </div>
            </div>
          </form>
      </div>
      </div>

      <SampleNotice
        open={noticeOpen}
        onClose={() => setNoticeOpen(false)}
        slug="wonik-qnc"
        industry="manufacturing"
        featureName="파트너 제안"
        kind="proposal"
      />
    </>
  );
};
