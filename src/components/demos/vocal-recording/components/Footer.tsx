'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#08090D] text-zinc-400 border-t border-[#1B202A] py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                🎙️
              </div>
              <span className="text-base tracking-wider text-white font-bold uppercase">
                VOCAL HOUSE RECORDING ACADEMY
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400 max-w-md mb-6">
              보컬하우스는 실전 멀티트랙 스튜디오 레코딩과 음향 물리학에 기반한 성구 전환(Passaggio) 발성 훈련으로 K-POP 오디션 및 명문 실용음악과 합격을 지원합니다.
            </p>
            <div className="p-3 bg-[#11141C] border border-[#212837] rounded-xl inline-block">
              <span className="text-[11px] text-pink-400 block">
                가상 브랜드 샘플 — 실제 업체가 아닙니다 (보컬 스튜디오 &amp; 아카데미 설정)
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              스튜디오 운영 안내
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>대표전화: 02-0000-0000</li>
              <li>오디션 문의: contact@example.com</li>
              <li>운영시간: 화~일 11:00 - 23:00 (월요일 클리닝 휴무)</li>
              <li>위치: 서울특별시 강남구 학동로 (예시)</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              스튜디오 세션
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>노이만 U87 보컬 멀티트랙 세션 (예시)</li>
              <li>프로툴스 얼라인먼트 &amp; 보컬튠 마스터링</li>
              <li>기획사 비공개 내방 오디션 모의 테스트</li>
              <li>실용음악과 실기 초견·시창 클리닉</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1B202A] flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© 2026 VOCAL HOUSE Recording Studio &amp; Academy. All Rights Reserved. (샘플 데모)</p>
          <p>태문 DEV STUDIO 프리미엄 실용음악 &amp; 보컬 에듀테크 포트폴리오</p>
        </div>
      </div>
    </footer>
  );
}
