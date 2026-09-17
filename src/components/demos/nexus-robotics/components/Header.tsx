import { useState } from 'react';
import { Cpu, FileText, ArrowRight, Menu, X } from 'lucide-react';

interface HeaderProps {
 onOpenDocModal?: () => void;
}

export function Header({ onOpenDocModal }: HeaderProps) {
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 // 헤더 top 은 공용 샘플 바(44px)에 가려지지 않게 변수로 둔다 — 바가 없으면 0px 라 지금 화면 그대로다
 return (
 <header className="fixed top-[var(--sample-bar-h,0px)] left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
 <div className="flex justify-between items-center gap-3 w-full px-4 sm:px-6 lg:px-12 h-16 max-w-[1600px] mx-auto">
 {/* Brand Logo — #top 은 히어로 섹션(실재 앵커)이다 */}
 <a href="#top" className="flex items-center gap-2.5 sm:gap-3 group min-h-11 shrink-0">
 <div className="w-8 h-8 shrink-0 rounded bg-blue-600 flex items-center justify-center text-white relative shadow-sm">
 <Cpu className="w-4 h-4 text-white" />
 <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white animate-cleanroom-pulse" />
 </div>
 <div className="flex flex-col leading-tight">
 <span className="text-[13px] sm:text-sm tracking-tight text-slate-900 font-bold uppercase whitespace-nowrap">
 NEXUS ROBOTICS
 </span>
 {/* 좁은 폭에선 부제가 3줄로 접혀 헤더를 넘쳤다 — 480px 미만에서만 감춘다 */}
 <span className="hidden min-[480px]:block text-[10px] font-mono text-blue-700 tracking-widest uppercase font-semibold whitespace-nowrap">
 CLEANROOM FLEET AI
 </span>
 </div>
 </a>

 {/* Desktop Navigation Links */}
 <nav className="hidden lg:flex items-center gap-8">
 <a
 href="#solutions"
 className="text-blue-600 font-semibold border-b-2 border-blue-600 py-1 text-sm transition-colors"
 >
 Fleet Lineup
 </a>
 <a
 href="#nexus-os"
 className="text-slate-600 hover:text-blue-600 font-medium py-1 text-sm transition-colors"
 >
 NEXUS-OS
 </a>
 <a
 href="#cleanroom-standards"
 className="text-slate-600 hover:text-blue-600 font-medium py-1 text-sm transition-colors"
 >
 Cleanroom Standards
 </a>
 <a
 href="#roi-matrix"
 className="text-slate-600 hover:text-blue-600 font-medium py-1 text-sm transition-colors"
 >
 ROI Matrix
 </a>
 <a
 href="#references"
 className="text-slate-600 hover:text-blue-600 font-medium py-1 text-sm transition-colors"
 >
 Enterprise Specs
 </a>
 </nav>

 {/* Trailing Action Buttons */}
 <div className="flex items-center gap-2 sm:gap-3 shrink-0">
 <button
 type="button"
 onClick={onOpenDocModal}
 className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-11 rounded border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
 >
 <FileText className="w-3.5 h-3.5 text-slate-500" />
 Documentation
 </button>
 <a
 href="#consultation-wizard"
 className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 min-h-11 rounded bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 text-xs font-semibold transition-colors shadow-sm whitespace-nowrap"
 >
 {/* 좁은 폭에선 긴 문구가 두 줄로 접혀 로고를 밀어냈다 */}
 <span className="hidden min-[420px]:inline">도입 ROI 맞춤 상담</span>
 <span className="min-[420px]:hidden">상담 신청</span>
 <ArrowRight className="w-3.5 h-3.5 shrink-0" />
 </a>

 {/* Mobile menu toggle */}
 <button
 type="button"
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="h-11 w-11 -mr-2 flex items-center justify-center rounded lg:hidden text-slate-600 hover:bg-slate-100 cursor-pointer"
 aria-label="메뉴 열기/닫기"
 aria-expanded={mobileMenuOpen}
 >
 {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
 </button>
 </div>
 </div>

 {/* Mobile Drawer */}
 {mobileMenuOpen && (
 <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-2 flex flex-col shadow-lg max-h-[calc(100dvh-8rem)] overflow-y-auto">
 {[
 { href: '#solutions', label: 'Fleet Lineup', active: true },
 { href: '#nexus-os', label: 'NEXUS-OS', active: false },
 { href: '#cleanroom-standards', label: 'Cleanroom Standards', active: false },
 { href: '#roi-matrix', label: 'ROI Matrix', active: false },
 { href: '#references', label: 'Enterprise Specs', active: false },
 ].map((item) => (
 <a
 key={item.href}
 href={item.href}
 onClick={() => setMobileMenuOpen(false)}
 className={`flex items-center min-h-11 text-sm border-b border-slate-100 ${
 item.active ? 'text-blue-600 font-semibold' : 'text-slate-600 font-medium'
 }`}
 >
 {item.label}
 </a>
 ))}
 <button
 type="button"
 onClick={() => {
 setMobileMenuOpen(false);
 onOpenDocModal?.();
 }}
 className="flex items-center gap-2 min-h-11 text-slate-600 font-medium text-sm text-left cursor-pointer"
 >
 <FileText className="w-4 h-4 text-slate-500" />
 Documentation
 </button>
 </div>
 )}
 </header>
 );
}
