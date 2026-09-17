import React from 'react';
import { X, Sparkles, Award, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface FaceAnalysisModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    upperRatio: number;
    midRatio: number;
    lowerRatio: number;
    nasolabialAngle: number;
    chinProjection: number;
    harmonyScore: number;
    presetName: string;
  } | null;
  onProceedToConsultation: () => void;
}

export const FaceAnalysisModal: React.FC<FaceAnalysisModalProps> = ({
  open,
  onClose,
  data,
  onProceedToConsultation,
}) => {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1A1817] text-white w-full max-w-lg rounded-3xl border border-[#C5A880]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C5A880]" />
            <span className="text-[16px] font-bold text-white">
              3D 안면 황금비율 가상 분석 진단서
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#A69F97] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Top Score Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#C5A880]/20 to-white/5 border border-[#C5A880]/30 text-center">
            <div className="text-[12px] text-[#C5A880] uppercase tracking-wider font-semibold mb-1">
              선택 스타일: {data.presetName}
            </div>
            <div className="text-[38px] font-bold font-serif text-white tracking-tight">
              {data.harmonyScore} <span className="text-[18px] font-normal text-[#C5A880]">/ 100 점</span>
            </div>
            <p className="text-[13px] text-[#E8DDD4] mt-1">
              이목구비의 자연스러운 곡선과 한국인 이상 황금비율에 부합하는 조화로운 수치입니다.
            </p>
          </div>

          {/* Metrics Table */}
          <div className="space-y-2.5">
            <div className="text-[13px] font-bold text-[#E8DDD4] mb-1">
              세부 계측 수치 분석
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-[13px]">
              <span className="text-[#A69F97]">삼등분 비율 (상:중:하)</span>
              <span className="font-mono font-bold text-white">
                {data.upperRatio.toFixed(2)} : {data.midRatio.toFixed(2)} : {data.lowerRatio.toFixed(2)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-[13px]">
              <span className="text-[#A69F97]">비순각 (Naso-Labial Angle)</span>
              <span className="font-mono font-bold text-[#C5A880]">
                {data.nasolabialAngle}° (이상 범위 95°~105°)
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-[13px]">
              <span className="text-[#A69F97]">턱끝 입체 투영 (Chin Projection)</span>
              <span className="font-mono font-bold text-white">
                {data.chinProjection >= 0 ? `+${data.chinProjection}` : data.chinProjection} mm
              </span>
            </div>
          </div>

          {/* Specialist Commentary */}
          <div className="p-4 rounded-2xl bg-[#252220] border border-white/10 text-[13px] space-y-2">
            <div className="font-bold text-[#C5A880] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>성형외과 전문의 소견 (예시)</span>
            </div>
            <p className="text-[#D3CBC3] leading-relaxed">
              설정하신 중안부와 하안부의 비율은 부드러운 인상을 주는 동안형 라인에 적합합니다. 비순각 {data.nasolabialAngle}도의 경우 코끝이 처져 보이지 않으면서도 인위적으로 들려 보이지 않는 가장 이상적인 직반버선 각도에 해당합니다.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-white/[0.02] flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-[13px] font-medium text-[#D3CBC3] bg-white/5 hover:bg-white/10 transition-colors"
          >
            닫기
          </button>
          <button
            onClick={() => {
              onClose();
              onProceedToConsultation();
            }}
            className="flex-1 py-3 rounded-xl text-[13px] font-bold text-[#1A1817] bg-gradient-to-r from-[#E8DDD4] to-[#C5A880] hover:brightness-105 transition-all flex items-center justify-center gap-1.5"
          >
            <span>이 값으로 상담 신청</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
