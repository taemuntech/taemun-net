import React from 'react';

// 원래 쓰던 로고는 흰 배경에 잔글씨가 든 외부 이미지라, 28px 로 줄이면 뭉개진 얼룩처럼 보였다(실측 스크린샷).
// 같은 톤의 인라인 SVG 모노그램으로 바꿨다 — 외부 요청도 줄고 어떤 크기에서도 또렷하다.

interface BrandMarkProps {
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 40 40"
    role="img"
    aria-label="ATLAS RESORTS 모노그램"
    className={className}
    fill="none"
  >
    <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="3" stroke="#725b38" strokeWidth="1.5" />
    <path d="M20 9.5 L28.5 30.5 H25.2 L20 16.8 L14.8 30.5 H11.5 Z" fill="#030402" />
    <rect x="15.4" y="24.2" width="9.2" height="1.6" fill="#725b38" />
  </svg>
);
