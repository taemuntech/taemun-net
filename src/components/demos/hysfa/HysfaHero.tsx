"use client";

import React from "react";
import { Language } from "./types";
import { HYSFA_INFO } from "./data/hysfaData";
import { ShieldCheck, Cpu, Activity, ArrowRight, Layers } from "lucide-react";

interface Props {
  lang: Language;
  onOpenRfq: () => void;
}

export default function HysfaHero({ lang, onOpenRfq }: Props) {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const kpis = [
    {
      value: "520+",
      labelKo: "공정 설비 누적 납품",
      labelEn: "Fab Tools Delivered",
      subKo: "국내외 주요 팹 가동 중",
      subEn: "Global semiconductor fabs",
    },
    {
      value: "0.00 ppm",
      labelKo: "특수가스 누출 제로",
      labelEn: "Zero Gas Leak Standard",
      subKo: "무재해 안전 인터록 기준",
      subEn: "Fail-safe LSS interlock",
    },
    {
      value: "Class 10",
      labelKo: "클린룸 공정 대응",
      labelEn: "Cleanroom Standard",
      subKo: "ISO Class 4 청정도 만족",
      subEn: "ISO Class 4 compliant",
    },
    {
      value: "27 Years",
      labelKo: "무중단 기술 혁신",
      labelEn: "Years of Engineering",
      subKo: "1999년 설립 이래 축적",
      subEn: "Founded in Oct 1999",
    },
  ];

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950 py-16 lg:py-24 border-b border-slate-800">
      {/* Background Cybernetic Glow & Circuit Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e1726_1px,transparent_1px),linear-gradient(to_bottom,#0e1726_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 w-full">
        {/* Top SEMES SSQ Partner Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">
              {lang === "ko" ? "삼성전자 세메스(SEMES) SSQ 공식 품질인증 협력사" : "SEMES SSQ Certified Semiconductor Equipment Partner"}
            </span>
            <span className="text-cyan-600">•</span>
            <span className="text-slate-400">SINCE 1999</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl">
          <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] font-sans">
            {lang === "ko" ? (
              <>
                차세대 반도체 공정 설비와 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                  4K 스마트 가스 관제 솔루션
                </span>
              </>
            ) : (
              <>
                Next-Gen Semiconductor Equipment & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                  4K Ultra-HD Smart SCADA Solutions
                </span>
              </>
            )}
          </h1>

          <p className="mt-6 text-sm lg:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
            {lang === "ko"
              ? "웨이퍼 매엽식 세정(Single Wafer Wet Cleaning), 고순도 약액 공급(CDS), 특수가스 캐비닛(Gas Keeper)부터 팹 전체를 4K 초고화질로 통합 관제하는 독자 소프트웨어(PGMS)까지 — 27년간 입증된 대한민국 반도체 자동화 엔지니어링의 표준입니다."
              : "From Single Wafer Wet Cleaning and Chemical Delivery Systems (CDS) to hazardous Gas Keeper cabinets and our proprietary 4K SCADA monitoring suite (PGMS) — delivering 27 years of proven semiconductor automation excellence."}
          </p>
        </div>

        {/* CTA Action Buttons */}
        <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center gap-3.5">
          <button
            onClick={() => scrollTo("#scada-simulator")}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm tracking-tight shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-slate-950" />
            <span>{lang === "ko" ? "4K SCADA 관제 시뮬레이터 실행" : "Launch 4K SCADA Simulator"}</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={() => scrollTo("#products")}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm tracking-tight border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>{lang === "ko" ? "3대 핵심 설비 라인업 보기" : "Explore Equipment Lineup"}</span>
          </button>

          <button
            onClick={onOpenRfq}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 font-bold text-sm tracking-tight border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer"
          >
            <Cpu className="w-4 h-4" />
            <span>{lang === "ko" ? "장비 도입 견적 요청" : "Request Technical RFQ"}</span>
          </button>
        </div>

        {/* 4 KPI HUD Cards */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all backdrop-blur-sm relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-600 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white font-mono tracking-tight">
                {kpi.value}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1 font-sans">
                {lang === "ko" ? kpi.labelKo : kpi.labelEn}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-light">
                {lang === "ko" ? kpi.subKo : kpi.subEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
