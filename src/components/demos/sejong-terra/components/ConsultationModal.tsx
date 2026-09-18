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
  const areaInputId = useId();
  const typeSelectId = useId();
  const orgInputId = useId();
  const nameInputId = useId();
  const phoneInputId = useId();
  const notesTextareaId = useId();

  const [formData, setFormData] = useState({
    projectLocation: '',
    area: '계획 부지 약 50만평',
    terraType: '스마트 일반산업단지 및 국가산단 부지조성',
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-md text-white">
        <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-amber-500/40 bg-stone-900 p-6 shadow-2xl lg:p-8">
          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-stone-400 hover:text-white"
            aria-label="닫기"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 헤더 */}
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
            SEJONG TERRA CIVIL ENGINEERING
          </span>
          <h3 className="mt-1 text-xl font-black text-white">
            스마트 산단 부지조성 · 3D 토공 턴키 기술 자문 신청
          </h3>
          <p className="mt-1 text-xs text-stone-400 leading-relaxed">
            산업단지 개발구역 및 지구단위계획 정보를 남겨주시면, 드론 3D 지형 매핑 및 절·성토 최적 토량 배분 리포트를 무상으로 제공해 드립니다.
          </p>

          {/* 사전 고지문 (audit 검증 필수 규격) */}
          <div className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-300">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div>
              <label htmlFor={locationInputId} className="block font-semibold text-stone-300">
                사업 대상지 / 구역 위치 <span className="text-amber-400">*</span>
              </label>
              <input
                id={locationInputId}
                type="text"
                required
                placeholder="예: 충남 천안시 직산읍 일원 도시첨단산업단지"
                value={formData.projectLocation}
                onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 p-3 text-white placeholder-stone-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label htmlFor={areaInputId} className="block font-semibold text-stone-300">계획 부지 면적</label>
                <input
                  id={areaInputId}
                  type="text"
                  placeholder="예: 30만평 (약 100만 ㎡)"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 p-3 text-white placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={typeSelectId} className="block font-semibold text-stone-300">단지 개발 유형</label>
                <select
                  id={typeSelectId}
                  value={formData.terraType}
                  onChange={(e) => setFormData({ ...formData, terraType: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 p-3 text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="스마트 일반산업단지 및 국가산단 부지조성">스마트 일반산업단지 및 국가산단 부지조성</option>
                  <option value="신도시 및 복합택지개발 대규모 토공">신도시 및 복합택지개발 대규모 토공</option>
                  <option value="물류단지 및 데이터센터 대평탄 부지조성">물류단지 및 데이터센터 대평탄 부지조성</option>
                  <option value="연약지반 매립지 PBD 압밀 탈수 개량">연약지반 매립지 PBD 압밀 탈수 개량</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label htmlFor={orgInputId} className="block font-semibold text-stone-300">시행사 / 지자체 / 기업명</label>
                <input
                  id={orgInputId}
                  type="text"
                  placeholder="예: 천안도시개발공사 / 세종개발투자"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 p-3 text-white placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={nameInputId} className="block font-semibold text-stone-300">
                  담당자 / 직함 <span className="text-amber-400">*</span>
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  placeholder="정토목 상무"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 p-3 text-white placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor={phoneInputId} className="block font-semibold text-stone-300">
                연락처 <span className="text-amber-400">*</span>
              </label>
              <input
                id={phoneInputId}
                type="tel"
                required
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 p-3 text-white placeholder-stone-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={notesTextareaId} className="block font-semibold text-stone-300">개발 특이사항 및 기술 검토 요청사항</label>
              <textarea
                id={notesTextareaId}
                rows={3}
                placeholder="지하 공동구 도입 여부나 연약지반 유무, 또는 민관합동 SPC 참여 검토 희망사항을 편하게 남겨주세요."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 p-3 text-white placeholder-stone-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-stone-700 bg-stone-800 px-4 py-2.5 text-xs font-semibold text-stone-300 hover:bg-stone-700"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-black text-stone-950 shadow-md hover:bg-amber-400 transition-colors"
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
        slug="sejong-terra"
        industry="civil"
        featureName="스마트 산업단지 부지조성 및 3D 토공 턴키 기술 자문 신청"
      />
    </>
  );
}
