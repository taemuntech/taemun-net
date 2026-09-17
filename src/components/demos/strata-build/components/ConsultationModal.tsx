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
    projectType: '초고층 복합 타워',
    location: '',
    gfa: '',
    startDate: '',
    contactName: '',
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-amber-500/40 bg-slate-900 p-6 shadow-2xl text-white">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded border border-slate-700 bg-slate-800 text-slate-400 hover:text-white"
            aria-label="닫기"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 모달 헤더 */}
          <div className="inline-flex items-center gap-2 rounded border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[11px] text-amber-400">
            STRATA MEGA CONTRACT & AUDIT
          </div>
          <h3 className="mt-2 text-xl font-bold text-white">
            종합건설 도급 견적 및 현장 합동 감리 신청
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            초고층 빌딩, 복합 인프라, 플랜트 시공 계획을 입력해 주시면 기술진이 검토 후 안내해 드립니다.
          </p>

          {/* 사전 고지문 (audit 검증 필수 규격) */}
          <div className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-300">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
          </div>

          {/* 신청 폼 */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300">
                시공 프로젝트 유형 <span className="text-amber-400">*</span>
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="초고층 복합 타워">초고층 복합 타워 및 상업시설</option>
                <option value="복합 환승 플랫폼">광역 환승센터 및 대공간 인프라</option>
                <option value="스마트 물류 플랜트">스마트 물류 & 콜드체인 플랜트</option>
                <option value="데이터센터 및 R&D 시설">하이테크 데이터센터 & R&D 캠퍼스</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-300">
                  사업 대지 위치 <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 서울 강남구 역삼동"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300">
                  예상 연면적 (㎡ 또는 평) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 85,000평 (280,000㎡)"
                  value={formData.gfa}
                  onChange={(e) => setFormData({ ...formData, gfa: e.target.value })}
                  className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-300">
                  착공 희망 시기
                </label>
                <input
                  type="text"
                  placeholder="예: 2027년 1분기"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300">
                  발주 담당자명 / 직함 <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 김상무 팀장"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300">
                연락처 또는 이메일 <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 010-1234-5678 또는 contact@example.com"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300">
                시공 특이사항 및 사전 요청
              </label>
              <textarea
                rows={3}
                placeholder="지하 굴착 깊이, 인접 건물 현황, 친환경 LEED 인증 목표 등을 기재해 주세요."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded border border-amber-500 bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2 text-xs font-bold text-slate-950 shadow-lg hover:from-amber-400 hover:to-amber-500"
              >
                신청서 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* SampleNotice 연동 */}
      <SampleNotice
        open={isNoticeOpen}
        onClose={() => {
          setIsNoticeOpen(false);
          onClose();
        }}
        slug="strata-build"
        industry="construction"
        featureName="종합건설 도급 견적 및 현장 감리 신청"
      />
    </>
  );
}
