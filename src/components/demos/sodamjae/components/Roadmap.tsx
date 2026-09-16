"use client";

import React from 'react';
import { ROADMAP_STEPS } from '../data/hanokData';

export const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-16 lg:py-24 bg-[#f4f3f1] border-b border-[#c8c7bf]/30">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-xs font-semibold text-[#904b35] uppercase tracking-wider block mb-2 font-mono">
            Architectural Roadmap
          </span>
          <h2 className="font-serif text-3xl lg:text-[2.75rem] text-[#161714] mb-4 font-normal tracking-tight">
            소담재 5단계 한옥 건축 로드맵
          </h2>
          <p className="text-sm lg:text-base text-[#474741] leading-relaxed font-light">
            첫 대지 답사부터 10년 목조 케어까지, 투명한 공정 관리와 체계적인 품질 검증으로 한옥 짓기의 막연한 불안을 해소해 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6">
          {ROADMAP_STEPS.map((step) => (
            <div
              key={step.step}
              id={`roadmap-step-${step.step}`}
              className="p-6 bg-[#faf9f7] rounded-xs border border-[#c8c7bf]/30 flex flex-col justify-between hover:border-[#777770] transition-colors duration-300 shadow-2xs"
            >
              <div>
                <span className="font-serif text-lg text-[#904b35] block mb-2 font-light">
                  {step.step}
                </span>
                <h3 className="text-base font-semibold text-[#161714] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-xs lg:text-[13px] text-[#474741] leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#c8c7bf]/20 text-[11px] font-medium text-[#777770] font-mono">
                {step.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
