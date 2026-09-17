import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Calendar, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onGoToBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onGoToBooking }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showKakaoToast, setShowKakaoToast] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-5 lg:right-8 z-40 flex flex-col items-end gap-3">
      {showKakaoToast && (
        <div className="max-w-[calc(100vw-2.5rem)] bg-[#3C1E1E] text-[#FEE500] pl-4 pr-1 py-1.5 rounded-2xl text-xs font-semibold shadow-2xl border border-[#FEE500]/40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="break-keep">샘플 사이트라 상담 채널은 연결되지 않습니다 — 예약 폼으로 문의해 주세요</span>
          <button
            type="button"
            onClick={() => setShowKakaoToast(false)}
            aria-label="안내 닫기"
            className="w-11 h-11 flex items-center justify-center shrink-0 text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Action Buttons Stack */}
      <div className="flex flex-col gap-2.5">
        {/* Kakao Talk */}
        <button
          type="button"
          onClick={() => setShowKakaoToast((v) => !v)}
          aria-expanded={showKakaoToast}
          className="w-12 h-12 rounded-full bg-[#FEE500] text-[#3C1E1E] shadow-xl hover:scale-105 transition-transform flex items-center justify-center border border-black/5"
          title="상담 채널 안내"
          aria-label="상담 채널 안내"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </button>

        {/* Quick Phone Call — 샘플이라 실제로 걸리는 번호가 없다. 예약 폼으로 보낸다 */}
        <button
          type="button"
          onClick={onGoToBooking}
          className="w-12 h-12 rounded-full bg-[#775a19] text-white shadow-xl hover:scale-105 transition-transform flex items-center justify-center border border-white/20"
          title="전화 대신 온라인으로 문의하기"
          aria-label="전화 대신 온라인으로 문의하기"
        >
          <Phone className="w-5 h-5" />
        </button>

        {/* Quick Booking */}
        <button
          onClick={onGoToBooking}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#c5a059] to-[#775a19] text-white shadow-xl hover:scale-105 transition-transform flex items-center justify-center"
          title="온라인 간편예약 바로가기"
        >
          <Calendar className="w-5 h-5" />
        </button>

        {/* Scroll To Top */}
        {showTopBtn && (
          <button
            type="button"
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-white text-[#1a1c1a] shadow-lg border border-[#d1c5b4]/50 hover:bg-[#efeeeb] transition-all flex items-center justify-center self-end"
            title="맨 위로 가기"
            aria-label="맨 위로 가기"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
