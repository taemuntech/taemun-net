import React, { useState } from 'react';
import { TRADE_ROUTES } from '../data/mockData';
import { CheckCircle } from 'lucide-react';

interface RateSimulatorProps {
  onLockRateClick: (planName: string, quoteDetails: string) => void;
}

export const RateSimulator: React.FC<RateSimulatorProps> = ({ onLockRateClick }) => {
  const [selectedRouteId, setSelectedRouteId] = useState('asia-eu');
  const [volume, setVolume] = useState(20);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  const currentRoute = TRADE_ROUTES.find(r => r.id === selectedRouteId) || TRADE_ROUTES[0];

  // Calculations
  const oceanCost = currentRoute.oceanRatePerTeu * volume;
  const oceanDays = currentRoute.oceanDays;
  const oceanCarbon = currentRoute.oceanCo2PerTeu * volume;

  const seaAirCost = Math.round(currentRoute.oceanRatePerTeu * 2.36) * volume;
  const seaAirDays = Math.max(4, Math.round(currentRoute.oceanDays * 0.45));
  const seaAirCarbon = currentRoute.oceanCo2PerTeu * 5 * volume;

  const airCost = Math.round(currentRoute.oceanRatePerTeu * 5.06) * volume;
  const airDays = 3;
  const airCarbon = Math.round(currentRoute.oceanCo2PerTeu * 22.5) * volume;

  const handleSelectPlan = (planName: string, cost: number, days: number, carbon: number) => {
    const summary = `${planName} for ${volume} TEU on ${currentRoute.name} ($${cost.toLocaleString()}, ${days}d transit, ${carbon.toLocaleString()}kg CO2)`;
    setLockedNotice(`Sample rate applied (예시): ${summary}. 문의 폼으로 옮겼습니다 — 실제 계약 운임이 아닙니다.`);
    onLockRateClick(planName, summary);
  };

  return (
    <section id="rateSimulator" className="py-12 bg-[#020e21] border-b border-[#434655]/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="font-mono text-xs text-[#ffb693] uppercase tracking-widest block mb-1 font-semibold">
            DECISION INTELLIGENCE CALCULATOR
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Multimodal Rate &amp; Carbon Abatement Simulator
          </h2>
          <p className="text-sm text-[#c3c6d7] mt-1">
            Compare sample contract container spot rates, transit timelines, and Scope-3 maritime carbon emissions across key intercontinental trade lanes. (모든 운임·수치는 예시입니다)
          </p>
        </div>

        <div className="bg-[#132033] border border-[#434655]/30 rounded-lg p-5 lg:p-8 shadow-xl">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-6 border-b border-[#434655]/30 mb-6">
            {/* Route Selector */}
            <div className="lg:col-span-6">
              <label className="font-mono text-xs text-[#8d90a0] uppercase block mb-2 font-semibold">
                Trade Corridor Route
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {TRADE_ROUTES.map((route) => {
                  const isActive = route.id === selectedRouteId;
                  return (
                    <button
                      key={route.id}
                      onClick={() => {
                        setSelectedRouteId(route.id);
                        setLockedNotice(null);
                      }}
                      className={`px-3 py-2.5 rounded text-left transition-all border ${ isActive ? 'bg-[#2563eb] text-white border-[#3b82f6] shadow-md font-semibold' : 'bg-[#0e1c2f] text-[#d6e3fe] border-[#434655]/40 hover:border-[#2563eb]' }`}
                    >
                      <div className="text-xs font-bold">{route.name}</div>
                      <div className={`font-mono text-[11px] mt-0.5 ${isActive ? 'text-blue-100' : 'text-[#8d90a0]'}`}>
                        {route.subtext}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Volume Slider */}
            <div className="lg:col-span-6">
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono text-xs text-[#8d90a0] uppercase font-semibold">
                  Allocated Cargo Volume
                </label>
                <span className="font-mono text-xl font-bold text-[#b4c5ff]">
                  {volume} <span className="text-xs font-normal text-[#8d90a0]">TEU</span>
                </span>
              </div>
              <input
                id="volumeSlider"
                type="range"
                min="1"
                max="100"
                value={volume}
                onChange={(e) => {
                  setVolume(parseInt(e.target.value));
                  setLockedNotice(null);
                }}
                className="w-full accent-[#2563eb] h-3 lg:h-2 bg-[#28354a] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between gap-2 font-mono text-[10px] lg:text-[11px] text-[#8d90a0] mt-1.5">
                <span>1 TEU</span>
                <span className="hidden sm:inline">50 TEU (Block Stowage)</span>
                <span className="sm:hidden">50 TEU</span>
                <span className="text-right">100 TEU<span className="hidden sm:inline"> (Enterprise Charter)</span></span>
              </div>
            </div>
          </div>

          {lockedNotice && (
            <div className="mb-6 p-3 bg-blue-950/60 border border-[#2563eb]/50 rounded-lg text-xs font-mono text-[#b4c5ff] flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
              <span className="break-words">{lockedNotice}</span>
              <a
                href="#rfpSection"
                className="text-white underline hover:text-[#ffb693] font-bold whitespace-nowrap inline-flex items-center max-lg:min-h-11 sm:ml-2"
              >
                Go to RFP &rarr;
              </a>
            </div>
          )}

          {/* 3 Comparison Cards */}
          {/* 운임 3안은 나란히 놓고 비교하는 게 이 구역의 요점이라, 모바일/웹 경계(lg)가 아니라 md(768)부터 3열로 편다 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-6">
            {/* Mode 1: Smart Ocean Freight */}
            <div className="bg-[#1d2a3e] border-2 border-[#2563eb] rounded-lg p-5 relative flex flex-col justify-between shadow-lg">
              <div className="absolute -top-3 right-3 left-3 sm:left-auto bg-[#2563eb] text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider shadow text-center sm:text-left">
                ESG 우선 · 탄소 최소 (예시 기준)
              </div>

              <div>
                <div className="flex items-center space-x-2 text-[#b4c5ff] mb-2">
                  <span className="material-symbols-outlined text-[24px]">directions_boat</span>
                  <h3 className="text-lg font-bold text-white">Smart Ocean Freight</h3>
                </div>
                <p className="text-xs text-[#c3c6d7] mb-4">
                  Transocean AI Eco-Vessel with autonomous trim routing &amp; dual-fuel green propulsion.
                </p>

                <div className="space-y-2.5 border-t border-[#434655]/40 pt-4 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#8d90a0]">Estimated Total Cost:</span>
                    <span className="font-mono text-xl lg:text-2xl font-bold text-white">
                      ${oceanCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#8d90a0]">Port-to-Port Transit:</span>
                    <span className="font-mono text-sm text-emerald-400 font-semibold">
                      {oceanDays} Days
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#8d90a0]">Scope-3 CO₂ Footprint:</span>
                    <span className="font-mono text-sm text-emerald-400 font-semibold">
                      {oceanCarbon.toLocaleString()} kg CO₂
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="w-full bg-[#020e21] h-2 rounded-full overflow-hidden mb-4 border border-[#434655]/30">
                  <div className="bg-emerald-400 h-full w-[95%]" />
                </div>
                <button
                  id="lock-ocean-rate-btn"
                  onClick={() => handleSelectPlan('Smart Ocean Freight', oceanCost, oceanDays, oceanCarbon)}
                  className="w-full bg-[#2563eb] text-white font-mono text-xs font-bold uppercase min-h-11 rounded hover:bg-[#1d4ed8] transition-colors text-center block shadow"
                >
                  Lock in Contract Spot Rate
                </button>
              </div>
            </div>

            {/* Mode 2: Sea-Air Multimodal */}
            <div className="bg-[#0e1c2f] border border-[#434655]/40 rounded-lg p-5 flex flex-col justify-between hover:border-[#b4c5ff]/50 transition-colors">
              <div>
                <div className="flex items-center space-x-2 text-[#c3c6d7] mb-2">
                  <span className="material-symbols-outlined text-[24px]">connecting_airports</span>
                  <h3 className="text-lg font-bold text-white">Sea-Air Multimodal</h3>
                </div>
                <p className="text-xs text-[#c3c6d7] mb-4">
                  Vessel relay via Dubai Hub followed by widebody freighter air bridge to regional hub.
                </p>

                <div className="space-y-2.5 border-t border-[#434655]/40 pt-4 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#8d90a0]">Estimated Total Cost:</span>
                    <span className="font-mono text-xl lg:text-2xl font-bold text-white">
                      ${seaAirCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#8d90a0]">Port-to-Port Transit:</span>
                    <span className="font-mono text-sm text-white font-semibold">
                      {seaAirDays} Days
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#8d90a0]">Scope-3 CO₂ Footprint:</span>
                    <span className="font-mono text-sm text-amber-400 font-semibold">
                      {seaAirCarbon.toLocaleString()} kg CO₂
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="w-full bg-[#020e21] h-2 rounded-full overflow-hidden mb-4 border border-[#434655]/30">
                  <div className="bg-amber-400 h-full w-[60%]" />
                </div>
                <button
                  id="lock-sea-air-rate-btn"
                  onClick={() => handleSelectPlan('Sea-Air Multimodal', seaAirCost, seaAirDays, seaAirCarbon)}
                  className="w-full bg-[#1d2a3e] border border-[#434655]/50 text-white font-mono text-xs uppercase min-h-11 rounded hover:border-[#2563eb] transition-colors text-center block"
                >
                  Request Sea-Air Schedule
                </button>
              </div>
            </div>

            {/* Mode 3: Express Air Cargo */}
            <div className="bg-[#0e1c2f] border border-[#434655]/40 rounded-lg p-5 flex flex-col justify-between hover:border-[#b4c5ff]/50 transition-colors">
              <div>
                <div className="flex items-center space-x-2 text-[#8d90a0] mb-2">
                  <span className="material-symbols-outlined text-[24px]">flight</span>
                  <h3 className="text-lg font-bold text-white">Express Air Cargo</h3>
                </div>
                <p className="text-xs text-[#c3c6d7] mb-4">
                  Priority direct belly-hold &amp; dedicated freighter routing for urgent mission-critical freight.
                </p>

                <div className="space-y-2.5 border-t border-[#434655]/40 pt-4 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#8d90a0]">Estimated Total Cost:</span>
                    <span className="font-mono text-xl lg:text-2xl font-bold text-white">
                      ${airCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#8d90a0]">Port-to-Port Transit:</span>
                    <span className="font-mono text-sm text-[#b4c5ff] font-semibold">
                      {airDays} Days
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#8d90a0]">Scope-3 CO₂ Footprint:</span>
                    <span className="font-mono text-sm text-[#ffb4ab] font-semibold">
                      {airCarbon.toLocaleString()} kg CO₂
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="w-full bg-[#020e21] h-2 rounded-full overflow-hidden mb-4 border border-[#434655]/30">
                  <div className="bg-[#ffb4ab] h-full w-[20%]" />
                </div>
                <button
                  id="lock-air-rate-btn"
                  onClick={() => handleSelectPlan('Express Air Cargo', airCost, airDays, airCarbon)}
                  className="w-full bg-[#1d2a3e] border border-[#434655]/50 text-white font-mono text-xs uppercase min-h-11 rounded hover:border-[#2563eb] transition-colors text-center block"
                >
                  Contact Air Charter Desk
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Metric Note */}
          <div className="bg-[#0e1c2f] p-3.5 rounded border border-[#434655]/30 flex flex-col lg:flex-row justify-between items-center text-[#c3c6d7] font-mono text-xs gap-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#ffb693] shrink-0" />
              <span>All ocean rates include BAF (Bunker Adjustment Factor) and low-sulfur bio-methanol credits. (예시 산식)</span>
            </div>
            <div className="text-[#b4c5ff] font-semibold text-center lg:text-right">
              예시 견적 — 실제 계약 운임이 아닙니다
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
