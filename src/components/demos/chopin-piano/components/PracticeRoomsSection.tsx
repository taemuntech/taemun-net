'use client';

import React from 'react';
import { PRACTICE_ROOMS } from '../data/chopinData';

interface PracticeRoomsSectionProps {
  onOpenReservation: (roomName?: string) => void;
}

export function PracticeRoomsSection({ onOpenReservation }: PracticeRoomsSectionProps) {
  return (
    <section id="rooms-section" className="py-20 lg:py-28 bg-[#151311] border-b border-[#2d2926] text-[#f5f0eb]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] block mb-2">
            Acoustic Practice Rooms & Salon
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-[#f5f0eb] mb-4">
            전 연습실 명품 그랜드 피아노 & 방음 설계
          </h2>
          <p className="text-sm lg:text-base text-[#a89f95] leading-relaxed">
            스타인웨이 D-274 풀 콘서트 그랜드부터 독일 베히슈타인까지, 완벽한 항온항습(50%)과 최적 잔향이 세팅된 프라이빗 연습실을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRACTICE_ROOMS.map((room) => (
            <div
              key={room.id}
              className="bg-[#1c1917] border border-[#38322c] rounded-2xl p-6 lg:p-8 flex flex-col justify-between hover:border-[#524434] transition-colors shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2a241e] border border-[#524434] flex items-center justify-center text-xl mb-4 text-[#d4af37]">
                  🏛️
                </div>
                <h3 className="text-xl font-serif font-bold text-[#f5f0eb] mb-1">
                  {room.name}
                </h3>
                <p className="text-xs text-[#d4af37] font-mono mb-4">{room.pianoModel}</p>

                <div className="space-y-2 mb-6 p-4 bg-[#121110] rounded-xl border border-[#2d2926]">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8c8276]">설계 잔향 시간</span>
                    <span className="text-[#c5a880] font-mono">{room.reverbTime}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8c8276]">대관 이용료</span>
                    <span className="text-[#e0c298] font-medium">{room.hourlyRate}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <span className="text-[11px] text-[#70685e] uppercase tracking-wider block">공간 특장점</span>
                  {room.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#b8b0a7]">
                      <span className="text-[#d4af37]">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenReservation(room.name)}
                className="w-full py-3 rounded-xl bg-[#2a241e] border border-[#524434] text-[#d4af37] hover:bg-[#382f25] text-xs font-semibold active:scale-95 transition-all min-h-[44px] flex items-center justify-center"
              >
                연습실 대관 및 리허설 신청
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
