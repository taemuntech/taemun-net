import React from 'react';
import { FLAGSHIP_PRODUCT, HERO_BG_IMAGE } from '../data/products';

interface HeroExpeditionProps {
  onOrderNow: () => void;
  onOpenPitchingGuide: () => void;
  onCompare: () => void;
  isComparing: boolean;
}

/** 히어로 수치 — 전부 지어낸 예시라서 구역 머리에 배지 한 개로 표시한다 */
const METRICS = [
  { label: '내수압 등급', value: '5,000mm', note: '폭풍우 차단 규격 (예시)', tone: 'text-primary' },
  { label: '내풍 안정성', value: '90 km/h', note: '풍속 25m/s 조건 설계 (예시)', tone: 'text-tertiary' },
  { label: '피칭 소요', value: '약 7분', note: '자립형 허브 폴 시스템', tone: 'text-secondary' },
  { label: '총 쉘터 중량', value: '4.8 kg', note: '동급 4인 돔 기준 경량 설계', tone: 'text-on-surface' },
];

export const HeroExpedition: React.FC<HeroExpeditionProps> = ({
  onOrderNow,
  onOpenPitchingGuide,
  onCompare,
  isComparing,
}) => {
  const price = FLAGSHIP_PRODUCT.price;
  const originalPrice = FLAGSHIP_PRODUCT.originalPrice ?? price;

  return (
    <section className="relative bg-surface-container-lowest border-b border-outline-variant overflow-hidden">
      <div className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center">
        <img
          alt="설산 능선에서 촬영한 노르딕 피크 바르그 4.2 지오데식 돔 텐트 (연출 이미지)"
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={HERO_BG_IMAGE}
          referrerPolicy="no-referrer"
        />
        {/* 글자가 사진 위에서 읽히도록 덮는 층 — 토큰이 아니라 실제 색으로 적는다 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/85 to-[#0B0F14]/35 lg:bg-gradient-to-r lg:from-[#0B0F14] lg:via-[#0B0F14]/85 lg:to-[#0B0F14]/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-16 w-full">
          <div className="max-w-2xl">
            {/* 사양 배지 — 실존 산·원정대의 「실전 인증」 같은 말은 쓰지 않는다 */}
            <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-3 py-1.5 rounded-sm bg-surface-container border border-outline text-primary font-label-mono-sm text-label-mono-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>EXPEDITION SPEC // NP-TENT-404-VARG</span>
              <span className="text-outline-variant">|</span>
              <span className="text-on-surface">동계 고산 필드 테스트 시나리오 (예시)</span>
            </div>

            <h1 className="font-headline-lg-mobile lg:font-display-hero text-headline-lg-mobile lg:text-display-hero text-on-surface font-bold tracking-tight mb-4 leading-tight [word-break:keep-all]">
              설산 칼바람 25m/s를 견디도록 설계한 구조미학 —
              <span className="text-primary block mt-1">
                NORDIC PEAK 「바르그 4.2」 지오데식 돔
              </span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed [word-break:keep-all]">
              히말라야·북유럽 동계 원정을 상정해 설계한 5라인 다이아몬드 지오데식 프레임워크입니다.
              눈보라 하중을 여러 폴대로 나누고, 영하 35℃ 급 돌풍 조건에서도 내부 온기와 기압 손실을
              줄이도록 구성했습니다. (예시 설명)
            </p>

            {/* 필드 지표 — 사진 위라서 상자는 불투명하게 둔다 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="bg-surface-container border border-outline-variant p-3 rounded-sm"
                >
                  <div className="font-label-mono-sm text-label-mono-sm text-outline uppercase">
                    {m.label}
                  </div>
                  <div className={`font-headline-sm text-headline-sm font-bold mt-0.5 ${m.tone}`}>
                    {m.value}
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">{m.note}</div>
                </div>
              ))}
            </div>

            {/* 가격·주문 */}
            <div className="bg-surface-container border-2 border-outline-variant p-4 lg:p-5 rounded-sm shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-tertiary-container text-on-tertiary font-label-mono-sm text-label-mono-sm font-bold px-2 py-0.5 rounded-sm">
                      20% 얼리버드 (예시)
                    </span>
                    <span className="line-through font-label-mono-sm text-label-mono-sm text-outline">
                      정가 ₩{originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-2 mt-1">
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                      ₩{price.toLocaleString()}
                    </span>
                    <span className="font-body-sm text-body-sm text-primary">
                      (12개월 할부 시 월 ₩115,000 · 예시)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={onOrderNow}
                    className="min-h-11 bg-tertiary-container hover:bg-tertiary text-on-tertiary font-label-mono-md text-label-mono-md px-5 py-3 rounded-sm font-bold flex items-center gap-2 transition-colors active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      local_shipping
                    </span>
                    <span>주문 신청서 열기</span>
                  </button>
                  <button
                    onClick={onOpenPitchingGuide}
                    className="min-h-11 bg-primary-container text-on-primary-container hover:bg-surface-container-highest px-4 py-3 rounded-sm font-label-mono-md text-label-mono-md font-semibold flex items-center gap-1.5 transition-colors border border-outline-variant cursor-pointer"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      architecture
                    </span>
                    <span>피칭 설계도 보기</span>
                  </button>
                  <button
                    onClick={onCompare}
                    aria-label="기어 스펙 비교표 열기"
                    className={`min-h-11 min-w-11 flex items-center justify-center p-3 border rounded-sm transition-colors cursor-pointer ${
                      isComparing
                        ? 'bg-primary text-on-primary border-primary'
                        : 'bg-surface-container-high border-outline-variant text-outline hover:text-on-surface hover:border-outline'
                    }`}
                    title="기어 스펙 비교표"
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
