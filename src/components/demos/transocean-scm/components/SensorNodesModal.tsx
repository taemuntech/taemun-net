import React, { useId, useMemo, useRef } from 'react';
import { X } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { ShipmentDossier } from '../types';

interface SensorNodesModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossier: ShipmentDossier;
}

/** '-18.2 °C' → { value: -18.2, unit: '°C' } — 숫자와 단위를 갈라 로그 4행을 만든다 */
function splitMeasure(raw: string): { value: number | null; unit: string } {
  const m = raw.match(/^\s*([+-]?\d+(?:\.\d+)?)\s*(.*)$/);
  if (!m) return { value: null, unit: raw.trim() };
  return { value: Number(m[1]), unit: m[2].trim() };
}

/** 기준값에 아주 작은 편차를 더해 표시한다. 편차는 행 번호로 정해져 있어 다시 그려도 값이 흔들리지 않는다. */
function drift(raw: string, delta: number, digits: number, signed = false): string {
  const { value, unit } = splitMeasure(raw);
  if (value === null) return raw;
  const next = value + delta;
  const shown = next.toFixed(digits);
  const withSign = signed && next > 0 ? `+${shown}` : shown;
  return unit ? `${withSign} ${unit}` : withSign;
}

export const SensorNodesModal: React.FC<SensorNodesModalProps> = ({
  isOpen,
  onClose,
  dossier,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const blId = dossier.blId;
  /** 하드웨어 ID 도 B/L 을 따라간다 — 어떤 화물을 골라도 같은 번호가 찍히던 자리 */
  const hardwareId = `SN-${blId.replace(/\D/g, '').slice(-5) || '00000'}-LEO`;
  const tempSigned = dossier.internalTemp.trim().startsWith('+');
  /** 로그 4행 — 기준값은 이 화물의 실제 dossier 값이고, 행마다 정해진 편차만 다르다 */
  const logRows = useMemo(
    () =>
      [
        { time: '13:10:44 UTC', dt: 0, dh: 0, dg: 0, mw: 14, harvest: true },
        { time: '13:05:00 UTC', dt: 0.1, dh: -0.1, dg: 0.01, mw: 14, harvest: false },
        { time: '13:00:00 UTC', dt: 0, dh: 0.1, dg: 0, mw: 15, harvest: false },
        { time: '12:55:00 UTC', dt: -0.1, dh: 0, dg: 0, mw: 14, harvest: false },
      ].map((row) => ({
        time: row.time,
        temp: drift(dossier.internalTemp, row.dt, 1, tempSigned),
        humidity: drift(dossier.relHumidity, row.dh, 1),
        gForce: drift(dossier.gForce, row.dg, 2),
        battery: row.harvest ? `${row.mw} mW (Harvesting +22mW)` : `${row.mw} mW`,
      })),
    [dossier.internalTemp, dossier.relHumidity, dossier.gForce, tempSigned],
  );

  // Esc · 배경 스크롤 잠금 · 포커스 순환 — 샘플 공용 훅(SampleNotice 와 같은 것)을 재사용한다
  useSampleDialog({ open: isOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="bg-[#132033] border border-[#2563eb]/50 rounded-t-xl sm:rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl outline-none flex flex-col max-h-[92vh] sm:max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="bg-[#0e1c2f] px-4 lg:px-6 py-3 lg:py-4 border-b border-[#434655]/40 flex justify-between items-center gap-3">
          <div className="flex items-center space-x-2 min-w-0">
            <span className="material-symbols-outlined text-[22px] shrink-0 text-[#b4c5ff]">sensors</span>
            <h3 id={titleId} className="text-sm lg:text-lg font-bold text-white font-mono uppercase truncate">
              IoT Sensor Node Diagnostics: {blId}
            </h3>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="센서 진단 닫기"
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded text-[#8d90a0] hover:text-white hover:bg-[#1d2a3e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 lg:p-6 overflow-y-auto space-y-5 font-mono text-xs">
          {/* Status Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#0e1c2f] p-3 rounded border border-[#434655]/40">
              <span className="text-[#8d90a0] text-[10px] uppercase block">Hardware ID</span>
              <span className="text-white font-bold">{hardwareId}</span>
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
              <span className="text-[#8d90a0] text-[10px] uppercase block">Node Battery</span>
              <span className="text-[#b4c5ff] font-bold">{dossier.sensorBattery}</span>
            </div>
          </div>

          {/* Historical Telemetry Stream Table */}
          <div>
            <div className="text-[#ffb693] font-bold uppercase mb-2">Telemetry Stream Log (예시 데이터)</div>
            <div className="bg-[#020e21] rounded border border-[#434655]/40 overflow-x-auto">
              <table className="w-full min-w-[46rem] text-left">
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
                  {logRows.map((row) => (
                    <tr key={row.time}>
                      <td className="p-2.5">{row.time}</td>
                      <td className="p-2.5 text-[#b4c5ff] font-bold">{row.temp}</td>
                      <td className="p-2.5">{row.humidity}</td>
                      <td className="p-2.5 text-emerald-400">{row.gForce}</td>
                      <td className="p-2.5">{row.battery}</td>
                      <td className="p-2.5 text-emerald-400">LEO Sat Mesh OK</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-[#0e1c2f] rounded border border-[#434655]/40 text-[#c3c6d7]">
            <span className="text-white font-bold block mb-1">
              Alert Protocol — {dossier.cargoType} (예시):
            </span>
            Setpoint {dossier.tempTarget} · {dossier.tempStatus}. Deviation beyond ±0.5°C over 15 consecutive
            minutes triggers an autonomous corrective cycle and dispatches a satellite notification to the carrier
            operations room.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#0e1c2f] px-4 lg:px-6 py-3 border-t border-[#434655]/40 flex flex-wrap gap-3 justify-between items-center">
          <span className="font-mono text-[11px] lg:text-xs text-emerald-400">
            Node Heartbeat: Nominal (Ping 48ms) · 예시 데이터
          </span>
          <button
            onClick={onClose}
            className="bg-[#2563eb] text-white px-5 min-h-11 rounded font-mono text-xs font-bold uppercase hover:bg-[#1d4ed8] transition-colors"
          >
            Dismiss Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
