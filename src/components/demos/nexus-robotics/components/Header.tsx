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
 <div className="flex justify-between items-center w-full px-6 lg:px-12 h-16 max-w-[1600px] mx-auto">
 {/* Brand Logo */}
 <a href="#" className="flex items-center gap-3 group">
 <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white relative shadow-sm">
 <Cpu className="w-4 h-4 text-white" />
 <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white animate-cleanroom-pulse" />
 </div>
 <div className="flex flex-col">
 <span className="text-sm tracking-tight text-slate-900 font-bold uppercase">
 NEXUS ROBOTICS
 </span>
 <span className="text-[10px] font-mono text-blue-700 tracking-widest uppercase font-semibold">
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
 href="#standards"
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
 <div className="flex items-center gap-3">
 <button
 type="button"
 onClick={onOpenDocModal}
 className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
 >
 <FileText className="w-3.5 h-3.5 text-slate-500" />
 Documentation
 </button>
 <a
 href="#consultation-wizard"
 className="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 text-xs font-semibold transition-colors shadow-sm"
 >
 <span>도입 ROI 맞춤 상담</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </a>

 {/* Mobile menu toggle */}
 <button
 type="button"
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="p-1.5 rounded lg:hidden text-slate-600 hover:bg-slate-100"
 aria-label="Toggle menu"
 >
 {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
 </button>
 </div>
 </div>

 {/* Mobile Drawer */}
 {mobileMenuOpen && (
 <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-4 flex flex-col gap-3 shadow-lg">
 <a
 href="#solutions"
 onClick={() => setMobileMenuOpen(false)}
 className="text-blue-600 font-semibold text-sm py-1"
 >
 Fleet Lineup
 </a>
 <a
 href="#nexus-os"
 onClick={() => setMobileMenuOpen(false)}
 className="text-slate-600 font-medium text-sm py-1"
 >
 NEXUS-OS
 </a>
 <a
 href="#standards"
 onClick={() => setMobileMenuOpen(false)}
 className="text-slate-600 font-medium text-sm py-1"
 >
 Cleanroom Standards
 </a>
 <a
 href="#roi-matrix"
 onClick={() => setMobileMenuOpen(false)}
 className="text-slate-600 font-medium text-sm py-1"
 >
 ROI Matrix
 </a>
 <a
 href="#references"
 onClick={() => setMobileMenuOpen(false)}
 className="text-slate-600 font-medium text-sm py-1"
 >
 Enterprise Specs
 </a>
 <button
 type="button"
 onClick={() => {
 setMobileMenuOpen(false);
 onOpenDocModal?.();
 }}
 className="flex items-center gap-2 text-slate-600 font-medium text-sm py-1 text-left"
 >
 <FileText className="w-4 h-4 text-slate-500" />
 Documentation
 </button>
 </div>
 )}
 </header>
 );
}
