import React from 'react';
import { CERTIFICATIONS, INSPECTION_STEPS } from '../data/packagingData';

export const QualityInspection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#f8f9ff] border-b border-[#c4c5d5]/30" id="yield-metrics">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold text-[#00288e] uppercase tracking-widest mb-2 font-mono">
            Zero-Defect Assurance
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-[#0b1c30] mb-4 tracking-tight">
            파운드리 생태계 인증 및 5단계 전수 검사 체계
          </h2>
          <p className="text-base text-[#444653] leading-relaxed">
            세계 유수의 파운드리 얼라이언스와 함께 검증된 99.85% 양산 수율. 출하되는 모든 기판은 5단계
            비파괴 나노 단층 검사를 거칩니다.
          </p>
        </div>

        {/* Ecosystem Alliance Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.title}
              className="p-5 bg-white rounded-xl border border-[#c4c5d5]/40 text-center flex flex-col items-center justify-center shadow-xs hover:border-[#00288e]/40 transition-colors"
            >
              <span className={`text-lg font-extrabold ${cert.color}`}>
                {cert.title}
              </span>
              <span className="text-xs text-[#757684] mt-1 font-medium">{cert.desc}</span>
            </div>
          ))}
        </div>

        {/* 5-Step Inspection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {INSPECTION_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white p-5 rounded-xl border border-[#c4c5d5]/30 flex flex-col justify-between shadow-xs hover:border-[#00288e]/30 transition-all group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#00288e] flex items-center justify-center font-mono font-bold text-sm mb-3 group-hover:bg-[#00288e] group-hover:text-white transition-colors">
                  {step.step}
                </div>
                <h4 className="text-[15px] font-bold text-[#0b1c30] mb-2 leading-snug">
                  {step.title}
                </h4>
                <p className="text-[13px] text-[#444653] leading-relaxed">{step.desc}</p>
              </div>

              <div className="font-mono text-[11px] text-[#00288e] mt-4 pt-2.5 border-t border-[#c4c5d5]/20 font-semibold flex items-center justify-between">
                <span>{step.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
