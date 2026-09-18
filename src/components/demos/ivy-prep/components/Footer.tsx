'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#0D0105] border-t border-rose-900/40 text-rose-300/70 py-12 text-xs font-serif">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-white text-base">IVY PREP ACADEMY</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                OFFICIAL DEMO
              </span>
            </div>
            <p className="text-rose-200/60 leading-relaxed max-w-md mb-4 font-sans">
              아이비 프렙 아카데미는 미국 최상위 명문 사립 보딩스쿨 및 아이비리그(Ivy League) 진학을 목표로 하는
              수험생을 위한 프리미엄 입시 컨설팅 &amp; 테스트 프렙 교육기관입니다.
            </p>
            <p className="text-[11px] text-rose-400/50">
              * 본 웹사이트는 포트폴리오 시연용 샘플 사이트이며 실존 인물·학교·지표의 정보는 가상 예시 처리되어 있습니다.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">
              캠퍼스 위치
            </h4>
            <div className="space-y-1.5 text-rose-200/60 font-sans">
              <p>본원: 서울특별시 강남구 압구정로 000 프레스티지빌딩 6층 (예시)</p>
              <p>대표전화: 02-0000-0000</p>
              <p>이메일: contact@example.com (예시)</p>
              <p>운영시간: 월~토 10:00 ~ 21:00 (사전 예약제, 예시)</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">
              아카데미 정책
            </h4>
            <div className="space-y-1.5 text-rose-200/60 font-sans">
              <p>학원등록번호: 제2026-0000호 (예시)</p>
              <p>개인정보 처리방침</p>
              <p>컨설팅 계약 규정 및 수강료 반환 기준</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-rose-950 text-center text-rose-400/40 text-[11px]">
          &copy; 2026 IVY PREP ACADEMY. All rights reserved. (Demo Portfolio Sample)
        </div>
      </div>
    </footer>
  );
}
