import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import AtelierKidsPageClient from './AtelierKidsPageClient';

const DEMO_METADATA: Metadata = {
  title: '아틀리에 키즈 감성 미술원 (ATELIER KIDS) | 프랑스식 아동 감각미술 — 태문넷',
  description:
    '프랑스 에꼴 드 보자르 기반 4~13세 아동 창의 꼴라주 & 감각 미술 아카데미 웹사이트 샘플. 비정형 인터랙티브 꼴라주 캔버스, 연령별 오감 발달 지표 HUD, 어린이 전시 아카이브 및 원데이 체험 신청 실물 라이브 데모.',
  openGraph: {
    title: '아틀리에 키즈 감성 미술원 | 아동 감각미술 실물 라이브 데모',
    description: '태문넷 프리미엄 아동 교육 & 예술 아카데미 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function AtelierKidsPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AtelierKidsPageClient isEmbed={isEmbed} />;
}
