import { X, Play, Download, CheckCircle2, FileCode, Shield } from 'lucide-react';

interface VideoModalProps {
 isOpen: boolean;
 onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-white rounded-lg border border-slate-200 max-w-3xl w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
 <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
 <div className="flex items-center gap-2">
 <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
 <span className="text-xs font-mono font-bold text-slate-900">
 LIVE FAB TEST: PYEONGTAEK CLEANROOM CLASS 1
 </span>
 </div>
 <button
 type="button"
 onClick={onClose}
 className="text-slate-400 hover:text-slate-700 cursor-pointer"
 >
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="aspect-video bg-slate-950 rounded relative overflow-hidden flex items-center justify-center">
 <img
 alt="Video Stream"
 className="w-full h-full object-cover opacity-60"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP0LMDqPo3TTPJeMeKFrsp9v6KD1_GZ7i-IEqGGvYOfAPKyEP3BduxA8tBVL4SpEEGcBuFuzsTugFEAYD9v1z-bkuded04fQo_0L1gl2jKhAapE3xJOZMOizin9QytSuIbnPmVt-xOBXQ6U8gH-q21B5gsTegSQ9z1KF9dTNufQwkMLm_RNBNtVQqlw4DhSIWETyLWP52RmrtauTdiRpqmYxhn5UqIKI2HMsPsfw7LOZxFP5ONPXKf"
 />
 <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
 <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg mb-3">
 <Play className="w-8 h-8 text-white fill-white ml-1" />
 </div>
 <span className="text-base font-semibold">
 1080p 60FPS 자율 군집 주행 실증 영상 재생
 </span>
 <span className="text-xs font-mono text-blue-200 mt-1">
 클린룸 내 파티클 및 층류 변화율 0.00% 실측
 </span>
 </div>
 </div>

 <div className="mt-4 flex flex-wrap justify-between items-center text-xs font-mono text-slate-500 gap-2">
 <span>RECORDED AT SAMSUNG SEMICONDUCTOR TEST LAB</span>
 <button
 type="button"
 onClick={onClose}
 className="px-4 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
 >
 닫기
 </button>
 </div>
 </div>
 </div>
 );
}

interface SpecModalProps {
 isOpen: boolean;
 robotName: string;
 onClose: () => void;
 onDownload: () => void;
}

export function SpecModal({ isOpen, robotName, onClose, onDownload }: SpecModalProps) {
 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-white rounded-lg border border-slate-200 max-w-2xl w-full p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
 <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
 <span className="text-lg font-bold text-slate-900">
 {robotName} 기술 사양서 패키지 다운로드
 </span>
 <button
 type="button"
 onClick={onClose}
 className="text-slate-400 hover:text-slate-700 cursor-pointer"
 >
 <X className="w-5 h-5" />
 </button>
 </div>
 <p className="text-xs lg:text-sm text-slate-600 mb-4 leading-relaxed">
 기구 설계팀 및 클린룸 팹 플래닝을 위한 상세 3D STEP 파일, 2D DWG 치수도, 전기 단선도 패키지입니다.
 </p>
 <div className="p-4 rounded bg-slate-50 border border-slate-200 mb-6 space-y-2 text-xs font-mono text-slate-600">
 <div>• PACKAGE: NX-ENG-SPEC-FULL-V4.zip (48.2 MB)</div>
 <div>• INCLUDES: 3D STEP, ISO 3691-4 안전 인증서, 배터리 UN 38.3 성적서</div>
 <div>• CLASSIFICATION: NEXUS PROPRIETARY (COMMERCIAL POC PURPOSE)</div>
 </div>
 <div className="flex justify-end gap-3">
 <button
 type="button"
 onClick={onClose}
 className="px-4 py-2 rounded border border-slate-300 text-slate-700 text-xs font-medium cursor-pointer hover:bg-slate-50"
 >
 취소
 </button>
 <button
 type="button"
 onClick={onDownload}
 className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
 >
 <Download className="w-3.5 h-3.5" />
 <span>즉시 다운로드 시작</span>
 </button>
 </div>
 </div>
 </div>
 );
}

interface DocModalProps {
 isOpen: boolean;
 onClose: () => void;
}

export function DocModal({ isOpen, onClose }: DocModalProps) {
 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-white rounded-lg border border-slate-200 max-w-2xl w-full p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
 <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
 <div className="flex items-center gap-2">
 <FileCode className="w-5 h-5 text-blue-600" />
 <span className="text-lg font-bold text-slate-900">
 NEXUS 기술 문서 및 통신 프로토콜 안내
 </span>
 </div>
 <button
 type="button"
 onClick={onClose}
 className="text-slate-400 hover:text-slate-700 cursor-pointer"
 >
 <X className="w-5 h-5" />
 </button>
 </div>
 <p className="text-xs lg:text-sm text-slate-600 mb-4 leading-relaxed">
 NEXUS-OS는 SEMI E82, SEMI E84, REST API, gRPC, MQTT 프로토콜을 완벽히 지원하며 기존 MES/ERP와 신속하게 통합할 수 있습니다.
 </p>
 <div className="space-y-3 mb-6">
 <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs flex items-center justify-between">
 <span className="font-mono font-bold text-slate-800">SECS-II / GEM Interface Guide v3.4</span>
 <span className="text-emerald-700 font-mono text-[11px] font-bold">READY</span>
 </div>
 <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs flex items-center justify-between">
 <span className="font-mono font-bold text-slate-800">Cleanroom Safety Whitepaper (ISO 14644-1)</span>
 <span className="text-blue-600 font-mono text-[11px] font-bold">PDF (12.4 MB)</span>
 </div>
 <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs flex items-center justify-between">
 <span className="font-mono font-bold text-slate-800">Kinematics 3D CAD & Simulation Model</span>
 <span className="text-slate-600 font-mono text-[11px]">STEP / URDF</span>
 </div>
 </div>
 <div className="flex justify-end">
 <button
 type="button"
 onClick={onClose}
 className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
 >
 확인
 </button>
 </div>
 </div>
 </div>
 );
}

interface ToastProps {
 show: boolean;
 title: string;
 desc: string;
}

export function Toast({ show, title, desc }: ToastProps) {
 if (!show) return null;

 return (
 <div className="fixed bottom-6 right-6 z-50 p-4 rounded bg-slate-900 text-white shadow-2xl flex items-center gap-3 border border-slate-700 max-w-md animate-in slide-in-from-bottom-5 duration-300">
 <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
 <div>
 <div className="text-xs font-bold">{title}</div>
 <div className="text-xs text-slate-300 mt-0.5">{desc}</div>
 </div>
 </div>
 );
}
