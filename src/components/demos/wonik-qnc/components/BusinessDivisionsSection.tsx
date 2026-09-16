"use client";

import React from 'react';
import { ArrowRight, Cpu, Wrench, Droplets, Lightbulb } from 'lucide-react';
import { BUSINESS_DIVISIONS } from '../data';
import { BusinessDivision } from '../types';

interface BusinessDivisionsSectionProps {
  onSelectDivision: (division: BusinessDivision) => void;
}

export const BusinessDivisionsSection: React.FC<BusinessDivisionsSectionProps> = ({
  onSelectDivision,
}) => {
  const getDivisionIcon = (id: string) => {
    switch (id) {
      case 'quartz':
        return <Cpu className="w-5 h-5 text-[#737685]" />;
      case 'ceramics':
        return <Wrench className="w-5 h-5 text-[#737685]" />;
      case 'cleaning':
        return <Droplets className="w-5 h-5 text-[#737685]" />;
      case 'optics':
        return <Lightbulb className="w-5 h-5 text-[#737685]" />;
      default:
        return <Cpu className="w-5 h-5 text-[#737685]" />;
    }
  };

  return (
    <section className="py-24 bg-[#faf8ff] relative" id="business">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-[#003d9b] uppercase tracking-widest block mb-2 font-bold">
            Core Business Divisions
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#131b2e] tracking-tight">
            세계적인 기술력으로 완성하는 복합소재부품 솔루션
          </h2>
          <p className="text-base text-[#434654] mt-3 leading-relaxed">
            원익큐앤씨는 쿼츠, 세라믹, 정밀 세정·코팅, 옵틱 부문의 독보적인 원천 기술을 바탕으로 글로벌 반도체 고객사의 생산성을 극대화합니다.
          </p>
        </div>

        {/* Business Domain Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {BUSINESS_DIVISIONS.map((division) => (
            <div
              key={division.id}
              id={division.id}
              onClick={() => onSelectDivision(division)}
              className="group bg-white rounded-xl border border-[#c3c6d6]/40 hover:border-[#0052cc]/60 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Card Header Media */}
              {division.isSpecialOptics ? (
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#283044] to-[#004866] p-6 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-20 quartz-grid pointer-events-none" />
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="bg-white/20 text-[#c6e7ff] font-mono text-[11px] font-semibold px-2.5 py-1 rounded">
                      {division.tag}
                    </span>
                    <Lightbulb className="w-7 h-7 text-[#c6e7ff]" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-4xl font-extrabold text-white tracking-tight font-mono">
                      {division.wavelength}
                      <span className="text-xs font-normal text-[#81cfff] ml-1">nm</span>
                    </span>
                    <p className="text-xs text-[#d2d9f4] mt-0.5">진공 자외선(VUV) 파장 제어 기술</p>
                  </div>
                </div>
              ) : (
                <div className="relative h-48 overflow-hidden bg-[#283044]">
                  <img
                    src={division.imageUrl}
                    alt={division.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div
                    className={`absolute top-3 left-3 text-white font-mono text-[11px] font-semibold px-2.5 py-1 rounded shadow-xs ${
                      division.tagColor || 'bg-[#0052cc]'
                    }`}
                  >
                    {division.tag}
                  </div>
                </div>
              )}

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#003d9b] font-bold">
                      {division.divisionNumber}
                    </span>
                    {getDivisionIcon(division.id)}
                  </div>
                  <h3 className="text-xl font-bold text-[#131b2e] mb-2 group-hover:text-[#003d9b] transition-colors">
                    {division.title}
                  </h3>
                  <p className="text-sm text-[#434654] leading-relaxed line-clamp-3">
                    {division.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#c3c6d6]/30 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#515f78] font-medium">
                    {division.subCategory}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#f2f3ff] group-hover:bg-[#0052cc] text-[#003d9b] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
