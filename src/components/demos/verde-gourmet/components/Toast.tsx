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
      className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100"
    >
      <div className="bg-primary-container text-on-primary px-5 py-3.5 rounded-xl shadow-2xl border border-primary-fixed/20 flex items-center gap-3">
        <span className="material-symbols-outlined text-secondary-fixed text-2xl">
          check_circle
        </span>
        <div>
          <div className="text-xs font-mono font-bold text-on-primary" id="toast-title">
            {message}
          </div>
          <div className="text-[12px] text-on-primary-container">
            {subMessage || '밤 11시 전 결제 시 내일 아침 7시 도착!'}
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-on-primary-container hover:text-on-primary text-sm p-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
