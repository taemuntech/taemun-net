import ParticleCanvas from "@/components/ParticleCanvas";
import { 
  ArrowRight, 
  CreditCard, 
  FileText, 
  Layers, 
  Layout, 
  Mail, 
  PhoneCall 
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Interactive Glowing Swarm Canvas Background */}
      <ParticleCanvas />

      {/* Background Ambient Lighting */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-purple-600/15 blur-[140px] pointer-events-none rounded-full"></div>

      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-950/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-500/25">
              TM
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              태문 <span className="text-indigo-400 text-sm font-semibold tracking-normal ml-1">DEV STUDIO</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#services" className="hover:text-white transition-colors">개발 서비스</a>
            <a href="#portfolio" className="hover:text-white transition-colors">포트폴리오 & 사례</a>
            <a href="#contact" className="hover:text-white transition-colors">외주/개발 문의</a>
          </nav>

          <a href="#contact" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/15 backdrop-blur-md transition-all flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-indigo-400" />
            <span>1588-2622</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>아이디어 스케치부터 프로덕션급 서비스까지 빠른 0→1 구축</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          비즈니스의 성장을 이끄는<br />
          <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            고성능 웹·앱 솔루션
          </span>을 만듭니다.
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 font-normal leading-relaxed">
          맞춤형 홍보 랜딩페이지부터 전자서식 SaaS, PG 결제 연동, 대형 플랫폼까지.<br className="hidden md:block" />
          타 개발사 대비 압도적인 개발 속도와 완성도로 비즈니스를 현실로 만듭니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:opacity-90 transition-all flex items-center justify-center gap-2 group">
            <span>프로젝트 견적 문의하기</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#services" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-900/80 text-gray-200 hover:text-white font-bold text-base hover:bg-gray-800 transition-all border border-white/10 flex items-center justify-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>제공 서비스 둘러보기</span>
          </a>
        </div>
      </section>

      {/* Key Value Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-indigo-400 mb-1">2배 빠른</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium">MVP 개발 및 빠른 검증</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-purple-400 mb-1">100%</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium">모바일 퍼스트 반응형 구현</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-indigo-400 mb-1">안전한</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium">PG 결제 & 정기구독 연동</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-1">투명한</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium">개발 소스코드 완전 이전</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">WHAT WE BUILD</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">태문 개발팀 제공 분야</h2>
          <p className="text-gray-400 text-sm md:text-base mt-4">필요한 기능만 쏙 빼서 빠르게 만드는 모듈형 개발부터 풀스택 플랫폼까지 지원합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900/60 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">맞춤형 웹·앱 서비스</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              고객 유입을 위한 고성능 랜딩페이지부터 매칭·커머스·예약 시스템 등 비즈니스 목적에 맞춘 플랫폼 구축.
            </p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">전자서식 & 캔버스 솔루션</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              견적서·계약서·확인서 모바일 작성, PDF/PNG 자동 스냅샷, 카카오톡 알림톡 결합 서명 모듈 개발.
            </p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">PG 결제 & 구독 빌링</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              신용카드 단건 결제부터 빌링키 정기 구독 결제, 바우처/포인트 복합 결제 및 취소·환불 자동화 구축.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Portfolio Showcase */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">FEATURED PROJECT</div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">주요 개발 구축 사례</h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-md mt-4 md:mt-0">
            복잡한 대형 프로젝트도 단 한 사람이 설계하고 완성할 수 있는 높은 수준의 기술력을 보여줍니다.
          </p>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <span>태문브릿지 B2B2C 플랫폼</span> • <span>Next.js 16</span> • <span>Supabase</span>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold text-white leading-snug">
                매칭·계약·결제·교육·자재유통을 아우르는 풀스택 플랫폼
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed">
                7단계 견적 라이프사이클과 23종 모바일 캔버스 서식, PG 빌링키 정기결제, RLS 암호화 보안까지 일관된 아키텍처로 직영 구축한 대형 서비스입니다.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <a href="https://taemun.co.kr" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:opacity-90">
                  <span>데모 서비스 열기</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-gray-950 border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-white/10">
                  <span>핵심 시스템 모듈</span>
                  <span className="text-indigo-400 font-bold">100% 직영 개발</span>
                </div>
                <div className="space-y-2 text-xs">
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
                    <span className="text-gray-400">PortOne V2</span>
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
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="bg-gray-900/70 backdrop-blur-md p-10 md:p-16 rounded-3xl text-center relative border border-indigo-500/30">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
              지금 바로 태문 개발팀과<br />
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                상담해 보세요.
              </span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              아이디어 단계부터 개발 외주, 기존 서비스 리팩토링까지 친절하게 안내해 드립니다.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                <PhoneCall className="w-5 h-5 text-indigo-400" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-bold">대표 전화</div>
                  <div className="text-lg font-bold text-white">1588-2622</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                <Mail className="w-5 h-5 text-indigo-400" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-bold">이메일 문의</div>
                  <div className="text-lg font-bold text-white">contact@taemun.co.kr</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 relative z-10 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-gray-400">태문 DEV STUDIO</span> • 대표전화: 1588-2622 • 이메일: contact@taemun.co.kr
          </div>
          <div>
            © 2026 TAEMUN DEV STUDIO. All rights reserved. (Domain: taemun.net)
          </div>
        </div>
      </footer>
    </div>
  );
}
