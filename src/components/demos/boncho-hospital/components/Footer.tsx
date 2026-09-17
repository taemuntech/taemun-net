import React from 'react';
import { HOSPITAL_IMAGES } from '../data/hospitalData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#102a20] text-[#e9e8e5] pt-14 pb-10 border-t border-[#264035]">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#264035]">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="본초 통합한방병원 엠블럼"
                className="h-9 w-auto brightness-0 invert"
                src={HOSPITAL_IMAGES.emblem}
              />
              <div>
                <div className="font-serif text-[18px] text-white font-bold">
                  본초 통합한방병원
                </div>
                <div className="text-[11px] text-[#8fab9d] tracking-widest uppercase">
                  Boncho Integrative Medicine Hospital
                </div>
              </div>
            </div>

            <p className="text-[13px] text-[#b0cdbe] leading-relaxed">
              비움과 채움의 치유 미학. 보건복지부 규격 80병상 의·한의 통합 암면역·수술재활 메디컬 센터로서 암 환자의 존엄한 회복과 일상 복귀를 온 마음으로 섬깁니다.
            </p>

            <div className="flex items-center gap-3 text-[12px] text-[#cbe9da]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>보건복지부 인증 규격 병원</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">local_pharmacy</span>
                <span>식약처 hGMP 조제 규격</span>
              </span>
            </div>
          </div>

          {/* Col 2: Clinic Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-[16px] text-white font-bold">
              진료 시간 및 입원 수속 안내
            </h4>
            <div className="text-[13px] space-y-1.5 text-[#e9e8e5]">
              <div className="flex justify-between">
                <span className="text-[#8fab9d]">평일 외래 진료</span>
                <span className="font-medium text-white">09:00 ~ 20:00 (야간진료 시행)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8fab9d]">토·일·공휴일 진료</span>
                <span className="font-medium text-white">09:00 ~ 17:00 (점심시간 없음)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8fab9d]">평일 점심시간</span>
                <span className="font-medium text-white">13:00 ~ 14:00</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#264035]">
                <span className="text-[#ffd9b4] font-semibold">365일 24시간 입원실</span>
                <span className="font-bold text-[#ffd9b4]">당직의 및 전담 간호사 24h 상주</span>
              </div>
            </div>
          </div>

          {/* Col 3: Contact & Direct Inquiries */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-[16px] text-white font-bold">
              24시간 직통 상담 &amp; 고객지원
            </h4>
            <div className="space-y-2 text-[13px]">
              <div>
                <span className="text-[#8fab9d] text-[11px] block">24시간 입원 상담 직통</span>
                <a
                  href="tel:02-0000-0000"
                  className="font-bold text-[22px] text-white hover:text-[#cbe9da] transition-colors"
                >
                  02-0000-0000
                </a>
              </div>
              <div className="text-[#b0cdbe] text-[12px] space-y-0.5">
                <p>• 외래 진료 예약: 02-0000-0000</p>
                <p>• 원무과 / 팩스: 02-0000-0000</p>
                <p>• 긴급 앰뷸런스 이송 핫라인: 010-0000-0000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Registration & Disclaimer */}
        <div className="pt-6 space-y-3 text-[11px] text-[#8fab9d] leading-relaxed">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>의료기관명: 의료법인 본초의료재단 본초통합한방병원</span>
            <span>대표자: 정원석 (의사·한의사 복수면허 전문의)</span>
            <span>사업자등록번호: 000-00-00000 (샘플용)</span>
            <span>의료기관 개설허가번호: 제0000-00000호 (예시)</span>
          </div>

          <p>
            소재지: 서울특별시 서초구 반포대로 180 (서초동, 본초빌딩 전관 1층~7층) | 개인정보보호책임자: 김세연
          </p>

          <div className="bg-white/5 p-2.5 rounded-lg text-[#cbe9da] text-[11px] mb-3 border border-[#264035]">
            [포트폴리오 가상 시안 고지] 이 웹사이트는 태문 DEV STUDIO 가 제작한 가상 브랜드 샘플입니다. 실제 의료기관이 아니며 진료 예약이나 개인정보는 일절 수집·접수되지 않습니다.
          </div>
          <p className="text-[#727974] pt-2 border-t border-[#264035]/60">
            [의료법령 준수 고지] 본 웹사이트의 모든 치료 후기, 치료법 소개 및 전후 사례는 의료법 제56조 및 동법 시행령을 준수하여 작성되었습니다. 개인의 체질과 기저 질환에 따라 치료 결과에 차이가 있을 수 있으며, 진료 전 의료진과의 충분한 상담이 필요합니다.
          </p>

          <div className="flex items-center justify-between pt-2 text-[#727974]">
            <div>© 2026 BONCHO INTEGRATIVE KOREAN MEDICINE HOSPITAL. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer">이용약관</span>
              <span className="hover:text-white cursor-pointer font-semibold text-[#8fab9d]">개인정보처리방침</span>
              <span className="hover:text-white cursor-pointer">비급여수가안내</span>
              <span className="hover:text-white cursor-pointer">환자의권리와의무</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
