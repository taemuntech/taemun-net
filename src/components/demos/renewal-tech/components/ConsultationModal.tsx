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
  const builtYearInputId = useId();
  const gfaInputId = useId();
  const scopeSelectId = useId();
  const nameInputId = useId();
  const phoneInputId = useId();
  const notesTextareaId = useId();
  const [formData, setFormData] = useState({
    address: '',
    builtYear: '1990년대 초반 (약 30년 경과)',
    gfa: '약 500~1,000평',
    scope: '전면 대수선 및 삼중 로이 커튼월 외관 교체',
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
            FREE BUILDING DIAGNOSIS
          </span>
          <h3 className="mt-1 font-mono text-xl font-bold text-white">
            노후 빌딩 대수선 무료 자산 진단 신청
          </h3>
          <p className="mt-1 text-xs text-neutral-400">
            건물 지번을 남겨주시면 기존 구조 도면 분석 및 신축 대비 공사비 절감 수지분석표를 제공해 드립니다.
          </p>

          {/* 사전 고지문 (audit 검증 필수 규격) */}
          <div className="mt-4 rounded-lg border border-cyan-500/40 bg-cyan-500/10 p-3 text-xs text-cyan-300">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
          </div>

          {/* 입력 폼 */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div>
              <label htmlFor={addressInputId} className="block font-mono text-neutral-300">
                건물 소재지 (도로명 주소 또는 지번) <span className="text-cyan-400">*</span>
              </label>
              <input
                id={addressInputId}
                type="text"
                required
                placeholder="예: 서울특별시 강남구 역삼동 123-45"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={builtYearInputId} className="block font-mono text-neutral-300">준공 연도</label>
                <input
                  id={builtYearInputId}
                  type="text"
                  placeholder="예: 1992년 준공"
                  value={formData.builtYear}
                  onChange={(e) => setFormData({ ...formData, builtYear: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={gfaInputId} className="block font-mono text-neutral-300">연면적 / 층수</label>
                <input
                  id={gfaInputId}
                  type="text"
                  placeholder="예: 지상 5층, 600평"
                  value={formData.gfa}
                  onChange={(e) => setFormData({ ...formData, gfa: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor={scopeSelectId} className="block font-mono text-neutral-300">희망 대수선 범위</label>
              <select
                id={scopeSelectId}
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="전면 대수선 및 삼중 로이 커튼월 외관 교체">전면 대수선 및 삼중 로이 커튼월 외관 교체</option>
                <option value="외관 리모델링 & 1층 아트리움 로비 신설">외관 리모델링 &amp; 1층 아트리움 로비 신설</option>
                <option value="수직 1~2개 층 증축 및 탄소섬유 내진 보강">수직 1~2개 층 증축 및 탄소섬유 내진 보강</option>
                <option value="노후 설비(EHP/승강기) 교체 및 에너지 밸류애드">노후 설비(EHP/승강기) 교체 및 에너지 밸류애드</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={nameInputId} className="block font-mono text-neutral-300">
                  신청인 (건축주/담당자) <span className="text-cyan-400">*</span>
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  placeholder="홍길동"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1.5 w-full rounded border border-neutral-700 bg-neutral-950 p-2.5 text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
                />
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
            </div>

            <div>
              <label htmlFor={notesTextareaId} className="block font-mono text-neutral-300">요청사항 또는 문의내용</label>
              <textarea
                id={notesTextareaId}
                rows={3}
                placeholder="현재 공실 현황이나 희망 완공 시점을 남겨주시면 더욱 정확한 진단이 가능합니다."
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
                무료 자산 진단 신청하기
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
        slug="renewal-tech"
        industry="construction"
        featureName="도심 노후 빌딩 대수선 무료 자산 진단 및 사업성 리포트 신청"
      />
    </>
  );
}
