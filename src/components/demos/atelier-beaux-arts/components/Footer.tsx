'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#0D0F13] text-[#94A3B8] border-t border-[#1E242E] py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0284C7] flex items-center justify-center text-white text-base font-bold">
                🖌️
              </div>
              <span className="font-serif text-lg tracking-tight text-white font-bold">
                ATELIER BEAUX-ARTS
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#64748B] max-w-md mb-6">
              아틀리에 보자르 미대입시 연구소는 통합실기·기초조형·미술우수자 등 상위권 미대 실기 전형에 최적화된 3D 시각 발상과 황금분할 조형 교육을 연구합니다.
            </p>
            <div className="p-3 bg-[#16191F] border border-[#2A303C] rounded-xl inline-block">
              <span className="text-[11px] text-[#38BDF8] block">
                가상 브랜드 샘플 — 실제 업체가 아닙니다 (명문 미대입시 아카데미 설정)
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              연구소 안내
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>대표전화: 02-0000-0000</li>
              <li>입시상담: contact@example.com</li>
              <li>실기실: 월~토 13:00 - 22:00 (일요일 집중 실기)</li>
              <li>위치: 서울특별시 강남구 선릉로 (예시)</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              전문 실기 트랙
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>S대 통합실기평가 & K대 기초조형평가 (예시)</li>
              <li>H대 미술우수자 서류 및 면접 크리틱 (예시)</li>
              <li>A예술대 조형예술과 심층 실기 (예시)</li>
              <li>기초디자인 50종 질감 라이브러리</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1E242E] flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-[#475569]">
          <p>© 2026 ATELIER BEAUX-ARTS Design Academy. All Rights Reserved. (샘플 데모)</p>
          <p>태문 DEV STUDIO 프리미엄 미대입시 & 디자인 에듀테크 포트폴리오</p>
        </div>
      </div>
    </footer>
  );
}
