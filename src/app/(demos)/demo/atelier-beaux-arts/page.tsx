import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import AtelierBeauxArtsPageClient from './AtelierBeauxArtsPageClient';

const DEMO_METADATA: Metadata = {
  title: '아틀리에 보자르 미대입시 (ATELIER BEAUX-ARTS) | 명문 미대 실기 & 디자인 조형 랩 — 태문 DEV STUDIO',
  description:
    'S대(예시)·K대(예시)·H대(예시)·K-ARTS(예시) 미대 실기 전문 디자인 연구소 웹사이트 샘플. 3D 원근 큐레이션 합격작 갤러리, 실기 기출 발문 핀셋 해체 Lab, 황금분할선 구도 오버레이 및 1:1 모의 실기 평가 신청 실물 라이브 데모.',
  openGraph: {
    title: '아틀리에 보자르 미대입시 | 명문 미대 실기 연구소 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 미대입시 & 디자인 에듀테크 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function AtelierBeauxArtsPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AtelierBeauxArtsPageClient isEmbed={isEmbed} />;
}
