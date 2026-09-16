import { CheckCircle2, GitBranch, Wind, Cable } from 'lucide-react';

export function DigitalTwinSection() {
 return (
 <section className="py-20 bg-white border-b border-slate-200" id="nexus-os">
 <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
 <div className="max-w-3xl mb-12">
 <div className="flex items-center gap-2 mb-2">
 <span className="h-2 w-2 rounded bg-blue-600" />
 <span className="text-xs font-mono font-bold text-blue-600 uppercase">
 CENTRALIZED SW INTELLIGENCE
 </span>
 </div>
 <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
 NEXUS-OS 클라우드 디지털 트윈 관제 플랫폼
 </h2>
 <p className="text-base lg:text-lg text-slate-600 mt-3 leading-relaxed">
 실시간 3차원 클린룸 팹 모델링과 0.01초 단위 분산 군집 제어. 수백 대의 AMR이 단 한 번의 교착(Deadlock) 없이 24시간 가동률을 극대화합니다.
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
 NEXUS-OS v4.8.2 // FAB-02 PYEONGTAEK CLEANROOM TWIN
 </span>
 </div>
 <div className="flex items-center gap-3">
 <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
 ACTIVE CLUSTER: 148 NODES
 </span>
 <span className="text-xs font-mono text-slate-400">
 LATENCY: 1.8ms (5G Private SA)
 </span>
 </div>
 </div>

 {/* Dashboard Canvas */}
 <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/50">
 {/* Left Side: Live 2D/3D Fab Grid View */}
 <div className="lg:col-span-8 bg-white rounded border border-slate-200 p-5 relative overflow-hidden">
 <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
 <span className="text-sm font-bold text-slate-900">
 팹 베이(Bay) 실시간 반송 경로 및 교통 밀도
 </span>
 <div className="flex gap-2">
 <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono">
 AIR FLOW: 0.45 m/s
 </span>
 <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-mono font-bold">
 DEADLOCK RISK: 0.00%
 </span>
 </div>
 </div>

 {/* Animated Cleanroom 2D Grid with Nodes */}
 <div className="min-h-[260px] aspect-[16/8] bg-slate-950 rounded relative overflow-hidden p-4 font-mono text-xs text-slate-400 select-none">
 {/* Cleanroom Ceiling Diffuser Grid Graphic */}
 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

 {/* Grid guidelines */}
 <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-blue-500/20" strokeDasharray="4 4">
 <line x1="15%" y1="0" x2="15%" y2="100%" />
 <line x1="45%" y1="0" x2="45%" y2="100%" />
 <line x1="75%" y1="0" x2="75%" y2="100%" />
 <line x1="0" y1="55%" x2="100%" y2="55%" />
 </svg>

 {/* Fab Bay Rectangles */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 relative z-10 mb-8">
 <div className="border border-blue-500/40 rounded bg-blue-950/50 p-2.5 text-cyan-400 shadow-inner">
 <span className="text-xs font-bold block">BAY-01 : ETCHING</span>
 <div className="mt-1 text-[10px] text-slate-400">DISPATCH: NORMAL</div>
 </div>
 <div className="border border-blue-500/40 rounded bg-blue-950/50 p-2.5 text-cyan-400 shadow-inner">
 <span className="text-xs font-bold block">BAY-02 : LITHO-EUV</span>
 <div className="mt-1 text-[10px] text-emerald-400">AIR-ISOLATION: 100%</div>
 </div>
 <div className="border border-blue-500/40 rounded bg-blue-950/50 p-2.5 text-cyan-400 shadow-inner">
 <span className="text-xs font-bold block">BAY-03 : DEPOSITION</span>
 <div className="mt-1 text-[10px] text-slate-400">AMR QUEUE: 2 UNITS</div>
 </div>
 </div>

 {/* AMR Moving Nodes (Simulated with dynamic visual cues) */}
 <div className="relative z-10 flex flex-wrap gap-4 py-4">
 <div className="flex items-center gap-2 text-white bg-blue-600 px-3 py-1.5 rounded shadow-lg border border-cyan-400 animate-pulse">
 <span className="w-2 h-2 rounded-full bg-emerald-400" />
 <span className="font-bold text-xs">AMR-500 #08</span>
 <span className="text-[10px] text-blue-200">FOUP → BAY-02</span>
 </div>
 <div className="flex items-center gap-2 text-white bg-slate-800 px-3 py-1.5 rounded shadow border border-slate-600">
 <span className="w-2 h-2 rounded-full bg-blue-400" />
 <span className="font-bold text-xs">AMR-1500 #24</span>
 <span className="text-[10px] text-slate-400">DOCKING 99.8%</span>
 </div>
 <div className="flex items-center gap-2 text-white bg-slate-800/80 px-3 py-1.5 rounded shadow border border-slate-700">
 <span className="w-2 h-2 rounded-full bg-emerald-400" />
 <span className="font-bold text-xs">AMR-500 #12</span>
 <span className="text-[10px] text-emerald-300">DISPATCHING</span>
 </div>
 </div>

 {/* Bottom status line */}
 <div className="absolute bottom-3 left-4 right-4 flex flex-wrap justify-between items-center pt-2 border-t border-slate-800 text-[11px]">
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
 <div className="flex justify-between items-center mb-3">
 <span className="text-xs font-bold text-slate-800">
 시간당 이송 처리량 (UPH)
 </span>
 <span className="text-xs font-mono text-emerald-600 font-bold">
 +24.8% OVER TARGET
 </span>
 </div>
 <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
 <div className="bg-blue-600 h-full w-[94%]" />
 </div>
 <div className="flex justify-between text-xs font-mono text-slate-500">
 <span>CURRENT: 1,420 CASSETTES/HR</span>
 <span>MAX: 1,500</span>
 </div>
 </div>

 <div className="bg-white rounded border border-slate-200 p-4 flex-1">
 <span className="text-xs font-bold text-slate-800 block mb-3">
 설비 통신 연동 (SECS/GEM & MES)
 </span>
 <ul className="space-y-2.5 text-xs text-slate-600">
 <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
 <span className="flex items-center gap-1.5">
 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
 SEMI E82 (IBSEM 표준 인터페이스)
 </span>
 <span className="font-mono text-slate-700 font-bold">CONNECTED</span>
 </li>
 <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
 <span className="flex items-center gap-1.5">
 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
 SEMI E84 (자동 반송 OHT/AMR 핸드셰이크)
 </span>
 <span className="font-mono text-slate-700 font-bold">READY</span>
 </li>
 <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
 <span className="flex items-center gap-1.5">
 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
 SAP S/4HANA & MES Direct API
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
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-sm">
 <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
 <GitBranch className="w-5 h-5" />
 </div>
 <h3 className="text-lg font-bold text-slate-900 mb-2">AI Dynamic Traffic Routing</h3>
 <p className="text-sm text-slate-600 leading-relaxed">
 중앙 집약형 그래프 신경망(GNN)을 통해 교차로 및 좁은 클린룸 통로에서 데드락을 원천 차단하고 통행 시간을 평균 34% 단축합니다.
 </p>
 </div>
 <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-sm">
 <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
 <Wind className="w-5 h-5" />
 </div>
 <h3 className="text-lg font-bold text-slate-900 mb-2">Laminar Airflow Optimization</h3>
 <p className="text-sm text-slate-600 leading-relaxed">
 로봇 이동 시 발생하는 미세 와류를 억제하도록 FFU(Fan Filter Unit) 기류 속도와 동기화하여 고청정 층류를 항시 유지합니다.
 </p>
 </div>
 <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-sm">
 <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
 <Cable className="w-5 h-5" />
 </div>
 <h3 className="text-lg font-bold text-slate-900 mb-2">Enterprise 1-Day Plug & Play</h3>
 <p className="text-sm text-slate-600 leading-relaxed">
 기존 제조 설비 및 상위 ERP/MES의 수정 없이 표준 REST/gRPC/MQTT 프로토콜로 하루 만에 완벽한 연동 테스트를 완료합니다.
 </p>
 </div>
 </div>
 </div>
 </section>
 );
}
