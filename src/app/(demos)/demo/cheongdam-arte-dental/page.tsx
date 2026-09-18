import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import CheongdamArteDentalPageClient from './CheongdamArteDentalPageClient';

const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'cheongdam-arte-dental',
  title: 'ARTE DENTAL (청담 아르떼 치과) — 3D 디지털 네비게이션 임플란트 & 심미치과',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 의료기관이 아니며 진료 예약은 접수되지 않습니다. 3D 컴퓨터 모의수술 네비게이션 임플란트 가이드, 자연치아 보존 라미네이트 치료 전후 예시 이미지 슬라이더(개인차·부작용 고지 포함), 4단계 컴퓨터 제어 마취 안내, 온라인 간편예약 및 사전 문진표를 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function CheongdamArteDentalPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <CheongdamArteDentalPageClient isEmbed={isEmbed} />;
}
