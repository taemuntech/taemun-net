import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import MmiEssayPageClient from './MmiEssayPageClient';

const DEMO_METADATA: Metadata = {
  title: '아고라 논술 & MMI 의대면접 센터 (AGORA) | 대입 논술 & 의예과 다면 심층면접 — 태문 DEV STUDIO',
  description:
    '대입 인문·수리논술 및 의대 MMI 심층면접 전문 교육기관 웹사이트 샘플. 빨간펜 첨삭 전후(Before/After) 비교 슬라이더, 8분 실전 MMI 딜레마 시뮬레이터, 1:1 서면 첨삭 및 모의면접 신청 실물 라이브 데모.',
  openGraph: {
    title: '아고라 논술 & MMI 의대면접 센터 | 대입 논술 & 의대 MMI 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 논술 & 의약학 에듀테크 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function MmiEssayPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <MmiEssayPageClient isEmbed={isEmbed} />;
}
