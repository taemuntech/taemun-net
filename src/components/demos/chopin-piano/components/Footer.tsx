'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#0e0c0b] text-[#8c8276] border-t border-[#25211c] py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-[#121110] font-serif font-bold text-sm">
                🎹
              </div>
              <span className="font-serif text-lg tracking-wider text-[#f5f0eb] font-semibold">
                CHOPIN HAUS
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#8c8276] max-w-md mb-6">
              쇼팽하우스 피아노 아카데미는 정통 비엔나 피아니즘과 스타인웨이 살롱 어쿠스틱을 바탕으로 최고 권위의 콩쿠르 및 유럽·국내 명문 음대 실기 합격을 지도하는 전문 음악 아카데미입니다.
            </p>
            <div className="p-3 bg-[#151311] border border-[#2d2926] rounded-xl inline-block">
              <span className="text-[11px] text-[#c5a880] block">
                가상 브랜드 샘플 — 실제 업체가 아닙니다 (클래식 피아노 마스터클래스 설정)
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f5f0eb] mb-4">
              아카데미 안내
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a89f95]">
              <li>대표전화: 02-0000-0000</li>
              <li>문의메일: contact@example.com</li>
              <li>운영시간: 화~토 10:00 - 21:00 (일/월 휴관)</li>
              <li>위치: 서울특별시 서초구 반포대로 (예시)</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f5f0eb] mb-4">
              보유 악기 및 살롱
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a89f95]">
              <li>Steinway & Sons D-274 Concert Grand</li>
              <li>Steinway & Sons B-211 Classic Grand</li>
              <li>C. Bechstein Concert MP-192</li>
              <li>전 연습실 독일 4중 방음 & 항온항습 50%</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#25211c] flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-[#635c54]">
          <p>© 2026 CHOPIN HAUS Piano Academy. All Rights Reserved. (샘플 데모)</p>
          <p>태문 DEV STUDIO 프리미엄 에듀테크 & 예술 아카데미 포트폴리오</p>
        </div>
      </div>
    </footer>
  );
}
