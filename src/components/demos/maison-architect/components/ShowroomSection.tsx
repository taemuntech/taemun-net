import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { SHOWROOM_IMAGE } from '../data/products';

interface ShowroomSectionProps {
  onOpenShowroomModal: () => void;
}

export const ShowroomSection: React.FC<ShowroomSectionProps> = ({
  onOpenShowroomModal
}) => {
  return (
    <section id="showroom-booking" className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div className="bg-[#100e0d] text-[#fff8f4] rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-8 lg:p-16 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#e9c176] uppercase tracking-widest mb-3">
              <MapPin className="w-4 h-4" />
              <span>Private Architecture Atelier</span>
            </div>
            <h2 className="font-serif text-2xl lg:text-4xl text-[#fff8f4] font-light leading-tight">
              청담 &amp; 한남 아키텍트 쇼룸 예약
            </h2>
            <p className="text-xs text-[#ccc5c3] mt-4 max-w-lg leading-relaxed">
              자연 채광 아래서 만져보는 가죽과 원목의 질감. 전문 인테리어 아키텍트가 1:1로 고객님의 주거
              평면도를 분석하여 가구 모듈과 조명 레이아웃을 제안해 드립니다.
            </p>
            <p className="text-[11px] text-[#7f7571] mt-2">
              가상 브랜드 샘플입니다 — 아래 쇼룸·주소·운영 정보는 예시이고 예약은 접수되지 않습니다.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-[#d0c4c0]/20 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h5 className="font-sans text-sm font-semibold text-[#fff8f4]">
                청담 플래그십 아틀리에
              </h5>
              <p className="text-xs text-[#ccc5c3] mt-1">서울시 강남구 ○○로 000 (예시 주소)</p>
              <p className="text-[11px] text-[#e9c176] mt-0.5">화-일 10:30 ~ 19:30 (발렛 파킹 가능)</p>
            </div>
            <div>
              <h5 className="font-sans text-sm font-semibold text-[#fff8f4]">
                한남 레지덴셜 갤러리
              </h5>
              <p className="text-xs text-[#ccc5c3] mt-1">서울시 용산구 ○○로 00 (예시 주소)</p>
              <p className="text-[11px] text-[#e9c176] mt-0.5">사전 예약 고객 전용 프라이빗 룸 운영</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={onOpenShowroomModal}
              className="inline-flex items-center justify-center gap-2 px-6 min-h-12 rounded-lg bg-[#fff8f4] text-[#100e0d] hover:bg-[#f6ece5] text-xs font-semibold tracking-wider transition-all active:scale-95 shadow-md"
            >
              <span>쇼룸 1:1 프라이빗 도슨트 예약하기</span>
              <Calendar className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-auto">
          <img
            src={SHOWROOM_IMAGE}
            alt="MAISON ARCHITECT Interior Showroom in Cheongdam"
            className="w-full h-full object-cover"
          referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d]/80 via-transparent to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
};
