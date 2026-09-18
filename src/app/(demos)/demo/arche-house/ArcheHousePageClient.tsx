'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { ArcheHouseApp } from '@/components/demos/arche-house/ArcheHouseApp';

interface Props {
  isEmbed: boolean;
}

export default function ArcheHousePageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <ArcheHouseApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/arche-house?embed=true"
      title="아르케 건축사사무소 (ARCHE HOUSE)"
      category="건축 · 하이엔드 단독주택 & 별서"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (고급 주거 설계·시공 아틀리에 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=arche-house"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '주요 인터랙션', value: '판교 중정주택 등 4대 완공작 갤러리, 연면적별 예상 건축비 산출 가이드' },
        { label: '건축가 철학', value: '자연광과 중정을 담은 공간 미학 및 1:1 책임 감리 프로세스 로드맵' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 1:1 건축 설계 상담 및 대지 현장 답사 신청 모달' },
      ]}
    />
  );
}
