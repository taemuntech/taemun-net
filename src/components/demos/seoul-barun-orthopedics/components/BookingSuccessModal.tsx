import React from 'react';
import { BookingState } from '../types';

interface BookingSuccessModalProps {
  booking: BookingState | null;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E9E8E5] overflow-hidden p-6 text-center space-y-4">
        {/* Animated Success Badge */}
        <div className="w-16 h-16 rounded-full bg-[#E8F8EE] text-[#00652C] flex items-center justify-center mx-auto shadow-sm">
          <span className="material-symbols-outlined text-[36px]">check_circle</span>
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#00652C]/10 text-[#00652C] text-xs font-bold mb-1.5">
            FAST-TRACK 당일 신청 (시뮬레이션)
          </span>
          <h3 className="text-xl font-bold text-[#1A1C1A]">
            예약 신청 가상 시뮬레이션 안내
          </h3>
          <p className="text-xs lg:text-sm text-[#545F73] mt-1 leading-relaxed">
            ※ 본 화면은 포트폴리오용 시뮬레이션으로 실제 전송되거나 예약이 접수되지 않습니다.
          </p>
        </div>

        {/* Reservation Receipt Card */}
        <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E9E8E5] text-left text-xs space-y-2 text-[#3F493F]">
          <div className="flex justify-between pb-1.5 border-b border-[#EFEEEB]">
            <span className="text-[#545F73]">예약자 성함:</span>
            <strong className="text-[#1A1C1A]">{booking.patientName} 님</strong>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-[#EFEEEB]">
            <span className="text-[#545F73]">희망 진료 센터:</span>
            <strong className="text-[#00652C]">{booking.part}</strong>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-[#EFEEEB]">
            <span className="text-[#545F73]">담당 지정의:</span>
            <span className="text-[#1A1C1A] font-medium">{booking.doctor}</span>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-[#EFEEEB]">
            <span className="text-[#545F73]">예약 일시:</span>
            <span className="text-[#1A1C1A] font-medium">
              {booking.date} {booking.time}
            </span>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-[#EFEEEB]">
            <span className="text-[#545F73]">통증 척도:</span>
            <span className="text-[#BA1A1A] font-bold">
              VAS {booking.vas}점 ({booking.duration})
            </span>
          </div>
          <div className="flex justify-between pt-1 text-[11px] text-[#6F7A6E]">
            <span>연락처: {booking.patientTel}</span>
            <span>카카오 알림톡 (시뮬레이션)</span>
          </div>
        </div>

        {/* Quick Instructions */}
        <div className="text-left text-[11px] text-[#545F73] bg-[#F4F3F1] p-3 rounded-lg space-y-1">
          <p>• 내원 시 신분증(주민등록증 또는 모바일 신분증)을 지참해 주십시오.</p>
          <p>• 타 병원 X-ray 또는 MRI CD 자료가 있으시면 1층 접수처에 제출해 주십시오.</p>
          <p>• 주차는 바른마디 메디컬타워 1층 발렛 부스에서 무료 지원됩니다.</p>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#00652C] hover:bg-[#15803D] text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
