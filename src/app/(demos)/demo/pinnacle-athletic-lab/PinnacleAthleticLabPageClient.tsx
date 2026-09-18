'use client';

import dynamic from 'next/dynamic';
import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';

const PinnacleAthleticLabApp = dynamic(
  () => import('@/components/demos/pinnacle-athletic-lab/PinnacleAthleticLabApp'),
  { ssr: false }
);

interface Props {
  isEmbed: boolean;
}

export default function PinnacleAthleticLabPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <PinnacleAthleticLabApp />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/pinnacle-athletic-lab?embed=true"
      title="피나클 체육과학 아카데미 (PINNACLE Athletic Lab)"
      category="학원 · 스포츠생체역학/체대·특채실기"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (체육대학·공무원 특채 실기 전문관 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        '3D Kinematics Analysis',
        'Real-Time Score Calibrator',
      ]}
      inquiryUrl="/inquiry?from=pinnacle-athletic-lab"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '3D 모션 역학 분석', value: '1,000Hz 키네마틱스 도약·체공·착지 3단계 관절 모멘텀 시뮬레이션' },
        { label: '실기 점수 정밀 환산', value: '제자리멀리뛰기·100m·악력·배근력 5대 종목 만점 변환기(예시)' },
        { label: '원생 진단 예약 솔루션', value: '목표 대학 및 특채 전형별 센서베이 정밀 진단 신청 위저드' },
      ]}
    />
  );
}
