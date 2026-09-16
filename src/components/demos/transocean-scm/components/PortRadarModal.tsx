import React, { useState } from 'react';
import { PORT_HUBS } from '../data/mockData';
import { PortHub } from '../types';
import { X, Radio, Activity, Wind, Anchor, Clock } from 'lucide-react';

interface PortRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedHubId?: string | null;
}

export const PortRadarModal: React.FC<PortRadarModalProps> = ({
  isOpen,
  onClose,
  selectedHubId,
}) => {
  const [activeHubId, setActiveHubId] = useState<string>(selectedHubId || 'krpus');

  if (!isOpen) return null;

  const currentHub: PortHub = PORT_HUBS.find(h => h.id === activeHubId) || PORT_HUBS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#132033] border border-[#2563eb]/50 rounded-xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#0e1c2f] px-6 py-4 border-b border-[#434655]/40 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#fe6b00] animate-ping" />
            <Radio className="w-5 h-5 text-[#fe6b00]" />
            <h3 className="text-lg font-bold text-white font-mono uppercase">
              Global AIS Port Congestion Radar
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8d90a0] hover:text-white hover:bg-[#1d2a3e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Port Hub Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {PORT_HUBS.map((hub) => (
              <button
                key={hub.id}
                onClick={() => setActiveHubId(hub.id)}
                className={`p-3 rounded border text-left transition-all font-mono ${ activeHubId === hub.id ? 'bg-[#2563eb] text-white border-[#3b82f6] shadow-md' : 'bg-[#0e1c2f] text-[#c3c6d7] border-[#434655]/40 hover:border-[#b4c5ff]' }`}
              >
                <div className="text-xs font-bold">{hub.code}</div>
                <div className="text-[11px] truncate">{hub.name.split(' ')[0]}</div>
                <div className="text-[10px] mt-1 opacity-80">{hub.status}</div>
              </button>
            ))}
          </div>

          {/* Selected Port Radar Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Radar Screen Simulation */}
            <div className="bg-[#020e21] rounded-lg border border-[#434655]/40 p-4 relative overflow-hidden h-64 flex flex-col justify-between">
              {/* Radar Rings Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-48 h-48 rounded-full border border-[#2563eb]" />
                <div className="absolute w-32 h-32 rounded-full border border-[#2563eb]" />
                <div className="absolute w-16 h-16 rounded-full border border-[#2563eb]" />
                <div className="absolute inset-x-0 top-1/2 border-t border-[#2563eb]/40" />
                <div className="absolute inset-y-0 left-1/2 border-l border-[#2563eb]/40" />
              </div>

              {/* Dynamic Vessel Blips */}
              <div className="absolute top-12 left-20 w-3 h-3 rounded-full bg-emerald-400 animate-pulse flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <span className="text-[8px] text-black font-bold">1</span>
              </div>
              <div className="absolute top-28 right-24 w-3 h-3 rounded-full bg-[#b4c5ff] animate-pulse flex items-center justify-center">
                <span className="text-[8px] text-black font-bold">2</span>
              </div>
              <div className="absolute bottom-16 left-32 w-3 h-3 rounded-full bg-[#fe6b00] animate-pulse flex items-center justify-center">
                <span className="text-[8px] text-black font-bold">3</span>
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="font-mono text-[11px] text-[#ffb693] uppercase font-bold">
                    AIS Live Feed: {currentHub.name}
                  </span>
                  <div className="font-mono text-xs text-[#8d90a0]">Geo-Coordinates: {currentHub.coordinates}</div>
                </div>
                <div className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-mono text-xs">
                  SATELLITE SYNC: 100%
                </div>
              </div>

              <div className="relative z-10 font-mono text-xs text-[#c3c6d7] bg-[#0e1c2f]/80 p-2.5 rounded border border-[#434655]/40 flex justify-between">
                <span>Vessels Anchored in Roadstead: <strong>14</strong></span>
                <span>Active Berths: <strong>32 / 34</strong></span>
                <span>Weather: <strong>Sea State 2 (Calm)</strong></span>
              </div>
            </div>

            {/* Port Operational Specs */}
            <div className="bg-[#0e1c2f] p-4 rounded-lg border border-[#434655]/40 space-y-4 font-mono text-xs">
              <div className="border-b border-[#434655]/30 pb-2">
                <span className="text-[#8d90a0] block text-[10px] uppercase">Berth Congestion Index</span>
                <div className="text-xl font-bold text-white flex items-center justify-between mt-1">
                  <span>{currentHub.congestionIndex}%</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#132033] text-[#ffb693]">
                    {currentHub.status}
                  </span>
                </div>
                <div className="w-full bg-[#28354a] h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full ${ currentHub.congestionIndex > 60 ? 'bg-[#fe6b00]' : 'bg-emerald-400' }`}
                    style={{ width: `${currentHub.congestionIndex}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-[#8d90a0] block text-[10px] uppercase">Berth Wait Time</span>
                <span className="text-base font-bold text-emerald-400">{currentHub.berthWaitTime}</span>
              </div>

              <div>
                <span className="text-[#8d90a0] block text-[10px] uppercase">Crane Productivity Turnaround</span>
                <span className="text-base font-bold text-white">{currentHub.craneTurnaround}</span>
              </div>

              <div>
                <span className="text-[#8d90a0] block text-[10px] uppercase">{currentHub.intermodalLabel}</span>
                <span className="text-sm font-semibold text-[#b4c5ff]">{currentHub.intermodalDetail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#0e1c2f] px-6 py-3 border-t border-[#434655]/40 flex justify-between items-center">
          <span className="font-mono text-xs text-[#8d90a0]">
            Feed refreshed every 15s via AIS LEO Mesh (예시 데이터)
          </span>
          <button
            onClick={onClose}
            className="bg-[#2563eb] text-white px-5 py-1.5 rounded font-mono text-xs font-bold uppercase hover:bg-[#1d4ed8] transition-colors"
          >
            Close Radar
          </button>
        </div>
      </div>
    </div>
  );
};
