"use client";

import React, { useState } from "react";
import { Language } from "./types";
import { CERTIFICATIONS, HISTORY } from "./data/hysfaData";
import { ShieldCheck, Award, Clock } from "lucide-react";

interface Props {
  lang: Language;
}

export default function HysfaCertifications({ lang }: Props) {
  const [historyTab, setHistoryTab] = useState<"all" | "milestone">("all");

  const filteredHistory =
    historyTab === "milestone" ? HISTORY.filter((h) => h.highlight) : HISTORY;

  return (
    <section id="certifications" className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* SEMES SSQ Quality Certification Spotlight Banner */}
        <div className="mb-14 p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-blue-950/70 border-2 border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.2)] relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-400/50 text-cyan-300 text-xs font-mono mb-3">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">SEMES OFFICIAL SSQ CERTIFIED PARTNER</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                {lang === "ko"
                  ? "삼성전자 세메스(SEMES㈜) SSQ 공식 품질인증"
                  : "SEMES Official Standard of Quality (SSQ) Certified"}
              </h3>
              <p className="text-xs lg:text-sm text-slate-300 mt-2 font-light leading-relaxed max-w-2xl">
                {lang === "ko"
                  ? "국내 1위 반도체 장비 제조사 세메스의 까다로운 품질 및 신뢰성 심사를 통과하여 2018년 SSQ 품질 인증을 획득하였습니다. 초정밀 클린룸 조립과 엄격한 품질 보증 체계를 공식 인정받았습니다."
                  : "Certified under the stringent SEMES Standard of Quality (SSQ) since 2018, validating our precision assembly, ultra-high vacuum integrity, and zero-defect QA systems."}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-center font-mono">
              <div className="text-cyan-400 text-2xl font-black tracking-widest">SSQ</div>
              <div className="text-xs text-white font-bold mt-1">SEMES STANDARD OF QUALITY</div>
              <div className="text-[10px] text-slate-400 mt-1">협력사 인증 번호: SSQ-2018-08</div>
              <div className="mt-3 px-3 py-1 rounded bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-500/40">
                100% AUDIT PASS
              </div>
            </div>
          </div>
        </div>

        {/* 4 Other Major Certifications */}
        <div className="mb-14">
          <h4 className="text-lg lg:text-xl font-bold text-white mb-6 font-sans flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>{lang === "ko" ? "정부 및 국제 공인 기술 인증" : "Government & Global Accreditations"}</span>
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.filter((c) => c.id !== "semes-ssq").map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-2">
                    <span className="font-bold">{cert.badge}</span>
                    <span className="text-slate-400">{cert.year}</span>
                  </div>
                  <h5 className="text-sm font-bold text-white mb-2 font-sans">
                    {lang === "ko" ? cert.titleKo : cert.titleEn}
                  </h5>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                    {lang === "ko" ? cert.descriptionKo : cert.descriptionEn}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
                  {lang === "ko" ? cert.issuerKo : cert.issuerEn}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 27-Year History Interactive Timeline */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg lg:text-xl font-bold text-white font-sans flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>{lang === "ko" ? "1999 ~ 현재 : 27년 주요 연혁" : "1999 ~ Present : 27-Year Milestone History"}</span>
            </h4>
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setHistoryTab("all")}
                className={`px-3 py-1 rounded cursor-pointer ${
                  historyTab === "all" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400"
                }`}
              >
                {lang === "ko" ? "전체 연혁" : "All"}
              </button>
              <button
                onClick={() => setHistoryTab("milestone")}
                className={`px-3 py-1 rounded cursor-pointer ${
                  historyTab === "milestone" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400"
                }`}
              >
                {lang === "ko" ? "주요 마일스톤" : "Highlights"}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredHistory.map((h, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs lg:text-sm transition-all ${
                  h.highlight
                    ? "bg-slate-900/90 border-cyan-500/50 text-white font-medium shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    : "bg-slate-950/60 border-slate-800/80 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="font-mono text-cyan-400 font-bold shrink-0">
                    {h.year}.{h.month}
                  </div>
                  <div>{lang === "ko" ? h.titleKo : h.titleEn}</div>
                </div>
                {h.highlight && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold shrink-0">
                    KEY MILESTONE
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
