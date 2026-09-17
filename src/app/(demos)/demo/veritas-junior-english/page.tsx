import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import VeritasJuniorEnglishPageClient from './VeritasJuniorEnglishPageClient';

const DEMO_METADATA: Metadata = {
  title: '베리타스 주니어 프레스티지 어학원 (VERITAS JUNIOR) | 렉사일 북클럽 & 원어민 몰입 — 태문 DEV STUDIO',
  description:
    '미국 사립학교 정규 커리큘럼 기반 주니어 영어몰입 어학원 웹사이트 샘플. 렉사일 200L~1100L 레벨별 가상 서재 뷰어, AI 음성인식 스피킹 발음 진단 리포트, 1:1 원어민 레벨테스트 신청 실물 라이브 데모.',
  openGraph: {
    title: '베리타스 주니어 프레스티지 어학원 | 주니어 영어몰입 & 렉사일 북클럽 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 주니어 어학원 & 렉사일 에듀테크 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function VeritasJuniorEnglishPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <VeritasJuniorEnglishPageClient isEmbed={isEmbed} />;
}
