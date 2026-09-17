'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { JeonglimTeaApp } from '@/components/demos/jeonglim-tea/JeonglimTeaApp';

interface Props {
  isEmbed: boolean;
}

export default function JeonglimTeaPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <JeonglimTeaApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/jeonglim-tea?embed=true"
      title="정림다원 (靜林茶院)"
      category="인테리어 · 모던 한옥 티하우스 & 다도 공간"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (북촌 한옥마을 다원 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Weather Ambience HUD',
        'Traditional Timber Library',
        'Hanok Spatial Hotspots',
      ]}
      inquiryUrl="/inquiry?from=jeonglim-tea"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: '계절 및 날씨 사운드스케이프 앰비언스 HUD, 3대 다도 공간 투어' },
        { label: '물성 아카이브', value: '100년 고재 소나무, 수제 닥나무 한지, 제주 현무암 등 전통 스펙' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 한옥 다도 문화 공간 시공 상담 신청 모달' },
      ]}
    />
  );
}
