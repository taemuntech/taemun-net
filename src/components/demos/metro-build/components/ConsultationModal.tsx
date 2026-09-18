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
  const siteAreaInputId = useId();
  const usageSelectId = useId();
  const targetDateInputId = useId();
  const companyInputId = useId();
  const nameInputId = useId();
  const phoneInputId = useId();
  const notesTextareaId = useId();

  const [formData, setFormData] = useState({
    siteAddress: '',
    siteArea: '대지 약 800평',
    usage: '기업 본사 단독 사옥 신축',
    targetDate: '2026년 상반기 착공 희망',
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md text-white">
        <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-blue-500/40 bg-slate-900 p-6 shadow-2xl lg:p-8">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:text-white"
            aria-label="닫기"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 모달 헤더 */}
          <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-widest">
            FREE TURNKEY FEASIBILITY
          </span>
          <h3 className="mt-1 font-mono text-xl font-bold text-white">
            신축 부지 법적 검토 &amp; 턴키 견적 신청
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            소유 부지의 지번을 남겨주시면 용적률·건폐율 등 건축 법규 분석과 개략 턴키 공사비 산출 리포트를 무상으로 제공해 드립니다.
          </p>

          {/* 사전 고지문 (audit 검증 필수 규격) */}
          <div className="mt-4 rounded-lg border border-blue-500/40 bg-blue-500/10 p-3 text-xs text-blue-300">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
          </div>

          {/* 입력 폼 */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div>
              <label htmlFor={addressInputId} className="block font-mono text-slate-300">
                사업 대상지 (도로명 주소 또는 지번) <span className="text-blue-400">*</span>
              </label>
              <input
                id={addressInputId}
                type="text"
                required
                placeholder="예: 경기도 성남시 분당구 삼평동 123-45"
                value={formData.siteAddress}
                onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 p-2.5 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={siteAreaInputId} className="block font-mono text-slate-300">대지 면적</label>
                <input
                  id={siteAreaInputId}
                  type="text"
                  placeholder="예: 대지 1,200평"
                  value={formData.siteArea}
                  onChange={(e) => setFormData({ ...formData, siteArea: e.target.value })}
                  className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 p-2.5 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={usageSelectId} className="block font-mono text-slate-300">건축 주용도</label>
                <select
                  id={usageSelectId}
                  value={formData.usage}
                  onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                  className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="기업 본사 단독 사옥 신축">기업 본사 단독 사옥 신축</option>
                  <option value="스마트 지식산업센터 신축">스마트 지식산업센터 신축</option>
                  <option value="바이오 / 첨단 R&D 연구소 신축">바이오 / 첨단 R&amp;D 연구소 신축</option>
                  <option value="복합 업무 및 상업시설">복합 업무 및 상업시설</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={companyInputId} className="block font-mono text-slate-300">발주 기업명</label>
                <input
                  id={companyInputId}
                  type="text"
                  placeholder="예: (주)넥사테크"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 p-2.5 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={targetDateInputId} className="block font-mono text-slate-300">희망 착공 시기</label>
                <input
                  id={targetDateInputId}
                  type="text"
                  placeholder="예: 2026년 하반기"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                  className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 p-2.5 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={nameInputId} className="block font-mono text-slate-300">
                  담당자 / 직함 <span className="text-blue-400">*</span>
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  placeholder="김건축 이사"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 p-2.5 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={phoneInputId} className="block font-mono text-slate-300">
                  연락처 <span className="text-blue-400">*</span>
                </label>
                <input
                  id={phoneInputId}
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 p-2.5 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor={notesTextareaId} className="block font-mono text-slate-300">추가 요청사항</label>
              <textarea
                id={notesTextareaId}
                rows={3}
                placeholder="특화 설계(드라이브인, 클린룸, 층고 등) 희망사항을 적어주시면 사전 도면 검토에 반영해 드립니다."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 p-2.5 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:from-blue-500 hover:to-indigo-500"
              >
                무료 턴키 검토 신청하기
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
        slug="metro-build"
        industry="construction"
        featureName="신축 부지 무료 법적 검토 및 종합건설 턴키 견적 신청"
      />
    </>
  );
}
