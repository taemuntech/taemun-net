'use client';

import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import type { Currency, Destination, Villa } from '../types';
import { EXCHANGE_NOTE } from '../lib/format';
import { Money } from './Money';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDestination: Destination;
  selectedVilla: Villa;
  nights: number;
  totalEstimate: number;
  currency: Currency;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedDestination,
  selectedVilla,
  nights,
  totalEstimate,
  currency,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  // 샘플이라 예약을 받지 않는다 — 가짜 접수 완료 화면 대신 공용 안내(SampleNotice)만 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleResetAndClose = () => {
    setName('');
    setPhone('');
    onClose();
  };

  // Esc·배경 스크롤 잠금·포커스 가둠 — 샘플 공용 훅을 쓴다. 훅은 항상 호출하고 open 으로만 갈린다.
  // 위에 샘플 안내가 떠 있으면 Esc 는 그 안내만 닫는다(두 모달이 한꺼번에 닫히지 않게).
  useSampleDialog({
    open: isOpen,
    onClose: () => {
      if (!isNoticeOpen) handleResetAndClose();
    },
    dialogRef,
    initialFocusRef: closeRef,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  // z-[70]: 샘플 안내 바(z-60)·고정 헤더(z-50) 위로 떠야 모달이 가려지지 않는다
  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-[#030402]/60 backdrop-blur-md p-0 animate-in fade-in duration-200 lg:items-center lg:p-4"
      id="concierge-modal"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        tabIndex={-1}
        className="bg-[#fcf9f3] border border-[#c6c7c0]/40 rounded-t-xl lg:rounded max-w-lg w-full max-h-[92svh] lg:max-h-[88svh] overflow-y-auto p-6 lg:p-8 relative shadow-2xl outline-none"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded text-[#767872] hover:text-[#030402] hover:bg-[#f0eee8] transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[10px] text-[#725b38] uppercase tracking-[0.22em] font-semibold block mb-1">
            Direct Sanctuary Reservation
          </span>
          <h3
            id="booking-modal-title"
            className="font-editorial text-2xl lg:text-3xl text-[#030402] mb-2 pr-10 [word-break:keep-all]"
          >
            전담 총괄 버틀러 핫라인 접수
          </h3>
          <p className="text-xs text-[#454742] font-light mb-6 leading-relaxed">
            투숙 일정과 비스포크 요청 사항을 VIP 전담 데스크가 이어받아 안내하는 흐름을 보여 주는 화면입니다(예시).
          </p>

          {/* Current Selected Stay Brief */}
          <div className="bg-[#f0eee8] p-3.5 rounded mb-6 border border-[#c6c7c0]/30 text-xs space-y-1">
            <div className="flex justify-between gap-3">
              <span className="text-[#767872] shrink-0">선택 안식처</span>
              <span className="text-[#030402] font-medium text-right">{selectedDestination.nameKo}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[#767872] shrink-0">선택 빌라</span>
              <span className="text-[#030402] font-medium text-right">
                {selectedVilla.name} ({nights}박)
              </span>
            </div>
            <div className="flex justify-between gap-3 pt-1 border-t border-[#c6c7c0]/20 font-medium">
              <span className="text-[#767872] shrink-0">예상 총액 (예시)</span>
              <span className="text-[#030402] text-right">
                <Money amount={totalEstimate} currency={currency} />
              </span>
            </div>
            {currency === 'USD' && (
              <p className="pt-1 text-[10px] text-[#767872]">{EXCHANGE_NOTE}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="booking-name" className="text-[10px] text-[#767872] uppercase tracking-[0.16em] block mb-1 font-medium">
                성함 / 직함
              </label>
              <input
                id="booking-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full min-h-11 bg-[#f0eee8] border border-[#c6c7c0]/40 rounded p-3 text-xs lg:text-sm text-[#030402] focus:border-[#725b38] focus:ring-0"
                placeholder="예: 김아틀라스 대표"
              />
            </div>

            <div>
              <label htmlFor="booking-phone" className="text-[10px] text-[#767872] uppercase tracking-[0.16em] block mb-1 font-medium">
                연락처 (전화번호 / Signal)
              </label>
              <input
                id="booking-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full min-h-11 bg-[#f0eee8] border border-[#c6c7c0]/40 rounded p-3 text-xs lg:text-sm text-[#030402] focus:border-[#725b38] focus:ring-0"
                placeholder="+82 10-0000-0000"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full min-h-12 bg-[#030402] text-[#fcf9f3] py-3.5 rounded text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#31312d] transition-colors duration-300"
              >
                프라이빗 버틀러 상담 신청 확정
              </button>
            </div>
            <p className="text-[10px] text-center text-[#767872] tracking-wider leading-relaxed">
              샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
            </p>
          </form>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="atlas-resort"
        industry="commerce"
        featureName="프라이빗 버틀러 예약 상담"
      />
    </div>
  );
};
