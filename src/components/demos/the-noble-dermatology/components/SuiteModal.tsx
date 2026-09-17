import React, { useRef } from 'react';
import { X, DoorClosed, Wind, Sparkles, Shield, Check, Calendar } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface SuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const SuiteModal: React.FC<SuiteModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  // Esc·배경 스크롤 잠금·포커스 가둠 — 샘플 키트의 공용 훅을 쓴다
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="noble-suite-title"
        tabIndex={-1}
        className="relative w-full max-w-3xl bg-[#ffffff] rounded-t-2xl lg:rounded-2xl shadow-2xl border border-[#eae8e5] overflow-hidden max-h-[92vh] lg:max-h-[90vh] flex flex-col outline-none"
      >
        {/* Header */}
        <div className="px-4 lg:px-6 py-4 bg-[#00110b] text-[#ffffff] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <DoorClosed className="w-5 h-5 text-[#fedb9e] shrink-0" />
            <span id="noble-suite-title" className="font-serif text-sm lg:text-base font-medium break-keep">
              Suite No. 01 — 1인 프라이빗 VIP 스위트 상세 안내
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="스위트 안내 닫기"
            className="w-11 h-11 flex items-center justify-center rounded-full text-[#c1c8c4] hover:text-[#ffffff] hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 lg:p-6 overflow-y-auto space-y-6 bg-[#fbf9f6]">
          {/* Main Visual Image Banner */}
          <div className="relative h-56 lg:h-72 rounded-xl overflow-hidden shadow-md">
            <img
              src="/demo-media/the-noble-dermatology/the-noble-dermatology-01.jpg"
              alt="1인 프라이빗 VIP 스위트 예시 이미지"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00110b]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-[#ffffff]">
              <span className="text-[11px] font-semibold text-[#ffdea7] uppercase tracking-widest block">
                Total Private Isolation Architecture
              </span>
              <h3 className="font-serif text-lg lg:text-xl font-medium break-keep">
                타인과 마주치지 않는 1인 1실 독립 케어
              </h3>
            </div>
          </div>

          {/* 4 Key Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eae8e5]">
              <div className="flex items-center gap-2 font-semibold text-[#00110b] mb-1">
                <Shield className="w-4 h-4 text-[#745a2a] shrink-0" />
                <span>5중 차음 및 프라이빗 출입문</span>
              </div>
              <p className="text-[#424845] leading-relaxed break-keep">
                복도 및 인접 공간과의 소음을 줄이는 5중 차음 패널과 독립 락킹 시스템을 적용해 외부 간섭이 적은
                환경에서 진료합니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eae8e5]">
              <div className="flex items-center gap-2 font-semibold text-[#00110b] mb-1">
                <Sparkles className="w-4 h-4 text-[#745a2a] shrink-0" />
                <span>전용 호텔형 파우더룸 & 어메니티</span>
              </div>
              <p className="text-[#424845] leading-relaxed break-keep">
                헤어 스타일러와 드라이어, 기초 진정 스킨케어, 1회용 멸균 가운과 슬리퍼를 전 객실에 개별로
                비치합니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eae8e5]">
              <div className="flex items-center gap-2 font-semibold text-[#00110b] mb-1">
                <Wind className="w-4 h-4 text-[#745a2a] shrink-0" />
                <span>HEPA-14 등급 개별 공조</span>
              </div>
              <p className="text-[#424845] leading-relaxed break-keep">
                각 스위트마다 독립 설치된 HEPA-14 등급 공조 장치가 실내 공기를 순환시킵니다. (사양은 예시
                표기입니다)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eae8e5]">
              <div className="flex items-center gap-2 font-semibold text-[#00110b] mb-1">
                <Check className="w-4 h-4 text-[#745a2a] shrink-0" />
                <span>원스톱 인-스위트 케어 (In-Suite)</span>
              </div>
              <p className="text-[#424845] leading-relaxed break-keep">
                상담, 4광원 피부 계측, 국소 마취, 시술, 진정 케어와 마무리 정돈까지 룸 이동 없이 한 곳에서
                진행됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 lg:px-6 py-4 bg-[#f5f3f0] border-t border-[#eae8e5] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-[#727975]">모든 시술 예약 시 1인 프라이빗 스위트가 기본 배정됩니다.</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 min-h-11 rounded-lg bg-[#ffffff] text-[#00110b] text-xs font-semibold border border-[#eae8e5] hover:bg-[#eae8e5] transition-colors"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-5 min-h-11 rounded-lg bg-[#00110b] text-[#ffffff] text-xs font-semibold hover:bg-[#0d2820] flex items-center gap-1.5 transition-colors shadow-md"
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
