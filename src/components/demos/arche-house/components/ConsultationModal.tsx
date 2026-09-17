'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [formData, setFormData] = useState({
    houseType: '도심형 단독주택',
    siteLocation: '',
    siteArea: '',
    targetArea: '',
    targetDate: '',
    clientName: '',
    phone: '',
    inquiry: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/75 p-4 backdrop-blur-sm">
        <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm border border-stone-200 bg-white p-6 shadow-2xl text-stone-900 lg:p-8">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-stone-500 hover:text-stone-900"
            aria-label="닫기"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 모달 헤더 */}
          <span className="font-serif text-xs font-semibold tracking-wider text-amber-800 uppercase">
            Architectural Consultation
          </span>
          <h3 className="mt-1 font-serif text-xl font-bold text-stone-900">
            1:1 건축 설계 및 대지 현장 답사 신청
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            새로운 집을 짓기 위한 첫걸음, 대지 현황과 가족의 희망 사항을 남겨주시면 대표 건축사가 직접 검토 후 상담해 드립니다.
          </p>

          {/* 사전 고지문 (audit-portfolio 검증 필수 규격) */}
          <div className="mt-4 rounded-sm border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
          </div>

          {/* 상담 신청 폼 */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-stone-700">
                희망 주거 유형 <span className="text-amber-600">*</span>
              </label>
              <select
                value={formData.houseType}
                onChange={(e) => setFormData({ ...formData, houseType: e.target.value })}
                className="mt-1.5 w-full rounded-sm border border-stone-300 bg-stone-50 px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:bg-white focus:outline-none"
              >
                <option value="도심형 단독주택">도심형 프라이빗 단독주택 (판교/서초/분당 등)</option>
                <option value="수변 및 산림 별서">수변 및 산림 휴양형 별서 (가평/양평/청평 등)</option>
                <option value="타운하우스 및 주거단지">단독주택 단지 및 듀플렉스 하우스</option>
                <option value="근린생활시설 복합주택">상가주택 및 근린생활시설 복합 주거</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-stone-700">
                  대지 소재지 <span className="text-amber-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 경기 성남시 분당구 운중동"
                  value={formData.siteLocation}
                  onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
                  className="mt-1.5 w-full rounded-sm border border-stone-300 bg-stone-50 px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700">
                  대지 면적 (평 또는 ㎡)
                </label>
                <input
                  type="text"
                  placeholder="예: 100평 (330㎡)"
                  value={formData.siteArea}
                  onChange={(e) => setFormData({ ...formData, siteArea: e.target.value })}
                  className="mt-1.5 w-full rounded-sm border border-stone-300 bg-stone-50 px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-stone-700">
                  희망 연면적
                </label>
                <input
                  type="text"
                  placeholder="예: 70평 내외"
                  value={formData.targetArea}
                  onChange={(e) => setFormData({ ...formData, targetArea: e.target.value })}
                  className="mt-1.5 w-full rounded-sm border border-stone-300 bg-stone-50 px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700">
                  희망 착공 시기
                </label>
                <input
                  type="text"
                  placeholder="예: 2026년 가을 착공 희망"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                  className="mt-1.5 w-full rounded-sm border border-stone-300 bg-stone-50 px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-stone-700">
                  건축주 성함 <span className="text-amber-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1.5 w-full rounded-sm border border-stone-300 bg-stone-50 px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700">
                  연락처 또는 이메일 <span className="text-amber-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 010-0000-0000 또는 client@example.com"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1.5 w-full rounded-sm border border-stone-300 bg-stone-50 px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700">
                남기실 말씀 및 주요 희망사항
              </label>
              <textarea
                rows={2}
                placeholder="중정 유무, 다락, 층고, 가족 구성원 등 희망하시는 공간적 특징을 적어주세요."
                value={formData.inquiry}
                onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                className="mt-1.5 w-full rounded-sm border border-stone-300 bg-stone-50 px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={onClose}
                className="rounded-sm border border-stone-300 bg-stone-100 px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-200"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-sm bg-stone-900 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-stone-800"
              >
                상담 신청 접수하기
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* SampleNotice 모달 연동 */}
      <SampleNotice
        open={isNoticeOpen}
        onClose={() => {
          setIsNoticeOpen(false);
          onClose();
        }}
        slug="arche-house"
        industry="construction"
        featureName="1:1 건축 설계 및 대지 답사 상담 신청"
      />
    </>
  );
}
