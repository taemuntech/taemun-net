'use client';

// 모달 3종은 공용 훅(use-sample-dialog)으로 Esc 닫기·배경 스크롤 잠금·포커스 순환을 얻는다.
// 배경 클릭 닫기는 onMouseDown 에서 대상이 배경 자신일 때만 — 카드 안에서 시작한 드래그로 닫히지 않게.
// 모바일에서는 화면 아래에 붙는 시트, sm 이상에서는 가운데 카드.

import { useRef } from 'react';
import { X, Download, CheckCircle2, FileCode } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { RobotModel } from '../types';

const OVERLAY_CLASS =
 'fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 [word-break:keep-all]';

const SHEET_CLASS =
 'bg-white border border-slate-200 shadow-xl relative w-full rounded-t-2xl sm:rounded-lg max-h-[88dvh] overflow-y-auto p-5 sm:p-6 animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200 outline-none';

const CLOSE_BTN_CLASS =
 'h-11 w-11 -mr-2 shrink-0 flex items-center justify-center rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer';

interface VideoModalProps {
 isOpen: boolean;
 onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
 const dialogRef = useRef<HTMLDivElement>(null);
 useSampleDialog({ open: isOpen, onClose, dialogRef });

 if (!isOpen) return null;

 return (
 <div
 className={OVERLAY_CLASS}
 onMouseDown={(e) => {
 if (e.target === e.currentTarget) onClose();
 }}
 >
 <div
 ref={dialogRef}
 role="dialog"
 aria-modal="true"
 aria-labelledby="nexus-video-modal-title"
 tabIndex={-1}
 className={`${SHEET_CLASS} sm:max-w-3xl`}
 >
 <div className="flex justify-between items-center gap-3 pb-3 border-b border-slate-200 mb-4">
 <div className="flex items-center gap-2 min-w-0">
 <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
 <span
 id="nexus-video-modal-title"
 className="text-[11px] sm:text-xs font-mono font-bold text-slate-900"
 >
 SAMPLE FOOTAGE — CLEANROOM CLASS 1 (예시 영상)
 </span>
 </div>
 <button type="button" onClick={onClose} className={CLOSE_BTN_CLASS} aria-label="영상 닫기">
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="aspect-video bg-slate-950 rounded relative overflow-hidden flex items-center justify-center">
 <video
 controls
 autoPlay
 loop
 playsInline
 controlsList="nodownload noplaybackrate"
 disablePictureInPicture
 onContextMenu={(e) => e.preventDefault()}
 className="w-full h-full object-contain bg-black"
 src="/portfolio/nexus-robotics/cleanroom-fleet.mp4"
 />
 </div>

 <div className="mt-4 flex flex-wrap justify-between items-center gap-3 text-[11px] sm:text-xs font-mono text-slate-500">
 <span>실제 고객사 현장이 아니라 샘플용 영상입니다</span>
 <button
 type="button"
 onClick={onClose}
 className="px-4 py-2.5 min-h-11 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
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
 /** 모델 이름만 받으면 본문이 셋 다 같아진다 — 제원을 그리려면 모델 자체가 필요하다 */
 robot: RobotModel;
 onClose: () => void;
 onDownload: () => void;
}

export function SpecModal({ isOpen, robot, onClose, onDownload }: SpecModalProps) {
 const dialogRef = useRef<HTMLDivElement>(null);
 useSampleDialog({ open: isOpen, onClose, dialogRef });

 if (!isOpen) return null;

 const robotName = robot.title.split(' ')[0];
 const specRows: { label: string; value: string }[] = [
 { label: 'MODEL CODE', value: robot.modelCode },
 { label: 'DIMENSIONS (L×W×H)', value: robot.dimensions },
 { label: 'PAYLOAD', value: robot.payload },
 { label: 'DOCKING ACCURACY', value: robot.docking },
 { label: 'TURNING RADIUS', value: robot.turningRadius },
 { label: 'STATIC DISCHARGE', value: robot.staticDischarge },
 { label: 'NOISE LEVEL', value: robot.noiseLevel },
 { label: 'SAFETY SENSORS', value: robot.sensors },
 { label: 'VISION', value: robot.vision },
 ];

 return (
 <div
 className={OVERLAY_CLASS}
 onMouseDown={(e) => {
 if (e.target === e.currentTarget) onClose();
 }}
 >
 <div
 ref={dialogRef}
 role="dialog"
 aria-modal="true"
 aria-labelledby="nexus-spec-modal-title"
 tabIndex={-1}
 className={`${SHEET_CLASS} sm:max-w-2xl`}
 >
 <div className="flex justify-between items-start gap-3 pb-3 border-b border-slate-200 mb-4">
 <span id="nexus-spec-modal-title" className="text-base sm:text-lg font-bold text-slate-900">
 {robotName} 기술 사양서 패키지
 </span>
 <button type="button" onClick={onClose} className={CLOSE_BTN_CLASS} aria-label="사양서 안내 닫기">
 <X className="w-5 h-5" />
 </button>
 </div>
 <p className="text-xs lg:text-sm text-slate-600 mb-4 leading-relaxed">
 기구 설계팀 및 클린룸 팹 플래닝을 위한 3D STEP 파일, 2D DWG 치수도, 전기 단선도 패키지 구성 예시입니다.
 </p>
 <div className="p-4 rounded bg-slate-50 border border-slate-200 mb-4 space-y-2 text-[11px] sm:text-xs font-mono text-slate-600">
 <div>• PACKAGE: {robot.modelCode}-ENG-SPEC-FULL-V4.zip (예시)</div>
 <div>• INCLUDES: 3D STEP · 안전 규격 적합성 시험 성적서 (예시) · 배터리 운송 시험 성적서 (예시)</div>
 <div>• CLASSIFICATION: NEXUS PROPRIETARY (SAMPLE)</div>
 </div>

 {/* 모델을 바꿔도 본문이 똑같던 자리 — 데이터에 있던 제원을 실제로 보여 준다 */}
 <div className="mb-4 overflow-x-auto rounded border border-slate-200">
 <table className="w-full min-w-[22rem] text-left text-[11px] sm:text-xs">
 <caption className="sr-only">{robotName} 주요 제원 (예시 수치)</caption>
 <tbody className="divide-y divide-slate-100">
 {specRows.map((row) => (
 <tr key={row.label}>
 <th scope="row" className="bg-slate-50 px-3 py-2 font-mono font-bold text-slate-500 align-top whitespace-nowrap">
 {row.label}
 </th>
 <td className="px-3 py-2 text-slate-800">{row.value}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <div className="mb-6 rounded border border-blue-200 bg-blue-50/70 px-4 py-3 text-xs sm:text-sm font-medium text-slate-800">
 샘플 사이트입니다 — 실제 파일은 <strong className="font-bold">내려받아지지 않습니다</strong>.
 </div>
 <div className="flex flex-wrap justify-end gap-3">
 <button
 type="button"
 onClick={onClose}
 className="px-4 py-2.5 min-h-11 rounded border border-slate-300 text-slate-700 text-xs font-medium cursor-pointer hover:bg-slate-50"
 >
 취소
 </button>
 <button
 type="button"
 onClick={onDownload}
 className="px-5 py-2.5 min-h-11 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
 >
 <Download className="w-3.5 h-3.5 shrink-0" />
 <span>다운로드 (샘플 안내)</span>
 </button>
 </div>
 </div>
 </div>
 );
}

// 푸터의 Security Whitepaper·Kinematics API 도 이 모달을 연다 — 목록에 그 두 항목이 실제로 들어 있다.
const DOC_ITEMS = [
 { name: '설비 통신 인터페이스 가이드 v3.4 (E82/E84 계열)', tag: 'READY', tone: 'text-emerald-700' },
 { name: 'Cleanroom Safety Whitepaper (청정 등급 기준)', tag: 'PDF (12.4 MB · 예시)', tone: 'text-blue-600' },
 { name: 'Security Whitepaper — 군집 제어망 분리 설계', tag: 'PDF (8.1 MB · 예시)', tone: 'text-blue-600' },
 { name: 'Kinematics API — REST / gRPC 레퍼런스', tag: 'OpenAPI 3.1', tone: 'text-slate-600' },
 { name: 'Kinematics 3D CAD & Simulation Model', tag: 'STEP / URDF', tone: 'text-slate-600' },
];

interface DocModalProps {
 isOpen: boolean;
 onClose: () => void;
}

export function DocModal({ isOpen, onClose }: DocModalProps) {
 const dialogRef = useRef<HTMLDivElement>(null);
 useSampleDialog({ open: isOpen, onClose, dialogRef });

 if (!isOpen) return null;

 return (
 <div
 className={OVERLAY_CLASS}
 onMouseDown={(e) => {
 if (e.target === e.currentTarget) onClose();
 }}
 >
 <div
 ref={dialogRef}
 role="dialog"
 aria-modal="true"
 aria-labelledby="nexus-doc-modal-title"
 tabIndex={-1}
 className={`${SHEET_CLASS} sm:max-w-2xl`}
 >
 <div className="flex justify-between items-start gap-3 pb-3 border-b border-slate-200 mb-4">
 <div className="flex items-center gap-2 min-w-0">
 <FileCode className="w-5 h-5 text-blue-600 shrink-0" />
 <span id="nexus-doc-modal-title" className="text-base sm:text-lg font-bold text-slate-900">
 NEXUS 기술 문서 및 통신 프로토콜 안내
 </span>
 </div>
 <button type="button" onClick={onClose} className={CLOSE_BTN_CLASS} aria-label="문서 안내 닫기">
 <X className="w-5 h-5" />
 </button>
 </div>
 <p className="text-xs lg:text-sm text-slate-600 mb-4 leading-relaxed">
 NEXUS-OS는 반송 설비 표준 인터페이스(E82/E84 계열)와 REST API, gRPC, MQTT 를 기준으로 기존 MES/ERP 와 연동하는 구성을 가정했습니다.
 </p>
 <ul className="space-y-3 mb-4">
 {DOC_ITEMS.map((item) => (
 <li
 key={item.name}
 className="p-3 bg-slate-50 border border-slate-200 rounded text-xs flex flex-wrap items-center justify-between gap-2"
 >
 <span className="font-mono font-bold text-slate-800">{item.name}</span>
 <span className={`${item.tone} font-mono text-[11px] font-bold`}>{item.tag}</span>
 </li>
 ))}
 </ul>
 <div className="mb-6 rounded border border-blue-200 bg-blue-50/70 px-4 py-3 text-xs sm:text-sm font-medium text-slate-800">
 샘플 사이트입니다 — 위 문서 목록은 화면 구성을 보여 주는 예시이며 실제로 내려받아지지 않습니다.
 </div>
 <div className="flex justify-end">
 <button
 type="button"
 onClick={onClose}
 className="px-5 py-2.5 min-h-11 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
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
 <div
 role="status"
 aria-live="polite"
 className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-[60] p-4 rounded bg-slate-900 text-white shadow-2xl flex items-start gap-3 border border-slate-700 sm:max-w-md animate-in slide-in-from-bottom-5 duration-300 [word-break:keep-all]"
 >
 <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
 <div>
 <div className="text-xs font-bold">{title}</div>
 <div className="text-xs text-slate-300 mt-0.5">{desc}</div>
 </div>
 </div>
 );
}
