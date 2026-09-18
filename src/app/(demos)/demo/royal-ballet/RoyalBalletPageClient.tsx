'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { RoyalBalletApp } from '@/components/demos/royal-ballet/RoyalBalletApp';

interface Props {
  isEmbed: boolean;
}

export default function RoyalBalletPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <RoyalBalletApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/royal-ballet?embed=true"
      title="로열 발레 아카데미 (ROYAL BALLET)"
      category="학원 · 클래식 발레 & 현대무용 아카데미"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (클래식 발레 아카데미 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Ballet Turnout Simulator',
        'Anatomy Biomechanics Lab',
        'Audition Booking Wizard',
      ]}
      inquiryUrl="/inquiry?from=royal-ballet"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '해부학 시뮬레이터', value: '발레 5대 기본 발 포지션 & 180° 턴아웃 골반 정렬 시뮬레이터' },
        { label: '바가노바 커리큘럼', value: '러시아 정통 8단계 체계 기반 예중·예고·해외 발레단 입시 트랙' },
        { label: '체형 진단 전환', value: '1:1 골반·발목 가동성 실측 진단 및 모의 실기 오디션 신청' },
      ]}
    />
  );
}
