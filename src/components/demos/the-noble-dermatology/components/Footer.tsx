import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00110b] text-[#eae8e5] border-t border-[#0d2820] py-14">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#0d2820]">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1XotcY4wk8Alj-m2RaDxAvug3k6p5BEHeS84aXw7SzXYw5ISSC6rEaov_Kz2cVtpopYkAlLszOgPyuUu7kuXwFjlyIPPbV6GaxOu5qXOcPhsEt77OKK471Eyr0z__L9RqZSjSaAAFpgqHXabRh6mREZ1J2kH_sjI-qmrmUE__VpU-R-GCXh9vbH0KrKAejENFR86VHY9SkR8BI0VzkkZ95AeTpvn3672RJuxogpbJj7aoVqoUb6w0sLgjs1"
                alt="The Noble Cheongdam Logo"
                className="h-8 w-auto invert brightness-200"
               referrerPolicy="no-referrer" />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-medium text-[#ffffff] tracking-tight">
                  THE NOBLE
                </span>
                <span className="text-[10px] text-[#ffdea7] tracking-[0.25em] uppercase font-semibold">
                  Cheongdam Medical
                </span>
              </div>
            </div>
            <p className="text-xs text-[#c1c8c4] leading-relaxed max-w-sm mb-4">
              국내 명문대(예시) 의대 출신 피부과 전문의 3인의 정밀한 1:1 맞춤 진료와 정품 인증 팁 인증, 그리고 전 객실 독립 프라이빗 스위트로 최상의 안티에이징 경험을 선사합니다.
            </p>
            <div className="text-xs text-[#c1c8c4]">
              <span className="text-[#ffffff] font-medium">VIP 컨시어지 직통:</span> {CLINIC_INFO.phone}
            </div>
          </div>

          {/* Legal / Medical Registrations */}
          <div className="lg:col-span-7 space-y-2 text-xs text-[#c1c8c4] leading-relaxed">
            <div className="text-[#ffffff] font-medium mb-1">의료기관 법적 고시 및 사업자 정보</div>
            <div>
              상호명: 더 노블 청담 피부과의원 | 대표자: 김도현 | 사업자등록번호: 000-00-00000 (샘플용)
            </div>
            <div>
              의료기관 개설신고번호: 제2024-3240081-34-호 | 소재지: 서울특별시 강남구 압구정로 412 더 노블 메디컬 타워 4, 5층
            </div>
            <div className="pt-2 text-[11px] text-[#727975] leading-normal border-t border-[#0d2820]">
              * 본 웹사이트에 게재된 모든 의료 정보 및 시술 설명은 의료법 제56조 및 관련 규정을 준수합니다. 개개인의 피부 체질과 기저 상태에 따라 시술 후 홍반, 멍, 부기 등 일시적 반응이 발생할 수 있으므로, 시술 전 담당 피부과 전문의와의 충분한 1:1 심층 상담이 필수적입니다.
            </div>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[#727975]">
          <div className="flex flex-wrap items-center gap-4">
            <a href="#vip-reservation" className="hover:text-[#ffffff] transition-colors">
              개인정보처리방침
            </a>
            <span>•</span>
            <a href="#signature-lifting" className="hover:text-[#ffffff] transition-colors">
              비급여 진료비 안내
            </a>
            <span>•</span>
            <a href="#philosophy" className="hover:text-[#ffffff] transition-colors">
              환자의 권리와 의무
            </a>
            <span>•</span>
            <span className="text-[#424845]">의료광고 심의필 제 2025-104-9210호</span>
          </div>
          <div>
            © {new Date().getFullYear()} The Noble Cheongdam Medical Clinic. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
