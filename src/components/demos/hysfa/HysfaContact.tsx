"use client";

import React, { useState } from "react";
import { Language, ProductSpec } from "./types";
import { Send, CheckCircle2, Cpu } from "lucide-react";

interface Props {
  lang: Language;
  selectedProduct?: ProductSpec | null;
}

export default function HysfaContact({ lang, selectedProduct }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    company: string;
    email: string;
    phone: string;
    division: string;
    message: string;
  }>({
    name: "",
    company: "",
    email: "",
    phone: "",
    division: selectedProduct?.category || "cleaning",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800 text-slate-100">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNICAL RFQ & CONSULTATION</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-black tracking-tight text-white">
            {lang === "ko" ? "장비 도입 기술 사양 및 견적 문의" : "Request Equipment Specifications & RFQ"}
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 mt-2 font-light max-w-2xl mx-auto">
            {lang === "ko"
              ? "반도체 세정 장비, 가스 캐비닛/VMB 분배기, 4K SCADA 소프트웨어의 도입 사양 및 견적 상담을 요청하시면 전문 엔지니어가 24시간 이내에 회신드립니다."
              : "Submit your technical specifications or RFQ. Our semiconductor engineering team will review requirements and respond within 24 hours."}
          </p>
        </div>

        {/* Contact Form Box */}
        <div className="p-6 lg:p-10 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="inline-flex p-3 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === "ko" ? "기술 견적 문의가 정상 접수되었습니다" : "Inquiry Successfully Received"}
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto font-light">
                {lang === "ko"
                  ? "한양시스템 기술영업팀에서 기재해 주신 연락처로 기술 사양서 및 견적서를 검토 후 신속히 안내해 드리겠습니다."
                  : "Our technical sales team will review your specifications and contact you shortly."}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                {lang === "ko" ? "새로운 문의 작성" : "Submit Another Inquiry"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                    {lang === "ko" ? "성함 / 직함 *" : "Name / Title *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === "ko" ? "예: 홍길동 팀장" : "e.g. John Doe, Senior Engineer"}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                    {lang === "ko" ? "회사명 / 소속 *" : "Company Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={lang === "ko" ? "예: 삼성전자 협력사 / 반도체 팹" : "e.g. Fab Engineering Co."}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                    {lang === "ko" ? "이메일 *" : "Business Email *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="engineer@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                    {lang === "ko" ? "연락처 *" : "Phone Number *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010-0000-0000"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                  {lang === "ko" ? "관심 설비 / 사업 분야" : "Target Equipment Division"}
                </label>
                <select
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                >
                  <option value="cleaning">
                    {lang === "ko" ? "반도체 매엽식 세정 설비 (Single Wafer Wet Cleaning & CDS)" : "Single Wafer Wet Cleaning"}
                  </option>
                  <option value="gas">
                    {lang === "ko" ? "특수가스 공급 캐비닛 (Gas Keeper) & VMB 분배기" : "Gas Keeper & VMB Systems"}
                  </option>
                  <option value="scada">
                    {lang === "ko" ? "스마트 4K SCADA 통합 관제 소프트웨어 (PGMS · GDMS · LSS)" : "4K Smart SCADA Suite (PGMS)"}
                  </option>
                  <option value="other">{lang === "ko" ? "기타 공정 개조 및 유지보수 상담" : "Maintenance & Other"}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                  {lang === "ko" ? "기술 문의 내용 / 요구 사양" : "Technical Requirements / RFQ Message"}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    lang === "ko"
                      ? "웨이퍼 인치(8인치/12인치), 사용 가스/약액 종류, 라인 수량 등 요구 사양을 자유롭게 적어주세요."
                      : "Provide details such as wafer size, chemical/gas types, line count, and timeline."
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm tracking-tight shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === "ko" ? "기술 견적 문의 제출하기" : "Submit Technical RFQ"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
