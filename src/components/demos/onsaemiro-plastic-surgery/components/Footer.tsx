import React from 'react';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

interface FooterProps {
  onOpenSafetyModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenNonReimbursableModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSafetyModal,
  onOpenPrivacyModal,
  onOpenNonReimbursableModal
}) => {
  return (
    <footer className="w-full bg-[#f7f3ef] text-[#4d463c] pt-14 pb-12 border-t border-[#d1c5b8]/40 shadow-[0_-1px_12px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-6 border-b border-[#d1c5b8]/30">
          {/* Clinic Brand & Philosophy */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-[24px] font-semibold text-[#1c1c19]">
                온새미로 성형외과의원
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#ebe7e4] text-[#725b38] text-[11px] font-bold tracking-wider">
                VIP MEDICAL SALON
              </span>
            </div>
            <p className="text-[13px] text-[#4d463c] leading-relaxed max-w-md">
              온새미로는 '가르거나 쪼개지 않은 본디 그대로의 상태'를 뜻하는 순우리말입니다. 과도한 변형이 아닌 고유한 윤곽과 골격의 조화를 존중하며, 압구정 프라이빗 스위트에서 안심 수술 환경과 맞춤형 회복 케어를 제공합니다.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[#4d463c] text-[12px] font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#725b38] text-[18px]">workspace_premium</span>
                한국인 성형외과 전문의 실명집도
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#725b38] text-[18px]">security</span>
                전담 마취통증의학과 상주
              </span>
            </div>
          </div>

          {/* Licenses & Regulatory Information */}
          <div className="lg:col-span-4 flex flex-col gap-2 text-[#4d463c] text-[12px] leading-relaxed">
            <span className="font-serif text-[15px] font-semibold text-[#1c1c19] mb-1">
              의료기관 정식 인허가 및 전문의 면허 정보
            </span>
            <div>상호명: 온새미로성형외과의원 | 대표원장: 온새미로 의료진 대표</div>
            <div>의료기관 개설신고번호: 제 0000-0000000-0000호 (예시)</div>
            <div>성형외과 전문의 면허번호 표기 자리 (예시)</div>
            <div>사업자등록번호: 000-00-00000 (샘플용) | 전화: 02-0000-0000</div>
            <div>주소: 서울특별시 강남구 압구정로 000 온새미로 메디컬 타워 4F-7F (압구정로데오역 5번 출구)</div>
          </div>

          {/* VIP Desk Quick Hours */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-serif text-[15px] font-semibold text-[#1c1c19] mb-1">
              VIP 안내데스크
            </span>
            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#d1c5b8]/30 flex flex-col gap-1.5 shadow-sm text-[12px]">
              <span className="text-[11px] uppercase tracking-wider text-[#725b38] font-bold">
                진료 및 상담 시간
              </span>
              <div className="text-[#1c1c19] flex justify-between">
                <span>평일 (월-금)</span>
                <span className="font-semibold">10:00 - 19:00</span>
              </div>
              <div className="text-[#1c1c19] flex justify-between">
                <span>토요일 (VIP 집중예약)</span>
                <span className="font-semibold">10:00 - 17:00</span>
              </div>
              <div className="text-[#4d463c] flex justify-between">
                <span>일요일 및 공휴일</span>
                <span className="font-medium text-[#ba1a1a]">프라이빗 예약제 휴진</span>
              </div>
            </div>
            <div className="text-[11px] text-[#4d463c]">
              발렛 파킹(Valet Parking) 전담 의전팀 상시 대기
            </div>
          </div>
        </div>

        {/* Footer Navigation & Copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-[12px] text-[#4d463c]">
          <div className="flex flex-wrap items-center gap-x-6">
            <button
              onClick={onOpenSafetyModal}
              className="min-h-[44px] inline-flex items-center hover:text-[#725b38] transition-colors cursor-pointer"
            >
              환자권리장전
            </button>
            <button
              onClick={onOpenPrivacyModal}
              className="min-h-[44px] inline-flex items-center hover:text-[#725b38] transition-colors font-medium cursor-pointer"
            >
              개인정보처리방침
            </button>
            <button
              onClick={onOpenNonReimbursableModal}
              className="min-h-[44px] inline-flex items-center hover:text-[#725b38] transition-colors cursor-pointer"
            >
              비급여 진료비 고지
            </button>
            <a href="#location-concierge" className="min-h-[44px] inline-flex items-center hover:text-[#725b38] transition-colors">
              오시는 길 및 주차안내
            </a>
          </div>
          <div className="text-right">
            <span>© 2026 ONSAEMIRO AESTHETIC &amp; PLASTIC SURGERY. All Rights Reserved.</span>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-3.5 rounded-lg bg-[#ebe7e4]/70 text-center text-[11px] text-[#4d463c] leading-normal border border-[#d1c5b8]/30">
          [법적 고지사항] 본 웹사이트는 포트폴리오용 가상 병원 샘플 데모이며 실제 의료기관이 아닙니다. 모든 시술 및 수술은 개인의 해부학적 특성에 따라 출혈, 감염, 염증, 신경 손상 등의 부작용이 발생할 수 있으므로 집도의와의 면밀한 1:1 상담이 필수적입니다.
        </div>
      </div>
      <p className="max-w-7xl mx-auto mt-6 px-4 text-center text-[11px] leading-relaxed opacity-60 [word-break:keep-all]"><SampleFooterNote /></p>
    </footer>
  );
};
