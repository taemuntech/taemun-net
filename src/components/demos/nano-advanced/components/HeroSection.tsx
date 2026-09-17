import React from 'react';
import { ArrowRight, Layers, Cpu } from 'lucide-react';
import { HERO_WAFER_IMAGE } from '../data/packagingData';

interface HeroSectionProps {
  onOpenWhitepaper: () => void;
  onOpenExplodedView: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenWhitepaper,
  onOpenExplodedView,
}) => {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden cleanroom-grid border-b border-[#c4c5d5]/30"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Status Pill Indicator */}
        <div className="inline-flex items-center gap-x-2.5 px-3 py-1 bg-white border border-[#c4c5d5]/60 rounded-full shadow-[0_1px_2px_rgba(15,23,42,0.05)] mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#57dffe] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00288e]"></span>
          </span>
          <span className="font-mono text-[11px] text-[#444653] tracking-wider uppercase font-semibold">
            GLOBAL PACKAGING FOUNDRY ALLIANCE • SUB-5μm ULTRA-FINE RDL QUALIFIED (예시 표기)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-center">
          {/* Hero Copy Left (lg: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h1 className="text-3xl lg:text-[50px] font-extrabold text-[#0b1c30] tracking-tight leading-[1.18] mb-6">
              무어의 법칙을 넘어선 차세대 AI 연산
              <br />
              <span className="text-[#00288e] underline decoration-[#57dffe] decoration-4 underline-offset-8">
                2.5D / 3D 첨단 이종 패키징
              </span>{' '}
              아키텍처
            </h1>

            <p className="text-base text-[#444653] max-w-2xl mb-8 leading-relaxed font-normal">
              초거대 AI 가속기와 HBM4 고대역폭 메모리를 초저지연으로 연결하는 5µm 피치 실리콘
              인터포저 및 초평탄 글래스 기판. 글로벌 탑티어 파운드리 및 팹리스 고객사의 초고집적
              패키징 수율(Yield 99.85% — 예시 수치)을 목표로 합니다.
            </p>

            {/* Action Buttons */}
            {/* md 는 태블릿 카드 밀도 조정용 — 모바일/웹 경계는 저장소 규칙대로 lg 를 유지한다 */}
            <div className="flex flex-col md:flex-row items-stretch gap-3.5 w-full lg:w-auto mb-10">
              <button
                onClick={onOpenWhitepaper}
                className="bg-[#00288e] hover:bg-[#1e40af] text-white text-sm font-semibold px-6 py-3.5 rounded-lg shadow-sm transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                type="button"
              >
                <span>기술 백서 및 기판 설계 사양서</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={onOpenExplodedView}
                className="bg-white hover:bg-[#eff4ff] text-[#0b1c30] border border-[#c4c5d5]/80 text-sm font-semibold px-6 py-3.5 rounded-lg shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                type="button"
              >
                <Layers className="w-5 h-5 text-[#00687a] shrink-0" />
                <span>3D 이종 패키징 구조 분해도 열기</span>
              </button>
            </div>

            {/* Nano-Precision Trust Metrics Bar — 실적처럼 읽히는 네 수치라 구역 머리에 예시 배지를 단다 */}
            <div className="w-full pt-6 border-t border-[#c4c5d5]/30">
              <div className="mb-3 inline-flex items-center rounded-full border border-[#c4c5d5]/60 bg-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#757684]">
                아래 네 수치는 모두 예시 수치입니다
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-lg border border-[#c4c5d5]/40 shadow-xs">
                  <div className="text-[11px] font-bold text-[#757684] uppercase tracking-wider mb-1">
                    최소 배선 피치
                  </div>
                  <div className="text-xl text-[#00288e] font-extrabold tracking-tight">
                    5 µm
                  </div>
                  <div className="font-mono text-[11px] text-[#444653] font-medium">
                    L/S 2/2µm 목표 사양
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#c4c5d5]/40 shadow-xs">
                  <div className="text-[11px] font-bold text-[#757684] uppercase tracking-wider mb-1">
                    CTE 열팽창계수
                  </div>
                  <div className="text-xl text-[#0b1c30] font-extrabold tracking-tight">
                    3.2 ppm/K
                  </div>
                  <div className="font-mono text-[11px] text-[#444653] font-medium">
                    Silicon Matched Low-Strain
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#c4c5d5]/40 shadow-xs">
                  <div className="text-[11px] font-bold text-[#757684] uppercase tracking-wider mb-1">
                    대면적 양산 수율
                  </div>
                  <div className="text-xl text-[#00563a] font-extrabold tracking-tight">
                    99.85%
                  </div>
                  <div className="font-mono text-[11px] text-[#444653] font-medium">
                    Class 1 팹 목표 수율 (예시)
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#c4c5d5]/40 shadow-xs">
                  <div className="text-[11px] font-bold text-[#757684] uppercase tracking-wider mb-1">
                    공급 레퍼런스
                  </div>
                  <div className="text-xl text-[#0b1c30] font-extrabold tracking-tight">
                    14곳
                  </div>
                  <div className="font-mono text-[11px] text-[#444653] font-medium">
                    AI 가속기 고객사 (예시)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image & Interactive Telemetry Overlays Right (lg: 5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white p-3 rounded-xl border border-[#c4c5d5]/50 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.06),0_8px_10px_-6px_rgba(15,23,42,0.03)] group overflow-hidden">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  alt="NANO ADVANCED 2.5D Interposer v2.5 Wafer in Cleanroom Packaging Stage"
                  className="w-full h-auto object-cover transform duration-500 group-hover:scale-[1.02]"
                  src={HERO_WAFER_IMAGE}
                  referrerPolicy="no-referrer"
                />

                {/* Floating Sensor Telemetry 1 (Top Left) */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#c4c5d5]/50 shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <div className="font-mono text-[11px] text-[#0b1c30]">
                    <span className="font-bold text-[#00288e]">INTERPOSER V2.5</span> • Active Wafer Run
                  </div>
                </div>

                {/* Floating Sensor Telemetry 2 (Bottom Right) */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-lg border border-[#c4c5d5]/50 shadow-sm flex flex-col gap-0.5 text-right font-mono text-[11px]">
                  <div className="text-[#444653]">
                    Micro-bump Pitch: <span className="text-[#0b1c30] font-bold">5 µm</span>
                  </div>
                  <div className="text-[#444653]">
                    Total Substrate Warpage:{' '}
                    <span className="text-emerald-600 font-bold">&lt; 14.8 µm</span>
                  </div>
                  <div className="text-[#00288e] font-semibold text-[10px]">
                    Solder Co-planarity Pass (예시)
                  </div>
                </div>
              </div>

              {/* Sub-wafer detail strip */}
              <div className="mt-3 pt-2.5 border-t border-[#c4c5d5]/30 flex items-center justify-between text-[11px] font-mono text-[#757684]">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#00288e]" />
                  <span>FAB SPEC: SUB-NANO STEP SCANNER</span>
                </span>
                <span>LOT ID: #NA-2026-X80</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
