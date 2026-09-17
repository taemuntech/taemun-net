import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import ChopinPianoPageClient from './ChopinPianoPageClient';

const DEMO_METADATA: Metadata = {
  title: '쇼팽하우스 피아노 아카데미 (CHOPIN HAUS) | 마스터클래스 & 스타인웨이 살롱 — 태문 DEV STUDIO',
  description:
    '정통 유럽 비엔나 피아니즘 & 스타인웨이 D-274 살롱 마스터클래스 웹사이트 샘플. 88건반 인터랙티브 실시간 타건 음향 합성, 공간 잔향 및 고조파 배음 텔레메트리 HUD, 1:1 오디션 심사 신청 라이브 데모.',
  openGraph: {
    title: '쇼팽하우스 피아노 아카데미 | 클래식 피아노 마스터클래스 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 예술 아카데미 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function ChopinPianoPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <ChopinPianoPageClient isEmbed={isEmbed} />;
}
