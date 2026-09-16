import React from 'react';
import { Zap, Sparkles, Microscope, Award, FileText, Phone } from 'lucide-react';

interface TopBarProps {
  onOpenDeliveryCheck: () => void;
  onOpenDiagnosis: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenDeliveryCheck, onOpenDiagnosis }) => {
  return (
    <div className="w-full bg-[#006948] text-white border-b border-[#00855d]/30 text-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-2 flex flex-col lg:flex-row items-center justify-between gap-1.5 font-medium">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#006948] text-[11px] font-bold animate-pulse shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-[#006948]" />
          </span>
          <span className="text-white text-[13px]">
            지금 주문하면 <strong className="underline decoration-[#85f8c4] underline-offset-2 font-bold">오늘 저녁 8시 전 도착!</strong>
          </span>
          <span className="hidden lg:inline-block text-[#85f8c4] opacity-60">|</span>
          <button
            onClick={onOpenDeliveryCheck}
            className="hidden lg:inline-flex items-center text-[#85f8c4] hover:text-white transition-colors underline cursor-pointer text-xs font-semibold"
          >
            [오늘드림 가능지역 조회]
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-6 text-[12px] text-white/90">
          <button
            onClick={onOpenDiagnosis}
            className="hover:text-[#85f8c4] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
          >
            <Microscope className="w-3.5 h-3.5" /> 피부진단 테스트
          </button>
          <a href="#ranking-section" className="hover:text-[#85f8c4] transition-colors flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> 뷰티 어워즈 2026
          </a>
          <a href="#formula-inspector" className="hover:text-[#85f8c4] transition-colors flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> 전성분 사전
          </a>
          <button
            onClick={() => alert('회원 혜택: 신규 가입 시 15% 웰컴 쿠폰 & 3만원 이상 무료배송')}
            className="hover:text-[#85f8c4] transition-colors"
          >
            회원혜택
          </button>
          <a href="tel:1588-0000" className="hover:text-[#85f8c4] transition-colors flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" /> 고객센터: 1588-0000
          </a>
        </div>
      </div>
    </div>
  );
};
