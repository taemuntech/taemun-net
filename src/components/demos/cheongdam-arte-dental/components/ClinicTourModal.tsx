import React, { useId, useRef, useState } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { CLINIC_FACILITIES } from '../data/clinicData';
import { X, ShieldCheck, ChevronRight } from 'lucide-react';

interface ClinicTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTour: () => void;
}

export const ClinicTourModal: React.FC<ClinicTourModalProps> = ({
  isOpen,
  onClose,
  onBookTour
}) => {
  const [activeFacilityId, setActiveFacilityId] = useState(CLINIC_FACILITIES[0].id);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc · 배경 클릭 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const currentFacility = CLINIC_FACILITIES.find(f => f.id === activeFacilityId) || CLINIC_FACILITIES[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#d1c5b4]/50 overflow-hidden flex flex-col max-h-[90vh] outline-none"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 lg:px-8 border-b border-[#d1c5b4]/30 bg-[#faf9f6]">
          <div>
            <span className="text-[11px] text-[#775a19] tracking-widest uppercase font-bold block">
              CHEONGDAM ARTE CLINIC TOUR
            </span>
            <h3 id={titleId} className="font-serif text-2xl text-[#1a1c1a] font-bold mt-0.5">
              프라이빗 1:1 VIP 클리닉 공간 투어
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="w-11 h-11 flex items-center justify-center shrink-0 rounded-full text-[#7f7667] hover:text-[#1a1c1a] hover:bg-[#efeeeb] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Room Switcher Tabs */}
        <div className="flex border-b border-[#d1c5b4]/30 bg-[#f4f3f1] px-6 lg:px-8 overflow-x-auto gap-2 py-2">
          {CLINIC_FACILITIES.map((facility) => {
            const isActive = facility.id === activeFacilityId;
            return (
              <button
                key={facility.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFacilityId(facility.id)}
                className={`px-4 py-2.5 min-h-11 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-[#775a19] shadow-sm ring-1 ring-[#775a19]/30'
                    : 'text-[#4e4639] hover:text-[#1a1c1a]'
                }`}
              >
                <span>{facility.title}</span>
              </button>
            );
          })}
        </div>

        {/* Facility Detail Body */}
        <div className="p-6 lg:p-8 overflow-y-auto space-y-6">
          <div className="relative rounded-2xl overflow-hidden h-64 lg:h-80 shadow-md bg-[#e9e8e5]">
            <img
              src={currentFacility.image}
              alt={currentFacility.title}
              className="w-full h-full object-cover"
            referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[10px] font-bold tracking-wider">
              예시 이미지
            </span>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#ffdea5] font-semibold">
                {currentFacility.subtitle}
              </span>
              <h4 className="font-serif text-xl lg:text-2xl font-bold mt-1">
                {currentFacility.title}
              </h4>
            </div>
          </div>

          <p className="text-sm lg:text-base text-[#4e4639] leading-relaxed">
            {currentFacility.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {currentFacility.specs.map((spec, sIdx) => (
              <div key={sIdx} className="p-4 rounded-xl bg-[#faf9f6] border border-[#d1c5b4]/30 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#775a19] shrink-0" />
                <span className="text-xs font-bold text-[#1a1c1a]">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#faf9f6] border-t border-[#d1c5b4]/30 flex flex-col lg:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#7f7667]">
            전 좌석 단독 1인 VIP 룸에서 진료가 진행되오니 사전 예약 후 내원 부탁드립니다.
          </span>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full lg:w-auto px-5 py-2.5 min-h-11 rounded-full border border-[#d1c5b4] text-xs font-bold text-[#4e4639] hover:bg-[#efeeeb]"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={() => { onClose(); onBookTour(); }}
              className="w-full lg:w-auto px-6 py-2.5 min-h-11 rounded-full bg-gradient-to-r from-[#c5a059] to-[#775a19] text-white text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
            >
              <span>진료 및 클리닉 예약</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
