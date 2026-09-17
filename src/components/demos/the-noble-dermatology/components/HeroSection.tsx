import React from 'react';
import { Calendar, ArrowRight, Verified, Award, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreMarkVu: () => void;
  onExploreSuite: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExploreMarkVu,
  onExploreSuite,
}) => {
  return (
    <section id="philosophy" className="relative w-full overflow-hidden bg-[#f5f3f0] py-16 lg:py-24 border-b border-[#eae8e5]">
      {/* Ambient Subtle Emerald & Champagne Glow Backgrounds */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#0d2820]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-[#ffdea7]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-8 relative z-10">
        {/* Top Eyebrow & Brand Crest */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efeeeb] text-[#745a2a] text-xs tracking-[0.25em] uppercase font-semibold border border-[#e4e2df]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#745a2a]" />
            Swiss Precision Anti-Aging & Bespoke Dermatology
          </span>
        </div>

        {/* Main Headline + Asymmetric Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic Monument */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="font-serif text-3xl lg:text-5xl lg:text-[56px] text-[#00110b] tracking-tight leading-[1.2] mb-6">
              시간의 흐름 위에<br />
              <span className="italic font-normal text-[#745a2a]">본연의 우아함</span>을 더하다<br />
              피부과 전문의 1:1 맞춤 안티에이징
            </h1>

            <p className="text-base lg:text-lg text-[#424845] max-w-xl leading-relaxed mb-8">
              국내 명문대(예시) 의대 출신 보건복지부 인증 피부과 전문의 3인 협진. 고객 대면 정품 인증 팁 즉석 개봉 및 전 과정 1인 독립 VIP 프라이빗 스위트 케어로 완벽한 안식과 정밀한 탄력 리프팅을 완성합니다.
            </p>

            {/* Action CTA Group */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 lg:px-8 py-4 rounded-lg bg-[#0d2820] text-[#ffffff] font-semibold text-sm lg:text-base shadow-xl hover:bg-[#00110b] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#ffdea7]" />
                <span>1:1 프라이빗 VIP 예약</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                type="button"
                onClick={onExploreMarkVu}
                className="inline-flex items-center gap-2 px-5 lg:px-6 py-4 rounded-lg bg-[#ffffff] text-[#00110b] font-semibold text-sm lg:text-base border border-[#eae8e5] shadow-sm hover:bg-[#efeeeb] transition-all duration-300 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#745a2a]" />
                <span>마크뷰 4광원 입체 진단 체험</span>
              </button>
            </div>

            {/* Official Partner Endorsement Ribbon */}
            <div className="mt-8 pt-6 border-t border-[#eae8e5]/60 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#424845]">
              <span className="flex items-center gap-1.5 text-[#00110b] font-medium">
                <Verified className="w-4 h-4 text-[#745a2a] shrink-0" />
                Solta Medical 써마지® FLX 공식 인증의원
              </span>
              <span className="text-[#c1c8c4] hidden lg:inline">•</span>
              <span className="flex items-center gap-1.5 text-[#00110b] font-medium">
                <Verified className="w-4 h-4 text-[#745a2a] shrink-0" />
                Merz 울쎄라® 골든 레코드 키닥터
              </span>
              <span className="text-[#c1c8c4] hidden lg:inline">•</span>
              <span className="flex items-center gap-1.5 text-[#00110b] font-medium">
                <Verified className="w-4 h-4 text-[#745a2a] shrink-0" />
                1인 1실 호텔형 독립 Suite
              </span>
            </div>
          </div>

          {/* Right Column: Visual Feature Dossier Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div
              onClick={onExploreSuite}
              className="group relative rounded-xl overflow-hidden shadow-2xl bg-[#ffffff] p-2 cursor-pointer transition-transform duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="relative h-[380px] lg:h-[460px] w-full rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  alt="Exquisite ultra-luxury dermatology private VIP treatment suite in Cheongdam Seoul."
                  src="/demo-media/the-noble-dermatology/the-noble-dermatology-01.jpg"
                 referrerPolicy="no-referrer" />

                {/* Gradient Scrim for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#00110b]/85 via-[#00110b]/25 to-transparent" />

                {/* Top Left Floating Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffffff]/95 backdrop-blur-md shadow-md text-[#00110b] text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#745a2a] animate-pulse" />
                  <span>독립형 1인 1실 프라이빗 동선 분리</span>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-[#ffffff]">
                  <p className="text-xs tracking-[0.2em] text-[#ffdea7] mb-1 uppercase font-semibold">
                    Suite No. 01 — The Noble Private Care Lounge
                  </p>
                  <h3 className="font-serif text-xl lg:text-2xl text-[#ffffff] leading-snug">
                    완벽한 프라이버시 속에서 완성되는<br />고품격 리프팅 스위트
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-[#ffffff]/80">
                    <span>다이슨 에어랩 & 라 메르 어메니티 완비</span>
                    <span className="text-[#ffdea7] flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                      상세보기 <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Floating Credential Card */}
            <div className="absolute -bottom-6 -left-6 hidden lg:flex items-center gap-3 p-4 rounded-xl bg-[#ffffff] shadow-xl backdrop-blur-md max-w-xs border border-[#eae8e5]">
              <div className="w-11 h-11 rounded-full bg-[#0d2820] flex items-center justify-center text-[#ffdea7] shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs lg:text-sm font-semibold text-[#00110b]">100% 국내 명문대(예시) 전문의 전담</div>
                <div className="text-xs text-[#424845]">대리 시술 0% 안심 보증제</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Bento Grid (4 Columns) */}
        <div className="mt-16 pt-8 grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#ffffff] border border-[#eae8e5] shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[#745a2a] font-serif text-4xl lg:text-5xl leading-none mb-2">3</div>
            <div className="text-sm lg:text-base font-semibold text-[#00110b] mb-1">Board-Certified Specialism</div>
            <p className="text-xs text-[#424845] leading-relaxed">
              보건복지부 인증 국내 명문대(예시) 의대 출신 피부과 전문의 3인 상주 및 심층 1:1 진료
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#ffffff] border border-[#eae8e5] shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[#745a2a] font-serif text-4xl lg:text-5xl leading-none mb-2">100%</div>
            <div className="text-sm lg:text-base font-semibold text-[#00110b] mb-1">Genuine Tip Certification</div>
            <p className="text-xs text-[#424845] leading-relaxed">
              써마지 FLX & 울쎄라 정품 팁 고객 대면 즉석 개봉 및 실시간 전산 시리얼 인증
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#ffffff] border border-[#eae8e5] shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[#745a2a] font-serif text-4xl lg:text-5xl leading-none mb-2">Private</div>
            <div className="text-sm lg:text-base font-semibold text-[#00110b] mb-1">Single-Suite Care</div>
            <p className="text-xs text-[#424845] leading-relaxed">
              다른 고객과 동선이 일절 겹치지 않는 호텔형 1인 전용 스위트룸 및 파우더룸
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#ffffff] border border-[#eae8e5] shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[#745a2a] font-serif text-4xl lg:text-5xl leading-none mb-2">
              0.1<span className="text-2xl font-sans">mm</span>
            </div>
            <div className="text-sm lg:text-base font-semibold text-[#00110b] mb-1">Mark-Vu Precision</div>
            <p className="text-xs text-[#424845] leading-relaxed">
              4가지 특수 광원 정밀 피부 데이터 기반 0.1mm 단위 오차 없는 과학적 리프팅 설계
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
