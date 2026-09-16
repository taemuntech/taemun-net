"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import ParticleCanvas from "@/components/ParticleCanvas";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  PortfolioCategory,
} from "@/lib/portfolio/data";
import {
  ExternalLink,
  Play,
  CheckCircle2,
  ArrowRight,
  Layers,
  Clock,
} from "lucide-react";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");

  const filteredItems =
    activeCategory === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <main className="relative min-h-screen bg-[#030712] text-gray-100 selection:bg-indigo-500/30">
      {/* Dynamic Background Effect */}
      <ParticleCanvas />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-2/3 right-10 w-[500px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <Header />

      <div className="relative z-10 pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium tracking-wide mb-6">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>TAEMUN DEV STUDIO PORTFOLIO ARCHIVE</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            산업의 본질을 담아내는
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
              고성능 웹 & 플랫폼 포트폴리오
            </span>
          </h1>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            건축·인테리어부터 제조·소재공정, 전자서약 SaaS, B2B 매칭 플랫폼까지.
            <br className="hidden lg:block" />
            태문 개발팀이 직접 기획·디자인·설계하고 실제 런칭한 프로덕션 레벨 프로젝트들을 만나보세요.
          </p>

          {/* Agency Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/5">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl lg:text-3xl font-bold text-white">100%</div>
              <div className="text-xs text-gray-400 mt-1">프로덕션 가동률</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl lg:text-3xl font-bold text-indigo-400">2~4주</div>
              <div className="text-xs text-gray-400 mt-1">평균 런칭 소요 기간</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl lg:text-3xl font-bold text-purple-400">300+</div>
              <div className="text-xs text-gray-400 mt-1">보유 서식 & 템플릿</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl lg:text-3xl font-bold text-emerald-400">308+</div>
              <div className="text-xs text-gray-400 mt-1">B2B 산업 타겟 분석</div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500"
                    : "bg-white/[0.03] text-gray-400 hover:text-gray-200 hover:bg-white/[0.07] border border-white/5"
                }`}
              >
                <span>{cat.label}</span>
                {cat.count > 0 && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl bg-gray-900/60 border border-white/10 hover:border-indigo-500/40 p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 backdrop-blur-md overflow-hidden"
            >
              {/* Subtle Ambient Accent */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: item.accentColor }}
              />

              <div>
                {/* Top Badge & Metadata */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      color: item.accentColor,
                      borderColor: item.accentColor + "44",
                      backgroundColor: item.accentColor + "15",
                    }}
                  >
                    {item.categoryLabel}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.period} 구축
                    </span>
                    <span>•</span>
                    <span className="text-gray-400 font-medium">{item.client}</span>
                  </div>
                </div>

                {/* Title & Summary */}
                <h2 className="text-xl lg:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-3 leading-snug">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>

                {/* Highlights Bullet List */}
                <div className="space-y-2 mb-6 p-4 rounded-2xl bg-black/20 border border-white/5">
                  <div className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 mb-2.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>핵심 구현 기술 & 특장점</span>
                  </div>
                  {item.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-gray-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="pt-4 border-t border-white/5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                {item.liveDemoUrl ? (
                  <Link
                    href={item.liveDemoUrl}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-900/30 transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>라이브 데모 직접 체험하기</span>
                  </Link>
                ) : item.externalUrl ? (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-900/30 transition-all"
                  >
                    <span>실제 운영 서비스 방문</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : null}

                <Link
                  href="/inquiry"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-gray-300 hover:text-white text-sm font-medium border border-white/10 transition-all"
                >
                  <span>이런 프로젝트 문의하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation CTA */}
        <div className="mt-20 p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-gray-900 to-purple-950/30 border border-indigo-500/20 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-4">
              귀사의 비즈니스에 최적화된 웹 솔루션,
              <br className="hidden lg:block" />
              지금 바로 태문 개발팀과 함께 만드세요.
            </h3>
            <p className="text-sm lg:text-base text-gray-400 mb-8 max-w-xl mx-auto">
              기획안이 없어도 괜찮습니다. 업종과 목표만 말씀해 주시면,
              <br className="hidden lg:block" />
              총괄 아키텍트가 1:1로 최적의 기술 스택과 프로덕션 견적을 무료로 제안해 드립니다.
            </p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <Link
                href="/inquiry"
                className="w-full lg:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>무료 프로젝트 견적 & 기획 상담 신청</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:010-8672-6463"
                className="w-full lg:w-auto px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 font-semibold text-sm border border-white/10 transition-all"
              >
                총괄 직통 전화 (010-8672-6463)
              </a>
            </div>
          </div>
        </div>
      </div>

      <FloatingChatWidget />
    </main>
  );
}
