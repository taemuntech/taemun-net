import React from 'react';
import { Zap, Microscope, Award, FileText, Phone } from 'lucide-react';
import type { InfoDialogContent } from './InfoDialog';

interface TopBarProps {
  onOpenDeliveryCheck: () => void;
  onOpenDiagnosis: () => void;
  onShowInfo: (content: InfoDialogContent) => void;
}

const MEMBER_BENEFIT_INFO: InfoDialogContent = {
  title: '회원 혜택 안내 (예시 설정)',
  lines: [
    '신규 가입 시 15% 웰컴 쿠폰 1장, 3만원 이상 주문 시 배송비 무료라는 예시 정책으로 화면을 구성했습니다.',
    '등급별 적립률·생일 쿠폰·정기배송 할인처럼 실제 운영하실 혜택 구조를 그대로 넣어 드립니다.',
  ],
};

export const TopBar: React.FC<TopBarProps> = ({ onOpenDeliveryCheck, onOpenDiagnosis, onShowInfo }) => {
  return (
    <div className="w-full bg-[#006948] text-white border-b border-[#00855d]/30 text-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-2 flex flex-col lg:flex-row items-center justify-between gap-1.5 font-medium">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#006948] text-[11px] font-bold animate-pulse shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-[#006948]" />
          </span>
          <span className="text-white text-[13px]">
            오후 4시 이전 주문 시 <strong className="underline decoration-[#85f8c4] underline-offset-2 font-bold">당일 출발 (예시 정책)</strong>
          </span>
          <span className="hidden lg:inline-block text-[#85f8c4] opacity-60">|</span>
          <button
            onClick={onOpenDeliveryCheck}
            className="hidden lg:inline-flex items-center text-[#85f8c4] hover:text-white transition-colors underline cursor-pointer text-xs font-semibold"
          >
            [당일배송 가능지역 조회]
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
            <Award className="w-3.5 h-3.5" /> 루미너스 어워즈 (예시)
          </a>
          <a href="#formula-inspector" className="hover:text-[#85f8c4] transition-colors flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> 전성분 사전
          </a>
          <button
            onClick={() => onShowInfo(MEMBER_BENEFIT_INFO)}
            className="hover:text-[#85f8c4] transition-colors cursor-pointer"
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
