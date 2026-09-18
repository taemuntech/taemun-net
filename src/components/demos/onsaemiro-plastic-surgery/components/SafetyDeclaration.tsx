import React from 'react';
import { SAFETY_PILLARS } from '../data/clinicData';

interface SafetyDeclarationProps {
  onOpenSafetyModal: () => void;
}

export const SafetyDeclaration: React.FC<SafetyDeclarationProps> = ({ onOpenSafetyModal }) => {
  return (
    <section className="w-full py-20 bg-[#fdf9f5] relative" id="safety-declaration">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#725b38] font-bold">
            PATIENT INTEGRITY FIRST
          </span>
          <h2 className="font-serif text-[28px] lg:text-[34px] text-[#1c1c19]">
            온새미로 5대 환자 안심 시스템
          </h2>
          <p className="text-[14px] leading-relaxed text-[#4d463c]">
            의료의 기본은 안전입니다. 감염 관리와 전문의 실명 책임제를 원칙으로 수술 환경을 운영합니다.
          </p>
        </div>

        {/* 5 Security Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAFETY_PILLARS.map((pillar, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 ${
                index === 4 ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#725b38]/10 text-[#725b38] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">{pillar.icon}</span>
                  </div>
                  <span className="font-mono text-[#725b38] font-bold text-[12px]">
                    {pillar.pillarNumber}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-[18px] font-semibold text-[#1c1c19]">
                    {pillar.title}
                  </h3>
                  <p className="text-[13px] text-[#4d463c] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f1ede9]">
                <span className="inline-flex items-center gap-1.5 text-[12px] text-[#725b38] font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>{pillar.guarantee}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner for Charter modal */}
        <div className="mt-12 p-6 lg:p-8 rounded-2xl bg-[#f1ede9] border border-[#c5a880]/30 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#725b38] text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[26px]">gavel</span>
            </div>
            <div>
              <h4 className="text-[16px] font-serif font-semibold text-[#1c1c19]">
                온새미로 환자 권리 장전 &amp; 안심 서약서
              </h4>
              <p className="text-[13px] text-[#4d463c]">
                상담한 의사가 직접 집도한다는 실명 집도 원칙과 안전 관리 서약 전문을 공개합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenSafetyModal}
            className="px-6 py-3 rounded-full bg-[#1A1817] text-[#fdf9f5] text-[13px] font-semibold hover:bg-[#2E2A27] transition-all shrink-0 cursor-pointer shadow-md flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[#fedeb2] text-[18px]">menu_book</span>
            <span>안심서약서 전문 열람</span>
          </button>
        </div>
      </div>
    </section>
  );
};
