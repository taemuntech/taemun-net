import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import MetroBuildPageClient from './MetroBuildPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(화면의 완공작·수치는 모두 예시다).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'metro-build',
  title: '메트로 종합건설 (METRO BUILD) — 사옥·지식산업센터 시공 기업 홈페이지',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 상담 신청은 접수되지 않습니다. 사옥·지식산업센터 완공작 예시 갤러리, BIM 공정 관제 화면(예시), 연면적별 공사비 시뮬레이터(예시)를 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function MetroBuildPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <MetroBuildPageClient isEmbed={isEmbed} />;
}
