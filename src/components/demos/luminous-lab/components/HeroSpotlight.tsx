import React from 'react';
import { Zap, FileCheck, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HERO_PRODUCT } from '../data/mockData';

interface HeroSpotlightProps {
  onAddToCart: (item: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    imageUrl: string;
    optionText: string;
  }) => void;
  onOpenClinicalReport: () => void;
  onOpenCart: () => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  onAddToCart,
  onOpenClinicalReport,
  onOpenCart,
}) => {
  const handleDirectBuy = () => {
    onAddToCart({
      id: HERO_PRODUCT.id,
      name: '시카 엑소좀 수분 앰플 단독 리필 기획세트',
      price: HERO_PRODUCT.price,
      originalPrice: HERO_PRODUCT.originalPrice,
      imageUrl: HERO_PRODUCT.imageUrl,
      optionText: '본품 50ml + 에코 리필 파우치 50ml 증정',
    });
    onOpenCart();
  };

  return (
    <section id="hero-runway" className="relative overflow-hidden bg-gradient-to-b from-white via-[#f1f3ff]/40 to-[#f9f9ff] py-6 lg:py-12">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[650px] h-[320px] bg-[#85f8c4]/30 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left/Top Visual Showcase (7 cols on desktop) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden dew-glass-tier2 p-2 lg:p-3 shadow-xl border border-white">
              <div className="relative w-full aspect-[4/3] lg:aspect-[16/11] rounded-2xl overflow-hidden bg-[#f1f3ff]">
                <img
                  src={HERO_PRODUCT.imageUrl}
                  alt={HERO_PRODUCT.imageAlt}
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                {/* Floating Clinical Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#006948] text-[11px] font-bold shadow-sm border border-[#006948]/20">
                    <span className="w-2 h-2 rounded-full bg-[#006948] animate-ping" />
                    실시간 베스트 앰플 (예시)
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-medium tracking-wide">
                    클린 그린 등급 1 (자체 기준)
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-[12px] shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#85f8c4] fill-[#85f8c4]/20" />
                    <span>인체적용시험 완료 (예시 설정)</span>
                  </div>
                  <span className="text-[11px] bg-[#006948] text-white px-2.5 py-1 rounded-full font-bold shadow-sm">
                    48H 보습지속
                  </span>
                </div>
              </div>
            </div>

            {/* Hydration Meniscus Stat Bar below image */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {HERO_PRODUCT.clinicalStats.map((stat, idx) => (
                <div key={idx} className="dew-glass-tier1 rounded-xl p-3 text-center border border-gray-100">
                  <span className="block text-[11px] font-semibold text-[#3d4a42]">{stat.label}</span>
                  <span className="text-[18px] lg:text-[22px] font-extrabold text-[#006948] tracking-tight">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Spotlight & Commerce Actions (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
            {/* Badges Cluster */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#006948]/10 text-[#006948] text-[11px] font-bold border border-[#006948]/20">
                루미너스 어워즈 선정 (예시)
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#ff6b6b]/15 text-[#ae2f34] text-[11px] font-bold border border-[#ff6b6b]/30">
                당일·익일 배송 (예시 정책)
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#e1e8fd] text-[#3d4a42] text-[11px] font-bold">
                비건 처방 (예시 인증)
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-[#006948] tracking-wider uppercase">
                {HERO_PRODUCT.brandLabel}
              </span>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-[#141b2b] mt-1 leading-tight tracking-tight">
                8중 저분자 히알루론산 & 엑소좀 시카 — <br className="hidden lg:block" />
                무너진 장벽 48시간 밀착 리페어
              </h1>
              <p className="text-sm text-[#3d4a42] mt-2.5 leading-relaxed">
                {HERO_PRODUCT.description}
              </p>
            </div>

            {/* Price & Special Configuration */}
            <div className="dew-glass-tier1 rounded-2xl p-4 border border-[#bccac0]/40 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm font-bold text-[#141b2b]">단독 리필 기획 세트</span>
                <span className="text-[11px] font-bold text-[#ae2f34] bg-[#ffdad6] px-2 py-0.5 rounded-full">
                  {HERO_PRODUCT.stockWarning}
                </span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl lg:text-3xl font-extrabold text-[#ae2f34]">
                  {HERO_PRODUCT.discountRate}%
                </span>
                <span className="text-3xl font-extrabold text-[#141b2b]">
                  ₩{HERO_PRODUCT.price.toLocaleString()}
                </span>
                <span className="text-sm line-through text-[#6d7a72]">
                  ₩{HERO_PRODUCT.originalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-[#3d4a42]">
                구성: 시카 엑소좀 수분 앰플 본품 50ml + 에코 리필 파우치 50ml 증정
              </p>
            </div>

            {/* CTAs with Dew Meniscus Radial Sheen */}
            <div className="flex flex-col lg:flex-row gap-3 pt-1">
              <button
                onClick={handleDirectBuy}
                className="lg:flex-1 h-12 lg:h-[52px] bg-[#006948] hover:bg-[#00855d] active:scale-[0.98] text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#006948]/20 transition-all cursor-pointer specular-meniscus"
              >
                <Zap className="w-5 h-5 fill-white" />
                장바구니에 담고 주문 보기
              </button>
              <button
                onClick={onOpenClinicalReport}
                className="h-12 lg:h-[52px] px-6 bg-[#f1f3ff] hover:bg-[#e9edff] active:scale-[0.98] text-[#006948] border border-[#006948]/20 rounded-full font-bold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                임상 리포트 열람
              </button>
            </div>

            {/* Trust Micro-Proof */}
            <div className="flex items-center justify-between text-[12px] text-[#3d4a42] px-1 pt-0.5">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-[#006948]" />
                오후 4시 이전 주문 시 당일 출발 (예시)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#006948]" />
                피부 안심 환불 제도 (예시)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
