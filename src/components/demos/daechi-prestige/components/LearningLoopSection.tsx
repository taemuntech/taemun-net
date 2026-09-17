'use client';

import React, { useState } from 'react';
import { LEARNING_SCHEDULE } from '../data/mockData';

interface LearningLoopSectionProps {
  onOpenReportModal: () => void;
}

export const LearningLoopSection: React.FC<LearningLoopSectionProps> = ({
  onOpenReportModal,
}) => {
  const [activeStepTime, setActiveStepTime] = useState<string>('21:00');

  return (
    <section className="w-full py-16 lg:py-24 bg-surface" id="168h-loop">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col text-center items-center gap-3 max-w-2xl mx-auto">
          <span className="font-label-md text-primary tracking-widest uppercase">
            PRECISION TIME SYSTEM
          </span>
          <h2 className="font-headline-lg text-on-surface">
            주간 168시간 밀착 학습 루프 &amp; 학부모 안심 피드(예시)
          </h2>
          <p className="font-body-md text-on-surface-variant">
            단 1분도 허투루 버려지지 않는 의대 합격 루틴. 원내 학습 및 자습 현황이 학부모님 모바일 앱으로 실시간 데이터 리포트 발송됩니다(예시).
          </p>
        </div>

        {/* 2-Column: Left Daily Timeline, Right Phone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Daily Flow Timeline (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {LEARNING_SCHEDULE.map((item) => {
              const isSelected = activeStepTime === item.time;
              return (
                <div
                  key={item.time}
                  onClick={() => setActiveStepTime(item.time)}
                  className={`p-5 rounded-2xl shadow-xs flex items-start gap-4 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-surface-container border-primary/40 shadow-sm ring-1 ring-primary/20'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                  }`}
                >
                  <div
                    className={`px-3 py-1.5 rounded-lg font-title-md font-bold shrink-0 transition-colors ${
                      item.highlight
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-highest text-primary'
                    }`}
                  >
                    {item.time}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-title-md text-on-surface">{item.title}</h3>
                      <span className="hidden lg:inline-block font-label-sm text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                        {item.category}
                      </span>
                    </div>
                    <p className="font-body-sm text-on-surface-variant mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Realistic Mobile Mockup Displaying Parent Kakao Feed (Right) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[360px] rounded-[36px] bg-inverse-surface p-3 shadow-[0_24px_50px_rgba(0,0,0,0.18)] border-4 border-[#3a3937]">
              {/* Speaker notch */}
              <div className="w-20 h-3.5 bg-neutral-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-8 h-1 bg-neutral-700 rounded-full" />
              </div>

              {/* Screen Area */}
              <div className="w-full rounded-[28px] bg-surface-container-lowest p-5 flex flex-col gap-4 overflow-hidden shadow-inner">
                {/* Mobile App Header */}
                <div className="flex items-center justify-between border-b border-surface-container pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs">
                      <span className="material-symbols-outlined text-[16px]">
                        notifications_active
                      </span>
                    </div>
                    <span className="font-title-md text-on-surface text-sm font-bold">
                      대치 프레스티지 알림톡(예시)
                    </span>
                  </div>
                  <span className="font-label-sm text-outline">오후 9:02</span>
                </div>

                {/* Message Bubble */}
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3 border border-surface-container/60">
                  <div className="font-title-md text-on-surface font-bold text-sm">
                    [김○준 학생] 일간 메디컬 학습 리포트(예시)
                  </div>
                  <div className="flex flex-col gap-1.5 font-body-sm text-on-surface-variant text-xs">
                    <div className="flex justify-between">
                      <span>오늘 순공 시간:</span>
                      <span className="font-bold text-on-surface">10시간 42분 (목표 100%, 예시)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>아침 데일리 킬러 10제:</span>
                      <span className="font-bold text-primary">10 / 10 완제 (정답률 100%, 예시)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>금일 취약점 클리닉:</span>
                      <span className="font-bold text-on-surface">미적분 음함수 2문항 완료(예시)</span>
                    </div>
                  </div>

                  {/* Mini Progress Chart Inside Mobile */}
                  <div className="p-3 rounded-lg bg-surface-container-lowest mt-1 flex flex-col gap-2 shadow-xs border border-surface-container/40">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-on-surface font-semibold">
                        이번 주 S대 의대 합격선 근접도(예시)
                      </span>
                      <span className="text-primary font-bold">99.4%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[94%]" />
                    </div>
                  </div>

                  <p className="font-label-sm text-outline mt-1 text-[11px] leading-relaxed">
                    * 담임 메디컬 디렉터: “학생은 금일 킬러 연산 단축 훈련에서 실수 없이 3분 대에 완벽 진입했습니다(예시).”
                  </p>
                </div>

                {/* Action button inside mobile */}
                <button
                  onClick={onOpenReportModal}
                  className="w-full py-3 rounded-lg bg-inverse-surface text-surface font-title-md text-sm text-center hover:bg-on-surface transition-colors cursor-pointer shadow-sm min-h-[44px]"
                >
                  전체 상세 성적표 열람(예시)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
