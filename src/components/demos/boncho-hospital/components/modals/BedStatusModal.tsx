import React, { useRef, useState } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { AVAILABLE_HARMONY, AVAILABLE_ROYAL, BED_ROOMS } from '../../data/hospitalData';
import { RoomType } from '../../types';

interface BedStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBed: (roomType: RoomType, roomNumber: string) => void;
}

export const BedStatusModal: React.FC<BedStatusModalProps> = ({
  isOpen,
  onClose,
  onSelectBed,
}) => {
  const [filter, setFilter] = useState<'all' | 'single' | 'double'>('all');
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기 (샘플 공용 훅)
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const filteredRooms = BED_ROOMS.filter((r) => {
    if (filter === 'single') return r.type === 'royal';
    if (filter === 'double') return r.type === 'harmony';
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end lg:items-center justify-center p-0 lg:p-6 animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="boncho-bed-title"
        tabIndex={-1}
        className="bg-[#faf9f6] w-full max-w-[850px] rounded-t-2xl lg:rounded-2xl overflow-hidden shadow-2xl border border-[#e3e2e0] flex flex-col max-h-[92vh] outline-none"
      >
        {/* Header */}
        <div className="p-4 lg:px-6 bg-[#102a20] text-white flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[#cbe9da] text-[24px] shrink-0">hotel</span>
            <div className="min-w-0">
              <h3 id="boncho-bed-title" className="font-serif text-[18px] lg:text-[20px] font-bold break-keep">
                병동 현황 안내 (예시 데이터)
              </h3>
              <p className="text-[12px] text-[#8fab9d] break-keep">
                아래는 화면 시연용 예시 목록입니다. 실제 병상 배정은 전화 상담으로 확인하셔야 합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="병동 현황 창 닫기"
            className="w-11 h-11 lg:w-8 lg:h-8 shrink-0 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Status Summary & Filter */}
        <div className="p-4 bg-[#efeeeb] border-b border-[#e3e2e0] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[13px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#102a20] animate-ping"></span>
              <span>1인실 로열 잔여: <strong className="text-[#102a20]">{AVAILABLE_ROYAL}실</strong></span>
            </div>
            <span className="text-[#c2c8c3]">|</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#75593c] animate-ping"></span>
              <span>2인실 하모니 잔여: <strong className="text-[#75593c]">{AVAILABLE_HARMONY}병상</strong></span>
            </div>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 max-lg:min-h-[44px] max-lg:px-4 rounded-md text-[12px] font-semibold transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#102a20] text-white'
                  : 'bg-white text-[#424844] hover:bg-[#e9e8e5]'
              }`}
            >
              전체 보기
            </button>
            <button
              onClick={() => setFilter('single')}
              className={`px-3 py-1 max-lg:min-h-[44px] max-lg:px-4 rounded-md text-[12px] font-semibold transition-colors cursor-pointer ${
                filter === 'single'
                  ? 'bg-[#102a20] text-white'
                  : 'bg-white text-[#424844] hover:bg-[#e9e8e5]'
              }`}
            >
              1인실 (3F~5F)
            </button>
            <button
              onClick={() => setFilter('double')}
              className={`px-3 py-1 max-lg:min-h-[44px] max-lg:px-4 rounded-md text-[12px] font-semibold transition-colors cursor-pointer ${
                filter === 'double'
                  ? 'bg-[#102a20] text-white'
                  : 'bg-white text-[#424844] hover:bg-[#e9e8e5]'
              }`}
            >
              2인실 (6F~7F)
            </button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="p-4 lg:p-6 overflow-y-auto grow min-h-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredRooms.map((r) =>
              r.status === 'available' ? (
                <button
                  key={r.room}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectBed(r.type, r.room);
                  }}
                  className="text-left p-3.5 rounded-xl border bg-white border-[#102a20] shadow-md ring-2 ring-[#102a20]/10 hover:border-[#264035] cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-[15px] text-[#102a20]">{r.room}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-[#efeeeb] text-[#75593c]">
                      {r.floor}
                    </span>
                  </div>

                  <div className="text-[12px] text-[#424844] mb-2">
                    <span>{r.type === 'royal' ? '1인실 로열' : '2인실 하모니'}</span>
                    <div className="text-[11px] text-[#727974]">{r.view}</div>
                  </div>

                  <div className="pt-2 border-t border-[#cbe9da] flex items-center justify-between">
                    <span className="text-[11px] text-[#102a20] font-bold">예약 문의 가능</span>
                    <span className="material-symbols-outlined text-[16px] text-[#102a20]">check_circle</span>
                  </div>
                </button>
              ) : (
                <div
                  key={r.room}
                  className="p-3.5 rounded-xl border bg-[#f4f3f0] border-[#e3e2e0] opacity-60"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-[15px] text-[#102a20]">{r.room}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-[#efeeeb] text-[#75593c]">
                      {r.floor}
                    </span>
                  </div>

                  <div className="text-[12px] text-[#424844] mb-2">
                    <span>{r.type === 'royal' ? '1인실 로열' : '2인실 하모니'}</span>
                    <div className="text-[11px] text-[#727974]">{r.view}</div>
                  </div>

                  <div className="pt-2 border-t border-[#e3e2e0] text-[11px] text-[#727974]">
                    재원 중
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#cbe9da]/30 border border-[#b0cdbe] flex items-start gap-3 text-[13px] text-[#052017] break-keep">
            <span className="material-symbols-outlined text-[22px] text-[#102a20] shrink-0">
              support_agent
            </span>
            <div>
              <strong>당일 입원 문의:</strong> 치료받던 병원에서 퇴원한 당일에 입원이 필요하시면 전화{' '}
              <strong>02-0000-0000</strong> 으로 알려 주세요. 병상 여유와 진료 일정은 상담 간호사가 확인해
              안내해 드립니다.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#faf9f6] border-t border-[#e3e2e0] flex items-center justify-between gap-3">
          <div className="text-[12px] text-[#424844] break-keep">
            * 테두리가 진한 병실을 누르시면 아래 예약 폼에 그 호실이 담깁니다.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 max-lg:min-h-[44px] shrink-0 rounded-lg bg-[#102a20] text-white text-[13px] font-semibold hover:bg-[#264035]"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
