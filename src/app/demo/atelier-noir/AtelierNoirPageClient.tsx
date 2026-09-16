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
      client="하이엔드 디자이너 브랜드 & 스트릿웨어 온라인 셀렉트숍"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        '4-Tier Deep Category HUD',
        'Interactive Lookbook Pulse Pins',
        'Multi-Angle Fit & Measurement Matrix',
        'Real-time Live Ranking Engine',
        'Cart & Wishlist Drawer Architecture',
      ]}
      inquiryUrl="/inquiry?from=atelier-noir"
      specs={[
        { label: '반응형 규격', value: '모바일 2열 상품 그리드 & 데스크톱 4열 단일 lg: 브레이크포인트 완벽 대응' },
        { label: '4단계 카테고리 & 실시간 필터', value: '대·중·소·세분류 및 컬러, 핏(오버핏/슬림핏), 패브릭 소재 정밀 다면 필터링' },
        { label: '인터랙티브 룩북 & 쇼퍼블 핀', value: '2026 S/S 메트로폴리탄 룩북 실시간 펄스 핀 클릭 시 코디 세트 팝오버 및 원클릭 담기' },
        { label: '체형별 실측 치수 조견표', value: '어깨/가슴/소매/총장 실측 cm 매트릭스, 모델 스펙 가이드 및 360도 디테일 접사 갤러리' },
      ]}
    />
  );
}
