import React from 'react';

interface SubscriptionBannerProps {
  onStartSubscription: () => void;
  onViewPerks: () => void;
}

export const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({
  onStartSubscription,
  onViewPerks,
}) => {
  return (
    <section className="bg-[#0f5238] text-white py-12 px-4 lg:px-8" id="subscription">
      <div className="max-w-7xl mx-auto rounded-2xl bg-[#2d6a4f] p-8 lg:p-12 shadow-xl border border-[#95d4b3]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center lg:text-left max-w-2xl">
          <span className="bg-[#fdbd77] text-[#784a0d] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            PAWS &amp; TAIL VET VIP SUBSCRIPTION
          </span>
          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
            매달 신선하게 제조된 처방식을 구독 유지 기간 15% 할인으로
          </h3>
          <p className="text-sm text-[#b1f0ce] opacity-95 leading-relaxed">
            배송 주기(2주/4주/6주) 자유 변경 가능 · 배송 전 알림 발송 · 수의사 1:1 건강 차트 갱신 (예시 구성)
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
          <button
            onClick={onStartSubscription}
            type="button"
            className="w-full lg:w-auto h-12 px-8 rounded-full bg-[#fdbd77] text-[#784a0d] text-sm font-bold hover:brightness-105 transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            정기배송 신청하기
          </button>
          <button
            onClick={onViewPerks}
            type="button"
            className="w-full lg:w-auto h-12 px-6 rounded-full bg-transparent border border-white text-white text-xs font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            혜택 자세히 보기
          </button>
        </div>
      </div>
    </section>
  );
};
