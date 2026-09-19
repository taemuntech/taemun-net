import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import DaechiPrestigePageClient from './DaechiPrestigePageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(화면의 완공작·수치는 모두 예시다).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'daechi-prestige',
  title: '대치 프레스티지 학원 (DAECHI PRESTIGE) — 의치약학 계열 입시학원 홈페이지',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 학원이 아니며 레벨테스트 신청은 접수되지 않습니다. 백분위 모의 합격진단 시뮬레이터(예시), 문항 해설 화면, 레벨테스트 신청 위저드를 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function DaechiPrestigePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <DaechiPrestigePageClient isEmbed={isEmbed} />;
}
