import React from 'react';

interface ToastProps {
  message: string | null;
  subMessage?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, subMessage, onClose }) => {
  if (!message) return null;

  return (
    <div
      id="cart-toast"
      role="status"
      aria-live="polite"
      // 좁은 화면에서는 왼쪽 끝까지 붙여 상품명이 긴 알림도 잘리지 않게 한다
      className="fixed bottom-4 left-4 right-4 lg:bottom-6 lg:left-auto lg:right-6 lg:max-w-md z-50 transition-all duration-300"
    >
      <div className="bg-primary-container text-on-primary px-4 py-3.5 lg:px-5 rounded-xl shadow-2xl border border-primary-fixed/20 flex items-start gap-3">
        <span className="material-symbols-outlined text-secondary-fixed text-2xl shrink-0">
          check_circle
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-mono font-bold text-on-primary break-words" id="toast-title">
            {message}
          </div>
          <div className="text-[12px] text-on-primary-container break-words">
            {subMessage || '밤 11시 전 결제 시 내일 아침 7시 전 도착 예정 (예시 안내)'}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="알림 닫기"
          className="-mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-on-primary-container hover:text-on-primary"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  );
};
