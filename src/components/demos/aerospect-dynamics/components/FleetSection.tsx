import React, { useState } from 'react';
import { FLEET_DATA } from '../data/mockData';
import { DroneSpec } from '../types';

interface FleetSectionProps {
  onOpenPocModal: () => void;
  onOpenSpecDetail?: (drone: DroneSpec) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  onOpenPocModal,
}) => {
  const [activeTab, setActiveTab] = useState<string>('hexa');
  const [showFullMatrix, setShowFullMatrix] = useState<boolean>(false);

  const currentDrone = FLEET_DATA.find((d) => d.id === activeTab) || FLEET_DATA[0];

  return (
    <section id="fleet-section" className="w-full bg-zinc-50 py-16 border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="font-mono text-xs text-sky-700 uppercase font-semibold">
              FLEET SPECIFICATION SPEC-SHEET
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-zinc-950 tracking-tight">
              임무 목적별 산업용 특수 기체 라인업
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md">
            초대형 인프라 측량부터 24시간 자율 무인 감시까지, 국방·산업 표준을 충족하는 전용 기체 하드웨어.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-100 rounded-xl border border-zinc-200">
          {FLEET_DATA.map((drone) => {
            const isActive = activeTab === drone.id;
            return (
              <button
                key={drone.id}
                onClick={() => setActiveTab(drone.id)}
                className={`flex-1 min-w-[200px] px-5 py-3 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-zinc-950 shadow-xs border border-zinc-200'
                    : 'text-zinc-600 hover:bg-white/50'
                }`}
              >
                <div className="flex flex-col text-left">
                  <span
                    className={`text-xs font-mono font-bold uppercase ${
                      isActive ? 'text-sky-700' : 'text-zinc-500'
                    }`}
                  >
                    {drone.category}
                  </span>
                  <span className="font-semibold text-base tracking-tight">{drone.name}</span>
                </div>
                <span
                  className={`material-symbols-outlined ${
                    isActive ? 'text-sky-700' : 'text-zinc-400'
                  }`}
                >
                  {drone.id === 'hexa'
                    ? 'precision_manufacturing'
                    : drone.id === 'vtol'
                    ? 'flight'
                    : 'dock'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div className="p-6 lg:p-10 rounded-2xl bg-white shadow-xs flex flex-col lg:flex-row gap-8 items-stretch border border-zinc-200">
          {/* Left Details */}
          <div className="lg:w-1/2 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-zinc-100 font-mono text-xs text-zinc-600 border border-zinc-200">
                  {currentDrone.badge}
                </span>
                <span className={`px-2.5 py-0.5 rounded font-mono text-xs ${currentDrone.badgeColor}`}>
                  {currentDrone.tagline}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-zinc-950">
                {currentDrone.name}
              </h3>

              <p className="text-sm text-zinc-600 leading-relaxed [word-break:keep-all]">
                {currentDrone.description}
              </p>
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
              {currentDrone.specs.map((s, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-mono text-[11px] text-zinc-500">
                    {s.label}
                  </span>
                  <span className="font-mono text-sm font-bold text-zinc-950">
                    {s.value}
                  </span>
                  {s.subtext && (
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {s.subtext}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Features list */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="font-mono text-xs text-zinc-500 uppercase font-semibold">
                SYSTEM HIGHLIGHTS
              </span>
              <ul className="flex flex-col gap-1 text-xs text-zinc-700">
                {currentDrone.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenPocModal}
                className="px-5 py-3 rounded-xl bg-zinc-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all active:scale-95 cursor-pointer font-semibold"
              >
                기체 상세 제원표 요청
              </button>

              <button
                onClick={() => setShowFullMatrix(!showFullMatrix)}
                className="px-4 py-3 rounded-xl bg-zinc-100 text-zinc-800 font-mono text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer border border-zinc-200 font-semibold"
              >
                {showFullMatrix ? '비교표 닫기' : '기종 전수 비교표 보기'}
              </button>

              <span className="font-mono text-xs text-zinc-500">
                납품 리드타임: {currentDrone.leadTime}
              </span>
            </div>
          </div>

          {/* Right Image Display with Telemetry Bar */}
          <div className="lg:w-1/2 rounded-xl overflow-hidden bg-zinc-900 relative min-h-[360px] flex items-center justify-center border border-zinc-200">
            <img
              alt={currentDrone.imageAlt}
              className="w-full h-full object-cover"
              src={currentDrone.image}
            />

            {/* Status Strip Over Image */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/75 backdrop-blur-md text-white flex items-center justify-between font-mono text-xs border border-white/10 shadow-lg">
              <span>{currentDrone.statusBadge}</span>
              <span className="text-emerald-400 font-semibold">{currentDrone.statusText}</span>
            </div>
          </div>
        </div>

        {/* Expandable Comparison Matrix */}
        {showFullMatrix && (
          <div className="mt-4 p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs overflow-x-auto">
            <h4 className="text-base font-bold text-zinc-950 mb-4">산업용 특수 기체 전수 사양 비교표 (Spec Matrix, 예시)</h4>
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500">
                  <th className="py-2.5 px-3">구분 항목</th>
                  <th className="py-2.5 px-3 font-bold text-zinc-950">HEXA-INSPECT 600</th>
                  <th className="py-2.5 px-3 font-bold text-zinc-950">AERO-V1 SURVEYOR</th>
                  <th className="py-2.5 px-3 font-bold text-zinc-950">SENTINEL DOCK SYSTEM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60">
                <tr>
                  <td className="py-2.5 px-3 font-medium text-zinc-500">기체 플랫폼 유형</td>
                  <td className="py-2.5 px-3">동축반전 6축 헥사로터</td>
                  <td className="py-2.5 px-3">틸트로터 수직이착륙 고정익 (VTOL)</td>
                  <td className="py-2.5 px-3">자율 무인 격납 도킹 스테이션</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-zinc-500">최대 체공 시간</td>
                  <td className="py-2.5 px-3 font-bold text-sky-700">55 Min (호버링, 예시)</td>
                  <td className="py-2.5 px-3 font-bold text-sky-700">90 Min (순항, 예시)</td>
                  <td className="py-2.5 px-3 font-bold text-sky-700">24시간 연속 운용 (25분 충전)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-zinc-500">유효 탑재 중량 (Payload)</td>
                  <td className="py-2.5 px-3">6.0 kg (듀얼 짐벌)</td>
                  <td className="py-2.5 px-3">2.5 kg (광학 정사 카메라)</td>
                  <td className="py-2.5 px-3">내장 자동 급속충전 베드</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-zinc-500">방수·방진 등급</td>
                  <td className="py-2.5 px-3">IP55 (전천후 폭우 가동)</td>
                  <td className="py-2.5 px-3">IP54 (돌풍 14m/s 저항)</td>
                  <td className="py-2.5 px-3">IP67 (완전 밀폐형 HVAC)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-zinc-500">데이터 링크 & 보안</td>
                  <td className="py-2.5 px-3">AES-256 / 15km C2</td>
                  <td className="py-2.5 px-3">AES-256 / 30km + LTE</td>
                  <td className="py-2.5 px-3">5G Private 사설망 + 위성 이중화</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-zinc-500">검측 정밀도 기준 (설계 규격)</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">0.10mm 크랙 식별</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">GSD 1.2cm / 수치지도 1:500</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">착륙 오차 ±2cm 비주얼 서보</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
