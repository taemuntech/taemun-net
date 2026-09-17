import React from 'react';
import { CheckCircle2, Info, ShoppingBag, X } from 'lucide-react';
import { ToastInfo } from '../types';

interface ToastProps {
  toast: ToastInfo | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-24 lg:top-20 left-4 right-4 lg:left-auto z-50 max-w-sm lg:w-full animate-in slide-in-from-top-4 duration-300 pointer-events-auto"
    >
      <div className="bg-[#141b2b] text-white p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {toast.type === 'cart' ? (
            <div className="w-8 h-8 rounded-full bg-[#006948] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#006948] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
          <p className="text-xs font-semibold leading-snug">{toast.message}</p>
        </div>
        <button
          onClick={onDismiss}
          aria-label="알림 닫기"
          className="text-gray-400 hover:text-white w-11 h-11 -my-2 -mr-2 flex items-center justify-center rounded-full shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
