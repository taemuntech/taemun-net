import React from 'react';
import { Scan, FileCheck, Lock } from 'lucide-react';

// 걷어낸 것: 결제대금예치 표기(법적 요건이 붙는 말), 「무결점」(단정),
// 실존 명품 하우스 두 곳을 이름째 적은 「공인 감정위원」 문구(그 하우스의 공인 감정처럼 읽힌다 — 그런 제휴는 없다),
// 「블록체인 COA」(있지도 않은 기술 주장).
export const InspectionSystem: React.FC = () => {
  return (
    <section id="inspection" className="w-full bg-[#201f1f] border-b border-[#4d4635] py-8 lg:py-14">
      <div className="w-full px-4 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold block uppercase">
              AUTHENTICITY WORKFLOW (예시)
            </span>
            <h2 className="font-serif text-xl lg:text-3xl text-[#e5e2e1] mt-1 font-medium [word-break:keep-all]">
              메종 드 럭스 3단계 검수 시스템
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[10px] text-[#99907c]">검수실 가동 표시 (예시):</span>
            <span className="inline-flex items-center gap-1.5 text-[#f2ca50] text-[11px] tracking-widest font-semibold bg-[#0e0e0e] px-3 py-1 border border-[#d4af37]/40">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping"></span>
              PARIS &amp; SEOUL ATELIER ACTIVE
            </span>
          </div>
        </div>

        {/* 3-Stage Pipeline Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Stage 1 */}
          <div className="bg-[#0e0e0e] p-5 lg:p-6 border border-[#d4af37]/40 relative group hover:border-[#f2ca50] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] text-[#f2ca50] tracking-widest font-semibold border-b border-[#f2ca50] pb-0.5">
                STAGE 01
              </span>
              <Scan className="w-5 h-5 text-[#99907c] group-hover:text-[#f2ca50] transition-colors" />
            </div>
            <h3 className="font-serif text-lg text-[#e5e2e1] mb-2 font-medium [word-break:keep-all]">
              광학 스캔 대조 (예시 공정)
            </h3>
            <p className="text-xs lg:text-sm text-[#d0c5af] mb-6 font-light leading-relaxed [word-break:keep-all]">
              가죽 결, 봉제 땀수, 금속 부자재 도금, 시리얼 각인 자간을 자체 기준표와 대조합니다. 대조 결과는
              상품마다 검수 이력에 남깁니다.
            </p>
            <div className="bg-[#1c1b1b] p-3 border border-[#4d4635] space-y-2">
              <div className="flex justify-between text-[10px] gap-2">
                <span className="text-[#99907c]">대조 일치도 (예시)</span>
                <span className="text-[#f2ca50] font-bold">99.98% MATCH</span>
              </div>
              <div className="w-full bg-[#353534] h-1.5 overflow-hidden">
                <div className="bg-[#f2ca50] h-full w-[99.98%]"></div>
              </div>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-[#0e0e0e] p-5 lg:p-6 border border-[#d4af37]/40 relative group hover:border-[#f2ca50] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] text-[#f2ca50] tracking-widest font-semibold border-b border-[#f2ca50] pb-0.5">
                STAGE 02
              </span>
              <FileCheck className="w-5 h-5 text-[#99907c] group-hover:text-[#f2ca50] transition-colors" />
            </div>
            <h3 className="font-serif text-lg text-[#e5e2e1] mb-2 font-medium [word-break:keep-all]">
              자체 감정팀 2차 실물 검수
            </h3>
            <p className="text-xs lg:text-sm text-[#d0c5af] mb-6 font-light leading-relaxed [word-break:keep-all]">
              메종 드 럭스 소속 감정 담당 2인이 매입 인보이스와 실물의 촉감·부자재 각인을 교차로 대조합니다.
              특정 브랜드의 공인 감정 기관이 아닙니다.
            </p>
            <div className="bg-[#1c1b1b] p-3 border border-[#4d4635] space-y-2">
              <div className="flex justify-between text-[10px] gap-2">
                <span className="text-[#99907c]">교차 검수</span>
                <span className="text-[#f2ca50] font-bold">2인 크로스체크</span>
              </div>
              <div className="w-full bg-[#353534] h-1.5 overflow-hidden">
                <div className="bg-[#f2ca50] h-full w-full"></div>
              </div>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-[#0e0e0e] p-5 lg:p-6 border border-[#d4af37]/40 relative group hover:border-[#f2ca50] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] text-[#f2ca50] tracking-widest font-semibold border-b border-[#f2ca50] pb-0.5">
                STAGE 03
              </span>
              <Lock className="w-5 h-5 text-[#99907c] group-hover:text-[#f2ca50] transition-colors" />
            </div>
            <h3 className="font-serif text-lg text-[#e5e2e1] mb-2 font-medium [word-break:keep-all]">
              봉인 태그 &amp; 검수 이력서 발행
            </h3>
            <p className="text-xs lg:text-sm text-[#d0c5af] mb-6 font-light leading-relaxed [word-break:keep-all]">
              떼면 표시가 남는 1회용 봉인 태그를 붙이고, 로트 번호로 검수 이력을 다시 열람할 수 있는 이력서를
              함께 보냅니다.
            </p>
            <div className="bg-[#1c1b1b] p-3 border border-[#4d4635] space-y-2">
              <div className="flex justify-between text-[10px] gap-2">
                <span className="text-[#99907c]">봉인 태그</span>
                <span className="text-[#f2ca50] font-bold">TAMPER-EVIDENT</span>
              </div>
              <div className="w-full bg-[#353534] h-1.5 overflow-hidden">
                <div className="bg-[#f2ca50] h-full w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
