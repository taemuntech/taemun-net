import React from 'react';
import { CLINIC_IMAGES } from '../data/clinicData';
import { 
  Clock, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Phone, 
  FileText,
  Heart
} from 'lucide-react';

interface FooterProps {
  onOpenPhilosophy: () => void;
  onOpenClinicTour: () => void;
  onGoToBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPhilosophy,
  onOpenClinicTour,
  onGoToBooking
}) => {
  return (
    <footer className="w-full bg-[#1a1c1a] text-[#efeeeb] pt-16 pb-12 border-t border-black/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12">
        {/* Accreditation Banners Row */}
        <div className="pb-12 border-b border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-[#ffdea5] mb-2" />
            <span className="text-xs font-bold text-white">보건복지부 인증 전문의</span>
            <span className="text-[10px] text-[#7f7667] mt-0.5">구강악안면외과 &amp; 치과보철과</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#ffdea5] mb-2" />
            <span className="text-xs font-bold text-white">Straumann &amp; Osstem</span>
            <span className="text-[10px] text-[#7f7667] mt-0.5">100% 정품 인증서 발급</span>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="w-6 h-6 text-[#ffdea5] mb-2" />
            <span className="text-xs font-bold text-white">1인 독립 VIP 룸</span>
            <span className="text-[10px] text-[#7f7667] mt-0.5">단독 음압·양압 클린에어</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-6 h-6 text-[#ffdea5] mb-2" />
            <span className="text-xs font-bold text-white">화/목 21:00 야간진료</span>
            <span className="text-[10px] text-[#7f7667] mt-0.5">직장인을 위한 야간 케어</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={CLINIC_IMAGES.logo}
                alt="Cheongdam Arte Logo"
                className="h-8 w-auto object-contain brightness-0 invert"
              referrerPolicy="no-referrer" />
              <div>
                <span className="font-serif text-lg font-bold text-white block">
                  청담 아르떼 치과의원
                </span>
                <span className="text-[10px] text-[#7f7667] tracking-widest uppercase block">
                  Cheongdam Arte Dental Atelier
                </span>
              </div>
            </div>
            <p className="text-xs text-[#efeeeb]/70 leading-relaxed max-w-sm">
              대학병원 출신 보건복지부 인증 전문의 2인의 협진으로, 0.1mm의 오차도 허용하지 않는 첨단 디지털 진료와 자연치아를 온전히 보존하는 예술적 심미를 완성합니다.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-[#ffdea5] block">VIP CONCIERGE</span>
              <a href="#booking-section" className="text-2xl font-serif font-bold text-white hover:text-[#ffdea5] transition-colors">
                02-0000-0000
              </a>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#ffdea5] uppercase tracking-wider">
              CLINIC OPERATING HOURS (진료 시간)
            </h4>
            <ul className="text-xs space-y-2 text-[#efeeeb]/80">
              <li className="flex justify-between pb-1 border-b border-white/5">
                <span>월 • 수 • 금요일</span>
                <span className="font-semibold text-white">10:00 - 19:00</span>
              </li>
              <li className="flex justify-between pb-1 border-b border-white/5">
                <span className="text-[#ffdea5] font-semibold">화 • 목요일 (야간진료)</span>
                <span className="font-bold text-[#ffdea5]">10:00 - 21:00</span>
              </li>
              <li className="flex justify-between pb-1 border-b border-white/5">
                <span>토요일</span>
                <span className="font-semibold text-white">10:00 - 14:00 (점심시간 없음)</span>
              </li>
              <li className="flex justify-between pb-1 border-b border-white/5">
                <span>평일 점심시간</span>
                <span>13:00 - 14:00</span>
              </li>
              <li className="flex justify-between text-xs text-[#7f7667]">
                <span>일요일 및 법정공휴일</span>
                <span className="text-[#e25c5c]">휴진 (응급 예약 문의 가능)</span>
              </li>
            </ul>
          </div>

          {/* Quick Links & Information */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#ffdea5] uppercase tracking-wider">
              QUICK MENU &amp; LOCATION
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <button onClick={onOpenPhilosophy} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white">
                병원 철학
              </button>
              <button onClick={onOpenClinicTour} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white">
                VIP 공간 투어
              </button>
              <button onClick={onGoToBooking} className="px-3 py-1.5 rounded-lg bg-[#775a19] text-white font-bold">
                실시간 간편예약
              </button>
            </div>
            
            <div className="pt-2 text-xs text-[#efeeeb]/70 space-y-1">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#ffdea5] shrink-0 mt-0.5" />
                <span>서울특별시 강남구 압구정로 88-1, 청담 아르떼 메디컬 타워 4-5F</span>
              </p>
              <p className="text-[11px] text-[#7f7667] pl-5">
                * 압구정로데오역 3번 출구 도보 3분 • 1F VIP 무료 발렛 주차
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Medical Notice */}
        <div className="pt-8 border-t border-white/10 text-[11px] text-[#7f7667] space-y-2">
          <p className="leading-relaxed">
            청담 아르떼 치과의원 | 대표원장: 민경훈 | 사업자등록번호: 000-00-00000 | 의료기관 개설신고: 제0000-0000000호 (예시) | 전화번호: 02-0000-0000
          </p>
          <p className="leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
            [의료법 고지사항] 본 웹사이트의 모든 치료 전후 사진 및 사례는 환자분의 자발적 서면 동의 하에 게재되었으며, 동일한 조명 및 촬영 각도에서 촬영되었습니다. 모든 치과 치료는 개인의 구강 상태, 잇몸뼈 골밀도 등에 따라 치료 기간이 상이할 수 있으며, 붓기, 출혈, 일시적 시림 증상 등의 부작용이 발생할 수 있으므로 반드시 사전 정밀 진단 후 의료진과 상담이 필요합니다.
          </p>
          <div className="flex flex-col lg:flex-row items-center justify-between pt-2">
            <span>© 2026 Cheongdam Arte Dental Clinic. All Rights Reserved.</span>
            <div className="flex gap-4 mt-2 lg:mt-0 text-[10px]">
              <span className="hover:underline cursor-pointer">개인정보처리방침</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">이용약관</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">비급여 진료비 안내</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
