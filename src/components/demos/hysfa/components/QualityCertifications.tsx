"use client";

import React, { useState } from 'react';
import { ShieldCheck, Check } from 'lucide-react';

interface QualityCertificationsProps {
  currentLang: 'KR' | 'EN';
}

export const QualityCertifications: React.FC<QualityCertificationsProps> = ({ currentLang }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      num: 1,
      title: currentLang === 'KR' ? '원자재 수입검사' : 'Raw Material QA',
      desc: currentLang === 'KR' ? 'UHP 튜빙 및 밸브 순도 전수 시험' : '100% purity & surface roughness test on UHP tubes and valves',
      detail: 'Electropolished (EP) Ra ≤ 0.13µm verification, particle count analysis, metal contaminant inspection.',
    },
    {
      num: 2,
      title: currentLang === 'KR' ? '정밀 조립·용접' : 'Precision Assembly',
      desc: currentLang === 'KR' ? '오비탈 자동 용접 및 클린룸 조립' : 'Automated orbital welding under Class 10/100 environment',
      detail: 'Closed chamber orbital argon purge welding ensuring 0-oxygen heat tinting and flawless weld bead geometry.',
    },
    {
      num: 3,
      title: currentLang === 'KR' ? '헬륨 리크 검사' : 'Helium Leak Detection',
      desc: currentLang === 'KR' ? '1x10⁻⁹ mbar·l/s 미세 누출 검출' : 'Mass spectrometer leak detection at 1x10⁻⁹ mbar·l/s',
      detail: 'Vacuum bell jar enclosure helium mass spectrometry detecting molecular micro-cracks before dispatch.',
    },
    {
      num: 4,
      title: currentLang === 'KR' ? 'S/W 통합 시운전' : 'S/W Integrated Burn-In',
      desc: currentLang === 'KR' ? '72시간 무중단 신뢰성 드라이런' : '72-hour continuous endurance dry-run with mock fab load',
      detail: 'Endurance testing across 25,000 continuous cycle movements without latency, zero fault buffer overruns.',
    },
    {
      num: 5,
      title: currentLang === 'KR' ? '출하 및 현장 셋업' : 'Delivery & Fab Hookup',
      desc: currentLang === 'KR' ? '진공 패킹 및 고객사 Fab 직설치' : 'Double nitrogen vacuum packaging and on-site hookup',
      detail: 'Class 10 dual polyethylene purged packaging, temperature/shock loggers, and on-site fab engineers deployment.',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-[#c3c6d6]/30" id="quality">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-[11px] text-[#003d9b] font-semibold uppercase tracking-widest">
            TOTAL QUALITY ASSURANCE
          </span>
          <h2 className="text-[28px] lg:text-[36px] font-bold text-[#131b2e] tracking-tight">
            {currentLang === 'KR' ? '세계적인 경쟁력을 갖춘 품질경영 및 글로벌 인증' : 'World-Class Quality Assurance & Global Standards'}
          </h2>
          <p className="text-[15px] text-[#434654] leading-relaxed">
            {currentLang === 'KR'
              ? '엄격한 반도체 Fab 기준에 부합하는 체계적인 품질 검증과 글로벌 표준 규격을 지속적으로 유지 관리합니다.'
              : 'Rigorous quality verifications meeting global tier-1 fab benchmarks and international compliance frameworks.'}
          </p>
        </div>

        {/* Certifications Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* ISO 9001 */}
          <div className="p-8 rounded-xl bg-[#faf8ff] border border-[#c3c6d6]/40 hover:border-[#003d9b] transition-all duration-200 space-y-4 shadow-2xs hover:shadow-sm">
            <div className="w-14 h-14 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#003d9b] font-bold text-[20px] font-sans">
              ISO
            </div>
            <h3 className="text-[18px] font-bold text-[#131b2e]">ISO 9001:2015</h3>
            <p className="text-[14px] text-[#434654] leading-relaxed">
              {currentLang === 'KR'
                ? '반도체 FA 장비 및 가스 공급 장치의 설계, 제작, 설치 전 공정에 걸친 글로벌 품질경영시스템 인증.'
                : 'Certified quality management across design, manufacture, and installation of semiconductor FA and gas machinery.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[#737685]">
              <span className="material-symbols-outlined text-[#003d9b] text-[18px]">verified</span>
              <span>{currentLang === 'KR' ? '품질 무결함 5단계 전수 검사 시스템' : '5-Step Zero-Defect Inspection'}</span>
            </div>
          </div>

          {/* ISO 14001 */}
          <div className="p-8 rounded-xl bg-[#faf8ff] border border-[#c3c6d6]/40 hover:border-[#003d9b] transition-all duration-200 space-y-4 shadow-2xs hover:shadow-sm">
            <div className="w-14 h-14 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#003d9b] font-bold text-[20px] font-sans">
              ENV
            </div>
            <h3 className="text-[18px] font-bold text-[#131b2e]">ISO 14001:2015</h3>
            <p className="text-[14px] text-[#434654] leading-relaxed">
              {currentLang === 'KR'
                ? '친환경 공정 설계 및 유해가스 제어, 자원 절감형 스마트 팩토리 인프라 환경경영시스템 인증.'
                : 'Environmental management certifications for green fabrication, toxic gas mitigation, and energy-optimized smart manufacturing.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[#737685]">
              <span className="material-symbols-outlined text-[#003d9b] text-[18px]">verified</span>
              <span>{currentLang === 'KR' ? '친환경 UHP 배관 클리닝 인증' : 'Eco-Certified UHP Line Cleanliness'}</span>
            </div>
          </div>

          {/* Cleanroom Safe Standard */}
          <div className="p-8 rounded-xl bg-[#faf8ff] border border-[#c3c6d6]/40 hover:border-[#003d9b] transition-all duration-200 space-y-4 shadow-2xs hover:shadow-sm">
            <div className="w-14 h-14 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#003d9b] font-bold text-[18px] font-sans">
              SAFE
            </div>
            <h3 className="text-[18px] font-bold text-[#131b2e]">
              {currentLang === 'KR' ? '클린룸 설비 안전 규격' : 'Fab Equipment Safety Specs'}
            </h3>
            <p className="text-[14px] text-[#434654] leading-relaxed">
              {currentLang === 'KR'
                ? '국내외 Tier-1 반도체 Fab 기준 안전 가이드라인 준수 및 가스 누출 방폭 설계 인증 획득.'
                : 'Fully compliant with Tier-1 semiconductor safety guidelines, explosion-proof isolation, and seismic anchoring.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[#737685]">
              <span className="material-symbols-outlined text-[#003d9b] text-[18px]">verified</span>
              <span>{currentLang === 'KR' ? '방폭(Ex) 및 SEMI S2/S8 적합성 평가 완료' : 'Explosion-proof (Ex) & SEMI S2/S8 Evaluated'}</span>
            </div>
          </div>
        </div>

        {/* 5-Step Process Pipeline */}
        <div className="bg-[#f2f3ff] p-8 rounded-xl border border-[#c3c6d6]/40">
          <h4 className="text-[18px] lg:text-[20px] font-bold text-[#131b2e] mb-6 text-center">
            {currentLang === 'KR' ? '한양시스템 엄격 5단계 전수 검사 파이프라인' : 'HANYANGSYSTEM 5-Stage Total QA Pipeline'}
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative">
            {steps.map((step) => {
              const isSelected = activeStep === step.num;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(isSelected ? null : step.num)}
                  className={`bg-white p-4 rounded-lg border transition-all duration-200 text-center space-y-2 cursor-pointer ${
                    isSelected
                      ? 'border-[#0052cc] shadow-md ring-2 ring-[#0052cc]/20'
                      : 'border-[#c3c6d6]/40 hover:border-[#003d9b] shadow-2xs'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#0052cc] text-white font-mono font-bold mx-auto flex items-center justify-center text-[13px]">
                    {step.num}
                  </div>
                  <div className="text-[14px] font-bold text-[#131b2e]">{step.title}</div>
                  <p className="text-[12px] text-[#434654]">{step.desc}</p>
                  {isSelected && (
                    <div className="pt-2 text-[11px] text-[#003d9b] font-medium border-t border-slate-100 animate-fadeIn">
                      {step.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-4 text-[12px] text-[#737685]">
            {currentLang === 'KR' ? '※ 각 단계를 클릭하시면 세부 공정 검사 기준을 확인할 수 있습니다.' : '※ Click each stage to inspect detailed quality gate parameters.'}
          </div>
        </div>
      </div>
    </section>
  );
};
