import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight, Play, Award, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onOpenSafetyModal: () => void;
  onScrollToProportion: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onOpenSafetyModal,
  onScrollToProportion,
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center bg-[#1A1817] text-white pt-24 pb-16 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#C5A880]/15 via-[#E8DDD4]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 lg:px-8 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#E8DDD4] text-[12px] font-medium tracking-wide mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>순우리말 프리미엄 메디컬 · 안면 심미 조화 센터</span>
        </div>

        {/* Meaning Explanatory Sub-badge */}
        <div className="text-[13px] text-[#C5A880] tracking-widest font-serif mb-3">
          ‘온새미로’ : 가르거나 쪼개지 않고 본래 모습 그대로
        </div>

        {/* Main Title */}
        <h1 className="text-[34px] lg:text-[58px] font-serif font-bold tracking-tight text-white leading-[1.25] mb-6">
          본연의 아름다움을 거스르지 않는<br />
          <span className="bg-gradient-to-r from-[#FFF] via-[#E8DDD4] to-[#C5A880] bg-clip-text text-transparent">
            자연스러움의 미학
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-[15px] lg:text-[17px] text-[#A69F97] leading-relaxed mb-10">
          누군가의 얼굴을 획일적으로 모방하지 않습니다.<br className="hidden lg:block" />
          풍부한 임상경험의 성형외과 전문의가 당신 고유의 이목구비 골격과 비율을 면밀히 분석하여,<br className="hidden lg:block" />
          가장 편안하고 기품 있는 1mm의 미세한 조화를 완성합니다.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onScrollToProportion}
            className="w-full lg:w-auto px-8 py-4 rounded-full text-[15px] font-bold text-[#1A1817] bg-gradient-to-r from-[#E8DDD4] to-[#C5A880] hover:brightness-105 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
          >
            <span>안면 황금비율 시뮬레이터 체험</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenConsultation}
            className="w-full lg:w-auto px-8 py-4 rounded-full text-[15px] font-medium text-[#E8DDD4] bg-white/5 border border-white/15 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span>프라이빗 1:1 비밀상담 신청</span>
          </button>
        </div>

        {/* Safety Trust Points Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-white">100% 실명 집도의제</div>
              <div className="text-[12px] text-[#A69F97] mt-0.5 leading-snug">
                상담부터 수술, 봉합까지 전문의가 직접 전담 (대리수술 원천 차단)
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-white">마취과 전문의 1:1 상주</div>
              <div className="text-[12px] text-[#A69F97] mt-0.5 leading-snug">
                수술 전 과정 활력징후 및 수면마취 심전도 실시간 전담 감시
              </div>
            </div>
          </div>

          <div
            onClick={onOpenSafetyModal}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#C5A880]/40 transition-colors flex items-start gap-3.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] shrink-0 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-white group-hover:text-[#C5A880] transition-colors flex items-center gap-1">
                <span>5대 안심 안전망 인증</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </div>
              <div className="text-[12px] text-[#A69F97] mt-0.5 leading-snug">
                보호자 CCTV 참관 및 UPS 무정전 전원, 10단계 클린룸 구비
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
