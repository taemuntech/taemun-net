'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { Destination, Villa } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDestination: Destination;
  selectedVilla: Villa;
  nights: number;
  totalEstimate: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedDestination,
  selectedVilla,
  nights,
  totalEstimate,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  // 샘플이라 예약을 받지 않는다 — 가짜 접수 완료 화면 대신 공용 안내(SampleNotice)만 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  const handleResetAndClose = () => {
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030402]/60 backdrop-blur-md p-4 animate-in fade-in duration-200"
      id="concierge-modal"
    >
      <div className="bg-[#fcf9f3] border border-[#c6c7c0]/40 rounded max-w-lg w-full p-6 lg:p-8 relative shadow-2xl">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-[#767872] hover:text-[#030402] transition-colors p-1"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[10px] text-[#725b38] uppercase tracking-[0.22em] font-semibold block mb-1">
            Direct Sanctuary Reservation
          </span>
          <h3 className="font-editorial text-2xl lg:text-3xl text-[#030402] mb-2">
            전담 총괄 버틀러 핫라인 접수
          </h3>
          <p className="text-xs text-[#454742] font-light mb-6 leading-relaxed">
            투숙 일정과 비스포크 요청 사항을 VIP 전담 데스크가 이어받아 안내하는 흐름을 보여 주는 화면입니다(예시).
          </p>

          {/* Current Selected Stay Brief */}
          <div className="bg-[#f0eee8] p-3.5 rounded mb-6 border border-[#c6c7c0]/30 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-[#767872]">선택 안식처</span>
              <span className="text-[#030402] font-medium">{selectedDestination.nameKo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#767872]">선택 빌라</span>
              <span className="text-[#030402] font-medium">{selectedVilla.name} ({nights}박)</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-[#c6c7c0]/20 font-medium">
              <span className="text-[#767872]">예상 총액</span>
              <span className="text-[#030402]">₩{totalEstimate.toLocaleString()}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] text-[#767872] uppercase tracking-[0.16em] block mb-1 font-medium">
                성함 / 직함
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#f0eee8] border border-[#c6c7c0]/40 rounded p-3 text-xs lg:text-sm text-[#030402] focus:border-[#725b38] focus:ring-0"
                placeholder="예: 김아틀라스 대표"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#767872] uppercase tracking-[0.16em] block mb-1 font-medium">
                연락처 (전화번호 / Signal)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#f0eee8] border border-[#c6c7c0]/40 rounded p-3 text-xs lg:text-sm text-[#030402] focus:border-[#725b38] focus:ring-0"
                placeholder="+82 10-0000-0000"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#030402] text-[#fcf9f3] py-3.5 rounded text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#31312d] transition-colors duration-300"
              >
                프라이빗 버틀러 상담 신청 확정
              </button>
            </div>
            <p className="text-[10px] text-center text-[#767872] tracking-wider">
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
