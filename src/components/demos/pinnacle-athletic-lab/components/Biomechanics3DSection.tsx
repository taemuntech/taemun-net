import React, { useState } from 'react';
import { Eye, RefreshCw } from 'lucide-react';

export const Biomechanics3DSection: React.FC = () => {
  const [activePhase, setActivePhase] = useState<'takeoff' | 'apex' | 'landing'>('takeoff');
  const [hipExtensionAngle, setHipExtensionAngle] = useState(38.5);

  return (
    <section
      id="biomechanics-3d"
      className="w-full bg-[#0e0e0e] py-10 lg:py-16 border-b border-[#201f1f]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-telemetry text-[12px] text-[#ffb5a0] font-bold uppercase tracking-widest">
              [ 3D KINEMATIC SKELETAL BENCHMARK // WIREFRAME 0.001s ]
            </span>
            <span className="h-px bg-[#2a2a2a] flex-1"></span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="font-sans text-[28px] lg:text-[36px] lg:text-[40px] font-bold text-[#ffffff] uppercase tracking-tight">
                3D 관절 바이오메카닉스 키네마틱스 분석
              </h2>
              <p className="font-sans text-[14px] lg:text-[15px] text-[#9e9b9a] max-w-4xl mt-1">
                지면반력 1,000Hz 센서 플레이트와 고속 적외선 모션캡처를 통해 아마추어의 치명적 감점 모멘텀과 피나클 최적화 궤적을 1:1로 교차 분석합니다.
              </p>
            </div>

            {/* Kinematic Phase Switcher */}
            <div className="flex items-center gap-1.5 bg-[#1c1b1b] p-1 border border-[#2a2a2a] shrink-0 self-start lg:self-auto">
              <button
                onClick={() => setActivePhase('takeoff')}
                className={`px-3 py-1.5 font-telemetry text-[11px] font-bold transition-colors cursor-pointer ${
                  activePhase === 'takeoff'
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'text-[#9e9b9a] hover:text-[#ffffff]'
                }`}
              >
                01. TAKEOFF (도약기)
              </button>
              <button
                onClick={() => setActivePhase('apex')}
                className={`px-3 py-1.5 font-telemetry text-[11px] font-bold transition-colors cursor-pointer ${
                  activePhase === 'apex'
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'text-[#9e9b9a] hover:text-[#ffffff]'
                }`}
              >
                02. APEX (체공정점기)
              </button>
              <button
                onClick={() => setActivePhase('landing')}
                className={`px-3 py-1.5 font-telemetry text-[11px] font-bold transition-colors cursor-pointer ${
                  activePhase === 'landing'
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'text-[#9e9b9a] hover:text-[#ffffff]'
                }`}
              >
                03. FOLDING (착지폴딩기)
              </button>
            </div>
          </div>
        </div>

        {/* Comparative Wireframe Kinematic Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
          {/* Left: Flawed Amateur Pattern (비효율적 32° 도약) - 6 cols */}
          <div className="lg:col-span-6 p-6 lg:p-8 bg-[#1c1b1b] border border-[#2a2a2a] shadow-[2px_2px_0px_#000000] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#ffb4ab]"></span>
                  <span className="font-telemetry text-[12px] text-[#ffb4ab] font-bold uppercase">
                    FLAWED AMATEUR PATTERN
                  </span>
                </div>
                <span className="font-telemetry text-[12px] text-[#ffb4ab] font-bold">
                  [RECORD: 252 cm]
                </span>
              </div>

              <h3 className="font-sans text-[20px] lg:text-[22px] text-[#ffffff] font-bold mb-2">
                무릎 조기 신전 및 수평 벡터 조기 손실
              </h3>

              <p className="font-sans text-[13px] text-[#9e9b9a] mb-6 leading-relaxed">
                둔근(대둔근) 동원 부족으로 무릎 관절이 발목보다 먼저 펴지며 추진각이 32°로 저하. 상체가 앞으로 쏠려 체공시간 손실 및 착지 시 엉덩이 하강 유발.
              </p>

              {/* SVG Kinematic Wireframe: Flawed Red Model */}
              <div className="w-full h-64 bg-[#0e0e0e] border border-[#2a2a2a] relative flex items-center justify-center p-4 overflow-hidden">
                <svg
                  className="w-full h-full text-[#ffb4ab]"
                  fill="none"
                  viewBox="0 0 400 200"
                >
                  {/* Ground Line & Force Plate */}
                  <line
                    stroke="#353534"
                    strokeDasharray="4 4"
                    strokeWidth="2"
                    x1="20"
                    x2="380"
                    y1="180"
                    y2="180"
                  />
                  <text fill="#8d9199" fontFamily="Space Mono" fontSize="10" x="30" y="195">
                    FORCE PLATE FP-01
                  </text>

                  {/* Flawed Trajectory Line (Red Dashed) */}
                  <path
                    d="M 60 170 Q 150 110 270 170"
                    stroke="currentColor"
                    strokeDasharray="6 4"
                    strokeWidth="2.5"
                  />
                  <text
                    fill="currentColor"
                    fontFamily="Space Mono"
                    fontSize="11"
                    fontWeight="bold"
                    x="170"
                    y="100"
                  >
                    LOW APOGEE 32.1°
                  </text>

                  {/* Skeletal Stick Figure: Low Takeoff */}
                  {/* Foot */}
                  <line stroke="#ffffff" strokeWidth="3" x1="50" x2="70" y1="175" y2="175" />
                  {/* Ankle to Knee */}
                  <line stroke="#ffffff" strokeWidth="3" x1="60" x2="90" y1="175" y2="140" />
                  {/* Knee to Hip */}
                  <line stroke="#ffffff" strokeWidth="3" x1="90" x2="80" y1="140" y2="95" />
                  {/* Spine to Head */}
                  <line stroke="#ffffff" strokeWidth="3" x1="80" x2="110" y1="95" y2="55" />
                  {/* Head node */}
                  <circle
                    cx="115"
                    cy="50"
                    fill="#201f1f"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  {/* Arm */}
                  <line stroke="#ffffff" strokeWidth="2" x1="95" x2="60" y1="75" y2="85" />

                  {/* Red Alert Warning Joint Node */}
                  <circle
                    className="animate-ping opacity-75"
                    cx="90"
                    cy="140"
                    fill="#ffb4ab"
                    r="7"
                  />
                  <circle cx="90" cy="140" fill="#ff5625" r="5" />
                  <text
                    fill="#ffb4ab"
                    fontFamily="Space Mono"
                    fontSize="10"
                    x="105"
                    y="145"
                  >
                    KNEE PRE-EXTENSION
                  </text>

                  {/* Landing Marker */}
                  <line
                    stroke="currentColor"
                    strokeWidth="2"
                    x1="270"
                    x2="270"
                    y1="160"
                    y2="180"
                  />
                  <text
                    fill="currentColor"
                    fontFamily="Space Mono"
                    fontSize="11"
                    x="250"
                    y="155"
                  >
                    252 cm
                  </text>
                </svg>
              </div>
            </div>

            <div className="mt-6 pt-3 bg-[#0e0e0e] border border-[#2a2a2a] p-4">
              <div className="flex items-center justify-between text-[#ffb4ab] font-telemetry text-[12px] font-bold">
                <span>DEDUCTION RISK: HIGH</span>
                <span>배점 손실: -14.2 pt</span>
              </div>
              <p className="font-sans text-[12px] text-[#9e9b9a] mt-1.5">
                착지 시 하체 관절 반력 흡수 실패로 인한 엉덩이 뒤로 짚기 감점 빈발 구역.
              </p>
            </div>
          </div>

          {/* Right: Pinnacle Kinetic Optimum (황금 38.5° 키네마틱스) - 6 cols */}
          <div className="lg:col-span-6 p-6 lg:p-8 bg-[#1c1b1b] border border-[#2a2a2a] shadow-[2px_2px_0px_#000000] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#c3f400]"></span>
                  <span className="font-telemetry text-[12px] text-[#c3f400] font-bold uppercase">
                    PINNACLE KINETIC OPTIMUM
                  </span>
                </div>
                <span className="font-telemetry text-[12px] text-[#c3f400] font-bold">
                  [RECORD: 298 cm]
                </span>
              </div>

              <h3 className="font-sans text-[20px] lg:text-[22px] text-[#ffffff] font-bold mb-2">
                황금 38.5° 키네마틱스 & 둔근 모멘트 암 극대화
              </h3>

              <p className="font-sans text-[13px] text-[#9e9b9a] mb-6 leading-relaxed">
                광배근과 둔근의 트리플 익스텐션(고관절-무릎-발목) 순차 폭발. 지면 반력 수평 벡터 1.48 비율 최적화 및 공중 체공시간 0.612초 확보.
              </p>

              {/* SVG Kinematic Wireframe: Pinnacle Volt Model */}
              <div className="w-full h-64 bg-[#0e0e0e] border border-[#2a2a2a] relative flex items-center justify-center p-4 overflow-hidden">
                <svg
                  className="w-full h-full text-[#c3f400]"
                  fill="none"
                  viewBox="0 0 400 200"
                >
                  {/* Ground Line */}
                  <line
                    stroke="#353534"
                    strokeDasharray="4 4"
                    strokeWidth="2"
                    x1="20"
                    x2="380"
                    y1="180"
                    y2="180"
                  />
                  <text fill="#8d9199" fontFamily="Space Mono" fontSize="10" x="30" y="195">
                    FORCE PLATE FP-02 (CALIBRATED)
                  </text>

                  {/* Optimum Trajectory Line (Neon Volt Smooth Curve) */}
                  <path
                    d="M 60 170 Q 185 70 340 170"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <text
                    fill="currentColor"
                    fontFamily="Space Mono"
                    fontSize="11"
                    fontWeight="bold"
                    x="180"
                    y="60"
                  >
                    GOLDEN APOGEE {hipExtensionAngle.toFixed(1)}°
                  </text>

                  {/* Skeletal Stick Figure: Power Drive */}
                  {/* Foot */}
                  <line stroke="#ffffff" strokeWidth="3" x1="45" x2="70" y1="175" y2="175" />
                  {/* Ankle to Knee */}
                  <line stroke="#ffffff" strokeWidth="3" x1="60" x2="95" y1="175" y2="135" />
                  {/* Knee to Hip */}
                  <line stroke="#ffffff" strokeWidth="3" x1="95" x2="115" y1="135" y2="105" />
                  {/* Spine to Head (Forward Dynamic Lean) */}
                  <line stroke="#ffffff" strokeWidth="3" x1="115" x2="155" y1="105" y2="70" />
                  {/* Head node */}
                  <circle
                    cx="162"
                    cy="65"
                    fill="#201f1f"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  {/* Arm Full Swing Vector */}
                  <line stroke="currentColor" strokeWidth="3" x1="135" x2="175" y1="85" y2="60" />

                  {/* Neon Joint Nodes (Triple Extension) */}
                  <circle cx="60" cy="175" fill="#c3f400" r="4" />
                  <circle cx="95" cy="135" fill="#c3f400" r="4" />
                  <circle cx="115" cy="105" fill="#ff5625" r="5" />
                  <text
                    fill="#ffb5a0"
                    fontFamily="Space Mono"
                    fontSize="10"
                    x="125"
                    y="115"
                  >
                    HIP EXTENSION MAX
                  </text>

                  {/* Landing Point Marker */}
                  <line
                    stroke="currentColor"
                    strokeWidth="2.5"
                    x1="340"
                    x2="340"
                    y1="145"
                    y2="180"
                  />
                  <text
                    fill="currentColor"
                    fontFamily="Space Mono"
                    fontSize="11"
                    fontWeight="bold"
                    x="315"
                    y="140"
                  >
                    298 cm
                  </text>
                </svg>
              </div>
            </div>

            <div className="mt-6 pt-3 bg-[#0e0e0e] border border-[#2a2a2a] p-4">
              <div className="flex items-center justify-between text-[#c3f400] font-telemetry text-[12px] font-bold">
                <span>PERFECT RECORD PROBABILITY: 99.1%</span>
                <span>수석 합격선 진입</span>
              </div>
              <p className="font-sans text-[12px] text-[#9e9b9a] mt-1.5">
                공중자세 전방 폴딩 메커니즘을 통한 유효 착지 거리 +18cm 극대화 테크닉.
              </p>
            </div>
          </div>
        </div>

        {/* Real-Time Kinematic Telemetry Instrumentation Strip */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:p-6 bg-[#1c1b1b] border border-[#2a2a2a] shadow-[2px_2px_0px_#000000]">
          <div className="flex flex-col gap-1 p-3 bg-[#0e0e0e] border border-[#2a2a2a]">
            <span className="font-telemetry text-[10px] text-[#9e9b9a] uppercase">
              무릎 굴곡 각도 (KNEE FLEXION)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-telemetry text-[22px] text-[#ffffff] font-bold">
                112.4°
              </span>
              <span className="font-telemetry text-[11px] text-[#c3f400] font-bold">
                OPTIMAL 110-115°
              </span>
            </div>
            <div className="w-full bg-[#2a2a2a] h-1 mt-1">
              <div className="bg-[#c3f400] h-full w-[82%]"></div>
            </div>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-[#0e0e0e] border border-[#2a2a2a]">
            <span className="font-telemetry text-[10px] text-[#9e9b9a] uppercase">
              족관절 배굴력 (ANKLE TORQUE)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-telemetry text-[22px] text-[#c3f400] font-bold">
                380 N·m
              </span>
              <span className="font-telemetry text-[11px] text-[#ffffff] font-bold">
                +45 N·m vs AVG
              </span>
            </div>
            <div className="w-full bg-[#2a2a2a] h-1 mt-1">
              <div className="bg-[#c3f400] h-full w-[94%]"></div>
            </div>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-[#0e0e0e] border border-[#2a2a2a]">
            <span className="font-telemetry text-[10px] text-[#9e9b9a] uppercase">
              지면반력 수직/수평비 (H/V RATIO)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-telemetry text-[22px] text-[#ff5625] font-bold">
                1.48
              </span>
              <span className="font-telemetry text-[11px] text-[#ffb5a0] font-bold">
                PERFECT VECTOR
              </span>
            </div>
            <div className="w-full bg-[#2a2a2a] h-1 mt-1">
              <div className="bg-[#ff5625] h-full w-[88%]"></div>
            </div>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-[#0e0e0e] border border-[#2a2a2a]">
            <span className="font-telemetry text-[10px] text-[#9e9b9a] uppercase">
              질량중심 정점고도 (MAX APOGEE)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-telemetry text-[22px] text-[#ffffff] font-bold">
                1.24 m
              </span>
              <span className="font-telemetry text-[11px] text-[#c3f400] font-bold">
                HANG 0.612s
              </span>
            </div>
            <div className="w-full bg-[#2a2a2a] h-1 mt-1">
              <div className="bg-[#c3f400] h-full w-[78%]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
