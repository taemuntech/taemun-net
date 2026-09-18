import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

interface FooterProps {
  /** 정책 링크 — 샘플이라 문서가 없다. 누르면 태문 샘플 안내를 연다(엉뚱한 곳으로 스크롤시키지 않는다) */
  onOpenPolicy: (featureName: string) => void;
}

const POLICY_LINKS = ['개인정보처리방침', '비급여 진료비 안내', '환자의 권리와 의무'];

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  return (
    <footer className="bg-[#00110b] text-[#eae8e5] border-t border-[#0d2820] py-14">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#0d2820]">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/demo-media/the-noble-dermatology/the-noble-dermatology-07.png"
                alt="The Noble Cheongdam Logo"
                className="h-8 w-auto invert brightness-200"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-medium text-[#ffffff] tracking-tight">THE NOBLE</span>
                <span className="text-[10px] text-[#ffdea7] tracking-[0.25em] uppercase font-semibold">
                  Cheongdam Medical
                </span>
              </div>
            </div>
            <p className="text-xs text-[#c1c8c4] leading-relaxed max-w-sm mb-4 break-keep">
              국내 명문대(예시) 의대 출신 피부과 전문의 3인의 1:1 맞춤 진료와 1회용 멸균 소모품 현장 확인, 전
              객실 독립 프라이빗 스위트로 안정적인 안티에이징 진료 환경을 만듭니다.
            </p>
            <div className="text-xs text-[#c1c8c4]">
              <span className="text-[#ffffff] font-medium">VIP 컨시어지 직통:</span> {CLINIC_INFO.phone}
            </div>
          </div>

          {/* Legal / Medical Registrations — 지어낸 개설신고번호·의료광고 심의번호는 자리표시로 바꿨다 */}
          <div className="lg:col-span-7 space-y-2 text-xs text-[#c1c8c4] leading-relaxed">
            <div className="text-[#ffffff] font-medium mb-1">의료기관 법적 고시 및 사업자 정보 (표기 예시)</div>
            <div className="break-keep">
              상호명: 더 노블 청담 피부과의원 | 대표자: 김도현 | 사업자등록번호: 000-00-00000 (예시)
            </div>
            <div className="break-keep">
              의료기관 개설신고번호: 표기 자리 (예시) | 소재지: 서울특별시 강남구 압구정로 412 더 노블 메디컬
              타워 4, 5층
            </div>
            <div className="pt-2 text-[11px] text-[#9aa39e] leading-normal border-t border-[#0d2820] break-keep">
              * 시술 결과와 유지 기간에는 개개인의 피부 상태에 따라 차이가 있으며, 홍반·멍·부기 등 부작용이
              발생할 수 있습니다. 시술 전 담당 피부과 전문의와 충분히 상담하시기 바랍니다.
            </div>
            <div className="text-[11px] text-[#9aa39e] leading-normal break-keep"><SampleFooterNote /></div>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[#727975]">
          <div className="flex flex-wrap items-center justify-center gap-x-4">
            {POLICY_LINKS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => onOpenPolicy(label)}
                className="min-h-11 hover:text-[#ffffff] transition-colors"
              >
                {label}
              </button>
            ))}
            <span className="text-[#424845]">의료광고 심의번호: 표기 자리 (예시)</span>
          </div>
          <div>© {new Date().getFullYear()} The Noble Cheongdam Medical Clinic. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};
