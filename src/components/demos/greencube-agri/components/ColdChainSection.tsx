import React from 'react';
import { COLD_CHAIN_STEPS, CLIENT_TIERS } from '../data/smartfarmData';

export const ColdChainSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#bccac0]/30" id="facilities">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006948]/10 border border-[#006948]/20 mb-3">
            <span className="material-symbols-outlined text-sm text-[#006948]">local_shipping</span>
            <span className="font-mono text-[11px] text-[#006948] font-semibold">
              FARM-TO-TABLE ULTRA-COLD-CHAIN
            </span>
          </div>
          <h2 className="font-headline text-2xl lg:text-[32px] text-[#131b2e] font-semibold tracking-tight">
            4시간 당일 수확·배송 원스톱 인프라
          </h2>
          <p className="font-body text-base lg:text-lg text-[#3d4a42] mt-2">
            수확 즉시 숨 쉬는 콜드체인 프로세스로 산화와 영양소 파괴를 줄여, 갓 수확한 신선함을 기업 클라이언트 식탁에 당일 공급하는 공정 구성입니다. (예시 수치)
          </p>
        </div>

        {/* 4-Step Cold-Chain Process Grid */}
        {/* 모바일/웹 경계는 그대로 lg 다. md 는 태블릿(768)에서 4단계가 한 장씩 늘어지던 걸 2열로 접는 중간 단계일 뿐이다. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
          {COLD_CHAIN_STEPS.map((stepItem, index) => {
            let stepBadgeBg = 'bg-[#006948]/10 text-[#006948]';
            let iconColor = 'text-[#006948]';

            if (index === 1) {
              stepBadgeBg = 'bg-[#00687a]/10 text-[#00687a]';
              iconColor = 'text-[#00687a]';
            } else if (index === 2) {
              stepBadgeBg = 'bg-[#006947]/10 text-[#006947]';
              iconColor = 'text-[#006947]';
            }

            return (
              <div
                key={stepItem.step}
                className="bg-[#faf8ff] p-6 rounded-xl border border-[#bccac0]/40 relative flex flex-col justify-between shadow-2xs hover:border-[#006948] transition-all group"
              >
                <div>
                  <div className="font-mono text-[11px] font-bold mb-3 flex items-center justify-between">
                    <span className={iconColor}>{stepItem.step}</span>
                    <span className={`px-2 py-0.5 rounded ${stepBadgeBg}`}>
                      {stepItem.time}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-lg bg-white border border-[#bccac0]/50 flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform">
                    <span className={`material-symbols-outlined text-2xl ${iconColor}`}>
                      {stepItem.icon}
                    </span>
                  </div>

                  <h4 className="font-headline text-base lg:text-lg font-semibold text-[#131b2e] mb-2">
                    {stepItem.title}
                  </h4>
                  <p className="font-body text-xs lg:text-sm text-[#3d4a42] leading-relaxed [word-break:keep-all]">
                    {stepItem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* B2B Enterprise Client Logos / Proof Ribbon */}
        <div className="bg-[#f2f3ff] rounded-2xl p-6 lg:p-8 border border-[#bccac0]/40 shadow-xs">
          <div className="text-center mb-6">
            <span className="font-mono text-[11px] text-[#6d7a72] uppercase font-semibold tracking-wider">
              공급 대상 기업 유형 (예시 — 실제 고객사가 아닙니다)
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 text-center">
            {CLIENT_TIERS.map((tier) => (
              <div
                key={tier.title}
                className="p-4 lg:p-5 bg-white rounded-xl border border-[#bccac0]/30 flex flex-col items-center justify-center shadow-2xs hover:border-[#006948] transition"
              >
                <span className={`material-symbols-outlined text-3xl mb-1 ${tier.color}`}>
                  {tier.icon}
                </span>
                <span className="font-mono text-[11px] lg:text-[12px] font-bold text-[#131b2e] mt-1 break-words">
                  {tier.title}
                </span>
                <span className="font-body text-[11px] lg:text-xs text-[#3d4a42] mt-0.5 [word-break:keep-all]">
                  {tier.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
