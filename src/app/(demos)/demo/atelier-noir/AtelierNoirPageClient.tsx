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
      ]}
      inquiryUrl="/inquiry?from=atelier-noir"
      specs={[
        { label: '반응형 규격', value: '모바일 2열 상품 그리드 · 데스크톱 4열, 단일 lg: 브레이크포인트' },
        { label: '카테고리 & 속성 필터', value: '카테고리 · 세부분류 · 컬러 · 핏 · 패브릭을 겹쳐 거르고, 칩 목록은 실제 상품에서 만든다 (결과 0인 칩이 생기지 않게)' },
        { label: '인터랙티브 룩북 & 쇼퍼블 핀', value: '룩북 사진의 펄스 핀을 누르면 아이템 팝오버가 열리고 3-피스 세트를 한 번에 담기' },
        { label: '체형별 실측 치수 조견표', value: '상품마다 다른 어깨/가슴/소매/총장 실측 cm 표와 착용 스펙 · 컬러/사이즈 선택 (수치는 예시 데이터)' },
      ]}
    />
  );
}
