import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    // 모바일에서 긴 문구가 화면 밖으로 삐져나가지 않게 좌우를 묶고 폭을 제한한다.
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-6 lg:bottom-6 z-[70] animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <div className="bg-[#1f2021] text-[#ffffff] hairline-all border-[#caf300] pl-4 pr-1 py-2 shadow-2xl flex items-center gap-2 lg:max-w-sm lg:ml-auto">
        <span className="material-symbols-outlined text-[#caf300] text-[18px] shrink-0">check_circle</span>
        <span className="text-xs font-medium min-w-0 break-keep">{message}</span>
        <button
          onClick={onClose}
          className="text-[#8f9378] hover:text-[#ffffff] text-xs w-11 h-11 flex items-center justify-center shrink-0 cursor-pointer"
          aria-label="알림 닫기"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
