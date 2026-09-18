'use client';

import dynamic from 'next/dynamic';
import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';

const ApexLegalCpaApp = dynamic(
  () => import('@/components/demos/apex-legal-cpa/ApexLegalCpaApp'),
  { ssr: false }
);

interface Props {
  isEmbed: boolean;
}

export default function ApexLegalCpaPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <ApexLegalCpaApp />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/apex-legal-cpa?embed=true"
      title="에이펙스 법학·회계 아카데미 (APEX Legal & CPA Academy)"
      category="학원 · 로스쿨LEET/공인회계사CPA"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (서초 법조타운 최상위 전문관 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=apex-legal-cpa"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '3개년 합격 매트릭스', value: '전국 25개 로스쿨·CPA 1/2차 커트라인 & GPA 필터링 콘솔(예시)' },
        { label: '1인 방음 캐럴 평면도', value: '48dB 소음 감쇠 1인 방음석 실시간 전력·소음 텔레메트리 HUD(예시)' },
        { label: '정밀 입학 심사 위저드', value: 'LEET·CPA 지망 트랙별 1:1 심층 진단 레벨테스트 신청 솔루션' },
      ]}
    />
  );
}
