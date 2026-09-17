import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import VocalRecordingPageClient from './VocalRecordingPageClient';

const DEMO_METADATA: Metadata = {
  title: '보컬하우스 레코딩 스튜디오 (VOCAL HOUSE) | 실용음악 & 멀티트랙 보컬 프로덕션 — 태문 DEV STUDIO',
  description:
    '실전 멀티트랙 스튜디오 레코딩과 보컬 음역 성구 진단 인터랙티브 시스템을 갖춘 실용음악 아카데미 웹사이트 샘플. 4채널 DAW 파형 믹서, C3-C6 건반 피치 테스터 및 1:1 오디션 레코딩 상담 실물 라이브 데모.',
  openGraph: {
    title: '보컬하우스 레코딩 스튜디오 | 실용음악 보컬 아카데미 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 실용음악 & 음향 에듀테크 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function VocalRecordingPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <VocalRecordingPageClient isEmbed={isEmbed} />;
}
