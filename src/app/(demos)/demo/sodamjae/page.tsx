import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import SodamjaePageClient from './SodamjaePageClient';

// 제목·설명·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
// 2026-09-19 형: 소담재는 실존 업체가 아니다 → 가상 브랜드 샘플이다. 예전엔 제안 시안으로 보고
// og 제목 앞에 「[제안 시안]」 을 붙였는데, 이제는 다른 가상 브랜드 샘플과 같은 sampleMetadata() 를 쓴다
// (og 제목 뒤에 「— 태문넷 샘플 사이트」 가 붙는다).
// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'sodamjae',
  title: '소담재 한옥건축 — 한옥 설계·시공 공방 홈페이지',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 상담 신청은 접수되지 않습니다. 화면의 완공작·연혁·면허 번호·연락처는 예시입니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function SodamjaePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <SodamjaePageClient isEmbed={isEmbed} />;
}
