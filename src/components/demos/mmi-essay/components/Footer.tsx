'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#090B0F] text-slate-400 border-t border-[#1C212E] py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-600 to-amber-600 flex items-center justify-center text-white font-serif font-bold text-base">
                &para;
              </div>
              <span className="font-serif text-base tracking-wider text-white font-bold uppercase">
                AGORA ESSAY &amp; MEDICAL MMI
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-md mb-6">
              아고라 논술 &amp; MMI 센터는 단순 답안 암기를 지양하고, 헌법적 가치와 생명윤리 법리에 기반한 심층 다면 논증 훈련으로 최상위권 대입 합격을 지원합니다.
            </p>
            <div className="p-3 bg-[#131722] border border-[#242C3D] rounded-xl inline-block">
              <span className="text-[11px] text-rose-400 block">
                가상 브랜드 샘플 — 실제 업체가 아닙니다 (대입 논술 &amp; 의대면접 학원 설정)
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              센터 운영 안내
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>대표전화: 02-0000-0000</li>
              <li>상담문의: contact@example.com</li>
              <li>운영시간: 화~일 12:00 - 22:00 (월요일 클리닉 휴무)</li>
              <li>위치: 서울특별시 강남구 대치동 (예시)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              전문 프로그램
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>최상위 의예과 MMI 6스테이션 모의면접 (예시)</li>
              <li>명문대 인문·사회 통합논술 대면 첨삭</li>
              <li>자연계 수리논술 엄밀 증명 마스터반</li>
              <li>1:1 답안 정밀 진단평가</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1C212E] flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 AGORA Essay &amp; MMI Center. All Rights Reserved. (샘플 데모)</p>
          <p>태문 DEV STUDIO 프리미엄 논술 &amp; 메디컬 에듀테크 포트폴리오</p>
        </div>
      </div>
    </footer>
  );
}
