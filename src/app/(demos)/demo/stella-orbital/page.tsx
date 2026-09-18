import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import StellaOrbitalPageClient from './StellaOrbitalPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'stella-orbital',
  title: '스텔라 오비탈 시스템즈 (STELLA ORBITAL SYSTEMS) — 초소형 위성 군집 지구관측',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 촬영 의뢰·백서 신청은 접수되지 않습니다. 광학·SAR·초분광 3종 센서 사양 비교 탭, 분광 밴드 뷰어 모달, 산업별 관측 솔루션 카드, 3단계 촬영 의뢰 폼을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function StellaOrbitalPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <StellaOrbitalPageClient isEmbed={isEmbed} />;
}
