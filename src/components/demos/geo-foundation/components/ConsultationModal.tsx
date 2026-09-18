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
  const depthInputId = useId();
  const methodSelectId = useId();
  const orgInputId = useId();
  const nameInputId = useId();
  const phoneInputId = useId();
  const notesTextareaId = useId();

  const [formData, setFormData] = useState({
    projectLocation: '',
    depth: '지하 30m 내외',
    foundationType: '하이드로프리즈 D-Wall (지하연속벽)',
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
            GEO FOUNDATION ENGINEERING
          </span>
          <h3 className="mt-1 text-xl font-black text-white">
            대심도 흙막이 · 특수기초 기술 자문 &amp; 견적 신청
          </h3>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            현장 위치와 지반조사보고서 정보를 남겨주시면, 인접 구조물 변위 영향성 검토 및 최적 차수·가시설 공법 리포트를 제공해 드립니다.
          </p>

          {/* 사전 고지문 (audit 검증 필수 규격) */}
          <div className="mt-4 rounded-lg border border-cyan-500/40 bg-cyan-500/10 p-3 text-xs text-cyan-300">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div>
              <label htmlFor={locationInputId} className="block font-semibold text-slate-300">
                시공 현장 위치 / 부지 주소 <span className="text-cyan-400">*</span>
              </label>
              <input
                id={locationInputId}
                type="text"
                required
                placeholder="예: 서울특별시 강남구 역삼동 신축 부지"
                value={formData.projectLocation}
                onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label htmlFor={depthInputId} className="block font-semibold text-slate-300">계획 굴착 심도</label>
                <input
                  id={depthInputId}
                  type="text"
                  placeholder="예: 지하 35m (지하 7층)"
                  value={formData.depth}
                  onChange={(e) => setFormData({ ...formData, depth: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={methodSelectId} className="block font-semibold text-slate-300">검토 희망 공법</label>
                <select
                  id={methodSelectId}
                  value={formData.foundationType}
                  onChange={(e) => setFormData({ ...formData, foundationType: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="하이드로프리즈 D-Wall (지하연속벽)">하이드로프리즈 D-Wall (지하연속벽)</option>
                  <option value="CIP 주열벽 + 복합 어스앵커">CIP 주열벽 + 복합 어스앵커</option>
                  <option value="대구경 RCD 현장타설 암반말뚝">대구경 RCD 현장타설 암반말뚝</option>
                  <option value="초고압 차수 제트그라우팅 (JSP)">초고압 차수 제트그라우팅 (JSP)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label htmlFor={orgInputId} className="block font-semibold text-slate-300">시공사 / 시행사명</label>
                <input
                  id={orgInputId}
                  type="text"
                  placeholder="예: 대한건설산업(주)"
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
                  placeholder="홍길동 현장소장"
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
              <label htmlFor={notesTextareaId} className="block font-semibold text-slate-300">지반 조건 및 인접 지하철 특이사항</label>
              <textarea
                id={notesTextareaId}
                rows={3}
                placeholder="인접 지하철 노선 이격거리나 피압지하수층 유무 등 현장 특이사항을 적어주시면 더욱 정밀한 기술 검토가 가능합니다."
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
        slug="geo-foundation"
        industry="civil"
        featureName="대심도 흙막이 가시설 및 특수기초 정밀 엔지니어링 기술 자문 신청"
      />
    </>
  );
}
