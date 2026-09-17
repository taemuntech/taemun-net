import React from 'react';
import { Calendar, Star } from 'lucide-react';
import { REVIEWS } from '../data';

interface DeliveryAndReviewsProps {
  onOpenDatePicker: () => void;
}

export const DeliveryAndReviews: React.FC<DeliveryAndReviewsProps> = ({ onOpenDatePicker }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-12 py-12 lg:py-20">
      {/* Scheduled Delivery Service Banner */}
      <div className="bg-[#3e1c06] text-[#FAF7F2] rounded-xl p-6 lg:p-8 mb-14 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md border border-[#583119]">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 flex items-center justify-center shrink-0">
            <Calendar className="w-7 h-7 text-[#FFE07D]" />
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-serif font-bold text-[#FAF7F2]">
              기념일 맞춤 희망일 안심 예약 배송 시스템
            </h3>
            <p className="text-xs lg:text-sm text-[#FAF7F2]/80 mt-1 leading-relaxed">
              소중한 생일, 기념일, 승진 축하일에 정확히 맞추어 장인의 공방에서 당일 출고되는 프리미엄 예약 배송을 지원합니다.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenDatePicker}
          className="shrink-0 px-5 py-2.5 bg-[#C84B31] text-white text-xs lg:text-sm font-semibold rounded hover:bg-[#a83b23] transition-colors shadow-sm"
        >
          예약 배송일 지정하기
        </button>
      </div>

      {/* Verified Photo Reviews */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#83746c] uppercase">
            Unboxing Stories
          </span>
          <h2 className="text-2xl lg:text-3xl font-serif text-[#3e1c06] mt-1">
            받는 분의 감동으로 완성된 고객 실구매 후기 (예시)
          </h2>
        </div>
        <div className="flex items-center gap-3 mt-3 lg:mt-0 text-xs lg:text-sm">
          <span className="font-bold text-[#3e1c06]">평균 만족도 4.96 / 5.0</span>
          <span className="text-[#d6c3ba]">|</span>
          <span className="text-[#83746c]">총 3,890건의 누적 리뷰</span>
        </div>
      </div>

      {/* 3 Review Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {REVIEWS.map((review) => (
          <div
            key={review.id}
            id={`review-card-${review.id}`}
            className="bg-[#fcf9f4] border border-[#d6c3ba]/50 rounded p-5 space-y-4 hover:border-[#583119] transition-colors shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[#ebe8e3] flex items-center justify-center text-xs font-bold text-[#3e1c06] border border-[#d6c3ba]/60">
                  {review.authorInitial}
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#3e1c06]">{review.author}</p>
                  <p className="text-[11px] text-[#83746c]">{review.options}</p>
                </div>
              </div>
              <div className="flex items-center text-[#C84B31] text-xs">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C84B31]" />
                ))}
              </div>
            </div>

            <p className="text-xs text-[#51443d] leading-relaxed">
              "{review.content}"
            </p>

            <div className="text-[11px] text-[#83746c] pt-2.5 border-t border-[#d6c3ba]/30 flex justify-between items-center">
              <span className="text-[#3e1c06] font-medium">인증된 구매자 후기</span>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
