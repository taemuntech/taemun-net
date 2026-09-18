import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import RobotStemPageClient from './RobotStemPageClient';

const DEMO_METADATA: Metadata = {
  title: '키네틱스 영재로봇공학 & STEM 센터 | 4자유도 로봇암 & Live Code — 태문 DEV STUDIO',
  description:
    '기구학(Kinematics)과 임베디드 회로, C++ 아두이노 및 ROS 2 소프트웨어 알고리즘의 본질을 교육하는 영재로보틱스 플래그십 웹사이트 샘플. 4자유도 로봇암 분해도(Exploded View), 실시간 관절 각도 제어 & C++ 코드 동기화 실물 라이브 데모.',
  openGraph: {
    title: '키네틱스 영재로봇공학 & STEM | 4자유도 로봇암 & Live Code 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 영재로봇공학 & STEM 에듀테크 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function RobotStemPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <RobotStemPageClient isEmbed={isEmbed} />;
}
