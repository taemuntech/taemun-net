import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import MaisonArchitectPageClient from './MaisonArchitectPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'maison-architect',
  title: 'MAISON ARCHITECT (메종 아키텍트) — 홈퍼니싱 & 감성 인테리어 스튜디오',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 주문·결제는 접수되지 않습니다. 3D 공간 투어 핫스팟, 자연광/간접조명 조도 시뮬레이터, 평형별 가구 배치 시뮬레이터, 원목·부클레 소재 필터 및 쇼룸 예약 시스템을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function MaisonArchitectPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <MaisonArchitectPageClient isEmbed={isEmbed} />;
}
