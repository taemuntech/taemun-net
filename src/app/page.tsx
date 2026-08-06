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
          <span>아이디어 스케치부터 프로덕션급 서비스까지 빠른 0→1 구축</span>
        </div>

        <h1 className="text-3xl lg:text-7xl font-extrabold tracking-tight mb-6 lg:mb-8 leading-snug lg:leading-tight">
          비즈니스의 성장을 이끄는<br />
          <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            고성능 웹·앱 솔루션
          </span>을 만듭니다.
        </h1>

        <p className="text-gray-400 text-sm lg:text-xl max-w-3xl mx-auto mb-10 lg:mb-12 font-normal leading-relaxed">
          맞춤형 홍보 랜딩페이지부터 전자서식 SaaS, PG 결제 연동, 대형 플랫폼까지.<br className="hidden lg:block" />
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
          <p className="text-gray-400 text-xs lg:text-base mt-3">필요한 기능만 쏙 빼서 빠르게 만드는 모듈형 개발부터 풀스택 플랫폼까지 지원합니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-gray-900/60 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-white">맞춤형 웹·앱 서비스</h3>
            <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
              고객 유입을 위한 고성능 랜딩페이지부터 매칭·커머스·예약 시스템 등 비즈니스 목적에 맞춘 플랫폼 구축.
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

      {/* Featured Portfolio Showcase */}
      <section id="portfolio" className="py-16 lg:py-24 px-4 lg:px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 lg:mb-12">
          <div>
            <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">FEATURED PROJECT</div>
            <h2 className="text-2xl lg:text-5xl font-extrabold text-white">주요 개발 구축 사례</h2>
          </div>
          <p className="text-gray-400 text-xs lg:text-base max-w-md mt-3 lg:mt-0">
            기획자·개발자 간의 소통 오류 제로. 풀스택 총괄 아키텍트가 직접 1:1로 밀착 구축합니다.
          </p>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-md p-6 lg:p-12 rounded-3xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <span>태문브릿지 B2B2C 플랫폼</span> • <span>Next.js 16</span> • <span>Supabase</span>
              </div>

              <h3 className="text-xl lg:text-4xl font-bold text-white leading-snug">
                매칭·계약·결제·교육·자재유통을 아우르는 풀스택 플랫폼
              </h3>

              <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                7단계 견적 라이프사이클과 23종 모바일 캔버스 서식, PG 빌링키 정기결제, RLS 암호화 보안까지 일관된 아키텍처로 직영 구축한 대형 서비스입니다.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <a href="https://taemun.co.kr" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs lg:text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:opacity-90">
                  <span>데모 서비스 열기</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-5 lg:p-6 rounded-2xl bg-gray-950 border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-white/10">
                  <span>핵심 시스템 모듈</span>
                  <span className="text-indigo-400 font-bold">100% 직영 개발</span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-gray-300">
                    <span>견적 및 서비스 매칭 엔진</span>
                    <span className="text-gray-400">7단계 라이프사이클</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>모바일 서식 & PDF 생성기</span>
                    <span className="text-gray-400">T-DOCS Engine</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>결제 & 자동갱신 시스템</span>
                    <span className="text-gray-400">PortOne & Toss Payments</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>데이터 보안 & RLS 권한</span>
                    <span className="text-gray-400">PostgreSQL</span>
                  </div>
                </div>
              </div>
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

            <div className="pt-4 lg:pt-6 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
              <div className="w-full lg:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                <PhoneCall className="w-5 h-5 text-indigo-400" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-bold">대표 전화</div>
                  <div className="text-base lg:text-lg font-bold text-white">1588-2622</div>
                </div>
              </div>

              <div className="w-full lg:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                <Mail className="w-5 h-5 text-indigo-400" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-bold">이메일 문의</div>
                  <div className="text-base lg:text-lg font-bold text-white">contact@taemun.co.kr</div>
                </div>
              </div>
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
