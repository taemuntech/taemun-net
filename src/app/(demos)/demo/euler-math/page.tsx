import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import EulerMathPageClient from './EulerMathPageClient';

const DEMO_METADATA: Metadata = {
  title: '오일러 수학 영재학술원 (EULER MATHEMATICS) | KMO 올림피아드 & 기하학 Lab — 태문 DEV STUDIO',
  description:
    'KMO 올림피아드 및 영재학교 심층 구술면접 전문 수학학원 웹사이트 샘플. 3D 정다면체 오일러 공식(V - E + F = 2) 가상 시뮬레이터, 기하·정수 기출 핀셋 해체, 1:1 영재성 정밀 진단평가 신청 실물 라이브 데모.',
  openGraph: {
    title: '오일러 수학 영재학술원 | KMO 올림피아드 & 3D 기하학 Lab 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 영재수학 & 올림피아드 에듀테크 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function EulerMathPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <EulerMathPageClient isEmbed={isEmbed} />;
}
