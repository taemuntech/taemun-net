import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141211] text-[#8C857D] py-14 border-t border-white/10 text-[13px]">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 space-y-8">
        {/* Top Info */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#C5A880] text-[#1A1817] flex items-center justify-center font-serif font-bold text-[12px]">
                온
              </div>
              <span className="text-[17px] font-bold text-white tracking-tight">
                {CLINIC_INFO.name}
              </span>
              <span className="text-[11px] text-[#C5A880] font-light">
                {CLINIC_INFO.englishName}
              </span>
            </div>
            <div className="text-[12px] text-[#A69F97]">
              {CLINIC_INFO.meaning} · {CLINIC_INFO.slogan}
            </div>
          </div>

          <div className="flex items-center gap-6 text-[12px]">
            <a href="#philosophy" className="hover:text-white transition-colors">온새미로 철학</a>
            <a href="#proportion" className="hover:text-white transition-colors">비율 시뮬레이터</a>
            <a href="#before-after" className="hover:text-white transition-colors">비포&amp;애프터</a>
            <a href="#safety" className="hover:text-white transition-colors">5대 안심선언</a>
            <a href="#location" className="hover:text-white transition-colors">오시는 길</a>
          </div>
        </div>

        {/* Business and Medical Disclaimer */}
        <div className="space-y-3 text-[12px] leading-relaxed text-[#736C65]">
          <div>
            상호: {CLINIC_INFO.name} | 대표자: 강민우 (샘플용) | 사업자등록번호: {CLINIC_INFO.registrationNumber} | 대표전화: {CLINIC_INFO.tel}
          </div>
          <div>
            소재지: {CLINIC_INFO.address} | 의료기관 구분: 의원 (성형외과)
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[#8C857D] text-[11px] leading-relaxed">
            <strong className="text-[#C5A880]">의료광고 심의 및 주의사항 고지:</strong> 본 웹사이트의 모든 수술 및 시술 전후 사진은 환자 동의를 받은 가상 샘플 데이터이며, 동일한 조건에서 촬영되었습니다. 모든 성형수술은 개인의 체질과 상태에 따라 출혈, 감염, 염증, 비대칭, 흉터 등의 부작용이 발생할 수 있으므로 반드시 전문의와의 충분한 상담을 거친 후 수술을 결정하시기 바랍니다.
          </div>
        </div>

        {/* Studio Disclaimer */}
        <div className="pt-4 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between text-[11px] text-[#635C56] gap-2">
          <div>
            © 2026 {CLINIC_INFO.name}. All rights reserved. Designed by TAEMUN DEV STUDIO.
          </div>
          <div className="flex items-center gap-1 text-[#8C857D]">
            <span>본 웹사이트는 포트폴리오 시연용 가상 데모 사이트입니다.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
