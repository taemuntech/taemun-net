import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import AtlasResortPageClient from './AtlasResortPageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'atlas-resort',
  title: '아틀라스 리조트 (ATLAS RESORTS) — 럭셔리 부티크 호스피탈리티 & 프라이빗 빌라',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 예약·컨시어지 문의는 접수되지 않습니다. 빌라 스위트 익스플로러와 목적지·숙박일수·부가 프로그램을 반영하는 숙박 견적 시뮬레이터, 예약 상담 모달을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function AtlasResortPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AtlasResortPageClient isEmbed={isEmbed} />;
}
