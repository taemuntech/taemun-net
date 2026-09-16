import { ArrowRight, ShieldCheck, TrendingUp, Lock } from 'lucide-react';
import { BOARDROOM_IMG_URL } from '../data/investmentData';

interface HeroSectionProps {
  onOpenVdr: () => void;
}

export default function HeroSection({ onOpenVdr }: HeroSectionProps) {
  return (
    <section className="relative pt-8 lg:pt-16 pb-20 overflow-hidden" id="hero">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#f2ca50]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1680px] mx-auto px-6 lg:px-14">
        {/* Sovereign Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#161c24] border border-[#f2ca50]/30 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping" />
          <span className="font-mono-metric text-[11px] text-[#f2ca50] tracking-widest uppercase font-medium">
가상 브랜드 샘플 · 실제 운용사가 아닙니다 · 화면의 수치는 예시
          </span>
        </div>

        {/* Dual-Language Main Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="text-3xl lg:text-6xl font-serif-display text-[#dee2ef] tracking-tight leading-[1.1] mb-4">
              Engineering Enduring Value <br />
              <span className="gold-shimmer italic font-normal">Across Generations.</span>
            </h1>
            <p className="font-serif-display text-lg lg:text-xl text-[#d0c5af] font-normal tracking-wide">
              시대를 초월한 가치를 창조하는 글로벌 대체투자 파트너
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end gap-6">
            <p className="text-sm text-[#d0c5af]/90 border-l border-[#f2ca50]/40 pl-4 leading-relaxed">
              글로벌 기관투자자(LP)와 함께 바이아웃, 딥테크 그로쓰 에쿼티, 크로스보더 전략을 통해 시장을 상회하는 알파(Alpha)를 지속 창출합니다.
            </p>
            <div className="flex flex-col lg:flex-row gap-3">
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#f2ca50] hover:bg-[#e9c349] text-[#3c2f00] rounded text-xs font-semibold transition-all shadow-sm whitespace-nowrap"
              >
                <span>포트폴리오 투자 실적 보기</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#vdr"
                onClick={onOpenVdr}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#161c24] border border-[#f2ca50]/40 hover:border-[#f2ca50] text-[#f2ca50] rounded text-xs font-semibold transition-all whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>기관(LP) VDR 신청</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hero Boardroom Showcase Banner */}
        <div className="relative w-full rounded-xl overflow-hidden border border-[#4d4635]/40 group shadow-2xl bg-[#090e17]">
          <div className="relative w-full h-[360px] lg:h-[620px]">
            <img
              src={BOARDROOM_IMG_URL}
              alt="Seoul Investment Committee in closed session boardroom overlooking night skyline"
              className="w-full h-full object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e17] via-[#090e17]/30 to-transparent" />

            {/* Boardroom Metadata HUD Top Overlay */}
            <div className="absolute top-6 left-6 lg:top-8 lg:left-8 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#090e17]/85 backdrop-blur-md border border-[#f2ca50]/40 rounded font-mono-metric text-[11px] text-[#f2ca50]">
                <Lock className="w-3.5 h-3.5" />
                <span>SEOUL INVESTMENT COMMITTEE • CLOSED SESSION</span>
              </div>
              <div className="font-mono-metric text-[11px] text-[#d0c5af]/90 hidden lg:block tracking-wider">
                COGNIZANT MANDATE: FLAGSHIP BUYOUT &amp; DEEP-TECH VINTAGE VII
              </div>
            </div>

            {/* Boardroom HUD Bottom Overlay */}
            <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 flex flex-col lg:flex-row justify-between lg:items-end gap-4">
              <div>
                <span className="font-mono-metric text-[11px] text-[#f2ca50] block mb-1">
                  GLOBAL GOVERNANCE DISCRETION
                </span>
                <p className="font-serif-display text-lg lg:text-xl text-[#dee2ef] max-w-xl">
                  엄격한 리스크 헤징과 선제적 포트폴리오 가치 제고를 위한 최고 의결 기구
                </p>
              </div>
              <div className="flex items-center gap-3 bg-[#090e17]/90 backdrop-blur-md px-4 py-2 border border-[#4d4635]/40 rounded text-[11px] font-mono-metric">
                <span className="text-[#4edea3]">CONFIDENTIAL</span>
                <span className="text-[#99907c]">•</span>
                <span className="text-[#d0c5af]">QUORUM SATISFIED (예시)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Telemetry Metrics Bar (4-Stat Grid) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Stat 1 */}
          <div className="p-6 bg-[#161c24] border border-[#4d4635]/30 rounded-xl relative overflow-hidden group hover:border-[#f2ca50]/50 transition-all">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f2ca50]" />
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase">
                총 운용자산 (Total AUM)
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-mono-metric text-[11px] rounded">
                <TrendingUp className="w-3 h-3" /> YoY +18.4%
              </span>
            </div>
            <div className="font-mono-metric text-2xl lg:text-3xl text-[#dee2ef] font-semibold tracking-tight">
              ₩4.2조 <span className="text-lg text-[#f2ca50] font-normal">($3.2B+)</span>
            </div>
            <p className="text-xs text-[#d0c5af]/80 mt-2">
              글로벌 Sovereign Fund 및 최상위 연기금 위탁 자산
            </p>
          </div>

          {/* Stat 2 */}
          <div className="p-6 bg-[#161c24] border border-[#4d4635]/30 rounded-xl relative overflow-hidden group hover:border-[#f2ca50]/50 transition-all">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f2ca50]" />
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase">
                10개년 누적 순수익률 (Net IRR)
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-[#f2ca50]/15 text-[#f2ca50] font-mono-metric text-[11px] rounded font-medium">
                Top Quartile
              </span>
            </div>
            <div className="font-mono-metric text-2xl lg:text-3xl text-[#f2ca50] font-semibold tracking-tight">
              24.8% <span className="text-lg text-[#dee2ef] font-normal">Net</span>
            </div>
            <p className="text-xs text-[#d0c5af]/80 mt-2">
              성과보수 차감 후 LP 귀속 기준 (예시 수치)
            </p>
          </div>

          {/* Stat 3 */}
          <div className="p-6 bg-[#161c24] border border-[#4d4635]/30 rounded-xl relative overflow-hidden group hover:border-[#f2ca50]/50 transition-all">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f2ca50]" />
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase">
                평균 회수 배수 (Realized MoIC)
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-mono-metric text-[11px] rounded">
                DPI 1.82x
              </span>
            </div>
            <div className="font-mono-metric text-2xl lg:text-3xl text-[#dee2ef] font-semibold tracking-tight">
              3.4x <span className="text-lg text-[#4edea3] font-normal">MoIC</span>
            </div>
            <p className="text-xs text-[#d0c5af]/80 mt-2">
              18건의 경영권 엑싯 및 전략적 지분 매각 완료 기준
            </p>
          </div>

          {/* Stat 4 */}
          <div className="p-6 bg-[#161c24] border border-[#4d4635]/30 rounded-xl relative overflow-hidden group hover:border-[#f2ca50]/50 transition-all">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f2ca50]" />
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase">
                포트폴리오 기업 수 (Invested)
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-[#30353e] text-[#dee2ef] font-mono-metric text-[11px] rounded">
                유니콘 12개사
              </span>
            </div>
            <div className="font-mono-metric text-2xl lg:text-3xl text-[#dee2ef] font-semibold tracking-tight">
              48+ <span className="text-lg text-[#d0c5af] font-normal">Enterprises</span>
            </div>
            <p className="text-xs text-[#d0c5af]/80 mt-2">
              Active Value-Creation 생태계 파트너십
            </p>
          </div>
        </div>

        {/* 수치 고지 — 가상 브랜드 샘플이라 운용 규모·수익률은 전부 지어낸 예시다 */}
        <p className="mt-4 font-mono-metric text-[11px] text-[#d0c5af]/70">
          * 위 운용자산·수익률·회수 배수·포트폴리오 수는 모두 가상 설정의 예시 수치이며 실제 운용 실적이 아닙니다.
        </p>
      </div>
    </section>
  );
}
