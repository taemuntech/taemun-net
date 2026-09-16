import React from 'react';
import { Award, Building2, TrendingUp } from 'lucide-react';

export const VisionSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-[#c4c5d5]/30" id="vision">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Mission Narrative */}
          <div className="lg:col-span-8">
            <div className="text-[11px] font-code-mono text-[#00288e] font-bold uppercase tracking-wider mb-2">
              Corporate Mission & Governance
            </div>
            <h2 className="text-[30px] lg:text-[36px] font-bold text-[#0b1c30] mb-4 tracking-tight leading-tight">
              환자의 생존율을 근본적으로 바꾸는<br />
              차세대 글로벌 혁신 바이오테크
            </h2>
            <p className="text-[15px] text-[#444653] leading-relaxed max-w-2xl">
              CELEBRIS BIOPHARMA는 2026년 코스닥 기술특례 상장을 필두로 송도 cGMP 연구생산 캠퍼스와 미국 보스턴 케임브리지 R&D 센터를 연계하는 글로벌 듀얼 허브를 완성합니다. 기존 표적치료제의 한계를 뛰어넘는 단백질 분해 플랫폼과 차세대 접합 기술을 결합하여 전 세계 암 환자들에게 미충족 의료 수요를 해결하는 혁신 신약을 제공하겠습니다.
            </p>
          </div>

          {/* IPO Status Card */}
          <div className="lg:col-span-4 bg-[#eff4ff]/70 p-6 rounded-xl border border-[#c4c5d5]/40 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-code-mono text-[#757684] uppercase font-semibold">
                Listing Prep Status
              </span>
              <Award className="w-4 h-4 text-[#1e40af]" />
            </div>
            <div className="text-[20px] font-bold text-[#00288e] mb-1">
              KOSDAQ 예비심사 청구
            </div>
            <div className="text-[13px] text-[#444653]">
              전문평가기관(TCB) 기술성 평가 AA/A 등급 통과 완료
            </div>
            <div className="mt-4 pt-3 border-t border-[#c4c5d5]/30 flex items-center justify-between font-code-mono text-[12px] text-[#757684]">
              <span>상장 주관사</span>
              <span className="text-[#0b1c30] font-semibold">미래에셋증권 • 한국투자증권</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
