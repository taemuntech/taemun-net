import React, { useId, useRef, useState } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface QuickActionBarProps {
  onScrollTo: (sectionId: string) => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ onScrollTo }) => {
  const [showKakaoModal, setShowKakaoModal] = useState(false);
  const kakaoDialogRef = useRef<HTMLDivElement>(null);
  const kakaoTitleId = useId();

  // Esc · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  useSampleDialog({
    open: showKakaoModal,
    onClose: () => setShowKakaoModal(false),
    dialogRef: kakaoDialogRef,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Quick Action Bar */}
      <aside
        aria-label="빠른 메뉴"
        className="fixed right-3 lg:right-6 bottom-6 lg:bottom-8 z-40 flex flex-col gap-2 lg:gap-2.5 items-center"
      >
        {/* Call Button — 샘플이라 걸 번호가 없다. 예약 구역으로 내려보낸다(하는 일과 이름을 맞춘다). */}
        <button
          type="button"
          onClick={() => onScrollTo('fast-track-section')}
          className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-surface-container-lowest text-primary shadow-lg hover:shadow-xl hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center border border-surface-container cursor-pointer"
          title="전화 상담 안내 (예약 구역으로 이동)"
          aria-label="전화 상담 안내 — 예약 구역으로 이동"
        >
          <span className="material-symbols-outlined text-[19px] lg:text-[22px]">call</span>
        </button>

        {/* Kakao Button */}
        <button
          type="button"
          onClick={() => setShowKakaoModal(true)}
          className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-[#FEE500] text-[#191919] shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center font-bold text-[14px] cursor-pointer"
          title="카카오톡 1:1 상담"
          aria-label="카카오톡 1:1 상담 안내 열기"
        >
          <span className="material-symbols-outlined text-[19px] lg:text-[22px]">chat</span>
        </button>

        {/* Fast-Track Booking */}
        <button
          type="button"
          onClick={() => onScrollTo('fast-track-section')}
          className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-primary text-on-primary shadow-lg hover:shadow-xl hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center cursor-pointer"
          title="원데이 당일 검사·수술 신청"
          aria-label="원데이 당일 검사·수술 신청 구역으로 이동"
        >
          <span className="material-symbols-outlined text-[19px] lg:text-[22px]">edit_calendar</span>
        </button>

        {/* Location / Directions */}
        <button
          type="button"
          onClick={() => onScrollTo('location-guide')}
          className="hidden lg:flex w-12 h-12 rounded-full bg-surface-container-lowest text-on-surface shadow-lg hover:shadow-xl hover:bg-surface-container-high transition-all items-center justify-center border border-surface-container cursor-pointer"
          title="오시는 길 안내"
          aria-label="오시는 길 안내 구역으로 이동"
        >
          <span className="material-symbols-outlined text-[22px]">pin_drop</span>
        </button>

        {/* Scroll To Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-surface-container-highest/90 backdrop-blur-md text-on-surface-variant hover:text-on-surface shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer"
          title="맨 위로 이동"
          aria-label="맨 위로 이동"
        >
          <span className="material-symbols-outlined text-[18px] lg:text-[20px]">arrow_upward</span>
        </button>
      </aside>

      {/* Kakao Consultation Modal */}
      {showKakaoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end lg:items-center justify-center p-0 lg:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowKakaoModal(false);
          }}
        >
          <div
            ref={kakaoDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={kakaoTitleId}
            tabIndex={-1}
            className="bg-surface-container-lowest rounded-t-3xl lg:rounded-3xl p-6 lg:p-8 w-full lg:max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-surface-container outline-none break-keep"
          >
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#FEE500] text-[#191919] flex items-center justify-center font-bold shrink-0">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </span>
                <span id={kakaoTitleId} className="font-headline-sm text-[16px] font-bold text-on-surface">
                  카카오톡 1:1 전담 상담
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowKakaoModal(false)}
                aria-label="안내 닫기"
                className="-mr-2 w-11 h-11 shrink-0 flex items-center justify-center rounded-lg text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-6 text-center">
              <div className="w-20 h-20 bg-surface-container-low rounded-2xl flex items-center justify-center mx-auto mb-4 border border-surface-container">
                <span className="material-symbols-outlined text-[42px] text-primary">qr_code_2</span>
              </div>
              <h4 className="font-headline-sm text-[17px] font-bold text-on-surface">
                @프라임스마트아이안과
              </h4>
              <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed">
                상담원 연결 가능 시간: 평일 09:30 ~ 19:30<br />
                검사 비용, 수술 일정, 수술 후 회복 기간 등 궁금하신 점을 전문 검안 상담사가 즉시 답변해 드립니다.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface-variant font-body-sm text-[12px] leading-relaxed">
                샘플 사이트입니다 — 이 채널은 실제로 열리지 않고, 입력하신 내용은 어디에도 전송되지 않습니다. 실제 사이트라면 이 자리에 병원의 카카오톡 채널이 연결됩니다.
              </div>
              <button
                type="button"
                onClick={() => setShowKakaoModal(false)}
                className="w-full py-3 min-h-[44px] rounded-xl bg-surface-container text-on-surface font-body-sm text-[13px] font-medium hover:bg-surface-container-high transition-all cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
