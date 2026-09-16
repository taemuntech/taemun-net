import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-[#1f2021] text-[#ffffff] hairline-all border-[#caf300] px-4 py-3 shadow-2xl flex items-center gap-3">
        <span className="material-symbols-outlined text-[#caf300] text-[18px]">check_circle</span>
        <span className="text-xs font-medium">{message}</span>
        <button
          onClick={onClose}
          className="text-[#8f9378] hover:text-[#ffffff] ml-2 text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
