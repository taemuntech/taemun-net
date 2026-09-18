import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";
// 푸터 링크 6개 중 #standards·#security·#api·#support 4개는 실재하지 않는 앵커였다(전 구간 죽은 링크).
// 규격 표는 새로 만든 #cleanroom-standards 로, 보안·API 문서 2개는 실제로 그 항목이 들어 있는
// 기술 문서 모달로, 지원 문의는 상담 폼 앵커로 잇는다.

interface FooterProps {
 onOpenDocModal: () => void;
}

export function Footer({ onOpenDocModal }: FooterProps) {
 const linkClass =
 'inline-flex items-center min-h-11 hover:text-blue-600 transition-colors cursor-pointer';

 return (
 <footer className="w-full bg-white border-t border-slate-200">
 <div className="w-full px-4 sm:px-6 lg:px-12 py-10 lg:py-12 max-w-7xl mx-auto">
 {/* Top Row */}
 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-slate-100">
 <div className="flex flex-col">
 <div className="flex flex-wrap items-center gap-2 lg:gap-3">
 <span className="text-lg text-slate-900 font-bold uppercase tracking-wider">
 NEXUS ROBOTICS
 </span>
 <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-mono">
 클린룸 등급 표기 (예시)
 </span>
 </div>
 <p className="text-xs text-slate-500 mt-1 [word-break:keep-all]">
 초정밀 엔지니어링 기반 반도체 &amp; 첨단 제조 클린룸 자율 이동 로봇 솔루션 (가상 브랜드 설정)
 </p>
 </div>

 {/* Links Cluster */}
 <div className="flex flex-wrap gap-x-6 gap-y-0 text-xs font-mono text-slate-600">
 <a href="#solutions" className={linkClass}>
 Autonomous Fleets
 </a>
 <a href="#nexus-os" className={linkClass}>
 NEXUS-OS Architecture
 </a>
 <a href="#cleanroom-standards" className={linkClass}>
 Cleanroom Compliance
 </a>
 <button type="button" onClick={onOpenDocModal} className={linkClass}>
 Security Whitepaper
 </button>
 <button type="button" onClick={onOpenDocModal} className={linkClass}>
 Kinematics API
 </button>
 <a href="#consultation-wizard" className={linkClass}>
 Global Support
 </a>
 </div>
 </div>

 {/* Bottom Row Details */}
 <div className="pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-xs text-slate-500">
 <div className="[word-break:keep-all]">
 <p>주식회사 넥서스 로보틱스 | 대표이사: 엔지니어링 총괄 본부 | 사업자등록번호: 000-00-00000 (예시)</p>
 <p className="mt-0.5">
 판교 R&amp;D 센터: 경기도 성남시 분당구 (주소 예시) | 대표전화: 02-0000-0000 (예시)
 </p>
 </div>
 <div className="flex flex-col lg:items-end">
 <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-slate-600">
 <span>전자공시 표기 (예시)</span>
 <span className="hidden lg:inline">•</span>
 <span>안전 인증 표기 (예시)</span>
 <span className="hidden lg:inline">•</span>
 <span>품질·환경 인증 표기 (예시)</span>
 </div>
 <span className="text-slate-400 text-[11px] mt-1 [word-break:keep-all]"><SampleFooterNote /></span>
 </div>
 </div>

 {/* 접을 수 없는 자리에 남는 고지 — 이 화면은 가상 브랜드 샘플이다 */}
 </div>
 </footer>
 );
}
