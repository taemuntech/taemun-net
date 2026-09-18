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
    scale: '시설용량 30만 ㎥/일 또는 연장 15km',
    infraType: '지하화 복합 하수처리장 및 생태공원',
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
        <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-cyan-500/40 bg-slate-900 p-6 shadow-2xl lg:p-8">
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
          <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
            AQUA INFRA ENGINEERING
          </span>
          <h3 className="mt-1 text-xl font-black text-white">
            수자원 · 환경 토목 턴키 기술 제휴 &amp; 견적 신청
          </h3>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            지자체 및 공공·민간 수자원 사업 계획을 남겨주시면 지하화 하수처리장·대심도 빗물터널·광역 상수도 기술 공법 타당성 검토 리포트를 제공해 드립니다.
          </p>

          {/* 사전 고지문 (audit 검증 필수 규격) */}
          <div className="mt-4 rounded-lg border border-cyan-500/40 bg-cyan-500/10 p-3 text-xs text-cyan-300">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div>
              <label htmlFor={locationInputId} className="block font-semibold text-slate-300">
                사업 대상지 / 계획 노선 <span className="text-cyan-400">*</span>
              </label>
              <input
                id={locationInputId}
                type="text"
                required
                placeholder="예: 경기도 성남시 탄천 유역 또는 강남역 일대"
                value={formData.projectLocation}
                onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label htmlFor={scaleInputId} className="block font-semibold text-slate-300">계획 규모 / 연장</label>
                <input
                  id={scaleInputId}
                  type="text"
                  placeholder="예: 시설용량 40만 ㎥/일"
                  value={formData.scale}
                  onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={typeSelectId} className="block font-semibold text-slate-300">수자원 주공종</label>
                <select
                  id={typeSelectId}
                  value={formData.infraType}
                  onChange={(e) => setFormData({ ...formData, infraType: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="지하화 복합 하수처리장 및 생태공원">지하화 복합 하수처리장 및 생태공원</option>
                  <option value="대심도 빗물 배수터널(방수로) 쉴드 TBM">대심도 빗물 배수터널(방수로) 쉴드 TBM</option>
                  <option value="광역 상수도 도수관로 대구경 비개착 추진">광역 상수도 도수관로 대구경 비개착 추진</option>
                  <option value="도심 생태하천 자연친화형 복원 & 어도">도심 생태하천 자연친화형 복원 &amp; 어도</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label htmlFor={orgInputId} className="block font-semibold text-slate-300">기관 / 기업명</label>
                <input
                  id={orgInputId}
                  type="text"
                  placeholder="예: 서울물재생시설공단 / 한라건설"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={nameInputId} className="block font-semibold text-slate-300">
                  담당자 / 직함 <span className="text-cyan-400">*</span>
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  placeholder="김수원 기술이사"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor={phoneInputId} className="block font-semibold text-slate-300">
                연락처 <span className="text-cyan-400">*</span>
              </label>
              <input
                id={phoneInputId}
                type="tel"
                required
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={notesTextareaId} className="block font-semibold text-slate-300">기술 검토 및 민자제안 요청사항</label>
              <textarea
                id={notesTextareaId}
                rows={3}
                placeholder="민자투자사업(BTO-a 등) 컨소시엄 구성이나 쉴드 TBM 공법 적합성 검토 요청사항을 편하게 남겨주세요."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
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
                className="rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-black text-slate-950 shadow-md hover:bg-cyan-400 transition-colors"
              >
                기술 제휴 신청하기
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
        slug="aqua-infra"
        industry="civil"
        featureName="수자원 인프라 개발 기본계획 및 토목 턴키 기술 제휴 신청"
      />
    </>
  );
}
