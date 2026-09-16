"use client";

import React, { useState } from "react";
import { Language } from "./types";
import { HYSFA_INFO } from "./data/hysfaData";
import { MapPin, Phone, Printer, Copy, Check, ExternalLink, Building2 } from "lucide-react";

interface Props {
  lang: Language;
}

export default function HysfaFacility({ lang }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(HYSFA_INFO.addressKo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="facility" className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>HEADQUARTERS & MANUFACTURING FACILITY</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-black tracking-tight text-white">
            {lang === "ko" ? "시화MTV 신사옥 및 클린룸 조립동" : "Sihwa MTV Headquarters & Cleanroom"}
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 mt-2 font-light">
            {lang === "ko"
              ? "첨단 반도체 산업의 중심지 시화MTV 첨단산업단지에 위치한 자체 사옥에서 Class 100/1000 청정 조립과 엄격한 전수 검사를 시행합니다."
              : "State-of-the-art corporate facility in Sihwa MTV industrial complex featuring Class 100/1000 assembly bays and 100% helium leak test lines."}
          </p>
        </div>

        {/* Facility Layout Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Facility Photo */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-2">
            <div className="aspect-[16/10] rounded-xl overflow-hidden relative">
              <img
                src="/hysfa/sub105_img01.jpg"
                alt="한양시스템 시화MTV 사옥 전경"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md">
                시화MTV 3사 307호 자가 사옥
              </div>
            </div>
          </div>

          {/* Facility Infrastructure Highlights */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-mono font-bold text-cyan-400 mb-1">01. CLASS 100 / 1000 CLEANROOM</div>
              <h4 className="text-base font-bold text-white font-sans">
                {lang === "ko" ? "고청정 반도체 설비 조립동" : "Ultra-Clean Semiconductor Assembly Bay"}
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                {lang === "ko"
                  ? "미세 파티클 유입을 원천 차단하는 Class 100 클린부스와 Class 1000 청정 조립 라인을 갖추어 고품질 세정 장비와 가스 캐비닛을 제작합니다."
                  : "Equipped with Class 100 micro-booths and Class 1000 clean assembly bays eliminating airborne contaminants during fabrication."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-mono font-bold text-cyan-400 mb-1">02. HELIUM MASS SPECTROMETER</div>
              <h4 className="text-base font-bold text-white font-sans">
                {lang === "ko" ? "자동 헬륨 리크 검사 챔버" : "Automated Helium Leak Inspection Line"}
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                {lang === "ko"
                  ? "1.0 x 10⁻⁹ atm·cc/sec 이하의 극미세 누출까지 감지하는 고감도 헬륨 질량 분석기를 통해 전수 기밀 검사를 통과한 설비만 출하합니다."
                  : "Every weld and fitting undergoes 100% helium mass spectrometer leak testing exceeding 1.0 x 10^-9 atm-cc/sec integrity."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-mono font-bold text-cyan-400 mb-1">03. R&D CENTER & 4K TEST LAB</div>
              <h4 className="text-base font-bold text-white font-sans">
                {lang === "ko" ? "기업부설연구소 & 4K 관제 검증실" : "Corporate R&D Center & 4K SCADA Lab"}
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                {lang === "ko"
                  ? "SECS/GEM 및 OPC-UA 통신 시뮬레이터와 4K 대형 관제월을 통해 현장 설치 전 100% 소프트웨어 검증을 완료합니다."
                  : "Simulating fab communication networks and multi-screen control walls to pre-validate software prior to field commissioning."}
              </p>
            </div>
          </div>
        </div>

        {/* Location & Map Box */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
              <MapPin className="w-4 h-4" />
              <span>LOCATION & ACCESS</span>
            </div>
            <div className="text-lg font-bold text-white">
              {lang === "ko" ? HYSFA_INFO.addressKo : HYSFA_INFO.addressEn}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-cyan-400" /> TEL: {HYSFA_INFO.tel}
              </span>
              <span className="flex items-center gap-1">
                <Printer className="w-3 h-3 text-slate-500" /> FAX: {HYSFA_INFO.fax}
              </span>
              <span>사업자등록번호: {HYSFA_INFO.bizNumber}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (lang === "ko" ? "주소 복사 완료" : "Copied!") : (lang === "ko" ? "주소 복사" : "Copy Address")}</span>
            </button>

            <a
              href="https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%8B%9C%ED%9D%A5%EC%8B%9C%20%EC%8B%9C%ED%99%94%EB%B2%A4%EC%B2%98%EB%A1%9C%20331"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{lang === "ko" ? "네이버 지도 길찾기" : "Open Naver Map"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
