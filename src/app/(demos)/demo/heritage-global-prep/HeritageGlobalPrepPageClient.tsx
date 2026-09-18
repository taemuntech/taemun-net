'use client';

import dynamic from 'next/dynamic';
import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';

const HeritageGlobalPrepApp = dynamic(
  () => import('@/components/demos/heritage-global-prep/HeritageGlobalPrepApp'),
  { ssr: false }
);

interface Props {
  isEmbed: boolean;
}

export default function HeritageGlobalPrepPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <HeritageGlobalPrepApp />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/heritage-global-prep?embed=true"
      title="헤리티지 글로벌 프렙 (Heritage Global Prep)"
      category="학원 · 아이비리그/SAT가제트"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (아이비리그 입시/SAT 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Digital SAT 1600 Telemetry',
        'Broadsheet Gazette Architecture',
      ]}
      inquiryUrl="/inquiry?from=heritage-global-prep"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '브로드시트 아키텍처', value: '19세기 영자신문 가제트 타이포그래피 & 드롭캡 레이아웃' },
        { label: '적응형 SAT 텔레메트리', value: 'Digital SAT 1600 R&W·Math 환산 & AI 240 계산기(예시)' },
        { label: '사정관 에세이 해체', value: '전직 아이비리그 입학사정관 Common App 3막 핀셋 첨삭 Lab' },
      ]}
    />
  );
}
