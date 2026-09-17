import React from 'react';
import { X, Clock, Sparkles, Check, AlertCircle } from 'lucide-react';
import { RECOVERY_STEPS } from '../../data/clinicData';

interface RecoveryGuideModalProps {
  open: boolean;
  onClose: () => void;
}

export const RecoveryGuideModal: React.FC<RecoveryGuideModalProps> = ({
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1A1817] text-white w-full max-w-2xl rounded-3xl border border-[#C5A880]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#C5A880]" />
            <span className="text-[16px] font-bold text-white">
              수술 후 14일 일자별 안심 회복 &amp; 붓기 가이드
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#A69F97] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[13px] text-[#D3CBC3] leading-relaxed">
            온새미로는 수술 후 일상생활로의 빠른 복귀를 돕기 위해 체계적인 일자별 사후관리 프로그램을 운영합니다.
          </div>

          <div className="space-y-4">
            {RECOVERY_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#C5A880]/20 text-[#E8DDD4] border border-[#C5A880]/30">
                    {step.day}
                  </span>
                  <span className="text-[14px] font-bold text-white">
                    {step.title}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {step.careDetails.map((care, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-[12px] text-[#D3CBC3]">
                      <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{care}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-[#252220] border border-white/5 text-[12px] text-[#A69F97] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">관리 팁:</span> {step.tips}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-[13px] font-bold text-[#1A1817] bg-gradient-to-r from-[#E8DDD4] to-[#C5A880] hover:brightness-105 transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
