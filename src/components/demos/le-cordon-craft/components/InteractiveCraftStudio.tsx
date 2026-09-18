'use client';

import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Flower2,
  Thermometer,
  Sparkles,
  Clock,
  Layers,
  Palette,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Info,
} from 'lucide-react';
import { DESSERT_COURSES, FLORAL_THEMES } from '../data/leCordonData';
import { CraftDiscipline } from '../types';

interface InteractiveCraftStudioProps {
  discipline: CraftDiscipline;
  setDiscipline: (d: CraftDiscipline) => void;
  onOpenConsultation: () => void;
}

export function InteractiveCraftStudio({
  discipline,
  setDiscipline,
  onOpenConsultation,
}: InteractiveCraftStudioProps) {
  // 파티스리 상태
  const [selectedDessertIndex, setSelectedDessertIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // 플로랄 상태
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const [focalRatio, setFocalRatio] = useState(50);
  const [secondaryRatio, setSecondaryRatio] = useState(30);
  const [greeneryRatio, setGreeneryRatio] = useState(20);

  const activeDessert = DESSERT_COURSES[selectedDessertIndex];
  const activeStep = activeDessert.steps[currentStepIndex];

  const activeTheme = FLORAL_THEMES[selectedThemeIndex];

  return (
    <section id="craft-studio" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        {/* 상단 섹션 헤더 */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE CRAFT SIMULATION LAB (예시)</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-stone-50">
            예술과 과학이 교차하는 공예 아틀리에
          </h2>
          <p className="text-stone-300 text-xs lg:text-sm font-light leading-relaxed">
            파티시에의 정밀 온도 템퍼링 곡선과 플로리스트의 색채학적 배합 비율을
            직접 조작하며 아카데미의 하이엔드 테크닉을 가상으로 체험해 보십시오.
          </p>

          {/* 모드 전환 탭 */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-stone-950 border border-stone-800 shadow-inner">
            <button
              type="button"
              onClick={() => setDiscipline('patisserie')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                discipline === 'patisserie'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>파티스리 정밀 템퍼링 랩</span>
            </button>
            <button
              type="button"
              onClick={() => setDiscipline('floral')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                discipline === 'floral'
                  ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-950/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Flower2 className="w-4 h-4" />
              <span>오뜨 플로랄 팔레트 아틀리에</span>
            </button>
          </div>
        </div>

        {/* 1. 파티스리 템퍼링 랩 모드 */}
        {discipline === 'patisserie' && (
          <div className="space-y-8">
            {/* 디저트 메뉴 선택 탭 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {DESSERT_COURSES.map((course, idx) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => {
                    setSelectedDessertIndex(idx);
                    setCurrentStepIndex(0);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedDessertIndex === idx
                      ? 'bg-gradient-to-b from-stone-800 to-stone-900 border-amber-600 shadow-xl shadow-amber-950/30'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono text-amber-400">{course.category}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      {course.difficulty}
                    </span>
                  </div>
                  <h3 className="text-sm font-serif font-bold text-stone-100">{course.name}</h3>
                  <p className="text-[11px] text-stone-400 font-serif italic mt-0.5">{course.frenchName}</p>
                </button>
              ))}
            </div>

            {/* 메인 인터랙티브 작업대 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-stone-950 p-6 lg:p-8 rounded-2xl border border-stone-800 shadow-2xl">
              {/* 좌측: 4단계 스텝 제어 및 슬라이더 */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                    <Thermometer className="w-4 h-4 text-amber-400" />
                    <span>PRECISION PROCESS STEP {activeStep.stepNumber} / 4 (예시)</span>
                  </div>
                  <span className="text-xs font-mono text-stone-400">{activeStep.duration}</span>
                </div>

                {/* 스텝 버튼 그리드 */}
                <div className="grid grid-cols-4 gap-2">
                  {activeDessert.steps.map((st, idx) => (
                    <button
                      key={st.stepNumber}
                      type="button"
                      onClick={() => setCurrentStepIndex(idx)}
                      className={`p-3 rounded-lg text-center border transition-all ${
                        currentStepIndex === idx
                          ? 'bg-amber-600/30 border-amber-500 text-amber-200 font-bold'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                      }`}
                    >
                      <div className="text-[10px] font-mono">STEP 0{st.stepNumber}</div>
                      <div className="text-xs truncate mt-0.5">{st.temperature}</div>
                    </button>
                  ))}
                </div>

                {/* 현재 스텝 상세 정보 카드 */}
                <div className="p-5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-stone-100 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">
                        {activeStep.stepNumber}
                      </span>
                      {activeStep.title}
                    </h4>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 font-mono">
                      {activeStep.temperature}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-stone-950 border border-stone-800">
                      <span className="text-[11px] text-stone-400 block mb-1">핵심 제과 테크닉</span>
                      <span className="font-semibold text-stone-200">{activeStep.technique}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-950 border border-stone-800">
                      <span className="text-[11px] text-stone-400 block mb-1">상태 및 점도 (예시)</span>
                      <span className="font-semibold text-amber-300">{activeStep.viscosity}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/40 text-xs leading-relaxed text-stone-300">
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>물리화학적 셰프 노트 (예시)</span>
                    </div>
                    {activeStep.scienceNote}
                  </div>
                </div>

                {/* 다음/이전 스텝 제어 버튼 */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={currentStepIndex === 0}
                    onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-300 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    이전 단계
                  </button>
                  <button
                    type="button"
                    disabled={currentStepIndex === activeDessert.steps.length - 1}
                    onClick={() => setCurrentStepIndex((prev) => Math.min(activeDessert.steps.length - 1, prev + 1))}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <span>다음 단계 테크닉 확인</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 우측: 시각적 온도 곡선 및 결정 구조 텔레메트리 (SVG) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-stone-800">
                    <span className="font-mono text-stone-400">TEMPERING CURVE LAB (예시)</span>
                    <span className="text-amber-400 font-semibold">{activeStep.temperature}</span>
                  </div>

                  {/* 인터랙티브 SVG 온도 곡선 차트 */}
                  <div className="relative h-44 bg-stone-950 rounded-lg p-2 flex items-center justify-center border border-stone-800">
                    <svg className="w-full h-full" viewBox="0 0 400 160">
                      {/* 가이드 그리드 라인 */}
                      <line x1="40" y1="20" x2="380" y2="20" stroke="#333" strokeDasharray="3 3" />
                      <line x1="40" y1="60" x2="380" y2="60" stroke="#333" strokeDasharray="3 3" />
                      <line x1="40" y1="100" x2="380" y2="100" stroke="#333" strokeDasharray="3 3" />
                      <line x1="40" y1="140" x2="380" y2="140" stroke="#444" />

                      {/* Y축 레이블 */}
                      <text x="10" y="25" fill="#888" fontSize="9">55°C</text>
                      <text x="10" y="65" fill="#888" fontSize="9">40°C</text>
                      <text x="10" y="105" fill="#888" fontSize="9">28°C</text>
                      <text x="10" y="145" fill="#888" fontSize="9">0°C</text>

                      {/* 템퍼링 곡선 경로 */}
                      <path
                        d="M 60 25 Q 120 28 170 105 T 270 95 T 360 92"
                        fill="none"
                        stroke="#D97706"
                        strokeWidth="3"
                      />

                      {/* 각 스텝 포인트 마커 */}
                      {[
                        { cx: 60, cy: 25, step: 0, label: '1차융해 55°C' },
                        { cx: 170, cy: 105, step: 1, label: '급랭 28°C' },
                        { cx: 270, cy: 95, step: 2, label: '재가온 31°C' },
                        { cx: 360, cy: 92, step: 3, label: '도포 32°C' },
                      ].map((pt) => {
                        const isCurrent = currentStepIndex === pt.step;
                        return (
                          <g key={pt.step}>
                            <circle
                              cx={pt.cx}
                              cy={pt.cy}
                              r={isCurrent ? 7 : 4}
                              fill={isCurrent ? '#F59E0B' : '#78350F'}
                              stroke="#FFF"
                              strokeWidth={isCurrent ? 2 : 1}
                              className="transition-all duration-300"
                            />
                            {isCurrent && (
                              <circle
                                cx={pt.cx}
                                cy={pt.cy}
                                r={12}
                                fill="none"
                                stroke="#F59E0B"
                                strokeWidth="1.5"
                                opacity="0.6"
                              />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* 결정 구조 및 상태 렌더러 시각화 */}
                  <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl border border-amber-600/40 shadow-inner flex items-center justify-center transition-all duration-500"
                      style={{ backgroundColor: activeStep.colorCode }}
                    >
                      <Sparkles className="w-5 h-5 text-amber-200" />
                    </div>
                    <div className="flex-1 text-xs">
                      <span className="text-stone-400 block text-[11px]">안정화 결정 형태</span>
                      <span className="font-serif font-bold text-stone-100 text-sm">
                        Type V 결정 (Beta Polymorph) (예시)
                      </span>
                      <p className="text-[11px] text-amber-400 mt-0.5">최적의 광택감 및 매끄러운 융해 특성 달성</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-xs shadow-lg shadow-amber-950/40 transition-all text-center"
                >
                  이 레시피 마스터 클래스 수강 신청 (예시)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. 오뜨 플로랄 팔레트 모드 */}
        {discipline === 'floral' && (
          <div className="space-y-8">
            {/* 테마 셀렉터 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {FLORAL_THEMES.map((theme, idx) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    setSelectedThemeIndex(idx);
                    setFocalRatio(theme.compositionRatio.focal);
                    setSecondaryRatio(theme.compositionRatio.secondary);
                    setGreeneryRatio(theme.compositionRatio.greenery);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedThemeIndex === idx
                      ? 'bg-gradient-to-b from-stone-800 to-stone-900 border-emerald-600 shadow-xl shadow-emerald-950/30'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <span className="text-[10px] font-mono text-emerald-400">COLLECTION 0{idx + 1}</span>
                  <h3 className="text-sm font-serif font-bold text-stone-100 mt-1">{theme.themeName}</h3>
                  <p className="text-[11px] text-stone-400 font-serif italic">{theme.frenchSubtitle}</p>
                </button>
              ))}
            </div>

            {/* 메인 플로랄 아틀리에 워크스테이션 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-stone-950 p-6 lg:p-8 rounded-2xl border border-stone-800 shadow-2xl">
              {/* 좌측: 컬러 팔레트 & 황금비율 슬라이더 */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-sm font-serif font-bold text-stone-100 flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4 text-emerald-400" />
                    오뜨 꾸뛰르 시그니처 색채 팔레트 (예시)
                  </h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {activeTheme.palette.map((color) => (
                      <div key={color.name} className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                        <div
                          className="w-full h-8 rounded-md mb-2 border border-white/10 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs font-semibold text-stone-200 block truncate">{color.name}</span>
                        <span className="text-[10px] text-stone-400 block truncate mt-0.5">{color.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 구성 비율 인터랙티브 슬라이더 */}
                <div className="p-5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-stone-100 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-400" />
                      플로랄 구조 황금비율 커스터마이징 (예시)
                    </h5>
                    <span className="text-[11px] text-stone-400 font-mono">
                      합계: {focalRatio + secondaryRatio + greeneryRatio}%
                    </span>
                  </div>

                  {/* 포컬 플라워 슬라이더 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-300">포컬 플라워 (메인 시선 유도)</span>
                      <span className="text-emerald-400 font-mono">{focalRatio}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="70"
                      value={focalRatio}
                      onChange={(e) => setFocalRatio(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* 세컨더리 슬라이더 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-300">세컨더리 & 필러 플라워 (볼륨)</span>
                      <span className="text-emerald-400 font-mono">{secondaryRatio}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={secondaryRatio}
                      onChange={(e) => setSecondaryRatio(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* 그리너리 슬라이더 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-300">그리너리 & 라인 소재 (공기감)</span>
                      <span className="text-emerald-400 font-mono">{greeneryRatio}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="40"
                      value={greeneryRatio}
                      onChange={(e) => setGreeneryRatio(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <p className="text-[11px] text-stone-400 italic pt-1">
                    * {activeTheme.stylingTips}
                  </p>
                </div>

                {/* 추천 생화 소재 리스트 */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-stone-400 text-[11px]">추천 생화 소재:</span>
                  {activeTheme.recommendedFlowers.map((flower) => (
                    <span
                      key={flower}
                      className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-emerald-300 text-[11px]"
                    >
                      {flower}
                    </span>
                  ))}
                </div>
              </div>

              {/* 우측: 플로랄 구조 3D 시각화 시뮬레이션 */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-stone-800">
                    <span className="font-mono text-stone-400">FLORAL COMPOSITION PREVIEW (예시)</span>
                    <span className="text-emerald-400 font-medium">스파이럴 밸런스 완벽 (예시)</span>
                  </div>

                  {/* 인터랙티브 부케 기하학적 SVG 렌더러 */}
                  <div className="relative h-60 bg-stone-950 rounded-lg p-2 flex items-center justify-center border border-stone-800 overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 300 240">
                      {/* 줄기 스파이럴 라인 */}
                      <g stroke="#3F4F43" strokeWidth="2.5" opacity="0.8">
                        <line x1="150" y1="130" x2="110" y2="230" />
                        <line x1="150" y1="130" x2="130" y2="230" />
                        <line x1="150" y1="130" x2="160" y2="230" />
                        <line x1="150" y1="130" x2="190" y2="230" />
                        <line x1="150" y1="130" x2="140" y2="230" />
                      </g>

                      {/* 바인딩 포인트 리본 */}
                      <rect x="135" y="125" width="30" height="10" rx="3" fill="#C59358" />

                      {/* 그리너리 레이어 (배경) */}
                      <circle cx="110" cy="90" r={greeneryRatio * 0.9} fill="#4A654C" opacity="0.7" />
                      <circle cx="190" cy="85" r={greeneryRatio * 0.9} fill="#5C7A5E" opacity="0.7" />
                      <circle cx="150" cy="55" r={greeneryRatio * 0.8} fill="#3E5440" opacity="0.7" />

                      {/* 세컨더리 플라워 레이어 (중간) */}
                      <circle
                        cx="125"
                        cy="75"
                        r={secondaryRatio * 0.85}
                        fill={activeTheme.palette[1]?.hex || '#EFC8B1'}
                        opacity="0.85"
                      />
                      <circle
                        cx="175"
                        cy="80"
                        r={secondaryRatio * 0.85}
                        fill={activeTheme.palette[2]?.hex || '#D7C7DC'}
                        opacity="0.85"
                      />

                      {/* 포컬 플라워 레이어 (전면 메인) */}
                      <circle
                        cx="150"
                        cy="95"
                        r={focalRatio * 0.75}
                        fill={activeTheme.palette[0]?.hex || '#F4E3D7'}
                        stroke="#FFF"
                        strokeWidth="1.5"
                      />

                      {/* 중심 수술 악센트 */}
                      <circle cx="150" cy="95" r="5" fill="#C59358" />
                    </svg>
                  </div>

                  <div className="text-xs text-stone-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-400">공간 밀도 지수 (예시)</span>
                      <span className="text-emerald-400 font-mono">1.618 (황금비) (예시)</span>
                    </div>
                    <p className="text-[11px] text-stone-400">
                      소재 간 음영과 여백의 상호작용으로 자연스러운 공기순환 통로가 확보되었습니다.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-xs shadow-lg shadow-emerald-950/40 transition-all text-center"
                >
                  오뜨 꾸뛰르 플라워 클래스 등록 상담 (예시)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
