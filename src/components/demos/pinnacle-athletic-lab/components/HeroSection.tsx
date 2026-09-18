import React from 'react';
import { Play, Video, Activity, Award, Shield, Cpu } from 'lucide-react';
import { TelemetryHudBar } from './TelemetryHudBar';
import { LAB_IMAGES } from '../data/labData';

interface HeroSectionProps {
  onOpenSimulation: (type: 'sprint' | 'jump' | 'grip', title: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSimulation }) => {
  return (
    <section
      id="track-and-field-lab"
      className="relative w-full bg-[#0e0e0e] px-4 lg:px-12 py-8 lg:py-12 overflow-hidden border-b border-[#201f1f]"
    >
      {/* Top Telemetry Master HUD Bar */}
      <TelemetryHudBar />

      {/* Main Athletic Typography Headline */}
      <div className="w-full flex flex-col gap-2 mb-10">
        <div className="flex items-center gap-3">
          <span className="font-telemetry text-[12px] text-[#ff5625] font-bold uppercase tracking-widest">
            [ SPEC-GRADE BIOMECHANICS LAB // EST. 2018 ]
          </span>
          <span className="h-px bg-[#ff5625]/40 flex-1 max-w-xs"></span>
        </div>

        <h1 className="font-sans text-[36px] lg:text-[48px] lg:text-[68px] lg:leading-[74px] font-bold text-[#ffffff] tracking-tight uppercase">
          0.01초와 1CM를 지배하는
          <br />
          <span className="text-[#ff5625]">극한의 스포츠 바이오메카닉스</span>
        </h1>

        <p className="font-sans text-[15px] lg:text-[18px] text-[#9e9b9a] max-w-4xl mt-2 leading-relaxed">
          ENGINEERING THE 0.01% ATHLETIC METRIC: S대 체육교육과, K대, Y대 및 경찰·소방 특채 실기 센서 규격 계측 센터 (예시).
        </p>
      </div>

      {/* 3 Distinct Vertical Video Slices (High-Density Telemetry Viewports) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Track 01: Sprint Start & Explosive Drive */}
        <div className="group relative flex flex-col bg-[#1c1b1b] border border-[#2a2a2a] overflow-hidden shadow-[2px_2px_0px_#000000]">
          <div className="relative w-full h-[520px] overflow-hidden bg-[#0e0e0e]">
            <img
              alt="Kinematic Sprint Start Analysis 1000FPS"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-125"
              src={LAB_IMAGES.sprintTrack}
            />

            {/* Gradient Telemetry Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/30 to-transparent"></div>

            {/* Crosshair Overlays */}
            <span className="absolute top-4 left-4 font-telemetry text-[10px] text-[#c3f400] font-bold bg-[#0e0e0e]/60 px-1.5 py-0.5">
              + LAT_POS [X:142.1 / Y:088.3]
            </span>
            <span className="absolute top-4 right-4 font-telemetry text-[10px] text-[#ff5625] font-bold bg-[#0e0e0e]/60 px-1.5 py-0.5">
              NODE_01: ACTIVE
            </span>

            {/* Floating Metric Badge */}
            <div className="absolute top-12 left-4 bg-[#2a2a2a]/95 px-3 py-1 border border-[#353534] backdrop-blur-sm">
              <span className="font-telemetry text-[11px] text-[#c3f400] font-bold uppercase tracking-wider">
                TRACK 01 // CRUNCH DRIVE
              </span>
            </div>

            {/* Mid-Area Dynamic Sensor Vector */}
            <div className="absolute inset-x-4 top-1/3 flex flex-col gap-1 pointer-events-none">
              <div className="flex items-center justify-between text-[#ffffff] font-telemetry text-[12px]">
                <span className="text-[#ffb5a0]">DRIVE ANGLE VECTOR</span>
                <span className="text-[#c3f400] font-bold">44.5°</span>
              </div>
              <div className="w-full h-1.5 bg-[#353534]/80">
                <div className="h-full bg-[#c3f400] w-[74%] transition-all"></div>
              </div>
            </div>

            {/* Bottom Telemetry HUD Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2 bg-[#1c1b1b]/95 border-t border-[#2a2a2a] backdrop-blur-md">
              <div className="flex items-baseline justify-between">
                <h3 className="font-sans text-[22px] font-bold text-[#ffffff] uppercase tracking-tight">
                  SPRINT START
                </h3>
                <span className="font-telemetry text-[13px] text-[#ff5625] font-bold">
                  [100M / 50M]
                </span>
              </div>
              <p className="font-sans text-[13px] text-[#9e9b9a] leading-tight">
                1보 추진각 제어 및 지면반력 백터 정렬. 무반동 폭발적 추진 최적화.
              </p>

              {/* 3-column metric bar */}
              <div className="grid grid-cols-3 gap-2 py-2 my-1 bg-[#2a2a2a] border border-[#353534] px-3">
                <div className="flex flex-col">
                  <span className="font-telemetry text-[9px] text-[#9e9b9a]">GRF PEAK</span>
                  <span className="font-telemetry text-[15px] text-[#ffffff] font-bold">
                    1,420 N
                  </span>
                </div>
                <div className="flex flex-col border-l border-[#353534] pl-2">
                  <span className="font-telemetry text-[9px] text-[#9e9b9a]">LATENCY</span>
                  <span className="font-telemetry text-[15px] text-[#c3f400] font-bold">
                    0.118 s
                  </span>
                </div>
                <div className="flex flex-col border-l border-[#353534] pl-2">
                  <span className="font-telemetry text-[9px] text-[#9e9b9a]">1-STEP ANG</span>
                  <span className="font-telemetry text-[15px] text-[#ff5625] font-bold">
                    44.5°
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenSimulation('sprint', '스프린트 1보 블록 드라이브 시뮬레이터')}
                className="w-full py-2.5 bg-[#ff5625] hover:bg-[#ff7147] active:scale-[0.99] text-[#541100] font-sans text-[14px] font-bold uppercase tracking-tight flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000000] transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                START DRIVE SIMULATION
              </button>
            </div>
          </div>
        </div>

        {/* Track 02: Standing Long Jump Takeoff (제자리멀리뛰기) */}
        <div className="group relative flex flex-col bg-[#1c1b1b] border border-[#2a2a2a] overflow-hidden shadow-[2px_2px_0px_#000000]">
          <div className="relative w-full h-[520px] overflow-hidden bg-[#0e0e0e]">
            <img
              alt="Standing Long Jump Kinematics Optotrak"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-125"
              src={LAB_IMAGES.jumpTrack}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/30 to-transparent"></div>

            <span className="absolute top-4 left-4 font-telemetry text-[10px] text-[#c3f400] font-bold bg-[#0e0e0e]/60 px-1.5 py-0.5">
              + TAKEOFF MATRIX [Z:304cm]
            </span>
            <span className="absolute top-4 right-4 font-telemetry text-[10px] text-[#c3f400] font-bold animate-pulse bg-[#0e0e0e]/60 px-1.5 py-0.5">
              [RECORD RECORDED]
            </span>

            <div className="absolute top-12 left-4 bg-[#c3f400] px-3 py-1 border border-[#a6cf00]">
              <span className="font-telemetry text-[11px] text-[#283500] font-bold uppercase tracking-wider">
                TRACK 02 // STANDING JUMP
              </span>
            </div>

            {/* Mid-Area Dynamic Sensor Arc Indicator */}
            <div className="absolute inset-x-4 top-1/3 flex flex-col gap-1 pointer-events-none">
              <div className="flex items-center justify-between text-[#ffffff] font-telemetry text-[12px]">
                <span className="text-[#c3f400]">TAKEOFF APOGEE ARC</span>
                <span className="text-[#ffffff] font-bold">38.2° OPTIMAL</span>
              </div>
              <div className="w-full h-1.5 bg-[#353534]/80">
                <div className="h-full bg-[#c3f400] w-[92%] transition-all"></div>
              </div>
            </div>

            {/* Bottom Telemetry HUD Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2 bg-[#1c1b1b]/95 border-t border-[#2a2a2a] backdrop-blur-md">
              <div className="flex items-baseline justify-between">
                <h3 className="font-sans text-[22px] font-bold text-[#ffffff] uppercase tracking-tight">
                  STANDING LONG JUMP
                </h3>
                <span className="font-telemetry text-[13px] text-[#c3f400] font-bold">
                  304 cm PASS
                </span>
              </div>
              <p className="font-sans text-[13px] text-[#9e9b9a] leading-tight">
                S대 체교 기준 300cm 돌파 (예시). 고관절 신전속도와 전방 착지각 자동 분석.
              </p>

              <div className="grid grid-cols-3 gap-2 py-2 my-1 bg-[#2a2a2a] border border-[#353534] px-3">
                <div className="flex flex-col">
                  <span className="font-telemetry text-[9px] text-[#9e9b9a]">LAUNCH ANG</span>
                  <span className="font-telemetry text-[15px] text-[#ffffff] font-bold">
                    38.2°
                  </span>
                </div>
                <div className="flex flex-col border-l border-[#353534] pl-2">
                  <span className="font-telemetry text-[9px] text-[#9e9b9a]">HANG TIME</span>
                  <span className="font-telemetry text-[15px] text-[#c3f400] font-bold">
                    0.612 s
                  </span>
                </div>
                <div className="flex flex-col border-l border-[#353534] pl-2">
                  <span className="font-telemetry text-[9px] text-[#9e9b9a]">HIP VEL</span>
                  <span className="font-telemetry text-[15px] text-[#ff5625] font-bold">
                    5.8 m/s
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenSimulation('jump', '1000FPS 제자리멀리뛰기 키네마틱스 슬로우모션')}
                className="w-full py-2.5 bg-[#2a2a2a] hover:bg-[#353534] active:scale-[0.99] text-[#ffffff] border border-[#353534] font-sans text-[14px] font-bold uppercase tracking-tight flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000000] transition-all cursor-pointer"
              >
                <Video className="w-4 h-4 text-[#c3f400]" />
                1000FPS KINEMATIC SLOW-MO
              </button>
            </div>
          </div>
        </div>

        {/* Track 03: Dynamometer Digital Grip (악력 정밀 계측) */}
        <div className="group relative flex flex-col bg-[#1c1b1b] border border-[#2a2a2a] overflow-hidden shadow-[2px_2px_0px_#000000]">
          <div className="relative w-full h-[520px] overflow-hidden bg-[#0e0e0e]">
            <img
              alt="Electronic Load Cell Dynamometer Grip"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-125"
              src={LAB_IMAGES.gripTrack}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/30 to-transparent"></div>

            <span className="absolute top-4 left-4 font-telemetry text-[10px] text-[#ff5625] font-bold bg-[#0e0e0e]/60 px-1.5 py-0.5">
              + LOAD_CELL: STRAIN 99.4%
            </span>
            <span className="absolute top-4 right-4 font-telemetry text-[10px] text-[#c3f400] font-bold bg-[#0e0e0e]/60 px-1.5 py-0.5">
              [10PT PERFECT]
            </span>

            <div className="absolute top-12 left-4 bg-[#ff5625] px-3 py-1 border border-[#e04518]">
              <span className="font-telemetry text-[11px] text-[#541100] font-bold uppercase tracking-wider">
                TRACK 03 // LOAD-CELL GRIP
              </span>
            </div>

            {/* Dynamic Bar Gauge */}
            <div className="absolute inset-x-4 top-1/3 flex flex-col gap-1 pointer-events-none">
              <div className="flex items-center justify-between text-[#ffffff] font-telemetry text-[12px]">
                <span className="text-[#ffb5a0]">INSTANTANEOUS TORQUE</span>
                <span className="text-[#ffffff] font-bold">78.4 kg MAX</span>
              </div>
              <div className="flex gap-1">
                <div className="h-1.5 flex-1 bg-[#c3f400]"></div>
                <div className="h-1.5 flex-1 bg-[#c3f400]"></div>
                <div className="h-1.5 flex-1 bg-[#c3f400]"></div>
                <div className="h-1.5 flex-1 bg-[#c3f400]"></div>
                <div className="h-1.5 flex-1 bg-[#ff5625]"></div>
              </div>
            </div>

            {/* Bottom Telemetry HUD Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2 bg-[#1c1b1b]/95 border-t border-[#2a2a2a] backdrop-blur-md">
              <div className="flex items-baseline justify-between">
                <h3 className="font-sans text-[22px] font-bold text-[#ffffff] uppercase tracking-tight">
                  DIGITAL LOAD CELL
                </h3>
                <span className="font-telemetry text-[13px] text-[#c3f400] font-bold">
                  78.4 kg RECORD
                </span>
              </div>
              <p className="font-sans text-[13px] text-[#9e9b9a] leading-tight">
                소방·경찰 채용 10점 만점(64kg) 122% 초과. 전완근 모터유닛 동원율 측정.
              </p>

              <div className="grid grid-cols-3 gap-2 py-2 my-1 bg-[#2a2a2a] border border-[#353534] px-3">
                <div className="flex flex-col">
                  <span className="font-telemetry text-[9px] text-[#9e9b9a]">PEAK FORCE</span>
                  <span className="font-telemetry text-[15px] text-[#ffffff] font-bold">
                    78.4 kg
                  </span>
                </div>
                <div className="flex flex-col border-l border-[#353534] pl-2">
                  <span className="font-telemetry text-[9px] text-[#9e9b9a]">L/R BAL</span>
                  <span className="font-telemetry text-[15px] text-[#c3f400] font-bold">
                    74:78 kg
                  </span>
                </div>
                <div className="flex flex-col border-l border-[#353534] pl-2">
                  <span className="font-telemetry text-[9px] text-[#9e9b9a]">STANDARDS</span>
                  <span className="font-telemetry text-[15px] text-[#ff5625] font-bold">
                    +14.4kg
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenSimulation('grip', '디지털 로드셀 스트레인게이지 텔레메트리')}
                className="w-full py-2.5 bg-[#2a2a2a] hover:bg-[#353534] active:scale-[0.99] text-[#ffffff] border border-[#353534] font-sans text-[14px] font-bold uppercase tracking-tight flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000000] transition-all cursor-pointer"
              >
                <Activity className="w-4 h-4 text-[#ff5625]" />
                LOAD CELL TELEMETRY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Athletic Lab KPIs Console Row */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-[#1c1b1b] border border-[#2a2a2a] shadow-[2px_2px_0px_#000000]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#2a2a2a] border border-[#353534] flex items-center justify-center shrink-0">
            <Award className="w-8 h-8 text-[#ff5625]" />
          </div>
          <div className="flex flex-col">
            <span className="font-telemetry text-[26px] text-[#ffffff] font-bold leading-tight">
              38名
            </span>
            <span className="font-sans text-[14px] text-[#ff5625] uppercase font-bold">
              체대입시 수석 배출
            </span>
            <span className="font-sans text-[12px] text-[#9e9b9a]">
              S대·K대·Y대 총 38명 실기 우수 합격 (예시)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:border-l lg:border-[#2a2a2a] lg:pl-6">
          <div className="w-14 h-14 bg-[#2a2a2a] border border-[#353534] flex items-center justify-center shrink-0">
            <Shield className="w-8 h-8 text-[#c3f400]" />
          </div>
          <div className="flex flex-col">
            <span className="font-telemetry text-[26px] text-[#ffffff] font-bold leading-tight">
              214名
            </span>
            <span className="font-sans text-[14px] text-[#c3f400] uppercase font-bold">
              경찰·소방 특채 만점자
            </span>
            <span className="font-sans text-[12px] text-[#9e9b9a]">
              경찰간부·구조대·해경 실기 전원 50/50 만점
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:border-l lg:border-[#2a2a2a] lg:pl-6">
          <div className="w-14 h-14 bg-[#2a2a2a] border border-[#353534] flex items-center justify-center shrink-0">
            <Cpu className="w-8 h-8 text-[#ffffff]" />
          </div>
          <div className="flex flex-col">
            <span className="font-telemetry text-[26px] text-[#ffffff] font-bold leading-tight">
              0.001 cm
            </span>
            <span className="font-sans text-[14px] text-[#ffffff] uppercase font-bold">
              무결점 센서 오차 검증
            </span>
            <span className="font-sans text-[12px] text-[#9e9b9a]">
              1,000Hz Kistler + Optotrak 이중 계측 체계
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
