import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import TransoceanScmPageClient from './TransoceanScmPageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'transocean-scm',
  title: '트랜스오션 글로벌 SCM (TRANSOCEAN GLOBAL SCM) — 스마트 항만·복합운송 물류',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 운임 문의·선복 배정 신청은 접수되지 않습니다. B/L 화물 추적 HUD, 해상·씨앤에어·항공 운임과 탄소 배출 비교 시뮬레이터, 항만 혼잡도 레이더 모달, 엔터프라이즈 RFQ 폼을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function TransoceanScmPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <TransoceanScmPageClient isEmbed={isEmbed} />;
}
