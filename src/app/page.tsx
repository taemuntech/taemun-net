import Header from "@/components/Header";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import ParticleCanvas from "@/components/ParticleCanvas";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  FileText,
  Layers,
  Layout,
  Mail,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Play,
  Building2,
  Cpu,
  ShoppingBag,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-indigo-500 selection:text-white [word-break:keep-all]">
      {/* Interactive Glowing Swarm Canvas Background */}
      <ParticleCanvas />

      {/* Background Ambient Lighting */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-purple-600/15 blur-[140px] pointer-events-none rounded-full"></div>

      {/* Responsive Header / Navigation with Mobile Drawer */}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-20 px-4 lg:px-6 max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 lg:px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 lg:mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>아이디어부터 엔터프라이즈까지 • 전 산업 맞춤형 풀스택 에이전시</span>
        </div>

        <h1 className="text-3xl lg:text-7xl font-extrabold tracking-tight mb-6 lg:mb-8 leading-snug lg:leading-tight">
          비즈니스의 성장을 이끄는<br />
          <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            하이엔드 웹사이트 & 솔루션
          </span>을 만듭니다.
        </h1>

        <p className="text-gray-400 text-sm lg:text-xl max-w-3xl mx-auto mb-10 lg:mb-12 font-normal leading-relaxed">
          건축·인테리어부터 제조·소재공정, 전자서약 SaaS, B2B 매칭 플랫폼까지.<br className="hidden lg:block" />
          산업의 본질을 꿰뚫는 기획과 압도적인 기술력으로 상상 속 비즈니스를 현실로 완성합니다.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4">
          <Link
            href="/inquiry"
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
          >
            <span>프로젝트 견적 문의하기</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/portfolio"
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-gray-900/80 text-gray-200 hover:text-white font-bold text-base hover:bg-gray-800 transition-all border border-white/10 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>전체 포트폴리오 둘러보기</span>
          </Link>
        </div>
      </section>

      {/* Key Value Grid */}
      <section className="py-8 lg:py-12 px-4 lg:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-gray-900/60 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-2xl lg:text-4xl font-extrabold text-indigo-400 mb-1">2배 빠른</div>
            <div className="text-xs lg:text-sm text-gray-400 font-medium">AI 기반 MVP 초고속 런칭</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-2xl lg:text-4xl font-extrabold text-purple-400 mb-1">100%</div>
            <div className="text-xs lg:text-sm text-gray-400 font-medium">모바일 퍼스트 반응형 구현</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-2xl lg:text-4xl font-extrabold text-indigo-400 mb-1">안전한</div>
            <div className="text-xs lg:text-sm text-gray-400 font-medium">PG 결제 & 정기구독 빌링</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-2xl lg:text-4xl font-extrabold text-emerald-400 mb-1">투명한</div>
            <div className="text-xs lg:text-sm text-gray-400 font-medium">개발 소스코드 100% 완전 이전</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 px-4 lg:px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">WHAT WE BUILD</div>
          <h2 className="text-2xl lg:text-5xl font-extrabold text-white">태문 개발팀 제공 분야</h2>
          <p className="text-gray-400 text-xs lg:text-base mt-3">홈페이지 제작부터 모듈형 솔루션, 풀스택 플랫폼까지 맞춤 지원합니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-gray-900/60 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-white">맞춤형 홈페이지 제작 & 웹·앱 구축</h3>
            <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
              고객 유입을 위한 고성능 홈페이지 제작 및 랜딩페이지부터 매칭·커머스·예약 시스템 등 비즈니스 목적에 맞춘 플랫폼 구축 외주.
            </p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-white">전자서식 & 캔버스 솔루션</h3>
            <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
              견적서·계약서·확인서 모바일 작성, PDF/PNG 자동 스냅샷, 카카오톡 알림톡 결합 서명 모듈 개발.
            </p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-white">PG 결제 & 구독 빌링</h3>
            <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
              신용카드 단건 결제부터 빌링키 정기 구독 결제, 바우처/포인트 복합 결제 및 취소·환불 자동화 구축.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Portfolio Showcase (4 Master Showcase Cards) */}
      <section id="portfolio" className="py-16 lg:py-24 px-4 lg:px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 lg:mb-12">
          <div>
            <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">FEATURED PROJECTS</div>
            <h2 className="text-2xl lg:text-5xl font-extrabold text-white">주요 개발 구축 사례</h2>
          </div>
          <div className="mt-3 lg:mt-0 flex items-center gap-4">
            <p className="text-gray-400 text-xs lg:text-sm hidden lg:block">
              풀스택 총괄 아키텍트가 직접 설계하고 런칭한 실물 서비스입니다.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs lg:text-sm font-semibold text-indigo-400 hover:text-indigo-300"
            >
              <span>전체 포트폴리오 보기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: 아뜰리에 보클루즈 (건축 & 인테리어 실물 데모) */}
          <div className="bg-gray-900/60 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-amber-500/30 hover:border-amber-400/60 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                  <span>아뜰리에 보클루즈</span> • <span>건축 & 인테리어</span>
                </div>
                <span className="text-[11px] font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  실물 라이브 데모
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-video group bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
                  alt="ATELIER VAUCLUSE 실물 사이트 목업"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs uppercase tracking-widest text-amber-200">Architecture & Spatial Interior</div>
                  <div className="text-sm font-serif font-bold">RESIDENCE PRIVATE SANCTUARY HANNAM</div>
                </div>
              </div>

              <h3 className="text-xl lg:text-3xl font-bold text-white leading-snug font-serif">
                공간의 본질을 담은 하이엔드 인테리어 스튜디오 웹
              </h3>

              <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                미니멀 세리프 타이포그래피와 자연석 웜톤 감성의 브랜드 웹사이트. 공간 철학 3대 축, 반응형 프로젝트 아카이브 및 1:1 상담 예약 위저드를 탑재했습니다.
              </p>

              <div className="p-4 rounded-2xl bg-gray-950 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>공간 철학 & 프로세스</span>
                  <span className="text-amber-400 font-semibold">Materiality, Geometry, Precision</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>프로젝트 갤러리</span>
                  <span className="text-amber-400 font-semibold">주거·상업 공간 동적 필터링</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>프라이빗 1:1 예약</span>
                  <span className="text-amber-400 font-semibold">사전 견적 & 모달 위저드</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/demo/atelier-vaucluse"
                className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs lg:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-900/30 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>보클루즈 라이브 데모 직접 체험하기</span>
              </Link>
            </div>
          </div>

          {/* Card 2: 리튬박 공정 데이터 플랫폼 */}
          <div className="bg-gray-900/60 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-emerald-500/30 hover:border-emerald-400/60 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  <span>리튬박 공정 데이터</span> • <span>제조 & 스마트팩토리</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  실물 라이브 데모
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-video group bg-emerald-950/40">
                <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-emerald-950/80 via-gray-900 to-teal-950/80">
                  <div className="text-center space-y-2">
                    <BarChart3 className="w-12 h-12 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
                    <div className="text-xs text-emerald-300 font-mono">Real-time SPC & Lot Traceability</div>
                    <div className="text-sm font-bold text-white">12주 수율 워터폴 & 7대 원소 관리도</div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl lg:text-3xl font-bold text-white leading-snug">
                롤 일지 입력 → KPI·관리도·계보가 바뀌는 스마트 플랫폼
              </h3>

              <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                제조 현장의 엑셀 수기 장부를 웹 기반 실시간 엔터프라이즈 모니터링 시스템으로 전환. 7대 불순물 SPC 관리도, 수율 워터폴, 로트(Lot) 역추적 엔진을 갖추고 있습니다.
              </p>

              <div className="p-4 rounded-2xl bg-gray-950 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>실시간 통계 관리도</span>
                  <span className="text-emerald-400 font-semibold">7대 원소 SPC Control Chart</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>원료부터 슬리팅까지</span>
                  <span className="text-emerald-400 font-semibold">4단계 로트 계보 완벽 역추적</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>슬리팅 롤 일지 폼</span>
                  <span className="text-emerald-400 font-semibold">입력 즉시 전역 데이터 동기화</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/demo/lithium-foil"
                className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs lg:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>공정 데이터 데모 직접 체험하기</span>
              </Link>
            </div>
          </div>

          {/* Card 3: T-DOCS */}
          <div className="bg-gray-900/60 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
                  <span>T-DOCS (티독스)</span> • <span>스마트 전자서식 SaaS</span>
                </div>
                <span className="text-[11px] font-bold text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                  실제 운영 서비스
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-video group">
                <img 
                  src="/images/mockup_tdocs.jpg" 
                  alt="T-DOCS 3D 디바이스 목업" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
              </div>

              <h3 className="text-xl lg:text-3xl font-bold text-white leading-snug">
                100% 법적 효력 카카오 모바일 전자서명 & AI 오피스 비서
              </h3>

              <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                300여 종 전문 서식 지면 프리뷰 에디터, 카카오톡 원클릭 전자서명, Gemini AI 비서 아라, 고성능 PDF 변환/출력 엔진을 탑재한 B2B SaaS 솔루션입니다.
              </p>

              <div className="p-4 rounded-2xl bg-gray-950 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>카카오 모바일 전자서명</span>
                  <span className="text-purple-400 font-semibold">100% 법적 효력 서명</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>AI 서식 작성 비서 아라</span>
                  <span className="text-purple-400 font-semibold">Google Gemini AI</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>고성능 PDF & 이미지 스냅샷</span>
                  <span className="text-purple-400 font-semibold">Vector PDF Engine</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="https://tdocs.kr" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs lg:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:opacity-90 transition-all"
              >
                <span>T-DOCS 실제 서비스 열기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 4: 태문브릿지 */}
          <div className="bg-gray-900/60 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                  <span>태문브릿지</span> • <span>B2B2C 플랫폼</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  실제 운영 중
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-video group">
                <img 
                  src="/images/mockup_taemun_bridge.jpg" 
                  alt="태문브릿지 3D 디바이스 목업" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
              </div>

              <h3 className="text-xl lg:text-3xl font-bold text-white leading-snug">
                매칭·계약·결제·교육·자재유통을 아우르는 풀스택 플랫폼
              </h3>

              <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                7단계 견적 라이프사이클과 23종 모바일 캔버스 서식, PortOne 빌링키 정기결제, PASS/KGI 본인인증, RLS 암호화 보안까지 일관된 아키텍처로 직영 구축한 대형 서비스입니다.
              </p>

              <div className="p-4 rounded-2xl bg-gray-950 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>견적 & 전문가 매칭 엔진</span>
                  <span className="text-indigo-400 font-semibold">7단계 라이프사이클</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>본인인증 & 빌링키 정기결제</span>
                  <span className="text-indigo-400 font-semibold">PortOne V2 & PASS</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>알림톡 & 결제 수단 관리</span>
                  <span className="text-indigo-400 font-semibold">SOLAPI Kakao Alert</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="https://taemun.co.kr" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs lg:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-all"
              >
                <span>태문브릿지 실제 서비스 열기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Big Portfolio Archive Banner */}
        <div className="mt-12 p-8 lg:p-10 rounded-3xl bg-gradient-to-r from-indigo-900/50 via-purple-900/40 to-pink-900/40 border border-indigo-500/30 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest block mb-2">
              ALL WORK ARCHIVE
            </span>
            <h3 className="text-xl lg:text-3xl font-extrabold text-white">
              더 많은 산업별 포트폴리오를 둘러보시겠어요?
            </h3>
            <p className="text-xs lg:text-sm text-gray-300 mt-1">
              건축·인테리어, 제조·공정, 커머스, 플랫폼 등 산업 카테고리별 필터로 확인해 보세요.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="shrink-0 px-8 py-4 rounded-xl bg-white text-gray-950 hover:bg-gray-100 font-bold text-sm shadow-xl transition-all flex items-center gap-2"
          >
            <span>전체 포트폴리오 갤러리 보기</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </Link>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className="py-16 lg:py-24 px-4 lg:px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">OUR PROCESS</div>
          <h2 className="text-2xl lg:text-5xl font-extrabold text-white">5단계 안심 개발 프로세스</h2>
          <p className="text-gray-400 text-xs lg:text-base mt-3">기획 오류와 소통 부재를 원천 차단하는 태문만의 체계적인 런칭 파이프라인입니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="p-6 rounded-2xl bg-gray-900/60 border border-white/10 space-y-3">
            <div className="text-indigo-400 text-sm font-mono font-bold">STEP 01</div>
            <h3 className="text-base font-bold text-white">비즈니스 기획 & 분석</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              업종 특성과 타겟 고객, 필수 기능 요구사항을 총괄 아키텍트가 1:1로 정밀 분석합니다.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/60 border border-white/10 space-y-3">
            <div className="text-purple-400 text-sm font-mono font-bold">STEP 02</div>
            <h3 className="text-base font-bold text-white">AI 초고속 프로토타입</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              그림이나 목업이 아닌, 실제 브라우저에서 동작하는 실물 프로토타입을 빠르게 검증합니다.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/60 border border-white/10 space-y-3">
            <div className="text-cyan-400 text-sm font-mono font-bold">STEP 03</div>
            <h3 className="text-base font-bold text-white">맞춤형 풀스택 개발</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Next.js 16, TypeScript, Supabase, PG 결제 등 검증된 모던 기술로 견고하게 구축합니다.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/60 border border-white/10 space-y-3">
            <div className="text-emerald-400 text-sm font-mono font-bold">STEP 04</div>
            <h3 className="text-base font-bold text-white">반응형 & 보안 QA</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              모바일·태블릿·PC 전 디바이스 최적화 및 결제·인증·DB 보안 RLS를 철저히 검증합니다.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/60 border border-white/10 space-y-3">
            <div className="text-amber-400 text-sm font-mono font-bold">STEP 05</div>
            <h3 className="text-base font-bold text-white">소스 이전 & 무상 A/S</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              소스코드 100% 완전 이전, 도메인 배포 완료 후 3개월간 버그 무상 보증을 지원합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-20 lg:py-28 px-4 lg:px-6 max-w-5xl mx-auto text-center relative z-10">
        <div className="bg-gradient-to-b from-gray-900/90 to-gray-950 p-8 lg:p-16 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/15 blur-[100px] pointer-events-none rounded-full"></div>
          
          <h2 className="text-2xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            지금 바로 태문 개발팀과<br />
            상담해 보세요.
          </h2>
          
          <p className="text-gray-400 text-xs lg:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            아이디어 단계부터 개발 외주, 기존 서비스 리팩토링까지 친절하게 안내해 드립니다.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
            <a 
              href="tel:010-8672-6463" 
              className="w-full lg:w-auto p-4 lg:px-8 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-900/60 transition-all text-left flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-gray-400 font-semibold">총괄 아키텍트 직통 (24시간)</div>
                <div className="text-base lg:text-xl font-bold text-white tracking-wide">010-8672-6463</div>
              </div>
            </a>

            <a 
              href="mailto:contact@taemun.co.kr" 
              className="w-full lg:w-auto p-4 lg:px-8 rounded-2xl bg-gray-900/80 border border-white/10 hover:border-white/20 hover:bg-gray-800 transition-all text-left flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 text-gray-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-gray-400 font-semibold">이메일 문의</div>
                <div className="text-base lg:text-xl font-bold text-white">contact@taemun.co.kr</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4 lg:px-6 max-w-7xl mx-auto text-center lg:text-left flex flex-col lg:flex-row items-center justify-between text-xs text-gray-500 gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-300">태문 DEV STUDIO</span>
          <span>• 직통전화: 010-8672-6463</span>
          <span>• 이메일: contact@taemun.co.kr</span>
        </div>
        <div>
          © {new Date().getFullYear()} TAEMUN DEV STUDIO. All rights reserved.
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <FloatingChatWidget />
    </div>
  );
}
