'use client';

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { PROCESS_PHASES } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section
      className="py-16 lg:py-24 bg-[#121315] max-w-[1440px] mx-auto px-5 lg:px-16 scroll-mt-[calc(var(--sample-bar-h,0px)_+_80px)]"
      id="process-atelier"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Sticky Sidebar Column (4 cols) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] block mb-2 font-semibold">
              Bespoke Construction Protocol
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif text-[#f4efea] leading-tight break-keep [word-break:keep-all]">
              완성도를 쌓아 올리는
              <br />
              4단계 아틀리에 프로세스
            </h2>
            <p className="text-[15px] text-[#d1c5b8] mt-4 font-light leading-relaxed">
              공간의 시작부터 입주 후 수년의 시간까지. 하우스앤스페이스는 설계자와 직영 시공 팀이 한 팀으로 움직이며 공정을 함께 챙깁니다.
            </p>

            {/* 「Guarantee」·「책임집니다」는 보증 약속으로 읽힌다 — 가상 브랜드가 약속할 수 있는 말이 아니라
                시공 체계 설명으로 바꾸고, 경력 연차에는 예시 표기를 단다. */}
            <div className="mt-8 p-6 bg-[#1b1c1e] border border-[#c5a880]/30 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#c5a880] shrink-0" />
                <span className="text-xs uppercase tracking-[0.14em] text-[#f4efea] font-semibold break-keep [word-break:keep-all]">
                  Direct Master Builder System
                </span>
              </div>
              <p className="text-xs text-[#998f83] leading-relaxed [word-break:keep-all]">
                하도급 외주 대신 전속 목공·석공·설비 팀이 현장을 총괄하는 직영 시공 체계입니다. (경력 20년 이상 — 예시 표기)
              </p>
            </div>
          </div>
        </div>

        {/* Process Steps Flow (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {PROCESS_PHASES.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.number}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`${step.phase} 단계 선택`}
                onClick={() => setActiveStep(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStep(idx);
                  }
                }}
                className={`bg-[#1b1c1e] border p-6 lg:p-8 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[#c5a880] shadow-[0_0_30px_rgba(197,168,128,0.1)]'
                    : 'border-white/10 hover:border-[#c5a880]/50'
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span
                    className={`text-4xl font-serif ${
                      isSelected ? 'text-[#c5a880]' : 'text-[#c5a880]/70'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#998f83] text-right break-keep [word-break:keep-all]">
                    {step.phase}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-[#f4efea] mt-4 break-keep [word-break:keep-all]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#d1c5b8] mt-3 font-light leading-relaxed">
                  {step.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[#121315] text-[#d1c5b8] px-3 py-1 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
