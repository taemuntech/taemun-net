import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import AetherMedicalPageClient from './AetherMedicalPageClient';

const DEMO_METADATA: Metadata = {
  title: '에테르 메디컬 (AETHER MEDICAL) | 청담 VIP 프라이빗 메디컬 인테리어 디자인 — 태문 DEV STUDIO',
  description:
    '빛과 곡면의 안식처, 6성급 호텔 라운지 감성의 메디컬 인테리어. 45dB 무소음 차음 설계, 서카디언 조도 텔레메트리 HUD, 메디컬 등급 친환경 마감재 아카이브 실물 라이브 데모.',
  openGraph: {
    title: '에테르 메디컬 | VIP 프라이빗 메디컬 클리닉 공간 디자인 실물 데모',
    description: '태문 DEV STUDIO 하이엔드 피부과 & 안티에이징 센터 인테리어 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function AetherMedicalPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AetherMedicalPageClient isEmbed={isEmbed} />;
}

