'use client';

import React from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-container-lowest p-6 lg:p-8 shadow-2xl border border-surface-container-high relative flex flex-col gap-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-surface-container pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">
                clinical_notes
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-on-surface">
                  [김○준 학생] 일간 정밀 메디컬 리포트(예시)
                </h3>
                <span className="px-2 py-0.5 rounded bg-primary text-on-primary text-[11px] font-bold">
                  최상위 S반(예시)
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant">
                발행일시: 오늘 오후 9:02 | 담임 디렉터: S대 의예과 출신 김태준(예시)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="창 닫기"
            className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Executive Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col">
            <span className="font-label-sm text-outline">오늘 총 순공 시간</span>
            <span className="font-headline-sm text-on-surface font-bold mt-1">10시간 42분</span>
            <span className="text-[11px] text-primary font-semibold">목표 달성(예시)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col">
            <span className="font-label-sm text-outline">데일리 킬러 10제</span>
            <span className="font-headline-sm text-primary font-bold mt-1">10 / 10 완제</span>
            <span className="text-[11px] text-[#047857] font-semibold">정답률 100%(예시)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col">
            <span className="font-label-sm text-outline">S대 의대 적합도</span>
            <span className="font-headline-sm text-on-surface font-bold mt-1">99.4%(예시)</span>
            <span className="text-[11px] text-primary font-semibold">안정 합격권(예시)</span>
          </div>
        </div>

        {/* Detailed Assessment */}
        <div className="flex flex-col gap-3">
          <h4 className="font-title-md text-on-surface font-semibold text-sm">
            금일 집중 세부 클리닉 내역(예시)
          </h4>
          <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2.5 text-xs text-on-surface-variant border border-surface-container">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>
                <strong className="text-on-surface">수학 (미적분):</strong> 30번 킬러 삼각함수 극한 숏컷 훈련. 종전 14분대 풀이에서 대칭축 인지 후 3분 40초로 완벽 단축.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>
                <strong className="text-on-surface">과탐 (생명과학II):</strong> 코돈 추론 복합 문항 1:1 대면 문답 완료. 2번 조건 역추적 알고리즘 교정.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>
                <strong className="text-on-surface">자습 태도 및 몰입도:</strong> 1인 오크 부스 내 순수 집중도 지수 98.2점.
              </span>
            </div>
          </div>
        </div>

        {/* Director Note */}
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>메디컬 디렉터 종합 소견(예시)</span>
          </div>
          <p className="text-xs text-on-surface leading-relaxed">
            “민준이는 이번 주 킬러 연산 숏컷 적응력이 급상승했습니다. 다음 주에는 국어 언어와 매체 고난도 문법 5문항 타임어택 보강을 진행하여 1교시 멘탈 완벽 방어선을 구축하겠습니다(예시).”
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              window.print?.();
            }}
            className="px-4 py-2.5 rounded-lg border border-surface-container text-xs text-on-surface font-semibold hover:bg-surface-container transition-colors cursor-pointer min-h-[44px]"
          >
            인쇄 / PDF 저장
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg bg-inverse-surface text-surface text-xs font-semibold hover:bg-on-surface transition-colors cursor-pointer min-h-[44px]"
          >
            확인 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
