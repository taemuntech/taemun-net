export function Footer() {
 return (
 <footer className="w-full bg-white border-t border-slate-200">
 <div className="w-full px-6 lg:px-12 py-12 max-w-[1600px] mx-auto">
 {/* Top Row */}
 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-slate-100">
 <div className="flex flex-col">
 <div className="flex items-center gap-3">
 <span className="text-lg text-slate-900 font-bold uppercase tracking-wider">
 NEXUS ROBOTICS
 </span>
 <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-mono">
 ISO 14644-1 CERTIFIED
 </span>
 </div>
 <p className="text-xs text-slate-500 mt-1">
 스위스 초정밀 엔지니어링 기반 반도체 & 첨단 제조 클린룸 자율 이동 로봇 솔루션
 </p>
 </div>

 {/* Links Cluster */}
 <div className="flex flex-wrap gap-6 text-xs font-mono text-slate-600">
 <a href="#solutions" className="hover:text-blue-600 transition-colors">
 Autonomous Fleets
 </a>
 <a href="#nexus-os" className="hover:text-blue-600 transition-colors">
 NEXUS-OS Architecture
 </a>
 <a href="#standards" className="hover:text-blue-600 transition-colors">
 Cleanroom Compliance
 </a>
 <a href="#security" className="hover:text-blue-600 transition-colors">
 Security Whitepaper
 </a>
 <a href="#api" className="hover:text-blue-600 transition-colors">
 Kinematics API
 </a>
 <a href="#support" className="hover:text-blue-600 transition-colors">
 Global Support
 </a>
 </div>
 </div>

 {/* Bottom Row Details */}
 <div className="pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-xs text-slate-500">
 <div>
 <p>주식회사 넥서스 로보틱스 | 대표이사: 엔지니어링 총괄 본부 | 사업자등록번호: 104-86-09281</p>
 <p className="mt-0.5">
 판교 R&D 센터: 경기도 성남시 분당구 판교역로 166 넥서스 랩스 8F | 대표전화: 02-588-4900
 </p>
 </div>
 <div className="flex flex-col lg:items-end">
 <div className="flex gap-4 text-xs font-mono text-slate-600">
 <span>DART 전자공시</span>
 <span>•</span>
 <span>CE-MD CERTIFIED</span>
 <span>•</span>
 <span>ISO 9001 / 14001</span>
 </div>
 <span className="text-slate-400 text-[11px] mt-1">
 © 2025 NEXUS ROBOTICS AG. Cleanroom Standard ISO 14644-1 Certified. All rights reserved.
 </span>
 </div>
 </div>
 </div>
 </footer>
 );
}
