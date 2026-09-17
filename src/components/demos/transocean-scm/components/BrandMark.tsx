import React from 'react';

/**
 * 가상 브랜드 「TRANSOCEAN GLOBAL SCM」 로고 마크 (인라인 SVG).
 *
 * 왜 인라인인가: 예전에는 구글 생성-이미지 CDN 주소를 그대로 썼는데
 *  (1) 그 주소는 만료되면 예고 없이 깨지고(입고 검사 WARN),
 *  (2) 가상 브랜드 화면에 출처를 우리가 통제하지 못하는 그림이 걸린다.
 * 컨테이너 적재 + 항로 곡선을 브랜드 색(#2563eb·#fe6b00)으로 그린 도형이라 외부 요청이 없다.
 */
export const BrandMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 40 40" role="img" aria-label="TRANSOCEAN GLOBAL SCM 로고" className={className}>
    <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="9" fill="#0e1c2f" stroke="#434655" strokeWidth="1.5" />
    {/* 컨테이너 적재 블록 */}
    <rect x="9" y="19" width="8" height="5" rx="1" fill="#2563eb" />
    <rect x="18" y="19" width="8" height="5" rx="1" fill="#3b82f6" />
    <rect x="13.5" y="12.5" width="8" height="5" rx="1" fill="#fe6b00" />
    {/* 항로·수면 곡선 */}
    <path
      d="M7 27.5c2.6 0 2.6 2 5.2 2s2.6-2 5.2-2 2.6 2 5.2 2 2.6-2 5.2-2"
      fill="none"
      stroke="#b4c5ff"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M7 32c2.6 0 2.6 2 5.2 2s2.6-2 5.2-2 2.6 2 5.2 2 2.6-2 5.2-2"
      fill="none"
      stroke="#2563eb"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);
