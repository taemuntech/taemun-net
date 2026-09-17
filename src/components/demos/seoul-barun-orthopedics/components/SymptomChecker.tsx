import React, { useState } from 'react';
import { BodyRegion, RegionQuizData } from '../types';
import { INITIAL_QUIZ_DATA } from '../data/clinicData';

interface SymptomCheckerProps {
  onProceedToBooking: (region: BodyRegion, condition: string) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onProceedToBooking }) => {
  const [currentRegion, setCurrentRegion] = useState<BodyRegion>('neck');
  const [quizData, setQuizData] = useState<Record<BodyRegion, RegionQuizData>>(INITIAL_QUIZ_DATA);

  const currentTab = quizData[currentRegion];

  const handleToggle = (idx: number, checked: boolean) => {
    setQuizData((prev) => {
      const regionData = prev[currentRegion];
      const updatedSymptoms = regionData.symptoms.map((s, i) =>
        i === idx ? { ...s, checked } : s
      );
      const checkedCount = updatedSymptoms.filter((s) => s.checked).length;
      const total = updatedSymptoms.length;
      const pct = Math.max(15, Math.round((checkedCount / total) * 100));

      return {
        ...prev,
        [currentRegion]: {
          ...regionData,
          symptoms: updatedSymptoms,
          progress: pct,
          matchRate: `${pct}% 일치`,
        },
      };
    });
  };

  const handleReset = () => {
    setQuizData((prev) => {
      const regionData = prev[currentRegion];
      return {
        ...prev,
        [currentRegion]: {
          ...regionData,
          symptoms: regionData.symptoms.map((s) => ({ ...s, checked: false })),
          progress: 15,
          matchRate: '15% (경미)',
        },
      };
    });
  };

  const regionTabs: { key: BodyRegion; label: string; icon: string }[] = [
    { key: 'neck', label: '목 & 어깨 (경추·오십견)', icon: 'personal_injury' },
    { key: 'lumbar', label: '허리 & 골반 (디스크·협착증)', icon: 'accessibility_new' },
    { key: 'knee', label: '무릎 관절 (퇴행성·연골판)', icon: 'directions_walk' },
    { key: 'ankle', label: '발목 & 족부 (족저근막염·아킬레스)', icon: 'steps' },
  ];

  return (
    <section id="self-diagnosis" className="w-full bg-[#F4F3F1] py-12 lg:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12">
        {/* Section Title & Lead */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-1.5 text-[#00652C] text-xs lg:text-sm mb-1 font-bold">
            <span className="material-symbols-outlined text-[18px]">mobile_share</span>
            <span>SYMPTOM CHECKER</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1C1A] tracking-tight">
            5대 주요 부위별 통증 자가진단 시스템
          </h2>
          <p className="text-sm lg:text-base text-[#3F493F] mt-2">
            불편하신 부위와 증상을 선택하시면, 바른마디 임상 알고리즘이 예상 질환군과 비수술 치료 권장 단계를 즉시 분석해 드립니다.
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {regionTabs.map((tab) => {
            const isSelected = currentRegion === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setCurrentRegion(tab.key)}
                className={`px-4 lg:px-5 py-2.5 rounded-full text-xs lg:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#00652C] text-white shadow-sm'
                    : 'bg-white text-[#3F493F] hover:text-[#1A1C1A] border border-[#E9E8E5] hover:bg-[#FAF9F6]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quiz & Live Analysis Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Questions Card (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-[#E9E8E5] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EFEEEB]">
                <span className="text-sm lg:text-base font-bold text-[#1A1C1A] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00652C]"></span>
                  {currentTab.label}
                </span>
                <span className="text-xs text-[#545F73]">3개 이상 체크 시 정밀진단 권장</span>
              </div>

              {/* Dynamic Symptom Checklist */}
              <div className="space-y-2">
                {currentTab.symptoms.map((symptom, idx) => (
                  <label
                    key={symptom.id}
                    className={`flex items-start gap-3 p-3 rounded-xl hover:bg-[#F4F3F1] transition-colors cursor-pointer border ${
                      symptom.checked
                        ? 'bg-[#F4F3F1]/80 border-[#00652C]/20 text-[#1A1C1A]'
                        : 'border-transparent text-[#3F493F]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={symptom.checked}
                      onChange={(e) => handleToggle(idx, e.target.checked)}
                      className="w-5 h-5 mt-0.5 rounded accent-[#00652C] cursor-pointer"
                    />
                    <span className="text-xs lg:text-sm leading-relaxed select-none">
                      {symptom.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Interaction Bar */}
            <div className="pt-4 mt-6 border-t border-[#EFEEEB] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[#3F493F] text-xs">
                <span className="material-symbols-outlined text-[#00652C] text-[18px]">info</span>
                <span>체크 개수에 따라 실시간으로 우측 분석 소견이 갱신됩니다.</span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs lg:text-sm font-semibold text-[#545F73] hover:text-[#1A1C1A] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                <span>선택 초기화</span>
              </button>
            </div>
          </div>

          {/* Live Analysis Diagnosis Card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white p-5 lg:p-6 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#E9E8E5] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-[#D5E0F8] text-[#586377] text-xs font-bold">
                  실시간 임상 알고리즘 결과
                </span>
                <span className="text-[11px] text-[#6F7A6E] font-mono tracking-wider font-semibold">
                  LIVE ANALYSIS
                </span>
              </div>

              {/* Suspected Condition Header */}
              <div className="p-4 rounded-xl bg-[#F4F3F1] mb-5 border border-[#E9E8E5]">
                <div className="text-xs text-[#545F73] font-semibold">가장 의심되는 주요 질환군</div>
                <h3 className="text-base lg:text-lg text-[#1A1C1A] font-bold mt-1 leading-snug">
                  {currentTab.diagnosis}
                </h3>

                {/* Match Meter */}
                <div className="mt-3">
                  <div className="flex justify-between items-center text-xs mb-1 font-semibold">
                    <span className="text-[#3F493F]">증상 일치도 분석</span>
                    <span className="text-[#00652C] font-bold">{currentTab.matchRate}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#EFEEEB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00652C] to-[#007D73] transition-all duration-500 rounded-full"
                      style={{ width: `${currentTab.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Recommended 3-Step Non-Surgical Treatment Pathway */}
              <div className="space-y-2">
                <div className="text-xs lg:text-sm text-[#1A1C1A] font-bold flex items-center gap-1.5 mb-2">
                  <span className="material-symbols-outlined text-[#00652C] text-[18px]">
                    playlist_add_check
                  </span>
                  <span>추천 비수술 치료 3단계 로드맵</span>
                </div>

                {/* Step 1 */}
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#FAF9F6] border border-[#EFEEEB]">
                  <div className="w-6 h-6 rounded-full bg-[#00652C] text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="text-xs lg:text-sm font-bold text-[#1A1C1A]">
                      {currentTab.step1.title}
                    </div>
                    <div className="text-xs text-[#3F493F] mt-0.5 leading-normal">
                      {currentTab.step1.desc}
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#FAF9F6] border border-[#EFEEEB]">
                  <div className="w-6 h-6 rounded-full bg-[#007D73] text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="text-xs lg:text-sm font-bold text-[#1A1C1A]">
                      {currentTab.step2.title}
                    </div>
                    <div className="text-xs text-[#3F493F] mt-0.5 leading-normal">
                      {currentTab.step2.desc}
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#FAF9F6] border border-[#EFEEEB]">
                  <div className="w-6 h-6 rounded-full bg-[#545F73] text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="text-xs lg:text-sm font-bold text-[#1A1C1A]">
                      {currentTab.step3.title}
                    </div>
                    <div className="text-xs text-[#3F493F] mt-0.5 leading-normal">
                      {currentTab.step3.desc}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 mt-4 border-t border-[#EFEEEB]">
              <button
                onClick={() => onProceedToBooking(currentRegion, currentTab.diagnosis)}
                className="w-full py-3 px-4 rounded-xl bg-[#00652C] hover:bg-[#15803D] text-white text-xs lg:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(0,101,44,0.2)] cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>위 소견으로 당일 정밀진단 예약하기</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
