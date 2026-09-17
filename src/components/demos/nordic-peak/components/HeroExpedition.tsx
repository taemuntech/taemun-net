import React from 'react';
import { HERO_BG_IMAGE } from '../data/products';

interface HeroExpeditionProps {
  onOrderNow: () => void;
  onOpenPitchingGuide: () => void;
  onCompare: () => void;
  isComparing: boolean;
}

export const HeroExpedition: React.FC<HeroExpeditionProps> = ({
  onOrderNow,
  onOpenPitchingGuide,
  onCompare,
  isComparing,
}) => {
  return (
    <section className="relative bg-surface-container-lowest border-b border-outline-variant overflow-hidden">
      {/* Background Field Test Photo Hero Container */}
      <div className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center">
        {/* Hero Expedition Photo Asset */}
        <img
          alt="히말라야 능선 칼바람 속 NORDIC PEAK 바르그 4.2 지오데식 돔텐트 설산 필드 테스트"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85 brightness-95"
          src={HERO_BG_IMAGE} referrerPolicy="no-referrer" />
        {/* Technical Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-transparent lg:bg-gradient-to-r lg:from-surface lg:via-surface/85 lg:to-transparent"></div>
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none"></div>

        {/* Content Overlay Container */}
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-16 w-full">
          <div className="max-w-2xl">
            {/* Hardware Registry Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-container/90 border border-outline text-primary font-label-mono-sm text-label-mono-sm mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span>EXPEDITION SPEC // NP-TENT-404-VARG</span>
              <span className="text-outline-variant">|</span>
              <span className="text-on-surface">해발 5,895m K2 베이스캠프 실전 인증</span>
            </div>

            {/* Hero Headline in Polite Korean */}
            <h1 className="font-headline-lg-mobile lg:font-display-hero text-headline-lg-mobile lg:text-display-hero text-on-surface font-bold tracking-tight mb-4 leading-tight">
              설산 칼바람 25m/s를 견뎌내는 극한의 구조미학 —
              <span className="text-primary block mt-1">
                NORDIC PEAK '바르그 4.2' 지오데식 돔
              </span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
              히말라야 및 북유럽 동계 원정대의 생존을 위해 설계된 5라인 다이아몬드 지오데식 프레임워크. 눈보라의 하중을 분산시키고 영하 35℃의 돌풍 속에서도 내부의 온기와 기압을 완벽하게 수호합니다.
            </p>

            {/* Real-time Field Telemetry Metric Grid (4 Badges) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
              <div className="bg-surface-container/90 backdrop-blur-sm border border-outline-variant p-3 rounded-sm">
                <div className="font-label-mono-sm text-label-mono-sm text-outline uppercase">
                  내수압 등급
                </div>
                <div className="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">
                  5,000mm
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  폭풍우 완벽 차단 규격
                </div>
              </div>
              <div className="bg-surface-container/90 backdrop-blur-sm border border-outline-variant p-3 rounded-sm">
                <div className="font-label-mono-sm text-label-mono-sm text-outline uppercase">
                  내풍 안정성
                </div>
                <div className="font-headline-sm text-headline-sm text-tertiary-fixed font-bold mt-0.5">
                  90 km/h
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  풍속 25m/s 윈드터널 통과
                </div>
              </div>
              <div className="bg-surface-container/90 backdrop-blur-sm border border-outline-variant p-3 rounded-sm">
                <div className="font-label-mono-sm text-label-mono-sm text-outline uppercase">
                  피칭 속도
                </div>
                <div className="font-headline-sm text-headline-sm text-secondary font-bold mt-0.5">
                  단 7분
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  자립형 허브 폴 시스템
                </div>
              </div>
              <div className="bg-surface-container/90 backdrop-blur-sm border border-outline-variant p-3 rounded-sm">
                <div className="font-label-mono-sm text-label-mono-sm text-outline uppercase">
                  총 쉘터 중량
                </div>
                <div className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                  4.8 kg
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  동급 4인 돔 중 최경량
                </div>
              </div>
            </div>

            {/* Price & Order Action Bar */}
            <div className="bg-surface-container border-2 border-outline-variant p-4 lg:p-5 rounded-sm shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-tertiary-container text-on-tertiary font-label-mono-sm text-label-mono-sm font-bold px-2 py-0.5 rounded-sm">
                      20% 얼리버드
                    </span>
                    <span className="line-through font-label-mono-sm text-label-mono-sm text-outline">
                      정가 ₩1,725,000
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                      ₩1,380,000
                    </span>
                    <span className="font-body-sm text-body-sm text-primary">
                      (무이자 12개월 월 ₩115,000)
                    </span>
                  </div>
                </div>

                {/* CTA Operational Triggers */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={onOrderNow}
                    className="bg-tertiary-container hover:bg-tertiary hover:text-on-tertiary text-on-tertiary font-label-mono-md text-label-mono-md px-5 py-3 rounded-sm font-bold flex items-center gap-2 transition-colors active:scale-95 shadow-lg shadow-tertiary-container/30 cursor-pointer"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      local_shipping
                    </span>
                    <span>즉시 주문하기 (당일 발송)</span>
                  </button>
                  <button
                    onClick={onOpenPitchingGuide}
                    className="bg-primary-container text-on-primary-container hover:bg-surface-container-highest px-4 py-3 rounded-sm font-label-mono-md text-label-mono-md font-semibold flex items-center gap-1.5 transition-colors border border-outline-variant cursor-pointer"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      view_in_ar
                    </span>
                    <span>3D 피칭 가이드</span>
                  </button>
                  <button
                    onClick={onCompare}
                    className={`p-3 border rounded-sm transition-colors cursor-pointer ${
                      isComparing
                        ? 'bg-primary text-on-primary border-primary'
                        : 'bg-surface-container-high border-outline-variant text-outline hover:text-on-surface hover:border-outline'
                    }`}
                    title="기어 비교함 담기"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      compare_arrows
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
