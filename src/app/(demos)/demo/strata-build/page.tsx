import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import StrataBuildPageClient from './StrataBuildPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(화면의 완공작·수치는 모두 예시다).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'strata-build',
  title: '스트라타 종합건설 (STRATA) — 종합건설 기업 홈페이지',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 상담 신청은 접수되지 않습니다. 터파기부터 준공까지 공정 단계를 보여 주는 빌드업 시뮬레이터, 현장 감리 화면, 완공작·구조재 아카이브(예시)를 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function StrataBuildPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <StrataBuildPageClient isEmbed={isEmbed} />;
}
