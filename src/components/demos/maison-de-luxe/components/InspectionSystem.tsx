import React from 'react';
import { Scan, FileCheck, Lock } from 'lucide-react';

export const InspectionSystem: React.FC = () => {
  return (
    <section className="w-full bg-[#201f1f] border-b border-[#4d4635] py-8 lg:py-14">
      <div className="w-full px-4 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8">
          <div>
            <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold block uppercase">
              AUTHENTICITY RADAR &amp; ESCROW PROTOCOL
            </span>
            <h2 className="font-serif text-xl lg:text-3xl text-[#e5e2e1] mt-1 font-medium">
              메종 드 럭스 3단계 무결점 정품 검수 시스템
            </h2>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center gap-3">
            <span className="text-[10px] text-[#99907c]">실시간 검수원 가동 상태:</span>
            <span className="inline-flex items-center gap-1.5 text-[#f2ca50] text-[11px] tracking-widest font-semibold bg-[#0e0e0e] px-3 py-1 border border-[#d4af37]/40">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping"></span>
              ATELIER PARIS &amp; SEOUL VAULT ACTIVE
            </span>
          </div>
        </div>

        {/* 3-Stage Interactive Pipeline Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Stage 1 */}
          <div className="bg-[#0e0e0e] p-5 lg:p-6 border border-[#d4af37]/40 relative group hover:border-[#f2ca50] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] text-[#f2ca50] tracking-widest font-semibold border-b border-[#f2ca50] pb-0.5">
                STAGE 01
              </span>
              <Scan className="w-5 h-5 text-[#99907c] group-hover:text-[#f2ca50] transition-colors" />
            </div>
            <h3 className="font-serif text-lg text-[#e5e2e1] mb-2 font-medium">
              AI 초미세 분광 광학 스캔
            </h3>
            <p className="text-xs lg:text-sm text-[#d0c5af] mb-6 font-light leading-relaxed">
              가죽의 탄닌 결, 봉제선 땀수(S.P.I), 골드 도금 합금비(XRF 형광분석), 고유 시리얼 폰트 자간을 0.01mm 단위로 분광 분석합니다.
            </p>
            <div className="bg-[#1c1b1b] p-3 border border-[#4d4635] space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#99907c]">광학 정밀도 (예시)</span>
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
            <h3 className="font-serif text-lg text-[#e5e2e1] mb-2 font-medium">
              공인 명품 감정 아카데미(예시) 2차 실물 검수
            </h3>
            <p className="text-xs lg:text-sm text-[#d0c5af] mb-6 font-light leading-relaxed">
              15년 이상 경력의 에르메스·샤넬 공인 감정위원 2인이 조달 루트 인보이스 및 물리적 촉감, 부자재 특수 인그레이빙을 이중 대조합니다.
            </p>
            <div className="bg-[#1c1b1b] p-3 border border-[#4d4635] space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#99907c]">더블 크로스 체크</span>
                <span className="text-[#f2ca50] font-bold">DUAL-CERTIFIED</span>
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
            <h3 className="font-serif text-lg text-[#e5e2e1] mb-2 font-medium">
              특수 암호화 NFC 봉인 실링
            </h3>
            <p className="text-xs lg:text-sm text-[#d0c5af] mb-6 font-light leading-relaxed">
              훼손 시 즉시 파기되는 1회용 하이퍼 세큐리티 태그와 함께 스마트폰 태깅으로 영구 진위 이력이 열람되는 블록체인 COA를 발행합니다.
            </p>
            <div className="bg-[#1c1b1b] p-3 border border-[#4d4635] space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#99907c]">위변조 방지 씰</span>
                <span className="text-[#f2ca50] font-bold">TAMPER-PROOF SEAL</span>
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
