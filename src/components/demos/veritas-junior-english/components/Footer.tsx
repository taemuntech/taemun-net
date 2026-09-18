'use client';

import React from 'react';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

export function Footer() {
  return (
    <footer className="bg-[#0F2942] text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-serif font-bold text-base">
                V
              </div>
              <span className="font-serif text-lg tracking-wider text-white font-bold uppercase">
                VERITAS JUNIOR PRESTIGE
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300 max-w-md mb-6">
              베리타스 주니어는 영미 명문 사립학교 정규 커리큘럼과 렉사일 지수 기반 도서관을 통해 단순 주입식 암기가 아닌 원서 중심의 자기주도적 아카데믹 리터러시를 확립합니다.
            </p>
            <div className="p-3 bg-blue-950/80 border border-blue-800 rounded-xl inline-block">
              <span className="text-[11px] text-blue-300 block"><SampleFooterNote /></span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              어학원 운영 안내
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>대표전화: 02-0000-0000</li>
              <li>입학상담: contact@example.com</li>
              <li>상담시간: 월~금 10:00 - 19:00 (토 10:00 - 15:00)</li>
              <li>위치: 서울특별시 서초구 반포대로 (예시)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              전문 프로그램
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>유치부 킨더 몰입형 원어민 담임반 (예시)</li>
              <li>초등 챕터북 뉴베리 리딩 &amp; 스피치</li>
              <li>렉사일 1100L 아카데믹 디베이트 &amp; 에세이</li>
              <li>1:1 원어민 인터뷰 진단 평가</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-blue-900/60 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 VERITAS JUNIOR Prestige English Academy. All Rights Reserved. (샘플 데모)</p>
          <p>태문 DEV STUDIO 프리미엄 주니어 어학원 &amp; 렉사일 에듀테크 포트폴리오</p>
        </div>
      </div>
    </footer>
  );
}
