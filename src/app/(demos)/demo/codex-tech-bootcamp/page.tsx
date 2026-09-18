import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import CodexTechBootcampPageClient from './CodexTechBootcampPageClient';

const DEMO_METADATA: Metadata = {
  title: '코덱스 아카데미 풀스택 & AI 테크 캠프 | CLI 샌드박스 & Git 잔디 — 태문 DEV STUDIO',
  description:
    '대규모 분산 시스템 아키텍처와 최신 생성형 AI RAG 파이프라인을 교육하는 IT 부트캠프 웹사이트 샘플. 인터랙티브 개발자 CLI 터미널, 16주 Git 커밋 잔디 뷰어, 실제 론칭 SaaS 쇼케이스 실물 라이브 데모.',
  openGraph: {
    title: '코덱스 아카데미 | CLI 샌드박스 & Git 잔디 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 코딩 & 테크 부트캠프 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function CodexTechBootcampPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <CodexTechBootcampPageClient isEmbed={isEmbed} />;
}
