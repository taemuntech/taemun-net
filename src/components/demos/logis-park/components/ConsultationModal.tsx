'use client';

import React, { useState, useId } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const addressInputId = useId();
  const areaInputId = useId();
  const typeSelectId = useId();
  const companyInputId = useId();
  const nameInputId = useId();
  const phoneInputId = useId();
  const notesTextareaId = useId();

  const [formData, setFormData] = useState({
    siteAddress: '',
    siteArea: '부지 약 15,000평',
    facilityType: '상온 + 저온 복합 메가 허브 (추천)',
    companyName: '',
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
        <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-cyan-500/40 bg-neutral-900 p-6 shadow-2xl lg:p-8">
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
          <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
            LOGISTICS FEASIBILITY CONSULTING
          </span>
          <h3 className="mt-1 font-mono text-xl font-bold text-white">
            물류부지 인허가 검토 &amp; 턴키 시공 견적 의뢰
          </h3>
          <p className="mt-1 text-xs text-neutral-400">
            개발 예정 부지의 지번을 알려주시면 교통영향평가, 진입 램프 가능 여부 및 개략 턴키 시공비 리포트를 무상으로 제공해 드립니다.
          </p>

          {/* 사전 고지문 (audit 검증 필수 규격) */}
          <div className="mt-4 rounded-lg border border-cyan-500/40 bg-cyan-500/10 p-3 text-xs text-cyan-300">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div>
              <label htmlFor={addressInputId} className="block font-mono text-neutral-300">
                사업 대상지 (도로명 주소 또는 지번) <span className="text-cyan-400">*</span>
              </label>
              <input
                id={addressInputId}
                type="text"
                required
                placeholder="예: 경기도 용인시 처인구 남사읍 123-45"
                value={formData.siteAddress}
                onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={areaInputId} className="block font-mono text-neutral-300">부지 면적 / 희망 연면적</label>
                <input
                  id={areaInputId}
                  type="text"
                  placeholder="예: 대지 1만평 / 연면적 2.5만평"
                  value={formData.siteArea}
                  onChange={(e) => setFormData({ ...formData, siteArea: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={typeSelectId} className="block font-mono text-neutral-300">희망 시설 유형</label>
                <select
                  id={typeSelectId}
                  value={formData.facilityType}
                  onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="상온 + 저온 복합 메가 허브 (추천)">상온 + 저온 복합 메가 허브 (추천)</option>
                  <option value="전자동화 초저온(-25℃) 냉동물류">전자동화 초저온(-25℃) 냉동물류</option>
                  <option value="상온 하이베이 풀필먼트 센터">상온 하이베이 풀필먼트 센터</option>
                  <option value="바이오 의약품 KGSP 전용 물류">바이오 의약품 KGSP 전용 물류</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={companyInputId} className="block font-mono text-neutral-300">발주 기업/시행사명</label>
                <input
                  id={companyInputId}
                  type="text"
                  placeholder="예: (주)로지스피아"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={nameInputId} className="block font-mono text-neutral-300">
                  담당자명 / 직함 <span className="text-cyan-400">*</span>
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  placeholder="홍길동 본부장"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor={phoneInputId} className="block font-mono text-neutral-300">
                연락처 <span className="text-cyan-400">*</span>
              </label>
              <input
                id={phoneInputId}
                type="tel"
                required
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={notesTextareaId} className="block font-mono text-neutral-300">문의 및 검토 요청사항</label>
              <textarea
                id={notesTextareaId}
                rows={3}
                placeholder="인허가 진행 단계나 전력 인입(냉동기용 MW) 조건 등 세부사항을 적어주시면 사전 기술검토에 큰 도움이 됩니다."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-medium text-neutral-300 hover:bg-neutral-700"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-xs font-bold text-neutral-950 shadow-md hover:from-cyan-400 hover:to-blue-500"
              >
                무료 턴키 기술검토 신청하기
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
        slug="logis-park"
        industry="construction"
        featureName="스마트 저온 물류센터 부지 타당성 분석 및 턴키 견적 신청"
      />
    </>
  );
}
