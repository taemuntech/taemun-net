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
  Compass,
  Send,
  Cpu,
  Globe,
  Landmark,
  Crown,
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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 lg:gap-3 group min-w-0" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-9 lg:w-10 h-9 lg:h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-zinc-800 transition-all">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              {/* Minimalist Architectural T-Gate Mark */}
              <path
                d="M4 6.5H20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M12 6.5V18.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="18.5" cy="18" r="2" fill="#d97706" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-base lg:text-lg font-extrabold tracking-tight text-zinc-950 leading-none group-hover:text-black transition-colors">
                태문
              </span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                DEV STUDIO
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono mt-0.5">
              Bespoke Digital Gallery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (lg:flex) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-zinc-600">
          <a href="#gallery" className="hover:text-zinc-950 transition-colors py-1">
            갤러리 아카이브
          </a>

          <a href="#capabilities" className="hover:text-zinc-950 transition-colors py-1">
            전문 영역
          </a>

          <a href="#process" className="hover:text-zinc-950 transition-colors py-1">
            직영 프로세스
          </a>

          {/* Unified Portfolio & Solutions Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPortfolioDropdownOpen(!portfolioDropdownOpen)}
              className="flex items-center gap-1.5 py-2 hover:text-zinc-950 transition-colors font-semibold text-zinc-600 focus:outline-none cursor-pointer"
            >
              <span>라이브 데모 &amp; 솔루션</span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${portfolioDropdownOpen ? "rotate-180 text-zinc-800" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {portfolioDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 p-2 rounded-2xl bg-white border border-zinc-200 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
                
                {/* Nexus Robotics Demo */}
                <Link
                  href="/demo/nexus-robotics"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/60 transition-all group border border-transparent hover:border-blue-200"
                >
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-800 border border-blue-200 shrink-0 group-hover:scale-105 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                      <span>넥서스 로보틱스</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-extrabold">NEW</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                      반도체 클린룸 자율주행 AMR &amp; 디지털 트윈
                    </p>
                  </div>
                </Link>

                {/* Wonik QnC Demo */}
                <Link
                  href="/demo/wonik-qnc"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/60 transition-all group border border-transparent hover:border-blue-200"
                >
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-800 border border-blue-200 shrink-0 group-hover:scale-105 transition-transform">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                      <span>원익큐앤씨 (WONIK QnC)</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-extrabold">GLOBAL 1위</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                      반도체 쿼츠웨어 &amp; 정밀 세라믹 코스닥 상장사
                    </p>
                  </div>
                </Link>

                {/* Atelier Vaucluse Demo */}
                <Link
                  href="/demo/atelier-vaucluse"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-amber-50/60 transition-all group border border-transparent hover:border-amber-200"
                >
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-800 border border-amber-200 shrink-0 group-hover:scale-105 transition-transform">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                      <span>아뜰리에 보클루즈</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 font-extrabold">DEMO</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                      하이엔드 건축·인테리어 스튜디오 실물 사이트
                    </p>
                  </div>
                </Link>

                {/* HAUS & SPACE Demo */}
                <Link
                  href="/demo/haus-space"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-stone-100 transition-all group border border-transparent hover:border-stone-300"
                >
                  <div className="p-2 rounded-lg bg-stone-900 text-amber-300 border border-stone-800 shrink-0 group-hover:scale-105 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                      <span>HAUS &amp; SPACE</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 font-extrabold">펜트하우스</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                      한남 더 힐 105평 B&amp;A 슬라이더 &amp; 360 VR 데모
                    </p>
                  </div>
                </Link>

                {/* Sodamjae Hanok Architecture Demo */}
                <Link
                  href="/demo/sodamjae"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-stone-100 transition-all group border border-transparent hover:border-stone-300"
                >
                  <div className="p-2 rounded-lg bg-stone-200 text-stone-800 border border-stone-300 shrink-0 group-hover:scale-105 transition-transform">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                      <span>소담재 건축공방</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-stone-200 text-stone-800 font-extrabold">한옥 명가</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                      전통 결구 &amp; 현대식 패시브 주거 한옥
                    </p>
                  </div>
                </Link>

                {/* Maison d'Antique Demo */}
                <Link
                  href="/demo/maison"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-rose-50/60 transition-all group border border-transparent hover:border-rose-200"
                >
                  <div className="p-2 rounded-lg bg-rose-100 text-rose-800 border border-rose-200 shrink-0 group-hover:scale-105 transition-transform">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                      <span>메종 당티크 (Maison)</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 font-extrabold">D2C 살롱</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                      유러피안 오리지널 앤틱 &amp; 프라이빗 살롱
                    </p>
                  </div>
                </Link>

                {/* Hanyang System Demo */}
                <Link
                  href="/demo/hysfa"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-cyan-50/60 transition-all group border border-transparent hover:border-cyan-200"
                >
                  <div className="p-2 rounded-lg bg-cyan-100 text-cyan-800 border border-cyan-200 shrink-0 group-hover:scale-105 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                      <span>한양시스템 (SEMES SSQ)</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-100 text-cyan-800 font-extrabold">SEMES 협력사</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                      반도체 FA 장비 &amp; 초고순도 가스 시스템
                    </p>
                  </div>
                </Link>

                {/* Lithium Demo */}
                <Link
                  href="/demo/lithium-foil"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50/60 transition-all group border border-transparent hover:border-emerald-200"
                >
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0 group-hover:scale-105 transition-transform">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                      <span>공정 데이터 모니터링</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">LIVE</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
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
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-purple-50/60 transition-all group border border-transparent hover:border-purple-200"
                >
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-800 border border-purple-200 shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1">
                      <span>T-DOCS (티독스)</span>
                      <ExternalLink className="w-3 h-3 text-purple-600" />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                      카톡 10초 전자서명 &amp; 300종 스마트 서식 SaaS
                    </p>
                  </div>
                </a>

                {/* Taemun Bridge */}
                <a
                  href="https://taemun.co.kr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/60 transition-all group border border-transparent hover:border-blue-200"
                >
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-800 border border-blue-200 shrink-0 group-hover:scale-105 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1">
                      <span>태문브릿지</span>
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                      건축·설비 엔지니어링 매칭 B2B 플랫폼
                    </p>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Direct Inquiry Link */}
          <Link
            href="/inquiry"
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-black text-white font-bold text-xs transition-all shadow-sm"
          >
            <span>프로젝트 견적 의뢰</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Button (lg:hidden) */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200 transition-colors focus:outline-none"
            aria-label="모바일 메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (lg:hidden) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white/98 backdrop-blur-2xl z-50 p-6 overflow-y-auto border-t border-zinc-200 animate-in slide-in-from-top duration-200">
          <div className="max-w-md mx-auto space-y-6">
            
            {/* Primary Nav Links */}
            <div className="space-y-3 pb-6 border-b border-zinc-200">
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-bold text-zinc-900 hover:text-amber-700 transition-colors py-1"
              >
                갤러리 아카이브
              </a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-bold text-zinc-900 hover:text-amber-700 transition-colors py-1"
              >
                전문 영역 (Capabilities)
              </a>
              <a
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-bold text-zinc-900 hover:text-amber-700 transition-colors py-1"
              >
                직영 프로세스 (Process)
              </a>
            </div>

            {/* Operating Solutions Section */}
            <div>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                직영 운영 솔루션 &amp; 라이브 데모
              </div>
              <div className="space-y-2">
                <Link
                  href="/demo/nexus-robotics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-blue-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-blue-700" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                        <span>넥서스 로보틱스</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-bold">NEW</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">반도체 클린룸 자율주행 AMR &amp; 디지털 트윈</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>

                <Link
                  href="/demo/wonik-qnc"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-blue-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-700" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                        <span>원익큐앤씨 (WONIK QnC)</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-bold">GLOBAL 1위</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">반도체 쿼츠웨어 &amp; KOSDAQ IR 데모</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>

                <Link
                  href="/demo/atelier-vaucluse"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-amber-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Compass className="w-5 h-5 text-amber-700" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                        <span>아뜰리에 보클루즈</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 font-bold">DEMO</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">건축·인테리어 스튜디오 실물 데모</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>

                <Link
                  href="/demo/haus-space"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-stone-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-amber-700" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                        <span>HAUS &amp; SPACE</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 font-bold">펜트하우스</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">한남 더 힐 105평 B&amp;A 슬라이더 &amp; VR 데모</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>

                <Link
                  href="/demo/sodamjae"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-stone-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Landmark className="w-5 h-5 text-stone-700" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                        <span>소담재 건축공방</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-stone-200 text-stone-800 font-bold">한옥 명가</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">전통 결구 &amp; 패시브 주거 한옥 데모</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>

                <Link
                  href="/demo/maison"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-rose-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-rose-800" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                        <span>메종 당티크 (Maison)</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 font-bold">D2C 살롱</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">유러피안 앤틱 가구 &amp; 프라이빗 살롱 데모</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>

                <Link
                  href="/demo/hysfa"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-cyan-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-cyan-700" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                        <span>한양시스템 (SEMES SSQ)</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-100 text-cyan-800 font-bold">SEMES 협력사</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">반도체 FA 장비 &amp; 가스 시스템 데모</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>

                <Link
                  href="/demo/lithium-foil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-emerald-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-emerald-700" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                        <span>공정 데이터 데모</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">LIVE</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">리튬박 제조 KPI·수율 대시보드</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>

                <a
                  href="https://tdocs.kr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-purple-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-700" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1">
                        <span>T-DOCS (티독스)</span>
                        <ExternalLink className="w-3 h-3 text-purple-600" />
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">카톡 10초 전자서명 SaaS</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </a>

                <a
                  href="https://taemun.co.kr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-blue-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-blue-700" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1">
                        <span>태문브릿지</span>
                        <ExternalLink className="w-3 h-3 text-blue-600" />
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">건축·설비 엔지니어링 매칭 플랫폼</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </a>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-4 space-y-3">
              <Link
                href="/inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-2xl bg-zinc-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-black"
              >
                <Send className="w-4 h-4" />
                <span>프로젝트 무료 맞춤 견적 문의하기</span>
              </Link>

              <a
                href="tel:010-8672-6463"
                className="w-full py-3.5 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-900 font-bold text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-zinc-700" />
                <span>총괄 아키텍트 직통 연결</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
