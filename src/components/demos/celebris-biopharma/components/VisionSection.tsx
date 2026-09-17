import React from 'react';
import { Award, Building2, TrendingUp } from 'lucide-react';

export const VisionSection: React.FC = () => {
  return (
    <section className="scroll-mt-[calc(5rem+var(--sample-bar-h,0px))] py-20 bg-white border-t border-[#c4c5d5]/30" id="vision">
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
              CELEBRIS BIOPHARMA는 기술특례 상장 준비를 시작으로 송도 cGMP 연구생산 캠퍼스와 해외 R&D 센터를 연계하는 듀얼 허브를 만들어 갑니다. 기존 표적치료제의 한계를 넘어서는 단백질 분해 플랫폼과 차세대 접합 기술을 결합하여, 암 환자의 미충족 의료 수요를 해결하는 혁신 신약을 개발하는 것이 목표입니다.
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
            {/* 실존 거래소·평가기관·주관사 이름을 지어낸 회사에 붙이지 않는다 — 자리만 남기고 「예시」로 적는다 */}
            <div className="text-[20px] font-bold text-[#00288e] mb-1 [word-break:keep-all]">
              기술특례 상장 준비 단계 (예시)
            </div>
            <div className="text-[13px] text-[#444653] [word-break:keep-all]">
              기술성 평가 등급 표기 자리 — 실제 심사·등급이 아닙니다
            </div>
            <div className="mt-4 pt-3 border-t border-[#c4c5d5]/30 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-code-mono text-[12px] text-[#757684]">
              <span>상장 주관사</span>
              <span className="text-[#0b1c30] font-semibold">주관 증권사 표기 자리 (예시)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
