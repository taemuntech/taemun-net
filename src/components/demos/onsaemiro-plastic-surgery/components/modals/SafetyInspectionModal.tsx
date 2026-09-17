import React from 'react';
import { X, ShieldCheck, CheckCircle2, Award, Lock, FileCheck } from 'lucide-react';
import { SAFETY_PROTOCOLS } from '../../data/clinicData';

interface SafetyInspectionModalProps {
  open: boolean;
  onClose: () => void;
}

export const SafetyInspectionModal: React.FC<SafetyInspectionModalProps> = ({
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
            <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
            <span className="text-[16px] font-bold text-white">
              5대 무결점 환자안심 시스템 정밀 인증서
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
          {/* Certificate Badge Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#C5A880]/15 via-white/5 to-transparent border border-[#C5A880]/30 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-white mb-1">
                온새미로 수술실 무결점 환자안전 서약
              </div>
              <p className="text-[13px] text-[#A69F97] leading-relaxed">
                온새미로 성형외과는 수술 전 과정의 투명성과 환자 생명 보호를 제1의 원칙으로 삼으며, 의료법 및 감염 관리 규정을 100% 준수합니다.
              </p>
            </div>
          </div>

          {/* 5 Protocols Checklist */}
          <div className="space-y-3">
            {SAFETY_PROTOCOLS.map((protocol, idx) => (
              <div
                key={protocol.id}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-[11px] font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="text-[14px] font-bold text-white">
                      {protocol.title}
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    인증 완료
                  </span>
                </div>

                <p className="text-[12px] text-[#A69F97] pl-8 leading-relaxed">
                  {protocol.description}
                </p>

                <div className="pl-8 pt-1 space-y-1">
                  {protocol.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-[#D3CBC3]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Hardware Spec Box */}
          <div className="p-4 rounded-2xl bg-[#252220] border border-white/5 space-y-2">
            <div className="text-[13px] font-bold text-[#E8DDD4] flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#C5A880]" />
              <span>원내 보유 응급 방재 및 생명 유지 설비</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-[12px] text-[#A69F97] pt-1">
              <div>• 무정전 전원 공급장치 (UPS)</div>
              <div>• 자동제세동기 (AED) 완비</div>
              <div>• 표적제어 수면마취기 (TCI)</div>
              <div>• 실시간 EtCO2 감시장치</div>
              <div>• 헤파필터 1000 Class 클린룸</div>
              <div>• 대학병원 응급 핫라인망</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-[13px] font-bold text-[#1A1817] bg-gradient-to-r from-[#E8DDD4] to-[#C5A880] hover:brightness-105 transition-all"
          >
            확인 완료
          </button>
        </div>
      </div>
    </div>
  );
};
