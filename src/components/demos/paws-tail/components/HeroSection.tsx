import React from 'react';

interface HeroSectionProps {
  onStartSubscription: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartSubscription }) => {
  const scrollToKibble = () => {
    const el = document.getElementById('kibble-detail');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#eff4ff] overflow-hidden py-8 lg:py-16 border-b border-[#bfc9c1]/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4 lg:gap-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-white border border-[#0f5238]/20 px-3.5 py-1.5 rounded-full text-[#0f5238] text-xs font-semibold shadow-sm">
              <span className="material-symbols-outlined text-sm text-[#0f5238]">
                clinical_notes
              </span>
              <span>수의학 임상영양 전문의 (예시) 감수 포뮬러</span>
            </div>

            <h1 className="text-2xl lg:text-5xl lg:text-5xl text-[#121c2a] font-bold tracking-tight leading-tight lg:leading-[1.2]">
              수의사가 설계한{' '}
              <span className="text-[#0f5238] underline decoration-[#fdbd77] decoration-4 underline-offset-4">
                프리미엄 휴먼그레이드
              </span>{' '}
              식탁 — PAWS &amp; TAIL VET '알래스카 생연어 &amp; 시그니처 바프'
            </h1>

            <p className="text-sm lg:text-base text-[#404943] max-w-2xl leading-relaxed">
              곡물 걱정을 덜어낸 생육 65%와 자연 유래 수퍼푸드로 완성한 맞춤 레시피. 4주 급여 후
              눈물자국 84% 개선 (가상 급여 시나리오 · 예시 수치). 자연 친화적 클린 공정으로 생산됩니다.
            </p>

            {/* 4 Key Clinical Badges */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xl my-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#bfc9c1]/70 shadow-sm">
                <span className="material-symbols-outlined text-[#0f5238] text-xl">
                  verified_user
                </span>
                <span className="text-xs lg:text-sm font-bold text-[#121c2a]">
                  AAFCO 영양 가이드라인 참고 배합 (예시 표기)
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#bfc9c1]/70 shadow-sm">
                <span className="material-symbols-outlined text-[#835418] text-xl">set_meal</span>
                <span className="text-xs lg:text-sm font-bold text-[#121c2a]">
                  휴먼그레이드 순수 원육 65%
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#bfc9c1]/70 shadow-sm">
                <span className="material-symbols-outlined text-[#0f5238] text-xl">science</span>
                <span className="text-xs lg:text-sm font-bold text-[#121c2a]">
                  소화흡수율 92.4% (예시 수치)
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#bfc9c1]/70 shadow-sm">
                <span className="material-symbols-outlined text-[#ba1a1a] text-xl">block</span>
                <span className="text-xs lg:text-sm font-bold text-[#121c2a]">
                  20가지 보존제·감미료 ZERO
                </span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full lg:w-auto pt-2">
              <button
                onClick={onStartSubscription}
                className="h-12 px-7 rounded-full bg-[#0f5238] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#2d6a4f] transition-all hover:shadow-lg active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">autorenew</span>
                <span>우리 아이 맞춤 식단 정기구독 시작 (15% OFF)</span>
              </button>

              <button
                onClick={scrollToKibble}
                className="h-12 px-6 rounded-full bg-white border border-[#0f5238] text-[#0f5238] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#dee9fc] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">view_in_ar</span>
                <span>키블 실측 크기 비교 보기</span>
              </button>
            </div>

            {/* Proof Quote Micro Tag */}
            <div className="flex items-center gap-3 pt-2 text-[#404943] text-xs">
              <div className="flex -space-x-1.5">
                <span className="w-6 h-6 rounded-full bg-[#b1f0ce] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#0f5238]">
                  ★
                </span>
                <span className="w-6 h-6 rounded-full bg-[#ffdcbb] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#835418]">
                  ★
                </span>
                <span className="w-6 h-6 rounded-full bg-[#ffdcc4] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#703800]">
                  ★
                </span>
              </div>
              <span>
                누적 급여 만족도 <strong className="text-[#121c2a]">4.9/5.0</strong> (임상 데이터
                18,420견 누적 (예시 수치))
              </span>
            </div>
          </div>

          {/* Right Hero Image (5 Cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] lg:aspect-auto">
              <img className="w-full h-full object-cover"
                alt="A golden retriever dog and a calm British shorthair cat sitting together attentively beside a modern ceramic pet bowl overflowing with fresh raw salmon chunks, vibrant blueberries, diced orange carrots, fresh parsley, and natural functional kibbles in a sunlit warm minimalist living room with soft cream and sage green home accents."
                src="/demo-media/paws-tail/paws-tail-06.jpg"
               referrerPolicy="no-referrer"/>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#bfc9c1]/60 flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-xs font-bold text-[#121c2a]">알래스카 자연산 생연어 레시피</p>
                  <p className="text-[11px] text-[#404943]">오메가-3 EPA/DHA 3,200mg/kg 함유</p>
                </div>
                <span className="px-2.5 py-1 bg-[#0f5238] text-white rounded-full text-[10px] font-bold">
                  임상 처방식
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
