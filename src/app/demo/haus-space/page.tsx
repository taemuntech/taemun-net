import type { Metadata } from 'next';
import HausSpacePageClient from './HausSpacePageClient';

export const metadata: Metadata = {
  title: 'HAUS & SPACE — 하이엔드 인테리어 아키텍처 실물 라이브 데모 | 태문 DEV STUDIO',
  description:
    '한남 더 힐 펜트하우스 주거 아카이브, Before & After 인터랙티브 슬라이더, 360 파노라마 VR 시뮬레이션, 수입 원목·트래버틴 마감재 라이브러리를 탑재한 하이엔드 인테리어 아키텍처 실물 데모.',
  openGraph: {
    title: 'HAUS & SPACE — 하이엔드 인테리어 아키텍처 실물 라이브 데모',
    description: '태문 DEV STUDIO 하이엔드 인테리어·펜트하우스 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export default async function HausSpacePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <HausSpacePageClient isEmbed={isEmbed} />;
}
