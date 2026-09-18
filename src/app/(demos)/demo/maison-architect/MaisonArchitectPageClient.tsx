'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import MaisonArchitectApp from '@/components/demos/maison-architect/MaisonArchitectApp';

interface Props {
  isEmbed: boolean;
}

export default function MaisonArchitectPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <MaisonArchitectApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/maison-architect?embed=true"
      title="MAISON ARCHITECT (메종 아키텍트)"
      category="이커머스 · 홈퍼니싱 & 감성 인테리어"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (건축가 영감 프리미엄 홈퍼니싱 D2C 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=maison-architect&industry=commerce"
      specs={[
        { label: '반응형 규격', value: '모바일 1열 → 태블릿 2열 → lg 4열 상품 그리드 (경계는 lg=1024px)' },
        { label: '3D 공간 투어 핫스팟', value: '쇼퍼블 인터랙티브 펄스 핀 & 3-Piece 가구 번들 원클릭 담기' },
        { label: '조도 분위기 시뮬레이터', value: '자연광 5000K 주광색 ↔ 3000K 간접조명 나이트 무드 실시간 전환' },
        { label: '평형별 배치 시뮬레이터', value: '25 / 34 / 45평형 아파트 평면도 기반 거실 가구 레이아웃 시뮬레이션 (치수는 예시)' },
      ]}
    />
  );
}
