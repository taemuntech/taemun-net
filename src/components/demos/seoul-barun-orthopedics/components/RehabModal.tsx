import React, { useId, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { RehabEquipment } from '../types';

interface RehabModalProps {
  item: RehabEquipment | null;
  onClose: () => void;
  onBookRehab: (title: string) => void;
}

export const RehabModal: React.FC<RehabModalProps> = ({ item, onClose, onBookRehab }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  useSampleDialog({ open: item !== null, onClose, dialogRef });

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-xl bg-white rounded-t-2xl lg:rounded-2xl shadow-2xl border border-[#E9E8E5] overflow-hidden max-h-[90vh] flex flex-col outline-none"
      >
        {/* Top Image Banner */}
        <div className="relative h-48 lg:h-56 w-full bg-[#EFEEEB] overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover"  referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute top-4 right-4">
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#1A1C1A] flex items-center justify-center cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className={`inline-block text-[11px] px-2 py-0.5 rounded font-bold mb-1 ${item.badgeBg}`}>
              {item.badge}
            </span>
            <h3 id={titleId} className="text-lg lg:text-xl font-bold">{item.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 lg:p-6 overflow-y-auto space-y-4 text-sm text-[#3F493F]">
          <p className="leading-relaxed text-[#1A1C1A] bg-[#F4F3F1] p-3.5 rounded-xl text-xs lg:text-sm">
            {item.description}
          </p>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00652C] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>특화 치료 강점 및 프로토콜</span>
            </h4>
            <div className="space-y-2">
              {item.features?.map((f, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <span className="material-symbols-outlined text-[#00652C] text-[16px] mt-0.5">
                    check_circle
                  </span>
                  <span className="text-[#3F493F]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E9E8E5] flex items-center justify-between text-xs">
            <span className="text-[#545F73]">추천 적용 대상:</span>
            <span className="font-bold text-[#1A1C1A]">{item.targetCases}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EFEEEB] bg-[#FAF9F6] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-4 py-2.5 rounded-xl border border-[#E9E8E5] text-xs font-bold text-[#545F73] hover:bg-white cursor-pointer"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookRehab(item.title);
            }}
            className="min-h-11 px-5 py-2.5 rounded-xl bg-[#00652C] hover:bg-[#15803D] text-white text-xs lg:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>도수재활 상담 신청하기</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
