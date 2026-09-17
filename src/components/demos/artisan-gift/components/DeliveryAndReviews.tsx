import React, { useState } from 'react';
import { Calendar, Star } from 'lucide-react';
import { REVIEWS } from '../data';

/**
 * 희망 배송일은 **실제로 고를 수 있어야 한다.**
 * 예전에는 「예약 배송일 지정하기」 단추가 「샘플입니다」 안내창 하나를 띄우고 끝이었다 —
 * 날짜를 고르는 화면이 아예 없어서, 되는 것처럼 보이는 단추가 아무 것도 하지 않았다.
 */
export const DeliveryAndReviews: React.FC = () => {
  const [wishDate, setWishDate] = useState('');

  const wishDateLabel = (() => {
    if (!wishDate) return null;
    const [year, month, day] = wishDate.split('-');
    if (!year || !month || !day) return null;
    return `${year}년 ${Number(month)}월 ${Number(day)}일`;
  })();

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
              기념일 맞춤 희망일 예약 배송 시스템
            </h3>
            <p className="text-xs lg:text-sm text-[#FAF7F2]/80 mt-1 leading-relaxed">
              생일·기념일·승진 축하일 등 받으실 날짜를 미리 지정해 두면 장인의 공방에서 그 일정에 맞춰 출고를 준비합니다.
              (샘플 화면의 예시 기능입니다.)
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full lg:w-auto">
          <p className="text-[11px] text-[#FAF7F2]/70 mb-2 lg:text-right">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>
          <label
            htmlFor="artisan-wish-date"
            className="block text-[11px] font-semibold text-[#FFE07D] mb-1.5 lg:text-right"
          >
            받으실 희망 날짜
          </label>
          <input
            id="artisan-wish-date"
            type="date"
            value={wishDate}
            onChange={(event) => setWishDate(event.target.value)}
            className="w-full lg:w-auto min-h-11 px-4 py-2.5 bg-[#FAF7F2] text-[#3e1c06] text-xs lg:text-sm font-semibold rounded border border-[#583119] focus:outline-none focus:ring-2 focus:ring-[#FFE07D]"
          />
          <p
            aria-live="polite"
            className="text-[11px] text-[#FFE07D] mt-2 lg:text-right min-h-[16px]"
          >
            {wishDateLabel
              ? `${wishDateLabel} 출고 희망일로 화면에 표시했습니다 (샘플 표시)`
              : '날짜를 고르면 이 자리에 표시됩니다'}
          </p>
        </div>
      </div>

      {/* Verified Photo Reviews */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#83746c] uppercase">
            Unboxing Stories
          </span>
          <h2 className="text-2xl lg:text-3xl font-serif text-[#3e1c06] mt-1">
            받는 분의 감동으로 완성된 언박싱 후기 (예시)
          </h2>
          <p className="text-xs text-[#51443d] mt-1.5">
            아래 후기와 이름·수치는 화면 구성을 보여 주기 위한 예시이며 실제 고객 후기가 아닙니다.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:gap-3 mt-3 lg:mt-0 text-xs lg:text-sm">
          <span className="px-1.5 py-0.5 rounded bg-[#ebe8e3] text-[10px] font-semibold text-[#51443d] border border-[#d6c3ba]/60">
            예시 수치
          </span>
          <span className="font-bold text-[#3e1c06]">평균 만족도 4.96 / 5.0</span>
          <span className="text-[#d6c3ba]">|</span>
          <span className="text-[#83746c]">총 3,890건의 누적 리뷰 (예시 수치)</span>
        </div>
      </div>

      {/* 3 Review Cards */}
      {/* 태블릿(768)에서 한 열로 늘어지던 자리라 그리드 칸 수만 2열로 나눈다(UI 모드 경계는 lg 그대로) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <span className="text-[#3e1c06] font-medium">예시 후기 · 실제 구매 후기가 아닙니다</span>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
