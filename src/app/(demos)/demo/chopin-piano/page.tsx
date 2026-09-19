import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import ChopinPianoPageClient from './ChopinPianoPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(화면의 완공작·수치는 모두 예시다).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'chopin-piano',
  title: '쇼팽하우스 피아노 아카데미 (CHOPIN HAUS) — 클래식 피아노 학원 홈페이지',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 학원이 아니며 오디션 신청은 접수되지 않습니다. 건반을 눌러 소리를 내는 인터랙티브 피아노, 잔향·배음 시각화 화면, 오디션 신청 화면을 담았습니다.',
});

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
