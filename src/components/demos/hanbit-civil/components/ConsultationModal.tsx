'use client';

import React, { useState, useId } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const locationInputId = useId();
  const lengthInputId = useId();
  const typeSelectId = useId();
  const orgInputId = useId();
  const nameInputId = useId();
  const phoneInputId = useId();
  const notesTextareaId = useId();

  const [formData, setFormData] = useState({
    projectLocation: '',
    length: '계획 연장 약 5.0 km',
    infraType: '해상 / 산악 장대교량 턴키 시공',
    organization: '',
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

          {/* 헤더 */}
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
            CIVIL INFRASTRUCTURE CONSULTING
          </span>
          <h3 className="mt-1 font-mono text-xl font-bold text-white">
            인프라 사업 기술 협력 &amp; 턴키 견적 의뢰
          </h3>
          <p className="mt-1 text-xs text-neutral-400">
            공공 및 민간 인프라 사업의 계획 노선을 남겨주시면 특수 교량·터널 공법 적합성 검토 및 개략 사업비 리포트를 무상으로 제공해 드립니다.
          </p>

          {/* 사전 고지문 (audit 검증 필수 규격) */}
          <div className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-300">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div>
              <label htmlFor={locationInputId} className="block font-mono text-neutral-300">
                사업 구간 / 계획 노선 <span className="text-amber-400">*</span>
              </label>
              <input
                id={locationInputId}
                type="text"
                required
                placeholder="예: 경기도 화성시 ~ 평택시 연결 국도 및 교량"
                value={formData.projectLocation}
                onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={lengthInputId} className="block font-mono text-neutral-300">구간 계획 연장</label>
                <input
                  id={lengthInputId}
                  type="text"
                  placeholder="예: 총 연장 4.5 km"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={typeSelectId} className="block font-mono text-neutral-300">인프라 주공종</label>
                <select
                  id={typeSelectId}
                  value={formData.infraType}
                  onChange={(e) => setFormData({ ...formData, infraType: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="해상 / 산악 장대교량 턴키 시공">해상 / 산악 장대교량 턴키 시공</option>
                  <option value="도심 대심도 철도 / 도로 터널">도심 대심도 철도 / 도로 터널</option>
                  <option value="고속도로 및 국도 입체 교차로">고속도로 및 국도 입체 교차로</option>
                  <option value="하천 횡단 특수 교량 가설">하천 횡단 특수 교량 가설</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={orgInputId} className="block font-mono text-neutral-300">기관 / 기업명</label>
                <input
                  id={orgInputId}
                  type="text"
                  placeholder="예: 한국인프라투자(주)"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={nameInputId} className="block font-mono text-neutral-300">
                  담당자 / 직함 <span className="text-amber-400">*</span>
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  placeholder="박기술 상무"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor={phoneInputId} className="block font-mono text-neutral-300">
                연락처 <span className="text-amber-400">*</span>
              </label>
              <input
                id={phoneInputId}
                type="tel"
                required
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={notesTextareaId} className="block font-mono text-neutral-300">사업 제휴 및 기술 검토 요청사항</label>
              <textarea
                id={notesTextareaId}
                rows={3}
                placeholder="민간투자사업(BTO/BTL) 컨소시엄 구성이나 특수 교량 가설 엔지니어링 협력 희망사항을 남겨주세요."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
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
                className="rounded bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-400 hover:to-orange-400"
              >
                기술 협력 신청하기
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
        slug="hanbit-civil"
        industry="civil"
        featureName="국가 인프라 개발 타당성 분석 및 토목 턴키 기술 협력 신청"
      />
    </>
  );
}
