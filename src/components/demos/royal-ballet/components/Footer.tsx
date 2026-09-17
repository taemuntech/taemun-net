'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#0A090C] text-[#9E939D] border-t border-[#1C1822] py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#D8829D] flex items-center justify-center text-[#0F0E11] text-sm font-bold">
                🩰
              </div>
              <span className="font-serif text-lg tracking-wider text-white font-bold">
                ROYAL BALLET ACADEMY
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#786E77] max-w-md mb-6">
              로열 발레 아카데미는 러시아 바가노바와 영국 로열 발레단의 정통 메소드를 기반으로, 해부학적 턴아웃 교정과 우아한 무대 예술성을 지도하는 클래식 무용 전문 교육 기관입니다.
            </p>
            <div className="p-3 bg-[#131117] border border-[#252229] rounded-xl inline-block">
              <span className="text-[11px] text-[#F4ACB7] block">
                가상 브랜드 샘플 — 실제 업체가 아닙니다 (클래식 발레 아카데미 설정)
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              아카데미 안내
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E939D]">
              <li>대표전화: 02-0000-0000</li>
              <li>상담문의: contact@example.com</li>
              <li>운영시간: 화~일 09:00 - 22:00 (월요일 휴관)</li>
              <li>위치: 서울특별시 서초구 효령로 (예시)</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              스튜디오 시설
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E939D]">
              <li>3중 탄성 충격 흡수 스프렁 댄스 플로어</li>
              <li>영국 할리퀸(Harlequin) 프로페셔널 댄스 매트</li>
              <li>독일 수입 바레(Barre) 및 전면 왜곡 방지 거울</li>
              <li>공기청정 항온항습 무용 전용 홀</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1C1822] flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-[#5A525B]">
          <p>© 2026 ROYAL BALLET ACADEMY. All Rights Reserved. (샘플 데모)</p>
          <p>태문 DEV STUDIO 프리미엄 클래식 무용 & 에듀테크 포트폴리오</p>
        </div>
      </div>
    </footer>
  );
}
