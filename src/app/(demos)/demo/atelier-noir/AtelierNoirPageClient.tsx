'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import AtelierNoirApp from '@/components/demos/atelier-noir/AtelierNoirApp';

interface Props {
  isEmbed: boolean;
}

export default function AtelierNoirPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <AtelierNoirApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/atelier-noir?embed=true"
      title="ATELIER NOIR (아틀리에 누아르)"
      category="이커머스 · K-패션 & 디자이너 셀렉트샵"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (K-패션 디자이너 셀렉트샵 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        '4-Tier Deep Category HUD',
        'Interactive Lookbook Pulse Pins',
        'Multi-Angle Fit & Measurement Matrix',
        'Ranking & Curation Tabs',
        'Cart & Wishlist Drawer Architecture',
      ]}
      inquiryUrl="/inquiry?from=atelier-noir"
      specs={[
        { label: '반응형 규격', value: '모바일 2열 상품 그리드 · 데스크톱 4열, 단일 lg: 브레이크포인트' },
        { label: '4단계 카테고리 & 속성 필터', value: '대·중·소·세분류와 컬러 · 핏 · 패브릭 칩을 한 줄 HUD 에서 조합' },
        { label: '인터랙티브 룩북 & 쇼퍼블 핀', value: '룩북 사진의 펄스 핀을 누르면 아이템 팝오버가 열리고 3-피스 세트를 한 번에 담기' },
        { label: '체형별 실측 치수 조견표', value: '어깨/가슴/소매/총장 실측 cm 표와 모델 착용 스펙, 다각도 상세 썸네일 (수치는 예시 데이터)' },
      ]}
    />
  );
}
