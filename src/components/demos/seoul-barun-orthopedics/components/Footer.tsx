import React from 'react';
import { CLINIC_IMAGES } from '../data/clinicData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#1A1C1A] text-[#EFEEEB] pt-12 pb-8 border-t border-[#2F312F]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#2F312F]">
          {/* Left Column: Brand & Mission */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={CLINIC_IMAGES.logo}
                alt="Seoul Barun Madi Logo"
                className="h-8 w-auto brightness-200"
               referrerPolicy="no-referrer" />
              <div>
                <div className="text-base lg:text-lg font-bold text-white tracking-tight">
                  서울 바른마디 척추관절 정형외과
                </div>
                <div className="text-[10px] text-[#A5B0A4] tracking-wider uppercase">
                  Seoul Barun Madi Orthopedic Clinic
                </div>
              </div>
            </div>

            <p className="text-xs lg:text-sm text-[#A5B0A4] max-w-md leading-relaxed">
              정형외과 전문의의 원칙 진료, 과잉진료 없는 비수술 중심 척추·관절 네트워크. 
              정밀 초음파, C-Arm 유도 신경차단술, 그리고 100평 전용 도수재활센터를 통해 
              환자의 관절과 척추를 수술 없이 건강하게 지켜냅니다.
            </p>

            <div className="text-xs text-[#8A9589] space-y-1">
              <div>
                <strong>의료기관명:</strong> 서울바른마디정형외과의원 | <strong>대표원장:</strong> 박진우, 최윤석
              </div>
              <div>
                <strong>사업자등록번호:</strong> 000-00-00000 (샘플용) | <strong>의료기관 개설신고번호:</strong> 제0000-000000호 (예시)
              </div>
              <div className="bg-white/5 p-2 rounded text-[#95F8A7] text-[11px] mb-2">
                이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 의료기관이 아닙니다.
              </div>
              <div>
                <strong>주소:</strong> 서울특별시 서초구 서초중앙로 142 바른마디 메디컬타워 2~5층 전관 (교대역 4번출구)
              </div>
            </div>
          </div>

          {/* Center Column: Contact & Hours */}
          <div className="lg:col-span-3 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-white">진료 및 예약 문의</div>
            <div className="text-2xl font-bold text-[#95F8A7] tracking-tight">02-0000-0000</div>
            <div className="text-xs text-[#A5B0A4] space-y-1 pt-1">
              <p>평일: 09:00 - 18:30</p>
              <p className="text-[#95F8A7] font-semibold">화·목 (야간진료): 09:00 - 20:00</p>
              <p>토요일: 09:00 - 14:00 (점심시간 없음)</p>
              <p>점심시간: 13:00 - 14:00 (평일)</p>
              <p className="text-[#8A9589] text-[11px] pt-1">일요일 및 공휴일 휴진</p>
            </div>
          </div>

          {/* Right Column: Policies & Trust */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">환자 권리 &amp; 비급여 안내</div>
            <div className="flex flex-col space-y-2 text-xs text-[#A5B0A4]">
              <a href="#about" className="hover:text-white transition-colors">
                비급여 진료비 항목 고지
              </a>
              <a href="#medical-staff" className="hover:text-white transition-colors">
                의료진 윤리 규정 및 환자권리장전
              </a>
              <a href="#fast-track-booking" className="hover:text-white transition-colors">
                개인정보 처리방침 (의료정보 보호)
              </a>
              <a href="#self-diagnosis" className="hover:text-white transition-colors">
                영상정보처리기기 운영 관리 방침
              </a>
            </div>
          </div>
        </div>

        {/* Copyright sub-bar */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between text-[11px] text-[#8A9589] gap-2">
          <div>
            &copy; {new Date().getFullYear()} SEOUL BARUN MADI ORTHOPEDIC CLINIC. ALL RIGHTS RESERVED.
          </div>
          <div className="text-center lg:text-right">
            본 사이트의 모든 의료 정보 및 콘텐츠는 의료법을 준수하여 작성되었습니다.
          </div>
        </div>
      </div>
    </footer>
  );
};
