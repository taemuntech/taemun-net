'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#020409] border-t border-zinc-800 text-zinc-400 py-12 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-black text-white text-base">CODEX ACADEMY</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                OFFICIAL DEMO
              </span>
            </div>
            <p className="text-zinc-500 leading-relaxed max-w-md mb-4">
              코덱스 아카데미 풀스택 &amp; AI 테크 캠프는 대한민국 최고 수준의 소프트웨어 엔지니어링 집중 교육기관입니다.
              단순 코딩을 넘어 대규모 트래픽 분산 시스템과 최신 생성형 AI 파이프라인 설계를 실전으로 지도합니다.
            </p>
            <p className="text-[11px] text-zinc-600">
              * 본 웹사이트는 포트폴리오 시연용 샘플 사이트이며 실존 인물·기업·지표의 정보는 가상 예시 처리되어 있습니다.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">
              캠퍼스 안내
            </h4>
            <div className="space-y-1.5 text-zinc-500">
              <p>위치: 서울특별시 서초구 강남대로 000 테크빌딩 5층 (예시)</p>
              <p>대표전화: 02-0000-0000</p>
              <p>이메일: contact@example.com (예시)</p>
              <p>운영시간: 평일 09:00 ~ 22:00 (24시간 랩실 개방, 예시)</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">
              교육 정책 &amp; 인증
            </h4>
            <div className="space-y-1.5 text-zinc-500">
              <p>학원등록번호: 제2026-0000호 (예시)</p>
              <p>개인정보 처리방침</p>
              <p>수강료 반환 규정 및 수료 기준 고지</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 text-center text-zinc-600 text-[11px]">
          &copy; 2026 CODEX ACADEMY. All rights reserved. (Demo Portfolio Sample)
        </div>
      </div>
    </footer>
  );
}
