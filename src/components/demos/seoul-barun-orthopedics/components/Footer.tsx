import React from 'react';
import { CLINIC_IMAGES } from '../data/clinicData';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

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
              정형외과 전문의의 원칙 진료, 비수술 치료를 먼저 살피는 척추·관절 클리닉.
              정밀 초음파, C-Arm 유도 신경차단술, 그리고 100평 전용 도수재활센터로
              환자의 관절과 척추를 지키는 방향에서 치료 계획을 세웁니다.
            </p>

            <div className="text-xs text-[#8A9589] space-y-1">
              <div>
                <strong>의료기관명:</strong> 서울바른마디정형외과의원 | <strong>대표원장:</strong> 박진우, 최윤석
              </div>
              <div>
                <strong>사업자등록번호:</strong> 000-00-00000 (샘플용) | <strong>의료기관 개설신고번호:</strong> 제0000-000000호 (예시)
              </div>
              <div className="bg-white/5 p-2 rounded text-[#95F8A7] text-[11px] mb-2"><SampleFooterNote /></div>
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
            {/* 「개인정보 처리방침」·「비급여 고지」 같은 이름표는 문서로 가야 한다 —
                샘플에는 그 문서가 없어서, 실제로 가는 곳의 이름을 그대로 적는다. */}
            <div className="text-xs font-bold uppercase tracking-wider text-white">페이지 바로가기</div>
            <div className="flex flex-col space-y-1 text-xs text-[#A5B0A4]">
              <a href="#about" className="flex min-h-11 items-center hover:text-white transition-colors">
                병원 소개 &amp; 진료 원칙
              </a>
              <a href="#medical-staff" className="flex min-h-11 items-center hover:text-white transition-colors">
                의료진 소개 (예시)
              </a>
              <a href="#self-diagnosis" className="flex min-h-11 items-center hover:text-white transition-colors">
                부위별 통증 자가체크
              </a>
              <a href="#fast-track-booking" className="flex min-h-11 items-center hover:text-white transition-colors">
                당일 MRI 원스톱 예약 (시뮬레이션)
              </a>
            </div>
          </div>
        </div>

        {/* 의료광고 고지 — 나머지 의료 샘플 5종에는 있는데 이 화면에만 없었다.
            고객이 이 템플릿을 그대로 쓰면 실제 의료기관 광고가 되므로 같은 고지를 둔다. */}
        <p className="pt-6 text-[11px] text-[#8A9589] leading-relaxed break-keep">
          [의료광고 관련 고지] 의료법 제56조 제2항에 따라 이 화면에는 치료경험담·환자 후기, 시술 전후 비교 사진,
          다른 의료기관과의 비교, 치료 효과를 단정하는 표현을 싣지 않습니다. 화면의 치료 소개는 일반적인 안내이며,
          통증의 원인과 경과에는 개인차가 있고 주사·시술에 따라 출혈·감염·신경 자극 등의 부작용이 생길 수 있어
          진료 전 의료진과의 상담이 필요합니다.
        </p>

        {/* Copyright sub-bar */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between text-[11px] text-[#8A9589] gap-2">
          <div>
            &copy; {new Date().getFullYear()} SEOUL BARUN MADI ORTHOPEDIC CLINIC. ALL RIGHTS RESERVED.
          </div>
          <div className="text-center lg:text-right">
            본 화면의 의료 정보·수치·의료진 이력은 모두 샘플용 예시이며 실제 진료 정보가 아닙니다.
          </div>
        </div>
      </div>
    </footer>
  );
};
