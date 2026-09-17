import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * Bay 42 적재 단면 — 칸 하나하나가 실제 데이터를 가진다.
 * 전에는 24칸이 cursor-pointer·hover:scale 만 달린 장식이라 눌러도 아무 일도 없었다(죽은 기능).
 */
type BaySlot = {
  slot: string;
  kind: 'STANDARD' | 'HAZMAT' | 'REEFER';
  label: string;
  weight: string;
  discharge: string;
  note: string;
};

const SLOT_KIND = {
  STANDARD: { bg: 'bg-[#2563eb]', ring: 'ring-[#b4c5ff]', label: 'Standard 40HQ' },
  HAZMAT: { bg: 'bg-[#fe6b00]', ring: 'ring-[#ffb693]', label: 'IMDG Hazmat Class 3' },
  REEFER: { bg: 'bg-sky-500', ring: 'ring-sky-200', label: 'Reefer Cold Chain -18°C' },
} as const;

const DISCHARGE_PORTS = ['Rotterdam MV2', 'Hamburg CTA', 'Antwerp K1700', 'Le Havre T2'];

const BAY_SLOTS: BaySlot[] = Array.from({ length: 24 }).map((_, idx) => {
  const kind: BaySlot['kind'] =
    idx === 2 || idx === 11 || idx === 12 ? 'HAZMAT' : idx === 5 || idx === 6 || idx === 14 ? 'REEFER' : 'STANDARD';
  const tier = String(Math.floor(idx / 8) * 2 + 82).padStart(2, '0');
  const row = String((idx % 8) * 2 + 1).padStart(2, '0');
  return {
    slot: `42-${row}-${tier}`,
    kind,
    label: SLOT_KIND[kind].label,
    // toFixed 를 거치지 않으면 21.4 + 0.6*3 이 23.200000000000003 으로 찍힌다
    weight: `${(kind === 'REEFER'
      ? 24.2 + (idx % 5) * 0.4
      : kind === 'HAZMAT'
        ? 18.6 + (idx % 4) * 0.5
        : 21.4 + (idx % 7) * 0.6
    ).toFixed(1)} t`,
    discharge: DISCHARGE_PORTS[idx % DISCHARGE_PORTS.length],
    note:
      kind === 'HAZMAT'
        ? 'IMDG 격리 규정에 따라 거주구·기관실에서 이격 배치'
        : kind === 'REEFER'
          ? '리퍼 플러그 확보 · 급전 이중화 구역'
          : '중량 하단 배치로 GM 여유 확보',
  };
});

export const PillarsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pillar1' | 'pillar2' | 'pillar3' | 'pillar4'>('pillar1');
  const [selectedSlot, setSelectedSlot] = useState<number>(11);

  return (
    <section id="automationSection" className="py-12 bg-[#061426] border-b border-[#434655]/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
          <div>
            <span className="font-mono text-xs text-[#b4c5ff] uppercase tracking-widest block mb-1">
              MARITIME DEEP TECH &amp; ROBOTICS ARCHITECTURE
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Next-Gen Autonomous Marine Logistics Pillars
            </h2>
            <p className="text-sm text-[#c3c6d7] max-w-2xl mt-1">
              From automated unmanned container yards to dynamic AI metacentric stowage and cold chain biosensors.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1 w-full lg:w-auto bg-[#0e1c2f] p-1 rounded-lg border border-[#434655]/30">
            <button
              onClick={() => setActiveTab('pillar1')}
              className={`px-3 min-h-11 lg:min-h-0 lg:py-1.5 rounded text-xs font-semibold transition-all ${ activeTab === 'pillar1' ? 'bg-[#2563eb] text-white shadow' : 'text-[#c3c6d7] hover:text-white' }`}
            >
              5G AGVs &amp; Cranes
            </button>
            <button
              onClick={() => setActiveTab('pillar2')}
              className={`px-3 min-h-11 lg:min-h-0 lg:py-1.5 rounded text-xs font-semibold transition-all ${ activeTab === 'pillar2' ? 'bg-[#2563eb] text-white shadow' : 'text-[#c3c6d7] hover:text-white' }`}
            >
              Digital Twin Stowage AI
            </button>
            <button
              onClick={() => setActiveTab('pillar3')}
              className={`px-3 min-h-11 lg:min-h-0 lg:py-1.5 rounded text-xs font-semibold transition-all ${ activeTab === 'pillar3' ? 'bg-[#2563eb] text-white shadow' : 'text-[#c3c6d7] hover:text-white' }`}
            >
              IoT Cold Chain Telemetry
            </button>
            <button
              onClick={() => setActiveTab('pillar4')}
              className={`px-3 min-h-11 lg:min-h-0 lg:py-1.5 rounded text-xs font-semibold transition-all ${ activeTab === 'pillar4' ? 'bg-[#2563eb] text-white shadow' : 'text-[#c3c6d7] hover:text-white' }`}
            >
              Green Methanol Fleet
            </button>
          </div>
        </div>

        {/* Tab 1: 5G AGVs & Cranes */}
        {activeTab === 'pillar1' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#132033] border border-[#434655]/30 rounded-lg p-6 lg:p-8 items-center shadow-xl">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center space-x-2 text-[#b4c5ff] font-mono text-xs uppercase mb-2">
                <span className="material-symbols-outlined text-[16px]">precision_manufacturing</span>
                <span>Pillar 01 • Unmanned Terminal Robotics</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                5G Autonomous Straddle Carriers &amp; AGV Systems
              </h3>
              <p className="text-sm text-[#c3c6d7] leading-relaxed mb-6">
                초고속 5G 초저지연 통신망과 라이다(LiDAR) 센서 퓨전을 적용한 24시간 무인 야드 크레인(ARMGC) 및 자율주행 이송 차량(AGV). 
                항만 병목을 줄이고 컨테이너 선적·양하 작업 주기를 28% 단축하는 것을 목표로 합니다. (예시 수치)
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="border-l-2 border-[#2563eb] pl-3">
                  <div className="font-mono text-xl lg:text-2xl font-bold text-white">36 moves/hr</div>
                  <div className="text-xs text-[#8d90a0]">Per Crane Productivity (예시 수치)</div>
                </div>
                <div className="border-l-2 border-[#fe6b00] pl-3">
                  <div className="font-mono text-xl lg:text-2xl font-bold text-[#ffb693]">Zero-Incident</div>
                  <div className="text-xs text-[#8d90a0]">Autonomous Safety Goal (예시)</div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#d6e3fe]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Centimeter-level RTK GPS positioning with dual ultrasonic anti-collision</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero-emission inductive rapid battery charging plates embedded in terminal lanes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0e1c2f] p-4 lg:p-5 rounded-lg border border-[#434655]/30">
              <div className="flex flex-wrap gap-x-3 gap-y-1 justify-between items-center mb-3 pb-2 border-b border-[#434655]/30">
                <span className="font-mono text-xs text-[#ffb693] uppercase font-semibold">
                  BUSAN SMART TERMINAL YARD A4 TELEMETRY (예시)
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold">42 AGVs ONLINE (예시)</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="bg-[#1d2a3e] p-2.5 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-white font-medium">AGV-018 (Autonomous Tier 4)</span>
                  <span className="text-[#b4c5ff]">Dispatch to Berth 02 • Battery 94%</span>
                  <span className="text-emerald-400 font-bold">ACTIVE</span>
                </div>

                <div className="bg-[#1d2a3e] p-2.5 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-white font-medium">AGV-024 (Heavy Duty 65T)</span>
                  <span className="text-[#b4c5ff]">Stowage Block C-14 • Speed 22km/h</span>
                  <span className="text-emerald-400 font-bold">ACTIVE</span>
                </div>

                <div className="bg-[#1d2a3e] p-2.5 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-white font-medium">Crane STS-08 (Remote AI Dual-Hoist)</span>
                  <span className="text-[#ffb693]">Moves completed: 184 / 200 TEU</span>
                  <span className="text-emerald-400 font-bold">LIFTING</span>
                </div>

                <div className="bg-[#1d2a3e] p-2.5 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-white font-medium">Yard Crane ARMGC-03</span>
                  <span className="text-[#8d90a0]">Scheduled automated battery swap</span>
                  <span className="text-amber-400 font-bold">MAINT</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Digital Twin Stowage AI */}
        {activeTab === 'pillar2' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#132033] border border-[#434655]/30 rounded-lg p-6 lg:p-8 items-center shadow-xl">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center space-x-2 text-[#b4c5ff] font-mono text-xs uppercase mb-2">
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                <span>Pillar 02 • Metacentric Stowage Intelligence</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                Digital Twin Dynamic Stowage AI
              </h3>
              <p className="text-sm text-[#c3c6d7] leading-relaxed mb-6">
                기상 변화, 파고, 선박의 메타센트릭 높이(GM)를 실시간 반영하여 24,000 TEU 컨테이너의 최적 위치를 수 초 내에 연산하는 디지털 트윈 알고리즘. 
                선박 저항을 줄이고 양하 포트별 재작업(Re-handling)을 94% 절감하는 것을 목표로 합니다. (예시 수치)
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="border-l-2 border-[#2563eb] pl-3">
                  <div className="font-mono text-xl lg:text-2xl font-bold text-white">-94.2%</div>
                  <div className="text-xs text-[#8d90a0]">Unnecessary Shift Moves (예시 수치)</div>
                </div>
                <div className="border-l-2 border-[#fe6b00] pl-3">
                  <div className="font-mono text-xl lg:text-2xl font-bold text-[#ffb693]">0.05 Sec</div>
                  <div className="text-xs text-[#8d90a0]">AI Stowage Bay Simulation (예시 수치)</div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#d6e3fe]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>IMO hazardous material (IMDG code) automated segregation compliance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dynamic ballast tank water trim optimization to reduce fuel consumption</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0e1c2f] p-4 lg:p-5 rounded-lg border border-[#434655]/30">
              <div className="flex flex-wrap gap-x-3 gap-y-1 justify-between items-center mb-3 pb-2 border-b border-[#434655]/30">
                <span className="font-mono text-xs text-[#b4c5ff] uppercase font-semibold">
                  BAY 42 CROSS-SECTION DENSITY MODEL (예시)
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold">STABILITY 99.8% (예시 수치)</span>
              </div>

              {/* 2D container matrix visualization */}
              <div className="grid grid-cols-8 gap-1.5 p-3 bg-[#020e21] rounded border border-[#434655]/40 mb-3">
                {BAY_SLOTS.map((slot, idx) => {
                  const kind = SLOT_KIND[slot.kind];
                  const isActive = selectedSlot === idx;
                  return (
                    <button
                      key={slot.slot}
                      type="button"
                      onClick={() => setSelectedSlot(idx)}
                      aria-pressed={isActive}
                      title={`${slot.slot} · ${slot.label}`}
                      className={`h-8 rounded-sm transition-all hover:brightness-125 flex items-center justify-center text-[9px] font-mono text-white/90 ${kind.bg} ${ isActive ? `ring-2 ring-offset-1 ring-offset-[#020e21] ${kind.ring} scale-105` : 'hover:scale-110' }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* 고른 칸의 적재 명세 — 칸을 누르면 여기가 바뀐다 */}
              <div className="mb-3 p-3 rounded bg-[#132033] border border-[#2563eb]/40 font-mono text-[11px] text-[#c3c6d7]">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
                  <span className="text-white font-bold">SLOT {BAY_SLOTS[selectedSlot].slot}</span>
                  <span className="text-[#b4c5ff]">{BAY_SLOTS[selectedSlot].label}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  <span>
                    <span className="text-[#8d90a0]">Gross Weight </span>
                    <span className="text-white">{BAY_SLOTS[selectedSlot].weight}</span>
                  </span>
                  <span>
                    <span className="text-[#8d90a0]">Discharge </span>
                    <span className="text-white">{BAY_SLOTS[selectedSlot].discharge}</span>
                  </span>
                </div>
                <p className="mt-1.5 text-[#8d90a0] leading-relaxed [word-break:keep-all]">
                  {BAY_SLOTS[selectedSlot].note} · 예시 데이터
                </p>
              </div>

              <div className="flex flex-wrap justify-between text-[#c3c6d7] font-mono text-xs gap-2">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-[#2563eb] inline-block rounded-xs" />
                  <span>Standard 40HQ</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-sky-500 inline-block rounded-xs" />
                  <span>Reefer Cold Chain</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-[#fe6b00] inline-block rounded-xs" />
                  <span>IMDG Hazmat</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: IoT Cold Chain Telemetry */}
        {activeTab === 'pillar3' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#132033] border border-[#434655]/30 rounded-lg p-6 lg:p-8 items-center shadow-xl">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center space-x-2 text-[#b4c5ff] font-mono text-xs uppercase mb-2">
                <span className="material-symbols-outlined text-[16px]">sensors</span>
                <span>Pillar 03 • Satellite Cold Chain Integrity</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                End-to-End IoT Cold Chain Telemetry
              </h3>
              <p className="text-sm text-[#c3c6d7] leading-relaxed mb-6">
                초저온 바이오 백신(-70°C)부터 정밀 반도체 및 고부가가치 농수산물까지. 
                선박, 항만 야드, 내륙 철도 인터모달 전 구간에서 온도 이탈 시 자율 보정 프로토콜이 즉각 가동됩니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="border-l-2 border-[#2563eb] pl-3">
                  <div className="font-mono text-xl lg:text-2xl font-bold text-white">±0.1 °C</div>
                  <div className="text-xs text-[#8d90a0]">Thermal Delta Accuracy (예시 수치)</div>
                </div>
                <div className="border-l-2 border-emerald-400 pl-3">
                  <div className="font-mono text-xl lg:text-2xl font-bold text-emerald-400">Zero-Excursion</div>
                  <div className="text-xs text-[#8d90a0]">Cold Chain Integrity Goal (예시)</div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#d6e3fe]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Electronic cold chain report generation for customs submission (예시)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automated dual genset backup during transshipment dwell periods</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0e1c2f] p-4 lg:p-5 rounded-lg border border-[#434655]/30">
              <div className="flex flex-wrap gap-x-3 gap-y-1 justify-between items-center mb-3 pb-2 border-b border-[#434655]/30">
                <span className="font-mono text-xs text-[#ffb693] uppercase font-semibold">
                  BIO-LOGISTICS AUDIT LOG (예시 데이터)
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold">COLD CHAIN PROTOCOL (예시)</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 bg-[#1d2a3e] rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5">
                  <div>
                    <span className="text-white block font-medium">Unit #REF-90214 (mRNA Vaccines)</span>
                    <span className="text-[10px] text-[#8d90a0]">Sensor ID: LEO-SN-8812</span>
                  </div>
                  <span className="text-[#b4c5ff] font-bold">-68.4°C (Target -70°C)</span>
                  <span className="text-emerald-400 font-bold">COMPLIANT</span>
                </div>

                <div className="p-3 bg-[#1d2a3e] rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5">
                  <div>
                    <span className="text-white block font-medium">Unit #REF-88412 (Fresh Premium Produce)</span>
                    <span className="text-[10px] text-[#8d90a0]">Sensor ID: LEO-SN-4109</span>
                  </div>
                  <span className="text-[#b4c5ff] font-bold">+1.8°C (Humidity 92%)</span>
                  <span className="text-emerald-400 font-bold">COMPLIANT</span>
                </div>

                <div className="p-3 bg-[#1d2a3e] rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5">
                  <div>
                    <span className="text-white block font-medium">Unit #REF-33019 (Lithium Precursors)</span>
                    <span className="text-[10px] text-[#8d90a0]">Sensor ID: LEO-SN-1290</span>
                  </div>
                  <span className="text-[#b4c5ff] font-bold">+18.0°C (Inert Gas Nominal)</span>
                  <span className="text-emerald-400 font-bold">COMPLIANT</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Green Methanol Fleet */}
        {activeTab === 'pillar4' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#132033] border border-[#434655]/30 rounded-lg p-6 lg:p-8 items-center shadow-xl">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center space-x-2 text-[#b4c5ff] font-mono text-xs uppercase mb-2">
                <span className="material-symbols-outlined text-[16px]">eco</span>
                <span>Pillar 04 • Decarbonized Marine Propulsion</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                Green Methanol &amp; Ammonia Eco-Fleet
              </h3>
              <p className="text-sm text-[#c3c6d7] leading-relaxed mb-6">
                국제 해운 탄소 규제와 배출권거래제 대응을 목표로 설계한 18척 규모의 차세대 친환경 자율운항 선단. (예시 설정) 
                풍력 보조 로터 세일(Rotor Sail)과 하이드로포일 트리밍으로 화석연료 의존도를 낮춥니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="border-l-2 border-emerald-400 pl-3">
                  <div className="font-mono text-xl lg:text-2xl font-bold text-emerald-400">-65.0%</div>
                  <div className="text-xs text-[#8d90a0]">Net Well-to-Wake Carbon (예시 수치)</div>
                </div>
                <div className="border-l-2 border-[#2563eb] pl-3">
                  <div className="font-mono text-xl lg:text-2xl font-bold text-white">18 Vessels</div>
                  <div className="text-xs text-[#8d90a0]">Dual-Fuel Commissioned (예시 설정)</div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#d6e3fe]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Green bunker supply agreements across Rotterdam, Busan &amp; Singapore (예시 설정)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ESG emissions reporting integration over standard ERP / EDI interfaces</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0e1c2f] p-4 lg:p-5 rounded-lg border border-[#434655]/30">
              <div className="flex flex-wrap gap-x-3 gap-y-1 justify-between items-center mb-3 pb-2 border-b border-[#434655]/30">
                <span className="font-mono text-xs text-emerald-400 uppercase font-semibold">
                  ENERGY EFFICIENCY DESIGN INDEX (예시 수치)
                </span>
                <span className="font-mono text-xs text-[#b4c5ff] font-bold">PHASE 4 TARGET</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="bg-[#1d2a3e] p-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5">
                  <div>
                    <span className="text-white block font-medium">MV Transocean Titan</span>
                    <span className="text-[10px] text-[#8d90a0]">Capacity: 24,000 TEU</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">Green Bio-Methanol</span>
                  <span className="text-white font-bold">9.2 g CO₂/t-nm</span>
                </div>

                <div className="bg-[#1d2a3e] p-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5">
                  <div>
                    <span className="text-white block font-medium">MV Transocean Pacific</span>
                    <span className="text-[10px] text-[#8d90a0]">Capacity: 18,500 TEU</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">Ammonia Ready Dual</span>
                  <span className="text-white font-bold">10.1 g CO₂/t-nm</span>
                </div>

                <div className="bg-[#1d2a3e] p-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5">
                  <div>
                    <span className="text-white block font-medium">MV Transocean Atlantic</span>
                    <span className="text-[10px] text-[#8d90a0]">Capacity: 16,000 TEU</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">Wind Rotor Assist</span>
                  <span className="text-white font-bold">8.9 g CO₂/t-nm</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
