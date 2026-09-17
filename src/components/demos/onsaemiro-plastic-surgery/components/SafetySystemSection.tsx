import React from 'react';
import { ShieldCheck, UserCheck, Activity, Video, Zap, Check, ArrowRight } from 'lucide-react';
import { SAFETY_PROTOCOLS } from '../data/clinicData';

interface SafetySystemSectionProps {
  onOpenSafetyModal: () => void;
}

export const SafetySystemSection: React.FC<SafetySystemSectionProps> = ({
  onOpenSafetyModal,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return UserCheck;
      case 'Activity': return Activity;
      case 'Video': return Video;
      case 'Zap': return Zap;
      default: return ShieldCheck;
    }
  };

  return (
    <section id="safety" className="py-20 lg:py-28 bg-[#1A1817] text-white relative">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/30 text-[#E8DDD4] text-[12px] font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>안전 최우선 진료 원칙</span>
          </div>
          <h2 className="text-[28px] lg:text-[40px] font-serif font-bold text-white leading-tight mb-4">
            어떤 순간에도 타협하지 않는<br />
            <span className="bg-gradient-to-r from-[#FFF] via-[#E8DDD4] to-[#C5A880] bg-clip-text text-transparent">
              5대 무결점 환자 안심 시스템
            </span>
          </h2>
          <p className="text-[15px] text-[#A69F97] leading-relaxed">
            성형의 기본은 안전입니다. 온새미로는 대학병원급 첨단 감시 장비와 안심 절차를 구축하여<br className="hidden lg:block" />
            수술의 처음부터 끝까지 환자와 가족 모두가 안심할 수 있는 환경을 만듭니다.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {SAFETY_PROTOCOLS.slice(0, 3).map((item) => {
            const IconComp = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 hover:border-[#C5A880]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] mb-6 group-hover:scale-105 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-[19px] font-bold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <div className="text-[13px] text-[#C5A880] font-medium mb-4">
                    {item.subtitle}
                  </div>
                  <p className="text-[14px] text-[#A69F97] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[12px] text-[#D3CBC3]">
                      <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom 2 Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {SAFETY_PROTOCOLS.slice(3, 5).map((item) => {
            const IconComp = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 hover:border-[#C5A880]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] mb-6 group-hover:scale-105 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-[19px] font-bold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <div className="text-[13px] text-[#C5A880] font-medium mb-4">
                    {item.subtitle}
                  </div>
                  <p className="text-[14px] text-[#A69F97] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[12px] text-[#D3CBC3]">
                      <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-white/10 via-[#C5A880]/15 to-white/5 border border-[#C5A880]/30 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[17px] font-bold text-white mb-1">
              투명하고 정직한 수술 환경을 약속드립니다
            </div>
            <div className="text-[13px] text-[#A69F97]">
              수술 전 동의서 작성 시 담당 전문의 실명제 및 안심 CCTV 모니터링 확인 절차를 거칩니다.
            </div>
          </div>
          <button
            onClick={onOpenSafetyModal}
            className="w-full lg:w-auto px-6 py-3 rounded-full text-[13px] font-bold text-[#1A1817] bg-gradient-to-r from-[#E8DDD4] to-[#C5A880] hover:brightness-105 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>5대 안전망 정밀 인증서 열람</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
