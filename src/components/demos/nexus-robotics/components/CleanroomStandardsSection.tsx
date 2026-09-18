import { ShieldCheck, FileText } from 'lucide-react';
import { FLEET_MODELS } from '../data/fleetData';

// 헤더 네비 「Cleanroom Standards」와 푸터 「Cleanroom Compliance」가 가리키던 #standards 는
// 실재하지 않는 앵커였다(전 구간 죽은 링크 2개). 같은 데이터(FLEET_MODELS)로 대조표를 만들어
// 앵커를 실재하게 하고, 좁은 폭에서는 표를 자체 가로 스크롤 상자에 담는다.

interface StandardsRow {
 label: string;
 pick: (model: (typeof FLEET_MODELS)[string]) => string;
}

const ROWS: StandardsRow[] = [
 { label: '대응 클린룸 등급', pick: (m) => m.cert },
 { label: '적재 중량', pick: (m) => m.payload },
 { label: '도킹 반복 정밀도', pick: (m) => m.docking },
 { label: '정전기 방전 (ESD)', pick: (m) => m.staticDischarge },
 { label: '주행 소음', pick: (m) => m.noiseLevel },
 { label: '최소 회전 반경', pick: (m) => m.turningRadius },
 { label: '안전 센서 구성', pick: (m) => m.sensors },
 { label: '비전 구성', pick: (m) => m.vision },
 { label: '배터리 · 가동 시간', pick: (m) => m.battery },
];

const MODELS = [FLEET_MODELS.amr500, FLEET_MODELS.amr1500, FLEET_MODELS.amr3000];

export function CleanroomStandardsSection() {
 return (
 <section className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200" id="cleanroom-standards">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
 {/* Section Header */}
 <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-5">
 <div>
 <div className="flex items-center gap-2 mb-2">
 <span className="h-2 w-2 rounded bg-blue-600" />
 <span className="text-xs font-mono font-bold text-blue-600 uppercase">
 CLEANROOM STANDARDS MATRIX
 </span>
 </div>
 <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight [word-break:keep-all]">
 클린룸 대응 규격 대조표
 </h2>
 </div>
 <p className="text-sm lg:text-base text-slate-600 max-w-md leading-relaxed [word-break:keep-all]">
 모델별 청정 등급·정전기·소음·도킹 정밀도를 한 표에서 비교합니다. 아래 값은 화면 구성을 보여 주기 위한 예시 표기입니다.
 </p>
 </div>

 {/* 예시 표기 배지 */}
 <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200">
 <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
 <span className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider">
 아래 등급·수치는 예시 표기입니다
 </span>
 </div>

 {/* 대조표 — 좁은 폭에서는 이 상자만 가로로 구른다 */}
 <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full min-w-[720px] text-left border-collapse">
 <caption className="sr-only">모델별 클린룸 대응 규격 대조표 (예시 표기)</caption>
 <thead>
 <tr className="bg-slate-50 border-b border-slate-200">
 <th
 scope="col"
 className="px-4 lg:px-6 py-3.5 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider w-44"
 >
 구분
 </th>
 {MODELS.map((model) => (
 <th
 key={model.id}
 scope="col"
 className="px-4 lg:px-6 py-3.5 text-xs font-bold text-slate-900"
 >
 <span className="block font-mono text-[11px] text-blue-600">{model.modelCode}</span>
 <span className="block mt-0.5">{model.tabLabel}</span>
 </th>
 ))}
 </tr>
 </thead>
 <tbody>
 {ROWS.map((row) => (
 <tr key={row.label} className="border-b border-slate-100 last:border-b-0">
 <th
 scope="row"
 className="px-4 lg:px-6 py-3.5 text-xs font-semibold text-slate-500 align-top bg-slate-50/60"
 >
 {row.label}
 </th>
 {MODELS.map((model) => (
 <td
 key={model.id}
 className="px-4 lg:px-6 py-3.5 text-xs text-slate-800 align-top [word-break:keep-all]"
 >
 {row.pick(model)}
 </td>
 ))}
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 {/* 표 아래 보조 설명 */}
 <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
 <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-sm">
 <div className="w-9 h-9 rounded bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
 <ShieldCheck className="w-4 h-4" />
 </div>
 <h3 className="text-sm font-bold text-slate-900 mb-1.5">저분진 구동부 설계</h3>
 <p className="text-xs text-slate-600 leading-relaxed [word-break:keep-all]">
 밀폐 섀시와 저발진 휠, 음압 흡입 구조로 주행 중 발생하는 파티클을 억제하는 구성을 가정했습니다.
 </p>
 </div>
 <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-sm">
 <div className="w-9 h-9 rounded bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
 <ShieldCheck className="w-4 h-4" />
 </div>
 <h3 className="text-sm font-bold text-slate-900 mb-1.5">정전기 · 아웃가스 관리</h3>
 <p className="text-xs text-slate-600 leading-relaxed [word-break:keep-all]">
 ESD 세이프 표면 처리와 저아웃가스 자재를 적용해 웨이퍼·극판 표면 오염을 줄이는 설계 예시입니다.
 </p>
 </div>
 <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-sm">
 <div className="w-9 h-9 rounded bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
 <FileText className="w-4 h-4" />
 </div>
 <h3 className="text-sm font-bold text-slate-900 mb-1.5">반입 전 검증 절차</h3>
 <p className="text-xs text-slate-600 leading-relaxed [word-break:keep-all]">
 반입 전 파티클 측정과 도킹 반복 정밀도 실측을 거치는 절차를 가정한 예시 안내입니다.
 </p>
 </div>
 </div>
 </div>
 </section>
 );
}
