import React, { useEffect } from 'react';
import { CheckCircle, FileText, Download, Close } from './Icons';

export interface ToastData {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'download' | 'info';
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'download':
        return <Download className="w-5 h-5 text-[#89f5e7]" />;
      case 'info':
        return <FileText className="w-5 h-5 text-[#93ccff]" />;
      default:
        return <CheckCircle className="w-5 h-5 text-[#89f5e7]" />;
    }
  };

  return (
    <div
      id="toastNotification"
      className="fixed bottom-6 right-6 z-50 bg-[#213145] text-white px-5 py-4 rounded-xl shadow-2xl border border-[#bcc9c6]/30 flex items-start gap-3.5 max-w-md animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="mt-0.5 flex-shrink-0">{getIcon()}</div>
      <div className="flex-grow">
        <h5 id="toastTitle" className="text-sm font-bold text-white">
          {toast.title}
        </h5>
        <p id="toastMsg" className="text-xs text-[#cbdbf5] mt-0.5 leading-relaxed">
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-[#bcc9c6] hover:text-white p-1 rounded-md transition-colors"
        aria-label="닫기"
      >
        <Close className="w-4 h-4" />
      </button>
    </div>
  );
};
