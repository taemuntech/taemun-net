'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#2D2A26] text-[#A8A29E] py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#E07A5F] flex items-center justify-center text-white text-base">
                🎨
              </div>
              <span className="font-serif text-lg tracking-tight text-[#FAF8F5] font-bold">
                ATELIER KIDS
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#A8A29E] max-w-md mb-6">
              아틀리에 키즈 감성 미술원은 프랑스 에꼴 드 보자르의 조형 철학을 기반으로, 4세부터 13세까지 아이들의 고유한 시각적 감수성과 입체 조형 상상력을 키우는 순수 미술 아카데미입니다.
            </p>
            <div className="p-3 bg-[#3D3833] rounded-xl inline-block border border-[#524B44]">
              <span className="text-[11px] text-[#F4A261] block">
                가상 브랜드 샘플 — 실제 업체가 아닙니다 (프랑스식 아동 감성미술원 설정)
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5] mb-4">
              아뜰리에 안내
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>대표전화: 02-0000-0000</li>
              <li>상담메일: contact@example.com</li>
              <li>수업시간: 화~토 13:00 - 19:00 (일/월 휴원)</li>
              <li>위치: 서울특별시 마포구 연남로 (예시)</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5] mb-4">
              화구 및 안전 환경
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>유럽 CE 인증 무독성 식물성 천연 안료</li>
              <li>항균 원목 원탁 및 자연 채광 아뜰리에</li>
              <li>원생 전원 1:1 앞치마 및 개인 팔레트 구비</li>
              <li>공기살균 청정 시스템 24시간 가동 (예시)</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#3D3833] flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-[#7A7369]">
          <p>© 2026 ATELIER KIDS Art Academy. All Rights Reserved. (샘플 데모)</p>
          <p>태문 DEV STUDIO 프리미엄 아동 교육 & 감성 미술 포트폴리오</p>
        </div>
      </div>
    </footer>
  );
}
