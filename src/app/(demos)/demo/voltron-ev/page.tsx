import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import VoltronEvPageClient from './VoltronEvPageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'voltron-ev',
  title: '볼트론 어드밴스드 EV (VOLTRON ADVANCED EV) — 800V SiC 파워트레인',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 백서 신청·견적 요청은 접수되지 않습니다. 800V 초급속 충전 시뮬레이터, 파워트레인 3대 서브시스템 사양 모달, OEM 견적 요청 폼을 한 페이지에 담았습니다. 화면의 수치·인증 표기는 모두 예시입니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function VoltronEvPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <VoltronEvPageClient isEmbed={isEmbed} />;
}
