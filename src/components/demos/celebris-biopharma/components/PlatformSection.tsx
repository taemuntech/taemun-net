import React from 'react';
import { Cpu, Share2, Link as LinkIcon, Crosshair, Server } from 'lucide-react';

export const PlatformSection: React.FC = () => {
  return (
    <section className="scroll-mt-[calc(5rem+var(--sample-bar-h,0px))] py-24 cleanroom-grid relative" id="platform">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#e5eeff] text-[#00288e] text-[12px] font-code-mono font-bold mb-3 shadow-xs">
            <Cpu className="w-4 h-4" />
            <span>COMPUTATIONAL BIOLOGY CORE</span>
          </div>
          <h2 className="text-[32px] lg:text-[40px] font-bold text-[#0b1c30] tracking-tight">
            자체 AI 신약 발굴 엔진 'PROTEA-AI'
          </h2>
          <p className="text-[16px] text-[#444653] mt-3 leading-relaxed [word-break:keep-all]">
            14억 개 화합물 구조 데이터베이스와 삼차원 유도적합(Induced-Fit) 모델링으로 타깃 단백질 분해제 및 링커-페이로드 접합을 빠르게 예측합니다.
          </p>
          {/* 아래 속도·안정성·선택성 숫자는 전부 지어낸 값이다 — 구역 머리에 배지를 한 개 단다 */}
          <p className="mt-4 inline-flex items-center rounded-md bg-white border border-[#c4c5d5]/50 px-3 py-1.5 text-[12px] text-[#444653] [word-break:keep-all]">
            아래 플랫폼 성능 지표는 화면 구성용 예시 수치입니다.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        {/* 768px 에서 카드 3장이 세로로만 늘어져 여백이 비던 자리 — 태블릿(sm~lg)에서는 2열로 앉힌다.
            저장소의 모바일/웹 경계는 lg 그대로 두고, 그 안쪽에서 밀도만 한 단계 더 준다. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Feature 1 */}
          <div className="lg:col-span-4 bg-white p-6 lg:p-8 rounded-xl border border-[#c4c5d5]/40 shadow-xs flex flex-col justify-between hover:border-[#1e40af] hover:shadow-md transition-all group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#00288e] mb-6 group-hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-code-mono text-[#757684] uppercase mb-1 font-semibold">
                Architecture 01
              </div>
              <h3 className="text-[22px] font-bold text-[#0b1c30] mb-3 tracking-tight">
                Structural AI Predictor
              </h3>
              <p className="text-[14px] text-[#444653] leading-relaxed">
                수십억 개 리간드-표적 단백질 3차원 유도적합(Induced-fit) 결합 모델링을 <strong className="text-[#0b1c30]">0.2초 내</strong>에 분자 도킹으로 예측합니다. 3성분 복합체(Ternary Complex) 형성 에너지도 함께 시뮬레이션합니다.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#c4c5d5]/30 flex items-center justify-between font-code-mono text-[12px]">
              <span className="text-[#757684]">Docking Speed</span>
              <span className="text-[#00288e] font-bold">&lt; 200 ms / ligand</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="lg:col-span-4 bg-white p-6 lg:p-8 rounded-xl border border-[#c4c5d5]/40 shadow-xs flex flex-col justify-between hover:border-[#00687a] hover:shadow-md transition-all group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#00687a] mb-6 group-hover:scale-110 transition-transform">
                <LinkIcon className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-code-mono text-[#757684] uppercase mb-1 font-semibold">
                Architecture 02
              </div>
              <h3 className="text-[22px] font-bold text-[#0b1c30] mb-3 tracking-tight">
                Novel Cleavable Linker
              </h3>
              <p className="text-[14px] text-[#444653] leading-relaxed">
                혈중 순환계에서 <strong className="text-[#0b1c30]">99.8% 안정성</strong>을 유지하며, 종양 미세환경 및 세포 내 리소좀 효소에 반응해 암세포 내부에서만 독성 페이로드를 선택적이고 신속하게 방출합니다.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#c4c5d5]/30 flex items-center justify-between font-code-mono text-[12px]">
              <span className="text-[#757684]">Circulation Stability</span>
              <span className="text-[#00687a] font-bold">99.8% Plasma-Stable</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="lg:col-span-4 bg-white p-6 lg:p-8 rounded-xl border border-[#c4c5d5]/40 shadow-xs flex flex-col justify-between hover:border-[#00563a] hover:shadow-md transition-all group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#00563a] mb-6 group-hover:scale-110 transition-transform">
                <Crosshair className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-code-mono text-[#757684] uppercase mb-1 font-semibold">
                Architecture 03
              </div>
              <h3 className="text-[22px] font-bold text-[#0b1c30] mb-3 tracking-tight">
                Ultra-Low Off-Target
              </h3>
              <p className="text-[14px] text-[#444653] leading-relaxed">
                정상 세포 및 유사 키나아제 단백질 교차 결합에 따른 오인 독성을 <strong className="text-[#0b1c30]">0.01% 미만</strong> 수준으로 낮춰, 임상 단계에서의 안전성 마진과 치료 유효 지수(TI)를 넓히는 것을 목표로 합니다.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#c4c5d5]/30 flex items-center justify-between font-code-mono text-[12px]">
              <span className="text-[#757684]">Cross-Reactivity</span>
              <span className="text-[#00563a] font-bold">&lt; 0.01% Off-Target</span>
            </div>
          </div>

          {/* System Hardware Specs Bar */}
          <div className="sm:col-span-2 lg:col-span-12 bg-[#eff4ff] p-6 rounded-xl border border-[#c4c5d5]/30 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-2.5 rounded-lg bg-white text-[#00288e] shadow-xs">
                <Server className="w-7 h-7" />
              </div>
              <div>
                <div className="text-[16px] font-bold text-[#0b1c30]">
                  PROTEA-AI 슈퍼컴퓨팅 클러스터 인프라
                </div>
                <div className="text-[13px] text-[#444653]">
                  인체 단백질체 구조 및 14억 개 화학 라이브러리 심층 신경망 가속 분석
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 font-code-mono text-[12px]">
              <span className="px-3 py-1.5 bg-white rounded-lg border border-[#c4c5d5]/40 text-[#00288e] font-semibold shadow-xs">
                GPU 64-Node Cluster (예시)
              </span>
              <span className="px-3 py-1.5 bg-white rounded-lg border border-[#c4c5d5]/40 text-[#00687a] font-semibold shadow-xs">
                1.4 Billion Chemical DB
              </span>
              <span className="px-3 py-1.5 bg-white rounded-lg border border-[#c4c5d5]/40 text-[#00563a] font-semibold shadow-xs">
                Cryo-EM / 구조 예측 파이프라인
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
