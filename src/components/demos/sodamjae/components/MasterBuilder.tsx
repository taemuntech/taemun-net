"use client";

import React from 'react';
import { MASTER_BUILDER_IMAGE_URL } from '../data/hanokData';

export const MasterBuilder: React.FC = () => {
  return (
    <section id="master-builder" className="py-16 lg:py-24 bg-[#efeeec] border-b border-[#c8c7bf]/30">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Master Portrait / Craft Visual */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] rounded-md overflow-hidden bg-[#e3e2e0] border border-[#c8c7bf]/40 shadow-sm">
              <img
                src={MASTER_BUILDER_IMAGE_URL}
                alt="소담재 건축공방 도편수 강태원 명인 대목장 작업 전경"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Tactile Heritage Master Badge */}
            <div className="absolute -bottom-6 -right-2 lg:bottom-6 lg:-right-6 p-5 lg:p-6 bg-[#faf9f7] border border-[#c8c7bf]/50 rounded-xs max-w-[280px] lg:max-w-xs shadow-md">
              <p className="text-[11px] font-semibold text-[#904b35] uppercase tracking-wider mb-1 font-mono">
                Heritage Master
              </p>
              <h4 className="font-serif text-lg lg:text-xl text-[#161714] font-medium mb-1">
                도편수 강태원 명인
              </h4>
              <p className="text-xs text-[#474741] leading-relaxed font-light">
                국가유산 수리기능자 제3412호 (한식목공 대목)<br />
                소담재 건축공방 대표 장인
              </p>
            </div>
          </div>

          {/* Artisan Narrative */}
          <div className="lg:col-span-6 lg:pl-4 mt-8 lg:mt-0">
            <span className="text-xs font-semibold text-[#904b35] uppercase tracking-wider block mb-2 font-mono">
              Master Builder & Artisans
            </span>
            
            <h2 className="font-serif text-3xl lg:text-[2.75rem] text-[#161714] font-normal leading-[1.2] mb-6">
              "나무의 숨결을 거스르지 않는 것이<br />
              백 년 한옥의 첫걸음입니다."
            </h2>
            
            <p className="text-sm lg:text-base text-[#474741] leading-relaxed mb-6 font-light">
              소담재의 모든 목재는 도편수 강태원 명인이 태백산맥 자락에서 굵고 곧게 자란 국내산 육송(금강송)과 최상급 북미산 더글라스 퍼를 직접 검수하고 선별합니다.
            </p>
            
            <p className="text-sm lg:text-base text-[#474741] leading-relaxed mb-8 font-light">
              인위적인 고온 건조 대신 5년 이상의 음지 자연 건조를 통해 수분율을 15% 미만으로 낮춰, 완공 후 세월이 흘러도 기둥이 비틀리거나 문틀이 주저앉는 하자를 원천적으로 배제합니다.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-[#c8c7bf]/30">
              <div className="border-l-2 border-[#904b35]/40 pl-3">
                <div className="font-serif text-2xl text-[#161714] mb-1 font-light">5年+</div>
                <div className="text-xs font-semibold text-[#1a1c1b]">음지 자연 건조</div>
                <p className="text-[11px] text-[#777770]">목재 내부 응력 해소</p>
              </div>

              <div className="border-l-2 border-[#904b35]/40 pl-3">
                <div className="font-serif text-2xl text-[#161714] mb-1 font-light">15%</div>
                <div className="text-xs font-semibold text-[#1a1c1b]">함수율 상한 준수</div>
                <p className="text-[11px] text-[#777770]">수축 뒤틀림 제로화</p>
              </div>

              <div className="border-l-2 border-[#904b35]/40 pl-3">
                <div className="font-serif text-2xl text-[#161714] mb-1 font-light">3D+手</div>
                <div className="text-xs font-semibold text-[#1a1c1b]">BIM 치목과 수대패</div>
                <p className="text-[11px] text-[#777770]">디지털 정밀도와 손맛</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
