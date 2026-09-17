import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-4 right-4 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:max-w-md z-[70] bg-[#100e0d] text-[#fff8f4] px-5 py-3 rounded-xl shadow-2xl text-xs font-medium flex items-center gap-2.5 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none"
    >
      <span className="w-4 h-4 rounded-full bg-[#e9c176] text-[#100e0d] flex items-center justify-center shrink-0">
        <Check className="w-2.5 h-2.5 stroke-[3]" />
      </span>
      <span>{message}</span>
    </div>
  );
};
