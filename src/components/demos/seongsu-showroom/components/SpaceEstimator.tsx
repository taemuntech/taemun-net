'use client';
import React, { useState } from 'react';
import { ESTIMATE_OPTIONS } from '../data/showroomData';

interface SpaceEstimatorProps {
  onRequestConsultationWithEstimate: (summary: string) => void;
}

export const SpaceEstimator: React.FC<SpaceEstimatorProps> = ({ onRequestConsultationWithEstimate }) => {
  const [selectedBusiness, setSelectedBusiness] = useState<string>('showroom');
  const [selectedArea, setSelectedArea] = useState<string>('size50');
  const [selectedMood, setSelectedMood] = useState<string>('industrial');
  const [includeBranding, setIncludeBranding] = useState<boolean>(true);
  const [includeFurniture, setIncludeFurniture] = useState<boolean>(true);

  const business = ESTIMATE_OPTIONS.businessTypes.find((b) => b.id === selectedBusiness) || ESTIMATE_OPTIONS.businessTypes[0];
  const area = ESTIMATE_OPTIONS.areaSizes.find((a) => a.id === selectedArea) || ESTIMATE_OPTIONS.areaSizes[0];
  const mood = ESTIMATE_OPTIONS.styleMoods.find((m) => m.id === selectedMood) || ESTIMATE_OPTIONS.styleMoods[0];

  // Calculation Logic (Estimated Reference)
  const baseRate = business.basePerPyung * area.multiplier * mood.factor;
  const brandingFee = includeBranding ? 800 : 0; // 800만원
  const furnitureFeePerPyung = includeFurniture ? 45 : 0; // 평당 45만원

  const totalPerPyung = Math.round(baseRate + furnitureFeePerPyung);
  const totalBase = Math.round((totalPerPyung * area.pyung) + brandingFee);

  const minRange = Math.round(totalBase * 0.95);
  const maxRange = Math.round(totalBase * 1.15);

  const handleApply = () => {
    const summary = `[아틀리에 무드 성수 - 공간 견적 진단 결과]\n• 업종: ${business.label}\n• 규모: ${area.label} (${area.pyung}평 기준)\n• 콘셉트: ${mood.label}\n• 부가 옵션: ${includeBranding ? '브랜드 BX/디자인 포함' : '공간 인테리어 단독'}, ${includeFurniture ? '오더메이드 맞춤가구 포함' : '가구 제외'}\n• 예상 진단 범위: 약 ${minRange.toLocaleString()}만 ~ ${maxRange.toLocaleString()}만원 (참고 예시)`;
    onRequestConsultationWithEstimate(summary);
  };

  return (
    <section id="estimator" className="py-24 bg-[#141519] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            TRANSPARENT SPACE ESTIMATOR
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-normal text-stone-100 mt-2 mb-3">
            실시간 공간 견적 시뮬레이터
          </h2>
          <p className="text-stone-300 text-sm lg:text-base font-light leading-relaxed">
            업종과 규모, 지향하는 공간 무드를 선택하시면 아틀리에 무드 성수의 표준 시공 기준에 맞춘 대략적인 프로젝트 예산 범위를 즉시 산출해 드립니다.
          </p>
        </div>

        {/* Simulator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-900/60 p-6 lg:p-8 rounded-sm border border-white/10 space-y-8">
            {/* Step 1: Business Type */}
            <div>
              <label className="block text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                STEP 1. 공간 업종 분류
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ESTIMATE_OPTIONS.businessTypes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedBusiness(item.id)}
                    className={`p-3.5 rounded-sm border text-left transition-all ${
                      selectedBusiness === item.id
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm'
                        : 'bg-stone-950/50 border-white/5 text-stone-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-bold block mb-0.5 text-stone-200">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-stone-400 block font-light">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Area Size */}
            <div>
              <label className="block text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                STEP 2. 시공 면적 규모
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {ESTIMATE_OPTIONS.areaSizes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedArea(item.id)}
                    className={`p-3 rounded-sm border text-center transition-all ${
                      selectedArea === item.id
                        ? 'bg-amber-500/20 border-amber-400 text-white'
                        : 'bg-stone-950/50 border-white/5 text-stone-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-bold block">{item.label.split('(')[0]}</span>
                    <span className="text-[10px] text-stone-400 font-mono block">
                      약 {item.pyung}평 기준
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Style Mood */}
            <div>
              <label className="block text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                STEP 3. 콘셉트 스타일 & 물성
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {ESTIMATE_OPTIONS.styleMoods.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMood(item.id)}
                    className={`p-3.5 rounded-sm border text-left transition-all ${
                      selectedMood === item.id
                        ? 'bg-amber-500/20 border-amber-400 text-white'
                        : 'bg-stone-950/50 border-white/5 text-stone-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-bold block mb-1 text-stone-200">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-stone-400 font-light block leading-tight">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Additional Options */}
            <div>
              <label className="block text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                STEP 4. 원스톱 부가 솔루션
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3.5 rounded-sm bg-stone-950/50 border border-white/5 cursor-pointer hover:border-white/20">
                  <input
                    type="checkbox"
                    checked={includeBranding}
                    onChange={(e) => setIncludeBranding(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-200 block">브랜드 아이덴티티(BX) 기획</span>
                    <span className="text-[11px] text-stone-400 block font-light">로고, 사이니지, 패키지 그래픽 연계</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-sm bg-stone-950/50 border border-white/5 cursor-pointer hover:border-white/20">
                  <input
                    type="checkbox"
                    checked={includeFurniture}
                    onChange={(e) => setIncludeFurniture(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-200 block">오더메이드 맞춤 가구 제작</span>
                    <span className="text-[11px] text-stone-400 block font-light">공간 맞춤 원석 바 & 테이블 제작</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Realtime Result Card (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-950 p-6 lg:p-8 rounded-sm border border-amber-500/30 sticky top-28 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
                PROJECT ESTIMATION REPORT
              </span>
              <h3 className="font-serif text-xl font-bold text-white">
                예상 프로젝트 견적 범위
              </h3>
            </div>

            {/* Calculated Big Number */}
            <div className="py-2">
              <span className="text-xs text-stone-400 font-mono block mb-1">예상 총 공사비 범위 (VAT 별도 예시)</span>
              <div className="text-2xl lg:text-3xl font-serif font-black text-amber-300">
                약 {minRange.toLocaleString()}만 ~ {maxRange.toLocaleString()}만원
              </div>
              <p className="text-[11px] text-stone-400 font-mono mt-1">
                평당 평균 약 {totalPerPyung.toLocaleString()}만원 선
              </p>
            </div>

            {/* Breakdown summary */}
            <div className="space-y-2 py-4 border-y border-white/10 text-xs font-mono">
              <div className="flex justify-between text-stone-300">
                <span>선택 업종</span>
                <span className="text-stone-100">{business.label}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>적용 면적</span>
                <span className="text-stone-100">{area.label}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>공간 콘셉트</span>
                <span className="text-stone-100">{mood.label}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>브랜드 BX</span>
                <span className="text-stone-100">{includeBranding ? '포함 (+800만)' : '미포함'}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>맞춤 가구</span>
                <span className="text-stone-100">{includeFurniture ? '포함 (평당 +45만)' : '미포함'}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 leading-relaxed font-light">
              * 위 산출 금액은 자재 등급 및 현장 철거/설비 조건에 따라 달라질 수 있는 참고 예시이며, 현장 실측 후 상세 내역서가 확정됩니다.
            </p>

            <button
              onClick={handleApply}
              className="w-full py-4 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-amber-500/20"
            >
              이 조건으로 1:1 현장 실측 및 상담 신청
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
