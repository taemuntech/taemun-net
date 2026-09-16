import { useState } from 'react';
import { Box, Layers, Cpu, Download, CheckCircle2 } from 'lucide-react';
import { FLEET_MODELS } from '../data/fleetData';

interface FleetLineupSectionProps {
 onOpenSpecModal: (robotName: string) => void;
}

export function FleetLineupSection({ onOpenSpecModal }: FleetLineupSectionProps) {
 const [activeRobotKey, setActiveRobotKey] = useState<'amr500' | 'amr1500' | 'amr3000'>('amr500');
 const activeRobot = FLEET_MODELS[activeRobotKey];

 return (
 <section className="py-20 bg-slate-50 border-b border-slate-200" id="solutions">
 <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
 {/* Section Header */}
 <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
 <div>
 <div className="flex items-center gap-2 mb-2">
 <span className="h-2 w-2 rounded bg-blue-600" />
 <span className="text-xs font-mono font-bold text-blue-600 uppercase">
 ISO CLASS 1 CERTIFIED FLEET LINEUP
 </span>
 </div>
 <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
 무진동·무분진 차세대 클린룸 AMR 라인업
 </h2>
 </div>
 <p className="text-sm lg:text-base text-slate-600 max-w-md leading-relaxed">
 반도체 FOUP 웨이퍼 카세트부터 3톤 2차전지 전극 롤까지, 첨단 공정 맞춤형 로보틱스 플랫폼을 지원합니다.
 </p>
 </div>

 {/* Robot Selector Tabs */}
 <div className="flex border-b border-slate-200 mb-8 overflow-x-auto gap-2">
 <button
 type="button"
 onClick={() => setActiveRobotKey('amr500')}
 className={`px-6 py-3.5 text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
 activeRobotKey === 'amr500'
 ? 'border-b-2 border-blue-600 text-blue-600'
 : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
 }`}
 >
 <Box className="w-4 h-4" />
 <span>AMR-500 (웨이퍼 카세트)</span>
 </button>
 <button
 type="button"
 onClick={() => setActiveRobotKey('amr1500')}
 className={`px-6 py-3.5 text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
 activeRobotKey === 'amr1500'
 ? 'border-b-2 border-blue-600 text-blue-600'
 : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
 }`}
 >
 <Layers className="w-4 h-4" />
 <span>AMR-1500 (표준 파렛트)</span>
 </button>
 <button
 type="button"
 onClick={() => setActiveRobotKey('amr3000')}
 className={`px-6 py-3.5 text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
 activeRobotKey === 'amr3000'
 ? 'border-b-2 border-blue-600 text-blue-600'
 : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
 }`}
 >
 <Cpu className="w-4 h-4" />
 <span>AMR-3000 (전극 롤·중량물)</span>
 </button>
 </div>

 {/* Interactive Spec Display Card */}
 <div className="bg-white rounded-lg border border-slate-200 p-6 lg:p-10 shadow-sm">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
 {/* Left Specs details */}
 <div className="lg:col-span-6">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-blue-700 text-xs font-mono font-bold mb-4 border border-blue-100">
 <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
 <span>{activeRobot.category}</span>
 </div>
 <h3 className="text-2xl font-bold text-slate-900 mb-3">{activeRobot.title}</h3>
 <p className="text-sm text-slate-600 mb-6 leading-relaxed">{activeRobot.desc}</p>

 {/* Technical Metric Table */}
 <div className="grid grid-cols-2 gap-4 mb-8">
 <div className="p-3.5 rounded bg-slate-50 border border-slate-100">
 <span className="text-slate-400 text-[11px] font-mono font-bold block">PAYLOAD CAPACITY</span>
 <span className="text-slate-900 font-bold text-base mt-1 block">{activeRobot.payload}</span>
 </div>
 <div className="p-3.5 rounded bg-slate-50 border border-slate-100">
 <span className="text-slate-400 text-[11px] font-mono font-bold block">DOCKING REPEATABILITY</span>
 <span className="text-blue-600 font-bold text-base mt-1 block">{activeRobot.docking}</span>
 </div>
 <div className="p-3.5 rounded bg-slate-50 border border-slate-100">
 <span className="text-slate-400 text-[11px] font-mono font-bold block">CLEANROOM CLASS</span>
 <span className="text-emerald-700 font-bold text-base mt-1 block">{activeRobot.cert}</span>
 </div>
 <div className="p-3.5 rounded bg-slate-50 border border-slate-100">
 <span className="text-slate-400 text-[11px] font-mono font-bold block">BATTERY & RUNTIME</span>
 <span className="text-slate-900 font-bold text-base mt-1 block">{activeRobot.battery}</span>
 </div>
 </div>

 {/* Button Actions */}
 <div className="flex flex-wrap gap-4">
 <button
 type="button"
 onClick={() => onOpenSpecModal(activeRobot.title.split(' ')[0])}
 className="px-5 py-2.5 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
 >
 <Download className="w-4 h-4" />
 <span>상세 CAD 도면 & 기술 스펙시트 (PDF)</span>
 </button>
 <a
 href="#consultation-wizard"
 className="px-5 py-2.5 rounded border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-medium transition-colors"
 >
 라인 적용 타당성 문의
 </a>
 </div>
 </div>

 {/* Visual Schematic / Blueprint Well */}
 <div className="lg:col-span-6 bg-slate-50 rounded border border-slate-200 p-6 flex flex-col justify-between relative overflow-hidden">
 <div className="flex justify-between items-center pb-3 border-b border-slate-200 text-xs font-mono text-slate-500">
 <span>KINEMATICS OVERVIEW: 360° HOLONOMIC OMNI-DRIVE</span>
 <span className="text-emerald-600 flex items-center gap-1 font-semibold">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> CALIBRATED
 </span>
 </div>

 {/* Diagram Representation */}
 <div className="py-10 flex flex-col items-center justify-center relative">
 <div className="w-64 h-64 rounded border border-dashed border-blue-400/50 relative flex items-center justify-center bg-white shadow-inner">
 {/* Reticle Center */}
 <div className="w-32 h-32 rounded-lg bg-blue-50 border border-blue-600 flex flex-col items-center justify-center text-center p-2 relative shadow-sm">
 <span className="text-[10px] font-mono text-blue-600 font-bold">
 {activeRobot.modelCode}
 </span>
 <span className="text-xs text-slate-800 font-semibold mt-1">FOUP PAYLOAD</span>
 <span className="text-[9px] text-slate-400 font-mono mt-0.5">{activeRobot.dimensions}</span>

 {/* 4 Omnidirectional Drive indicators */}
 <span className="absolute -top-1.5 left-2 w-3.5 h-1.5 bg-slate-800 rounded" />
 <span className="absolute -top-1.5 right-2 w-3.5 h-1.5 bg-slate-800 rounded" />
 <span className="absolute -bottom-1.5 left-2 w-3.5 h-1.5 bg-slate-800 rounded" />
 <span className="absolute -bottom-1.5 right-2 w-3.5 h-1.5 bg-slate-800 rounded" />
 </div>

 {/* Axis Lines */}
 <div className="absolute inset-x-2 h-px bg-slate-200 pointer-events-none" />
 <div className="absolute inset-y-2 w-px bg-slate-200 pointer-events-none" />
 <span className="absolute top-2 right-3 text-[10px] font-mono text-slate-400">
 Z-AXIS 0.00°
 </span>
 </div>

 <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500">
 <span>SAFETY LIDAR: {activeRobot.sensors}</span>
 <span>•</span>
 <span>VISION: {activeRobot.vision}</span>
 </div>
 </div>

 {/* Sensor Live Strip */}
 <div className="p-3 bg-white rounded border border-slate-200 flex flex-wrap justify-between items-center text-xs font-mono gap-2">
 <span className="text-slate-600">
 STATIC DISCHARGE: <strong className="text-slate-900">{activeRobot.staticDischarge}</strong>
 </span>
 <span className="text-slate-600">
 NOISE LEVEL: <strong className="text-slate-900">{activeRobot.noiseLevel}</strong>
 </span>
 <span className="text-slate-600">
 TURNING RADIUS: <strong className="text-blue-600">{activeRobot.turningRadius}</strong>
 </span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
