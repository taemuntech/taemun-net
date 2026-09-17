import React from 'react';
import { HUDParameters } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: HUDParameters;
  score: number;
  status: string;
  summary: string;
  onBookWithReport: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  params,
  score,
  status,
  summary,
  onBookWithReport
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#fdf9f5] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8 shadow-2xl relative flex flex-col gap-6 border border-[#c5a880]/30">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f1ede9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#725b38]/10 text-[#725b38] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">analytics</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#725b38] font-bold">
                AESTHETIC REPORT
              </span>
              <h3 className="font-serif text-[20px] lg:text-[22px] font-semibold text-[#1c1c19]">
                온새미로 3D 가상성형 분석 리포트
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#ebe7e4] text-[#4d463c] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Score & Proportion Summary */}
        <div className="p-4 rounded-xl bg-[#f7f3ef] border border-[#d1c5b8]/30 flex flex-col gap-2.5">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#4d463c]">진단 대상 비율 분석</span>
            <span className="font-mono font-semibold text-[#725b38]">
              Upper {params.upper.toFixed(2)} : Mid {params.mid.toFixed(2)} : Lower {params.lower.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#4d463c]">비순각 &amp; 턱끝 프로젝션</span>
            <span className="font-mono font-semibold text-[#1c1c19]">
              {params.angle}° / {params.projection >= 0 ? `+${params.projection.toFixed(1)}` : params.projection.toFixed(1)}mm
            </span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#4d463c]">안면 하모니 평가</span>
            <span className="font-bold text-[#725b38]">
              {score}점 ({status})
            </span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#4d463c]">추천 집도 기법</span>
            <span className="font-semibold text-[#1c1c19]">무보형물 자가연골 비순각 교정 + 미세 지방재배치</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#4d463c]">예상 붓기 회복기</span>
            <span className="font-semibold text-[#1c1c19]">VIP 고압산소 케어 병행 시 약 5~7일 소요</span>
          </div>
        </div>

        {/* Narrative Clinical Notes */}
        <div className="space-y-3 text-[13px] text-[#4d463c] leading-relaxed">
          <p className="font-semibold text-[#1c1c19]">의료진 종합 소견:</p>
          <p>{summary}</p>
          <p>
            환자분의 현재 얼굴은 지나친 보형물 삽입 시 부자연스러운 인상을 초래할 위험이 큽니다. 비순각을 {params.angle}도로 완만히 세우고 턱끝 라인의 곡선미를 살리는 미세 교정만으로도 전체적인 입체감과 귀티 나는 윤곽을 성공적으로 도출할 수 있습니다.
          </p>
          <p>
            온새미로 성형외과는 불필요한 과잉 수술을 권하지 않으며, 실명 집도 원장과의 1:1 대면 상담 시 3D-CT 실측 데이터를 기반으로 0.05mm 단위 정밀 진단을 확정합니다.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#f1ede9]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#ebe7e4] text-[#1c1c19] text-[13px] font-medium hover:bg-[#e5e2de] transition-colors cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={onBookWithReport}
            className="px-6 py-2.5 rounded-full bg-[#1A1817] text-[#fdf9f5] text-[13px] font-semibold hover:bg-[#2E2A27] transition-all cursor-pointer shadow-md flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px] text-[#fedeb2]">calendar_month</span>
            <span>이 진단으로 1:1 상담 예약하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
