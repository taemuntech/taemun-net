import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import TerraCorePageClient from './TerraCorePageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(화면의 완공작·수치는 모두 예시다).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'terra-core',
  title: '테라코어 (TERRA-CORE) — 대심도 터널 토목 기업 홈페이지',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 상담 신청은 접수되지 않습니다. 지층을 따라 내려가는 스크롤 탐사 화면, TBM 관제 콘솔(예시), 지층별 단면 투어와 신소재 아카이브를 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function TerraCorePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <TerraCorePageClient isEmbed={isEmbed} />;
}
