"use client";

import React from 'react';
import { CheckCircle2, ShieldAlert, Layers, AppWindow, Cpu } from 'lucide-react';
import { ENGINEERING_FEATURES } from '../data/hanokData';

export const Engineering: React.FC = () => {
  const icons = [
    <ShieldAlert key="01" className="w-5 h-5 text-[#faf9f7]" />,
    <Layers key="02" className="w-5 h-5 text-[#faf9f7]" />,
    <AppWindow key="03" className="w-5 h-5 text-[#faf9f7]" />,
    <Cpu key="04" className="w-5 h-5 text-[#faf9f7]" />,
  ];

  return (
    <section id="technology" className="py-16 lg:py-24 border-b border-[#c8c7bf]/30 bg-[#faf9f7]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Narrative */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold text-[#904b35] uppercase tracking-wider block mb-2 font-mono">
              Modern Engineering Solutions
            </span>
            <h2 className="font-serif text-3xl lg:text-[2.75rem] text-[#161714] font-normal leading-[1.18] mb-6">
              전통의 뼈대 위에<br />
              현대 건축 과학을 축조하다
            </h2>
            <p className="text-sm lg:text-base text-[#474741] leading-relaxed mb-8 font-light">
              소담재는 고유의 목구조 공학을 계승하면서도, 한국에너지공단 패시브 하우스 기준을 충족하는 첨단 하이브리드 한옥 설계를 독자 구축하였습니다.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#904b35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-[#161714]">
                    공인 단열 시험성적서 보유
                  </h4>
                  <p className="text-xs lg:text-sm text-[#474741] mt-0.5 font-light">
                    외벽 열관류율 0.15W/㎡K 달성 (중부 1지역 최신 건축 기준 초과 달성)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#904b35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-[#161714]">
                    BIM 3D 치목 전처리
                  </h4>
                  <p className="text-xs lg:text-sm text-[#474741] mt-0.5 font-light">
                    디지털 3차원 공차 1mm 이내 사전 재단 및 결구 무오차 현장 조립
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Engineering Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {ENGINEERING_FEATURES.map((feat, idx) => (
              <div
                key={feat.number}
                id={`engineering-card-${feat.number}`}
                className="p-6 lg:p-7 bg-[#f4f3f1] rounded-xs border border-[#c8c7bf]/30 hover:border-[#777770] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xs bg-[#161714] flex items-center justify-center mb-4 group-hover:bg-[#904b35] transition-colors duration-300">
                  {icons[idx]}
                </div>
                
                <div className="text-[11px] text-[#904b35] font-semibold tracking-wider font-mono uppercase mb-1">
                  {feat.number}. {feat.badge}
                </div>
                
                <h3 className="font-serif text-lg lg:text-xl text-[#161714] font-medium mb-2">
                  {feat.title}
                </h3>
                
                <p className="text-xs lg:text-sm text-[#474741] leading-relaxed font-light">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
