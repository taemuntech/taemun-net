import type { Metadata } from 'next';
import TechnovaGearPageClient from './TechnovaGearPageClient';

export const metadata: Metadata = {
  title: 'TECHNOVA GEAR (테크노바 기어) — 디지털 가전 & 하이테크 하드웨어 | 태문 DEV STUDIO',
  description:
    '다나와·쿠팡IT 스타일의 파라메트릭 정밀 하드웨어 스펙 비교 매트릭스, 3D 쿨링 챔버 분해도 뷰어, 섀시 I/O 포트 텔레메트리 맵 및 실시간 벤치마크 엔진이 결합된 플래그십 테크 이커머스 라이브 데모.',
  openGraph: {
    title: 'TECHNOVA GEAR — 디지털 가전 & 하이테크 하드웨어',
    description: '태문 DEV STUDIO 하이엔드 테크 하드웨어 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function TechnovaGearPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <TechnovaGearPageClient isEmbed={isEmbed} />;
}
