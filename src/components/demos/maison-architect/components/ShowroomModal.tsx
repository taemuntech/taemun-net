import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, User, Phone } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { ShowroomBookingData } from '../types';

interface ShowroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ShowroomBookingData) => void;
}

export const ShowroomModal: React.FC<ShowroomModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [showroom, setShowroom] = useState<'cheongdam' | 'hannam'>('cheongdam');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-09-20');
  const [time, setTime] = useState('14:00');
  const [apartmentSize, setApartmentSize] = useState('34평형');
  const [notes, setNotes] = useState('');
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    onSubmit({
      showroom,
      name,
      phone,
      date,
      time,
      apartmentSize,
      notes
    });
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#100e0d]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fff8f4] max-w-lg w-full rounded-2xl shadow-2xl border border-[#d0c4c0]/60 p-6 lg:p-8 relative overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#7f7571] hover:text-[#100e0d] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#944931] uppercase tracking-widest">
                Private Curation Atelier
              </span>
              <h3 className="font-serif text-2xl text-[#100e0d] mt-1">
                1:1 프라이빗 도슨트 예약
              </h3>
              <p className="text-xs text-[#7f7571] mt-1">
                고객님의 주거 평면도를 바탕으로 최적의 가구 모듈과 조명을 1:1 제안합니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Showroom Choice */}
              <div>
                <label className="font-semibold text-[#100e0d] block mb-1.5">
                  방문 쇼룸 선택
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowroom('cheongdam')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      showroom === 'cheongdam'
                        ? 'border-[#100e0d] bg-[#100e0d] text-[#fff8f4]'
                        : 'border-[#d0c4c0] bg-[#fff8f4] text-[#100e0d] hover:bg-[#f6ece5]'
                    }`}
                  >
                    <p className="font-bold">청담 플래그십 아틀리에</p>
                    <p className={`text-[10px] mt-0.5 ${showroom === 'cheongdam' ? 'text-[#ccc5c3]' : 'text-[#7f7571]'}`}>
                      압구정로 421 (발렛 가능)
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowroom('hannam')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      showroom === 'hannam'
                        ? 'border-[#100e0d] bg-[#100e0d] text-[#fff8f4]'
                        : 'border-[#d0c4c0] bg-[#fff8f4] text-[#100e0d] hover:bg-[#f6ece5]'
                    }`}
                  >
                    <p className="font-bold">한남 레지덴셜 갤러리</p>
                    <p className={`text-[10px] mt-0.5 ${showroom === 'hannam' ? 'text-[#ccc5c3]' : 'text-[#7f7571]'}`}>
                      한남대로 91 (프라이빗 룸)
                    </p>
                  </button>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#100e0d] block mb-1">방문 희망일</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 bg-[#fbf2eb] rounded-lg border border-[#d0c4c0] text-xs text-[#100e0d] focus:outline-none focus:border-[#100e0d]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#100e0d] block mb-1">희망 시간</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2.5 bg-[#fbf2eb] rounded-lg border border-[#d0c4c0] text-xs text-[#100e0d] focus:outline-none focus:border-[#100e0d]"
                  >
                    <option value="11:00">11:00 (오전)</option>
                    <option value="14:00">14:00 (오후 2시)</option>
                    <option value="16:00">16:00 (오후 4시)</option>
                    <option value="18:00">18:00 (오후 6시)</option>
                  </select>
                </div>
              </div>

              {/* Apartment Size */}
              <div>
                <label className="font-semibold text-[#100e0d] block mb-1">
                  거주/입주 예정 주거 형태
                </label>
                <select
                  value={apartmentSize}
                  onChange={(e) => setApartmentSize(e.target.value)}
                  className="w-full p-2.5 bg-[#fbf2eb] rounded-lg border border-[#d0c4c0] text-xs text-[#100e0d] focus:outline-none focus:border-[#100e0d]"
                >
                  <option value="25평형">25평형 (84㎡ 이하 소형 아파트)</option>
                  <option value="34평형">34평형 (112㎡ 국민 평형)</option>
                  <option value="45평형+">45평형 이상 대형 평형 / 펜트하우스</option>
                  <option value="단독주택">단독주택 / 빌라 레지던스</option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#100e0d] block mb-1">예약자 성함</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full p-2.5 bg-[#fbf2eb] rounded-lg border border-[#d0c4c0] text-xs text-[#100e0d] focus:outline-none focus:border-[#100e0d]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#100e0d] block mb-1">연락처</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full p-2.5 bg-[#fbf2eb] rounded-lg border border-[#d0c4c0] text-xs text-[#100e0d] focus:outline-none focus:border-[#100e0d]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="font-semibold text-[#100e0d] block mb-1">
                  상담 요청 사항 (선택)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="예: 거실 도면 지참 예정, 모듈 소파 및 다이닝 테이블 조합 추천 희망"
                  className="w-full p-2.5 bg-[#fbf2eb] rounded-lg border border-[#d0c4c0] text-xs text-[#100e0d] focus:outline-none focus:border-[#100e0d]"
                />
              </div>

              <div className="pt-2 space-y-2">
                <p className="text-[11px] text-[#7f7571] text-center">
                  샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
                </p>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-[#100e0d] hover:bg-[#262322] text-[#fff8f4] font-semibold transition-all shadow-md active:scale-95"
                >
                  예약 신청 완료하기
                </button>
              </div>
            </form>
          </div>
        <SampleNotice
          open={isNoticeOpen}
          onClose={() => {
            setIsNoticeOpen(false);
            onClose();
          }}
          slug="maison-architect"
          industry="commerce"
          featureName="쇼룸 프라이빗 도슨트 예약"
        />
      </div>
    </div>
  );
};
