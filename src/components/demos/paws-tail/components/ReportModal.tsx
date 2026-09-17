import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import React, { useRef } from 'react';
import { ProfilerState } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profilerState: ProfilerState | null;
  dailyGrams: number;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  profilerState,
  dailyGrams,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useSampleDialog({ open: isOpen && profilerState !== null, onClose, dialogRef });

  if (!isOpen || !profilerState) return null;

  const morningGrams = Math.round(dailyGrams / 2);
  const eveningGrams = dailyGrams - morningGrams;
  const scoops = (dailyGrams / 30).toFixed(1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm lg:items-center lg:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="영양 리포트"
        tabIndex={-1}
        className="bg-white rounded-t-2xl lg:rounded-2xl max-w-2xl w-full max-h-[92vh] lg:max-h-[88vh] overflow-y-auto p-6 lg:p-8 shadow-2xl border border-[#bfc9c1]/60 relative text-[#121c2a] outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-3 right-3 text-[#707973] hover:text-[#121c2a] min-h-11 min-w-11 flex items-center justify-center rounded-full hover:bg-slate-100 print:hidden"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Certificate Header */}
        <div className="border-b-2 border-[#0f5238] pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#0f5238] tracking-tight">
                  PAWS &amp; TAIL VET
                </span>
                <span className="text-[10px] bg-[#b1f0ce] text-[#0f5238] px-2 py-0.5 rounded font-bold">
                  영양 리포트 (예시)
                </span>
              </div>
              <p className="text-xs text-[#404943] mt-0.5">수의학 임상영양연구소 (예시) 급여 안내서</p>
            </div>
            <div className="text-right text-[11px] text-[#707973] font-mono">
              <p>DOC NO: 표기 자리 (예시)</p>
              <p>DATE: 표기 자리 (예시)</p>
            </div>
          </div>
        </div>

        {/* Patient Profile Summary */}
        <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#bfc9c1]/60 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs mb-6">
          <div>
            <span className="text-[#707973] block text-[11px]">반려동물</span>
            <strong className="text-sm">
              {profilerState.species === 'dog' ? '🐶 반려견 (Canine)' : '🐱 반려묘 (Feline)'}
            </strong>
          </div>
          <div>
            <span className="text-[#707973] block text-[11px]">나이 / 생애주기</span>
            <strong className="text-sm">{profilerState.age}세 (성견/묘)</strong>
          </div>
          <div>
            <span className="text-[#707973] block text-[11px]">체중</span>
            <strong className="text-sm">{profilerState.weight.toFixed(1)} kg</strong>
          </div>
          <div>
            <span className="text-[#707973] block text-[11px]">중성화 여부</span>
            <strong className="text-sm">
              {profilerState.isNeutered ? '완료 (관리군)' : '미완료'}
            </strong>
          </div>
        </div>

        {/* Dosage & Calorie Requirement */}
        <div className="space-y-4 mb-6 text-xs">
          <h4 className="font-bold text-sm text-[#0f5238] flex items-center gap-1.5 border-b pb-1">
            <span className="material-symbols-outlined text-base">nutrition</span>
            <span>1일 정량 급여 안내 (RER/DER 환산)</span>
          </h4>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-[#707973] block">1일 총 급여량</span>
              <span className="text-lg font-bold text-[#0f5238]">{dailyGrams}g</span>
              <span className="text-[10px] text-[#404943] block mt-0.5">약 {scoops} 스쿱</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-[#707973] block">아침 급여 (1회)</span>
              <span className="text-lg font-bold text-[#121c2a]">{morningGrams}g</span>
              <span className="text-[10px] text-[#404943] block mt-0.5">미온수 혼합 권장</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-[#707973] block">저녁 급여 (2회)</span>
              <span className="text-lg font-bold text-[#121c2a]">{eveningGrams}g</span>
              <span className="text-[10px] text-[#404943] block mt-0.5">소화 안정 포뮬러</span>
            </div>
          </div>
        </div>

        {/* Nutritional Guarantees */}
        <div className="space-y-3 mb-6 text-xs">
          <h4 className="font-bold text-sm text-[#0f5238] flex items-center gap-1.5 border-b pb-1">
            <span className="material-symbols-outlined text-base">verified</span>
            <span>임상 영양 분석치 (AAFCO 기준 예시)</span>
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-center text-[11px]">
            <div className="p-2 bg-[#dee9fc] rounded-lg">
              <span className="text-[#404943] block">조단백질</span>
              <strong className="text-xs text-[#0f5238]">32.0% 이상</strong>
            </div>
            <div className="p-2 bg-[#dee9fc] rounded-lg">
              <span className="text-[#404943] block">조지방</span>
              <strong className="text-xs text-[#0f5238]">14.5% 이상</strong>
            </div>
            <div className="p-2 bg-[#dee9fc] rounded-lg">
              <span className="text-[#404943] block">칼슘/인 비율</span>
              <strong className="text-xs text-[#0f5238]">1.2 : 1.0 (황금비)</strong>
            </div>
            <div className="p-2 bg-[#dee9fc] rounded-lg">
              <span className="text-[#404943] block">오메가3 (EPA/DHA)</span>
              <strong className="text-xs text-[#0f5238]">3,200mg/kg</strong>
            </div>
          </div>
        </div>

        {/* Doctor stamp */}
        <div className="flex items-center justify-between pt-4 border-t border-[#bfc9c1]/60 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#dee9fc] flex items-center justify-center font-bold text-[#0f5238]">
              김
            </div>
            <div>
              <p className="font-bold text-[#121c2a]">김민준 수의내과 전문 수의사</p>
              <p className="text-[10px] text-[#707973]">수의과대학 임상영양학 외래 (예시) / 면허 표기 자리 (예시)</p>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-[#ba1a1a] text-[#ba1a1a] flex items-center justify-center font-serif text-[10px] font-bold rotate-[-12deg] text-center leading-tight">
            예시
            <br />
            문서
          </div>
        </div>

        <p className="pt-4 text-[11px] leading-relaxed text-[#707973] print:text-[#707973]">
          가상 브랜드 샘플의 예시 문서입니다. 실제 처방전이 아니며 급여량은 담당 수의사와 상의해
          정하세요.
        </p>

        {/* Actions */}
        <div className="flex gap-3 pt-4 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 min-h-11 rounded-full bg-[#0f5238] text-white text-xs font-bold hover:bg-[#2d6a4f] shadow-md flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">print</span>
            <span>리포트 인쇄 / PDF 저장</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 min-h-11 rounded-full border border-[#bfc9c1] text-[#404943] text-xs font-bold hover:bg-slate-50"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
