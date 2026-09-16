import { ArrowRight, PlayCircle, Wind } from 'lucide-react';

interface HeroSectionProps {
 onOpenVideoModal: () => void;
}

export function HeroSection({ onOpenVideoModal }: HeroSectionProps) {
 return (
 <section className="relative cleanroom-grid border-b border-slate-200 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40">
 {/* Precision reticle marks in background */}
 <div className="absolute inset-0 pointer-events-none flex justify-between max-w-[1600px] mx-auto px-6 lg:px-12">
 <div className="h-full border-r border-dashed border-slate-200/80" />
 <div className="h-full border-r border-dashed border-slate-200/80 hidden lg:block" />
 <div className="h-full border-r border-dashed border-slate-200/80" />
 </div>

 <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24 relative z-10">
 {/* Top Status Pill */}
 <div className="flex items-center justify-start mb-6">
 <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
 <span className="relative flex h-2 w-2">
 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
 </span>
 <span className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wider">
 SERIES-B ENTERPRISE • ISO 14644-1 CLASS 1 CLEANROOM CERTIFIED
 </span>
 </div>
 </div>

 {/* Headline & Value Pitch */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
 <div className="lg:col-span-8">
 <h1 className="text-3xl lg:text-[56px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
 티끌 하나 없는 정밀함으로 구현하는<br className="hidden lg:inline" />
 <span className="text-blue-600">자율 군집 로보틱스</span> 인텔리전스
 </h1>
 </div>
 <div className="lg:col-span-4 pb-2">
 <p className="text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
 초당 100회 3D LiDAR·비전 SLAM 다중 센서 융합과 0.5mm 초정밀 도킹. 국내외 반도체 및 첨단 2차전지 클린룸 24개 사이트에서 24/7 무중단 가동 중입니다.
 </p>
 </div>
 </div>

 {/* Action Button Cluster */}
 <div className="flex flex-wrap items-center gap-4 mb-14">
 <a
 href="#consultation-wizard"
 className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold transition-colors shadow-sm"
 >
 <span>현장 엔지니어링 실사 요청</span>
 <ArrowRight className="w-4 h-4" />
 </a>
 <button
 type="button"
 onClick={onOpenVideoModal}
 className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-sm font-medium transition-colors shadow-sm cursor-pointer"
 >
 <PlayCircle className="w-5 h-5 text-blue-600" />
 <span>클린룸 무인 주행 실물 영상 (1080p)</span>
 </button>
 <div className="flex items-center gap-2 text-xs font-mono text-slate-500 ml-0 lg:ml-4">
 <span className="w-2 h-2 rounded-full bg-emerald-500" />
 <span>FLEET STATUS: 100% NOMINAL OPERATIONAL</span>
 </div>
 </div>

 {/* Hero Image Display With Precision Cleanroom Telemetry HUD */}
 <div className="relative rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm group">
 <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
 <img
 alt="NEXUS Cleanroom Fleet Demonstration"
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP0LMDqPo3TTPJeMeKFrsp9v6KD1_GZ7i-IEqGGvYOfAPKyEP3BduxA8tBVL4SpEEGcBuFuzsTugFEAYD9v1z-bkuded04fQo_0L1gl2jKhAapE3xJOZMOizin9QytSuIbnPmVt-xOBXQ6U8gH-q21B5gsTegSQ9z1KF9dTNufQwkMLm_RNBNtVQqlw4DhSIWETyLWP52RmrtauTdiRpqmYxhn5UqIKI2HMsPsfw7LOZxFP5ONPXKf"
 />
 {/* Hairline Crosshairs & Measurement Overlay */}
 <div className="absolute inset-0 pointer-events-none">
 {/* Top Left Reticle */}
 <div className="absolute top-6 left-6 p-3 rounded bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-slate-900 max-w-xs">
 <div className="flex items-center justify-between gap-4 mb-2 pb-1.5 border-b border-slate-100">
 <span className="text-[11px] font-mono text-blue-600 font-bold flex items-center gap-1">
 <Wind className="w-3.5 h-3.5" />
 LAMINAR SENSOR HUD
 </span>
 <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
 CLASS 1
 </span>
 </div>
 <div className="grid grid-cols-2 gap-3 text-xs font-mono">
 <div>
 <span className="text-slate-400 block text-[10px]">AIR VELOCITY</span>
 <span className="text-slate-800 font-semibold text-xs">0.45 m/s ±0.01</span>
 </div>
 <div>
 <span className="text-slate-400 block text-[10px]">PARTICLE COUNT</span>
 <span className="text-emerald-600 font-semibold text-xs">0.00 / ft³</span>
 </div>
 </div>
 </div>

 {/* Bottom Right Fleet Node Status */}
 <div className="absolute bottom-6 right-6 p-3 rounded bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-slate-900">
 <div className="flex items-center gap-4 text-xs font-mono">
 <div className="flex items-center gap-1.5">
 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
 <span className="text-slate-600">
 ACTIVE FLEET: <strong className="text-slate-900">148 UNITS</strong>
 </span>
 </div>
 <div className="h-3 w-px bg-slate-200" />
 <div className="text-slate-600">
 DOCKING TOLERANCE: <strong className="text-blue-600">±0.48 mm</strong>
 </div>
 </div>
 </div>

 {/* Subtle Corner Alignment Markers */}
 <div className="absolute top-3 right-3 text-slate-400/70 text-[10px] font-mono">
 + [127.004 : 88.319]
 </div>
 <div className="absolute bottom-3 left-3 text-slate-400/70 text-[10px] font-mono">
 CALIBRATION: ACTIVE_V4.2
 </div>
 </div>
 </div>
 </div>

 {/* Trust Metric Bar (Clean Minimalist Grid with Soft Slate Borders) */}
 <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
 <div className="p-5 rounded bg-white border border-slate-200 shadow-sm">
 <span className="text-[11px] font-mono font-bold text-slate-400 block mb-1">
 TOTAL AUTONOMOUS TRAVEL
 </span>
 <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">
 1,280,000 <span className="text-blue-600 text-lg">km+</span>
 </div>
 <p className="text-xs text-slate-600 mt-1">24개 글로벌 사이트 무사고 누적</p>
 </div>
 <div className="p-5 rounded bg-white border border-slate-200 shadow-sm">
 <span className="text-[11px] font-mono font-bold text-slate-400 block mb-1">
 CLEANROOM COMPLIANCE
 </span>
 <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">ISO Class 1~4</div>
 <p className="text-xs text-slate-600 mt-1">초저분진 마그네틱 휠 & 밀폐 섀시</p>
 </div>
 <div className="p-5 rounded bg-white border border-slate-200 shadow-sm">
 <span className="text-[11px] font-mono font-bold text-slate-400 block mb-1">
 DISPATCH EFFICIENCY
 </span>
 <div className="text-2xl lg:text-3xl font-extrabold text-blue-600">
 +380% <span className="text-slate-900 text-lg font-normal">UP</span>
 </div>
 <p className="text-xs text-slate-600 mt-1">기존 유인 AGV/수동 대차 대비</p>
 </div>
 <div className="p-5 rounded bg-white border border-slate-200 shadow-sm">
 <span className="text-[11px] font-mono font-bold text-slate-400 block mb-1">
 AVERAGE PAYBACK PERIOD
 </span>
 <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">
 14 <span className="text-lg text-slate-600 font-normal">개월</span>
 </div>
 <p className="text-xs text-slate-600 mt-1">생산 라인 CAPEX 신속 회수</p>
 </div>
 </div>
 </div>
 </section>
 );
}
