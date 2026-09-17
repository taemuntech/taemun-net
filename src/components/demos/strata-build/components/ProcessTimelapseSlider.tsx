'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { STRATA_STAGES } from '../data/strataData';
import { BuildStage } from '../types';

export default function ProcessTimelapseSlider() {
  const [progress, setProgress] = useState<number>(68); // 초기 68% (3단계 골조 양중)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 현재 공정률에 해당하는 단계 계산
  const currentStage: BuildStage = (() => {
    if (progress <= 25) return STRATA_STAGES[0];
    if (progress <= 55) return STRATA_STAGES[1];
    if (progress <= 85) return STRATA_STAGES[2];
    return STRATA_STAGES[3];
  })();

  // 자동 타임랩스 재생
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying]);

  const handleStageSelect = (stageId: 1 | 2 | 3 | 4) => {
    setIsPlaying(false);
    if (stageId === 1) setProgress(15);
    else if (stageId === 2) setProgress(42);
    else if (stageId === 3) setProgress(68);
    else setProgress(94);
  };

  return (
    <section id="timelapse" className="relative w-full border-t border-slate-800 bg-slate-950 py-16 text-white lg:py-24">
      {/* 배경 장식 그리드 */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* 섹션 헤더 */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>INTERACTIVE CONSTRUCTION TIMELAPSE</span>
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-white lg:text-4xl">
            0% 터파기부터 100% 준공까지 — 실시간 공정 빌드업
          </h2>
          <p className="mt-3 text-sm text-slate-400 lg:text-base">
            슬라이더를 조작하거나 재생 버튼을 눌러 건축물이 솟아오르는 4대 공정의 변화를 생생하게 확인해 보세요.
          </p>
        </div>

        {/* 타임랩스 컨트롤 패널 & 슬라이더 HUD */}
        <div className="mb-8 rounded-lg border border-amber-500/30 bg-slate-900/90 p-5 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* 좌측 재생 버튼 및 현재 공정률 */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-amber-500/80 bg-amber-500/20 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all hover:border-amber-400 hover:bg-amber-500 hover:text-slate-950"
                aria-label={isPlaying ? '타임랩스 일시 정지' : '타임랩스 자동 재생'}
              >
                {isPlaying ? (
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75zm9 0a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-black text-amber-400">{progress}%</span>
                  <span className="font-mono text-xs text-slate-400">TOTAL PROGRESS</span>
                </div>
                <p className="font-mono text-xs text-slate-300">
                  {currentStage.subtitle} · {currentStage.period}
                </p>
              </div>
            </div>

            {/* 4대 공정 바로가기 탭 버튼 (lg: 에서 시각화 극대화) */}
            <div className="grid grid-cols-2 gap-2 lg:flex lg:items-center">
              {STRATA_STAGES.map((stg) => {
                const isActive = currentStage.stageId === stg.stageId;
                return (
                  <button
                    key={stg.stageId}
                    onClick={() => handleStageSelect(stg.stageId)}
                    className={`rounded border px-3 py-2 text-left transition-all ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/20 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-mono text-[10px] text-amber-500/70">STAGE 0{stg.stageId}</div>
                    <div className="text-xs font-bold whitespace-nowrap">{stg.title.split('&')[0]}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 대형 프로그레스 슬라이더 */}
          <div className="mt-6">
            <div className="relative flex items-center">
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => {
                  setIsPlaying(false);
                  setProgress(Number(e.target.value));
                }}
                className="h-3 w-full cursor-ew-resize appearance-none rounded-lg bg-slate-800 accent-amber-500 focus:outline-none"
              />
            </div>

            {/* 슬라이더 눈금 지점 라벨 */}
            <div className="mt-2 flex justify-between font-mono text-[11px] text-slate-500">
              <span className={progress <= 25 ? 'font-bold text-amber-400' : ''}>0% 터파기</span>
              <span className={progress > 25 && progress <= 55 ? 'font-bold text-amber-400' : ''}>25% 매트타설</span>
              <span className={progress > 55 && progress <= 85 ? 'font-bold text-amber-400' : ''}>55% 메가골조</span>
              <span className={progress > 85 ? 'font-bold text-amber-400' : ''}>100% 준공</span>
            </div>
          </div>
        </div>

        {/* 현재 공정 메인 쇼케이스 영역 (2열 레이아웃: 좌측 비주얼, 우측 공학 스펙) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 좌측: 대형 비주얼 뷰포트 (7열) */}
          <div className="relative min-h-[380px] overflow-hidden rounded-lg border border-slate-800 bg-slate-900 lg:col-span-7 lg:min-h-[500px]">
            <Image
              src={currentStage.image}
              alt={currentStage.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-all duration-700 ease-out"
            />
            {/* HUD 오버레이 마스크 */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

            {/* 상단 테크니컬 HUD 태그 */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-amber-400">
              <div className="flex items-center gap-2 rounded bg-slate-950/80 px-2.5 py-1 backdrop-blur-md border border-amber-500/30">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE CAM: VIEW-CAM 0{currentStage.stageId}</span>
              </div>
              <div className="rounded bg-slate-950/80 px-2.5 py-1 backdrop-blur-md border border-slate-700 text-slate-300">
                <span>{currentStage.safetyGrade}</span>
              </div>
            </div>

            {/* 하단 캡션 */}
            <div className="absolute bottom-4 left-4 right-4 rounded bg-slate-950/85 p-4 backdrop-blur-md border border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white lg:text-lg">{currentStage.title}</h3>
                <span className="font-mono text-xs font-bold text-amber-400">{currentStage.period}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 lg:text-sm">
                {currentStage.summary}
              </p>
            </div>
          </div>

          {/* 우측: 정밀 시공 감리 스펙 & 투입 장비 (5열) */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {/* 핵심 시공 정밀 스펙 */}
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-sm">
              <h4 className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-amber-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>ENGINEERING SPECIFICATIONS</span>
              </h4>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {currentStage.specs.map((sp, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs text-slate-400">{sp.label}</span>
                    <span className="font-mono text-xs font-bold text-white">{sp.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 투입 건설 장비 */}
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-sm">
              <h4 className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-amber-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>DEPLOYED HEAVY EQUIPMENT</span>
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {currentStage.equipment.map((eq, i) => (
                  <span
                    key={i}
                    className="rounded border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-200"
                  >
                    {eq}
                  </span>
                ))}
              </div>
            </div>

            {/* 현장 감리 중점 점검 항목 */}
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-5 backdrop-blur-sm">
              <h4 className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-amber-300">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>FIELD INSPECTION CHECKPOINTS</span>
              </h4>
              <ul className="mt-3 space-y-2">
                {currentStage.inspectionPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
