'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#05080E] border-t border-zinc-800 text-zinc-400 py-12 text-xs font-serif">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-white text-base">LEX ACADEMY</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                OFFICIAL DEMO
              </span>
            </div>
            <p className="text-zinc-500 leading-relaxed max-w-md mb-4 font-sans">
              렉스 아카데미는 법학전문대학원(로스쿨 LEET) 및 공인회계사(CPA) 시험에 특화된 프리미엄 전문직 고시 아카데미입니다.
              기출 핀셋 해체와 엄밀한 논리학 훈련으로 최단기 고득점 합격을 견인합니다.
            </p>
            <p className="text-[11px] text-zinc-600">
              * 본 웹사이트는 포트폴리오 시연용 샘플 사이트이며 실존 인물·대학·점수 지표는 가상 예시 처리되어 있습니다.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">
              고시관 위치
            </h4>
            <div className="space-y-1.5 text-zinc-500 font-sans">
              <p>위치: 서울특별시 관악구 신림로 000 고시타워 4층 (예시)</p>
              <p>대표전화: 02-0000-0000</p>
              <p>이메일: contact@example.com (예시)</p>
              <p>운영시간: 매일 07:00 ~ 23:00 (자습실 연중무휴 개방, 예시)</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">
              고시관 정책
            </h4>
            <div className="space-y-1.5 text-zinc-500 font-sans">
              <p>학원등록번호: 제2026-0000호 (예시)</p>
              <p>개인정보 처리방침</p>
              <p>독서실 및 강의 환불 규정</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 text-center text-zinc-600 text-[11px]">
          &copy; 2026 LEX ACADEMY. All rights reserved. (Demo Portfolio Sample)
        </div>
      </div>
    </footer>
  );
}
