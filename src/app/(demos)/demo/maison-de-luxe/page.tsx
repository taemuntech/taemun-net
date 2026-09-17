import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import MaisonDeLuxePageClient from './MaisonDeLuxePageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'maison-de-luxe',
  title: 'MAISON DE LUXE (메종 드 럭스) — 하이엔드 럭셔리 & 명품 부티크 살롱',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 주문·결제는 접수되지 않습니다. 3단계 검수 시스템 소개, 로트 번호로 찾는 검수 이력 조회, 1:1 컨시어지 챗 드로어, 장바구니·주문서 흐름과 왁스 실링 패키징 쇼케이스를 한 페이지에 담았습니다. 등장하는 메종·상품·시리얼은 모두 지어낸 예시입니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function MaisonDeLuxePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <MaisonDeLuxePageClient isEmbed={isEmbed} />;
}
