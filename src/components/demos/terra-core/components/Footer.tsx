import React from 'react';
import { HardHat, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0e14] border-t border-[#30363d] text-white font-mono py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-[#21262d]">
          {/* Brand Info (Left 6 Cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-[#ff6b2b] flex items-center justify-center text-black font-black text-base">
                TC
              </div>
              <span className="font-black tracking-widest text-base text-white">
                TERRA-CORE SUBTERRANEAN ENGINEERING
              </span>
            </div>
            <p className="text-xs font-sans text-[#8b949e] max-w-md leading-relaxed">
              지상 0m부터 지하 80m 대심도까지, 초대구경 쉴드 TBM과 고수밀 토목 공법으로
              대한민국 지중 대동맥을 개척하는 가상 특수 토목 엔지니어링 포트폴리오입니다.
            </p>
          </div>

          {/* Contact & Specs (Right 6 Cols) */}
          <div className="lg:col-span-6 flex flex-col lg:items-end justify-between space-y-2 text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#ff6b2b]" />
              <span>서울특별시 강남구 테헤란로 000 (가상 연구소)</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#ff6b2b]" />
              <span>대표전화: 02-0000-0000 (예시)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#ff6b2b]" />
              <span>기술자문: contact@example.com</span>
            </div>
          </div>
        </div>

        {/* Required Standard Portfolio Notice */}
        <div className="pt-6 text-center text-xs font-sans text-[#8b949e]">
          <p className="font-semibold text-[#c9d1d9]">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
          <p className="text-[11px] text-[#6e7681] mt-1 font-mono">
            &copy; {new Date().getFullYear()} TERRA-CORE Inc. &amp; TAEMUN DEV STUDIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
