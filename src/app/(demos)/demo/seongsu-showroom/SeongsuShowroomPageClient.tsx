'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { SeongsuShowroomApp } from '@/components/demos/seongsu-showroom/SeongsuShowroomApp';

interface Props {
  isEmbed: boolean;
}

export default function SeongsuShowroomPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <SeongsuShowroomApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/seongsu-showroom?embed=true"
      title="아틀리에 무드 성수 (ATELIER MOOD SEONGSU)"
      category="인테리어 · 상업공간 & 플래그십 쇼룸"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (상업 공간 브랜딩 스튜디오 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Interactive Zoning HUD',
        'Material Archive',
        'Space Estimator',
      ]}
      inquiryUrl="/inquiry?from=seongsu-showroom"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: '3층 플로어 조닝 핀 핫스팟, 머티리얼 스펙 뷰어, 공간 견적 시뮬레이터' },
        { label: '디자인 톤앤매너', value: '성수 인더스트리얼 브루탈리즘 & 다크 럭셔리 웜 메탈' },
        { label: '클라이언트 기능', value: '실시간 견적 산출 연동 1:1 방문 예약 모달' },
      ]}
    />
  );
}
