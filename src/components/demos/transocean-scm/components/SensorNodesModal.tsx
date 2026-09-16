import React from 'react';
import { X, Activity, Thermometer, Droplets, BatteryCharging, Shield, Radio } from 'lucide-react';

interface SensorNodesModalProps {
  isOpen: boolean;
  onClose: () => void;
  blId: string;
}

export const SensorNodesModal: React.FC<SensorNodesModalProps> = ({
  isOpen,
  onClose,
  blId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#132033] border border-[#2563eb]/50 rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#0e1c2f] px-6 py-4 border-b border-[#434655]/40 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[22px] text-[#b4c5ff]">sensors</span>
            <h3 className="text-lg font-bold text-white font-mono uppercase">
              IoT Sensor Node Diagnostics: {blId}
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
        <div className="p-6 overflow-y-auto space-y-5 font-mono text-xs">
          {/* Status Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#0e1c2f] p-3 rounded border border-[#434655]/40">
              <span className="text-[#8d90a0] text-[10px] uppercase block">Hardware ID</span>
              <span className="text-white font-bold">SN-90214-LEO</span>
            </div>
            <div className="bg-[#0e1c2f] p-3 rounded border border-[#434655]/40">
              <span className="text-[#8d90a0] text-[10px] uppercase block">Firmware Core</span>
              <span className="text-emerald-400 font-bold">v3.4.1 (Signed)</span>
            </div>
            <div className="bg-[#0e1c2f] p-3 rounded border border-[#434655]/40">
              <span className="text-[#8d90a0] text-[10px] uppercase block">Cryptographic Seal</span>
              <span className="text-[#ffb693] font-bold">ED25519 VERIFIED</span>
            </div>
            <div className="bg-[#0e1c2f] p-3 rounded border border-[#434655]/40">
              <span className="text-[#8d90a0] text-[10px] uppercase block">Sampling Rate</span>
              <span className="text-[#b4c5ff] font-bold">1 Hz (Continuous)</span>
            </div>
          </div>

          {/* Historical Telemetry Stream Table */}
          <div>
            <div className="text-[#ffb693] font-bold uppercase mb-2">Telemetry Stream Log (예시 데이터)</div>
            <div className="bg-[#020e21] rounded border border-[#434655]/40 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#0e1c2f] text-[#8d90a0] border-b border-[#434655]/40 text-[11px]">
                  <tr>
                    <th className="p-2.5">UTC Timestamp</th>
                    <th className="p-2.5">Internal Temp</th>
                    <th className="p-2.5">Relative Hum</th>
                    <th className="p-2.5">Tri-Axis G-Force</th>
                    <th className="p-2.5">Battery Draw</th>
                    <th className="p-2.5">Link Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#434655]/20 text-[#d6e3fe] text-[11px]">
                  <tr>
                    <td className="p-2.5">13:10:44 UTC</td>
                    <td className="p-2.5 text-[#b4c5ff] font-bold">-18.2 °C</td>
                    <td className="p-2.5">42.4% RH</td>
                    <td className="p-2.5 text-emerald-400">0.02 G (X:0.01 Y:0.01 Z:0.99)</td>
                    <td className="p-2.5">14 mW (Harvesting +22mW)</td>
                    <td className="p-2.5 text-emerald-400">LEO Sat Mesh OK</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">13:05:00 UTC</td>
                    <td className="p-2.5 text-[#b4c5ff] font-bold">-18.1 °C</td>
                    <td className="p-2.5">42.3% RH</td>
                    <td className="p-2.5 text-emerald-400">0.03 G</td>
                    <td className="p-2.5">14 mW</td>
                    <td className="p-2.5 text-emerald-400">LEO Sat Mesh OK</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">13:00:00 UTC</td>
                    <td className="p-2.5 text-[#b4c5ff] font-bold">-18.2 °C</td>
                    <td className="p-2.5">42.5% RH</td>
                    <td className="p-2.5 text-emerald-400">0.02 G</td>
                    <td className="p-2.5">15 mW</td>
                    <td className="p-2.5 text-emerald-400">LEO Sat Mesh OK</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">12:55:00 UTC</td>
                    <td className="p-2.5 text-[#b4c5ff] font-bold">-18.3 °C</td>
                    <td className="p-2.5">42.4% RH</td>
                    <td className="p-2.5 text-emerald-400">0.02 G</td>
                    <td className="p-2.5">14 mW</td>
                    <td className="p-2.5 text-emerald-400">LEO Sat Mesh OK</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-[#0e1c2f] rounded border border-[#434655]/40 text-[#c3c6d7]">
            <span className="text-white font-bold block mb-1">Cold Chain Alert Protocol (예시):</span>
            Temperature deviation threshold: ±0.5°C over 15 consecutive minutes triggers autonomous auxiliary cooling cycle and dispatches satellite distress notification to carrier operations room.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#0e1c2f] px-6 py-3 border-t border-[#434655]/40 flex justify-between items-center">
          <span className="font-mono text-xs text-emerald-400">
            Node Heartbeat: Nominal (Ping 48ms)
          </span>
          <button
            onClick={onClose}
            className="bg-[#2563eb] text-white px-5 py-1.5 rounded font-mono text-xs font-bold uppercase hover:bg-[#1d4ed8] transition-colors"
          >
            Dismiss Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
