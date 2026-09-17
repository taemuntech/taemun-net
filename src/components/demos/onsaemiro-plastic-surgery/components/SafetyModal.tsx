import React from 'react';
import { SAFETY_PILLARS } from '../data/clinicData';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#fdf9f5] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8 shadow-2xl relative flex flex-col gap-6 border border-[#c5a880]/30">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f1ede9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#725b38]/10 text-[#725b38] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#725b38] font-bold">
                PATIENT CHARTER
              </span>
              <h3 className="font-serif text-[20px] lg:text-[22px] font-semibold text-[#1c1c19]">
                온새미로 5대 안심선언 서약서 전문
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

        {/* Content */}
        <div className="space-y-4 text-[13px] text-[#4d463c] leading-relaxed">
          <p className="font-semibold text-[#1c1c19] text-[14px]">
            온새미로 성형외과는 환자의 생명과 인격을 최우선 가치로 여기며, 아래 5개 조항에 대해 법적 책임을 다할 것을 엄숙히 서약합니다.
          </p>

          {SAFETY_PILLARS.map((pillar, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#f7f3ef] border border-[#d1c5b8]/30 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[#1c1c19] text-[14px]">
                  {pillar.pillarNumber}. {pillar.title}
                </span>
                <span className="text-[11px] font-semibold text-[#725b38]">
                  {pillar.guarantee}
                </span>
              </div>
              <p className="text-[12px] text-[#4d463c]">{pillar.desc}</p>
            </div>
          ))}

          <div className="p-4 rounded-xl bg-[#1A1817] text-[#fdf9f5] text-[12px] leading-relaxed flex items-start gap-3 mt-4">
            <span className="material-symbols-outlined text-[#fedeb2] text-[20px] shrink-0">verified</span>
            <div>
              <span className="font-semibold text-[#fedeb2] block mb-0.5">안심 보증 보상 특약:</span>
              상담 의사와 실제 집도 의사가 상이한 대리수술(유령수술)이 확인될 경우, 수술비 전액 환불 및 위자료 포함 200% 보상을 법적 서약합니다.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-4 border-t border-[#f1ede9]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#1A1817] text-[#fdf9f5] text-[13px] font-semibold hover:bg-[#2E2A27] transition-all cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
