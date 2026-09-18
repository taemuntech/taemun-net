import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import HeritageGlobalPrepPageClient from './HeritageGlobalPrepPageClient';

const DEMO_METADATA: Metadata = {
  title: '헤리티지 글로벌 프렙 (Heritage Global Prep) | 아이비리그 입시 가제트 — 태문 DEV STUDIO',
  description:
    '19세기 정통 영자신문 브로드시트 감성의 아이비리그 입시 전문 가제트 웹사이트 샘플. Digital SAT 1600 적응형 텔레메트리 계산기, Common App 에세이 3막 핀셋 해체 Lab, 1:1 포트폴리오 감사 신청 위저드 실물 라이브 데모.',
  openGraph: {
    title: '헤리티지 글로벌 프렙 | 아이비리그 입시 가제트 실물 라이브 데모',
    description: '태문 DEV STUDIO 최상위권 프리미엄 학원 & 에듀테크 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function HeritageGlobalPrepPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params?.embed === 'true';

  return <HeritageGlobalPrepPageClient isEmbed={isEmbed} />;
}
