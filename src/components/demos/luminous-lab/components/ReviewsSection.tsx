import React from 'react';
import { Star, CheckCircle, Shield, Recycle, HelpCircle, HeartHandshake, Leaf, Headphones } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

interface ReviewsSectionProps {
  onOpenCounseling: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenCounseling }) => {
  return (
    <section id="reviews-section" className="py-12 bg-[#f1f3ff]/30 border-t border-[#bccac0]/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-extrabold text-[#006948] uppercase tracking-wider">
              Real Customer Verification
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#141b2b] mt-1 tracking-tight">
              실구매자 리얼 클린 리뷰 (예시 데이터)
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-lg font-bold text-[#141b2b]">
            <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
            <span>4.9 / 5.0</span>
          </div>
        </div>

        {/* Review Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="dew-glass-tier1 rounded-2xl p-5 border border-[#bccac0]/30 space-y-3.5 bg-white shadow-2xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-[#006948]/15 text-[#006948] font-bold flex items-center justify-center text-xs shadow-2xs">
                    {review.avatarText}
                  </span>
                  <div>
                    <span className="font-bold text-[#141b2b]">{review.author}</span>
                    <span className="text-[11px] text-[#6d7a72] ml-1.5">{review.skinProfile}</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#006948] font-bold bg-[#006948]/10 px-2 py-0.5 rounded-full">
                  {review.verifiedBadge}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex text-[#F59E0B] gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Comment text */}
              <p className="text-sm text-[#141b2b] leading-relaxed font-normal">
                {review.comment}
              </p>

              <span className="text-[11px] text-[#6d7a72] block pt-1 border-t border-gray-100 font-medium">
                구매옵션: {review.purchasedOption}
              </span>
            </div>
          ))}
        </div>

        {/* 4 Pillar Brand Promises */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-white text-center space-y-1.5 border border-[#bccac0]/30 shadow-2xs hover:border-[#006948] transition-colors">
            <HeartHandshake className="w-7 h-7 text-[#006948] mx-auto" />
            <h3 className="text-xs font-bold text-[#141b2b]">Cruelty-Free</h3>
            <p className="text-[11px] text-[#3d4a42]">동물 실험 및 동물성 원료 배제 (예시 설정)</p>
          </div>

          <div className="p-4 rounded-xl bg-white text-center space-y-1.5 border border-[#bccac0]/30 shadow-2xs hover:border-[#006948] transition-colors">
            <Leaf className="w-7 h-7 text-[#006948] mx-auto" />
            <h3 className="text-xs font-bold text-[#141b2b]">Eco Paper</h3>
            <p className="text-[11px] text-[#3d4a42]">친환경 인증 용지 &amp; 생분해 포장재 (예시)</p>
          </div>

          <div className="p-4 rounded-xl bg-white text-center space-y-1.5 border border-[#bccac0]/30 shadow-2xs hover:border-[#006948] transition-colors">
            <Recycle className="w-7 h-7 text-[#006948] mx-auto" />
            <h3 className="text-xs font-bold text-[#141b2b]">리필 공병 수거 캠페인</h3>
            <p className="text-[11px] text-[#3d4a42]">공병 반납 시 5,000P 즉시 리워드</p>
          </div>

          <button
            onClick={onOpenCounseling}
            className="p-4 rounded-xl bg-white text-center space-y-1.5 border border-[#bccac0]/30 shadow-2xs hover:border-[#006948] transition-colors cursor-pointer block w-full"
          >
            <Headphones className="w-7 h-7 text-[#006948] mx-auto" />
            <h3 className="text-xs font-bold text-[#141b2b]">1:1 더마 카운셀링</h3>
            <p className="text-[11px] text-[#006948] font-semibold underline">피부 전문가 온라인 무료 상담</p>
          </button>
        </div>
      </div>
    </section>
  );
};
