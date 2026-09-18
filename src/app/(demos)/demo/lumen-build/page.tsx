import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import LumenBuildPageClient from './LumenBuildPageClient';

const DEMO_METADATA: Metadata = {
  title: '루멘 빌드 (LUMEN BUILD) | 성수·도심 꼬마빌딩 신축 솔루션 — 태문넷',
  description:
    '성수 적벽돌 플래그십, 한남 루프탑, 연남 테라스 근생 등 4대 완공 실적 갤러리. 대지 조건별 예상 건축 규모·임대수익률 간이 계산기 및 무료 사업성 검토 실물 라이브 데모.',
  openGraph: {
    title: '루멘 빌드 | 성수·도심 꼬마빌딩 신축 & 상업 근린생활시설 실물 데모',
    description: '태문넷 상업용 꼬마빌딩 신축 및 임대 가치 극대화 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function LumenBuildPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <LumenBuildPageClient isEmbed={isEmbed} />;
}
