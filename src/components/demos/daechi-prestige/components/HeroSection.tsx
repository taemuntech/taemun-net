'use client';

import React from 'react';
import { ASSETS } from '../data/mockData';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onOpenReportModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onOpenReportModal,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-12 lg:py-20">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Top Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="font-label-md text-primary tracking-wide">
                2026학년도 의대 증원 대응 메디컬 정밀 데이터 랩(예시)
              </span>
            </div>

            {/* Headline & Description */}
            <div className="flex flex-col gap-3">
              <h1 className="font-display-lg text-on-surface tracking-tight leading-[1.2]">
                복잡한 의대 입시,<br />
                <span className="text-primary italic font-serif">데이터와 시각 지표</span>로<br />
                한눈에 증명합니다.
              </h1>
              <p className="font-body-lg text-on-surface-variant max-w-xl pt-2">
                비전문가 학부모님도 3초 만에 자녀의 취약점과 합격 확률을 읽어내는 대치동 상위 0.01% 의치약한 전용 시각 진단 시스템(예시). 막연한 열심이 아닌, 오차 없는 수학적 로드맵을 제공합니다.
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-inverse-surface text-surface font-title-lg shadow-[0_8px_24px_rgba(114,91,56,0.22)] hover:bg-on-surface hover:shadow-xl transition-all cursor-pointer group min-h-[48px]"
              >
                <span>1:1 정밀 심층진단 예약하기</span>
                <span className="material-symbols-outlined text-[20px] text-primary-fixed-dim transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
              <button
                onClick={onOpenReportModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-surface-container-lowest text-on-surface font-title-md shadow-xs hover:bg-surface-container hover:shadow-sm transition-all cursor-pointer min-h-[48px]"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">
                  analytics
                </span>
                <span>2026 의대 합격선 리포트 열람(예시)</span>
              </button>
            </div>

            {/* Metric Badges Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4 pt-6 border-none">
              <div className="flex flex-col p-4 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-shadow">
                <span className="font-label-sm text-secondary tracking-widest uppercase">
                  의치약한 최종 합격(예시)
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-headline-lg text-primary font-bold">142</span>
                  <span className="font-title-md text-on-surface">명</span>
                </div>
                <span className="font-body-sm text-on-surface-variant mt-0.5">
                  S대·C대 등 주요 의대(예시)
                </span>
              </div>

              <div className="flex flex-col p-4 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-shadow">
                <span className="font-label-sm text-secondary tracking-widest uppercase">
                  킬러 풀이 시간(예시)
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-headline-lg text-primary font-bold">-78</span>
                  <span className="font-title-md text-on-surface">%</span>
                </div>
                <span className="font-body-sm text-on-surface-variant mt-0.5">
                  18분 ➔ 3분 30초 단축(예시)
                </span>
              </div>

              <div className="flex flex-col p-4 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-shadow">
                <span className="font-label-sm text-secondary tracking-widest uppercase">
                  수능 전과목 평균(예시)
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-headline-lg text-primary font-bold">99.4</span>
                  <span className="font-title-md text-on-surface">%</span>
                </div>
                <span className="font-body-sm text-on-surface-variant mt-0.5">
                  백분위 의대 상위권(예시)
                </span>
              </div>
            </div>
          </div>

          {/* Hero Right Collage & Floating Trust Card */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <div className="relative w-full max-w-[500px] grid grid-cols-12 gap-3">
              {/* Left Booth Photo */}
              <div className="col-span-7 rounded-2xl overflow-hidden shadow-xl aspect-[3/4] bg-surface-container group">
                <img
                  alt="Oak private study booth student"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={ASSETS.boothStudent}
                />
              </div>

              {/* Right Stack: Consulting Room & Feature Card */}
              <div className="col-span-5 flex flex-col gap-3 pt-6">
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-square bg-surface-container group">
                  <img
                    alt="Executive 1:1 consulting session with report"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={ASSETS.consultingRoom}
                  />
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-center border border-surface-container-high/40">
                  <div className="flex items-center gap-1.5 text-primary mb-1">
                    <span className="material-symbols-outlined text-[18px]">
                      verified_user
                    </span>
                    <span className="font-label-md font-bold">상위 0.01% 전용(예시)</span>
                  </div>
                  <div className="font-headline-sm text-on-surface">1:1 특화관</div>
                  <p className="font-body-sm text-on-surface-variant mt-0.5">
                    대치동 단독 프리미엄 1인 부스(예시)
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Glassmorphic Trust Card */}
            <div className="mt-4 lg:-mt-10 lg:-ml-12 w-full max-w-[420px] p-4 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_12px_36px_rgba(114,91,56,0.18)] z-10 border border-primary/10 hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[24px]">
                    school
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-on-surface">
                      S대 의예과 적합도(예시)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm font-bold">
                      99.8% 달성(예시)
                    </span>
                  </div>
                  <span className="font-body-sm text-on-surface-variant mt-1">
                    학생부 종합 세특 35항목 &amp; 모의평가 변환표준점수 정밀 분석(예시)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
