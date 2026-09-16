"use client";

import React from 'react';
import { Mountain, Compass, ThermometerSun } from 'lucide-react';
import { PHILOSOPHIES } from '../data/hanokData';

export const Philosophy: React.FC = () => {
  const icons = [
    <Mountain key="01" className="w-7 h-7 text-[#904b35] stroke-[1.5]" />,
    <Compass key="02" className="w-7 h-7 text-[#904b35] stroke-[1.5]" />,
    <ThermometerSun key="03" className="w-7 h-7 text-[#904b35] stroke-[1.5]" />,
  ];

  return (
    <section id="philosophy" className="py-16 lg:py-24 bg-[#f4f3f1] border-b border-[#c8c7bf]/30">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold text-[#904b35] uppercase tracking-wider block mb-2 font-mono">
              Architectural Philosophy
            </span>
            <h2 className="font-serif text-3xl lg:text-[2.75rem] text-[#161714] font-normal tracking-tight">
              소담재 한옥 3대 건축 철학
            </h2>
          </div>
          <p className="text-sm lg:text-base text-[#474741] max-w-lg leading-relaxed font-light">
            천 년의 시간을 지탱해 온 한국 목구조의 유려한 조형감과 오늘날 현대인이 요구하는 단열, 채광, 편리한 동선의 균형점을 탐구합니다.
          </p>
        </div>

        {/* 3-Column Editorial Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {PHILOSOPHIES.map((item, idx) => (
            <div
              key={item.number}
              id={`philosophy-card-${item.number}`}
              className="bg-[#faf9f7] rounded-xs p-8 border border-[#c8c7bf]/30 flex flex-col justify-between hover:border-[#777770] transition-colors duration-300 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#c8c7bf]/20">
                  <span className="font-serif text-3xl lg:text-4xl text-[#c8c7bf] font-light">
                    {item.number}
                  </span>
                  {icons[idx]}
                </div>

                <h3 className="font-serif text-xl lg:text-2xl text-[#161714] font-medium mb-3">
                  {item.title}
                </h3>

                <p className="text-sm lg:text-[15px] text-[#474741] leading-relaxed mb-6 font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#c8c7bf]/20">
                <span className="text-xs text-[#777770] font-sans">
                  {item.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
