import React from 'react';
import { PORT_HUBS } from '../data/mockData';
import { PortHub } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface PortHubsSectionProps {
  onSelectHub: (hub: PortHub) => void;
}

export const PortHubsSection: React.FC<PortHubsSectionProps> = ({ onSelectHub }) => {
  return (
    <section id="hubsSection" className="py-12 bg-[#020e21] border-b border-[#434655]/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="font-mono text-xs text-[#ffb693] uppercase tracking-widest block mb-1 font-semibold">
            CONTINENTAL GATEWAYS &amp; INTERMODAL NODES
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Key Strategic Port Operations Hubs
          </h2>
          <p className="text-sm text-[#c3c6d7] mt-1">
            Integrated high-throughput maritime complexes engineered for 24/7 autonomous vessel turnaround and dedicated intermodal rail corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {PORT_HUBS.map((hub) => {
            let statusBadgeBg = 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40';
            let waitTextColor = 'text-emerald-400';

            if (hub.status === 'MODERATE') {
              statusBadgeBg = 'bg-amber-950/60 text-amber-400 border-amber-500/40';
              waitTextColor = 'text-amber-400';
            } else if (hub.status === 'HEAVY') {
              statusBadgeBg = 'bg-orange-950/70 text-[#fe6b00] border-[#fe6b00]/40';
              waitTextColor = 'text-[#fe6b00]';
            }

            return (
              <div
                key={hub.id}
                className="bg-[#132033] border border-[#434655]/40 rounded-lg p-5 hover:border-[#2563eb] transition-all flex flex-col justify-between shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded border font-mono text-xs font-semibold ${statusBadgeBg}`}>
                      STATUS: {hub.status}
                    </span>
                    <span className="font-mono text-xs text-[#8d90a0]">{hub.code}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#b4c5ff] transition-colors">
                    {hub.name}
                  </h3>
                  <p className="text-xs text-[#c3c6d7] leading-relaxed mb-4">
                    {hub.description}
                  </p>

                  <div className="space-y-1.5 font-mono text-xs border-t border-[#434655]/30 pt-3 mb-4 text-[#d6e3fe]">
                    <div className="flex justify-between">
                      <span className="text-[#8d90a0]">Berth Wait Time:</span>
                      <span className={`${waitTextColor} font-semibold`}>{hub.berthWaitTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8d90a0]">Crane Turnaround:</span>
                      <span className="text-white">{hub.craneTurnaround}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8d90a0]">{hub.intermodalLabel}:</span>
                      <span className="text-white">{hub.intermodalDetail}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectHub(hub)}
                  className="font-mono text-xs text-[#b4c5ff] uppercase flex items-center space-x-1 hover:text-white transition-colors pt-2 border-t border-[#434655]/20 text-left"
                >
                  <span>View {hub.name.split(' ')[0]} Live Yard Map</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
