"use client";

import React, { useState } from "react";
import { Language } from "./types";
import { HYSFA_INFO } from "./data/hysfaData";
import { ShieldCheck, Phone, Globe, Cpu, Menu, X, ChevronRight } from "lucide-react";

interface Props {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenRfq: () => void;
}

export default function HysfaHeader({ lang, setLang, onOpenRfq }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", labelKo: "회사소개", labelEn: "About" },
    { href: "#products", labelKo: "3대 핵심장비", labelEn: "Divisions" },
    { href: "#scada-simulator", labelKo: "4K SCADA 시연", labelEn: "4K SCADA Live" },
    { href: "#certifications", labelKo: "품질인증 (SSQ)", labelEn: "Quality & SSQ" },
    { href: "#facility", labelKo: "사옥·클린룸", labelEn: "Facility" },
    { href: "#contact", labelKo: "견적·도입문의", labelEn: "Contact" },
  ];

  const handleScroll = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/20 text-slate-100">
      {/* Top Telemetry & Certification Bar */}
      <div className="w-full bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-semibold tracking-tight">
                {lang === "ko" ? "FAB 1/2 관제망 정상 가동 (NORMAL)" : "FAB 1/2 SCADA Online (0.00 ppm)"}
              </span>
            </div>
            <span className="hidden lg:inline text-slate-600">|</span>
            <div className="hidden lg:flex items-center gap-1 text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === "ko" ? "삼성전자 세메스(SEMES) SSQ 품질인증 공식 협력사" : "SEMES SSQ Certified Equipment Partner"}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="tel:031-434-7300" className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>031-434-7300</span>
            </a>
            <span className="text-slate-700">|</span>
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "ko" ? "en" : "ko")}
              className="flex items-center gap-1 font-bold text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer"
              title="Toggle Language"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === "ko" ? "ENG" : "KOR"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleScroll("#hero")}>
          <div className="h-10 px-2 py-1 rounded bg-white/95 flex items-center justify-center border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <img src="/hysfa/logo.png" alt="한양시스템 로고" className="h-7 w-auto object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white font-sans">
                {HYSFA_INFO.nameKo}
              </span>
              <span className="hidden lg:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                SSQ Partner
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
              {HYSFA_INFO.sloganKo} · SINCE 1999
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleScroll(link.href)}
              className="hover:text-cyan-400 transition-colors py-1 relative group tracking-tight cursor-pointer"
            >
              {lang === "ko" ? link.labelKo : link.labelEn}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenRfq}
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-tight shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{lang === "ko" ? "장비 도입 기술 견적" : "Request RFQ Spec"}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 px-4 py-4 space-y-3">
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-cyan-500/20 text-xs text-cyan-300 flex items-center justify-between mb-2">
            <span>{HYSFA_INFO.semesBadge}</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleScroll(link.href)}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 hover:text-cyan-300 text-left border border-transparent hover:border-slate-800 cursor-pointer"
            >
              <span>{lang === "ko" ? link.labelKo : link.labelEn}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm tracking-tight flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>{lang === "ko" ? "장비 도입 기술 견적 문의" : "Request RFQ Spec"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
