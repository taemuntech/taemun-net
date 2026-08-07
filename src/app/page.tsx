import FloatingChatWidget from "@/components/FloatingChatWidget";
import ParticleCanvas from "@/components/ParticleCanvas";
import Link from "next/link";
import { 
  ArrowRight, 
  CreditCard, 
  FileText, 
  Layers, 
  Layout, 
  Mail, 
  PhoneCall,
  Sparkles 
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-indigo-500 selection:text-white [word-break:keep-all]">
      {/* Interactive Glowing Swarm Canvas Background */}
      <ParticleCanvas />

      {/* Background Ambient Lighting */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-purple-600/15 blur-[140px] pointer-events-none rounded-full"></div>

      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center select-none shrink-0">
              <img
                src="/images/logo/icon-192-transparent.png"
                alt="태문 로고"
                className="w-10 lg:w-12 h-10 lg:h-12 object-contain scale-110"
              />
            </div>
            <span className="text-lg lg:text-xl font-bold tracking-tight text-white flex items-center -ml-1">
              태문 <span className="text-indigo-400 text-xs lg:text-sm font-semibold tracking-normal ml-1">DEV STUDIO</span>
            </span>
          </div>

          {/* Desktop Navigation (lg:flex) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#services" className="hover:text-white transition-colors">개발 서비스</a>
            <a href="#portfolio" className="hover:text-white transition-colors">포트폴리오 & 사례</a>
            <Link 
              href="/inquiry" 
              className="px-4.5 py-2 rounded-full bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 border border-indigo-500/50 text-white font-bold text-xs hover:border-indigo-400 hover:scale-105 transition-all flex items-center justify-center backdrop-blur-md shadow-lg shadow-indigo-500/25"
            >
              <span>외주/개발 문의</span>
            </Link>
            <a 
              href="https://taemun.co.kr" 
              target="_blank" 
              rel="noreferrer" 
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-semibold hover:border-cyan-300 hover:text-white transition-all flex items-center gap-1 backdrop-blur-md shadow-sm shadow-cyan-500/20"
            >
              <span>태문브릿지 라이브</span>
              <span className="text-[10px]">↗</span>
            </a>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2 lg:gap-3">
            <a href="tel:1588-2622" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 backdrop-blur-md transition-all">
              <PhoneCall className="w-3.5 h-3.5 text-indigo-400" />
              <span>1588-2622</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-20 px-4 lg:px-6 max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 lg:px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 lg:mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>아이디어 스케치부터 프로덕션급 홈페이지 제작 & 웹·앱 서비스 구축까지</span>
        </div>

        <h1 className="text-3xl lg:text-7xl font-extrabold tracking-tight mb-6 lg:mb-8 leading-snug lg:leading-tight">
          비즈니스의 성장을 이끄는<br />
          <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            맞춤형 홈페이지 제작 & 웹·앱 솔루션
          </span>을 만듭니다.
        </h1>

        <p className="text-gray-400 text-sm lg:text-xl max-w-3xl mx-auto mb-10 lg:mb-12 font-normal leading-relaxed">
          고성능 홈페이지 제작부터 맞춤형 웹·앱 개발 외주, 전자서식 SaaS, PG 결제 연동까지.<br className="hidden lg:block" />
          타 개발사 대비 압도적인 개발 속도와 완성도로 비즈니스를 현실로 만듭니다.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4">
          <Link href="/inquiry" className="w-full lg:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:opacity-90 transition-all flex items-center justify-center gap-2 group">
            <span>프로젝트 견적 문의하기</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#services" className="w-full lg:w-auto px-8 py-4 rounded-xl bg-gray-900/80 text-gray-200 hover:text-white font-bold text-base hover:bg-gray-800 transition-all border border-white/10 flex items-center justify-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>제공 서비스 둘러보기</span>
          </a>
        </div>
      </section>

      {/* Key Value Grid */}
      <section className="py-8 lg:py-12 px-4 lg:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-gray-900/60 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-2xl lg:text-4xl font-extrabold text-indigo-400 mb-1">2배 빠른</div>
            <div className="text-xs lg:text-sm text-gray-400 font-medium">MVP 개발 및 빠른 검증</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-2xl lg:text-4xl font-extrabold text-purple-400 mb-1">100%</div>
            <div className="text-xs lg:text-sm text-gray-400 font-medium">모바일 퍼스트 반응형 구현</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-2xl lg:text-4xl font-extrabold text-indigo-400 mb-1">안전한</div>
            <div className="text-xs lg:text-sm text-gray-400 font-medium">PG 결제 & 정기구독 연동</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-2xl lg:text-4xl font-extrabold text-emerald-400 mb-1">투명한</div>
            <div className="text-xs lg:text-sm text-gray-400 font-medium">개발 소스코드 완전 이전</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 px-4 lg:px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">WHAT WE BUILD</div>
          <h2 className="text-2xl lg:text-5xl font-extrabold text-white">태문 개발팀 제공 분야</h2>
          <p className="text-gray-400 text-xs lg:text-base mt-3">홈페이지 제작부터 모듈형 개발, 풀스택 앱 플랫폼까지 맞춤 지원합니다.</p>
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

      {/* Featured Portfolio Showcase (Dual Killer Portfolio Cards) */}
      <section id="portfolio" className="py-16 lg:py-24 px-4 lg:px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 lg:mb-12">
          <div>
            <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">FEATURED PROJECTS</div>
            <h2 className="text-2xl lg:text-5xl font-extrabold text-white">주요 개발 구축 사례</h2>
          </div>
          <p className="text-gray-400 text-xs lg:text-base max-w-md mt-3 lg:mt-0">
            기획자·개발자 간의 소통 오류 제로. 풀스택 총괄 아키텍트가 직접 1:1로 밀착 구축한 실제 운영 서비스입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: 태문브릿지 */}
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
                <span>태문브릿지 라이브 데모 열기</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: T-DOCS */}
          <div className="bg-gray-900/60 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
                  <span>T-DOCS (티독스)</span> • <span>스마트 전자서식 SaaS</span>
                </div>
                <span className="text-[11px] font-bold text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  SaaS 서비스
                </span>
              </div>

              <h3 className="text-xl lg:text-3xl font-bold text-white leading-snug">
                100% 법적 효력 카카오 모바일 전자서명 & AI 오피스 비서
              </h3>

              <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                견적서·계약서 23종 캔버스 모바일 작성, 카카오톡 3초 본인확인 모바일 전자서명, Gemini AI 비서 아라, 고성능 PDF 변환/출력 엔진을 탑재한 B2B SaaS 솔루션입니다.
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
                href="https://tdocs.taemun.co.kr" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs lg:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:opacity-90 transition-all"
              >
                <span>T-DOCS 라이브 데모 열기</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-16 lg:py-24 px-4 lg:px-6 max-w-7xl mx-auto relative z-10">
        <div className="bg-gray-900/70 backdrop-blur-md p-8 lg:p-16 rounded-3xl text-center relative border border-indigo-500/30">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl lg:text-5xl font-extrabold text-white">
              지금 바로 태문 개발팀과<br />
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                상담해 보세요.
              </span>
            </h2>
            <p className="text-gray-300 text-xs lg:text-base leading-relaxed">
              아이디어 단계부터 개발 외주, 기존 서비스 리팩토링까지 친절하게 안내해 드립니다.
            </p>

            <div className="pt-4 lg:pt-6 flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4">
              <a href="tel:010-8672-6463" className="w-full lg:w-auto flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 hover:border-indigo-400 transition-all">
                <PhoneCall className="w-5 h-5 text-indigo-400" />
                <div className="text-left">
                  <div className="text-[10px] text-indigo-300 uppercase font-bold">총괄 아키텍트 직통</div>
                  <div className="text-base lg:text-lg font-bold text-white">010-8672-6463</div>
                </div>
              </a>

              <a href="tel:1588-2622" className="w-full lg:w-auto flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <PhoneCall className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-bold">대표 전화</div>
                  <div className="text-base lg:text-lg font-bold text-white">1588-2622</div>
                </div>
              </a>

              <a href="mailto:contact@taemun.co.kr" className="w-full lg:w-auto flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-bold">이메일 문의</div>
                  <div className="text-base lg:text-lg font-bold text-white">contact@taemun.co.kr</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 lg:py-12 px-4 lg:px-6 border-t border-white/5 relative z-10 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-gray-400">태문 DEV STUDIO</span> • 대표전화: 1588-2622 • 이메일: contact@taemun.co.kr
          </div>
          <div>
            © 2026 TAEMUN DEV STUDIO. All rights reserved. (Domain: taemun.net)
          </div>
        </div>
      </footer>

      {/* Floating Interactive 1:1 Chat Widget */}
      <FloatingChatWidget />
    </div>
  );
}
