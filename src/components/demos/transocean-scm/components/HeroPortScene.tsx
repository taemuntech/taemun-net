import React from 'react';

/**
 * 히어로 관제 화면 배경 — 자율운항 컨테이너선과 스마트 터미널 안벽을 그린 인라인 SVG.
 *
 * 왜 사진을 안 쓰나(중요):
 *  - 원래 걸려 있던 구글 생성-이미지 CDN 사진에는 **실존 선사의 선체 표기가 그대로 보였다.**
 *    가상 브랜드 샘플이 실존 기업의 도장을 「우리 배」라고 내세우는 꼴이라 정직성 규칙 위반이다.
 *  - 그 주소는 우리 저장소 밖이라 만료되면 예고 없이 깨진다(입고 검사 WARN).
 * 그래서 같은 자리·같은 높이에 같은 톤(#061426 ~ #1d2a3e + #2563eb·#fe6b00)의 도형 장면을 그린다.
 * 위에 얹히는 텔레메트리 HUD 카드와 레이더 빔은 그대로 두었다.
 */
export const HeroPortScene: React.FC<{ className?: string }> = ({ className }) => (
  // 그린 범위는 0~1440 이지만 보여 주는 창은 160~1280 이다 — 폰처럼 세로로 긴 상자에서 slice 가
  // 가운데만 남길 때 배와 안벽이 함께 들어오게 잘라 둔 것이다(양 끝 여백은 잘려도 되는 자리).
  <svg
    viewBox="160 0 1120 580"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    aria-label="자율운항 컨테이너선과 스마트 터미널 안벽을 도형으로 그린 관제 화면 (가상 브랜드 예시 이미지)"
    className={className}
  >
    <defs>
      <linearGradient id="to-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#020e21" />
        <stop offset="55%" stopColor="#12294a" />
        <stop offset="100%" stopColor="#2a3b54" />
      </linearGradient>
      <linearGradient id="to-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#14314f" />
        <stop offset="100%" stopColor="#061426" />
      </linearGradient>
      <radialGradient id="to-sun" cx="0.72" cy="0.98" r="0.55">
        <stop offset="0%" stopColor="#fe6b00" stopOpacity="0.55" />
        <stop offset="55%" stopColor="#fe6b00" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#fe6b00" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="to-hull" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1d2a3e" />
        <stop offset="100%" stopColor="#0b1729" />
      </linearGradient>
    </defs>

    {/* 하늘 · 수평선 노을 */}
    <rect width="1440" height="352" fill="url(#to-sky)" />
    <rect width="1440" height="352" fill="url(#to-sun)" />

    {/* 별처럼 흩어진 AIS 신호점 */}
    <g fill="#b4c5ff" opacity="0.5">
      {[
        [120, 54], [268, 96], [402, 40], [556, 78], [690, 36], [846, 88],
        [980, 52], [1124, 94], [1268, 44], [1382, 82], [196, 132], [640, 130],
        [1052, 138], [1338, 150], [332, 168],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.8 : 1.1} />
      ))}
    </g>

    {/* 바다 */}
    <rect y="352" width="1440" height="228" fill="url(#to-sea)" />

    {/* 먼바다 터미널 실루엣 (왼쪽) */}
    <g fill="#0b1c31" opacity="0.9">
      <rect x="0" y="300" width="360" height="52" />
      {[24, 108, 192, 276].map((x) => (
        <g key={x}>
          <rect x={x} y="246" width="6" height="56" />
          <rect x={x + 48} y="246" width="6" height="56" />
          <rect x={x - 4} y="240" width="70" height="8" />
          <rect x={x + 58} y="240" width="30" height="5" />
        </g>
      ))}
    </g>

    {/* 안벽 STS 크레인 3기 (오른쪽) */}
    <g stroke="#28405d" strokeWidth="7" fill="none" strokeLinecap="square">
      {[1010, 1180, 1350].map((x) => (
        <g key={x}>
          <path d={`M${x} 352V196`} />
          <path d={`M${x + 96} 352V196`} />
          <path d={`M${x - 52} 196H${x + 168}`} />
          <path d={`M${x + 20} 196 ${x + 48} 140 ${x + 76} 196`} />
        </g>
      ))}
    </g>
    <g fill="#fe6b00" opacity="0.85">
      {[1010, 1180, 1350].map((x) => (
        <rect key={x} x={x + 40} y="190" width="16" height="10" rx="2" />
      ))}
    </g>

    {/* 자율운항 컨테이너선 */}
    <g>
      {/* 적재 컨테이너 */}
      <g opacity="0.95">
        {Array.from({ length: 26 }).map((_, col) =>
          Array.from({ length: 4 }).map((__, row) => {
            const palette = ['#2563eb', '#1e4fa8', '#3b82f6', '#fe6b00', '#1d2a3e'];
            const tone = palette[(col * 3 + row * 5) % palette.length];
            return (
              <rect
                key={`${col}-${row}`}
                x={300 + col * 22}
                y={300 - row * 17}
                width={19}
                height={14}
                rx={1.5}
                fill={tone}
                opacity={0.75 + ((col + row) % 3) * 0.08}
              />
            );
          }),
        )}
      </g>
      {/* 선교 */}
      <rect x="862" y="248" width="52" height="66" rx="3" fill="#1d2a3e" />
      <g fill="#b4c5ff" opacity="0.75">
        {[256, 270, 284].map((y) => (
          <rect key={y} x="870" y={y} width="36" height="5" rx="1" />
        ))}
      </g>
      {/* 선체 */}
      <path d="M268 314h666l-26 66H316c-28 0-46-22-48-44z" fill="url(#to-hull)" />
      <path d="M268 314h666l-4 11H271z" fill="#fe6b00" opacity="0.7" />
      {/* 흘수선 */}
      <path d="M300 368h590" stroke="#0a1a2d" strokeWidth="6" strokeLinecap="round" />
    </g>

    {/* 수면 반사 */}
    <g stroke="#b4c5ff" strokeLinecap="round" opacity="0.18">
      {[396, 414, 432, 452, 474, 498, 524, 552].map((y, i) => (
        <path key={y} d={`M${300 - i * 26} ${y}h${420 + i * 58}`} strokeWidth={i % 2 ? 1.5 : 2.5} />
      ))}
    </g>
    <g stroke="#fe6b00" strokeLinecap="round" opacity="0.2">
      {[402, 428, 460, 498, 540].map((y, i) => (
        <path key={y} d={`M${1000 - i * 12} ${y}h${180 + i * 40}`} strokeWidth={i % 2 ? 1.5 : 3} />
      ))}
    </g>
  </svg>
);
