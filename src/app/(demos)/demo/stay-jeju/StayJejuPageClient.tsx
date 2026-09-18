'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { StayJejuApp } from '@/components/demos/stay-jeju/StayJejuApp';

interface Props {
  isEmbed: boolean;
}

export default function StayJejuPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <StayJejuApp />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/stay-jeju?embed=true"
      title="소소재 제주 (SOSOJAE JEJU)"
      category="인테리어 · 호스피탈리티 & 프라이빗 스테이"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (제주 애월 독채 스테이 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=stay-jeju"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: 'Day/Sunset/Night 시간대별 조명 시뮬레이터, 공간 핫스팟 투어' },
        { label: '자연 물성 아카이브', value: '현무암, 100년 편백, 규조토, 감물 린넨 4대 제주 물성 뷰어' },
        { label: '클라이언트 기능', value: '독채 대관 및 스테이 건축 1:1 상담 예약 모달' },
      ]}
    />
  );
}
