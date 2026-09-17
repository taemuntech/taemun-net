import React, { useState } from 'react';

interface QuickActionBarProps {
  onScrollTo: (sectionId: string) => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ onScrollTo }) => {
  const [showKakaoModal, setShowKakaoModal] = useState(false);

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
        {/* Call Button */}
        <a
          href="#fast-track-section"
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-surface-container-lowest text-primary shadow-lg hover:shadow-xl hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center border border-surface-container"
          title="전화 상담 02-0000-0000"
        >
          <span className="material-symbols-outlined text-[19px] lg:text-[22px]">call</span>
        </a>

        {/* Kakao Button */}
        <button
          type="button"
          onClick={() => setShowKakaoModal(true)}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#FEE500] text-[#191919] shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center font-bold text-[14px] cursor-pointer"
          title="카카오톡 1:1 상담"
        >
          <span className="material-symbols-outlined text-[19px] lg:text-[22px]">chat</span>
        </button>

        {/* Fast-Track Booking */}
        <button
          type="button"
          onClick={() => onScrollTo('fast-track-section')}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary text-on-primary shadow-lg hover:shadow-xl hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center cursor-pointer"
          title="원데이 당일 검사·수술 신청"
        >
          <span className="material-symbols-outlined text-[19px] lg:text-[22px]">edit_calendar</span>
        </button>

        {/* Location / Directions */}
        <button
          type="button"
          onClick={() => onScrollTo('location-guide')}
          className="hidden lg:flex w-12 h-12 rounded-full bg-surface-container-lowest text-on-surface shadow-lg hover:shadow-xl hover:bg-surface-container-high transition-all items-center justify-center border border-surface-container cursor-pointer"
          title="오시는 길 안내"
        >
          <span className="material-symbols-outlined text-[22px]">pin_drop</span>
        </button>

        {/* Scroll To Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-surface-container-highest/90 backdrop-blur-md text-on-surface-variant hover:text-on-surface shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer"
          title="맨 위로 이동"
        >
          <span className="material-symbols-outlined text-[18px] lg:text-[20px]">arrow_upward</span>
        </button>
      </aside>

      {/* Kakao Consultation Modal */}
      {showKakaoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 max-w-md w-full shadow-2xl border border-surface-container animate-scaleIn break-keep">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#FEE500] text-[#191919] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </span>
                <span className="font-headline-sm text-[16px] font-bold text-on-surface">
                  카카오톡 1:1 전담 안심 상담
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowKakaoModal(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface cursor-pointer"
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
              <button
                type="button"
                onClick={() => {
                  alert('카카오톡 상담 채널(@프라임스마트아이안과)로 연결되었습니다.');
                  setShowKakaoModal(false);
                }}
                className="w-full py-3.5 rounded-xl bg-[#FEE500] text-[#191919] font-headline-sm text-[14px] font-bold hover:brightness-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>카카오톡으로 바로 1:1 상담 시작</span>
              </button>
              <button
                type="button"
                onClick={() => setShowKakaoModal(false)}
                className="w-full py-3 rounded-xl bg-surface-container text-on-surface font-body-sm text-[13px] font-medium hover:bg-surface-container-high transition-all"
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
