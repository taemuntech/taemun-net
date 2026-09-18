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
  const scaleInputId = useId();
  const typeSelectId = useId();
  const orgInputId = useId();
  const nameInputId = useId();
  const phoneInputId = useId();
  const notesTextareaId = useId();

  const [formData, setFormData] = useState({
    projectLocation: '',
    scale: '안벽 연장 700m (2개 선석) / 수심 -20m',
    marineType: '24,000 TEU 스마트 안벽 부두 및 케이슨 턴키',
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md text-white">
        <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-sky-500/40 bg-slate-900 p-6 shadow-2xl lg:p-8">
          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:text-white"
            aria-label="닫기"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 헤더 */}
          <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-widest">
            OCEAN MARINE CIVIL ENGINEERING
          </span>
          <h3 className="mt-1 text-xl font-black text-white">
            스마트 항만 · 외해 케이슨 방파제 기술 자문 &amp; 견적 신청
          </h3>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            무역항 및 어항 인프라 개발 계획과 해역 수심 정보를 남겨주시면, 케이슨 규격 및 파랑 수치해석 타당성 검토 리포트를 제공해 드립니다.
          </p>

          {/* 사전 고지문 (audit 검증 필수 규격) */}
          <div className="mt-4 rounded-lg border border-sky-500/40 bg-sky-500/10 p-3 text-xs text-sky-300">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div>
              <label htmlFor={locationInputId} className="block font-semibold text-slate-300">
                시공 대상 해역 / 항만 명칭 <span className="text-sky-400">*</span>
              </label>
              <input
                id={locationInputId}
                type="text"
                required
                placeholder="예: 부산신항 서컨테이너 2-6단계 또는 동해항 외해"
                value={formData.projectLocation}
                onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label htmlFor={scaleInputId} className="block font-semibold text-slate-300">계획 연장 / 규모</label>
                <input
                  id={scaleInputId}
                  type="text"
                  placeholder="예: 안벽 1,000m 또는 방파제 1.5km"
                  value={formData.scale}
                  onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={typeSelectId} className="block font-semibold text-slate-300">해양 주공종</label>
                <select
                  id={typeSelectId}
                  value={formData.marineType}
                  onChange={(e) => setFormData({ ...formData, marineType: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="24,000 TEU 스마트 안벽 부두 및 케이슨 턴키">24,000 TEU 스마트 안벽 부두 및 케이슨 턴키</option>
                  <option value="외해 심해 12,000톤급 케이슨 방파제 축조">외해 심해 12,000톤급 케이슨 방파제 축조</option>
                  <option value="80톤급 초대형 TTP 소파블록 외곽 호안">80톤급 초대형 TTP 소파블록 외곽 호안</option>
                  <option value="대형 CSD 펌프 준설 및 신항만 배후단지 매립">대형 CSD 펌프 준설 및 신항만 배후단지 매립</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label htmlFor={orgInputId} className="block font-semibold text-slate-300">발주처 / 항만공사 / 기업명</label>
                <input
                  id={orgInputId}
                  type="text"
                  placeholder="예: 부산항만공사 / 현대건설 해양사업부"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={nameInputId} className="block font-semibold text-slate-300">
                  담당자 / 직함 <span className="text-sky-400">*</span>
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  placeholder="강해양 전무"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor={phoneInputId} className="block font-semibold text-slate-300">
                연락처 <span className="text-sky-400">*</span>
              </label>
              <input
                id={phoneInputId}
                type="tel"
                required
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={notesTextareaId} className="block font-semibold text-slate-300">해역 조건 및 기술 검토 요청사항</label>
              <textarea
                id={notesTextareaId}
                rows={3}
                placeholder="설계 파고, 조위차, 해저 지반 조건 등 현장 해역 특이사항이나 민관합동 항만투자 검토 요청사항을 적어주세요."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-black text-slate-950 shadow-md hover:bg-sky-400 transition-colors"
              >
                기술 자문 신청하기
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
        slug="ocean-marine"
        industry="civil"
        featureName="스마트 항만 및 외해 방파제 케이슨 해양 토목 턴키 기술 자문 신청"
      />
    </>
  );
}
