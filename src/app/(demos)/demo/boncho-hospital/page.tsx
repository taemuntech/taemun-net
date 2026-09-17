import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import BonchoHospitalPageClient from './BonchoHospitalPageClient';

const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'boncho-hospital',
  title: '본초 통합한방병원 (BONCHO) — 의·한의 협진 80병상 암면역·수술재활센터',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 의료기관이 아니며 진료 예약은 접수되지 않습니다. 의·한의 통합 암면역·수술재활 치료, 전 객실 1인실·2인실 모션베드 360 가상 투어, hGMP 규격 청정 탕전 로트 역추적 아카이브, 24시간 실시간 병상 현황 확인 및 스마트 입원 예약 컨시어지를 한 페이지에 완비했습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function BonchoHospitalPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <BonchoHospitalPageClient isEmbed={isEmbed} />;
}
