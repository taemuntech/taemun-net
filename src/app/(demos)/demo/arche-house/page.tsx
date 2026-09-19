import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import ArcheHousePageClient from './ArcheHousePageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(화면의 완공작·수치는 모두 예시다).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'arche-house',
  title: '아르케 건축사사무소 (ARCHE HOUSE) — 단독주택·별서 설계 사무소 홈페이지',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 사무소가 아니며 설계 상담은 접수되지 않습니다. 완공작 예시 갤러리, 공간 철학 소개, 평형별 건축비 가이드(예시), 설계 상담 화면을 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function ArcheHousePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <ArcheHousePageClient isEmbed={isEmbed} />;
}
