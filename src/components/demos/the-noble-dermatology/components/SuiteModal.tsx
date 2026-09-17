import React from 'react';
import { X, DoorClosed, Wind, Sparkles, Shield, Check, Calendar } from 'lucide-react';

interface SuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const SuiteModal: React.FC<SuiteModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#ffffff] rounded-2xl shadow-2xl border border-[#eae8e5] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#00110b] text-[#ffffff] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <DoorClosed className="w-5 h-5 text-[#fedb9e]" />
            <span className="font-serif text-sm lg:text-base font-medium">
              Suite No. 01 — 1인 프라이빗 VIP 스위트 상세 안내
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#c1c8c4] hover:text-[#ffffff] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#fbf9f6]">
          {/* Main Visual Image Banner */}
          <div className="relative h-64 lg:h-72 rounded-xl overflow-hidden shadow-md">
            <img
              src="/demo-media/the-noble-dermatology/the-noble-dermatology-01.jpg"
              alt="Luxury VIP Suite"
              className="w-full h-full object-cover"
             referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00110b]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-[#ffffff]">
              <span className="text-[11px] font-semibold text-[#ffdea7] uppercase tracking-widest block">
                Total Private Isolation Architecture
              </span>
              <h3 className="font-serif text-xl font-medium">
                타인과 마주치지 않는 1인 1실 독립 케어
              </h3>
            </div>
          </div>

          {/* 4 Key Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eae8e5]">
              <div className="flex items-center gap-2 font-semibold text-[#00110b] mb-1">
                <Shield className="w-4 h-4 text-[#745a2a]" />
                <span>5중 차음 및 프라이빗 출입문</span>
              </div>
              <p className="text-[#424845] leading-relaxed">
                복도 및 인접 공간과의 소음을 완벽히 차단하는 5중 차음 패널과 독립 락킹 시스템이 적용되어 외부 간섭 없는 평온한 진료를 지향합니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eae8e5]">
              <div className="flex items-center gap-2 font-semibold text-[#00110b] mb-1">
                <Sparkles className="w-4 h-4 text-[#745a2a]" />
                <span>전용 호텔형 파우더룸 & 어메니티</span>
              </div>
              <p className="text-[#424845] leading-relaxed">
                다이슨 에어랩, 슈퍼소닉 헤어드라이어, 라 메르(La Mer) 스킨케어, 1회용 최고급 멸균 가운과 슬리퍼가 전 객실마다 개별 비치됩니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eae8e5]">
              <div className="flex items-center gap-2 font-semibold text-[#00110b] mb-1">
                <Wind className="w-4 h-4 text-[#745a2a]" />
                <span>HEPA 14 개별 공조 & 음압 멸균</span>
              </div>
              <p className="text-[#424845] leading-relaxed">
                각 스위트마다 독립 설치된 대학병원 무균 수술실 등급의 HEPA-14 공조 환기 장치가 시간당 12회 전면 공기 순환을 수행합니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eae8e5]">
              <div className="flex items-center gap-2 font-semibold text-[#00110b] mb-1">
                <Check className="w-4 h-4 text-[#745a2a]" />
                <span>원스톱 인-스위트 케어 (In-Suite)</span>
              </div>
              <p className="text-[#424845] leading-relaxed">
                상담, 마크뷰 정밀 계측, 국소 마취, 정품 리프팅 시술, LDM 진정 케어 및 마무리 메이크업까지 룸 이동 없이 한 곳에서 진행됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#f5f3f0] border-t border-[#eae8e5] flex items-center justify-between shrink-0">
          <span className="text-xs text-[#727975]">
            모든 시술 예약 시 1인 프라이빗 스위트가 기본 배정됩니다.
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#ffffff] text-[#00110b] text-xs font-semibold border border-[#eae8e5] hover:bg-[#eae8e5] transition-colors"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-5 py-2 rounded-lg bg-[#00110b] text-[#ffffff] text-xs font-semibold hover:bg-[#0d2820] flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Calendar className="w-3.5 h-3.5 text-[#fedb9e]" />
              <span>이 스위트로 예약하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
