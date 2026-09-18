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
    targetDistrict: '성수·뚝섬 상권',
    siteAddress: '',
    siteArea: '',
    currentStatus: '기존 노후 다가구/단독주택 철거 예정',
    targetUsage: 'F&B 및 베이커리 카페 근생',
    clientName: '',
    phone: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 p-4 backdrop-blur-md text-white">
        <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-amber-500/40 bg-neutral-900 p-6 shadow-2xl lg:p-8">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-neutral-400 hover:text-white"
            aria-label="닫기"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 모달 헤더 */}
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
            FREE FEASIBILITY CONSULTING
          </span>
          <h3 className="mt-1 font-mono text-xl font-bold text-white">
            꼬마빌딩 신축 무료 사업성 검토 신청
          </h3>
          <p className="mt-1 text-xs text-neutral-400">
            보유하신 토지의 지번을 알려주시면 건축 법규(건폐율·용적률·일조사선) 및 예상 임대 수익률 리포트를 제공해 드립니다.
          </p>

          {/* 사전 고지문 (audit 검증 필수 규격) */}
          <div className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-300">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
          </div>

          {/* 신청 폼 */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-neutral-300">
                  대상 상권 지역 <span className="text-amber-400">*</span>
                </label>
                <select
                  value={formData.targetDistrict}
                  onChange={(e) => setFormData({ ...formData, targetDistrict: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="성수·뚝섬 상권">성동구 성수·뚝섬 상권</option>
                  <option value="한남·이태원 상권">용산구 한남·이태원 상권</option>
                  <option value="연남·홍대·합정">마포구 연남·홍대·합정</option>
                  <option value="강남·도산·신사">강남구 도산·신사·논현</option>
                  <option value="기타 서울/수도권">기타 서울 및 수도권 핵심지</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300">
                  대지 면적 (평수 또는 ㎡) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 65평 (215㎡)"
                  value={formData.siteArea}
                  onChange={(e) => setFormData({ ...formData, siteArea: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300">
                대지 주소 (지번 또는 도로명) <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 서울 성동구 성수동2가 000-00번지"
                value={formData.siteAddress}
                onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-neutral-300">
                  현재 부지 상태
                </label>
                <select
                  value={formData.currentStatus}
                  onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="기존 노후 다가구/단독주택 철거 예정">기존 노후 주택 철거 후 신축</option>
                  <option value="노후 상가건물 리모델링/증축">노후 상가 대수선 및 증축</option>
                  <option value="나대지 (즉시 착공 가능)">나대지 (즉시 착공 가능)</option>
                  <option value="부지 매입 전 검토 단계">부지 매입 전 타당성 검토</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300">
                  희망 임대 MD 용도
                </label>
                <select
                  value={formData.targetUsage}
                  onChange={(e) => setFormData({ ...formData, targetUsage: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="F&B 및 베이커리 카페 근생">F&B 및 베이커리 카페 특화</option>
                  <option value="패션·뷰티 팝업 및 플래그십">패션·뷰티 팝업 및 플래그십</option>
                  <option value="병의원 및 메디컬 올근생">병의원 및 메디컬 올근생</option>
                  <option value="크리에이티브 사옥 및 오피스">스타트업/에이전시 복합 사옥</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-neutral-300">
                  건축주 성함 <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 김상무"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300">
                  연락처 또는 이메일 <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 010-0000-0000 또는 client@example.com"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300">
                추가 문의 사항 및 요청
              </label>
              <textarea
                rows={2}
                placeholder="철거 시기, 예상 투자 예산, 일조사선 고민 등 궁금하신 점을 적어주세요."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="rounded border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-medium text-neutral-300 hover:bg-neutral-700"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-400 hover:to-amber-500"
              >
                무료 사업성 검토 신청하기
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
        slug="lumen-build"
        industry="construction"
        featureName="꼬마빌딩 신축 무료 사업성 검토 및 현장 상담 신청"
      />
    </>
  );
}
