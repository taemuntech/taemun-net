"use client";

import React from "react";
import { Language } from "./types";
import { HYSFA_INFO } from "./data/hysfaData";
import { ShieldCheck, ArrowUp } from "lucide-react";

interface Props {
  lang: Language;
}

export default function HysfaFooter({ lang }: Props) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-900">
          {/* Company Identity */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-9 px-2 py-1 rounded bg-white flex items-center justify-center border border-slate-700">
                <img src="/hysfa/logo.png" alt="한양시스템" className="h-6 w-auto object-contain" />
              </div>
              <span className="text-base font-black text-white">{HYSFA_INFO.nameKo}</span>
            </div>
            <p className="text-slate-400 font-light text-xs leading-relaxed max-w-sm">
              {lang === "ko"
                ? "1999년 설립 이래 반도체 매엽식 세정 설비, 고순도 특수가스 공급 캐비닛 및 4K 초고화질 SCADA 관제 시스템을 선도하는 반도체 자동화 전문 강소기업입니다."
                : "Pioneering single wafer wet cleaning, high-purity gas delivery systems, and 4K ultra-HD SCADA software for semiconductor fabs since 1999."}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{HYSFA_INFO.semesBadge}</span>
            </div>
          </div>

          {/* Quick Business Info */}
          <div className="lg:col-span-4 space-y-2 font-mono text-[11px]">
            <div className="text-slate-200 font-bold font-sans text-xs uppercase mb-1">COMPANY INFO</div>
            <div>대표이사: {HYSFA_INFO.ceoKo} (Tae-Hoon Kim)</div>
            <div>사업자등록번호: {HYSFA_INFO.bizNumber}</div>
            <div>설립연월: {HYSFA_INFO.establishedYear}년 10월 (업력 27년차)</div>
            <div>본사: {HYSFA_INFO.addressKo}</div>
            <div className="pt-1 flex items-center gap-4 text-slate-300">
              <span>TEL: {HYSFA_INFO.tel}</span>
              <span>FAX: {HYSFA_INFO.fax}</span>
            </div>
          </div>

          {/* Standards & Certifications */}
          <div className="lg:col-span-3 space-y-2 font-mono text-[11px]">
            <div className="text-slate-200 font-bold font-sans text-xs uppercase mb-1">CERTIFICATIONS</div>
            <div className="text-cyan-400">• SEMES SSQ Quality Certified</div>
            <div>• INNO-BIZ Grade A Innovation</div>
            <div>• ISO 9001:2015 / ISO 14001:2015</div>
            <div>• FREENET Patent & DeviceNet CE</div>
            <div>• Youth-Friendly Champion (5 Yrs)</div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div>
            © 1999-{new Date().getFullYear()} {HYSFA_INFO.nameKo}. All rights reserved. | Powered by TAEMUN DEV STUDIO
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>맨 위로 이동</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
