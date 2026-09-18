'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#04070F] border-t border-zinc-800 text-zinc-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono font-black text-white text-base">KINETICS STEM LAB</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                OFFICIAL DEMO
              </span>
            </div>
            <p className="text-zinc-500 leading-relaxed max-w-md mb-4">
              키네틱스 영재로봇공학 &amp; 피지컬컴퓨팅 센터는 대한민국 미래 공학 인재를 위한 실증형 STEM 랩입니다.
              기계 기구학, 전자 회로 설계, C++/ROS 2 소프트웨어 알고리즘 통합 교육을 선도합니다.
            </p>
            <p className="text-[11px] text-zinc-600">
              * 본 웹사이트는 포트폴리오 시연용 샘플 사이트이며 실존 인물·기관의 정보는 예시 처리되어 있습니다.
            </p>
          </div>

          <div>
            <h4 className="text-white font-mono font-bold mb-3 text-xs uppercase tracking-wider">
              캠퍼스 랩 정보
            </h4>
            <div className="space-y-1.5 text-zinc-500">
              <p>주소: 서울특별시 강남구 테헤란로 000 공학센터 4층 (예시)</p>
              <p>대표전화: 02-0000-0000</p>
              <p>이메일: contact@example.com (예시)</p>
              <p>운영시간: 평일 13:00 ~ 21:00 / 토·일 10:00 ~ 19:00</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-mono font-bold mb-3 text-xs uppercase tracking-wider">
              공학 아카데미 정책
            </h4>
            <div className="space-y-1.5 text-zinc-500">
              <p>학원등록번호: 제2026-0000호 (예시)</p>
              <p>개인정보 처리방침</p>
              <p>수강료 환불 규정 및 대회 운영 수칙</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 text-center text-zinc-600 text-[11px]">
          &copy; 2026 KINETICS STEM LAB. All rights reserved. (Demo Portfolio Sample)
        </div>
      </div>
    </footer>
  );
}
