'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import MaisonDeLuxeApp from '@/components/demos/maison-de-luxe/MaisonDeLuxeApp';

interface Props {
  isEmbed: boolean;
}

export default function MaisonDeLuxePageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <MaisonDeLuxeApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/maison-de-luxe?embed=true"
      title="MAISON DE LUXE (메종 드 럭스)"
      category="이커머스 · 하이엔드 럭셔리 & 명품 부티크 살롱"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (파리·서울 아카이브 부티크 설정, 메종 이름도 지어낸 것입니다)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=maison-de-luxe&industry=commerce"
      specs={[
        { label: '반응형 규격', value: 'lg 기준 모바일·웹 분리 · 태블릿 2열 / 데스크톱 4열 그리드' },
        { label: '3단계 검수 시스템', value: '광학 스캔 대조 · 자체 감정팀 2차 검수 · 봉인 태그와 이력서 발행' },
        { label: '검수 이력 조회', value: '로트 번호로 예시 대장 조회 — 없는 번호는 「기록 없음」으로 답합니다' },
        { label: '장바구니 · 주문서', value: '수량 변경 · 메종 필터 · 검색 · 위시리스트 · 패키징 옵션이 요약에 반영' },
      ]}
    />
  );
}
