import React from 'react';
import { X, HeartHandshake, Microscope, Sparkles, Shield, Check } from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicData';

interface PhilosophyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToBooking: () => void;
}

export const PhilosophyModal: React.FC<PhilosophyModalProps> = ({
  isOpen,
  onClose,
  onGoToBooking
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#d1c5b4]/50 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 lg:px-8 border-b border-[#d1c5b4]/30 bg-[#faf9f6]">
          <div className="flex items-center gap-3">
            <img src={CLINIC_IMAGES.logo} alt="Logo" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
            <div>
              <span className="text-[11px] text-[#775a19] tracking-widest uppercase font-bold block">
                ARTE DENTAL PHILOSOPHY
              </span>
              <h3 className="font-serif text-2xl text-[#1a1c1a] font-bold">
                청담 아르떼 치과 3대 진료 철학
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#7f7667] hover:text-[#1a1c1a] hover:bg-[#efeeeb] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 lg:p-8 overflow-y-auto space-y-6">
          <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#d1c5b4]/40">
            <p className="font-serif text-base text-[#1a1c1a] italic leading-relaxed text-center">
              “치료를 잘하는 치과를 넘어, 꼭 필요한 치료만을 정직하게 권하는 평생의 치과 주치의가 되겠습니다.”
            </p>
          </div>

          <div className="space-y-4">
            {/* Principle 1 */}
            <div className="p-5 rounded-2xl border border-[#d1c5b4]/30 hover:border-[#775a19]/50 transition-all bg-white">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ffdea5] flex items-center justify-center text-[#775a19] shrink-0 font-bold">
                  01
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1a1c1a] mb-1">
                    자연 치아 보존 우선주의 (Minimal Intervention)
                  </h4>
                  <p className="text-xs lg:text-sm text-[#4e4639] leading-relaxed">
                    한 번 깎아낸 치아는 다시 재생되지 않습니다. 불필요한 신경치료와 과도한 삭제를 지양하며, 0.1mm 단위의 초박막 미세삭제 라미네이트와 자연 치아를 최대한 살리는 보존적 치료를 기본 원칙으로 합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Principle 2 */}
            <div className="p-5 rounded-2xl border border-[#d1c5b4]/30 hover:border-[#775a19]/50 transition-all bg-white">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006398] shrink-0 font-bold">
                  02
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1a1c1a] mb-1">
                    디지털 3D 과학적 정밀성 (Digital Precision by Design)
                  </h4>
                  <p className="text-xs lg:text-sm text-[#4e4639] leading-relaxed">
                    의사의 육안과 감각에만 의존하지 않고, 3D CT 및 구강 스캐너 데이터를 바탕으로 가상 모의수술을 선행합니다. 0.1mm 미만의 오차 범위 내에서 안전한 수술 가이드를 제작하여 신경 손상 위험을 근본적으로 차단합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Principle 3 */}
            <div className="p-5 rounded-2xl border border-[#d1c5b4]/30 hover:border-[#775a19]/50 transition-all bg-white">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#dae2fd] flex items-center justify-center text-[#565e74] shrink-0 font-bold">
                  03
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1a1c1a] mb-1">
                    두려움 없는 진료 &amp; 감염 제로 VIP 안심 (Zero Fear &amp; Infection)
                  </h4>
                  <p className="text-xs lg:text-sm text-[#4e4639] leading-relaxed">
                    치과 공포증을 완전히 이해하고 존중합니다. 체온 일치 4단계 컴퓨터 무통 마취, 노이즈 캔슬링 케어, 그리고 전 좌석 단독 1인 VIP 음압/양압 멸균실에서 타 환자와의 접촉 없이 가장 편안한 상태로 치료받으실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#faf9f6] border-t border-[#d1c5b4]/30 flex items-center justify-between">
          <span className="text-xs text-[#7f7667]">
            보건복지부 인증 구강악안면외과 &amp; 치과보철과 전문의 책임 진료
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#d1c5b4] text-xs font-bold text-[#4e4639] hover:bg-[#efeeeb]"
            >
              닫기
            </button>
            <button
              onClick={() => { onClose(); onGoToBooking(); }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#c5a059] to-[#775a19] text-white text-xs font-bold shadow-md hover:shadow-lg"
            >
              VIP 진료 예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
