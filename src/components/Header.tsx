"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ExternalLink,
  Menu,
  PhoneCall,
  X,
  Layers,
  FileText,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPortfolioDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group min-w-0" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center select-none shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/icon-192-transparent.png"
              alt="태문 로고"
              className="w-10 lg:w-12 h-10 lg:h-12 object-contain scale-110 group-hover:scale-115 transition-transform"
            />
          </div>
          <span className="text-lg lg:text-xl font-bold tracking-tight text-white flex items-center -ml-1">
            태문 <span className="text-indigo-400 text-xs lg:text-sm font-semibold tracking-normal ml-1">DEV STUDIO</span>
          </span>
        </Link>

        {/* Desktop Navigation (lg:flex) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-300">
          <a href="/#services" className="hover:text-white transition-colors">
            서비스 분야
          </a>

          {/* Direct Link to Portfolio Archive */}
          <Link
            href="/portfolio"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>포트폴리오</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
              NEW
            </span>
          </Link>

          {/* Unified Portfolio & Solutions Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPortfolioDropdownOpen(!portfolioDropdownOpen)}
              className="flex items-center gap-1.5 py-2 hover:text-white transition-colors font-medium text-gray-300 focus:outline-none"
            >
              <span>솔루션 & 라이브 데모</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${portfolioDropdownOpen ? "rotate-180 text-indigo-400" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {portfolioDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 p-2 rounded-2xl bg-gray-900/95 border border-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-950/50 z-50 animate-in fade-in zoom-in-95 duration-150">
                
                {/* Atelier Vaucluse Demo (NEW) */}
                <Link
                  href="/demo/atelier-vaucluse"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>아뜰리에 보클루즈</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-extrabold">NEW DEMO</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                      하이엔드 건축·인테리어 스튜디오 실물 사이트
                    </p>
                  </div>
                </Link>

                {/* Lithium Demo */}
                <Link
                  href="/demo/lithium-foil"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 group-hover:scale-105 transition-transform">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>공정 데이터 모니터링</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold">LIVE</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                      리튬박 제조 KPI·수율·관리도 플랫폼
                    </p>
                  </div>
                </Link>

                {/* T-DOCS */}
                <a
                  href="https://tdocs.kr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>T-DOCS (티독스)</span>
                      <ExternalLink className="w-3 h-3 text-purple-400" />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                      카톡 10초 전자서명 & 300종 스마트 서식 SaaS
                    </p>
                  </div>
                </a>

                {/* Taemun Bridge */}
                <a
                  href="https://taemun.co.kr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 group-hover:scale-105 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>태문브릿지</span>
                      <ExternalLink className="w-3 h-3 text-cyan-400" />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                      건축·설비 엔지니어링 매칭 B2B 플랫폼
                    </p>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Quick Inquiry Link */}
          <Link
            href="/inquiry"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 border border-indigo-500/50 text-white font-bold text-xs hover:border-indigo-400 hover:scale-105 transition-all backdrop-blur-md shadow-md shadow-indigo-500/20"
          >
            <span>외주 / 견적 문의</span>
          </Link>
        </nav>

        {/* Right CTAs (Phone & Mobile Toggle) */}
        <div className="flex items-center gap-2 lg:gap-3">
          
          {/* Direct Phone Call Button */}
          <a
            href="tel:010-8672-6463"
            className="flex items-center gap-1.5 px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-white text-xs font-bold border border-indigo-500/40 backdrop-blur-md transition-all shadow-sm shadow-indigo-500/20"
          >
            <PhoneCall className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="hidden sm:inline">010-8672-6463 (총괄 직통)</span>
            <span className="sm:hidden">직통 전화</span>
          </a>

          {/* Mobile Hamburger Button (lg:hidden) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="모바일 메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (lg:hidden) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-gray-950/95 backdrop-blur-2xl z-50 p-6 overflow-y-auto border-t border-white/10 animate-in slide-in-from-top duration-200">
          <div className="max-w-md mx-auto space-y-6">
            
            {/* Primary Nav Links */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <a
                href="/#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-bold text-white hover:text-indigo-300 transition-colors py-1"
              >
                서비스 분야
              </a>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-lg font-bold text-white hover:text-indigo-300 transition-colors py-1"
              >
                <span>포트폴리오 갤러리</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  전체보기
                </span>
              </Link>
            </div>

            {/* Operating Solutions Section */}
            <div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">
                직영 운영 솔루션 & 라이브 데모
              </div>
              <div className="space-y-2">
                <Link
                  href="/demo/atelier-vaucluse"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>아뜰리에 보클루즈</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold">NEW</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">건축·인테리어 스튜디오 실물 데모</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </Link>

                <Link
                  href="/demo/lithium-foil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>공정 데이터 데모</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">LIVE</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">리튬박 제조 KPI·수율 대시보드</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </Link>

                <a
                  href="https://tdocs.kr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1">
                        <span>T-DOCS (티독스)</span>
                        <ExternalLink className="w-3 h-3 text-purple-400" />
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">카톡 10초 전자서명 SaaS</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </a>

                <a
                  href="https://taemun.co.kr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1">
                        <span>태문브릿지</span>
                        <ExternalLink className="w-3 h-3 text-cyan-400" />
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">건축·설비 엔지니어링 매칭 플랫폼</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </a>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-4 space-y-3">
              <Link
                href="/inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                <Sparkles className="w-4 h-4" />
                <span>프로젝트 무료 견적 문의하기</span>
              </Link>

              <a
                href="tel:010-8672-6463"
                className="w-full py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-indigo-400" />
                <span>총괄 아키텍트 직통 연결 (010-8672-6463)</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
