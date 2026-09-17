import React from 'react';
import { X, CheckCircle2, MessageSquare, Calendar, MapPin, Phone, Car } from 'lucide-react';
import { BookingFormState } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface BookingSuccessModalProps {
  bookingData: BookingFormState | null;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  bookingData,
  onClose,
}) => {
  if (!bookingData) return null;

  const bookingCode = `VIP-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#ffffff] rounded-2xl shadow-2xl border border-[#eae8e5] overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-5 bg-[#00110b] text-[#ffffff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#fedb9e] text-[#00110b] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#ffdea7] uppercase tracking-widest block font-semibold">
                VIP Reservation Confirmed
              </span>
              <h3 className="font-serif text-base font-medium">
                1:1 프라이빗 예약 신청 (시뮬레이션)
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#c1c8c4] hover:text-[#ffffff] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 bg-[#fbf9f6] space-y-4">
          {/* Kakao Alimtalk Dispatch Alert */}
          <div className="p-3.5 rounded-xl bg-[#FEE500]/20 text-[#3C1E1E] border border-[#FEE500]/40 flex items-start gap-2.5 text-xs">
            <MessageSquare className="w-4 h-4 text-[#3C1E1E] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">카카오 알림톡 VIP 확정증서 미리보기 (시뮬레이션)</span>
              <span className="text-[#3C1E1E]/80">
                입력하신 {bookingData.customerPhone} 번호로 예약 바코드 및 발렛 파킹 안내문이 시뮬레이션되었습니다 (가상 안내).
              </span>
            </div>
          </div>

          {/* Ticket Information Card */}
          <div className="bg-[#ffffff] rounded-xl p-5 border border-[#eae8e5] shadow-sm space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[#efeeeb]">
              <span className="text-[#727975]">예약 번호</span>
              <span className="font-mono font-bold text-[#745a2a]">{bookingCode}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#efeeeb]">
              <span className="text-[#727975]">고객 성함</span>
              <span className="font-semibold text-[#00110b]">{bookingData.customerName} 님</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#efeeeb]">
              <span className="text-[#727975]">전담 전문의</span>
              <span className="font-semibold text-[#00110b]">{bookingData.doctor}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#efeeeb]">
              <span className="text-[#727975]">예약 일시</span>
              <span className="font-medium text-[#00110b]">
                {bookingData.date} • {bookingData.timeSlot}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#efeeeb]">
              <span className="text-[#727975]">배정 룸</span>
              <span className="text-[#00110b]">Suite No. 01 — 1인 독립 프라이빗 스위트</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#727975]">발렛 지원</span>
              <span className="text-[#745a2a] font-medium">더 노블 메디컬 타워 1층 정문 VIP 상시 발렛</span>
            </div>
          </div>

          <div className="bg-[#f5f3f0] p-3.5 rounded-lg border border-[#eae8e5] text-xs text-[#424845] leading-relaxed">
            더 노블 청담은 타인과 동선이 겹치지 않도록 사전 예약된 정시에 1인 전용 스위트로 바로 모십니다. 변경 또는 취소가 필요하신 경우 VIP 컨시어지({CLINIC_INFO.phone})로 연락 주시기 바랍니다.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#f5f3f0] border-t border-[#eae8e5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-lg bg-[#00110b] text-[#ffffff] text-xs font-semibold hover:bg-[#0d2820] transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
