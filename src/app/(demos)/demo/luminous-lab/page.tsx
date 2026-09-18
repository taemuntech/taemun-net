import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import LuminousLabPageClient from './LuminousLabPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'luminous-lab',
  title: 'LUMINOUS LAB (루미너스 랩) — 클린 더마 코스메틱 커머스',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 주문·상담은 접수되지 않습니다. 피부 타입·고민별 4단계 필터와 전성분 인스펙터, 랭킹·기획 세트, 장바구니 드로어, 피부 진단 테스트를 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function LuminousLabPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <LuminousLabPageClient isEmbed={isEmbed} />;
}
