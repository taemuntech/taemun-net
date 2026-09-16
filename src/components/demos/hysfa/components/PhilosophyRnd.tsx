"use client";

import React from 'react';
import { Lightbulb, Handshake, ChevronRight, CheckCircle2 } from 'lucide-react';

interface PhilosophyRndProps {
  currentLang: 'KR' | 'EN';
  onOpenConsultation: () => void;
}

export const PhilosophyRnd: React.FC<PhilosophyRndProps> = ({ currentLang, onOpenConsultation }) => {
  return (
    <section className="py-24 bg-[#f2f3ff] border-b border-[#c3c6d6]/30" id="company">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Philosophy Branding */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#003d9b] font-mono text-[11px] uppercase tracking-widest font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003d9b]"></span>
              <span>CORPORATE PHILOSOPHY &amp; VISION</span>
            </div>

            <h2 className="text-[28px] lg:text-[36px] text-[#131b2e] font-bold leading-tight tracking-tight">
              {currentLang === 'KR' ? (
                <>
                  “함께라면 행복한 회사,<br />
                  함께라서 행복한 회사”
                </>
              ) : (
                <>
                  “A company joyful together,<br />
                  A partnership thriving together”
                </>
              )}
            </h2>

            <p className="text-[15px] lg:text-[16px] text-[#434654] leading-relaxed">
              {currentLang === 'KR'
                ? '한양시스템은 기술을 중심으로 세계적인 경쟁력을 갖춘 강한 회사를 지향합니다. 단순한 장비 제작을 넘어, 사람과 기술이 공존하며 고객과 임직원이 함께 성장하는 지속 가능한 파트너십을 창출합니다.'
                : 'Driven by technology, HANYANGSYSTEM aspires to build a globally competitive enterprise where engineering and humanity coalesce into enduring, collaborative growth.'}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#c3c6d6]/40 shadow-xs">
                <span className="material-symbols-outlined text-[#003d9b] text-[26px] p-2.5 bg-[#d2e0fe] rounded-lg shrink-0">
                  lightbulb
                </span>
                <div>
                  <h4 className="text-[16px] font-bold text-[#131b2e]">
                    {currentLang === 'KR' ? '도전과 기술 혁신' : 'Challenge & Innovation'}
                  </h4>
                  <p className="text-[14px] text-[#434654] mt-0.5">
                    {currentLang === 'KR'
                      ? '외산 설비 국산화 및 독자적인 클린룸 제어 알고리즘 특허 확보'
                      : 'Domestic localization of imported fab equipment and patented cleanroom control algorithms.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#c3c6d6]/40 shadow-xs">
                <span className="material-symbols-outlined text-[#003d9b] text-[26px] p-2.5 bg-[#d2e0fe] rounded-lg shrink-0">
                  handshake
                </span>
                <div>
                  <h4 className="text-[16px] font-bold text-[#131b2e]">
                    {currentLang === 'KR' ? '신뢰 기반 동반 성장' : 'Trust-Driven Growth'}
                  </h4>
                  <p className="text-[14px] text-[#434654] mt-0.5">
                    {currentLang === 'KR'
                      ? '국내외 주요 반도체 팹과 장기적 납품 및 기술 유지보수 협력'
                      : 'Long-term equipment supply and lifecycle maintenance contracts with tier-1 semiconductor fabs.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: R&D Core Competencies (Technical Breakdown) */}
          <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-xl border border-[#c3c6d6]/40 shadow-xs space-y-8" id="rnd">
            <div>
              <span className="font-mono text-[11px] text-[#003d9b] font-semibold uppercase tracking-wider">
                R&amp;D CENTER CAPABILITIES
              </span>
              <h3 className="text-[24px] lg:text-[28px] text-[#131b2e] font-bold mt-1 tracking-tight">
                {currentLang === 'KR' ? '극한의 반도체 공정을 견디는 초정밀 R&D 역량' : 'Ultra-Precision R&D Built for Extreme Fab Limits'}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CORE TECH 01 */}
              <div className="p-5 rounded-lg bg-[#faf8ff] border border-[#c3c6d6]/30 space-y-2 hover:border-[#0052cc] transition-colors">
                <div className="flex items-center justify-between text-[#003d9b]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#737685] font-semibold">
                    CORE TECH 01
                  </span>
                  <span className="material-symbols-outlined text-[22px]">cloud_download</span>
                </div>
                <h5 className="text-[16px] font-bold text-[#131b2e]">
                  {currentLang === 'KR' ? '초정밀 모션 제어 알고리즘' : 'Precision Motion Control'}
                </h5>
                <p className="text-[13px] text-[#434654] leading-relaxed">
                  {currentLang === 'KR'
                    ? '진동 억제 제어 기술을 통해 나노 단위 고정밀 웨이퍼 핸들링 및 전복 방지 시스템 구현.'
                    : 'Nanometer-class anti-vibration motion control algorithms preventing wafer tipping and shear damage.'}
                </p>
              </div>

              {/* CORE TECH 02 */}
              <div className="p-5 rounded-lg bg-[#faf8ff] border border-[#c3c6d6]/30 space-y-2 hover:border-[#0052cc] transition-colors">
                <div className="flex items-center justify-between text-[#003d9b]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#737685] font-semibold">
                    CORE TECH 02
                  </span>
                  <span className="material-symbols-outlined text-[22px]">shield</span>
                </div>
                <h5 className="text-[16px] font-bold text-[#131b2e]">
                  {currentLang === 'KR' ? 'UHP 가스 누출 4중 세이프티' : '4-Tier UHP Gas Safety'}
                </h5>
                <p className="text-[13px] text-[#434654] leading-relaxed">
                  {currentLang === 'KR'
                    ? '미세 누출 감지 센서 및 화재 차단 밸브의 밀리초(ms) 단위 자동 긴급 셧다운 프로토콜.'
                    : 'Millisecond-scale automated emergency shutdown triggered by ultra-trace sniffer sensors and fire interlocks.'}
                </p>
              </div>

              {/* CORE TECH 03 */}
              <div className="p-5 rounded-lg bg-[#faf8ff] border border-[#c3c6d6]/30 space-y-2 hover:border-[#0052cc] transition-colors">
                <div className="flex items-center justify-between text-[#003d9b]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#737685] font-semibold">
                    CORE TECH 03
                  </span>
                  <span className="material-symbols-outlined text-[22px]">cleaning_services</span>
                </div>
                <h5 className="text-[16px] font-bold text-[#131b2e]">
                  {currentLang === 'KR' ? '클린룸 환경 Class 10 보장' : 'Guaranteed Class 10 Cleanroom'}
                </h5>
                <p className="text-[13px] text-[#434654] leading-relaxed">
                  {currentLang === 'KR'
                    ? '설비 구동 시 파티클 발생을 원천 차단하는 유체 다이나믹 배기 및 항온 항습 내부 제어.'
                    : 'Computational fluid dynamic exhaust design that captures particulate emissions to guarantee Class 10 clean.'}
                </p>
              </div>

              {/* CORE TECH 04 */}
              <div className="p-5 rounded-lg bg-[#faf8ff] border border-[#c3c6d6]/30 space-y-2 hover:border-[#0052cc] transition-colors">
                <div className="flex items-center justify-between text-[#003d9b]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#737685] font-semibold">
                    CORE TECH 04
                  </span>
                  <span className="material-symbols-outlined text-[22px]">memory</span>
                </div>
                <h5 className="text-[16px] font-bold text-[#131b2e]">
                  {currentLang === 'KR' ? '자체 개발 PLC & SCADA S/W' : 'Proprietary PLC & SCADA S/W'}
                </h5>
                <p className="text-[13px] text-[#434654] leading-relaxed">
                  {currentLang === 'KR'
                    ? '고객사 전산망(MES/SECS-GEM) 표준 인터페이스를 완벽 준수하는 자체 국산화 프레임워크.'
                    : 'Fully localized control stack seamlessly conforming to MES/SECS-GEM semiconductor communication standards.'}
                </p>
              </div>
            </div>

            {/* Bottom Micro Status Bar */}
            <div className="p-4 rounded-lg bg-[#283044] text-[#faf8ff] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#b2c5ff] text-[20px]">science</span>
                <span className="text-[14px]">
                  {currentLang === 'KR' ? '시흥 스마트 팩토리 R&D 랩 상시 가동 중' : 'Siheung Smart Factory R&D Lab Operating 24/7'}
                </span>
              </div>
              <a
                href="#consultation"
                id="rnd-link-consultation"
                className="font-mono text-[11px] text-[#b2c5ff] hover:underline uppercase tracking-wider flex items-center gap-1 font-semibold cursor-pointer"
              >
                <span>{currentLang === 'KR' ? 'R&D 프로젝트 제휴 제안' : 'Propose R&D Project'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
