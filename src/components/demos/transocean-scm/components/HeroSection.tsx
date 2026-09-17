import React from 'react';
import { DollarSign, Network, CheckCircle2, Leaf } from 'lucide-react';

interface HeroSectionProps {
  onTrackClick: () => void;
  onSimulateClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onTrackClick, onSimulateClick }) => {
  return (
    <section id="hero-mission-control" className="relative bg-[#020e21] border-b border-[#434655]/30 overflow-hidden pt-8 pb-12">
      {/* Subtle Ambient Radar Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Badges & Industry Classification */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center space-x-1.5 bg-[#132033] border border-[#2563eb]/40 px-3 py-1 rounded text-[#b4c5ff] font-mono text-xs">
            <span className="material-symbols-outlined text-[16px] text-[#2563eb]">verified_user</span>
            <span>2030 / 2050 Zero-Emission Roadmap (예시)</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 bg-[#132033] border border-[#fe6b00]/40 px-3 py-1 rounded text-[#ffb693] font-mono text-xs">
            <span className="material-symbols-outlined text-[16px] text-[#fe6b00]">flight_takeoff</span>
            <span>Level 4 Maritime Autonomy Target (예시)</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 bg-[#1d2a3e] px-2.5 py-1 rounded text-[#c3c6d7] font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>1,850,000 TEU Live Monitored (예시 수치)</span>
          </div>
        </div>

        {/* Headline & Korean Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className="lg:col-span-8">
            <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Orchestrating Autonomous{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b4c5ff] via-[#3b82f6] to-[#ffb693]">
                Global Commerce.
              </span>
            </h1>
            <p className="text-[#c3c6d7] text-sm lg:text-base max-w-3xl leading-relaxed">
              인공지능 기반 스마트 항만, 자율운항 컨테이너 선단, 실시간 디지털 트윈이 연결하는 무중단 글로벌 복합물류의 새로운 표준. 
              초정밀 AIS 텔레메트리와 스마트 적재 알고리즘으로 탄소 발자국 38.6% 감축, 정시성 99.4% 를 목표로 합니다. (화면의 모든 수치는 예시입니다)
            </p>
          </div>

          {/* Quick Action CTA Box */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            <button
              id="hero-track-btn"
              onClick={onTrackClick}
              className="w-full bg-[#2563eb] text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center hover:bg-[#1d4ed8] transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/20"
            >
              <span className="material-symbols-outlined text-[18px]">radar</span>
              <span>Track Container &amp; Fleet</span>
            </button>

            <button
              id="hero-simulate-btn"
              onClick={onSimulateClick}
              className="w-full bg-[#132033] border border-[#434655]/60 text-[#d6e3fe] px-5 py-3 rounded-lg text-xs font-semibold tracking-wider text-center hover:border-[#2563eb] hover:bg-[#1d2a3e] transition-all flex items-center justify-center space-x-2"
            >
              <span className="material-symbols-outlined text-[18px] text-[#ffb693]">calculate</span>
              <span>Simulate Freight &amp; ESG Rates</span>
            </button>

            <div className="sm:col-span-2 lg:col-span-1 font-mono text-[11px] text-[#8d90a0] text-center flex items-center justify-center space-x-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>ANSI X12 &amp; UN/EDIFACT API v4.2 Ready (예시)</span>
            </div>
          </div>
        </div>

        {/* Hero Cinematic Visual with Live Telemetry HUD */}
        <div className="relative rounded-lg overflow-hidden border border-[#434655]/40 shadow-2xl bg-[#061426]">
          {/* Primary Maritime Hero Video Stream */}
          <div className="relative w-full h-[300px] sm:h-[420px] lg:h-[580px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-cover block"
              src="/portfolio/transocean-scm/transocean-autonomous-ship.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-transparent to-[#061426]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061426]/70 via-transparent to-[#061426]/70 pointer-events-none" />

            {/* Radar Scanner Line Animation */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#b4c5ff] to-transparent radar-beam opacity-80 pointer-events-none" />
          </div>

          {/* Vessel Telemetry HUD Overlay (Top-Left) */}
          <div className="absolute top-3 left-3 w-[calc(100%-1.5rem)] max-w-xs bg-[#132033]/90 backdrop-blur-md border border-[#434655]/60 rounded-lg p-3 lg:p-4 text-[#d6e3fe] shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 pb-1.5 border-b border-[#434655]/30 mb-2">
              <span className="font-mono text-[11px] text-[#ffb693] uppercase flex items-center space-x-1.5 font-semibold">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>VESSEL TELEMETRY ACTIVE</span>
              </span>
              <span className="font-mono text-[11px] text-[#b4c5ff] whitespace-nowrap">VESSEL ID 0000000 (예시)</span>
            </div>

            <h3 className="text-base lg:text-lg font-bold text-white mb-0.5">MV TRANSOCEAN TITAN</h3>
            <p className="font-mono text-[11px] text-[#c3c6d7] mb-2.5">
              Capacity: 24,000 TEU • Dual-Fuel Green Methanol (예시)
            </p>

            <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-2 border-t border-[#434655]/30">
              <div>
                <span className="text-[#8d90a0] text-[10px] block">POSITION</span>
                <span className="text-white">Lat 34°12&apos;N, Lon 128°54&apos;E</span>
              </div>
              <div>
                <span className="text-[#8d90a0] text-[10px] block">CURRENT SPEED</span>
                <span className="text-emerald-400 font-semibold">19.4 Knots (Cruising)</span>
              </div>
              <div>
                <span className="text-[#8d90a0] text-[10px] block">CORRIDOR</span>
                <span className="text-white">Korea Strait &rarr; Rotterdam</span>
              </div>
              <div>
                <span className="text-[#8d90a0] text-[10px] block">LEO LINK</span>
                <span className="text-[#b4c5ff] font-semibold">LEO Sat Mesh 연결</span>
              </div>
            </div>
          </div>

          {/* AI Autonomous Navigation HUD (Top-Right) */}
          <div className="absolute top-4 right-4 hidden lg:block bg-[#132033]/90 backdrop-blur-md border border-[#434655]/60 rounded-lg p-3 shadow-xl">
            <div className="flex items-center space-x-3 text-[#d6e3fe]">
              <div className="w-10 h-10 rounded bg-[#2563eb]/20 flex items-center justify-center text-[#b4c5ff] border border-[#2563eb]/40">
                <span className="material-symbols-outlined text-[22px]">alt_route</span>
              </div>
              <div>
                <div className="font-mono text-[11px] text-[#b4c5ff] uppercase font-semibold">
                  Autonomous Navigation
                </div>
                <div className="text-sm font-bold text-white">Optimal Fuel Track -38.6%</div>
                <div className="font-mono text-[11px] text-[#8d90a0]">
                  Weather Wave Model: Safe Sea State 3
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Bay Stowage HUD (Bottom-Right) */}
          <div className="absolute bottom-4 right-4 hidden lg:flex items-center space-x-3 bg-[#0e1c2f]/95 backdrop-blur-md border border-[#434655]/60 p-3 rounded-lg shadow-xl">
            <div className="text-right">
              <span className="font-mono text-[10px] text-[#8d90a0] uppercase block">
                DYNAMIC BAY STOWAGE (예시 수치)
              </span>
              <span className="font-mono text-xs font-bold text-emerald-400">
                METACENTRIC HEIGHT (GM) 99.82% NOMINAL
              </span>
            </div>
            <div className="w-10 h-10 rounded border border-emerald-500/40 bg-emerald-950/40 flex items-center justify-center text-emerald-400">
              <span className="material-symbols-outlined text-[20px]">balance</span>
            </div>
          </div>
        </div>

        {/* 4-Column High-Impact Telemetry Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#132033] border border-[#434655]/30 p-4 rounded-lg hover:border-[#2563eb]/60 transition-all">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[11px] uppercase text-[#8d90a0]">
                Annual Managed Freight (예시 수치)
              </span>
              <DollarSign className="w-4 h-4 text-[#b4c5ff]" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-white">$14.8B+</div>
            <div className="font-mono text-xs text-[#ffb693] font-medium mt-0.5">
              1,850,000 TEU Global Lift
            </div>
          </div>

          <div className="bg-[#132033] border border-[#434655]/30 p-4 rounded-lg hover:border-[#2563eb]/60 transition-all">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[11px] uppercase text-[#8d90a0]">
                Interconnected Terminals (예시 수치)
              </span>
              <Network className="w-4 h-4 text-[#b4c5ff]" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-white">142 Ports</div>
            <div className="font-mono text-xs text-[#c3c6d7] mt-0.5">
              5G AGV &amp; Crane Automation
            </div>
          </div>

          <div className="bg-[#132033] border border-[#434655]/30 p-4 rounded-lg hover:border-[#2563eb]/60 transition-all">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[11px] uppercase text-[#8d90a0]">
                On-Time Berth Reliability (예시 수치)
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-emerald-400">99.4% SLA</div>
            <div className="font-mono text-xs text-[#c3c6d7] mt-0.5">
              예시 수치 · 실제 실적 아님
            </div>
          </div>

          <div className="bg-[#132033] border border-[#434655]/30 p-4 rounded-lg hover:border-[#2563eb]/60 transition-all">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[11px] uppercase text-[#8d90a0]">
                Scope-3 Carbon Abatement (예시 수치)
              </span>
              <Leaf className="w-4 h-4 text-[#fe6b00]" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-[#ffb693]">-38.6% CO₂</div>
            <div className="font-mono text-xs text-[#c3c6d7] mt-0.5">
              Dual-Fuel AI Hydrodynamic Trim
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
