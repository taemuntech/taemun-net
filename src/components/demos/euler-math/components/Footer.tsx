'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#07090E] text-slate-400 border-t border-[#172030] py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-mono font-bold text-base">
                &Sigma;
              </div>
              <span className="font-mono text-base tracking-wider text-white font-bold uppercase">
                EULER MATHEMATICS ACADEMY
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-md mb-6">
              오일러 수학 영재학술원은 단순 유형 반복 훈련을 지양하고, 기하학적 시각화와 엄밀한 정수·대수·조합 증명을 통해 KMO 올림피아드 및 영재학교 합격을 지원합니다.
            </p>
            <div className="p-3 bg-[#0F1420] border border-[#1E293B] rounded-xl inline-block">
              <span className="text-[11px] text-cyan-400 block">
                가상 브랜드 샘플 — 실제 업체가 아닙니다 (영재 수학학원 설정)
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              학술원 안내
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>대표전화: 02-0000-0000</li>
              <li>학술상담: contact@example.com</li>
              <li>운영시간: 화~일 13:00 - 22:00 (월요일 정기 휴관)</li>
              <li>위치: 서울특별시 강남구 도곡로 (예시)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              전문 트랙
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>KMO 올림피아드 1차·2차 전국 연합 평가 (예시)</li>
              <li>영재학교 3단계 심층 구술면접 캠프</li>
              <li>3D 다면체 기하학 &amp; 위상수학 모델링 Lab</li>
              <li>1:1 영재성 정밀 수리 진단평가</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#172030] flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 EULER MATHEMATICS Academy. All Rights Reserved. (샘플 데모)</p>
          <p>태문 DEV STUDIO 프리미엄 영재수학 &amp; 에듀테크 포트폴리오</p>
        </div>
      </div>
    </footer>
  );
}
