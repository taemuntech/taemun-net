import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import OnsaemiroPageClient from './OnsaemiroPageClient';

const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'onsaemiro-plastic-surgery',
  title: '온새미로 성형외과의원 (ONSAEMIRO) — 순우리말 자연미 & 안면 황금비율 센터',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 의료기관이 아니며 진료 예약은 접수되지 않습니다. 1:1:0.8 안면 황금비율 및 비순각 각도 시뮬레이터, Before & After 듀얼 스플릿 전후 비교 뷰어, 수술 실명제·1:1 마취과 전문의·보호자 CCTV 등 5대 안심안전망, 1인 VIP 리커버리 힐링 케어를 제공합니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function OnsaemiroPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <OnsaemiroPageClient isEmbed={isEmbed} />;
}
