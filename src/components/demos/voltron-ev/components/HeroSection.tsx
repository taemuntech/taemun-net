import React, { useEffect, useState } from 'react';
import { Sliders, FileText, Terminal, Shield, Zap } from 'lucide-react';

/**
 * 계측 표시값 — 데스크톱 오버레이와 모바일 카드가 **같은 값**을 쓴다.
 * 예전에는 오버레이 두 개가 둘 다 `hidden lg:block` 이라 폰·태블릿에서는 배경 사진만 남았는데,
 * 모바일 서랍에는 「TELEMETRY HUD」로 가는 항목이 있었다(가 보면 아무 계측도 없는 자리).
 */
const TELEMETRY_ROWS: { label: string; value: string; tone: 'good' | 'accent' | 'plain' }[] = [
  { label: '800V SYSTEM STATUS', value: 'ACTIVE // NOMINAL', tone: 'good' },
  { label: 'POWER DELIVERY', value: '720 kW PEAK', tone: 'accent' },
  { label: 'MOTOR TEMP', value: '45°C (GLYCOL LOOP)', tone: 'plain' },
  { label: 'BATTERY SOC', value: '88.4%', tone: 'plain' },
  { label: 'INV EFFICIENCY', value: '98.7% @ 120kHz', tone: 'accent' },
  { label: 'TORQUE VECTORING', value: 'SUB-MILLISECOND ON', tone: 'good' },
];

const TELEMETRY_TONE = {
  good: 'text-[#5be9ad] font-bold',
  accent: 'text-[#00e5ff] font-bold',
  plain: 'text-[#e1e2ea]',
} as const;

const GATE_PULSE_ROWS = [
  { label: 'V_DS // I_PK', value: '804V // 920A' },
  { label: 'SWITCHING TIME', value: '14.2 ns' },
  { label: 'THERMAL CONDUCTANCE', value: '0.12 K/W' },
];

interface HeroSectionProps {
  onLaunchSimulator: () => void;
  onDownloadWhitepaper: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchSimulator,
  onDownloadWhitepaper,
}) => {
  // Dynamic waveform bars state to simulate active 120kHz switching oscilloscope
  const [waveSeed, setWaveSeed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWaveSeed(s => (s + 1) % 100);
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const waveformHeights = [
    65 + Math.sin(waveSeed * 0.8) * 15,
    30 + Math.cos(waveSeed * 0.9) * 10,
    85 + Math.sin(waveSeed * 1.1) * 12,
    40 + Math.cos(waveSeed * 0.7) * 15,
    75 + Math.sin(waveSeed * 0.6) * 18,
    25 + Math.cos(waveSeed * 1.3) * 10,
    95 + Math.sin(waveSeed * 1.5) * 5,
    45 + Math.cos(waveSeed * 1.0) * 15,
    80 + Math.sin(waveSeed * 0.8) * 12,
    35 + Math.cos(waveSeed * 1.2) * 10,
    88 + Math.sin(waveSeed * 1.4) * 8,
    28 + Math.cos(waveSeed * 0.5) * 8,
    70 + Math.sin(waveSeed * 0.9) * 15,
    42 + Math.cos(waveSeed * 1.1) * 12,
  ];

  return (
    <section
      id="powertrain"
      className="relative pt-8 pb-16 lg:py-20 hud-grid border-b border-[#3b494c]/30 overflow-hidden"
    >
      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#00e5ff]/10 blur-[130px] rounded-full pointer-events-none glow-pulse" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#0053db]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Top Badging & Eyebrow */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            id="badge-tier1-asil"
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#101319] border border-[#00e5ff]/50 text-[#00e5ff] font-code text-[11px] uppercase tracking-wider shadow-[0_0_10px_rgba(0,229,255,0.2)]"
          >
            <span className="w-2 h-2 rounded-sm bg-[#00e5ff]" />
            TIER-1 OEM ARCHITECTURE // ASIL-D ISO 26262 (예시 표기)
          </span>
          <span
            id="badge-gen3-sic"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#191c21] border border-[#3b494c]/50 text-[#bac9cc] font-code text-[11px]"
          >
            <Zap className="w-3.5 h-3.5 text-[#5be9ad]" />
            3RD GENERATION 1,200V SILICON CARBIDE
          </span>
          <span className="font-code text-[11px] text-[#849396]">
            // REVISION: 2026.04-VLT
          </span>
        </div>

        {/* Main Headline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8 space-y-4">
            <h1
              id="hero-main-title"
              className="font-display text-3xl lg:text-5xl xl:text-[56px] lg:leading-[64px] text-[#e1e2ea] font-bold tracking-tight uppercase"
            >
              Propelling Next-Gen{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#c3f5ff] to-[#b4c5ff]">
                800V Electric
              </span>{' '}
              Mobility
            </h1>

            <p
              id="hero-korean-subtitle"
              className="font-display text-lg lg:text-xl text-[#00e5ff]/90 font-medium break-keep"
            >
              한계를 뛰어넘는 차세대 800V SiC 전력 모빌리티 솔루션
            </p>

            <p className="font-body text-base lg:text-lg text-[#bac9cc] max-w-3xl leading-relaxed">
              Hypercar-class Tier-1 powertrain engineering. Integrating
              ultra-low loss 1,200V Silicon Carbide (SiC) power modules, 32,000 RPM continuous
              hairpin motors, and megawatt bi-directional charging architecture for hypercars and
              mission-critical commercial platforms. (가상 브랜드 샘플 — 화면의 사양은 모두 예시 수치입니다.)
            </p>

            {/* CTA Action Row */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                id="btn-hero-launch-sim"
                onClick={onLaunchSimulator}
                className="clip-chamfer px-6 py-3.5 bg-[#00e5ff] text-[#0b0e13] font-display text-xs tracking-wider uppercase font-bold shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.7)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Sliders className="w-4 h-4 stroke-[2.5]" />
                LAUNCH CHARGING SIMULATOR
              </button>

              <button
                id="btn-hero-download-whitepaper"
                onClick={onDownloadWhitepaper}
                className="px-5 py-3.5 rounded border border-[#3b494c] hover:border-[#00e5ff] text-[#c3f5ff] font-display text-xs tracking-wider uppercase bg-[#1d2025]/60 backdrop-blur-sm transition-all flex items-center gap-2 hover:bg-[#1d2025] cursor-pointer"
              >
                {/* 실제로 내려받는 파일이 없다 — 자료 신청 카드로 데려가는 버튼이라 라벨·아이콘도 그렇게 맞춘다 */}
                <FileText className="w-4 h-4" />
                REQUEST 2026 TIER-1 WHITEPAPER
              </button>

              <div className="flex items-center gap-2 text-xs font-code text-[#bac9cc] ml-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5be9ad] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5be9ad]"></span>
                </span>
                {/* 샘플 브랜드라 실제 응대 시간을 약속하지 않는다 — 예시 표기임을 붙인다 */}
                <span>DIRECT LAB ACCESS 24/7 (예시 표기)</span>
              </div>
            </div>
          </div>

          {/* Right Quick Status HUD Panel */}
          <div
            id="panel-bench-status-hud"
            className="lg:col-span-4 hud-bracket p-5 rounded bg-[#191c21]/80 border border-[#3b494c]/40 backdrop-blur-md space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#3b494c]/30 pb-2.5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00e5ff]" />
                <span className="font-code text-xs font-bold text-[#c3f5ff]">
                  POWERTRAIN BENCH STATUS
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-code bg-[#5be9ad]/20 text-[#5be9ad] border border-[#5be9ad]/40 font-bold">
                ONLINE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-code">
              <div className="p-2.5 rounded bg-[#0b0e13] border border-[#3b494c]/20">
                <span className="text-[#849396] text-[10px] block">NOMINAL DC BUS</span>
                <span className="text-[#00e5ff] font-bold text-base">804.2 V</span>
                <span className="text-[10px] text-[#5be9ad] block">▲ +0.4% STABLE</span>
              </div>

              <div className="p-2.5 rounded bg-[#0b0e13] border border-[#3b494c]/20">
                <span className="text-[#849396] text-[10px] block">PEAK OUTPUT</span>
                <span className="text-[#e1e2ea] font-bold text-base">720.0 kW</span>
                <span className="text-[10px] text-[#00e5ff] block">MEGABOOST READY</span>
              </div>

              <div className="p-2.5 rounded bg-[#0b0e13] border border-[#3b494c]/20">
                <span className="text-[#849396] text-[10px] block">GATE RESISTOR</span>
                <span className="text-[#e1e2ea] font-bold text-base">0.82 Ω</span>
                <span className="text-[10px] text-[#849396] block">SiC MICRO-TRENCH</span>
              </div>

              <div className="p-2.5 rounded bg-[#0b0e13] border border-[#3b494c]/20">
                <span className="text-[#849396] text-[10px] block">MAX ROTOR SPEED</span>
                <span className="text-[#e1e2ea] font-bold text-base">32,450 RPM</span>
                <span className="text-[10px] text-[#b4c5ff] block">HAIRPIN WINDING</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#101319] border border-[#3b494c]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00e5ff]" />
                <span className="font-code text-xs text-[#e1e2ea]">ISO-26262 ASIL-D ENCLAVE</span>
              </div>
              <span className="font-code text-xs text-[#5be9ad] font-bold">LOCKED &amp; VERIFIED</span>
            </div>
          </div>
        </div>

        {/* HERO VISUAL STAGE: Cleanroom Rig & Overlay */}
        <div
          id="telemetry-hud"
          className="relative rounded-lg overflow-hidden border border-[#00e5ff]/30 bg-[#1d2025] shadow-[0_0_35px_rgba(0,229,255,0.15)] mb-12 group"
        >
          {/* Cleanroom Rig Base Visual Image */}
          <div className="relative w-full aspect-[16/9] max-h-[720px] overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuH9dhKEGOXl9MUS1-15lZbD4svmbG6pkN0tXJsQB5cLosabyyekdX6Mrw74JD4U4zqRKJZw87--7ry_hmFPDEHiRgjjrvVDAIa4n-F1YKb6tks3OnGrtmhf4MgZQQk8hEWveISYYxEYqYfrxm10t4ArOyp5P4KhqgoePRDYOqdlOduTh1aZLq5j17bBGbAvW4qRlJPSWMjNNEYfS2kkPXEPN4204kOB9bnpudWwHeE9rpeOy_O34E"
              alt="VOLTRON 800V Powertrain Cleanroom Test Rig and SiC Inverter Telemetry HUD"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e13] via-transparent to-[#0b0e13]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e13]/80 via-transparent to-[#0b0e13]/60 pointer-events-none" />

            {/* Top-Left HUD Reticle Overlay */}
            <div className="absolute top-6 left-6 p-4 rounded bg-[#0b0e13]/85 backdrop-blur-md border border-[#00e5ff]/40 text-[#e1e2ea] shadow-2xl max-w-sm hidden lg:block">
              {/* gap 이 없어 1440 실측에서 「RIG-09」+「LIVE ASIL-D」, 「TORQUE VECTORING:」+값이 붙어 한 낱말로 읽혔다 */}
              <div className="flex items-center justify-between gap-3 border-b border-[#3b494c]/40 pb-2 mb-3">
                <span className="font-code text-xs text-[#00e5ff] font-bold flex items-center gap-1.5 min-w-0">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
                  </span>
                  POWERTRAIN BENCH // RIG-09
                </span>
                <span className="font-code text-[10px] text-[#849396] shrink-0">LIVE ASIL-D</span>
              </div>

              <div className="space-y-1.5 font-code text-xs">
                {TELEMETRY_ROWS.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4">
                    <span className="text-[#bac9cc] shrink-0">{row.label}:</span>
                    <span className={`text-right ${TELEMETRY_TONE[row.tone]}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom-Right Live Waveform Box */}
            <div className="absolute bottom-6 right-6 p-4 rounded bg-[#0b0e13]/90 backdrop-blur-md border border-[#3b494c]/50 max-w-md hidden lg:block">
              <div className="flex items-center justify-between gap-3 text-xs font-code mb-2">
                <span className="text-[#c3f5ff] font-bold">SiC GATE PULSE (120 kHz PWM)</span>
                <span className="text-[#5be9ad] font-mono text-right shrink-0">V_DS: 804V // I_PK: 920A</span>
              </div>

              {/* Dynamic Waveform Visual */}
              <div className="h-14 w-full flex items-end gap-1 px-1 py-1 bg-[#272a30]/40 rounded border border-[#3b494c]/30">
                {waveformHeights.map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-xs transition-all duration-300 ${ i === 6 ? 'bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]' : i % 2 === 0 ? 'bg-[#00e5ff]/85' : 'bg-[#00e5ff]/35' }`}
                    style={{ height: `${Math.min(100, Math.max(12, h))}%` }}
                  />
                ))}
              </div>

              <div className="flex justify-between gap-3 text-[10px] font-code text-[#849396] mt-1.5">
                <span>SWITCHING TIME: 14.2 ns</span>
                <span className="text-right shrink-0">THERMAL CONDUCTANCE: 0.12 K/W</span>
              </div>
            </div>
          </div>

          {/*
            폰·태블릿용 계측 — 위 오버레이 두 개는 사진 위에 얹혀야 읽히는 구성이라 lg 미만에서는 감춘다.
            대신 같은 값을 사진 아래에 카드로 쌓아 「TELEMETRY HUD」로 온 사람이 빈 사진만 보지 않게 한다.
          */}
          <div className="lg:hidden border-t border-[#3b494c]/50 bg-[#0b0e13]/95 p-4 space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-[#3b494c]/40 pb-2">
              <span className="font-code text-xs text-[#00e5ff] font-bold flex items-center gap-1.5 min-w-0">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
                </span>
                POWERTRAIN BENCH // RIG-09
              </span>
              <span className="font-code text-[10px] text-[#849396] shrink-0">LIVE ASIL-D</span>
            </div>

            <dl className="space-y-1.5 font-code text-[11px]">
              {TELEMETRY_ROWS.map((row) => (
                <div key={row.label} className="flex justify-between gap-3">
                  <dt className="text-[#bac9cc] shrink-0">{row.label}:</dt>
                  <dd className={`text-right ${TELEMETRY_TONE[row.tone]}`}>{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="pt-3 border-t border-[#3b494c]/40">
              <span className="block font-code text-[11px] text-[#c3f5ff] font-bold mb-2">
                SiC GATE PULSE (120 kHz PWM)
              </span>
              <div className="h-12 w-full flex items-end gap-1 px-1 py-1 bg-[#272a30]/40 rounded border border-[#3b494c]/30 mb-2">
                {waveformHeights.map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-xs transition-all duration-300 ${
                      i === 6 ? 'bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]' : i % 2 === 0 ? 'bg-[#00e5ff]/85' : 'bg-[#00e5ff]/35'
                    }`}
                    style={{ height: `${Math.min(100, Math.max(12, h))}%` }}
                  />
                ))}
              </div>
              <dl className="space-y-1 font-code text-[10px] text-[#849396]">
                {GATE_PULSE_ROWS.map((row) => (
                  <div key={row.label} className="flex justify-between gap-3">
                    <dt className="shrink-0">{row.label}:</dt>
                    <dd className="text-right text-[#bac9cc]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="font-code text-[10px] text-[#849396]">아래 수치는 모두 예시 계측값입니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
