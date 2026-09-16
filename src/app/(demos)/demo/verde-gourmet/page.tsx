import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import VerdeGourmetPageClient from './VerdeGourmetPageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「라이브 데모」 라고 쓰지 않고, 실존 새벽배송 업체 이름도 적지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'verde-gourmet',
  title: 'VERDE GOURMET (베르데 고메) — 프리미엄 신선식품 새벽배송',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 주문·배송지 조회는 접수되지 않습니다. 산지 스토리형 상품 카드와 셰프 레시피 재료 일괄 담기, 온도 이력 화면, 장바구니 드로어를 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function VerdeGourmetPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <VerdeGourmetPageClient isEmbed={isEmbed} />;
}
