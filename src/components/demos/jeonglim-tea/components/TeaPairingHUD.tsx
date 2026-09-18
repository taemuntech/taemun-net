'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WEATHER_MOODS } from '../data/teaData';

export const TeaPairingHUD: React.FC = () => {
  const [activeMoodId, setActiveMoodId] = useState<'clear' | 'rain' | 'snow'>('rain');

  const currentMood = WEATHER_MOODS.find((m) => m.id === activeMoodId) || WEATHER_MOODS[1];

  return (
    <section id="pairing" className="py-24 bg-[#181412] text-[#f4ede2] border-t border-[#382f29]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-[#cbb094] font-mono text-xs tracking-widest uppercase block mb-2">
            SECTION 02 · WEATHER & SOUNDSCAPE AMBIENCE
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-bold text-white mb-4">
            계절과 날씨가 짓는 차(茶) 한 잔의 여백
          </h2>
          <p className="text-sm lg:text-base text-[#a89888] font-light leading-relaxed break-keep">
            한옥의 공간미는 바깥의 날씨와 자연스럽게 호흡할 때 깊어집니다.
            처마 끝 빗소리, 창호 문살의 아침 볕, 눈 내리는 온돌의 고요함에 맞춘 다도 앰비언스를 경험해 보세요.
          </p>
        </div>

        {/* Weather Selector Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {WEATHER_MOODS.map((mood) => {
            const isSelected = mood.id === activeMoodId;
            return (
              <button
                key={mood.id}
                onClick={() => setActiveMoodId(mood.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2a221c] border-[#8c715c] shadow-xl ring-1 ring-[#8c715c]'
                    : 'bg-[#201a16] border-[#382f29] hover:border-[#524134]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#d8b896] font-bold">AMBIENCE</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#161210] text-[#a89888]">
                    {mood.temperatureNote}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1 break-keep">{mood.name}</h4>
                <p className="text-xs text-[#b8a796] font-light line-clamp-1">{mood.koreanPoetic}</p>
              </button>
            );
          })}
        </div>

        {/* Visual & Sound HUD Box */}
        <div className="relative aspect-16/9 rounded-3xl overflow-hidden border border-[#382f29] bg-[#14100e] shadow-2xl">
          <Image
            src={
              activeMoodId === 'clear'
                ? '/portfolio/jeonglim-tea/jeonglim-03.jpg'
                : activeMoodId === 'rain'
                ? '/portfolio/jeonglim-tea/jeonglim-02.jpg'
                : '/portfolio/jeonglim-tea/jeonglim-04.jpg'
            }
            alt={currentMood.name}
            fill
            sizes="100vw"
            className="object-cover object-center transition-all duration-700"
          />

          <div
            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
              activeMoodId === 'clear'
                ? 'bg-[#d8b896]/10'
                : activeMoodId === 'rain'
                ? 'bg-[#25303b]/25 mix-blend-multiply'
                : 'bg-[#181412]/35'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14100e]/95 via-transparent to-[#14100e]/30" />

          {/* HUD Info */}
          {/* 375px 에서는 16:9 상자 높이가 200px 이 안 돼 p-6·bottom-6 이면 이 판이 사진 위로 넘쳐 잘린다 */}
          <div className="absolute bottom-3 left-3 right-3 lg:bottom-6 lg:left-6 lg:right-6 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-2.5 lg:gap-4 p-3.5 lg:p-6 rounded-2xl bg-[#1c1714]/85 backdrop-blur-md border border-[#382f29]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d8b896] animate-pulse" />
                <span className="text-[10px] lg:text-xs font-mono text-[#d8b896] font-bold uppercase">
                  ACTIVE HANOK SOUNDSCAPE &amp; TEA PAIRING
                </span>
              </div>
              <h3 className="text-base lg:text-xl font-bold text-white mb-1 break-keep">
                {currentMood.name}
              </h3>
              <p className="text-xs text-[#c4b5a5] break-keep">
                소리 풍경: {currentMood.soundscape}
              </p>
            </div>

            <div className="p-3 lg:p-3.5 rounded-xl bg-[#261f1a] border border-[#3d3127] max-w-md">
              <span className="text-[10px] font-mono text-[#8a7566] block mb-0.5 uppercase">
                RECOMMENDED TEA PAIRING
              </span>
              <span className="text-xs lg:text-sm font-semibold text-[#d8b896] break-keep">
                {currentMood.recommendedTea}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
