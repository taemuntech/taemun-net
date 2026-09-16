"use client";

import React, { useState, useEffect } from "react";
import { Language, TelemetrySensor } from "./types";
import { INITIAL_TELEMETRY } from "./data/hysfaData";
import {
  Activity,
  AlertTriangle,
  RotateCcw,
  Radio,
  Gauge,
  ShieldAlert,
  Volume2,
  VolumeX,
  Server,
  Zap,
} from "lucide-react";

interface Props {
  lang: Language;
  onOpenRfq: () => void;
}

export default function HysfaScadaSimulator({ lang, onOpenRfq }: Props) {
  const [sensors, setSensors] = useState<TelemetrySensor[]>(INITIAL_TELEMETRY);
  const [activeZone, setActiveZone] = useState<"zoneA" | "zoneB" | "central">("zoneA");
  const [isInterlockMode, setIsInterlockMode] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true);
  const [eventLogs, setEventLogs] = useState<string[]>([
    "[10:50:02.120] [PGMS-KERNEL] 4K SCADA Dual-Redundant Server: ACTIVE (ONLINE)",
    "[10:50:03.450] [GDMS-BUS] 128 Gas Detectors Polling OK (0.00 ppm NOMINAL)",
    "[10:50:05.890] [CDS-FEED] SC-1 Chemical Metering Flow: 185.4 SLPM (NORMAL)",
    "[10:50:08.310] [LSS-SYS] Interlock Safety Loop: READY (SIL-3 Standby)",
  ]);

  // Live Jitter Simulation for realistic SCADA telemetry
  useEffect(() => {
    if (isInterlockMode) return;

    const interval = setInterval(() => {
      setSensors((prev) =>
        prev.map((s) => {
          const jitter = (Math.random() - 0.5) * 0.01;
          const flowJitter = (Math.random() - 0.5) * 1.5;
          const newPressure = Math.max(0.05, Number((s.pressure + jitter).toFixed(3)));
          const newFlow = s.valveStatus === "OPEN" ? Math.max(0, Number((s.flowRate + flowJitter).toFixed(1))) : 0;
          return {
            ...s,
            pressure: newPressure,
            flowRate: newFlow,
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [isInterlockMode]);

  // Toggle Single Valve
  const toggleValve = (id: string) => {
    setSensors((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newStatus = s.valveStatus === "OPEN" ? "CLOSED" : "OPEN";
          const now = new Date().toTimeString().split(" ")[0];
          addLog(`[${now}] [VALVE-MANUAL] ${s.nameEn} Valve toggled to ${newStatus}`);
          return {
            ...s,
            valveStatus: newStatus,
            flowRate: newStatus === "OPEN" ? s.flowRate || 50 : 0,
          };
        }
        return s;
      })
    );
  };

  const addLog = (logText: string) => {
    setEventLogs((prev) => [logText, ...prev.slice(0, 15)]);
  };

  // Trigger Emergency Interlock
  const triggerInterlock = () => {
    setIsInterlockMode(true);
    const now = new Date().toTimeString().split(" ")[0];
    addLog(`[${now}] 🚨 [LSS-EMERGENCY] INTERLOCK TEST ACTIVATED! Sub-0.05s Emergency Shut-Off`);
    addLog(`[${now}] ⚠️ [GDMS-ALARM] Flammable/Toxic Supply Valves (H2, SiH4) FORCED CLOSED`);
    addLog(`[${now}] 🛡️ [PURGE-EXHAUST] N2 Venturi Purge Auto-Engaged (Safe State Achieved)`);

    setSensors((prev) =>
      prev.map((s) => {
        if (s.gasType.includes("SiH4") || s.gasType.includes("H2")) {
          return {
            ...s,
            valveStatus: "CLOSED",
            flowRate: 0,
            status: "INTERLOCK",
            ppm: 0.05,
          };
        }
        return {
          ...s,
          valveStatus: "OPEN",
          status: "WARNING",
        };
      })
    );
  };

  // Reset to Nominal
  const resetInterlock = () => {
    setIsInterlockMode(false);
    const now = new Date().toTimeString().split(" ")[0];
    addLog(`[${now}] ✅ [LSS-RESET] System normalized. All interlocks released to AUTO mode.`);
    setSensors(INITIAL_TELEMETRY);
  };

  return (
    <section id="scada-simulator" className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                PROPRIETARY SOFTWARE
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                PGMS & GDMS & LSS
              </span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-black tracking-tight text-white">
              {lang === "ko" ? (
                <>
                  한양시스템 <span className="text-cyan-400">4K SCADA 통합 관제소</span> 라이브 시연
                </>
              ) : (
                <>
                  Hanyang System <span className="text-cyan-400">4K Live SCADA</span> Telemetry Simulator
                </>
              )}
            </h2>
            <p className="text-xs lg:text-sm text-slate-400 mt-2 max-w-3xl font-light">
              {lang === "ko"
                ? "삼성전자 세메스 협력 라인 및 글로벌 팹에 공급되는 4K 초고화질 SCADA 모니터링 시스템(PGMS)을 직접 조작해 보세요. 밸브를 클릭해 개폐하거나 비상 인터록 시험을 수행할 수 있습니다."
                : "Interact with our real-time 4K SCADA system deployed across leading semiconductor fabs. Toggle gas valves, test emergency interlock shutdowns, and monitor live GDMS sensor feeds."}
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundMuted(!soundMuted)}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 transition-all cursor-pointer"
              title={soundMuted ? "Sound Muted" : "Sound Enabled"}
            >
              {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            {isInterlockMode ? (
              <button
                onClick={resetInterlock}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === "ko" ? "인터록 해제 · 정상 복구" : "Reset System (Nominal)"}</span>
              </button>
            ) : (
              <button
                onClick={triggerInterlock}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all cursor-pointer animate-pulse"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{lang === "ko" ? "비상 인터록 시험 (0.05s 차단)" : "Trigger Interlock Test"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Emergency Interlock Alert Banner */}
        {isInterlockMode && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border-2 border-rose-500 text-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-900 text-rose-200">
                <AlertTriangle className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <div className="text-sm font-black tracking-wider uppercase font-mono text-rose-300">
                  ⚠️ LSS EMERGENCY INTERLOCK SEQUENCE TRIGGERED
                </div>
                <div className="text-xs text-rose-200 font-light">
                  {lang === "ko"
                    ? "가연성/독성 가스 밸브(SiH4, H2) 0.042초 만에 긴급 차단 완료. N2 벤투리 배기 퍼지 자동 작동 중."
                    : "Hazardous lines isolated within 0.042s. N2 venturi exhaust flush actively ventilating lines."}
                </div>
              </div>
            </div>
            <button
              onClick={resetInterlock}
              className="px-3 py-1.5 rounded bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 cursor-pointer"
            >
              {lang === "ko" ? "즉시 복구" : "Acknowledge & Reset"}
            </button>
          </div>
        )}

        {/* 4K SCADA Terminal Console Box */}
        <div className="rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden">
          {/* Top SCADA HUD Bar */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Server className="w-4 h-4" />
                <span className="font-bold">HYSFA-PGMS v4.8 (4K Ultra-HD Edition)</span>
              </div>
              <span className="text-slate-700">|</span>
              <span className="text-slate-400">
                {lang === "ko" ? "시흥 MTV 본사 R&D 관제망 연동" : "Connected to Sihwa MTV R&D Main"}
              </span>
            </div>

            {/* Zone Selector Tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveZone("zoneA")}
                className={`px-3 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  activeZone === "zoneA" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                FAB 1: Wet Clean
              </button>
              <button
                onClick={() => setActiveZone("zoneB")}
                className={`px-3 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  activeZone === "zoneB" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                FAB 2: Gas Yard
              </button>
              <button
                onClick={() => setActiveZone("central")}
                className={`px-3 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  activeZone === "central" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                LSS Safety Loop
              </button>
            </div>
          </div>

          {/* 4 Interactive Gas Line Cards */}
          <div className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
            {sensors.map((sensor) => {
              const isClosed = sensor.valveStatus === "CLOSED";
              const isWarning = sensor.status === "WARNING" || sensor.status === "INTERLOCK";

              return (
                <div
                  key={sensor.id}
                  className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                    isWarning
                      ? "bg-rose-950/40 border-rose-500/70 shadow-[0_0_20px_rgba(225,29,72,0.2)]"
                      : isClosed
                      ? "bg-slate-950/60 border-slate-800"
                      : "bg-slate-950/80 border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                      {sensor.gasType}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isWarning ? "bg-rose-500 animate-ping" : isClosed ? "bg-slate-500" : "bg-emerald-400"
                        }`}
                      />
                      <span className={isWarning ? "text-rose-400 font-bold" : isClosed ? "text-slate-500" : "text-emerald-400"}>
                        {sensor.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-3 truncate font-sans">
                    {lang === "ko" ? sensor.nameKo : sensor.nameEn}
                  </h3>

                  {/* Telemetry Gauge Display */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 mb-4 font-mono">
                    <div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-cyan-400" />
                        <span>PRESSURE</span>
                      </div>
                      <div className="text-lg font-black text-white mt-0.5">
                        {sensor.pressure.toFixed(2)}{" "}
                        <span className="text-[10px] font-normal text-slate-400">MPa</span>
                      </div>
                      <div className="text-[9px] text-slate-400">Target: {sensor.targetPressure} MPa</div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Activity className="w-3 h-3 text-teal-400" />
                        <span>FLOW RATE</span>
                      </div>
                      <div className="text-lg font-black text-cyan-300 mt-0.5">
                        {sensor.flowRate.toFixed(1)}{" "}
                        <span className="text-[10px] font-normal text-slate-400">SLPM</span>
                      </div>
                      <div className="text-[9px] text-slate-400">MFC Loop: ±0.2%</div>
                    </div>
                  </div>

                  {/* Gas Leak Detector Status */}
                  <div className="flex items-center justify-between text-xs font-mono px-2.5 py-1.5 rounded bg-slate-900/60 border border-slate-800/80 mb-4">
                    <span className="text-slate-400 text-[10px]">GDMS Leak:</span>
                    <span className={`font-bold ${sensor.ppm > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                      {sensor.ppm.toFixed(2)} ppm
                    </span>
                  </div>

                  {/* Interactive Valve Button */}
                  <button
                    onClick={() => toggleValve(sensor.id)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isClosed
                        ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                        : "bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    }`}
                  >
                    <Zap className={`w-3.5 h-3.5 ${isClosed ? "text-slate-500" : "text-cyan-400"}`} />
                    <span>
                      VALVE: {sensor.valveStatus} {isClosed ? "(열기)" : "(차단)"}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Live System Event Log Terminal */}
          <div className="border-t border-slate-800 bg-slate-950 p-4 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>SECS-GEM & OPC-UA REALTIME TELEMETRY LOG</span>
              </span>
              <span className="text-[10px] text-slate-400">Poll Rate: 100ms • Packet Loss: 0.00%</span>
            </div>
            <div className="h-24 overflow-y-auto space-y-1 bg-slate-900/70 p-2.5 rounded-lg border border-slate-800/80 text-slate-300">
              {eventLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed truncate ${
                    log.includes("🚨") || log.includes("⚠️")
                      ? "text-rose-400 font-bold"
                      : log.includes("✅")
                      ? "text-emerald-400 font-bold"
                      : "text-slate-400"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Under Simulator Info */}
        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between text-xs text-slate-400 px-2 gap-2">
          <span>
            {lang === "ko"
              ? "* 상기 시뮬레이터는 한양시스템의 독자 SCADA 통신 프로토콜(PGMS/GDMS/LSS) 아키텍처를 기반으로 동작합니다."
              : "* This simulator emulates Hanyang System's proprietary PGMS/GDMS/LSS dual-redundant architecture."}
          </span>
          <button
            onClick={onOpenRfq}
            className="text-cyan-400 hover:text-cyan-300 underline font-bold cursor-pointer"
          >
            {lang === "ko" ? "SCADA 통합 소프트웨어 도입 규격 문의하기 →" : "Consult SCADA Deployment Specs →"}
          </button>
        </div>
      </div>
    </section>
  );
}
