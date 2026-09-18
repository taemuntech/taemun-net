import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import ResonanceSoundPageClient from './ResonanceSoundPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다. 링크 미리보기(카카오톡·메신저)에서
// 가장 먼저 읽히는 자리라, 화면 안 DemoDisclaimer 와 같은 고지를 여기 설명문에도 싣는다.
// 썸네일은 sampleMetadata 가 defaultThumbnail(slug) 로 자동으로 붙인다.
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'resonance-sound',
  title:
    '공명 하이파이 (RESONANCE SOUND) — 하이파이 청음실 & 바이닐 스튜디오',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 예약 신청은 접수되지 않습니다. 장르별 잔향 시간 시뮬레이터 HUD, 음향 특화 마감재 아카이브를 한 페이지에 담았습니다.',
});

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

