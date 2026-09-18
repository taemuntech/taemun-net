import React, { useState } from 'react';
import { Cpu, Wind, Gauge, ArrowRight } from 'lucide-react';
import { ArchitectureComponent } from '../types';
import { DetailModal } from './DetailModal';

export const ArchitectureExplorer: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<ArchitectureComponent | null>(null);

  const components: ArchitectureComponent[] = [
    {
      id: 'arch-01',
      code: 'ARCH-01',
      badge: 'SiC WAFER-LEVEL',
      title: '1,200V Silicon Carbide (SiC) Power Inverter',
      summary:
        'Proprietary micro-trench planar SiC MOSFET dies delivering up to 70% switching loss abatement over conventional IGBT modules. Engineered with double-sided direct water-glycol pin-fin cooling.',
      icon: 'cpu',
      specs: [
        { label: 'BLOCKING VOLTAGE:', value: '1,200 VDC', highlight: false },
        { label: 'SWITCHING FREQ:', value: 'Up to 150 kHz', highlight: true, color: 'text-[#00e5ff]' },
        { label: 'PEAK CURRENT (RMS):', value: '950 A', highlight: false },
        { label: 'JUNCTION TEMP (Tj):', value: '-40°C to +175°C', highlight: true, color: 'text-[#5be9ad]' },
      ],
      footerTag: 'COOLING: PIN-FIN DIRECT',
      actionText: 'SPEC DATASHEET',
      colorTheme: 'cyan',
      fullDetails: {
        description:
          'Engineered for maximum gravimetric power density (>55 kW/L), our 3rd generation 1,200V SiC Inverter integrates trench-assisted planar MOSFET bare dies with zero-bondwire sintered silver contacts. The direct water-glycol pin-fin heatsink dissipates up to 250 W/cm² of continuous localized thermal flux.',
        keyFeatures: [
          'Sub-15ns switching transients at 800V DC link',
          'Sintered copper/silver top-side die attachment',
          'Integrated Desat & Rogowski coil current protection',
          'AEC-Q101 Grade 0 automotive qualification',
        ],
        technicalTable: [
          { param: 'Continuous Phase Current (Arms)', val: '650 A', tol: '±1.5%' },
          { param: 'Maximum Gate-Source Voltage (Vgs)', val: '+18V / -4V', tol: 'Standard' },
          { param: 'On-Resistance Rds(on) @ 25°C', val: '1.2 mΩ', tol: '±5%' },
          { param: 'Thermal Resistance Rth(j-f)', val: '0.08 K/W', tol: 'Pin-Fin' },
          { param: 'Inverter Enclosure Volume', val: '8.4 Liters', tol: 'Dry Mass: 8.9 kg' },
        ],
      },
    },
    {
      id: 'arch-02',
      code: 'ARCH-02',
      badge: 'E-AXLE CORE',
      title: '32,000 RPM Continuous Hairpin Stator Motor',
      summary:
        'Utilizing 97.4% slot fill factor rectangular flat copper conductors. Equipped with hollow-shaft rotor oil-jet impingement cooling and dual ASIL-D resolver sensors for millisecond torque response.',
      icon: 'wind',
      specs: [
        { label: 'MAX CONTINUOUS RPM:', value: '32,000 RPM', highlight: true, color: 'text-[#b4c5ff]' },
        { label: 'POWER DENSITY:', value: '14.8 kW / kg', highlight: false },
        { label: 'PEAK TORQUE:', value: '920 Nm instantaneous', highlight: false },
        { label: 'ROTOR SLEEVE:', value: 'Carbon Fiber Overwrap', highlight: true, color: 'text-[#00e5ff]' },
      ],
      footerTag: 'SLOT FACTOR: 97.4%',
      actionText: 'CAD SCHEMATICS',
      colorTheme: 'purple',
      fullDetails: {
        description:
          'Pushing radial stress boundaries to 32,000 RPM, the rotor integrates ultra-thin 0.20mm electrical silicon steel laminations bound by aerospace-grade pre-tensioned carbon fiber sleeve. Internal oil spray impinges directly into the stator winding end-turns to prevent hot-spot degredation.',
        keyFeatures: [
          'High slot fill factor 97.4% flat hairpin winding',
          'Centrifugal hollow-shaft lubrication circuit',
          'Low harmonic cogging torque (< 0.8% rated)',
          'Over-speed proof test validated up to 36,000 RPM',
        ],
        technicalTable: [
          { param: 'Peak Mechanical Power', val: '450 kW (612 PS)', tol: 'Hot rating' },
          { param: 'Continuous Mechanical Power', val: '320 kW (435 PS)', tol: 'ISO rating' },
          { param: 'Maximum Continuous Torque', val: '640 Nm', tol: '0-7,500 RPM' },
          { param: 'Motor Mass (Dry)', val: '30.4 kg', tol: 'Gravimetric: 14.8 kW/kg' },
          { param: 'Coolant Flow Rate (ATF/Synthetic)', val: '18 L/min', tol: '65°C inlet' },
        ],
      },
    },
    {
      id: 'arch-03',
      code: 'ARCH-03',
      badge: 'TELEMETRY DIST',
      title: '800V High-Voltage Integrated Junction & BMS',
      summary:
        'Ultra-fast pyro-fuse emergency isolation actuated in sub-2ms under short-circuit anomalies. Contactless fluxgate current sensing paired with bi-directional 22kW V2G/V2X onboard power export.',
      icon: 'gauge',
      specs: [
        { label: 'SCRAM DISCONNECT:', value: '< 1.8 ms (Pyro-Fuse)', highlight: true, color: 'text-[#5be9ad]' },
        { label: 'V2X BIDIRECTIONAL:', value: '22 kW AC / 100 kW DC', highlight: false },
        { label: 'CELL MONITORING:', value: '192 Channels (16-bit)', highlight: false },
        { label: 'ISOLATION RESISTANCE:', value: '> 500 MΩ @ 1kV', highlight: true, color: 'text-[#00e5ff]' },
      ],
      footerTag: 'ASIL-D PYRO-ACTUATION',
      actionText: 'SAFETY DOSSIER',
      colorTheme: 'emerald',
      fullDetails: {
        description:
          'Combining battery state estimation, pre-charge contactors, and high-voltage power distribution in a single electromagnetic-shielded enclosure. Features multi-core lockstep microcontrollers running real-time electrochemical impedance spectroscopy (EIS) to detect lithium plating.',
        keyFeatures: [
          'Sub-2ms pyro-switch circuit interruption',
          '16-bit synchronous cell voltage sampling (< 1mV accuracy)',
          'Isolated CAN-FD and 100BASE-T1 Automotive Ethernet',
          'Integrated 22kW AC onboard bidirectional bi-phase inverter',
        ],
        technicalTable: [
          { param: 'DC Operational Range', val: '520V – 920V DC', tol: 'Continuous' },
          { param: 'Short Circuit Withstand Rating', val: '25 kA', tol: '< 2.0 ms cutoff' },
          { param: 'Auxiliary 12V/48V Output', val: '3.6 kW DC-DC', tol: '96.5% efficiency' },
          { param: 'Isolation Proof Voltage', val: '3,500 VAC', tol: '60 seconds' },
          { param: 'Operating Enclosure Rating', val: 'IP6K9K / IP67', tol: 'Hermetic' },
        ],
      },
    },
  ];

  return (
    <section
      id="sic-semiconductor"
      className="py-16 lg:py-24 bg-[#101319] border-b border-[#3b494c]/30 relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="max-w-3xl mb-14">
          <span className="font-code text-xs text-[#00e5ff] uppercase tracking-widest block mb-2">
            // HARDWARE STACK INSPECTION
          </span>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#e1e2ea] tracking-tight uppercase">
            Explosive Powertrain Architecture Component Explorer
          </h2>
          <p className="font-body text-sm text-[#bac9cc] mt-2 leading-relaxed">
            모빌리티의 물리적 한계를 재정의하는 3대 핵심 서브시스템: 1,200V SiC 인버터, 32,000 RPM 헤어핀 모터,
            지능형 800V 전력 분배 BMS.
          </p>
        </div>

        {/* 3 Core Architecture Pillars Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {components.map(comp => (
            <div
              key={comp.id}
              id={`card-${comp.id}`}
              className={`hud-bracket p-7 rounded-lg bg-[#191c21] border border-[#3b494c]/40 transition-all flex flex-col justify-between shadow-xl ${ comp.colorTheme === 'cyan' ? 'hover:border-[#00e5ff]/70' : comp.colorTheme === 'purple' ? 'hover:border-[#b4c5ff]/70' : 'hover:border-[#5be9ad]/70' }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-[#3b494c]/30 pb-3 mb-5">
                  <span
                    className={`font-code text-xs font-bold whitespace-nowrap ${ comp.colorTheme === 'cyan' ? 'text-[#00e5ff]' : comp.colorTheme === 'purple' ? 'text-[#b4c5ff]' : 'text-[#5be9ad]' }`}
                  >
                    // {comp.code}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-code border whitespace-nowrap shrink-0 ${ comp.colorTheme === 'cyan' ? 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/40' : comp.colorTheme === 'purple' ? 'bg-[#b4c5ff]/20 text-[#b4c5ff] border-[#b4c5ff]/40' : 'bg-[#5be9ad]/20 text-[#5be9ad] border-[#5be9ad]/40' }`}
                  >
                    {comp.badge}
                  </span>
                </div>

                {/* 제목이 2~3줄이면 items-center 가 아이콘을 가운데로 띄워 어긋나 보였다 — 위로 맞춘다 */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`p-2 shrink-0 rounded bg-[#1d2025] ${ comp.colorTheme === 'cyan' ? 'text-[#00e5ff]' : comp.colorTheme === 'purple' ? 'text-[#b4c5ff]' : 'text-[#5be9ad]' }`}
                  >
                    {comp.icon === 'cpu' ? (
                      <Cpu className="w-6 h-6" />
                    ) : comp.icon === 'wind' ? (
                      <Wind className="w-6 h-6" />
                    ) : (
                      <Gauge className="w-6 h-6" />
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#e1e2ea] min-w-0">
                    {comp.title}
                  </h3>
                </div>

                <p className="font-body text-xs text-[#bac9cc] mb-6 leading-relaxed">
                  {comp.summary}
                </p>

                {/* Technical Spec Register */}
                <div className="space-y-2 border-t border-[#3b494c]/20 pt-4 font-code text-xs">
                  {comp.specs.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between gap-3 py-1 border-b border-[#3b494c]/10"
                    >
                      <span className="text-[#849396] shrink-0">{s.label}</span>
                      <span
                        className={`font-bold text-right ${ s.highlight ? s.color : 'text-[#e1e2ea]' }`}
                      >
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#3b494c]/30 flex items-center justify-between gap-3">
                <span className="font-code text-xs text-[#849396]">{comp.footerTag}</span>
                {/* 탭 대상이 116×16 이었다 — 보이는 글자는 그대로 두고 눌리는 높이만 44px 로 */}
                <button
                  id={`btn-view-${comp.id}`}
                  onClick={() => setSelectedComp(comp)}
                  aria-haspopup="dialog"
                  className={`text-xs font-display flex items-center justify-end gap-1 font-bold cursor-pointer group hover:underline whitespace-nowrap shrink-0 min-h-11 lg:min-h-0 -my-3 lg:my-0 px-1 ${ comp.colorTheme === 'cyan' ? 'text-[#00e5ff]' : comp.colorTheme === 'purple' ? 'text-[#b4c5ff]' : 'text-[#5be9ad]' }`}
                >
                  {comp.actionText}
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal View */}
      <DetailModal component={selectedComp} onClose={() => setSelectedComp(null)} />
    </section>
  );
};
