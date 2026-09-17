import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import PrimeVisionEyeClinicPageClient from './PrimeVisionEyeClinicPageClient';

const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'prime-vision-eye-clinic',
  title: 'PRIME VISION (프라임 스마트 아이 안과) — 스마일프로 7초 & 노안백내장 센터',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 의료기관이 아니며 진료 예약은 접수되지 않습니다. 스마일프로 7초 레이저 시뮬레이터, 각막 적합도 계산기, 다초점 인공수정체 시야 체감기, 50단계 정밀 안종합검진 및 1-Day 패스트트랙 예약 엔진을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function PrimeVisionEyeClinicPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <PrimeVisionEyeClinicPageClient isEmbed={isEmbed} />;
}
