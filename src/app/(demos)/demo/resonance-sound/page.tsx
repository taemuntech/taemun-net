import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import ResonanceSoundPageClient from './ResonanceSoundPageClient';

const DEMO_METADATA: Metadata = {
  title: '공명 하이파이 (RESONANCE SOUND) | 성수·한남 하이파이 오디오 청음실 & 바이닐 스튜디오 인테리어 — 태문 DEV STUDIO',
  description:
    '빛이 가득한 지상 라운지, 내추럴 화이트 오크와 샌드 패브릭의 어쿠스틱 청음 공간. 실시간 RT60 잔향 시간 시뮬레이터 HUD, 음향 특화 마감재 아카이브 실물 라이브 데모.',
  openGraph: {
    title: '공명 하이파이 | 하이파이 청음실 & 바이닐 오디오 스튜디오 디자인 실물 데모',
    description: '태문 DEV STUDIO 하이엔드 음향 룸 어쿠스틱 & 바이닐 라운지 인테리어 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function ResonanceSoundPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <ResonanceSoundPageClient isEmbed={isEmbed} />;
}

