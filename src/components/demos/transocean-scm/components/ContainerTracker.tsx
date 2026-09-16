import React, { useState } from 'react';
import { ShipmentDossier } from '../types';
import { SHIPMENT_DOSSIERS } from '../data/mockData';
import { Search, Satellite, Lock, Thermometer, Droplets, Activity, BatteryCharging, Box, Check, RefreshCw } from 'lucide-react';

interface ContainerTrackerProps {
  currentBl: string;
  onSelectBl: (blId: string) => void;
  onOpenSensorDetails: () => void;
}

export const ContainerTracker: React.FC<ContainerTrackerProps> = ({
  currentBl,
  onSelectBl,
  onOpenSensorDetails,
}) => {
  const [searchInput, setSearchInput] = useState(currentBl);
  const [isQuerying, setIsQuerying] = useState(false);
  const [queryFeedback, setQueryFeedback] = useState<string | null>(null);

  const dossier: ShipmentDossier = SHIPMENT_DOSSIERS[currentBl] || SHIPMENT_DOSSIERS['TOCU-8924018'];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = searchInput.trim().toUpperCase();
    if (!cleanId) return;

    setIsQuerying(true);
    setQueryFeedback(null);

    setTimeout(() => {
      setIsQuerying(false);
      if (SHIPMENT_DOSSIERS[cleanId]) {
        onSelectBl(cleanId);
        setQueryFeedback(`Verified B/L Manifest: ${cleanId} linked via Starlink LEO.`);
      } else {
        // Dynamic fallback dossier
        onSelectBl('TOCU-8924018');
        setQueryFeedback(`Telemetry queried for custom ID ${cleanId}. Loaded active Bio-Logistics cluster.`);
      }
    }, 600);
  };

  const handlePresetClick = (presetId: string) => {
    setSearchInput(presetId);
    onSelectBl(presetId);
    setQueryFeedback(null);
  };

  return (
    <section id="trackingSection" className="py-12 bg-[#061426] border-b border-[#434655]/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-4">
          <div>
            <span className="font-mono text-xs text-[#b4c5ff] uppercase tracking-widest block mb-1">
              REAL-TIME AIS &amp; SENSOR TELEMETRY DOSSIER
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Autonomous Live Container Tracking
            </h2>
            <p className="text-sm text-[#c3c6d7] max-w-2xl mt-1">
              Select or input an active Bill of Lading (B/L) to inspect live container internal microclimate, satellite lock, and ETA corridor analytics.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[#8d90a0] uppercase mr-1">Sample Manifests:</span>
            <button
              onClick={() => handlePresetClick('TOCU-8924018')}
              className={`font-mono text-xs px-2.5 py-1 rounded border transition-all ${ currentBl === 'TOCU-8924018' ? 'bg-[#1d2a3e] text-[#b4c5ff] border-[#2563eb] font-semibold' : 'bg-[#132033] text-[#c3c6d7] border-[#434655]/40 hover:border-[#b4c5ff]' }`}
            >
              TOCU-8924018 (Bio-Reefer)
            </button>

            <button
              onClick={() => handlePresetClick('MAEU-9812401')}
              className={`font-mono text-xs px-2.5 py-1 rounded border transition-all ${ currentBl === 'MAEU-9812401' ? 'bg-[#1d2a3e] text-[#b4c5ff] border-[#2563eb] font-semibold' : 'bg-[#132033] text-[#c3c6d7] border-[#434655]/40 hover:border-[#b4c5ff]' }`}
            >
              MAEU-9812401 (Dry 40HQ)
            </button>

            <button
              onClick={() => handlePresetClick('CMAU-7412095')}
              className={`font-mono text-xs px-2.5 py-1 rounded border transition-all ${ currentBl === 'CMAU-7412095' ? 'bg-[#1d2a3e] text-[#b4c5ff] border-[#2563eb] font-semibold' : 'bg-[#132033] text-[#c3c6d7] border-[#434655]/40 hover:border-[#b4c5ff]' }`}
            >
              CMAU-7412095 (Hazardous IMO 3)
            </button>
          </div>
        </div>

        {/* Tracking Input Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[#1d2a3e] border border-[#434655]/40 rounded-lg p-2 mb-6 flex flex-col lg:flex-row items-center gap-2 shadow-lg"
        >
          <div className="flex items-center w-full flex-1 bg-[#0e1c2f] px-3.5 py-2.5 rounded border border-[#434655]/40 focus-within:border-[#2563eb] transition-colors">
            <Box className="w-4 h-4 text-[#b4c5ff] mr-2.5 shrink-0" />
            <input
              id="activeBlInput"
              type="text"
              className="w-full bg-transparent font-mono text-sm text-white focus:outline-none placeholder:text-[#8d90a0]"
              placeholder="Enter Container #, Booking Ref, or Master B/L (e.g. TOCU-8924018)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isQuerying}
            className="w-full bg-[#2563eb] text-white px-6 py-2.5 rounded font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] transition-all flex items-center justify-center space-x-2 shrink-0 shadow-md"
          >
            {isQuerying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synchronizing Telemetry...</span>
              </>
            ) : (
              <>
                <Satellite className="w-4 h-4" />
                <span>Query Vessel Satellite Link</span>
              </>
            )}
          </button>
        </form>

        {queryFeedback && (
          <div className="mb-4 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-2 rounded flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 shrink-0" />
            <span>{queryFeedback}</span>
          </div>
        )}

        {/* Shipment Dossier Card */}
        <div className="bg-[#132033] border border-[#434655]/40 rounded-lg overflow-hidden shadow-xl">
          {/* Top Dossier Bar */}
          <div className="bg-[#1d2a3e] px-4 lg:px-6 py-3 border-b border-[#434655]/30 flex flex-col lg:flex-row justify-between lg:items-center gap-3">
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              <span className="px-2.5 py-1 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 font-mono text-xs font-semibold flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{dossier.status}</span>
              </span>
              <div>
                <span className="font-mono text-sm font-bold text-white">{dossier.title}</span>
                <span className="text-[#c3c6d7] text-xs ml-2">Carrier: {dossier.carrier}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-[#c3c6d7] font-mono text-xs">
              <div>
                Master: <span className="text-white font-semibold">{dossier.master}</span>
              </div>
              <div>
                Vessel IMO: <span className="text-white font-semibold">{dossier.vesselImo}</span>
              </div>
              <div className="hidden lg:block">
                Telemetry Ping: <span className="text-emerald-400 font-semibold">48ms (Starlink LEO)</span>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-6">
            {/* Origin & Destination Ports Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
              {/* Origin */}
              <div className="lg:col-span-4 bg-[#0e1c2f] p-4 rounded border border-[#434655]/30">
                <span className="font-mono text-[10px] text-[#8d90a0] uppercase block mb-1">
                  PORT OF ORIGIN
                </span>
                <div className="text-lg font-bold text-white">{dossier.originPort}</div>
                <div className="font-mono text-xs text-[#c3c6d7] mt-1">{dossier.originDetails}</div>
                <div className="font-mono text-xs text-emerald-400 mt-2 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Gate-In Cleared • Customs Verified (KR040)</span>
                </div>
              </div>

              {/* Route Vector Graphic */}
              <div className="lg:col-span-4 flex flex-col justify-center items-center py-2 text-center bg-[#0e1c2f]/40 p-4 rounded border border-[#434655]/20">
                <span className="font-mono text-xs text-[#ffb693] uppercase font-semibold">
                  Transit Corridor ETA
                </span>
                <div className="font-mono text-xl lg:text-2xl font-bold text-[#b4c5ff] my-1">
                  {dossier.eta}
                </div>
                <div className="w-full bg-[#28354a] h-2.5 rounded-full overflow-hidden my-2 border border-[#434655]/40">
                  <div
                    className="bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#fe6b00] h-full transition-all duration-700"
                    style={{ width: `${dossier.progressPercent}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-[#c3c6d7]">
                  {dossier.distanceTraversed}
                </span>
              </div>

              {/* Destination */}
              <div className="lg:col-span-4 bg-[#0e1c2f] p-4 rounded border border-[#434655]/30 text-left lg:text-right">
                <span className="font-mono text-[10px] text-[#8d90a0] uppercase block mb-1">
                  FINAL DESTINATION GATEWAY
                </span>
                <div className="text-lg font-bold text-white">{dossier.destPort}</div>
                <div className="font-mono text-xs text-[#c3c6d7] mt-1">{dossier.destDetails}</div>
                <div className="font-mono text-xs text-[#b4c5ff] mt-2">
                  Smart Automated Crane Window #44 Assigned
                </div>
              </div>
            </div>

            {/* Waypoint Chronology Bar */}
            <div className="mb-6">
              <span className="font-mono text-[11px] text-[#8d90a0] uppercase tracking-wider block mb-2">
                Autonomous Maritime Waypoint Chronology
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 text-left">
                {dossier.waypoints.map((wp) => (
                  <div
                    key={wp.step}
                    className={`p-3 rounded border-l-2 transition-all ${ wp.status === 'active' ? 'bg-[#1d2a3e] border-[#fe6b00]' : wp.status === 'completed' ? 'bg-[#0e1c2f] border-[#2563eb]' : 'bg-[#0e1c2f]/60 border-[#434655] opacity-70' }`}
                  >
                    <div
                      className={`font-mono text-[10px] uppercase font-semibold ${ wp.status === 'active' ? 'text-[#ffb693]' : wp.status === 'completed' ? 'text-[#b4c5ff]' : 'text-[#8d90a0]' }`}
                    >
                      {wp.label}
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">{wp.location}</div>
                    <div className="font-mono text-[11px] text-[#c3c6d7]">{wp.subtext}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Container Micro-Climate Telemetry (5 Sensors Grid) */}
            <div>
              <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                <span className="font-mono text-xs text-[#8d90a0] uppercase tracking-wider flex items-center space-x-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#b4c5ff]">sensors</span>
                  <span>IoT SMART CONTAINER SENSOR NODES (TELEMETRY LIVE ID: TOC-7712-40R)</span>
                </span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={onOpenSensorDetails}
                    className="font-mono text-[11px] text-[#b4c5ff] hover:underline flex items-center space-x-1"
                  >
                    <span>Diagnostics Feed</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                  <span className="font-mono text-xs text-[#ffb693] flex items-center space-x-1 bg-[#132033] px-2 py-0.5 rounded border border-[#fe6b00]/30">
                    <Lock className="w-3 h-3 text-[#fe6b00]" />
                    <span>E-SEAL: TAMPER-PROOF ARMED</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Temp */}
                <div className="bg-[#0e1c2f] p-3.5 rounded border border-[#434655]/30">
                  <div className="flex items-center justify-between text-[#8d90a0] text-xs mb-1">
                    <span>Internal Temp</span>
                    <Thermometer className="w-4 h-4 text-[#b4c5ff]" />
                  </div>
                  <div className="font-mono text-xl font-bold text-[#b4c5ff]">{dossier.internalTemp}</div>
                  <div className="font-mono text-[10px] text-emerald-400 mt-1">{dossier.tempTarget}</div>
                </div>

                {/* Humidity */}
                <div className="bg-[#0e1c2f] p-3.5 rounded border border-[#434655]/30">
                  <div className="flex items-center justify-between text-[#8d90a0] text-xs mb-1">
                    <span>Rel. Humidity</span>
                    <Droplets className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="font-mono text-xl font-bold text-white">{dossier.relHumidity}</div>
                  <div className="font-mono text-[10px] text-emerald-400 mt-1">{dossier.tempStatus}</div>
                </div>

                {/* Shock / G-Force */}
                <div className="bg-[#0e1c2f] p-3.5 rounded border border-[#434655]/30">
                  <div className="flex items-center justify-between text-[#8d90a0] text-xs mb-1">
                    <span>Shock / G-Force</span>
                    <Activity className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-mono text-xl font-bold text-emerald-400">{dossier.gForce}</div>
                  <div className="font-mono text-[10px] text-emerald-400 mt-1">Max 0.11 G Recorded</div>
                </div>

                {/* Battery & Solar */}
                <div className="bg-[#0e1c2f] p-3.5 rounded border border-[#434655]/30">
                  <div className="flex items-center justify-between text-[#8d90a0] text-xs mb-1">
                    <span>Sensor Battery</span>
                    <BatteryCharging className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="font-mono text-xl font-bold text-white">{dossier.sensorBattery}</div>
                  <div className="font-mono text-[10px] text-emerald-400 mt-1">Kinetic Harvester OK</div>
                </div>

                {/* Cargo Manifest */}
                <div className="bg-[#0e1c2f] p-3.5 rounded border border-[#434655]/30 col-span-2">
                  <div className="flex items-center justify-between text-[#8d90a0] text-xs mb-1">
                    <span>Cargo Class</span>
                    <Box className="w-4 h-4 text-[#ffb693]" />
                  </div>
                  <div className="font-mono text-sm font-bold text-[#ffb693] truncate" title={dossier.cargoType}>
                    {dossier.cargoType}
                  </div>
                  <div className="font-mono text-[10px] text-[#c3c6d7] mt-1">{dossier.cargoPriority}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
