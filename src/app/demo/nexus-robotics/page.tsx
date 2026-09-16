import type { Metadata } from 'next';
import NexusRoboticsPageClient from './NexusRoboticsPageClient';

export const metadata: Metadata = {
  title: 'NEXUS ROBOTICS — 반도체 클린룸 자율 군집 로보틱스 엔터프라이즈 | 태문 DEV STUDIO',
  description:
    '초당 100회 3D LiDAR·비전 SLAM 다중 센서 융합과 0.5mm 초정밀 도킹. 반도체·2차전지 클린룸 자율주행 AMR 및 디지털 트윈 관제 플랫폼 실물 라이브 데모.',
  openGraph: {
    title: 'NEXUS ROBOTICS — 반도체 클린룸 자율 군집 로보틱스 엔터프라이즈',
    description: '태문 DEV STUDIO 딥테크 로보틱스 기업 랜딩 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function NexusRoboticsPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <NexusRoboticsPageClient isEmbed={isEmbed} />;
}
