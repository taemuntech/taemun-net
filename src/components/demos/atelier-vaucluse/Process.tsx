'use client';

import React from 'react';
import { PROCESS_STEPS } from './data/projects';
import { Clock } from 'lucide-react';

export const Process: React.FC = () => {
  return (
    <section className="py-24 bg-[#f4f3f1] border-b border-[#c8c7bf]/20" id="process">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#904b35] block mb-2 font-sans">
            Our Execution Process
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif font-normal text-[#161714] leading-tight tracking-[-0.015em] break-keep [word-break:keep-all]">
            체계적인 인테리어 <br className="hidden lg:inline" />완성 프로세스 4단계
          </h2>
          <p className="text-sm lg:text-base text-[#474741] mt-3 font-light leading-relaxed font-sans break-keep [word-break:keep-all]">
            초기 상담부터 준공 후 점검까지 투명하고 정교한 단계별 로드맵으로 불안감을 해소합니다. 아래 일정과 조건은 샘플용 예시입니다.
          </p>
        </div>

        {/* Mobile Swipe Notice */}
        <div className="flex lg:hidden items-center justify-between text-xs text-[#777770] font-sans mb-3 px-1">
          <span className="font-medium text-[#161714]">단계별 프로젝트 로드맵</span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-[#904b35]">
            좌우 스와이프 &rarr;
          </span>
        </div>

        {/* Process Steps: Mobile Horizontal Swipe Carousel & Desktop 4-col Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scrollbar-none lg:grid lg:grid-cols-4 lg:gap-6 lg:mx-0 lg:px-0">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="w-[78vw] shrink-0 snap-center lg:w-auto bg-[#faf9f7] p-6 rounded border border-[#c8c7bf]/30 flex flex-col justify-between hover:border-[#161714] transition-colors duration-300 relative shadow-xs"
            >
              <div>
                <div className="w-9 h-9 rounded bg-[#efeeec] border border-[#c8c7bf]/40 flex items-center justify-center text-xs font-bold text-[#161714] mb-5 font-serif">
                  {step.step}
                </div>

                <h4 className="text-xl font-serif text-[#161714] mb-1 break-keep [word-break:keep-all]">
                  {step.titleKr}
                </h4>

                <p className="text-[11px] uppercase tracking-wider text-[#904b35] font-medium mb-3 font-sans">
                  {step.titleEn}
                </p>

                <p className="text-xs lg:text-sm text-[#474741] leading-relaxed font-sans font-light break-keep [word-break:keep-all]">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#c8c7bf]/20 text-xs text-[#474741]/80 font-sans flex items-center gap-1.5">
                <Clock size={12} className="text-[#904b35]" />
                <span>{step.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
