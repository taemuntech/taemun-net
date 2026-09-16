"use client";

import React, { useState } from "react";
import { Language, ProductSpec } from "./types";
import { PRODUCTS } from "./data/hysfaData";
import { Layers, CheckCircle2, Cpu } from "lucide-react";

interface Props {
  lang: Language;
  onSelectProduct: (product: ProductSpec) => void;
}

export default function HysfaProducts({ lang, onSelectProduct }: Props) {
  const [activeTab, setActiveTab] = useState<string>(PRODUCTS[0].id);

  const currentProduct = PRODUCTS.find((p) => p.id === activeTab) || PRODUCTS[0];

  return (
    <section id="products" className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>CORE BUSINESS DIVISIONS</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-black tracking-tight text-white">
            {lang === "ko" ? "한양시스템 3대 핵심 사업 영역" : "Three Core Business Divisions"}
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 mt-2 font-light">
            {lang === "ko"
              ? "반도체 세정 장비부터 특수가스 안전 공급 설비, 공장 전체를 관제하는 4K 소프트웨어까지 독자적인 엔지니어링 풀-스택(Full-Stack)을 제공합니다."
              : "End-to-end semiconductor automation stack spanning wet cleaning, ultra-pure gas delivery, and 4K industrial SCADA software."}
          </p>
        </div>

        {/* 3 Division Selector Tabs */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {PRODUCTS.map((prod) => {
            const isActive = prod.id === activeTab;
            return (
              <button
                key={prod.id}
                onClick={() => setActiveTab(prod.id)}
                className={`flex-1 p-4 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                  isActive
                    ? "bg-slate-900 border-cyan-500/70 shadow-[0_0_25px_rgba(6,182,212,0.2)]"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
                )}
                <div className="text-[11px] font-mono uppercase tracking-wider font-bold text-cyan-400">
                  {prod.category.toUpperCase()} DIVISION
                </div>
                <div className="text-sm lg:text-base font-bold text-white mt-1">
                  {lang === "ko" ? prod.titleKo : prod.titleEn}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Product Deep-Dive Showcase */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 lg:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Product Image & Blueprint Overlay */}
            <div className="lg:col-span-5 relative group">
              <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative aspect-[4/3] flex items-center justify-center">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.titleKo}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-slate-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 backdrop-blur-sm">
                  HYSFA CERTIFIED TOOL
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>{lang === "ko" ? "* 실물 장비 및 시스템 도면" : "* Actual System Blueprint"}</span>
                <span className="font-mono text-cyan-400">CLASS 10 FAB APPROVED</span>
              </div>
            </div>

            {/* Right: Technical Specs & Features */}
            <div className="lg:col-span-7">
              <div className="inline-block px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-2">
                {lang === "ko" ? currentProduct.subtitleKo : currentProduct.subtitleEn}
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-4">
                {lang === "ko" ? currentProduct.titleKo : currentProduct.titleEn}
              </h3>
              <p className="text-xs lg:text-sm text-slate-300 font-light leading-relaxed mb-6">
                {lang === "ko" ? currentProduct.descriptionKo : currentProduct.descriptionEn}
              </p>

              {/* Bullet Features */}
              <div className="space-y-2 mb-6">
                {(lang === "ko" ? currentProduct.featuresKo : currentProduct.featuresEn).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs lg:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Spec Metrics Table */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono mb-6">
                {currentProduct.specs.map((sp, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">{lang === "ko" ? sp.labelKo : sp.labelEn}</div>
                    <div className="text-xs font-bold text-cyan-300 mt-0.5 truncate font-sans">
                      {lang === "ko" ? sp.valueKo : sp.valueEn}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectProduct(currentProduct)}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-tight shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4" />
                  <span>{lang === "ko" ? "본 장비 기술 사양서 견적 요청" : "Request Tool Specifications"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
