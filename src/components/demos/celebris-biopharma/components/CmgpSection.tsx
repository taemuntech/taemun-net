import React from 'react';
import { Droplet, Gauge, ShieldCheck, Activity, CheckCircle } from 'lucide-react';
import { CLEANROOM_IMG_URL } from '../data/mockData';

export const CmgpSection: React.FC = () => {
  return (
    <section className="scroll-mt-[calc(5rem+var(--sample-bar-h,0px))] py-24 bg-white border-t border-[#c4c5d5]/30" id="infrastructure">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative & Feature Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#eff4ff] text-[#00288e] text-[12px] font-code-mono font-bold">
              <Activity className="w-4 h-4" />
              <span>GLOBAL STANDARDS FACILITY</span>
            </div>
            <p className="inline-flex items-center rounded-md bg-white border border-[#c4c5d5]/50 px-3 py-1.5 text-[12px] text-[#444653]">
              아래 시설 규모·설비 수량·공정 지표·인증 표기는 모두 화면 구성용 예시입니다.
            </p>
            <h2 className="text-[32px] lg:text-[40px] font-bold text-[#0b1c30] leading-tight tracking-tight">
              송도 cGMP R&D 캠퍼스 및<br />
              <span className="text-[#1e40af]">공정 개발(CMC) 인프라</span>
            </h2>
            <p className="text-[16px] text-[#444653] leading-relaxed">
              임상 물질의 직접 생산과 해외 규제기관(예시) 무균 밸리데이션 요건을 기준으로 설계한 싱글유즈(Single-Use) 바이오리액터와 분석 장비를 갖춘 설정입니다.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-[#eff4ff]/70 border border-[#c4c5d5]/30">
                <div className="p-2.5 rounded-lg bg-white text-[#00288e] shadow-xs shrink-0">
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#0b1c30]">
                    2,000L 싱글유즈 바이오리액터 라인
                  </h4>
                  <p className="text-[13px] text-[#444653] mt-1 leading-relaxed">
                    1회용 배양백으로 교차 오염 위험을 낮춘 무균 배양 라인 4기를 병렬 운영해 임상 1~3상 완제품을 생산하는 구성입니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-[#eff4ff]/70 border border-[#c4c5d5]/30">
                <div className="p-2.5 rounded-lg bg-white text-[#00687a] shadow-xs shrink-0">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#0b1c30]">
                    LC-MS/MS 고분해능 질량분석기 12기
                  </h4>
                  <p className="text-[13px] text-[#444653] mt-1 leading-relaxed">
                    단백질 구조 분석과 ADC 약물-항체 비율(DAR) 정량 모니터링을 지원하는 구성입니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-[#eff4ff]/70 border border-[#c4c5d5]/30">
                <div className="p-2.5 rounded-lg bg-white text-[#00563a] shadow-xs shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#0b1c30]">
                    cGMP · 무균 공정 인증 표시 자리 (예시)
                  </h4>
                  <p className="text-[13px] text-[#444653] mt-1 leading-relaxed">
                    해외 규제기관(예시) 가이드라인을 기준으로 구성한 ISO 5 등급 무균 클린룸 소개 자리입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual & Audit Results */}
          <div className="lg:col-span-7">
            {/* 768px 에서 통계 카드가 전폭으로 늘어져 비어 보이던 자리 — 태블릿(sm~lg)에서도 2열을 쓴다 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden border border-[#c4c5d5]/40 shadow-sm bg-white sm:col-span-2 lg:col-span-2 group">
                <img
                  alt="High-tech automated bioreactor and robotics liquid handling platform in cleanroom"
                  className="w-full h-72 object-cover group-hover:scale-102 transition-transform duration-500"
                  src={CLEANROOM_IMG_URL}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-md font-code-mono text-[12px] font-semibold text-[#0b1c30] border border-[#c4c5d5]/30 shadow-xs">
                  Cell Cultivation Suite 03 | High-Volume S.U.B. Line
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#eff4ff]/60 border border-[#c4c5d5]/30 hover:bg-[#eff4ff] transition-colors">
                <div className="text-[#00288e] mb-2">
                  <Activity className="w-7 h-7" />
                </div>
                <div className="text-[28px] font-bold text-[#0b1c30] mb-1 tracking-tight">
                  99.4%
                </div>
                <div className="text-[11px] font-code-mono text-[#757684] uppercase font-semibold">
                  Batch Reproducibility
                </div>
                <p className="text-[13px] text-[#444653] mt-2 leading-relaxed">
                  고순도 표적 단백질 합성·균일 정제 재현성 35회 연속 (예시 수치)
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#eff4ff]/60 border border-[#c4c5d5]/30 hover:bg-[#eff4ff] transition-colors">
                <div className="text-[#00687a] mb-2">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div className="text-[28px] font-bold text-[#0b1c30] mb-1 tracking-tight">
                  3회
                </div>
                <div className="text-[11px] font-code-mono text-[#757684] uppercase font-semibold">
                  CMC Audit Response
                </div>
                <p className="text-[13px] text-[#444653] mt-2 leading-relaxed">
                  글로벌 제약사(예시) 현장 CMC 실사 대응 이력 표기 자리 — 실제 실사 결과가 아닙니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
