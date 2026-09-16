import React from 'react';
import { Radar, Satellite, Zap, Cpu, CheckCircle2 } from 'lucide-react';

export default function HardwareArchitecture() {
  return (
    <section id="manufacturing" className="py-16 lg:py-24 bg-surface-container-lowest border-b border-outline-variant/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Specs Matrix Column */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-bold text-xs w-fit">
              <Satellite className="w-3.5 h-3.5" />
              16U CUBESAT HARDWARE SPECIFICATIONS
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-on-surface">
              궤도 자율 AI 컴퓨팅과 차세대 우주 하드웨어 아키텍처
            </h2>
            <p className="text-sm lg:text-base text-on-surface-variant leading-relaxed">
              STELLA ORBITAL은 자체 우주 하드웨어 팹에서 생산되는 16U SmallSat 표준 버스를 사용합니다. 궤도상 온디바이스 NPU를 탑재하여 지상 다운링크 전 구름 마스킹과 관심 표적을 자율 선별합니다.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary shrink-0" />
                  <h4 className="font-semibold text-sm text-on-surface">
                    High-Efficiency Multi-Junction Solar Arrays (120W OAP)
                  </h4>
                </div>
                <p className="text-xs text-on-surface-variant mt-1.5 pl-8 leading-relaxed">
                  32% 고효율 삼중접합 갈륨비소(GaAs) 태양전지 패널을 통해 고출력 SAR 레이더 펄스 송출을 위한 지속 전력을 공급합니다.
                </p>
              </div>

              <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant">
                <div className="flex items-center gap-3">
                  <Satellite className="w-5 h-5 text-secondary shrink-0" />
                  <h4 className="font-semibold text-sm text-on-surface">
                    High-Isp Iodine Electric Ion Propulsion
                  </h4>
                </div>
                <p className="text-xs text-on-surface-variant mt-1.5 pl-8 leading-relaxed">
                  요오드 기반 고비추력 전기이온 추진기로 500km 궤도 저하를 보정하고 우주 쓰레기 충돌을 자율 회피합니다 (설계 수명 5년).
                </p>
              </div>

              <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant">
                <div className="flex items-center gap-3">
                  <Radar className="w-5 h-5 text-tertiary-container shrink-0" />
                  <h4 className="font-semibold text-sm text-on-surface">
                    Optical Inter-Satellite Laser Link (OISL 10Gbps)
                  </h4>
                </div>
                <p className="text-xs text-on-surface-variant mt-1.5 pl-8 leading-relaxed">
                  지상국 통과를 기다릴 필요 없이 군집 위성 상호 간 10Gbps 레이저 메쉬 통신망을 통해 데이터를 즉시 중계합니다.
                </p>
              </div>

              <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-primary shrink-0" />
                  <h4 className="font-semibold text-sm text-on-surface">
                    On-board Edge AI NPU (On-Orbit Autonomous Masking)
                  </h4>
                </div>
                <p className="text-xs text-on-surface-variant mt-1.5 pl-8 leading-relaxed">
                  우주 환경 방사선 차폐 NPU를 통해 구름 낀 영상은 궤도에서 자체 폐기하고 핵심 표적 메타데이터만 15분 내 다운링크합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Flight Heritage & Cleanroom Clean Card */}
          <div className="lg:col-span-6">
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 lg:p-8 shadow-sm">
              <h3 className="text-xl lg:text-2xl font-bold text-on-surface mb-3">
                비행 이력 표기 자리 (예시)
              </h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                해외 라이드셰어 발사(예시)를 통한 위성 32기 궤도 투입과 48/48 전송 이력을 보여 주는 예시 구성입니다.
              </p>

              <div className="space-y-4 font-code-mono text-xs">
                <div className="p-4 bg-surface-container-lowest rounded border border-outline-variant">
                  <div className="flex justify-between items-center text-primary font-bold">
                    <span>LAUNCH MISSION 01</span>
                    <span>RIDESHARE FLIGHT A (예시)</span>
                  </div>
                  <p className="text-on-surface-variant mt-1">
                    16 SmallSats Deployed • 500km SSO • Signal Acquisition Nominal
                  </p>
                </div>

                <div className="p-4 bg-surface-container-lowest rounded border border-outline-variant">
                  <div className="flex justify-between items-center text-secondary font-bold">
                    <span>LAUNCH MISSION 02</span>
                    <span>RIDESHARE FLIGHT B (예시)</span>
                  </div>
                  <p className="text-on-surface-variant mt-1">
                    16 SmallSats Deployed • Inclination 97.4° • OISL Mesh Established
                  </p>
                </div>

                <div className="p-4 bg-surface-container-lowest rounded border border-outline-variant">
                  <div className="flex justify-between items-center text-tertiary-container font-bold">
                    <span>NEXT PLANNED CONSTELLATION EXPANSION</span>
                    <span>Q3 2026 SCHEDULED</span>
                  </div>
                  <p className="text-on-surface-variant mt-1">
                    +16 Next-Gen Gen-3 Satellites (0.15m GSD Target)
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-outline-variant/60 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
                <span className="text-on-surface-variant">Cleanroom Facility: ISO 5 (Class 100)</span>
                <span className="text-primary font-bold">수출통제 준수 표기 (예시)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
