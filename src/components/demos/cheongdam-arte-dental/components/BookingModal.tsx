import React, { useId, useMemo, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { BookingFormData } from '../types';
import { FEAR_OPTIONS } from '../data/clinicData';
import {
  CheckCircle2,
  X,
  Car,
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface BookingModalProps {
  bookingData: BookingFormData | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ bookingData, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc · 배경 클릭 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  useSampleDialog({ open: bookingData !== null, onClose, dialogRef });

  // 열려 있는 동안 번호가 바뀌지 않게 — 다시 그릴 때마다 새 번호가 나오면 예약번호처럼 보이지 않는다
  const reservationCode = useMemo(
    () => `ARTE-${Math.floor(100000 + Math.random() * 900000)}`,
    [bookingData],
  );

  // 고른 항목을 본문까지 내린다 — 개수만 세면 무엇을 골라도 같은 모달이 된다.
  const selectedFears = bookingData
    ? FEAR_OPTIONS.filter((opt) => bookingData.fears.includes(opt.id))
    : [];

  if (!bookingData) return null;

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
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#d1c5b4]/50 overflow-hidden flex flex-col max-h-[90vh] outline-none"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#775a19] to-[#c5a059] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#ffdea5]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-white/80 block font-medium">
                RESERVATION SIMULATION
              </span>
              <h3 id={titleId} className="font-serif text-xl font-bold">
                VIP 진료 예약 신청 (시뮬레이션)
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="w-11 h-11 flex items-center justify-center shrink-0 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* KakaoTalk Notification Talk Preview Card */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-5 rounded-2xl bg-[#FEE500]/20 border border-[#FEE500] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#FEE500]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#3C1E1E] text-[#FEE500] text-[10px] font-bold">
                  알림톡
                </span>
                <span className="text-xs font-bold text-[#3C1E1E]">청담 아르떼 치과의원</span>
              </div>
              <span className="text-[10px] text-[#3C1E1E]/70 font-mono">{reservationCode}</span>
            </div>

            <div className="mt-3 text-xs text-[#3C1E1E] space-y-1.5">
              <p className="font-bold text-sm">
                [청담 아르떼 치과] {bookingData.patientName} VIP 고객님 가상 예약 안내 (예시)
              </p>
              <p className="text-[11px] leading-relaxed text-[#3C1E1E]/80">
                고객님의 진료 편의를 위해 1인 단독 독립 VIP 룸이 배정되었습니다.
                {selectedFears.length > 0
                  ? ` 사전 문진에서 선택하신 항목에 따라 ${selectedFears.map((f) => f.detail).join(', ')}이(가) 함께 준비됩니다.`
                  : ''}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#FEE500] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#3C1E1E]/70">예약 번호</span>
                <span className="font-bold text-[#3C1E1E] font-mono">{reservationCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#3C1E1E]/70">진료 과목</span>
                <span className="font-bold text-[#3C1E1E]">{bookingData.treatment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#3C1E1E]/70">담당 주치의</span>
                <span className="font-bold text-[#3C1E1E]">{bookingData.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#3C1E1E]/70">예약 일시</span>
                <span className="font-bold text-[#3C1E1E]">{bookingData.date} {bookingData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#3C1E1E]/70">환자 연락처</span>
                <span className="font-mono text-[#3C1E1E]">{bookingData.patientPhone}</span>
              </div>
            </div>
          </div>

          {/* Valet & Concierge Notice Card */}
          <div className="p-4 rounded-xl bg-[#faf9f6] border border-[#d1c5b4]/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#775a19]">
              <Car className="w-4 h-4 shrink-0" />
              <span>발렛 파킹 이용 안내</span>
            </div>
            <p className="text-[11px] text-[#4e4639] leading-relaxed">
              도착 5분 전 연락 주시거나 건물 1층 발렛 데스크에 차량을 인도하시면 담당자가 안내해 드립니다. 주차 이용 방법은 예약 시 함께 안내됩니다.
            </p>
          </div>

          {/* Fear assessment notification */}
          {bookingData.fears.length > 0 && (
            <div className="p-3 rounded-xl bg-[#cce5ff]/30 border border-[#93ccff] text-xs text-[#001d31]">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#006398]" />
                <span>안심 사전 문진 체크 항목</span>
              </div>
              <ul className="space-y-1.5 mb-1.5">
                {selectedFears.map((fear) => (
                  <li key={fear.id} className="text-[11px] leading-relaxed">
                    <span className="block font-semibold text-[#001d31]">{fear.label}</span>
                    <span className="block text-[#006398]">→ {fear.detail}</span>
                  </li>
                ))}
              </ul>
              <span className="text-[11px] text-[#006398]">
                위 항목이 이렇게 정리되어 담당 의료진에게 전달되는 화면입니다 (샘플이라 실제로 전송되지 않습니다).
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#faf9f6] border-t border-[#d1c5b4]/30 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-[#775a19] font-bold">
            <PhoneCall className="w-3.5 h-3.5 shrink-0" />
            <span>데스크 02-0000-0000 (예시)</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 min-h-11 rounded-full bg-[#1a1c1a] text-white text-xs font-bold hover:bg-[#775a19] transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
