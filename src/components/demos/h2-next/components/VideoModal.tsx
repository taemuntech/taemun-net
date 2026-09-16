import React, { useEffect } from 'react';
import { HERO_IMAGE_URL } from '../data/mockData';
import { PlayCircle, Close, Radio } from './Icons';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="videoModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#213145]/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#bcc9c6]/40 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b border-[#e5eeff] mb-4">
          <div className="flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-[#006398]" />
            <h3 className="text-lg font-bold text-[#0b1c30]">
              서남해 1.2GW 해상풍력 실증 단지 현장 아카이브
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="text-[#3d4947] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-[#eff4ff] cursor-pointer"
          >
            <Close className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Preview */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#0b1c30] flex items-center justify-center mb-4 border border-[#bcc9c6]/30">
          <img
            alt="Offshore Wind Array Preview"
            className="w-full h-full object-cover filter brightness-75 contrast-105"
            src={HERO_IMAGE_URL}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30 p-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#00685f]/80 backdrop-blur-md flex items-center justify-center mb-3 shadow-lg border border-white/20 animate-pulse">
              <Radio className="w-8 h-8 text-[#89f5e7]" />
            </div>
            <span className="text-lg font-semibold drop-shadow-sm">
              고해상도 실시간 4K 드론 피드 연결 중
            </span>
            <span className="font-mono text-xs text-[#d3e4fe] mt-1">
              현장 보안 프로토콜 승인 완료 • 전라남도 신안 해역
            </span>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 text-[11px] font-mono border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE FEED: 60 FPS • 2160p UHD</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-3 pt-2">
          <span className="font-mono text-[11px] text-[#6d7a77]">
            FPS: 60fps • 4K UHD Transmission • Subsea Cable Telemetry
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full lg:w-auto px-5 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-sm font-semibold cursor-pointer transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
