'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#04060A] border-t border-zinc-800 text-zinc-400 py-12 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-white text-base">APEX ATHLETIC ACADEMY</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-lime-500/10 text-lime-400 border border-lime-500/30">
                OFFICIAL DEMO
              </span>
            </div>
            <p className="text-zinc-500 leading-relaxed max-w-md mb-4 font-sans">
              아펙스 체대입시 &amp; 엘리트 스포츠 아카데미는 대한민국 최고 수준의 디지털 전자기측기와
              스포츠 생체역학(Biomechanics) 분석 시스템을 기반으로 최상위 체육교육과 합격을 실현합니다.
            </p>
            <p className="text-[11px] text-zinc-600">
              * 본 웹사이트는 포트폴리오 시연용 샘플 사이트이며 실존 인물·대학·점수 지표는 가상 예시 처리되어 있습니다.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">
              아카데미 센터 위치
            </h4>
            <div className="space-y-1.5 text-zinc-500 font-sans">
              <p>본원: 서울특별시 송파구 위례성대로 000 스포츠센터 3층 (예시)</p>
              <p>대표전화: 02-0000-0000</p>
              <p>이메일: contact@example.com (예시)</p>
              <p>운영시간: 평일 14:00 ~ 22:30 / 주말 09:00 ~ 21:00 (예시)</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">
              아카데미 정책
            </h4>
            <div className="space-y-1.5 text-zinc-500 font-sans">
              <p>학원등록번호: 제2026-0000호 (예시)</p>
              <p>개인정보 처리방침</p>
              <p>체육시설 안전수칙 및 수강료 반환 기준</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 text-center text-zinc-600 text-[11px]">
          &copy; 2026 APEX ATHLETIC ACADEMY. All rights reserved. (Demo Portfolio Sample)
        </div>
      </div>
    </footer>
  );
}
