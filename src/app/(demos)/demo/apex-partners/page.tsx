import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import ApexPartnersPageClient from './ApexPartnersPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(운용 규모·수익률·포트폴리오는 모두 예시다).
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'apex-partners',
  title: 'APEX PARTNERS (아펙스 파트너스) — 사모펀드(PE) 운용사 기업 홈페이지',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 운용사가 아니며 데이터룸(VDR) 신청은 접수되지 않습니다. 4대 투자 전략 탭과 포트폴리오 필터·상세 모달, 약정액·기간·목표 배수를 움직이는 분배금 계산기, 기관투자자 신청 폼을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function ApexPartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <ApexPartnersPageClient isEmbed={isEmbed} />;
}
