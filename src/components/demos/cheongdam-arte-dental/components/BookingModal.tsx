import React from 'react';
import { BookingFormData } from '../types';
import { CLINIC_IMAGES } from '../data/clinicData';
import { 
  CheckCircle2, 
  X, 
  Calendar, 
  Clock, 
  User, 
  ShieldCheck, 
  MessageSquare, 
  Car, 
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface BookingModalProps {
  bookingData: BookingFormData | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ bookingData, onClose }) => {
  if (!bookingData) return null;

  const reservationCode = `ARTE-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#d1c5b4]/50 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
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
              <h3 className="font-serif text-xl font-bold">
                VIP 진료 예약 신청 (시뮬레이션)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
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
                고객님의 진료 편의를 위해 1인 단독 독립 VIP 룸과 컴퓨터 무통 마취 시스템이 배정되었습니다.
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
              <Car className="w-4 h-4" />
              <span>전액 무료 VIP 발렛 주차권 포함</span>
            </div>
            <p className="text-[11px] text-[#4e4639] leading-relaxed">
              도착 5분 전 연락 주시거나 건물 1층 발렛 부스에 차량을 인도하시면 전담 발렛 기사가 안전하게 파킹해 드립니다.
            </p>
          </div>

          {/* Fear assessment notification */}
          {bookingData.fears.length > 0 && (
            <div className="p-3 rounded-xl bg-[#cce5ff]/30 border border-[#93ccff] text-xs text-[#001d31]">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#006398]" />
                <span>안심 사전 문진 체크 항목</span>
              </div>
              <span className="text-[11px] text-[#006398]">
                선택하신 {bookingData.fears.length}가지 민감도 항목이 담당 원장님과 전담 치위생사에게 전달되었습니다.
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#faf9f6] border-t border-[#d1c5b4]/30 flex items-center justify-between">
          <a
            href="#booking-section"
            className="flex items-center gap-1.5 text-xs text-[#775a19] font-bold hover:underline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>데스크 02-0000-0000</span>
          </a>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#1a1c1a] text-white text-xs font-bold hover:bg-[#775a19] transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
