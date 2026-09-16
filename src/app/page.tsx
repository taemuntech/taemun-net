"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import {
  GALLERY_CATEGORIES,
  GALLERY_PROJECTS,
  GalleryCategoryId,
  GalleryProject,
} from "@/lib/portfolio/galleryData";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Play,
  Layers,
  FileText,
  Activity,
  PhoneCall,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Clock,
  Building2,
  Cpu,
  ShoppingBag,
  Briefcase,
  Monitor,
} from "lucide-react";

export default function Home() {
  // State for category accordion expand/collapse
  const [expandedCategories, setExpandedCategories] = useState<Record<GalleryCategoryId, boolean>>({
    manufacturing: false,
    interior: false,
    architecture: false,
    saas: false,
    commerce: false,
    corporate: false,
  });

  // State for project detail modal
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  const toggleCategory = (categoryId: GalleryCategoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Helper icons for category headers
  const getCategoryIcon = (id: GalleryCategoryId) => {
    switch (id) {
      case "manufacturing":
        return <Cpu className="w-4 h-4 text-emerald-700" />;
      case "interior":
        return <Compass className="w-4 h-4 text-amber-700" />;
      case "architecture":
        return <Building2 className="w-4 h-4 text-stone-700" />;
      case "saas":
        return <Layers className="w-4 h-4 text-indigo-700" />;
      case "commerce":
        return <ShoppingBag className="w-4 h-4 text-rose-700" />;
      case "corporate":
        return <Briefcase className="w-4 h-4 text-blue-700" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white [word-break:keep-all] font-sans">
      {/* Subtle Warm Grid Overlay for Depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Agency Navigation Bar */}
      <Header />

      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL WHITE GALLERY HERO SECTION (2-COLUMN SPLIT)
          ───────────────────────────────────────────────────────────── */}
      <section className="pt-32 lg:pt-40 pb-12 lg:pb-16 px-4 lg:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* 2-Column Grid: Left Text & CTAs, Right Studio Video Theater */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14 lg:mb-20">
          
          {/* Left Column: Editorial Studio Manifesto (lg:col-span-7) */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 lg:px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span className="tracking-wider uppercase text-[11px] lg:text-xs font-mono">
                TAEMUN DEV STUDIO • BESPOKE DIGITAL GALLERY
              </span>
            </div>

            <h1 className="text-3xl lg:text-[52px] font-light tracking-[-0.03em] text-zinc-950 leading-[1.2] lg:leading-[1.12]">
              산업의 본질을 세공하는<br />
              <span className="font-serif italic text-zinc-800 font-normal">디지털 플래그십 아카이브</span>
            </h1>

            <p className="text-zinc-600 text-sm lg:text-base max-w-xl font-light leading-relaxed">
              리튬박 공정 통계 모니터링부터 하이엔드 건축 인테리어, 전자서약 SaaS, B2B 커머스까지.<br className="hidden lg:inline" />
              기획서 속 그림이 아닌 브라우저에서 100% 작동하는 실물 프로덕션 레퍼런스를 둘러보세요.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 pt-2">
              <Link
                href="/inquiry"
                className="px-7 py-3.5 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-xs lg:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>프로젝트 견적 문의하기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:010-8672-6463"
                className="px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-xs lg:text-sm transition-all border border-zinc-200 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-zinc-700" />
                <span>총괄 아키텍트 직통 상담</span>
              </a>
            </div>

            {/* Studio Trust Metrics / Badges */}
            <div className="pt-6 border-t border-zinc-200/80 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>100% 직영 개발</span>
              </div>
              <span className="text-zinc-300">•</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Next.js 16 최신 스택</span>
              </div>
              <span className="text-zinc-300">•</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>엔터프라이즈 레퍼런스</span>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Production Live Reel Video (lg:col-span-5) */}
          <div className="lg:col-span-5 relative group">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 via-zinc-400/10 to-blue-500/10 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-200/90 shadow-2xl transition-all duration-300">
              {/* Top Video HUD Bar */}
              <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-white font-bold uppercase">
                    STUDIO LIVE REEL
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md font-mono text-[9px] text-white tracking-widest font-semibold border border-white/20">
                  PRO-RES 4K
                </span>
              </div>

              {/* Video Element */}
              <div className="aspect-[4/3] lg:aspect-[16/11] relative overflow-hidden bg-black">
                <video
                  src="/videos/taemun-team.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 z-20 p-3.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-left">
                <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                  <span>태문 DEV STUDIO 개발팀 실무 현장</span>
                </div>
                <p className="text-[10px] text-zinc-300 font-light mt-0.5 leading-tight">
                  한국인 총괄 아키텍트 및 시니어 엔지니어링 실무 회의 &amp; 코딩
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 🌟 Quick Category Navigation Pills (Full Width) */}
        <div id="gallery" className="pt-8 border-t border-zinc-200/80">
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {GALLERY_CATEGORIES.map((cat) => {
              const count = GALLERY_PROJECTS.filter((p) => p.category === cat.id).length;
              return (
                <a
                  key={cat.id}
                  href={`#category-${cat.id}`}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-zinc-100/90 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 border border-zinc-200 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span className="font-mono text-[11px] text-zinc-400">{cat.number}</span>
                  <span>{cat.name.split(" · ")[0]}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white text-zinc-600 font-mono border border-zinc-200">
                    {count}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. THE 6-CATEGORY PORTFOLIO GALLERIES (5-COLUMN GRID + ACCORDION)
          ───────────────────────────────────────────────────────────── */}
      <section className="pb-24 lg:pb-36 px-4 lg:px-8 max-w-7xl mx-auto relative z-10 space-y-20 lg:space-y-28">
        {GALLERY_CATEGORIES.map((category) => {
          const allProjects = GALLERY_PROJECTS.filter((p) => p.category === category.id);
          const isExpanded = expandedCategories[category.id];
          // By default, display 5 items on desktop
          const visibleProjects = isExpanded ? allProjects : allProjects.slice(0, 5);
          const hiddenCount = allProjects.length - 5;

          return (
            <div
              key={category.id}
              id={`category-${category.id}`}
              className="scroll-mt-28 pt-4"
            >
              {/* Category Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 lg:mb-8 pb-4 border-b border-zinc-200 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      SECTION {category.number}
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                      {category.engName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-zinc-100 border border-zinc-200">
                      {getCategoryIcon(category.id)}
                    </div>
                    <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-950">
                      {category.name}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-mono border border-zinc-200">
                      총 {allProjects.length}개 작품
                    </span>
                  </div>
                  <p className="text-xs lg:text-sm text-zinc-500 mt-2 max-w-3xl font-light">
                    {category.description}
                  </p>
                </div>

                {/* Right Quick Action: Live Demo Direct Link (for interior/manufacturing) */}
                {category.id === "interior" && (
                  <Link
                    href="/demo/atelier-vaucluse"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all shrink-0 self-start lg:self-end"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>보클루즈 실물 사이트 체험</span>
                  </Link>
                )}
                {category.id === "saas" && (
                  <a
                    href="https://tdocs.kr"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all shrink-0 self-start lg:self-end"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>티독스 정식 서비스 방문</span>
                  </a>
                )}
              </div>

              {/* 5-Column Gallery Grid (PC: lg:grid-cols-5, Mobile: grid-cols-2) */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 lg:gap-4.5">
                {visibleProjects.map((project, index) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative rounded-2xl bg-zinc-50 border border-zinc-200/90 hover:border-zinc-400 p-2.5 lg:p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden"
                  >
                    {/* Thumbnail Image Container */}
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200 relative mb-3">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                        <span className="text-[10px] text-white font-medium bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                          상세보기
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </div>

                      {/* Top Badge */}
                      {project.badge && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-bold text-zinc-900 shadow-sm border border-zinc-200/60">
                          {project.badge}
                        </div>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] text-zinc-400 font-mono flex items-center justify-between mb-1">
                          <span>{project.categoryName}</span>
                          <span>{project.year}</span>
                        </div>
                        <h3 className="text-xs lg:text-sm font-bold text-zinc-900 group-hover:text-amber-800 transition-colors line-clamp-1 leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1 font-light leading-tight">
                          {project.summary}
                        </p>
                      </div>

                      {/* Tech stack pills */}
                      <div className="pt-2.5 mt-2 border-t border-zinc-200/60 flex items-center justify-between">
                        <div className="flex items-center gap-1 overflow-hidden">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200/70 text-zinc-700 font-mono truncate max-w-[90px]">
                            {project.techStack[0]}
                          </span>
                          {project.techStack[1] && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200/70 text-zinc-700 font-mono truncate max-w-[90px]">
                              {project.techStack[1]}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-400 font-mono shrink-0">
                          {project.period}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Accordion Expand/Collapse Button (if items > 5) */}
              {hiddenCount > 0 && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold border border-zinc-200 shadow-sm transition-all cursor-pointer group"
                  >
                    {isExpanded ? (
                      <>
                        <span>{category.name.split(" · ")[0]} 상위 5개만 보기</span>
                        <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    ) : (
                      <>
                        <span>{category.name.split(" · ")[0]} +{hiddenCount}개 프로젝트 더보기</span>
                        <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CAPABILITIES (4 PILLARS IN WHITE ARCHITECTURAL CARDS)
          ───────────────────────────────────────────────────────────── */}
      <section id="capabilities" className="py-20 lg:py-28 px-4 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-zinc-200">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-400 block mb-2 font-mono">
            CAPABILITIES
          </span>
          <h2 className="text-2xl lg:text-4xl font-light text-zinc-950 tracking-tight">
            태문 데브스튜디오의 <span className="font-serif italic text-zinc-800 font-normal">전문 역량 4대 축</span>
          </h2>
          <p className="text-zinc-500 text-xs lg:text-sm mt-2 font-light">
            단순 웹사이트 제작을 넘어, 산업 현장의 복잡한 요구조건을 풀스택 아키텍처로 정밀하게 해결합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-zinc-50 p-6 lg:p-7 rounded-2xl border border-zinc-200 hover:border-zinc-400 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-200">
                <Compass className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-zinc-400">01 / BRANDING</div>
              <h3 className="text-lg font-serif text-zinc-950 font-bold">디지털 플래그십 &amp; 브랜드 웹</h3>
              <p className="text-xs text-zinc-600 font-light leading-relaxed">
                건축, 인테리어, 명품 패션, 프리미엄 소비재를 위한 압도적 감도의 타이포그래피와 고해상도 화보형 반응형 웹사이트.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-200 text-[11px] text-amber-800 font-mono">
              • 반응형 갤러리 &amp; 예약 위저드
            </div>
          </div>

          <div className="bg-zinc-50 p-6 lg:p-7 rounded-2xl border border-zinc-200 hover:border-zinc-400 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-zinc-400">02 / INDUSTRY DATA</div>
              <h3 className="text-lg font-bold text-zinc-950">스마트 공정 데이터 플랫폼</h3>
              <p className="text-xs text-zinc-600 font-light leading-relaxed">
                제조·설비·소재 현장의 수기 엑셀을 실시간 SPC 관리도, 수율 분석, 4단계 로트 계보 역추적 시스템으로 디지털 전환.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-200 text-[11px] text-emerald-800 font-mono">
              • 실시간 SPC 통계 &amp; 불량 감지
            </div>
          </div>

          <div className="bg-zinc-50 p-6 lg:p-7 rounded-2xl border border-zinc-200 hover:border-zinc-400 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center border border-purple-200">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-zinc-400">03 / LEGAL TECH</div>
              <h3 className="text-lg font-bold text-zinc-950">전자서약 &amp; 스마트 서식</h3>
              <p className="text-xs text-zinc-600 font-light leading-relaxed">
                카카오 알림톡 원클릭 전자서명, PDF/PNG 실시간 벡터 합성 엔진, 전자서명법 기준 감사추적증명서 3중 보안 모듈 구축.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-200 text-[11px] text-purple-800 font-mono">
              • 100% 법적 효력 &amp; 감사추적
            </div>
          </div>

          <div className="bg-zinc-50 p-6 lg:p-7 rounded-2xl border border-zinc-200 hover:border-zinc-400 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center border border-blue-200">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-zinc-400">04 / TRANSACTIONS</div>
              <h3 className="text-lg font-bold text-zinc-950">PG 결제 &amp; 안전 정산 빌링</h3>
              <p className="text-xs text-zinc-600 font-light leading-relaxed">
                신용카드 단건 결제부터 빌링키 정기 구독, 단계별 기성 검수 정산 모듈, 본인인증(PASS/KGI) 연동까지 완벽 구축.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-200 text-[11px] text-blue-800 font-mono">
              • PortOne V2 &amp; 결제 자동화
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE TAEMUN WAY (CREATIVE & ARCHITECTURAL PROCESS)
          ───────────────────────────────────────────────────────────── */}
      <section id="process" className="py-20 lg:py-28 px-4 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-zinc-200">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-400 block mb-2 font-mono">
            THE TAEMUN WAY
          </span>
          <h2 className="text-2xl lg:text-4xl font-light text-zinc-950 tracking-tight">
            실패 없는 개발을 위한 <span className="font-serif italic text-zinc-800 font-normal">4단계 직영 파이프라인</span>
          </h2>
          <p className="text-zinc-500 text-xs lg:text-sm mt-2 font-light">
            하청 없는 총괄 아키텍트 직영 책임 감리로 기획 오류와 소통 부재를 원천 차단합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="p-6 lg:p-7 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <span className="text-amber-800 font-mono text-xs font-bold block">STEP 01</span>
            <h4 className="text-base font-bold text-zinc-950">본질 심층 분석</h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              업종의 특성과 고객사의 핵심 수익 모델, 필수 기능만을 총괄 아키텍트가 1:1로 정밀 분석하여 낭비 없는 스펙을 정의합니다.
            </p>
          </div>

          <div className="p-6 lg:p-7 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <span className="text-amber-800 font-mono text-xs font-bold block">STEP 02</span>
            <h4 className="text-base font-bold text-zinc-950">7일 실물 프로토타입</h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              그림이나 PPT 기획서가 아닌, 실제 브라우저에서 버튼이 눌리고 모달이 열리는 100% 실물 데모 사이트를 단 7일 만에 시연합니다.
            </p>
          </div>

          <div className="p-6 lg:p-7 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <span className="text-amber-800 font-mono text-xs font-bold block">STEP 03</span>
            <h4 className="text-base font-bold text-zinc-950">풀스택 장인 시공</h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Next.js 16, TypeScript, Tailwind v4, Supabase RLS 등 최고 수준의 기술 스택으로 한 땀 한 땀 결점 없이 견고하게 코딩합니다.
            </p>
          </div>

          <div className="p-6 lg:p-7 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <span className="text-amber-800 font-mono text-xs font-bold block">STEP 04</span>
            <h4 className="text-base font-bold text-zinc-950">소스 완전 이전 &amp; 케어</h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              개발된 모든 소스코드와 지식재산권을 100% 완전 이전하며, 런칭 후 안정적 운영을 위한 전담 무상 하자보증을 약속합니다.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. START A PROJECT (HIGH-END INQUIRY & CONTACT)
          ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 lg:py-28 px-4 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="bg-zinc-50 p-8 lg:p-14 rounded-3xl border border-zinc-200 shadow-lg relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 text-zinc-800 text-xs font-semibold mb-6">
            <span>START A PROJECT</span>
          </div>

          <h2 className="text-2xl lg:text-4xl font-light text-zinc-950 mb-4 leading-tight">
            귀사의 다음 프로젝트를 <br />
            <span className="font-serif italic text-zinc-800 font-normal">태문과 함께 상상해 보세요.</span>
          </h2>

          <p className="text-zinc-600 text-xs lg:text-sm max-w-xl mx-auto mb-8 font-light leading-relaxed">
            아이디어 단계의 간단한 구상부터 대형 엔터프라이즈 플랫폼까지, 총괄 아키텍트가 24시간 이내에 직접 검토 후 최적의 방향을 제시합니다.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-8">
            <Link
              href="/inquiry"
              className="w-full py-3.5 px-6 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-xs lg:text-sm transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>온라인 맞춤 견적 신청하기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-zinc-200 flex flex-col lg:flex-row items-center justify-center gap-6 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-zinc-700" />
              <span>직통 유선 상담: 010-8672-6463</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-zinc-700" />
              <span>공식 이메일: contact@taemun.co.kr</span>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Minimal Footer */}
      <footer className="border-t border-zinc-200 py-10 px-4 lg:px-8 max-w-7xl mx-auto text-xs text-zinc-500 flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 text-center lg:text-left">
          <span className="font-bold text-zinc-900 tracking-wide">TAEMUN DEV STUDIO</span>
          <span className="hidden lg:inline text-zinc-300">|</span>
          <span>(주)태문 • 사업자등록번호 211-88-94103</span>
          <span className="hidden lg:inline text-zinc-300">|</span>
          <span>서울시 강남구 테헤란로</span>
        </div>
        <div>
          &copy; {new Date().getFullYear()} TAEMUN DEV STUDIO. All rights reserved.
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          6. PROJECT EXHIBITION MODAL (POPUP ON CARD CLICK)
          ───────────────────────────────────────────────────────────── */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 flex flex-col justify-between text-left">
            {/* Modal Header */}
            <div className="p-5 lg:p-6 border-b border-zinc-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-20">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold border border-zinc-200">
                  {selectedProject.categoryName}
                </span>
                <span className="text-xs text-zinc-400 font-mono">• {selectedProject.year}</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 lg:p-6 space-y-6">
              {/* Image Preview */}
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 relative">
                <img
                  src={selectedProject.thumbnailUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                {selectedProject.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-white/95 text-xs font-bold text-zinc-900 shadow-md">
                    {selectedProject.badge}
                  </span>
                )}
                {selectedProject.liveDemoUrl && (
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-medium flex items-center justify-between border border-white/10">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>스튜디오 멀티 디바이스 반응형 뷰어 (PC · 태블릿 · 모바일)</span>
                    </span>
                    <span className="text-[11px] text-zinc-300 font-mono">회전(Rotate) 지원</span>
                  </div>
                )}
              </div>

              {/* Title & Client */}
              <div>
                <div className="text-xs text-zinc-500 font-mono mb-1">
                  클라이언트: {selectedProject.client}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-zinc-950">
                  {selectedProject.title}
                </h3>
                <p className="text-xs lg:text-sm text-zinc-600 mt-2.5 font-light leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                <div className="text-xs font-bold text-zinc-700 mb-1">핵심 구현 기술 및 산출물</div>
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack & Period */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-100 text-zinc-700 border border-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>제작 기간: {selectedProject.period}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 lg:p-6 border-t border-zinc-200 bg-zinc-50/70 rounded-b-3xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {selectedProject.liveDemoUrl ? (
                <Link
                  href={selectedProject.liveDemoUrl}
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-950 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all group"
                >
                  <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                  <span>반응형 뷰어로 체험 (PC · 태블릿 · 모바일 · 회전)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : selectedProject.externalUrl ? (
                <a
                  href={selectedProject.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>실제 운영 사이트 방문하기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : null}

              <Link
                href={`/inquiry?project=${encodeURIComponent(selectedProject.title)}`}
                onClick={() => setSelectedProject(null)}
                className="py-3 px-5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>이 프로젝트처럼 의뢰하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Widget */}
      <FloatingChatWidget />
    </div>
  );
}
