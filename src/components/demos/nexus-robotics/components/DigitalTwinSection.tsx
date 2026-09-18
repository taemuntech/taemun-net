'use client';

import { useState } from 'react';
import { CheckCircle2, GitBranch, Wind, Cable } from 'lucide-react';
import { FAB_BAYS } from '../data/bayData';

const NODE_TONE = {
 moving: 'text-white bg-blue-600 border-cyan-400 shadow-lg',
 docking: 'text-white bg-slate-800 border-slate-600 shadow',
 dispatch: 'text-white bg-slate-800/80 border-slate-700 shadow',
} as const;

const NODE_DOT = {
 moving: 'bg-emerald-400',
 docking: 'bg-blue-400',
 dispatch: 'bg-emerald-400',
} as const;

const NODE_DETAIL = {
 moving: 'text-blue-200',
 docking: 'text-slate-400',
 dispatch: 'text-emerald-300',
} as const;

export function DigitalTwinSection() {
 // BAY 카드가 눌리지 않는 그림이었다 — 고른 베이를 따라 노드·기류·교통 밀도·처리량이 함께 바뀐다
 const [activeBayId, setActiveBayId] = useState(FAB_BAYS[0].id);
 const activeBay = FAB_BAYS.find((bay) => bay.id === activeBayId) ?? FAB_BAYS[0];
 const { current, target, capacity, unit } = activeBay.throughput;
 const overTargetPercent = Math.round((current / target - 1) * 1000) / 10;
 const capacityPercent = Math.round((current / capacity) * 100);

 return (
 <section className="py-14 lg:py-20 bg-white border-b border-slate-200" id="nexus-os">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
 <div className="max-w-3xl mb-10 lg:mb-12">
 <div className="flex items-center gap-2 mb-2">
 <span className="h-2 w-2 rounded bg-blue-600" />
 <span className="text-xs font-mono font-bold text-blue-600 uppercase">
 CENTRALIZED SW INTELLIGENCE
 </span>
 </div>
 <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
 NEXUS-OS 클라우드 디지털 트윈 관제 플랫폼
 </h2>
 <p className="text-base lg:text-lg text-slate-600 mt-3 leading-relaxed [word-break:keep-all]">
 3차원 클린룸 팹 모델링과 0.01초 단위 분산 군집 제어를 가정한 관제 화면 예시입니다. 수백 대의 AMR 경로를 교착(Deadlock) 회피 규칙으로 배분하는 구성을 보여 줍니다.
 </p>
 </div>

 {/* High-Precision White Dashboard Mockup */}
 <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm mb-12">
 {/* Window Header Bar */}
 <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
 <div className="flex items-center gap-4">
 <div className="flex gap-1.5">
 <div className="w-3 h-3 rounded-full bg-slate-300" />
 <div className="w-3 h-3 rounded-full bg-slate-300" />
 <div className="w-3 h-3 rounded-full bg-slate-300" />
 </div>
 <span className="text-xs font-mono text-slate-600 font-bold">
 NEXUS-OS v4.8.2 // FAB-02 SAMPLE CLEANROOM TWIN
 </span>
 </div>
 <div className="flex flex-wrap items-center gap-2 lg:gap-3">
 <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[11px] font-mono font-bold">
 예시 데이터
 </span>
 <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
 ACTIVE CLUSTER: 148 NODES
 </span>
 <span className="text-xs font-mono text-slate-400">
 LATENCY: 1.8ms (5G Private SA)
 </span>
 </div>
 </div>

 {/* Dashboard Canvas */}
 <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 bg-slate-50/50">
 {/* Left Side: Live 2D/3D Fab Grid View */}
 <div className="lg:col-span-8 bg-white rounded border border-slate-200 p-4 sm:p-5 relative overflow-hidden">
 <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
 <span className="text-sm font-bold text-slate-900">
 팹 베이(Bay) 실시간 반송 경로 및 교통 밀도
 </span>
 <div className="flex gap-2">
 <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono">
 AIR FLOW: {activeBay.airFlow}
 </span>
 <span
 className={`px-2 py-1 rounded text-xs font-mono font-bold ${
 activeBay.deadlockRisk === 'LOW' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
 }`}
 >
 DEADLOCK RISK: {activeBay.deadlockRisk}
 </span>
 </div>
 </div>

 {/* Animated Cleanroom 2D Grid with Nodes */}
 <div className="min-h-[260px] lg:aspect-[16/8] bg-slate-950 rounded relative overflow-hidden p-4 pb-4 lg:pb-10 font-mono text-xs text-slate-400 select-none flex flex-col">
 {/* Cleanroom Ceiling Diffuser Grid Graphic */}
 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

 {/* Grid guidelines */}
 <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-blue-500/20" strokeDasharray="4 4">
 <line x1="15%" y1="0" x2="15%" y2="100%" />
 <line x1="45%" y1="0" x2="45%" y2="100%" />
 <line x1="75%" y1="0" x2="75%" y2="100%" />
 <line x1="0" y1="55%" x2="100%" y2="55%" />
 </svg>

 {/* Fab Bay Rectangles — 누르면 아래 노드 목록과 오른쪽 처리량 카드가 그 베이 값으로 바뀐다 */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10 mb-6 lg:mb-8">
 {FAB_BAYS.map((bay) => {
 const isActive = bay.id === activeBay.id;
 return (
 <button
 key={bay.id}
 type="button"
 aria-pressed={isActive}
 onClick={() => setActiveBayId(bay.id)}
 className={`text-left border rounded p-2.5 min-h-12 shadow-inner transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
 isActive
 ? 'border-cyan-400 bg-blue-900/70 text-cyan-300'
 : 'border-blue-500/40 bg-blue-950/50 text-cyan-400 hover:border-cyan-400/70 hover:bg-blue-900/50'
 }`}
 >
 <span className="text-xs font-bold block">
 {bay.code} : {bay.process}
 </span>
 <div className={`mt-1 text-[10px] ${bay.statusTone === 'emerald' ? 'text-emerald-400' : 'text-slate-400'}`}>
 {bay.statusLabel}
 </div>
 </button>
 );
 })}
 </div>

 {/* AMR Moving Nodes — 고른 베이에 배차된 기체만 보여 준다 */}
 <div className="relative z-10 flex flex-wrap gap-2.5 lg:gap-4 py-2 lg:py-4">
 {activeBay.nodes.map((node) => (
 <div
 key={node.name}
 className={`flex items-center gap-2 px-3 py-1.5 rounded border ${NODE_TONE[node.tone]}`}
 >
 <span className={`w-2 h-2 rounded-full ${NODE_DOT[node.tone]}`} />
 <span className="font-bold text-xs">{node.name}</span>
 <span className={`text-[10px] ${NODE_DETAIL[node.tone]}`}>{node.detail}</span>
 </div>
 ))}
 </div>

 {/* Bottom status line */}
 <div className="relative z-10 mt-auto pt-3 flex flex-wrap justify-between items-center gap-1 border-t border-slate-800 text-[10px] sm:text-[11px] lg:absolute lg:bottom-3 lg:left-4 lg:right-4 lg:mt-0 lg:pt-2">
 <span className="text-cyan-400">
 PATH PLANNING: KINODYNAMIC SEARCH ALGORITHM ACTIVE
 </span>
 <span className="text-slate-500">REFRESH RATE: 100 Hz</span>
 </div>
 </div>
 </div>

 {/* Right Side: Real-time Telemetry & Diagnostics */}
 <div className="lg:col-span-4 flex flex-col gap-4">
 <div className="bg-white rounded border border-slate-200 p-4">
 <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
 <span className="text-xs font-bold text-slate-800">
 {activeBay.code} 시간당 이송 처리량 (UPH · 예시)
 </span>
 {/* 목표(TARGET) 대비와 설비 능력(CAPACITY) 대비는 다른 값이다 — 예전에는 둘을 섞어
 「MAX 의 94%」에 「+24.8% OVER TARGET」이라고 적어 스스로 모순이었다 */}
 <span
 className={`text-xs font-mono font-bold ${
 overTargetPercent >= 0 ? 'text-emerald-600' : 'text-amber-600'
 }`}
 >
 {overTargetPercent >= 0 ? '+' : ''}
 {overTargetPercent.toFixed(1)}% {overTargetPercent >= 0 ? 'OVER' : 'UNDER'} TARGET
 </span>
 </div>
 <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
 <div className="bg-blue-600 h-full transition-[width] duration-300" style={{ width: `${capacityPercent}%` }} />
 </div>
 <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-xs font-mono text-slate-500">
 <span>TARGET: {target.toLocaleString()}</span>
 <span className="text-slate-800 font-bold">
 CURRENT: {current.toLocaleString()} {unit}
 </span>
 <span>
 CAPACITY: {capacity.toLocaleString()} ({capacityPercent}%)
 </span>
 </div>
 </div>

 <div className="bg-white rounded border border-slate-200 p-4 flex-1">
 <span className="text-xs font-bold text-slate-800 block mb-3">
 설비 통신 연동 (예시 구성)
 </span>
 <ul className="space-y-2.5 text-xs text-slate-600">
 <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
 <span className="flex items-center gap-1.5">
 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
 반송 설비 표준 인터페이스 (E82 계열)
 </span>
 <span className="font-mono text-slate-700 font-bold">CONNECTED</span>
 </li>
 <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
 <span className="flex items-center gap-1.5">
 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
 자동 반송 핸드셰이크 (E84 계열)
 </span>
 <span className="font-mono text-slate-700 font-bold">READY</span>
 </li>
 <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
 <span className="flex items-center gap-1.5">
 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
 전사 ERP / MES Direct API
 </span>
 <span className="font-mono text-slate-700 font-bold">ACTIVE</span>
 </li>
 <li className="flex items-center justify-between">
 <span className="flex items-center gap-1.5">
 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
 클린룸 공조 시스템 (FFU) 연동 제어
 </span>
 <span className="font-mono text-slate-700 font-bold">SYNCED</span>
 </li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* 3 Technical Highlights */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
 <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-sm">
 <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
 <GitBranch className="w-5 h-5" />
 </div>
 <h3 className="text-lg font-bold text-slate-900 mb-2">AI Dynamic Traffic Routing</h3>
 <p className="text-sm text-slate-600 leading-relaxed [word-break:keep-all]">
 중앙 집약형 그래프 신경망(GNN)으로 교차로와 좁은 클린룸 통로의 데드락을 회피하고 통행 시간을 평균 34% 단축하는 것을 목표로 한 구성 예시입니다.
 </p>
 </div>
 <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-sm">
 <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
 <Wind className="w-5 h-5" />
 </div>
 <h3 className="text-lg font-bold text-slate-900 mb-2">Laminar Airflow Optimization</h3>
 <p className="text-sm text-slate-600 leading-relaxed [word-break:keep-all]">
 로봇 이동 시 발생하는 미세 와류를 억제하도록 FFU(Fan Filter Unit) 기류 속도와 동기화하여 고청정 층류를 항시 유지합니다.
 </p>
 </div>
 <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-sm">
 <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
 <Cable className="w-5 h-5" />
 </div>
 <h3 className="text-lg font-bold text-slate-900 mb-2">Enterprise 표준 프로토콜 연동</h3>
 <p className="text-sm text-slate-600 leading-relaxed [word-break:keep-all]">
 기존 제조 설비 및 상위 ERP/MES 수정 없이 표준 REST/gRPC/MQTT 프로토콜로 연동 테스트를 구성하는 화면 예시입니다.
 </p>
 </div>
 </div>
 </div>
 </section>
 );
}
