import React from 'react';

export const PillarsSection: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant text-left">
        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-4">
          <span className="material-symbols-outlined text-2xl">verified_user</span>
        </div>
        <h3 className="text-base font-bold text-primary mb-2">100% 환불 &amp; 신선도 보증</h3>
        <p className="text-[13px] text-on-surface-variant leading-relaxed">
          새벽에 받으신 식재료가 신선하지 않거나 배송 중 훼손되었다면 사진 한 장으로 즉시 100% 무료 교환 또는 환불해 드립니다.
        </p>
      </div>

      <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant text-left">
        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-4">
          <span className="material-symbols-outlined text-2xl">nest_eco_leaf</span>
        </div>
        <h3 className="text-base font-bold text-primary mb-2">친환경 올 페이퍼 패키징</h3>
        <p className="text-[13px] text-on-surface-variant leading-relaxed">
          비닐 테이프, 은박 스티로폼을 완전히 배제하고 FSC 인증 친환경 크라프트 보냉 상자와 종이 완충재만 사용합니다.
        </p>
      </div>

      <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant text-left">
        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-4">
          <span className="material-symbols-outlined text-2xl">agriculture</span>
        </div>
        <h3 className="text-base font-bold text-primary mb-2">생산자 직거래 상생 펀드</h3>
        <p className="text-[13px] text-on-surface-variant leading-relaxed">
          중간 유통 단계를 축소하여 농축수산가에는 정당한 대가를 지불하고, 소비자에게는 가장 합리적인 미식의 가치를 전합니다.
        </p>
      </div>
    </section>
  );
};
