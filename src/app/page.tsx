import Header from "@/components/Header";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Play,
  Layers,
  FileText,
  Activity,
  PhoneCall,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Code2,
  Compass,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0c0d0e] text-[#f4f3f1] selection:bg-[#904b35] selection:text-white [word-break:keep-all] font-sans">
      {/* Subtle Warm Grid Overlay for Depth */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#d4b895_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      {/* Agency Navigation Bar */}
      <Header />

      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL AGENCY HERO SECTION
          ───────────────────────────────────────────────────────────── */}
      <section className="pt-36 lg:pt-48 pb-16 lg:pb-24 px-4 lg:px-8 max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 lg:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-amber-300 text-xs font-semibold mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="tracking-wider uppercase text-[11px] lg:text-xs">
            TAEMUN DEV STUDIO • BESPOKE DIGITAL FLAGSHIP
          </span>
        </div>

        <h1 className="text-4xl lg:text-7xl font-light tracking-[-0.02em] mb-8 leading-[1.15] lg:leading-[1.1]">
          비즈니스의 격을 높이는<br />
          <span className="font-serif italic text-amber-200/95 font-normal">디지털 플래그십</span>을 만듭니다.
        </h1>

        <p className="text-gray-400 text-sm lg:text-lg max-w-2xl mx-auto mb-10 lg:mb-12 font-light leading-relaxed">
          건축·인테리어의 고요한 공간감부터 정밀 제조 공정의 통계 모니터링, 법적 효력의 SaaS 플랫폼까지.<br className="hidden lg:inline" />
          기획서 속 그림이 아닌, 브라우저에서 100% 작동하는 실물 완성도로 비즈니스의 첫인상을 조각합니다.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4 max-w-md mx-auto">
          <Link
            href="/inquiry"
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-amber-100 hover:bg-white text-gray-950 font-bold text-sm transition-all flex items-center justify-center gap-2 group shadow-lg shadow-amber-950/20"
          >
            <span>프로젝트 의뢰 &amp; 견적 문의</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/portfolio"
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white font-semibold text-sm transition-all border border-white/10 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>전체 작품 아카이브</span>
          </Link>
        </div>

        {/* 🌟 Wide 3-Card Showcase Strip */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          {/* Showcase 1: Atelier Vaucluse */}
          <Link
            href="/demo/atelier-vaucluse"
            className="group relative rounded-2xl overflow-hidden bg-[#161719] border border-white/10 hover:border-amber-500/40 transition-all p-6 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-serif italic text-sm">01 / High-End Studio</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  Live Demo
                </span>
              </div>
              <h3 className="text-xl font-serif text-white group-hover:text-amber-300 transition-colors">
                ATELIER VAUCLUSE
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                미니멀 세리프와 자연석 웜톤의 프렌치 모더니즘 하이엔드 건축·인테리어 스튜디오 실물 웹사이트.
              </p>
            </div>
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-900 border border-white/5 relative">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
                alt="아뜰리에 보클루즈 프리뷰"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur text-[11px] text-white flex items-center gap-1">
                <span>실물 체험하기</span>
                <ArrowUpRight className="w-3 h-3 text-amber-400" />
              </div>
            </div>
          </Link>

          {/* Showcase 2: Lithium Foil SPC */}
          <Link
            href="/demo/lithium-foil"
            className="group relative rounded-2xl overflow-hidden bg-[#161719] border border-white/10 hover:border-emerald-500/40 transition-all p-6 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-mono text-sm">02 / Smart Manufacturing</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  Live Demo
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                리튬박 공정 데이터 모니터링
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                슬리팅 롤 일지 입력 시 7대 불순물 통계 관리도(SPC)와 4단계 로트 계보가 실시간 갱신되는 스마트 제조 플랫폼.
              </p>
            </div>
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-emerald-950/30 border border-white/5 relative flex items-center justify-center p-4">
              <div className="text-center space-y-1.5">
                <Activity className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-xs font-mono text-emerald-300 font-bold">Real-time SPC &amp; Lot Geneaology</div>
                <div className="text-[11px] text-gray-400">12주 수율 워터폴 분석 엔진</div>
              </div>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur text-[11px] text-white flex items-center gap-1">
                <span>실물 체험하기</span>
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
              </div>
            </div>
          </Link>

          {/* Showcase 3: T-DOCS SaaS */}
          <a
            href="https://tdocs.kr"
            target="_blank"
            rel="noreferrer"
            className="group relative rounded-2xl overflow-hidden bg-[#161719] border border-white/10 hover:border-purple-500/40 transition-all p-6 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-400 font-mono text-sm">03 / Legal Tech SaaS</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                  Production
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                <span>T-DOCS (티독스)</span>
                <ExternalLink className="w-4 h-4 text-purple-400" />
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                300여 종 산업 서식 반응형 지면 에디터, 카카오톡 10초 전자서명, 감사추적증명서 3중 법적 보호 체계 완비.
              </p>
            </div>
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-purple-950/30 border border-white/5 relative">
              <img
                src="/images/mockup_tdocs.jpg"
                alt="티독스 모바일 서명 목업"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur text-[11px] text-white flex items-center gap-1">
                <span>서비스 열기</span>
                <ArrowUpRight className="w-3 h-3 text-purple-400" />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CURATED WORKS (MAGAZINE-STYLE FULL-WIDTH PORTFOLIO SHOWCASE)
          ───────────────────────────────────────────────────────────── */}
      <section id="works" className="py-24 lg:py-32 px-4 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 block mb-3 font-mono">
              SELECTED WORKS
            </span>
            <h2 className="text-3xl lg:text-5xl font-light text-white tracking-tight">
              태문이 완성한 <span className="font-serif italic text-amber-200">대표 마스터피스</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 hover:text-white font-semibold border-b border-amber-400/40 hover:border-white pb-1 transition-colors"
          >
            <span>전체 45+ 프로젝트 아카이브 둘러보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Master Project 01: ATELIER VAUCLUSE */}
        <div className="mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-[#161719] border border-white/10 shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                alt="아뜰리에 보클루즈 메인 갤러리"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-amber-200 font-sans block mb-1">
                    HANNAM RESIDENCE SANCTUARY
                  </span>
                  <div className="text-lg font-serif text-white font-bold">
                    ATELIER VAUCLUSE INTERIOR ARCHITECTURE
                  </div>
                </div>
                <Link
                  href="/demo/atelier-vaucluse"
                  className="px-4 py-2 rounded-xl bg-white text-gray-950 font-bold text-xs flex items-center gap-1.5 shadow-lg hover:bg-amber-100 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>실물 데모 체험</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-serif italic text-lg">01</span>
              <span className="text-gray-500">/</span>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-medium font-sans">
                건축 &amp; 하이엔드 인테리어
              </span>
            </div>

            <h3 className="text-2xl lg:text-4xl font-serif text-white leading-tight">
              공간의 본질과 시간의 결을 짓는 <br />
              프렌치 모더니즘 스튜디오 웹
            </h3>

            <p className="text-xs lg:text-sm text-gray-400 font-light leading-relaxed">
              화려한 치장보다 천연 트래버틴과 미장 회벽, 훈증 오크의 물성을 앞세운 최고급 건축 인테리어 에이전시의 브랜드 웹사이트입니다. 공간 철학 3대 축, 반응형 프로젝트 갤러리 및 모달 예약 위저드를 탑재했습니다.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">Next.js 16</span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">Tailwind CSS v4</span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">TypeScript</span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">Responsive Modal</span>
            </div>

            <div className="pt-4">
              <Link
                href="/demo/atelier-vaucluse"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-white transition-colors group"
              >
                <span>보클루즈 100% 실물 라이브 데모 둘러보기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Master Project 02: LITHIUM FOIL SPC */}
        <div className="mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-mono text-lg">02</span>
              <span className="text-gray-500">/</span>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-medium font-sans">
                스마트 제조 &amp; 공정 데이터
              </span>
            </div>

            <h3 className="text-2xl lg:text-4xl font-bold text-white leading-tight">
              엑셀 수기 장부를 실시간 <br />
              SPC 관리도와 로트 계보로 전환
            </h3>

            <p className="text-xs lg:text-sm text-gray-400 font-light leading-relaxed">
              2차전지 핵심 소재 리튬박 제조 현장을 위한 엔터프라이즈 모니터링 시스템입니다. 슬리팅 롤 일지를 입력하는 즉시 7대 불순물 ICP 관리도와 12주 수율 워터폴 분석, 잉곳부터 슬리팅까지의 로트 계보가 동기화됩니다.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">Next.js 16</span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">SPC Control Chart</span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">Lot Traceability</span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">Turbopack</span>
            </div>

            <div className="pt-4">
              <Link
                href="/demo/lithium-foil"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-white transition-colors group"
              >
                <span>리튬박 공정 모니터링 데모 직접 조작하기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-[#161719] border border-white/10 shadow-2xl relative group p-6 flex flex-col justify-between bg-gradient-to-br from-emerald-950/40 via-gray-900 to-gray-950">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    Process Analytics Engine
                  </div>
                  <div className="text-lg font-bold text-white mt-1">12-Week Yield Waterfall &amp; ICP Trends</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                  LIVE DATA
                </span>
              </div>

              <div className="py-8 text-center space-y-2">
                <Activity className="w-16 h-16 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
                <div className="text-sm font-mono text-gray-300">Fe / Cu / Ni / Na / Ca / K / Cr Analysis</div>
                <div className="text-xs text-gray-500">USL·UCL 관리한계선 자동 판정 알고리즘</div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-xs text-gray-400 font-mono">잉곳 용해 ➔ 압출 ➔ 압연 ➔ 슬리팅</span>
                <Link
                  href="/demo/lithium-foil"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>실물 데모 실행</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Master Project 03 & 04 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* T-DOCS */}
          <div className="bg-[#161719] rounded-3xl p-8 border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-purple-400 font-mono text-sm">03 / SaaS Solution</span>
                <span className="text-[11px] font-bold text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                  직영 운영 중
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                T-DOCS: 카카오 모바일 전자서명 &amp; 300종 서식
              </h3>
              <p className="text-xs lg:text-sm text-gray-400 font-light leading-relaxed">
                전자서명법 제3조를 준수하는 원본 서식, 서명 확인서, 감사추적증명서 3중 보호 체계와 반응형 프리뷰 에디터를 갖춘 법적 효력 SaaS입니다.
              </p>
            </div>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-purple-950/20 border border-white/5 relative">
              <img
                src="/images/mockup_tdocs.jpg"
                alt="티독스 디바이스 목업"
                className="w-full h-full object-cover"
              />
            </div>
            <a
              href="https://tdocs.kr"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-purple-500/30 transition-all"
            >
              <span>T-DOCS 실제 서비스 열기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* TAEMUN BRIDGE */}
          <div className="bg-[#161719] rounded-3xl p-8 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-mono text-sm">04 / B2B Platform</span>
                <span className="text-[11px] font-bold text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  직영 운영 중
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                태문브릿지: 엔지니어링 매칭 &amp; 안심 정산 플랫폼
              </h3>
              <p className="text-xs lg:text-sm text-gray-400 font-light leading-relaxed">
                7단계 견적 라이프사이클, PASS 본인인증, PortOne 빌링키 정기구독 및 투명한 기성 정산 체계를 원스톱으로 갖춘 대형 B2B 플랫폼입니다.
              </p>
            </div>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-cyan-950/20 border border-white/5 relative">
              <img
                src="/images/mockup_taemun_bridge.jpg"
                alt="태문브릿지 디바이스 목업"
                className="w-full h-full object-cover"
              />
            </div>
            <a
              href="https://taemun.co.kr"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-cyan-500/30 transition-all"
            >
              <span>태문브릿지 실제 서비스 열기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CAPABILITIES (AGENCY EXPERTISE 4 PILLARS)
          ───────────────────────────────────────────────────────────── */}
      <section id="capabilities" className="py-24 lg:py-32 px-4 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 block mb-3 font-mono">
            CAPABILITIES
          </span>
          <h2 className="text-3xl lg:text-5xl font-light text-white tracking-tight">
            태문 데브스튜디오의 <span className="font-serif italic text-amber-200">전문 역량 4대 축</span>
          </h2>
          <p className="text-gray-400 text-xs lg:text-sm mt-4 font-light leading-relaxed">
            단순 홈페이지 제작을 넘어, 산업 현장의 복잡한 요구조건을 풀스택 아키텍처로 정밀하게 해결합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-[#161719] p-8 rounded-3xl border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-gray-500">01 / BRANDING</div>
              <h3 className="text-xl font-serif text-white">디지털 플래그십 &amp; 브랜드 웹</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                건축, 인테리어, 명품 패션, 프리미엄 소비재를 위한 압도적 감도의 타이포그래피와 고해상도 화보형 반응형 웹사이트.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-[11px] text-amber-400 font-mono">
              • 반응형 갤러리 &amp; 예약 위저드
            </div>
          </div>

          <div className="bg-[#161719] p-8 rounded-3xl border border-white/10 hover:border-emerald-400/40 transition-all flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-gray-500">02 / INDUSTRY DATA</div>
              <h3 className="text-xl font-bold text-white">스마트 공정 데이터 플랫폼</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                제조·설비·소재 현장의 수기 엑셀을 실시간 SPC 관리도, 수율 분석, 4단계 로트 계보 역추적 시스템으로 디지털 전환.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-[11px] text-emerald-400 font-mono">
              • 실시간 SPC 통계 &amp; 불량 감지
            </div>
          </div>

          <div className="bg-[#161719] p-8 rounded-3xl border border-white/10 hover:border-purple-400/40 transition-all flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-gray-500">03 / LEGAL TECH</div>
              <h3 className="text-xl font-bold text-white">전자서약 &amp; 스마트 서식</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                카카오 알림톡 원클릭 전자서명, PDF/PNG 실시간 벡터 합성 엔진, 전자서명법 기준 감사추적증명서 3중 보안 모듈 구축.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-[11px] text-purple-400 font-mono">
              • 100% 법적 효력 &amp; SHA-256 봉인
            </div>
          </div>

          <div className="bg-[#161719] p-8 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-gray-500">04 / TRANSACTIONS</div>
              <h3 className="text-xl font-bold text-white">PG 결제 &amp; 안전 정산 빌링</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                신용카드 단건 결제부터 빌링키 정기 구독, 단계별 기성 검수 정산 모듈, 본인인증(PASS/KGI) 연동까지 완벽 구축.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-[11px] text-cyan-400 font-mono">
              • PortOne V2 &amp; 결제 자동화
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE TAEMUN WAY (CREATIVE & ARCHITECTURAL PROCESS)
          ───────────────────────────────────────────────────────────── */}
      <section id="process" className="py-24 lg:py-32 px-4 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 block mb-3 font-mono">
            THE TAEMUN WAY
          </span>
          <h2 className="text-3xl lg:text-5xl font-light text-white tracking-tight">
            실패 없는 개발을 위한 <span className="font-serif italic text-amber-200">4단계 직영 파이프라인</span>
          </h2>
          <p className="text-gray-400 text-xs lg:text-sm mt-3 font-light leading-relaxed">
            하청 없는 총괄 아키텍트 직영 책임 감리로 기획 오류와 소통 부재를 원천 차단합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="p-8 rounded-3xl bg-[#161719] border border-white/10 space-y-4">
            <span className="text-amber-400 font-mono text-xs font-bold block">STEP 01</span>
            <h4 className="text-xl font-bold text-white">본질 심층 분석</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              업종의 특성과 고객사의 핵심 수익 모델, 필수 기능만을 총괄 아키텍트가 1:1로 정밀 분석하여 낭비 없는 스펙을 정의합니다.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#161719] border border-white/10 space-y-4">
            <span className="text-amber-400 font-mono text-xs font-bold block">STEP 02</span>
            <h4 className="text-xl font-bold text-white">7일 실물 프로토타입</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              그림이나 PPT 기획서가 아닌, 실제 브라우저에서 버튼이 눌리고 모달이 열리는 100% 실물 데모 사이트를 단 7일 만에 시연합니다.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#161719] border border-white/10 space-y-4">
            <span className="text-amber-400 font-mono text-xs font-bold block">STEP 03</span>
            <h4 className="text-xl font-bold text-white">풀스택 장인 시공</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Next.js 16, TypeScript, Tailwind v4, Supabase RLS 등 최고 수준의 기술 스택으로 한 땀 한 땀 결점 없이 견고하게 코딩합니다.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#161719] border border-white/10 space-y-4">
            <span className="text-amber-400 font-mono text-xs font-bold block">STEP 04</span>
            <h4 className="text-xl font-bold text-white">소스 완전 이전 &amp; 케어</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              개발된 모든 소스코드와 지식재산권을 100% 완전 이전하며, 런칭 후 안정적 운영을 위한 전담 무상 하자보증을 약속합니다.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. START A PROJECT (HIGH-END INQUIRY & CONTACT)
          ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 lg:py-36 px-4 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="bg-gradient-to-b from-[#18191b] to-[#121315] p-8 lg:p-16 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-6">
            <span>START A PROJECT</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-light text-white mb-6 leading-tight">
            귀사의 다음 프로젝트를 <br />
            <span className="font-serif italic text-amber-200 font-normal">태문과 함께 상상해 보세요.</span>
          </h2>

          <p className="text-gray-400 text-xs lg:text-base max-w-xl mx-auto mb-10 font-light leading-relaxed">
            아이디어 단계의 간단한 구상부터 대형 엔터프라이즈 플랫폼까지, 총괄 아키텍트가 24시간 이내에 직접 검토 후 최적의 방향을 제시합니다.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
            <Link
              href="/inquiry"
              className="w-full py-4 px-8 rounded-2xl bg-amber-100 hover:bg-white text-gray-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              <span>온라인 맞춤 견적 신청하기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-center gap-8 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>직통 유선 상담: 010-8672-6463</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>공식 이메일: contact@taemun.co.kr</span>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Minimal Footer */}
      <footer className="border-t border-white/5 py-12 px-4 lg:px-8 max-w-7xl mx-auto text-xs text-gray-500 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 text-center lg:text-left">
          <span className="font-bold text-white tracking-wide">TAEMUN DEV STUDIO</span>
          <span className="hidden lg:inline text-gray-700">|</span>
          <span>(주)태문 • 사업자등록번호 211-88-94103</span>
          <span className="hidden lg:inline text-gray-700">|</span>
          <span>서울시 강남구 테헤란로</span>
        </div>
        <div>
          &copy; {new Date().getFullYear()} TAEMUN DEV STUDIO. All rights reserved.
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <FloatingChatWidget />
    </div>
  );
}
