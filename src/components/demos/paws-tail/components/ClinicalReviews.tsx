import React, { useState } from 'react';
import { PetParentReview } from '../types';

interface ClinicalReviewsProps {
  reviews: PetParentReview[];
}

export const ClinicalReviews: React.FC<ClinicalReviewsProps> = ({ reviews }) => {
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    const initial: Record<string, { count: number; liked: boolean }> = {};
    reviews.forEach((r) => {
      initial[r.id] = { count: r.likes, liked: false };
    });
    return initial;
  });

  const handleToggleLike = (id: string) => {
    setLikesState((prev) => {
      const current = prev[id] || { count: 0, liked: false };
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      };
    });
  };

  return (
    <section id="reviews" className="py-12 lg:py-20 bg-[#eff4ff] border-t border-[#bfc9c1]/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Doctor Endorsement Feature Banner */}
        <div className="bg-white border-2 border-[#0f5238]/30 rounded-2xl p-6 lg:p-10 mb-12 shadow-sm flex flex-col lg:flex-row items-center gap-8">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden shrink-0 border-4 border-[#b1f0ce] shadow-md">
            <img className="w-full h-full object-cover"
              alt="Professional portrait of a Korean veterinary clinical nutritionist"
              src="/demo-media/paws-tail/paws-tail-05.jpg"
             referrerPolicy="no-referrer"/>
          </div>

          <div className="space-y-3 flex-1 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="bg-[#0f5238] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                자문 수의사 코멘트 (예시)
              </span>
              <span className="text-base font-bold text-[#121c2a]">김민준 수의내과 전문 수의사</span>
              <span className="text-xs text-[#404943] font-medium">
                (수의과대학 임상영양학 외래 (예시))
              </span>
            </div>

            <p className="text-base lg:text-lg text-[#0f5238] font-semibold italic">
              "단백질원 단일화(Single Animal Protein)와 저분자 펩타이드 공법으로 눈물샘 염증과
              소화기 부담을 낮추는 것을 목표로 설계했습니다."
            </p>

            <p className="text-xs lg:text-sm text-[#404943] max-w-3xl leading-relaxed">
              "식이 알러지가 잦은 반려견에서는 복합 육류 단백질과 미검증 글루텐이 흔한 원인으로
              꼽힙니다. 포우즈 앤 테일은 알래스카 생연어 원육과 초록입홍합만을 기능성 배합해, 가상 급여
              시나리오 4주 차에 변 상태와 눈물 번짐이 나아지는 것을 목표로 설계했습니다. (예시 코멘트)"
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-[#bfc9c1]/60 pt-4 lg:pt-0 lg:pl-8">
            <div className="text-3xl lg:text-4xl font-black text-[#0f5238]">84.2%</div>
            <div className="text-xs text-[#404943] font-bold text-center mt-0.5">
              4주 내 눈물자국 호전율
            </div>
            <span className="text-[10px] text-[#707973] mt-1">* 가상 임상 환견 150두 대상 (예시 수치)</span>
          </div>
        </div>

        {/* Section Title for Parent Reviews */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[#0f5238] text-xs font-bold flex flex-wrap items-center gap-1.5">
              <span className="material-symbols-outlined text-base">rate_review</span>
              <span>PET PARENT REVIEWS</span>
              {/* 지어낸 후기다 — 구역 머리에 배지 한 개로 밝힌다 */}
              <span className="rounded-full bg-[#ffdcbb] px-2 py-0.5 text-[10px] font-bold text-[#2b1700]">
                예시 후기
              </span>
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#121c2a] tracking-tight">
              보호자 포토 리뷰 (예시)
            </h2>
          </div>

          <a
            href="#review-list"
            className="text-xs font-bold text-[#0f5238] hover:underline hidden lg:flex items-center gap-1 min-h-11"
          >
            <span>1,840건 리뷰 전체보기 (예시 수치)</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>

        {/* 3 Photo Review Cards — 위 「전체보기」 앵커가 여기로 내려온다(대상 없는 #reviews 였다) */}
        <div id="review-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => {
            const likeInfo = likesState[rev.id] || { count: rev.likes, liked: false };

            return (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-[#bfc9c1]/80 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-[#bfc9c1]/80 shadow-sm">
                        <img className="w-full h-full object-cover"
                          src={rev.image}
                          alt={rev.petName}
                         referrerPolicy="no-referrer"/>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#121c2a]">{rev.petName}</span>
                          <span className="material-symbols-outlined text-[#0f5238] text-sm">
                            verified
                          </span>
                        </div>
                        <p className="text-[11px] text-[#404943]">{rev.productFed}</p>
                      </div>
                    </div>

                    <div className="text-[#835418] text-sm tracking-wider">
                      {'★'.repeat(rev.rating)}
                    </div>
                  </div>

                  <p className="text-xs lg:text-sm text-[#121c2a] leading-relaxed mb-4">
                    {rev.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#bfc9c1]/40 text-xs text-[#404943]">
                  <span>{rev.author}</span>
                  <button
                    onClick={() => handleToggleLike(rev.id)}
                    className={`font-bold flex items-center gap-1 transition-colors px-2 min-h-11 rounded-lg ${
                      likeInfo.liked
                        ? 'text-[#0f5238] bg-[#b1f0ce]/40'
                        : 'text-[#404943] hover:text-[#0f5238]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs">thumb_up</span>
                    <span>{likeInfo.count}명 추천</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
